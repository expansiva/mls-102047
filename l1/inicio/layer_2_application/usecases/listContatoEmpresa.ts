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

const ROLE = 'inicio.ContatoEmpresa';

function present(value: unknown): boolean {
  return value !== undefined && value !== null && value !== '';
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function toContato(mdmId: string, version: number, flatDetails: unknown): ContatoEmpresa {
  const flat = asRecord(flatDetails);
  const details: ContatoEmpresa['details'] = {
    identification: {
      subtype: 'ContactChannel',
      name: String(flat.name ?? ''),
      status: String(flat.status ?? '') as ContatoEmpresa['details']['identification']['status'],
      countryCode: String(flat.countryCode ?? ''),
    },
    contactChannel: {
      contactType: String(flat.contactType ?? '') as ContatoEmpresa['details']['contactChannel']['contactType'],
      value: String(flat.value ?? ''),
      isVerified: flat.isVerified === true,
    },
  };
  if (flat.base != null) details.base = asRecord(flat.base);
  if (flat.general != null) details.general = asRecord(flat.general);
  if (flat.inicio != null) details.inicio = asRecord(flat.inicio);
  return { id: mdmId, version, details };
}

export async function listContatoEmpresa(input: ListContatoEmpresaInput, ctx: RequestContext): Promise<ListContatoEmpresaOutput> {
  const rawPage = Number(input.page);
  const rawSize = Number(input.pageSize);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  const pageSize = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(Math.floor(rawSize), 200) : 20;

  const readOne = async (mdmId: string): Promise<ContatoEmpresa> => {
    const found = await ctx.mdm.entity.get({ mdmId });
    return toContato(String(found.mdmId), Number(found.version), found.details);
  };

  // Point read by id.
  if (present(input.id)) {
    const one = await readOne(String(input.id));
    return { items: [one], hasMore: false };
  }

  const identification = input.details?.identification;
  const channel = input.details?.contactChannel;

  // Point lookup by contact type and value.
  if (present(channel?.contactType) && present(channel?.value)) {
    const found = await ctx.mdm.entity.findByContact(String(channel?.contactType), String(channel?.value));
    if (!found) return { items: [], hasMore: false };
    const one = toContato(String(found.mdmId), Number(found.version), found.details);
    return { items: [one], hasMore: false };
  }

  type ListArgs = Parameters<typeof ctx.mdm.collection.listByType>[0];
  const baseArgs: ListArgs = { type: ROLE };
  if (present(identification?.name)) baseArgs.name = String(identification?.name);
  if (present(identification?.status)) baseArgs.status = String(identification?.status) as ListArgs['status'];

  const countryCode = present(identification?.countryCode) ? String(identification?.countryCode) : null;
  const verified = typeof channel?.isVerified === 'boolean' ? channel.isVerified : null;
  const contactType = present(channel?.contactType) ? String(channel?.contactType) : null;
  const needsPostFilter = countryCode !== null || verified !== null || contactType !== null;

  if (!needsPostFilter) {
    const result = await ctx.mdm.collection.listByType({ ...baseArgs, page, pageSize });
    const items: ContatoEmpresa[] = [];
    for (const row of result.items) {
      items.push(await readOne(String(row.mdmId)));
    }
    return { items, hasMore: page * pageSize < result.total };
  }

  const kept: ContatoEmpresa[] = [];
  let current = 1;
  const scanSize = 200;
  for (;;) {
    const result = await ctx.mdm.collection.listByType({ ...baseArgs, page: current, pageSize: scanSize });
    for (const row of result.items) {
      const contato = await readOne(String(row.mdmId));
      if (countryCode !== null && contato.details.identification.countryCode !== countryCode) continue;
      if (verified !== null && contato.details.contactChannel.isVerified !== verified) continue;
      if (contactType !== null && contato.details.contactChannel.contactType !== contactType) continue;
      kept.push(contato);
    }
    if (current * scanSize >= result.total || result.items.length === 0) break;
    current += 1;
  }
  const start = (page - 1) * pageSize;
  const items = kept.slice(start, start + pageSize);
  return { items, hasMore: start + pageSize < kept.length };
}

void AppError;
