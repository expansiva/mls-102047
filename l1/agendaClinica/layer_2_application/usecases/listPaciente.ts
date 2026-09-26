/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/listPaciente.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ListPacienteInput as ListPacienteInput_0, ListPacienteOutput as ListPacienteOutput_0 } from '/_102047_/l2/agendaClinica/web/contracts/consultas.defs.js';
import type { ListPacienteInput as ListPacienteInput_1, ListPacienteOutput as ListPacienteOutput_1 } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
export async function listPaciente(input: ListPacienteInput_0 | ListPacienteInput_1, ctx: RequestContext): Promise<ListPacienteOutput_0 | ListPacienteOutput_1> {
    const body = input as unknown as Record<string, unknown>;
  const present = (value: unknown): boolean => value !== undefined && value !== null && value !== '';
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
  const nest = (flat: unknown): Record<string, unknown> => {
    const source = flat && typeof flat === 'object' ? flat as Record<string, unknown> : {};
    const details: Record<string, unknown> = {};
    const leaves = [["subtype","identification.subtype"],["name","identification.name"],["docType","identification.docType"],["docId","identification.docId"],["countryCode","identification.countryCode"],["base","base"],["birthDate","person.birthDate"],["privacyConsent","person.privacyConsent"],["general","general"],["agendaClinica","agendaClinica"]] as ReadonlyArray<readonly [string, string]>;
    for (const [tail, path] of leaves) {
      if (tail && source[tail] !== undefined) writePath(details, path, source[tail]);
    }
    return details;
  };
  const pack = (row: Record<string, unknown>) => ({ id: String(row.mdmId ?? ''), version: Number(row.version ?? 0), details: nest(row.details) });
  const priors: Record<string, Record<string, unknown>> = {};
  let current: Record<string, unknown> | null = null;
  const remember = (id: string, value: Record<string, unknown> | null): void => {
    priors[id] = value ?? {};
    if (value && present(value.mdmId)) current = value;
  };
  const hydrate = async (row: Record<string, unknown>): Promise<Record<string, unknown>> => {
    if (typeof row.version === 'number') return row;
    return await ctx.mdm.entity.get({ mdmId: String(row.mdmId) }) as unknown as Record<string, unknown>;
  };
  if (present(readPath(body, "id"))) {
    const found = await ctx.mdm.entity.get({ mdmId: String(readPath(body, "id")) });
    remember("get", { mdmId: found.mdmId, version: found.version, details: found.details } as Record<string, unknown>);
    return [pack(found as unknown as Record<string, unknown>)] as unknown as ListPacienteOutput_0 | ListPacienteOutput_1;
  }
  if (present(readPath(body, "details.identification.docType")) && present(readPath(body, "details.identification.docId"))) {
    const found = await ctx.mdm.entity.findByDocument(String(readPath(body, "details.identification.docType")), String(readPath(body, "details.identification.docId")));
    remember("findByDocument", found ? { mdmId: found.mdmId, version: found.version, details: found.details } as Record<string, unknown> : null);
    return (found ? [pack(found as unknown as Record<string, unknown>)] : []) as unknown as ListPacienteOutput_0 | ListPacienteOutput_1;
  }
  if (present(readPath(body, "details.identification.name"))) {
    const page = await ctx.mdm.collection.listByType({ "type": "agendaClinica.Paciente", "name": readPath(body, "details.identification.name") } as never);
    const rows: Array<{ id: string; version: number; details: Record<string, unknown> }> = [];
    for (const item of page.items) {
      const row = item as unknown as Record<string, unknown>;
      const full = typeof row.version === 'number' ? row : await hydrate(row);
      rows.push(pack(full));
    }
    return rows as unknown as ListPacienteOutput_0 | ListPacienteOutput_1;
  }
  if (present(readPath(body, "id"))) {
    const links = await ctx.mdm.collection.relatedOfMany({ mdmIds: [String(readPath(body, "id"))] });
    void links;
    return [] as unknown as ListPacienteOutput_0 | ListPacienteOutput_1;
  }
  return [] as unknown as ListPacienteOutput_0 | ListPacienteOutput_1;
}
