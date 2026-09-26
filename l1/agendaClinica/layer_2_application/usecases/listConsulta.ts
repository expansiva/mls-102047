/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/listConsulta.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ListConsultaInput as ListConsultaInput_0, ListConsultaOutput as ListConsultaOutput_0 } from '/_102047_/l2/agendaClinica/web/contracts/agenda.defs.js';
import type { ListConsultaInput as ListConsultaInput_1, ListConsultaOutput as ListConsultaOutput_1 } from '/_102047_/l2/agendaClinica/web/contracts/consultas.defs.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';
export async function listConsulta(input: ListConsultaInput_0 | ListConsultaInput_1, ctx: RequestContext, ports: { consultaRepository: ConsultaRepository }): Promise<ListConsultaOutput_0 | ListConsultaOutput_1> {
    const filled = (value: unknown): boolean => value !== undefined && value !== null && value !== '';
  const body = input as Consulta;
  const where: Record<string, unknown> = {};
  if (filled(body.id)) where.id = body.id;
  if (filled(body.pacienteId)) where.pacienteId = body.pacienteId;
  if (filled(body.profissionalId)) where.profissionalId = body.profissionalId;
  if (filled(body.scheduledAt)) where.scheduledAt = body.scheduledAt;
  if (filled(body.status)) where.status = body.status;
  const found = await ports.consultaRepository.list(where);
  return found;
}
