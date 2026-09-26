/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/createPaciente.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { CreatePacienteInput as CreatePacienteInput_0, CreatePacienteOutput as CreatePacienteOutput_0 } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
export async function createPaciente(input: CreatePacienteInput_0, ctx: RequestContext): Promise<CreatePacienteOutput_0> {
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
  if (present(readPath(body, "details.identification.docType")) && present(readPath(body, "details.identification.docId"))) {
    const found = await ctx.mdm.entity.findByDocument(String(readPath(body, "details.identification.docType")), String(readPath(body, "details.identification.docId")));
    remember("findDocument", found ? { mdmId: found.mdmId, version: found.version, details: found.details } as Record<string, unknown> : null);
  }
  if (!(present(readPath(body, "details.identification.docType")) && present(readPath(body, "details.identification.docId")))) remember("findDocument", null);
  // enforce:create
  if (!(present(priors["findDocument"]["mdmId"]))) {
    const details: Record<string, unknown> = {};
    details.subtype = "Person";
    const countryCodeValue = readPath(body, "details.identification.countryCode");
    if (present(countryCodeValue)) details["countryCode"] = countryCodeValue;
    const docIdValue = readPath(body, "details.identification.docId");
    if (present(docIdValue)) details["docId"] = docIdValue;
    const docTypeValue = readPath(body, "details.identification.docType");
    if (present(docTypeValue)) details["docType"] = docTypeValue;
    const nameValue = readPath(body, "details.identification.name");
    if (present(nameValue)) details["name"] = nameValue;
    const created = await ctx.mdm.entity.create({ details: details as never });
    remember("createPerson", { mdmId: created.mdmId, version: created.version, details: created.details } as Record<string, unknown>);
  }
  // enforce:create end
  if (!priors["createPerson"]) remember("createPerson", null);
  const attached = await ctx.mdm.entity.attachRole(String([priors["findDocument"], priors["createPerson"]].map(item => item["mdmId"]).find(value => present(value))), "agendaClinica.Paciente");
  remember("attachRole", { mdmId: attached.mdmId, version: attached.version, details: attached.details } as Record<string, unknown>);
  const chosen = ["findDocument","createPerson","attachRole"].map(key => priors[key]).find(item => present(item["mdmId"]));
  if (!chosen) throw new AppError('NOT_FOUND', 'Record was not found.', 404);
  return pack(chosen) as unknown as CreatePacienteOutput_0;
}
