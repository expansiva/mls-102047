/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { PessoaOrganizacao } from '/_102047_/l1/inicio/layer_3_domain/entities/pessoaOrganizacao.js';
export interface ListPessoaOrganizacaoInput extends Record<string, unknown> {
id?: string;
details?: {
identification?: {
subtype?: string;
name?: string;
status?: string;
countryCode?: string;
tags?: string[];
};
base?: {
contacts?: Record<string, unknown>[];
relationshipRefs?: Record<string, unknown>;
};
person?: {
privacyConsent?: Record<string, unknown>;
};
general?: Record<string, unknown>;
inicio?: {
acessoCompleto?: boolean;
dadosFaltantes?: string;
consentimentoExigido?: boolean;
};
};
page: number;
pageSize: number;
}
export interface ListPessoaOrganizacaoOutput extends Record<string, unknown> {
items: PessoaOrganizacao[];
hasMore: boolean;
}
const CONSENT_COUNTRIES: ReadonlyArray<string> = [
'BR', 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];
function isPresent(value: unknown): boolean {
return value !== undefined && value !== null && value !== '';
}
function toRow(item: object): Record<string, unknown> {
return Object.fromEntries(Object.entries(item));
}
function pack(mdmId: string, version: number, flatInput: unknown): PessoaOrganizacao {
const flat: Record<string, unknown> = flatInput && typeof flatInput === 'object' ? flatInput as Record<string, unknown> : {};
const name = flat.name == null ? '' : String(flat.name);
const countryCode = flat.countryCode == null ? '' : String(flat.countryCode);
const status = (flat.status == null ? 'Active' : String(flat.status)) as PessoaOrganizacao['details']['identification']['status'];
const tags = Array.isArray(flat.tags) ? (flat.tags as unknown[]).map((tag) => String(tag)) : [];
const contacts = Array.isArray(flat.contacts) ? flat.contacts as Record<string, unknown>[] : [];
const relationshipRefs = flat.relationshipRefs && typeof flat.relationshipRefs === 'object' ? flat.relationshipRefs as Record<string, unknown> : {};
const privacyConsent = flat.privacyConsent && typeof flat.privacyConsent === 'object' ? flat.privacyConsent as Record<string, unknown> : undefined;
const consentimentoExigido = CONSENT_COUNTRIES.includes(countryCode);
const missing: string[] = [];
if (!name) missing.push('nome');
if (!countryCode) missing.push('país');
if (consentimentoExigido && !privacyConsent) missing.push('consentimento de privacidade');
const details: PessoaOrganizacao['details'] = {
identification: { subtype: 'Person', name, status, countryCode, tags },
base: { contacts, relationshipRefs },
inicio: {
acessoCompleto: missing.length === 0,
dadosFaltantes: missing.join(', '),
consentimentoExigido,
},
};
if (privacyConsent) details.person = { privacyConsent };
if (flat.general && typeof flat.general === 'object') details.general = flat.general as Record<string, unknown>;
return { id: mdmId, version, details };
}
export async function listPessoaOrganizacao(input: ListPessoaOrganizacaoInput, ctx: RequestContext): Promise<ListPessoaOrganizacaoOutput> {
type ListArgs = Parameters<typeof ctx.mdm.collection.listByType>[0];
const pageRaw = Number(input.page);
const sizeRaw = Number(input.pageSize);
const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.floor(pageRaw) : 1;
const pageSize = Number.isFinite(sizeRaw) && sizeRaw >= 1 ? Math.min(Math.floor(sizeRaw), 200) : 20;
if (isPresent(input.id)) {
const found = await ctx.mdm.entity.get({ mdmId: String(input.id) });
if (!found) throw new AppError('NOT_FOUND', 'PessoaOrganizacao not found.', 404);
return { items: [pack(found.mdmId, found.version, found.details)], hasMore: false };
}
const ident = input.details?.identification ?? {};
const base: ListArgs = { type: 'inicio.PessoaOrganizacao' };
if (isPresent(ident.name)) base.name = String(ident.name);
if (isPresent(ident.status)) base.status = String(ident.status) as ListArgs['status'];
if (isPresent(ident.subtype)) base.subtype = String(ident.subtype) as ListArgs['subtype'];
const tagsFilter: unknown = ident.tags;
if (Array.isArray(tagsFilter) && tagsFilter.length > 0) base.tags = tagsFilter.map((tag) => String(tag));
const countryFilter = isPresent(ident.countryCode) ? String(ident.countryCode) : '';
const hydrate = async (row: Record<string, unknown>): Promise<PessoaOrganizacao> => {
const mdmId = String(row.mdmId);
if (typeof row.version === 'number') return pack(mdmId, row.version, row.details);
const full = await ctx.mdm.entity.get({ mdmId });
if (!full) throw new AppError('NOT_FOUND', 'PessoaOrganizacao not found: ' + mdmId, 404);
return pack(full.mdmId, full.version, full.details);
};
if (!countryFilter) {
const result = await ctx.mdm.collection.listByType({ ...base, page, pageSize });
const items: PessoaOrganizacao[] = [];
for (const item of result.items) items.push(await hydrate(toRow(item)));
return { items, hasMore: result.page * result.pageSize < result.total };
}
// countryCode is not a filter of the engine: collect the rows, keep the matching ones and paginate here.
const kept: Record<string, unknown>[] = [];
let current = 1;
for (;;) {
const result = await ctx.mdm.collection.listByType({ ...base, page: current, pageSize: 200 });
for (const item of result.items) {
const row = toRow(item);
const rowDetails: Record<string, unknown> = row.details && typeof row.details === 'object' ? row.details as Record<string, unknown> : {};
const code = rowDetails.countryCode ?? row.countryCode;
if (code != null && String(code) === countryFilter) kept.push(row);
}
if (result.items.length === 0 || current * result.pageSize >= result.total) break;
current += 1;
}
const start = (page - 1) * pageSize;
const slice = kept.slice(start, start + pageSize);
const items: PessoaOrganizacao[] = [];
for (const row of slice) items.push(await hydrate(row));
return { items, hasMore: start + pageSize < kept.length };
}
