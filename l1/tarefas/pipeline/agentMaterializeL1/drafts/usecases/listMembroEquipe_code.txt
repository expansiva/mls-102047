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

type MembroStatus = MembroEquipe['details']['identification']['status'];
type ListByTypeInput = Parameters<RequestContext['mdm']['collection']['listByType']>[0];
type ListStatus = NonNullable<ListByTypeInput['status']>;

function isPresent(value: unknown): boolean {
  return value !== undefined && value !== null && value !== '';
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function toRecord(value: object | null | undefined): Record<string, unknown> {
  if (value == null) return {};
  return Object.fromEntries(Object.entries(value));
}

function pack(mdmId: string, version: number, rawDetails: object | null | undefined): MembroEquipe {
  if (rawDetails == null) {
    throw new AppError('INVALID_RECORD', 'MembroEquipe ' + mdmId + ' has no details.', 500);
  }
  const flat = toRecord(rawDetails);
  const tags: string[] = Array.isArray(flat.tags) ? flat.tags.map((tag) => String(tag)) : [];
  const contacts: Record<string, unknown>[] = Array.isArray(flat.contacts) ? flat.contacts.filter(isObject) : [];
  const details: MembroEquipe['details'] = {
    identification: {
      subtype: 'Person',
      name: String(flat.name ?? ''),
      status: String(flat.status ?? '') as MembroStatus,
      countryCode: String(flat.countryCode ?? ''),
      tags,
    },
    base: { contacts },
  };
  if (isObject(flat.privacyConsent)) {
    details.person = { privacyConsent: flat.privacyConsent };
  }
  if (isObject(flat.general)) details.general = flat.general;
  if (isObject(flat.tarefas)) details.tarefas = flat.tarefas;
  return { id: mdmId, version, details };
}

export async function listMembroEquipe(input: ListMembroEquipeInput, ctx: RequestContext): Promise<ListMembroEquipeOutput> {
  if (isPresent(input.id)) {
    const found = await ctx.mdm.entity.get({ mdmId: String(input.id) });
    if (!found) {
      throw new AppError('NOT_FOUND', 'MembroEquipe ' + String(input.id) + ' not found.', 404);
    }
    return { items: [pack(String(found.mdmId), Number(found.version), found.details)], hasMore: false };
  }

  const rawPage = Number(input.page);
  const rawSize = Number(input.pageSize);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  const pageSize = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(200, Math.floor(rawSize)) : 20;

  const query: ListByTypeInput = { type: 'tarefas.MembroEquipe', page, pageSize };
  const name = input.details?.identification?.name;
  if (isPresent(name)) query.name = String(name);
  const status = input.details?.identification?.status;
  if (isPresent(status)) query.status = String(status) as ListStatus;

  const result = await ctx.mdm.collection.listByType(query);
  const items: MembroEquipe[] = [];
  for (const item of result.items) {
    const row = toRecord(item);
    const mdmId = String(row.mdmId);
    if (typeof row.version === 'number') {
      items.push(pack(mdmId, row.version, item.details));
    } else {
      const full = await ctx.mdm.entity.get({ mdmId });
      if (!full) {
        throw new AppError('NOT_FOUND', 'MembroEquipe ' + mdmId + ' not found.', 404);
      }
      items.push(pack(String(full.mdmId), Number(full.version), full.details));
    }
  }
  return { items, hasMore: result.page * result.pageSize < result.total };
}
