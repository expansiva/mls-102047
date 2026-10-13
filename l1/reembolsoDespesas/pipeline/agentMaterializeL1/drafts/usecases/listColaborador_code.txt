/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listColaborador.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Colaborador } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/colaborador.js';

export interface ListColaboradorInput extends Record<string, unknown> {
  id?: string;
  details?: {
    identification?: {
      subtype?: string;
      name?: string;
      status?: string;
      docType?: string;
      docId?: string;
      countryCode?: string;
      tags?: string;
    };
    base?: {
      relationshipRefs?: Record<string, unknown>;
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    reembolsoDespesas?: Record<string, unknown>;
  };
  page: number;
  pageSize: number;
}

export interface ListColaboradorOutput extends Record<string, unknown> {
  items: Colaborador[];
  hasMore: boolean;
}

const ROLE = 'reembolsoDespesas.Colaborador';
const MAX_PAGE_SIZE = 200;

type Ident = Colaborador['details']['identification'];

function has(value: unknown): boolean {
  return value != null && value !== '';
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value != null && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function toColaborador(mdmId: string, version: number, flat: Record<string, unknown>): Colaborador {
  const identification: Ident = {
    subtype: 'Person',
    name: String(flat.name ?? ''),
    status: String(flat.status ?? 'Active') as Ident['status'],
    countryCode: String(flat.countryCode ?? ''),
    tags: Array.isArray(flat.tags) ? flat.tags.map((tag) => String(tag)) : [],
  };
  if (flat.docType != null) identification.docType = String(flat.docType) as NonNullable<Ident['docType']>;
  if (flat.docId != null) identification.docId = String(flat.docId);
  const details: Colaborador['details'] = {
    identification,
    base: {
      relationshipRefs: asRecord(flat.relationshipRefs),
    },
  };
  if (flat.privacyConsent != null && typeof flat.privacyConsent === 'object') {
    details.person = { privacyConsent: asRecord(flat.privacyConsent) };
  }
  if (flat.general != null && typeof flat.general === 'object') {
    details.general = asRecord(flat.general);
  }
  if (flat.reembolsoDespesas != null && typeof flat.reembolsoDespesas === 'object') {
    details.reembolsoDespesas = asRecord(flat.reembolsoDespesas);
  }
  return { id: mdmId, version, details };
}

export async function listColaborador(input: ListColaboradorInput, ctx: RequestContext): Promise<ListColaboradorOutput> {
  const ident = input.details?.identification;
  const rawPage = Number(input.page);
  const rawSize = Number(input.pageSize);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  const pageSize = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(Math.floor(rawSize), MAX_PAGE_SIZE) : 20;

  type ListQuery = Parameters<typeof ctx.mdm.collection.listByType>[0];

  const makeQuery = (queryPage: number, querySize: number): ListQuery => {
    const query: ListQuery = { type: ROLE, page: queryPage, pageSize: querySize };
    if (has(ident?.name)) query.name = String(ident?.name);
    if (has(ident?.status)) query.status = String(ident?.status) as NonNullable<ListQuery['status']>;
    if (has(ident?.subtype)) query.subtype = String(ident?.subtype) as NonNullable<ListQuery['subtype']>;
    if (has(ident?.tags)) query.tags = [String(ident?.tags)];
    return query;
  };

  const hydrate = async (mdmId: string): Promise<Colaborador> => {
    const full = await ctx.mdm.entity.get({ mdmId });
    return toColaborador(String(full.mdmId), Number(full.version), asRecord(full.details));
  };

  const matches = (item: Colaborador): boolean => {
    const i = item.details.identification;
    if (!i.tags.includes(ROLE)) return false;
    if (has(ident?.subtype) && i.subtype !== ident?.subtype) return false;
    if (has(ident?.status) && i.status !== ident?.status) return false;
    if (has(ident?.docType) && i.docType !== ident?.docType) return false;
    if (has(ident?.docId) && i.docId !== ident?.docId) return false;
    if (has(ident?.countryCode) && i.countryCode !== ident?.countryCode) return false;
    if (has(ident?.tags) && !i.tags.includes(String(ident?.tags))) return false;
    if (has(ident?.name) && !i.name.toLowerCase().includes(String(ident?.name).toLowerCase())) return false;
    return true;
  };

  if (has(input.id)) {
    const mdmId = String(input.id);
    const found = await ctx.mdm.entity.get({ mdmId });
    if (!found) throw new AppError('NOT_FOUND', 'Colaborador not found.', 404);
    const item = toColaborador(String(found.mdmId), Number(found.version), asRecord(found.details));
    const kept: Colaborador[] = matches(item) ? [item] : [];
    return { items: page === 1 ? kept : [], hasMore: false };
  }

  if (has(ident?.docType) && has(ident?.docId)) {
    const found = await ctx.mdm.entity.findByDocument(String(ident?.docType), String(ident?.docId));
    if (!found) return { items: [], hasMore: false };
    const item = toColaborador(String(found.mdmId), Number(found.version), asRecord(found.details));
    const kept: Colaborador[] = matches(item) ? [item] : [];
    return { items: page === 1 ? kept : [], hasMore: false };
  }

  const needsMemoryFilter = has(ident?.countryCode);

  if (!needsMemoryFilter) {
    const result = await ctx.mdm.collection.listByType(makeQuery(page, pageSize));
    const items: Colaborador[] = [];
    for (const row of result.items) {
      items.push(await hydrate(String(row.mdmId)));
    }
    return { items, hasMore: page * pageSize < Number(result.total) };
  }

  const kept: Colaborador[] = [];
  let current = 1;
  for (;;) {
    const result = await ctx.mdm.collection.listByType(makeQuery(current, MAX_PAGE_SIZE));
    for (const row of result.items) {
      const item = await hydrate(String(row.mdmId));
      if (matches(item)) kept.push(item);
    }
    if (current * MAX_PAGE_SIZE >= Number(result.total) || result.items.length === 0) break;
    current += 1;
  }
  const start = (page - 1) * pageSize;
  return { items: kept.slice(start, start + pageSize), hasMore: start + pageSize < kept.length };
}
