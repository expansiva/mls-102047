/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/updateConsulta.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { UpdateConsultaInput as UpdateConsultaInput_0, UpdateConsultaOutput as UpdateConsultaOutput_0 } from '/_102047_/l2/agendaClinica/web/contracts/consultas.defs.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';
export async function updateConsulta(input: UpdateConsultaInput_0, ctx: RequestContext, ports: { consultaRepository: ConsultaRepository }): Promise<UpdateConsultaOutput_0> {
    const body = input as Consulta;
  const found = await ports.consultaRepository.list({ id: body.id });
  const current = found[0];
  if (!current) throw new AppError('NOT_FOUND', 'Record not found.', 404);
  const next: Consulta = { ...current };
  next.pacienteId = body.pacienteId;
  next.profissionalId = body.profissionalId;
  next.scheduledAt = body.scheduledAt;
  next.status = body.status;
  next.details = body.details;
  {
    const taken = (await ports.consultaRepository.list({ profissionalId: body.profissionalId, scheduledAt: body.scheduledAt })).filter(row => row.id !== current.id);
    // enforce:storage
    if (taken.length > 0) throw new AppError('CONFLICT', 'Unique key already stored.', 409, { ruleId: "consultaHorarioProfissionalUnico" });
  }
  return ports.consultaRepository.update(next);
}
