/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/registrarFalta.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';

export interface RegistrarFaltaInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface RegistrarFaltaOutput extends Record<string, unknown> {
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

export async function registrarFalta(
  input: RegistrarFaltaInput,
  ctx: RequestContext,
): Promise<RegistrarFaltaOutput> {
  const id = String(input.id);
  const requestedVersion = Number(input.version);
  if (!id || !Number.isInteger(requestedVersion) || requestedVersion < 1) {
    throw new AppError('VALIDATION_ERROR', 'A valid consultation id and version are required.', 400);
  }

  const consultaRepository = resolveRepository<ConsultaRepository>(ctx, 'ConsultaRepository');
  let current: Consulta;
  try {
    current = await consultaRepository.get(id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'NOT_FOUND') {
      throw error;
    }
    throw error;
  }

  if (!current) {
    throw new AppError('NOT_FOUND', 'Consulta not found.', 404);
  }

  if (requestedVersion !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (current.status !== 'scheduled' && current.status !== 'confirmed') {
    throw new AppError(
      'VALIDATION_ERROR',
      'A consulta só pode ser registrada como falta quando está agendada ou confirmada.',
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
    status: 'noShow',
    details: {
      ...(current.details.attendanceNote !== undefined
        ? { attendanceNote: current.details.attendanceNote }
        : {}),
    },
  };

  const transitioned = await consultaRepository.transition(next, 'registrarFalta');
  const details: { attendanceNote?: string } = {};
  if (transitioned.details.attendanceNote !== undefined) {
    details.attendanceNote = transitioned.details.attendanceNote;
  }

  return {
    id: transitioned.id,
    version: transitioned.version,
    pacienteId: transitioned.pacienteId,
    profissionalId: transitioned.profissionalId,
    scheduledAt: transitioned.scheduledAt,
    status: transitioned.status,
    details,
  };
}
