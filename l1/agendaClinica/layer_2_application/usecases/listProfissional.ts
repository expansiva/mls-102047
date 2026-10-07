/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/listProfissional.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Profissional } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/profissional.js';
export interface ListProfissionalInput extends Record<string, unknown> {
id?: string;
details?: {
identification?: {
subtype?: string;
name?: string;
status?: string;
docType?: string;
docId?: string;
countryCode?: string;
};
base?: Record<string, unknown>;
person?: {
privacyConsent?: Record<string, unknown>;
};
general?: Record<string, unknown>;
agendaClinica?: {
professionalType?: string;
};
};
page: number;
pageSize: number;
}
export interface ListProfissionalOutput extends Record<string, unknown> {
items: Profissional[];
hasMore: boolean;
}

export async function listProfissional(input: ListProfissionalInput, ctx: RequestContext): Promise<ListProfissionalOutput> {
const page = Number(input.page);
const requestedPageSize = Number(input.pageSize);
const currentPage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
const pageSize = Number.isFinite(requestedPageSize) && requestedPageSize >= 1
? Math.min(200, Math.floor(requestedPageSize))
: 20;

const identification = input.details?.identification;
const moduleDetails = input.details?.agendaClinica;
const hasFilter = (value: unknown): boolean => value !== undefined && value !== null;
const idFilter = hasFilter(input.id) ? String(input.id) : undefined;
const subtypeFilter = hasFilter(identification?.subtype) ? String(identification?.subtype) : undefined;
const nameFilter = hasFilter(identification?.name) ? String(identification?.name) : undefined;
const statusFilter = hasFilter(identification?.status) ? String(identification?.status) : undefined;
const docTypeFilter = hasFilter(identification?.docType) ? String(identification?.docType) : undefined;
const docIdFilter = hasFilter(identification?.docId) ? String(identification?.docId) : undefined;
const countryCodeFilter = hasFilter(identification?.countryCode) ? String(identification?.countryCode) : undefined;
const professionalTypeFilter = hasFilter(moduleDetails?.professionalType) ? String(moduleDetails?.professionalType) : undefined;

const indexRows: Array<{ mdmId: string; details: Record<string, unknown> }> = [];
let sourcePage = 1;
let sourceTotal = 0;
do {
const result = await ctx.mdm.collection.listByType({
 type: 'agendaClinica.Profissional',
 page: sourcePage,
 pageSize: 200
});
sourceTotal = result.total;
for (const item of result.items) {
indexRows.push({ mdmId: item.mdmId, details: item.details });
}
sourcePage += 1;
} while (indexRows.length < sourceTotal);

const matches = indexRows.filter((row) => {
const details = row.details;
const agenda = details.agendaClinica;
const moduleRecord = agenda && typeof agenda === 'object' ? agenda as Record<string, unknown> : undefined;
const name = details.name == null ? undefined : String(details.name);
const subtype = details.subtype == null ? undefined : String(details.subtype);
const status = details.status == null ? undefined : String(details.status);
const docType = details.docType == null ? undefined : String(details.docType);
const docId = details.docId == null ? undefined : String(details.docId);
const countryCode = details.countryCode == null ? undefined : String(details.countryCode);
const professionalType = moduleRecord?.professionalType == null ? undefined : String(moduleRecord.professionalType);
return (!idFilter || row.mdmId === idFilter)
&& (!subtypeFilter || subtype === subtypeFilter)
&& (!nameFilter || (name ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(nameFilter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()))
&& (!statusFilter || status === statusFilter)
&& (!docTypeFilter || docType === docTypeFilter)
&& (!docIdFilter || docId === docIdFilter)
&& (!countryCodeFilter || countryCode === countryCodeFilter)
&& (!professionalTypeFilter || professionalType === professionalTypeFilter);
});

const start = (currentPage - 1) * pageSize;
const selected = matches.slice(start, start + pageSize);
const items: Profissional[] = [];
for (const row of selected) {
const record = await ctx.mdm.entity.get({ mdmId: row.mdmId });
const details = record.details;
const requiredString = (value: unknown, field: string): string => {
if (value == null || value === '') {
throw new AppError('INVALID_MDM_RECORD', `Professional is missing ${field}.`, 400);
}
return String(value);
};
const subtype = requiredString(details.subtype, 'subtype');
const name = requiredString(details.name, 'name');
const status = requiredString(details.status, 'status');
const countryCode = requiredString(details.countryCode, 'countryCode');
const professionalType = requiredString((details.agendaClinica as Record<string, unknown> | undefined)?.professionalType, 'professionalType');
if (subtype !== 'Person' || (status !== 'Active' && status !== 'Inactive' && status !== 'Merged' && status !== 'Blocked') || (professionalType !== 'medical' && professionalType !== 'therapist')) {
throw new AppError('INVALID_MDM_RECORD', 'Professional contains an invalid platform or module value.', 400);
}
const identification: Profissional['details']['identification'] = {
subtype,
name,
status,
countryCode
};
if (details.docType != null) identification.docType = String(details.docType) as Profissional['details']['identification']['docType'];
if (details.docId != null) identification.docId = String(details.docId);
const groupedDetails: Profissional['details'] = {
identification,
agendaClinica: { professionalType }
};
if (details.base != null && typeof details.base === 'object') groupedDetails.base = details.base as Record<string, unknown>;
if (details.general != null && typeof details.general === 'object') groupedDetails.general = details.general as Record<string, unknown>;
if (details.privacyConsent != null && typeof details.privacyConsent === 'object') groupedDetails.person = { privacyConsent: details.privacyConsent as Record<string, unknown> };
items.push({ id: record.mdmId, version: record.version, details: groupedDetails });
}
return { items, hasMore: start + pageSize < matches.length };
}
