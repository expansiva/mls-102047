/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/listPaciente.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Paciente } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/paciente.js';
export interface ListPacienteInput extends Record<string, unknown> {
id?: string;
details?: {
identification?: {
subtype?: string;
name?: string;
status?: string;
docType?: string;
docId?: string;
};
base?: {
contacts?: Record<string, unknown>;
};
person?: {
privacyConsent?: Record<string, unknown>;
};
general?: Record<string, unknown>;
agendaClinica?: Record<string, unknown>;
};
page: number;
pageSize: number;
}
export interface ListPacienteOutput extends Record<string, unknown> {
items: Paciente[];
hasMore: boolean;
}

export async function listPaciente(input: ListPacienteInput, ctx: RequestContext): Promise<ListPacienteOutput> {
const page = Number(input.page);
const requestedPageSize = Number(input.pageSize);
const pageSize = requestedPageSize === 0 ? 20 : requestedPageSize;
if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 200) {
throw new AppError('INVALID_PAGINATION', 'Page must be at least 1 and pageSize must be between 1 and 200.', 400);
}

const identification = input.details?.identification;
const id = input.id == null || input.id === '' ? undefined : String(input.id);
const name = identification?.name == null || identification.name === '' ? undefined : String(identification.name);
const docType = identification?.docType == null || identification.docType === '' ? undefined : String(identification.docType);
const docId = identification?.docId == null || identification.docId === '' ? undefined : String(identification.docId);
const subtype = identification?.subtype == null || identification.subtype === '' ? undefined : String(identification.subtype);
const status = identification?.status == null || identification.status === '' ? undefined : String(identification.status);
const contacts = input.details?.base?.contacts;
const hasContactsFilter = contacts !== undefined && contacts !== null;

const asRecord = (value: unknown): Record<string, unknown> => {
if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
return value as Record<string, unknown>;
}
return {};
};
const requiredString = (value: unknown, field: string): string => {
if (typeof value !== 'string' || value.length === 0) {
throw new AppError('INVALID_MDM_RECORD', `The MDM record has no valid ${field}.`, 500);
}
return value;
};
const sameValue = (left: unknown, right: unknown): boolean => {
if (Object.is(left, right)) return true;
if (Array.isArray(left) && Array.isArray(right)) {
return left.length === right.length && left.every((value, index) => sameValue(value, right[index]));
}
if (left !== null && right !== null && typeof left === 'object' && typeof right === 'object') {
const a = left as Record<string, unknown>;
const b = right as Record<string, unknown>;
const keys = Object.keys(a);
return keys.length === Object.keys(b).length && keys.every((key) => key in b && sameValue(a[key], b[key]));
}
return false;
};
const toPaciente = (result: { mdmId: string; version: number; details: unknown }): Paciente => {
const flat = asRecord(result.details);
const nameValue = requiredString(flat.name, 'name');
const subtypeValue = requiredString(flat.subtype, 'subtype');
const statusValue = requiredString(flat.status, 'status');
if (subtypeValue !== 'Person' || !['Active', 'Inactive', 'Merged', 'Blocked'].includes(statusValue)) {
throw new AppError('INVALID_MDM_RECORD', 'The MDM record has an invalid patient identity.', 500);
}
const identificationData: Paciente['details']['identification'] = {
subtype: 'Person',
name: nameValue,
status: statusValue as Paciente['details']['identification']['status']
};
if (flat.docType != null) identificationData.docType = String(flat.docType) as Paciente['details']['identification']['docType'];
if (flat.docId != null) identificationData.docId = String(flat.docId);
const details: Paciente['details'] = {
identification: identificationData,
base: { contacts: Array.isArray(flat.contacts) ? flat.contacts as Record<string, unknown>[] : [] }
};
if (flat.privacyConsent != null && typeof flat.privacyConsent === 'object') details.person = { privacyConsent: flat.privacyConsent as Record<string, unknown> };
if (flat.general != null && typeof flat.general === 'object') details.general = flat.general as Record<string, unknown>;
if (flat.agendaClinica != null && typeof flat.agendaClinica === 'object') details.agendaClinica = flat.agendaClinica as Record<string, unknown>;
return { id: String(result.mdmId), version: Number(result.version), details };
};
const matches = (patient: Paciente): boolean => {
if (subtype !== undefined && patient.details.identification.subtype !== subtype) return false;
if (status !== undefined && patient.details.identification.status !== status) return false;
if (docType !== undefined && patient.details.identification.docType !== docType) return false;
if (docId !== undefined && patient.details.identification.docId !== docId) return false;
if (name !== undefined && !patient.details.identification.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) return false;
if (hasContactsFilter && !sameValue(patient.details.base.contacts, contacts)) return false;
return true;
};

const results: Paciente[] = [];
if (id !== undefined) {
const found = await ctx.mdm.entity.get({ mdmId: id });
const patient = toPaciente(found);
if (matches(patient)) results.push(patient);
return { items: matches(patient) ? results : [], hasMore: false };
}
if (docType !== undefined && docId !== undefined) {
const found = await ctx.mdm.entity.findByDocument(docType, docId);
if (found !== null) {
const patient = toPaciente(found);
if (matches(patient)) results.push(patient);
}
return { items: results, hasMore: false };
}

const requiresLocalFiltering = subtype !== undefined || status !== undefined || docType !== undefined || docId !== undefined || hasContactsFilter;
if (!requiresLocalFiltering) {
const listed = await ctx.mdm.collection.listByType({ type: 'agendaClinica.Paciente', name, page, pageSize });
for (const item of listed.items) {
const full = await ctx.mdm.entity.get({ mdmId: String(item.mdmId) });
results.push(toPaciente(full));
}
return { items: results, hasMore: page * pageSize < listed.total };
}

const all: Paciente[] = [];
let remotePage = 1;
let total = 0;
do {
const listed = await ctx.mdm.collection.listByType({ type: 'agendaClinica.Paciente', name, page: remotePage, pageSize: 200 });
if (remotePage === 1) total = listed.total;
for (const item of listed.items) {
const full = await ctx.mdm.entity.get({ mdmId: String(item.mdmId) });
const patient = toPaciente(full);
if (matches(patient)) all.push(patient);
}
remotePage += 1;
if (listed.items.length === 0 || remotePage * 200 > total + 200) break;
} while ((remotePage - 1) * 200 < total);
const start = (page - 1) * pageSize;
return { items: all.slice(start, start + pageSize), hasMore: start + pageSize < all.length };
}
