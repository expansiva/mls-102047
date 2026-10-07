/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/getPaciente.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
export interface GetPacienteInput extends Record<string, unknown> {
id: string;
}
export interface GetPacienteOutput extends Record<string, unknown> {
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

export async function getPaciente(input: GetPacienteInput, ctx: RequestContext): Promise<GetPacienteOutput> {
const mdmId = String(input.id);
const result = await ctx.mdm.entity.get({ mdmId });

if (result == null) {
throw new AppError('NOT_FOUND', 'Paciente was not found.', 404);
}

const flatDetails = result.details as Record<string, unknown>;
const identification = {
subtype: String(flatDetails.subtype),
name: String(flatDetails.name),
status: String(flatDetails.status),
...(flatDetails.docType == null ? {} : { docType: String(flatDetails.docType) }),
...(flatDetails.docId == null ? {} : { docId: String(flatDetails.docId) })
};

const rawContacts = flatDetails.contacts;
const contacts: Record<string, unknown>[] = Array.isArray(rawContacts)
? rawContacts.filter((contact): contact is Record<string, unknown> => contact !== null && typeof contact === 'object')
: [];

const details: GetPacienteOutput['details'] = {
identification,
base: { contacts }
};

if (flatDetails.privacyConsent != null && typeof flatDetails.privacyConsent === 'object' && !Array.isArray(flatDetails.privacyConsent)) {
details.person = { privacyConsent: flatDetails.privacyConsent as Record<string, unknown> };
}
if (flatDetails.general != null && typeof flatDetails.general === 'object' && !Array.isArray(flatDetails.general)) {
details.general = flatDetails.general as Record<string, unknown>;
}
if (flatDetails.agendaClinica != null && typeof flatDetails.agendaClinica === 'object' && !Array.isArray(flatDetails.agendaClinica)) {
details.agendaClinica = flatDetails.agendaClinica as Record<string, unknown>;
}

return {
id: String(result.mdmId),
version: Number(result.version),
details
};
}
