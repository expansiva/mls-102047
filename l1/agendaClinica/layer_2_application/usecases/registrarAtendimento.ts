/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/registrarAtendimento.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RegistrarAtendimentoInput as RegistrarAtendimentoInput_0, RegistrarAtendimentoOutput as RegistrarAtendimentoOutput_0 } from '/_102047_/l2/agendaClinica/web/contracts/agenda.defs.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';
export async function registrarAtendimento(input: RegistrarAtendimentoInput_0, ctx: RequestContext, ports: { consultaRepository: ConsultaRepository }): Promise<RegistrarAtendimentoOutput_0> {
    void ctx;
  const filled = (value: unknown): boolean => value !== undefined && value !== null && value !== '';
  const readPath = (source: unknown, path: string): unknown => {
    let node: unknown = source;
    for (const part of path.split('.')) {
      if (!node || typeof node !== 'object') return undefined;
      node = (node as Record<string, unknown>)[part];
    }
    return node;
  };
  const writePath = (source: Record<string, unknown>, path: string, value: unknown): void => {
    const parts = path.split('.');
    let node = source;
    for (let index = 0; index < parts.length - 1; index += 1) {
      const part = parts[index];
      const child = node[part];
      if (!child || typeof child !== 'object' || Array.isArray(child)) node[part] = {};
      node = node[part] as Record<string, unknown>;
    }
    node[parts[parts.length - 1]] = value;
  };
  const body = input as unknown as Record<string, unknown>;
  const where: Record<string, unknown> = { id: body["id"] };
  const found = await ports.consultaRepository.list(where);
  const current = found[0];
  if (!current) throw new AppError('NOT_FOUND', 'Record not found.', 404);
  const row = current as unknown as Record<string, unknown>;
  // enforce:lifecycle
  if (!["scheduled"].includes(String(row["status"]))) throw new AppError('VALIDATION_ERROR', 'Transition is not allowed.', 400, { ruleId: "" });
  // enforce:payload
  if (!filled(readPath(body, "details.attendanceNote"))) throw new AppError('VALIDATION_ERROR', 'Required value is missing.', 400, { ruleId: "" });
  const next: Record<string, unknown> = { ...row };
  next["status"] = "attended";
  next["version"] = Number(row["version"] ?? 0) + 1;
  writePath(next, "details.attendanceNote", readPath(body, "details.attendanceNote"));
  const undelivered = ["registrarAtendimento"] as const;
  void undelivered;
  return ports.consultaRepository.transition(next as unknown as Consulta, "registrarAtendimento");
}
