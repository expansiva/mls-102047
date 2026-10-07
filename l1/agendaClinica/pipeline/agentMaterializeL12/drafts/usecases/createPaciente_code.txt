/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/createPaciente.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
export interface CreatePacienteInput extends Record<string, unknown> {
  details: {
    identification: {
      name: string;
      docType?: string;
      docId?: string;
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    agendaClinica?: Record<string, unknown>;
  };
}
export interface CreatePacienteOutput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
      docType?: string;
      docId?: string;
    };
    base: {
      contacts: Record<string, unknown>[];
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    agendaClinica?: Record<string, unknown>;
  };
}
type FlatDetails = Record<string, unknown>;
type MdmResult = {
  mdmId: string;
  version: number;
  details: FlatDetails;
};
function requiredString(details: FlatDetails, field: string): string {
  const value = details[field];
  if (typeof value !== 'string' || value.length === 0) {
    throw new AppError('MDM_INVALID_RESULT', `The MDM result is missing ${field}.`, 500);
  }
  return value;
}
function toOutput(result: MdmResult): CreatePacienteOutput {
  const flat = result.details;
  const identification: CreatePacienteOutput['details']['identification'] = {
    subtype: requiredString(flat, 'subtype'),
    name: requiredString(flat, 'name'),
    status: requiredString(flat, 'status'),
  };
  if (flat.docType != null) identification.docType = String(flat.docType);
  if (flat.docId != null) identification.docId = String(flat.docId);
  const output: CreatePacienteOutput = {
    id: result.mdmId,
    version: result.version,
    details: {
      identification,
      base: {
        contacts: Array.isArray(flat.contacts)
          ? flat.contacts.filter((item): item is Record<string, unknown> =>
              item !== null && typeof item === 'object' && !Array.isArray(item),
            )
          : [],
      },
    },
  };
  if (flat.privacyConsent != null && typeof flat.privacyConsent === 'object' && !Array.isArray(flat.privacyConsent)) {
    output.details.person = { privacyConsent: flat.privacyConsent as Record<string, unknown> };
  }
  if (flat.general != null && typeof flat.general === 'object' && !Array.isArray(flat.general)) {
    output.details.general = flat.general as Record<string, unknown>;
  }
  if (flat.agendaClinica != null && typeof flat.agendaClinica === 'object' && !Array.isArray(flat.agendaClinica)) {
    output.details.agendaClinica = flat.agendaClinica as Record<string, unknown>;
  }
  return output;
}
export async function createPaciente(input: CreatePacienteInput, ctx: RequestContext): Promise<CreatePacienteOutput> {
  const identification = input.details.identification;
  const docType = identification.docType;
  const docId = identification.docId;
  let result: MdmResult | null = null;
  if (docType !== undefined && docId !== undefined) {
    const found = await ctx.mdm.entity.findByDocument(docType, docId);
    if (found !== null) result = found;
  }
  if (result === null) {
    const details: FlatDetails = {
      subtype: 'Person',
      name: identification.name,
    };
    if (docType !== undefined) details.docType = docType;
    if (docId !== undefined) details.docId = docId;
    const privacyConsent = input.details.person?.privacyConsent;
    if (privacyConsent !== undefined) details.privacyConsent = privacyConsent;
    if (input.details.general !== undefined) details.general = input.details.general;
    if (input.details.agendaClinica !== undefined) details.agendaClinica = input.details.agendaClinica;
    result = await ctx.mdm.entity.create({ details });
  }
  const attached = await ctx.mdm.entity.attachRole(result.mdmId, 'agendaClinica.Paciente');
  return toOutput(attached);
}
