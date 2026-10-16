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

export async function createMembroEquipe(input: CreateMembroEquipeInput, ctx: RequestContext): Promise<CreateMembroEquipeOutput> {
const identification = input.details?.identification;
const name = typeof identification?.name === 'string' ? identification.name.trim() : '';
const countryCode = typeof identification?.countryCode === 'string' ? identification.countryCode.trim() : '';
if (!name) {
throw new AppError('INVALID_INPUT', 'The member name is required.', 400);
}
if (!/^[A-Z]{2}$/.test(countryCode)) {
throw new AppError('INVALID_INPUT', 'The country code must be two uppercase letters.', 400);
}

const details: Record<string, unknown> = {
subtype: 'Person',
name,
countryCode,
};
const privacyConsent = input.details?.person?.privacyConsent;
if (privacyConsent != null) details.privacyConsent = privacyConsent;

const created = await ctx.mdm.entity.create({ details: details as never });
const attached = await ctx.mdm.entity.attachRole(created.mdmId, 'tarefas.MembroEquipe');

const flat: Record<string, unknown> = { ...attached.details };
const tags = Array.isArray(flat.tags) ? flat.tags.map((tag) => String(tag)) : [];
const contacts = Array.isArray(flat.contacts) ? flat.contacts.filter(isObject) : [];

const output: CreateMembroEquipeOutput = {
id: String(attached.mdmId),
version: Number(attached.version),
details: {
identification: {
subtype: flat.subtype != null ? String(flat.subtype) : 'Person',
name: flat.name != null ? String(flat.name) : name,
status: flat.status != null ? String(flat.status) : 'Active',
countryCode: flat.countryCode != null ? String(flat.countryCode) : countryCode,
tags,
},
base: { contacts },
},
};
if (isObject(flat.privacyConsent)) output.details.person = { privacyConsent: flat.privacyConsent };
if (isObject(flat.general)) output.details.general = flat.general;
if (isObject(flat.tarefas)) output.details.tarefas = flat.tarefas;
return output;
}
