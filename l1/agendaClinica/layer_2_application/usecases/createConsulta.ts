/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/createConsulta.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { CreateConsultaInput as CreateConsultaInput_0, CreateConsultaOutput as CreateConsultaOutput_0 } from '/_102047_/l2/agendaClinica/web/contracts/consultas.defs.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';
export async function createConsulta(input: CreateConsultaInput_0, ctx: RequestContext, ports: { consultaRepository: ConsultaRepository }): Promise<CreateConsultaOutput_0> {
    const body = input as Consulta;
  const record: Consulta = {
    id: ctx.idGenerator.newId(),
    version: 1,
    pacienteId: body.pacienteId,
    profissionalId: body.profissionalId,
    scheduledAt: body.scheduledAt,
    status: body.status,
    details: { telephoneConfirmation: { confirmedAt: '' }, attendanceNote: '' },
  };
  {
    const taken = await ports.consultaRepository.list({ profissionalId: body.profissionalId, scheduledAt: body.scheduledAt });
    // enforce:storage
    if (taken.length > 0) throw new AppError('CONFLICT', 'Unique key already stored.', 409, { ruleId: "consultaHorarioProfissionalUnico" });
  }
  return ports.consultaRepository.create(record);
}
