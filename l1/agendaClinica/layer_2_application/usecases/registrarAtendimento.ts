/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/registrarAtendimento.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';

export interface RegistrarAtendimentoInput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    attendanceNote?: string;
  };
}

export interface RegistrarAtendimentoOutput extends Record<string, unknown> {
  id: string;
  version: number;
  pacienteId: string;
  profissionalId: string;
  scheduledAt: string;
  status: string;
  details: {
    attendanceNote?: string;
  };
}

export async function registrarAtendimento(
  input: RegistrarAtendimentoInput,
  ctx: RequestContext,
): Promise<RegistrarAtendimentoOutput> {
  const consultaRepository = resolveRepository<ConsultaRepository>(ctx, 'ConsultaRepository');
  const id = String(input.id);
  const expectedVersion = Number(input.version);
  const attendanceNote = input.details?.attendanceNote;

  if (typeof attendanceNote !== 'string' || attendanceNote.trim() === '') {
    throw new AppError(
      'VALIDATION_ERROR',
      'An attendance note is required to register the consultation as attended.',
      400,
      { ruleId: 'anotacaoObrigatoriaNoAtendimento' },
    );
  }

  const current = await consultaRepository.get(id);
  if (!current) {
    throw new AppError('NOT_FOUND', 'Consultation not found.', 404);
  }

  if (current.version !== expectedVersion) {
    throw new AppError(
      'CONCURRENCY_CONFLICT',
      'Version does not match the stored consultation.',
      409,
    );
  }

  if (current.status !== 'scheduled' && current.status !== 'confirmed') {
    throw new AppError(
      'VALIDATION_ERROR',
      'The consultation cannot transition to attended from its current status.',
      409,
      { ruleId: 'transicaoConsultaValida' },
    );
  }

  const next: Consulta = {
    id: current.id,
    version: current.version,
    pacienteId: current.pacienteId,
    profissionalId: current.profissionalId,
    scheduledAt: current.scheduledAt,
    status: 'attended',
    details: {
      ...current.details,
      attendanceNote,
    },
  };

  const saved = await consultaRepository.transition(next, 'registrarAtendimento');
  return {
    id: saved.id,
    version: saved.version,
    pacienteId: saved.pacienteId,
    profissionalId: saved.profissionalId,
    scheduledAt: saved.scheduledAt,
    status: saved.status,
    details: {
      ...saved.details,
    },
  };
}
