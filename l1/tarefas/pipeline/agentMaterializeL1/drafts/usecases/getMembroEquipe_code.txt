/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface GetMembroEquipeInput extends Record<string, unknown> {
  id: string;
}

export interface GetMembroEquipeOutput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
      countryCode: string;
      tags: string[];
    };
    base: {
      contacts: Record<string, unknown>[];
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    tarefas?: Record<string, unknown>;
  };
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  value != null && typeof value === 'object' && !Array.isArray(value);

export async function getMembroEquipe(input: GetMembroEquipeInput, ctx: RequestContext): Promise<GetMembroEquipeOutput> {
  const rawId = input.id;
  if (rawId === undefined || rawId === null || String(rawId) === '') {
    throw new AppError('INVALID_INPUT', 'The member id is required.', 400);
  }
  const mdmId = String(rawId);

  const found = await ctx.mdm.entity.get({ mdmId });
  if (!found) throw new AppError('NOT_FOUND', 'Team member was not found.', 404);

  const flat: Record<string, unknown> = { ...found.details };
  const tags = Array.isArray(flat.tags) ? flat.tags.map((tag) => String(tag)) : [];
  const contacts = Array.isArray(flat.contacts) ? flat.contacts.filter(isObject) : [];

  const details: GetMembroEquipeOutput['details'] = {
    identification: {
      subtype: flat.subtype != null ? String(flat.subtype) : 'Person',
      name: flat.name != null ? String(flat.name) : '',
      status: flat.status != null ? String(flat.status) : '',
      countryCode: flat.countryCode != null ? String(flat.countryCode) : '',
      tags,
    },
    base: { contacts },
  };
  if (isObject(flat.privacyConsent)) details.person = { privacyConsent: flat.privacyConsent };
  if (isObject(flat.general)) details.general = flat.general;
  if (isObject(flat.tarefas)) details.tarefas = flat.tarefas;

  const output: GetMembroEquipeOutput = {
    id: String(found.mdmId),
    version: Number(found.version),
    details,
  };
  return output;
}
