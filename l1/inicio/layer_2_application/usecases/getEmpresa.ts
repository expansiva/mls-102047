/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface GetEmpresaInput extends Record<string, unknown> {
id: string;
}

export interface GetEmpresaOutput extends Record<string, unknown> {
id: string;
version: number;
details: {
identification: {
subtype: string;
name: string;
status: string;
docType?: string;
docId?: string;
countryCode: string;
tags: string[];
};
base: {
aliases: string[];
addresses: Record<string, unknown>[];
contacts: Record<string, unknown>[];
};
company: {
companyKind: string;
legalName: string;
tradeName?: string;
};
general?: Record<string, unknown>;
inicio?: {
preparada?: boolean;
dadosFaltantes?: string;
};
};
}

function text(value: unknown): string | undefined {
if (value == null) return undefined;
const result = String(value);
return result === '' ? undefined : result;
}

function strings(value: unknown): string[] {
if (!Array.isArray(value)) return [];
return value.filter(item => item != null).map(item => String(item));
}

function records(value: unknown): Record<string, unknown>[] {
if (!Array.isArray(value)) return [];
const out: Record<string, unknown>[] = [];
for (const item of value) {
if (item && typeof item === 'object' && !Array.isArray(item)) out.push(item as Record<string, unknown>);
}
return out;
}

export async function getEmpresa(input: GetEmpresaInput, ctx: RequestContext): Promise<GetEmpresaOutput> {
const id = text(input.id);
if (id === undefined) {
throw new AppError('INVALID_INPUT', 'The company id is required.', 400);
}

const found = await ctx.mdm.entity.get({ mdmId: id });
if (!found) {
throw new AppError('NOT_FOUND', 'Company was not found.', 404);
}

const flat: Record<string, unknown> = { ...found.details };

const name = text(flat.name) ?? '';
const docType = text(flat.docType);
const docId = text(flat.docId);
const addresses = records(flat.addresses);
const contacts = records(flat.contacts);

// Derived: the company is prepared when it has name, document, at least one address and one contact.
const missing: string[] = [];
if (name === '') missing.push('nome');
if (docType === undefined || docId === undefined) missing.push('documento');
if (addresses.length === 0) missing.push('endereço');
if (contacts.length === 0) missing.push('contato');

const identification: GetEmpresaOutput['details']['identification'] = {
subtype: text(flat.subtype) ?? 'Company',
name,
status: text(flat.status) ?? '',
countryCode: text(flat.countryCode) ?? '',
tags: strings(flat.tags),
};
if (docType !== undefined) identification.docType = docType;
if (docId !== undefined) identification.docId = docId;

const company: GetEmpresaOutput['details']['company'] = {
companyKind: text(flat.companyKind) ?? 'LegalEntity',
legalName: text(flat.legalName) ?? '',
};
const tradeName = text(flat.tradeName);
if (tradeName !== undefined) company.tradeName = tradeName;

const details: GetEmpresaOutput['details'] = {
identification,
base: {
aliases: strings(flat.aliases),
addresses,
contacts,
},
company,
inicio: {
preparada: missing.length === 0,
dadosFaltantes: missing.join(', '),
},
};
const general = flat.general;
if (general && typeof general === 'object' && !Array.isArray(general)) {
details.general = general as Record<string, unknown>;
}

return {
id: String(found.mdmId),
version: Number(found.version),
details,
};
}
