/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/registrarFalta.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RegistrarFaltaInput as RegistrarFaltaInput_0, RegistrarFaltaOutput as RegistrarFaltaOutput_0 } from '/_102047_/l2/agendaClinica/web/contracts/consultas.defs.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';
export async function registrarFalta(input: RegistrarFaltaInput_0, ctx: RequestContext, ports: { consultaRepository: ConsultaRepository }): Promise<RegistrarFaltaOutput_0> {
    void ctx;
  const body = input as unknown as Record<string, unknown>;
  const where: Record<string, unknown> = { id: body["id"] };
  const found = await ports.consultaRepository.list(where);
  const current = found[0];
  if (!current) throw new AppError('NOT_FOUND', 'Record not found.', 404);
  const row = current as unknown as Record<string, unknown>;
  // enforce:lifecycle
  if (!["scheduled"].includes(String(row["status"]))) throw new AppError('VALIDATION_ERROR', 'Transition is not allowed.', 400, { ruleId: "" });
  const next: Record<string, unknown> = { ...row };
  next["status"] = "noShow";
  next["version"] = Number(row["version"] ?? 0) + 1;
  const undelivered = ["registrarFalta"] as const;
  void undelivered;
  return ports.consultaRepository.transition(next as unknown as Consulta, "registrarFalta");
}
