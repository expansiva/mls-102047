/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/updateMembroEquipe.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface UpdateMembroEquipeInput extends Record<string, unknown> {
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
id: string;
version: number;
}

export interface UpdateMembroEquipeOutput extends Record<string, unknown> {
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

type MdmPatch = Parameters<RequestContext['mdm']['entity']['update']>[0]['patch'];

function isObject(value: unknown): value is Record<string, unknown> {
return value != null && typeof value === 'object' && !Array.isArray(value);
}

function buildOutput(mdmId: string, version: number, flat: Record<string, unknown>): UpdateMembroEquipeOutput {
const contacts = Array.isArray(flat.contacts) ? (flat.contacts as unknown[]).filter(isObject) : [];
const tags = Array.isArray(flat.tags) ? (flat.tags as unknown[]).map((tag) => String(tag)) : [];
const details: UpdateMembroEquipeOutput['details'] = {
identification: {
subtype: flat.subtype == null ? 'Person' : String(flat.subtype),
name: flat.name == null ? '' : String(flat.name),
status: flat.status == null ? '' : String(flat.status),
countryCode: flat.countryCode == null ? '' : String(flat.countryCode),
tags,
},
base: { contacts },
};
if (isObject(flat.privacyConsent)) {
details.person = { privacyConsent: flat.privacyConsent };
}
if (isObject(flat.general)) {
details.general = flat.general;
}
if (isObject(flat.tarefas)) {
details.tarefas = flat.tarefas;
}
return { id: mdmId, version, details };
}

export async function updateMembroEquipe(input: UpdateMembroEquipeInput, ctx: RequestContext): Promise<UpdateMembroEquipeOutput> {
const id = input.id == null ? '' : String(input.id);
if (id === '') {
throw new AppError('INVALID_INPUT', 'The member id is required.', 400);
}
const version = Number(input.version);
if (input.version == null || !Number.isInteger(version)) {
throw new AppError('INVALID_INPUT', 'The version read by the caller is required.', 400);
}

const patch: Record<string, unknown> = {};

const rawName = input.details?.identification?.name;
if (rawName != null) {
const name = String(rawName).trim();
if (name === '' || name.length > 200) {
throw new AppError('INVALID_INPUT', 'The member name must have between 1 and 200 characters.', 400);
}
patch.name = name;
}

const rawCountry = input.details?.identification?.countryCode;
if (rawCountry != null) {
const countryCode = String(rawCountry);
if (!/^[A-Z]{2}$/.test(countryCode)) {
throw new AppError('INVALID_INPUT', 'The country code must be two uppercase letters.', 400);
}
patch.countryCode = countryCode;
}

const privacyConsent = input.details?.person?.privacyConsent;
if (privacyConsent != null) {
patch.privacyConsent = privacyConsent;
}

if (Object.keys(patch).length === 0) {
throw new AppError('INVALID_INPUT', 'No editable field was given.', 400);
}

const current = await ctx.mdm.entity.get({ mdmId: id });
if (current == null) {
throw new AppError('NOT_FOUND', 'Team member not found.', 404);
}
if (Number(current.version) !== version) {
throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
}

const updated = await ctx.mdm.entity.update({
mdmId: id,
expectedVersion: version,
patch: patch as MdmPatch,
});

const flat = updated.details as Record<string, unknown>;
return buildOutput(String(updated.mdmId), Number(updated.version), flat);
}
