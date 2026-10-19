/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/updateEmpresa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface UpdateEmpresaInput extends Record<string, unknown> {
details: {
identification: {
name: string;
docType?: string;
docId?: string;
countryCode: string;
};
base: {
aliases: string[];
addresses: Record<string, unknown>[];
};
company: {
companyKind: string;
legalName: string;
tradeName?: string;
};
general?: Record<string, unknown>;
inicio?: Record<string, unknown>;
};
id: string;
version: number;
}

export interface UpdateEmpresaOutput extends Record<string, unknown> {
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

const ROLE_TAG = 'inicio.Empresa';

function text(value: unknown): string | undefined {
if (value == null) return undefined;
const s = String(value).trim();
return s === '' ? undefined : s;
}

function list(value: unknown): unknown[] {
return Array.isArray(value) ? value : [];
}

function objectList(value: unknown): Record<string, unknown>[] {
const out: Record<string, unknown>[] = [];
for (const item of list(value)) {
if (item != null && typeof item === 'object') out.push(item as Record<string, unknown>);
}
return out;
}

function stringList(value: unknown): string[] {
return list(value).map((v) => String(v));
}

function record(value: unknown): Record<string, unknown> | undefined {
if (value != null && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>;
return undefined;
}

// Derived: the required data still missing, calculated from the flat platform document.
function missingData(d: Record<string, unknown>): string[] {
const missing: string[] = [];
if (text(d.name) == null) missing.push('nome');
if (text(d.docType) == null || text(d.docId) == null) missing.push('documento');
if (objectList(d.addresses).length === 0) missing.push('endereço');
if (objectList(d.contacts).length === 0) missing.push('contato');
return missing;
}

function hasResponsibleAuthority(ctx: RequestContext): boolean {
const scope = ctx.sessionContext.actorScope ?? ctx.sessionContext.actorSession?.scope ?? [];
return scope.some((entry) => typeof entry === 'string' && entry.startsWith('inicio:'));
}

export async function updateEmpresa(input: UpdateEmpresaInput, ctx: RequestContext): Promise<UpdateEmpresaOutput> {
const id = text(input.id);
if (id == null) {
throw new AppError('VALIDATION_ERROR', 'Empresa id is required.', 400);
}
const inputVersion = Number(input.version);
if (!Number.isFinite(inputVersion)) {
throw new AppError('VALIDATION_ERROR', 'Empresa version is required.', 400);
}

if (!hasResponsibleAuthority(ctx)) {
throw new AppError(
'FORBIDDEN',
'Only the person the platform recognizes as responsible for the company can complete its data.',
403,
{ ruleId: 'somenteResponsavelEditaEmpresa' },
);
}

const current = await ctx.mdm.entity.get({ mdmId: id });
if (current == null) {
throw new AppError('NOT_FOUND', 'Empresa not found.', 404);
}
const existing: Record<string, unknown> = { ...current.details };
const existingTags = stringList(existing.tags);
if (existingTags.length > 0 && !existingTags.includes(ROLE_TAG)) {
throw new AppError('NOT_FOUND', 'Empresa not found.', 404);
}
if (Number(current.version) !== inputVersion) {
throw new AppError('VERSION_CONFLICT', 'Empresa version does not match the stored record.', 409);
}

const inIdent = input.details?.identification;
const inBase = input.details?.base;
const inCompany = input.details?.company;
const patch: Record<string, unknown> = {};

const completeText = (field: string, value: unknown): void => {
const wanted = text(value);
if (wanted == null) return;
const have = text(existing[field]);
if (have == null) {
patch[field] = wanted;
return;
}
if (have !== wanted) {
throw new AppError(
'DATA_ALREADY_EXISTS',
`The platform already has ${field}; it is not asked or changed again.`,
409,
{ ruleId: 'naoPedirDadoJaExistente' },
);
}
};

completeText('name', inIdent?.name);
completeText('docType', inIdent?.docType);
completeText('docId', inIdent?.docId);
completeText('companyKind', inCompany?.companyKind);
completeText('legalName', inCompany?.legalName);
completeText('tradeName', inCompany?.tradeName);

// countryCode carries a platform default, so it is not an informed value yet: it can be set.
const wantedCountry = text(inIdent?.countryCode);
if (wantedCountry != null && wantedCountry !== text(existing.countryCode)) {
patch.countryCode = wantedCountry;
}

const completeList = (field: string, wantedRaw: unknown[], haveRaw: unknown[]): void => {
if (wantedRaw.length === 0) return;
if (haveRaw.length === 0) {
patch[field] = wantedRaw;
return;
}
if (JSON.stringify(wantedRaw) !== JSON.stringify(haveRaw)) {
throw new AppError(
'DATA_ALREADY_EXISTS',
`The platform already has ${field}; it is not asked or changed again.`,
409,
{ ruleId: 'naoPedirDadoJaExistente' },
);
}
};

completeList('addresses', list(inBase?.addresses), list(existing.addresses));
completeList('aliases', list(inBase?.aliases), list(existing.aliases));

// A company is prepared only with name, document, an address and a contact on the platform.
// 'preparada' is derived and never stored: a caller claiming it for incomplete data is refused.
const projected: Record<string, unknown> = { ...existing, ...patch };
const projectedMissing = missingData(projected);
const claimedPrepared = record(input.details?.inicio)?.preparada === true;
if (claimedPrepared && projectedMissing.length > 0) {
throw new AppError(
'EMPRESA_NOT_PREPARED',
`The company cannot be prepared; missing data: ${projectedMissing.join(', ')}.`,
409,
{ ruleId: 'empresaPreparadaDadosObrigatorios' },
);
}

let result = current;
if (Object.keys(patch).length > 0) {
result = await ctx.mdm.entity.update({
mdmId: id,
expectedVersion: Number(current.version),
patch: patch as Parameters<typeof ctx.mdm.entity.update>[0]['patch'],
});
}

const d: Record<string, unknown> = { ...result.details };
const name = text(d.name) ?? '';
const docType = text(d.docType);
const docId = text(d.docId);
const addresses = objectList(d.addresses);
const contacts = objectList(d.contacts);
const tradeName = text(d.tradeName);
const missing = missingData(d);

const output: UpdateEmpresaOutput = {
id: String(result.mdmId),
version: Number(result.version),
details: {
identification: {
subtype: text(d.subtype) ?? 'Company',
name,
status: text(d.status) ?? 'Active',
countryCode: text(d.countryCode) ?? '',
tags: stringList(d.tags),
},
base: {
aliases: stringList(d.aliases),
addresses,
contacts,
},
company: {
companyKind: text(d.companyKind) ?? 'LegalEntity',
legalName: text(d.legalName) ?? '',
},
inicio: {
preparada: missing.length === 0,
dadosFaltantes: missing.join(', '),
},
},
};
if (docType != null) output.details.identification.docType = docType;
if (docId != null) output.details.identification.docId = docId;
if (tradeName != null) output.details.company.tradeName = tradeName;
const general = record(d.general);
if (general != null) output.details.general = general;
return output;
}
