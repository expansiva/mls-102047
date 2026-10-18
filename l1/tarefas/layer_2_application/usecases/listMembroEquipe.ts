/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MembroEquipe } from '/_102047_/l1/tarefas/layer_3_domain/entities/membroEquipe.js';
export interface ListMembroEquipeInput extends Record<string, unknown> {
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
};
person?: {
privacyConsent?: Record<string, unknown>;
};
general?: Record<string, unknown>;
tarefas?: Record<string, unknown>;
};
page: number;
pageSize: number;
}
export interface ListMembroEquipeOutput extends Record<string, unknown> {
items: MembroEquipe[];
hasMore: boolean;
}
type MdmListQuery = Parameters<RequestContext['mdm']['collection']['listByType']>[0];
export async function listMembroEquipe(input: ListMembroEquipeInput, ctx: RequestContext): Promise<ListMembroEquipeOutput> {
const present = (value: unknown): boolean => value !== undefined && value !== null && value !== '';
const rawPage = Number(input.page);
const rawSize = Number(input.pageSize);
const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
const pageSize = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(200, Math.floor(rawSize)) : 20;
const ident = input.details?.identification;
const nameFilter = present(ident?.name) ? String(ident?.name) : undefined;
const statusFilter = present(ident?.status) ? String(ident?.status) : undefined;
const subtypeFilter = present(ident?.subtype) ? String(ident?.subtype) : undefined;
const countryFilter = present(ident?.countryCode) ? String(ident?.countryCode) : undefined;
const tagsRaw = ident?.tags;
const tagsFilter = Array.isArray(tagsRaw) && tagsRaw.length > 0 ? tagsRaw.map((tag) => String(tag)) : undefined;

const pack = (full: { mdmId: string; version: number; details: unknown }): MembroEquipe => {
const d: Record<string, unknown> = full.details && typeof full.details === 'object' ? (full.details as Record<string, unknown>) : {};
const tags = d.tags;
const member: MembroEquipe = {
id: String(full.mdmId),
version: Number(full.version),
details: {
identification: {
subtype: 'Person',
name: String(d.name ?? ''),
status: String(d.status ?? '') as MembroEquipe['details']['identification']['status'],
countryCode: String(d.countryCode ?? ''),
tags: Array.isArray(tags) ? tags.map((tag) => String(tag)) : [],
},
base: {
contacts: Array.isArray(d.contacts) ? (d.contacts as Record<string, unknown>[]) : [],
},
},
};
if (d.privacyConsent != null) member.details.person = { privacyConsent: d.privacyConsent as Record<string, unknown> };
if (d.general != null) member.details.general = d.general as Record<string, unknown>;
if (d.tarefas != null) member.details.tarefas = d.tarefas as Record<string, unknown>;
return member;
};

const matches = (member: MembroEquipe): boolean => {
const id = member.details.identification;
if (statusFilter !== undefined && id.status !== statusFilter) return false;
if (countryFilter !== undefined && id.countryCode !== countryFilter) return false;
if (tagsFilter !== undefined && !tagsFilter.every((tag) => id.tags.includes(tag))) return false;
return true;
};

const hydrate = async (row: { mdmId: string }): Promise<MembroEquipe> => {
const full = await ctx.mdm.entity.get({ mdmId: String(row.mdmId) });
return pack(full);
};

if (present(input.id)) {
const found = await ctx.mdm.entity.get({ mdmId: String(input.id) });
const member = pack(found);
const items: MembroEquipe[] = matches(member) ? [member] : [];
return { items, hasMore: false };
}

const buildQuery = (pageNumber: number, size: number): MdmListQuery => {
const query: MdmListQuery = { type: 'tarefas.MembroEquipe', page: pageNumber, pageSize: size };
if (nameFilter !== undefined) query.name = nameFilter;
if (statusFilter !== undefined) query.status = statusFilter as MdmListQuery['status'];
if (subtypeFilter !== undefined) query.subtype = subtypeFilter as MdmListQuery['subtype'];
if (tagsFilter !== undefined) query.tags = tagsFilter;
return query;
};

if (countryFilter === undefined) {
const result = await ctx.mdm.collection.listByType(buildQuery(page, pageSize));
const items: MembroEquipe[] = [];
for (const item of result.items) {
items.push(await hydrate(item));
}
return { items, hasMore: page * pageSize < Number(result.total) };
}

// countryCode is not a listByType filter: list every page, keep the matching ones and paginate here.
const kept: MembroEquipe[] = [];
let current = 1;
for (;;) {
const result = await ctx.mdm.collection.listByType(buildQuery(current, 200));
for (const item of result.items) {
const member = await hydrate(item);
if (matches(member)) kept.push(member);
}
if (result.items.length === 0 || current * 200 >= Number(result.total)) break;
current += 1;
}
const start = (page - 1) * pageSize;
const items = kept.slice(start, start + pageSize);
return { items, hasMore: start + pageSize < kept.length };
}
