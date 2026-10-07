/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/confirmarConsulta.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';

export interface ConfirmarConsultaInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface ConfirmarConsultaOutput extends Record<string, unknown> {
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

export async function confirmarConsulta(
  input: ConfirmarConsultaInput,
  ctx: RequestContext,
): Promise<ConfirmarConsultaOutput> {
  const consultaRepository = resolveRepository<ConsultaRepository>(ctx, 'ConsultaRepository');
  const id = String(input.id);
  const version = Number(input.version);

  if (id.length === 0 || !Number.isFinite(version)) {
    throw new AppError('VALIDATION_ERROR', 'A valid consultation id and version are required.', 400);
  }

  const current = await consultaRepository.get(id);
  if (!current) {
    throw new AppError('NOT_FOUND', 'Consultation not found.', 404);
  }

  if (current.version !== version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (current.status !== 'scheduled') {
    throw new AppError(
      'VALIDATION_ERROR',
      'A consultation can only be confirmed when it is scheduled.',
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
    status: 'confirmed',
    details: {
      ...(current.details.attendanceNote === undefined
        ? {}
        : { attendanceNote: current.details.attendanceNote }),
    },
  };

  const updated = await consultaRepository.transition(next, 'confirmarConsulta');

  return {
    id: updated.id,
    version: updated.version,
    pacienteId: updated.pacienteId,
    profissionalId: updated.profissionalId,
    scheduledAt: updated.scheduledAt,
    status: updated.status,
    details: {
      ...(updated.details.attendanceNote === undefined
        ? {}
        : { attendanceNote: updated.details.attendanceNote }),
    },
  };
}
