/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface GetPessoaOrganizacaoInput extends Record<string, unknown> {
id: string;
}

export interface GetPessoaOrganizacaoOutput extends Record<string, unknown> {
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
relationshipRefs: Record<string, unknown>;
};
person?: {
privacyConsent?: Record<string, unknown>;
};
general?: Record<string, unknown>;
inicio?: {
acessoCompleto?: boolean;
dadosFaltantes?: string;
consentimentoExigido?: boolean;
};
};
}

const CONSENT_REQUIRED_COUNTRIES: ReadonlySet<string> = new Set([
'BR',
'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

function isObject(value: unknown): value is Record<string, unknown> {
return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export async function getPessoaOrganizacao(input: GetPessoaOrganizacaoInput, ctx: RequestContext): Promise<GetPessoaOrganizacaoOutput> {
const rawId = input.id;
if (rawId === undefined || rawId === null || String(rawId) === '') {
throw new AppError('INVALID_INPUT', 'The id of the person is required.', 400);
}
const mdmId = String(rawId);

const found = await ctx.mdm.entity.get({ mdmId });
if (!found) {
throw new AppError('NOT_FOUND', 'Person of the organization was not found.', 404);
}

const flat: Record<string, unknown> = { ...found.details };

const name = flat.name == null ? '' : String(flat.name);
const countryCode = flat.countryCode == null ? '' : String(flat.countryCode);
const tags = Array.isArray(flat.tags) ? flat.tags.map((tag) => String(tag)) : [];
const contacts = Array.isArray(flat.contacts) ? flat.contacts.filter(isObject) : [];
const relationshipRefs = isObject(flat.relationshipRefs) ? flat.relationshipRefs : {};
const privacyConsent = isObject(flat.privacyConsent) ? flat.privacyConsent : undefined;

// Derived values: calculated every time, never read from storage.
const consentimentoExigido = CONSENT_REQUIRED_COUNTRIES.has(countryCode.toUpperCase());
const missing: string[] = [];
if (name.trim() === '') missing.push('nome');
if (countryCode.trim() === '') missing.push('país');
if (consentimentoExigido && !privacyConsent) missing.push('consentimento de privacidade');
const acessoCompleto = missing.length === 0;

const details: GetPessoaOrganizacaoOutput['details'] = {
identification: {
subtype: flat.subtype == null ? 'Person' : String(flat.subtype),
name,
status: flat.status == null ? '' : String(flat.status),
countryCode,
tags,
},
base: {
contacts,
relationshipRefs,
},
inicio: {
acessoCompleto,
dadosFaltantes: missing.join(', '),
consentimentoExigido,
},
};
if (privacyConsent) details.person = { privacyConsent };
if (isObject(flat.general)) details.general = flat.general;

return {
id: String(found.mdmId),
version: Number(found.version),
details,
};
}
