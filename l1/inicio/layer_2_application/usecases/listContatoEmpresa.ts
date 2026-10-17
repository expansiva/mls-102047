/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/listContatoEmpresa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ContatoEmpresa } from '/_102047_/l1/inicio/layer_3_domain/entities/contatoEmpresa.js';

export interface ListContatoEmpresaInput extends Record<string, unknown> {
  id?: string;
  details?: {
    identification?: {
      subtype?: string;
      name?: string;
      status?: string;
      countryCode?: string;
    };
    base?: Record<string, unknown>;
    contactChannel?: {
      contactType?: string;
      value?: string;
      isVerified?: boolean;
    };
    general?: Record<string, unknown>;
    inicio?: Record<string, unknown>;
  };
  page: number;
  pageSize: number;
}

export interface ListContatoEmpresaOutput extends Record<string, unknown> {
  items: ContatoEmpresa[];
  hasMore: boolean;
}

type Status = 'Active' | 'Inactive' | 'Merged' | 'Blocked';
type ContactType = 'Phone' | 'Email' | 'WhatsApp';

const ROLE = 'inicio.ContatoEmpresa';
const STATUSES: ReadonlyArray<Status> = ['Active', 'Inactive', 'Merged', 'Blocked'];
const CONTACT_TYPES: ReadonlyArray<ContactType> = ['Phone', 'Email', 'WhatsApp'];

function present(value: unknown): boolean {
  return value !== undefined && value !== null && value !== '';
}

function asStatus(value: unknown): Status {
  const found = STATUSES.find((s) => s === value);
  if (!found) throw new AppError('INVALID_MDM_RECORD', 'The contact record has an unknown status.', 500);
  return found;
}

function asContactType(value: unknown): ContactType {
  const found = CONTACT_TYPES.find((t) => t === value);
  if (!found) throw new AppError('INVALID_MDM_RECORD', 'The contact record has an unknown contact type.', 500);
  return found;
}

function toContato(mdmId: string, version: number, flat: Record<string, unknown>): ContatoEmpresa {
  const contato: ContatoEmpresa = {
    id: mdmId,
    version,
    details: {
      identification: {
        subtype: 'ContactChannel',
        name: String(flat.name ?? ''),
        status: asStatus(flat.status),
        countryCode: String(flat.countryCode ?? ''),
      },
      contactChannel: {
        contactType: asContactType(flat.contactType),
        value: String(flat.value ?? ''),
        isVerified: flat.isVerified === true,
      },
    },
  };
  if (flat.base != null && typeof flat.base === 'object' && !Array.isArray(flat.base)) {
    contato.details.base = { ...(flat.base as Record<string, unknown>) };
  }
  if (flat.general != null && typeof flat.general === 'object' && !Array.isArray(flat.general)) {
    contato.details.general = { ...(flat.general as Record<string, unknown>) };
  }
  if (flat.inicio != null && typeof flat.inicio === 'object' && !Array.isArray(flat.inicio)) {
    contato.details.inicio = { ...(flat.inicio as Record<string, unknown>) };
  }
  return contato;
}

export async function listContatoEmpresa(input: ListContatoEmpresaInput, ctx: RequestContext): Promise<ListContatoEmpresaOutput> {
  const rawPage = Number(input.page);
  const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;
  const rawSize = Number(input.pageSize);
  const pageSize = Number.isInteger(rawSize) && rawSize >= 1 ? Math.min(rawSize, 200) : 20;

  const identification = input.details?.identification;
  const channel = input.details?.contactChannel;

  const nameFilter = present(identification?.name) ? String(identification?.name) : undefined;
  const statusFilter: Status | undefined = present(identification?.status) ? asStatus(identification?.status) : undefined;
  const countryFilter = present(identification?.countryCode) ? String(identification?.countryCode) : undefined;
  const typeFilter = present(channel?.contactType) ? String(channel?.contactType) : undefined;
  const valueFilter = present(channel?.value) ? String(channel?.value) : undefined;
  const verifiedFilter = typeof channel?.isVerified === 'boolean' ? channel.isVerified : undefined;

  const matches = (c: ContatoEmpresa): boolean => {
    if (countryFilter !== undefined && c.details.identification.countryCode !== countryFilter) return false;
    if (typeFilter !== undefined && c.details.contactChannel.contactType !== typeFilter) return false;
    if (valueFilter !== undefined && c.details.contactChannel.value !== valueFilter) return false;
    if (verifiedFilter !== undefined && c.details.contactChannel.isVerified !== verifiedFilter) return false;
    if (statusFilter !== undefined && c.details.identification.status !== statusFilter) return false;
    return true;
  };

  // Point read by id.
  if (present(input.id)) {
    const found = await ctx.mdm.entity.get({ mdmId: String(input.id) });
    const flat: Record<string, unknown> = { ...found.details };
    const contato = toContato(found.mdmId, found.version, flat);
    const items = matches(contato) ? [contato] : [];
    return { items, hasMore: false };
  }

  // Point lookup by contact type and value.
  if (typeFilter !== undefined && valueFilter !== undefined) {
    const found = await ctx.mdm.entity.findByContact(typeFilter, valueFilter);
    if (!found) return { items: [], hasMore: false };
    const flat: Record<string, unknown> = { ...found.details };
    const contato = toContato(found.mdmId, found.version, flat);
    const items = matches(contato) ? [contato] : [];
    return { items, hasMore: false };
  }

  const needsPostFilter =
    countryFilter !== undefined || typeFilter !== undefined || valueFilter !== undefined || verifiedFilter !== undefined;

  if (!needsPostFilter) {
    const result = await ctx.mdm.collection.listByType({
      type: ROLE,
      name: nameFilter,
      status: statusFilter,
      page,
      pageSize,
    });
    const items: ContatoEmpresa[] = [];
    for (const row of result.items) {
      const full = await ctx.mdm.entity.get({ mdmId: String(row.mdmId) });
      const flat: Record<string, unknown> = { ...full.details };
      items.push(toContato(full.mdmId, full.version, flat));
    }
    return { items, hasMore: page * pageSize < result.total };
  }

  // Filters the index does not carry: read every page, keep the matches and paginate here.
  const kept: ContatoEmpresa[] = [];
  let current = 1;
  for (;;) {
    const result = await ctx.mdm.collection.listByType({
      type: ROLE,
      name: nameFilter,
      status: statusFilter,
      page: current,
      pageSize: 200,
    });
    for (const row of result.items) {
      const full = await ctx.mdm.entity.get({ mdmId: String(row.mdmId) });
      const flat: Record<string, unknown> = { ...full.details };
      const contato = toContato(full.mdmId, full.version, flat);
      if (matches(contato)) kept.push(contato);
    }
    if (current * 200 >= result.total || result.items.length === 0) break;
    current += 1;
  }
  const start = (page - 1) * pageSize;
  const items = kept.slice(start, start + pageSize);
  return { items, hasMore: start + pageSize < kept.length };
}
