/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/createMembroEquipe.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface CreateMembroEquipeInput extends Record<string, unknown> {
  details: {
    identification: {
      name: string;
      countryCode: string;
    };
    base: Record<string, unknown>;
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    tarefas?: Record<string, unknown>;
  };
}

export interface CreateMembroEquipeOutput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
      countryCode: string;
      tags: string;
    };
    base: {
      contacts: Record<string, unknown>;
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    tarefas?: Record<string, unknown>;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function text(value: unknown): string {
  return value == null ? '' : String(value);
}

export async function createMembroEquipe(input: CreateMembroEquipeInput, ctx: RequestContext): Promise<CreateMembroEquipeOutput> {
  const name = text(input.details?.identification?.name).trim();
  const countryCode = text(input.details?.identification?.countryCode).trim();
  if (name === '') {
    throw new AppError('VALIDATION_ERROR', 'The member name is required.', 400);
  }
  if (countryCode === '') {
    throw new AppError('VALIDATION_ERROR', 'The member country code is required.', 400);
  }

  const flat: Record<string, unknown> = { subtype: 'Person', name, countryCode };
  const consentInput: unknown = input.details?.person?.privacyConsent;
  if (isRecord(consentInput)) flat.privacyConsent = consentInput;

  const created = await ctx.mdm.entity.create({ details: flat as never });
  const attached = await ctx.mdm.entity.attachRole(String(created.mdmId), 'tarefas.MembroEquipe');

  const row: Record<string, unknown> = isRecord(attached.details) ? attached.details : {};
  const rawTags: unknown = row.tags;
  const tags = Array.isArray(rawTags) ? rawTags.map((tag) => String(tag)).join(',') : text(rawTags);
  const rawContacts: unknown = row.contacts;
  const contacts: Record<string, unknown> = {};
  if (Array.isArray(rawContacts)) {
    rawContacts.forEach((contact, index) => {
      contacts[String(index)] = contact;
    });
  } else if (isRecord(rawContacts)) {
    for (const key of Object.keys(rawContacts)) contacts[key] = rawContacts[key];
  }

  const details: CreateMembroEquipeOutput['details'] = {
    identification: {
      subtype: text(row.subtype),
      name: text(row.name),
      status: text(row.status),
      countryCode: text(row.countryCode),
      tags,
    },
    base: { contacts },
  };
  if (isRecord(row.privacyConsent)) details.person = { privacyConsent: row.privacyConsent };
  if (isRecord(row.general)) details.general = row.general;
  if (isRecord(row.tarefas)) details.tarefas = row.tarefas;

  return {
    id: String(attached.mdmId),
    version: Number(attached.version),
    details,
  };
}
