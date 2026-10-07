/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/createConsulta.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';

export interface CreateConsultaInput extends Record<string, unknown> {
  pacienteId: string;
  profissionalId: string;
  scheduledAt: string;
  details: {};
}

export interface CreateConsultaOutput extends Record<string, unknown> {
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

export async function createConsulta(input: CreateConsultaInput, ctx: RequestContext): Promise<CreateConsultaOutput> {
  const consultaRepository = resolveRepository<ConsultaRepository>(ctx, 'ConsultaRepository');
  const pacienteId = String(input.pacienteId);
  const profissionalId = String(input.profissionalId);
  const scheduledAt = String(input.scheduledAt);

  const existing = await consultaRepository.list({ profissionalId, scheduledAt });
  if (existing.length > 0) {
    throw new AppError(
      'CONFLICT',
      'A consultation already exists for this professional at this date and time.',
      409,
      { ruleId: 'consultaSemConflito' },
    );
  }

  const consulta: Consulta = {
    id: ctx.idGenerator.newId(),
    version: 1,
    pacienteId,
    profissionalId,
    scheduledAt,
    status: 'scheduled',
    details: {},
  };

  const saved = await consultaRepository.create(consulta);
  const details: { attendanceNote?: string } = {};
  if (saved.details.attendanceNote !== undefined) {
    details.attendanceNote = saved.details.attendanceNote;
  }

  return {
    id: saved.id,
    version: saved.version,
    pacienteId: saved.pacienteId,
    profissionalId: saved.profissionalId,
    scheduledAt: saved.scheduledAt,
    status: saved.status,
    details,
  };
}
