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

export async function getMembroEquipe(input: GetMembroEquipeInput, ctx: RequestContext): Promise<GetMembroEquipeOutput> {
const rawId = input.id;
if (rawId == null || String(rawId) === '') {
throw new AppError('INVALID_INPUT', 'The member id is required.', 400);
}
const mdmId = String(rawId);

const found = await ctx.mdm.entity.get({ mdmId });
if (!found) {
throw new AppError('NOT_FOUND', 'Team member was not found.', 404);
}

const flat: Record<string, unknown> = isRecord(found.details) ? found.details : {};

const rawTags: unknown = flat.tags;
const tags = Array.isArray(rawTags) ? rawTags.map(tag => String(tag)).join(',') : text(rawTags);

const rawContacts: unknown = flat.contacts;
const contacts: Record<string, unknown> = {};
if (Array.isArray(rawContacts)) {
rawContacts.forEach((contact, index) => {
contacts[String(index)] = contact;
});
} else if (isRecord(rawContacts)) {
for (const key of Object.keys(rawContacts)) contacts[key] = rawContacts[key];
}

const details: GetMembroEquipeOutput['details'] = {
identification: {
subtype: text(flat.subtype),
name: text(flat.name),
status: text(flat.status),
countryCode: text(flat.countryCode),
tags,
},
base: { contacts },
};

if (isRecord(flat.privacyConsent)) {
details.person = { privacyConsent: flat.privacyConsent };
}
if (isRecord(flat.general)) {
details.general = flat.general;
}
if (isRecord(flat.tarefas)) {
details.tarefas = flat.tarefas;
}

return {
id: String(found.mdmId),
version: Number(found.version),
details,
};
}
