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
tags?: string;
};
base?: {
contacts?: Record<string, unknown>;
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

type MembroStatus = 'Active' | 'Inactive' | 'Merged' | 'Blocked';

function toRecord(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function toMembro(mdmId: string, version: number, flatValue: unknown): MembroEquipe {
  const flat = toRecord(flatValue);
  const tags = Array.isArray(flat.tags) ? flat.tags.map((tag) => String(tag)) : [];
  const contacts = Array.isArray(flat.contacts) ? flat.contacts.map((contact) => toRecord(contact)) : [];
  const details: MembroEquipe['details'] = {
    identification: {
      subtype: 'Person',
      name: String(flat.name ?? ''),
      status: String(flat.status ?? 'Active') as MembroStatus,
      countryCode: String(flat.countryCode ?? ''),
      tags,
    },
    base: { contacts },
  };
  if (flat.privacyConsent != null) details.person = { privacyConsent: toRecord(flat.privacyConsent) };
  if (flat.general != null) details.general = toRecord(flat.general);
  if (flat.tarefas != null) details.tarefas = toRecord(flat.tarefas);
  return { id: mdmId, version, details };
}

export async function listMembroEquipe(input: ListMembroEquipeInput, ctx: RequestContext): Promise<ListMembroEquipeOutput> {
  const rawPage = Number(input.page);
  const rawSize = Number(input.pageSize);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  const pageSize = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(200, Math.floor(rawSize)) : 20;

  const id = input.id;
  if (id !== undefined && id !== null && id !== '') {
    const found = await ctx.mdm.entity.get({ mdmId: String(id) });
    if (!found) throw new AppError('NOT_FOUND', 'MembroEquipe not found: ' + String(id), 404);
    return { items: [toMembro(found.mdmId, found.version, found.details)], hasMore: false };
  }

  const params: Record<string, unknown> = { type: 'tarefas.MembroEquipe', page, pageSize };
  const name = input.details?.identification?.name;
  if (name !== undefined && name !== null && name !== '') params.name = String(name);
  const status = input.details?.identification?.status;
  if (status !== undefined && status !== null && status !== '') params.status = String(status);

  const result = await ctx.mdm.collection.listByType(params as never);
  const items: MembroEquipe[] = [];
  for (const item of result.items) {
    const full = await ctx.mdm.entity.get({ mdmId: String(item.mdmId) });
    if (!full) throw new AppError('NOT_FOUND', 'MembroEquipe not found: ' + String(item.mdmId), 404);
    items.push(toMembro(full.mdmId, full.version, full.details));
  }
  return { items, hasMore: result.page * result.pageSize < result.total };
}
