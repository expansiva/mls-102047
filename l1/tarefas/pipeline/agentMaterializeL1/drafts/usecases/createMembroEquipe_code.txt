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
export async function createMembroEquipe(input: CreateMembroEquipeInput, ctx: RequestContext): Promise<CreateMembroEquipeOutput> {
const name = input.details?.identification?.name;
const countryCode = input.details?.identification?.countryCode;
if (typeof name !== 'string' || name.trim() === '') {
throw new AppError('INVALID_INPUT', 'details.identification.name is required.', 400);
}
if (typeof countryCode !== 'string' || !/^[A-Z]{2}$/.test(countryCode)) {
throw new AppError('INVALID_INPUT', 'details.identification.countryCode must be two uppercase letters.', 400);
}
const details: Record<string, unknown> = {
subtype: 'Person',
name,
countryCode,
};
const privacyConsent = input.details?.person?.privacyConsent;
if (privacyConsent != null) details['privacyConsent'] = privacyConsent;
const created = await ctx.mdm.entity.create({ details: details as never });
const attached = await ctx.mdm.entity.attachRole(String(created.mdmId), 'tarefas.MembroEquipe');
const flat = (attached.details ?? {}) as Record<string, unknown>;
const tags: string[] = Array.isArray(flat['tags']) ? (flat['tags'] as unknown[]).map((tag) => String(tag)) : [];
const contacts: Record<string, unknown>[] = Array.isArray(flat['contacts']) ? (flat['contacts'] as Record<string, unknown>[]) : [];
const output: CreateMembroEquipeOutput = {
id: String(attached.mdmId),
version: Number(attached.version),
details: {
identification: {
subtype: flat['subtype'] == null ? 'Person' : String(flat['subtype']),
name: flat['name'] == null ? name : String(flat['name']),
status: flat['status'] == null ? '' : String(flat['status']),
countryCode: flat['countryCode'] == null ? countryCode : String(flat['countryCode']),
tags,
},
base: { contacts },
},
};
if (flat['privacyConsent'] != null) {
output.details.person = { privacyConsent: flat['privacyConsent'] as Record<string, unknown> };
}
if (flat['general'] != null) output.details.general = flat['general'] as Record<string, unknown>;
if (flat['tarefas'] != null) output.details.tarefas = flat['tarefas'] as Record<string, unknown>;
return output;
}
