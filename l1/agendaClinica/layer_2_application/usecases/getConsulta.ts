/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/getConsulta.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';

export interface GetConsultaInput extends Record<string, unknown> {
  id: string;
}

export interface GetConsultaOutput extends Record<string, unknown> {
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

export async function getConsulta(
  input: GetConsultaInput,
  ctx: RequestContext,
): Promise<GetConsultaOutput> {
  const consultaRepository = resolveRepository<ConsultaRepository>(ctx, 'ConsultaRepository');
  const id = String(input.id);
  const found = await consultaRepository.get(id);

  if (!found) {
    throw new AppError('NOT_FOUND', 'Consulta not found.', 404, { ruleId: 'getConsulta' });
  }

  const details: { attendanceNote?: string } = {};
  if (found.details.attendanceNote !== undefined) {
    details.attendanceNote = found.details.attendanceNote;
  }

  return {
    id: found.id,
    version: found.version,
    pacienteId: found.pacienteId,
    profissionalId: found.profissionalId,
    scheduledAt: found.scheduledAt,
    status: found.status,
    details,
  };
}
