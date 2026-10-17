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

type Flat = Record<string, unknown>;

function text(value: unknown): string | undefined {
  if (value == null) return undefined;
  const s = String(value).trim();
  return s.length > 0 ? s : undefined;
}

function objectList(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  const out: Record<string, unknown>[] = [];
  for (const item of value) {
    if (item != null && typeof item === 'object') out.push(item as Record<string, unknown>);
  }
  return out;
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => v != null).map((v) => String(v));
}

function missingData(flat: Flat, contactsCount: number): string[] {
  const missing: string[] = [];
  if (text(flat.name) === undefined) missing.push('nome');
  if (text(flat.docType) === undefined || text(flat.docId) === undefined) missing.push('documento');
  if (objectList(flat.addresses).length === 0) missing.push('endereço');
  if (contactsCount === 0) missing.push('contato');
  return missing;
}

function toOutput(mdmId: string, version: number, flat: Flat, contacts: Record<string, unknown>[], contactsCount: number): UpdateEmpresaOutput {
  const missing = missingData(flat, contactsCount);
  const identification: UpdateEmpresaOutput['details']['identification'] = {
    subtype: 'Company',
    name: String(flat.name ?? ''),
    status: String(flat.status ?? 'Active'),
    countryCode: String(flat.countryCode ?? ''),
    tags: stringList(flat.tags),
  };
  const docType = text(flat.docType);
  const docId = text(flat.docId);
  if (docType !== undefined) identification.docType = docType;
  if (docId !== undefined) identification.docId = docId;

  const company: UpdateEmpresaOutput['details']['company'] = {
    companyKind: String(flat.companyKind ?? 'LegalEntity'),
    legalName: String(flat.legalName ?? ''),
  };
  const tradeName = text(flat.tradeName);
  if (tradeName !== undefined) company.tradeName = tradeName;

  const details: UpdateEmpresaOutput['details'] = {
    identification,
    base: {
      aliases: stringList(flat.aliases),
      addresses: objectList(flat.addresses),
      contacts,
    },
    company,
    inicio: {
      preparada: missing.length === 0,
      dadosFaltantes: missing.join(', '),
    },
  };
  if (flat.general != null && typeof flat.general === 'object') {
    details.general = flat.general as Record<string, unknown>;
  }
  return { id: mdmId, version, details };
}

function alreadyHasError(field: string): AppError {
  return new AppError(
    'DATA_ALREADY_EXISTS',
    `The platform already has "${field}" for the company; it is not asked again and cannot be replaced here.`,
    409,
    { ruleId: 'naoPedirDadoJaExistente' },
  );
}

export async function updateEmpresa(input: UpdateEmpresaInput, ctx: RequestContext): Promise<UpdateEmpresaOutput> {
  const mdmId = text(input.id);
  if (mdmId === undefined) {
    throw new AppError('VALIDATION_ERROR', 'id is required.', 400);
  }
  const expectedVersion = Number(input.version);
  if (!Number.isFinite(expectedVersion)) {
    throw new AppError('VALIDATION_ERROR', 'version is required.', 400);
  }

  // somenteResponsavelEditaEmpresa: only who the platform already recognizes as responsible completes the company.
  const scope = ctx.sessionContext.actorScope ?? ctx.sessionContext.actorSession?.scope ?? [];
  if (scope.length === 0) {
    throw new AppError('FORBIDDEN', 'Only the person the platform recognizes as responsible for the company can complete its data.', 403, {
      ruleId: 'somenteResponsavelEditaEmpresa',
    });
  }

  const current = await ctx.mdm.entity.get({ mdmId });
  if (current == null) {
    throw new AppError('NOT_FOUND', 'Empresa not found.', 404);
  }
  if (current.version !== expectedVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  const existing = current.details as Flat;
  const contactsFromDetails = objectList(existing.contacts);
  const contactsCount = Math.max(contactsFromDetails.length, current.related('contacts').length);

  const inId = input.details?.identification;
  const inBase = input.details?.base;
  const inCompany = input.details?.company;

  // naoPedirDadoJaExistente: only what is still missing is written; a different value for data the platform
  // already has is refused, an identical one is harmless.
  const patch: Flat = {};
  const fillText = (field: string, given: unknown): void => {
    const newValue = text(given);
    if (newValue === undefined) return;
    const oldValue = text(existing[field]);
    if (oldValue === undefined) {
      patch[field] = newValue;
    } else if (oldValue !== newValue) {
      throw alreadyHasError(field);
    }
  };
  fillText('name', inId?.name);
  fillText('docType', inId?.docType);
  fillText('docId', inId?.docId);
  fillText('companyKind', inCompany?.companyKind);
  fillText('legalName', inCompany?.legalName);
  fillText('tradeName', inCompany?.tradeName);

  // countryCode always has a platform default, so it is never "missing": it is written when it changes.
  const newCountry = text(inId?.countryCode);
  if (newCountry !== undefined && newCountry !== text(existing.countryCode)) {
    patch.countryCode = newCountry;
  }

  const newAddresses = objectList(inBase?.addresses);
  const oldAddresses = objectList(existing.addresses);
  if (newAddresses.length > 0) {
    if (oldAddresses.length === 0) {
      patch.addresses = newAddresses;
    } else if (JSON.stringify(oldAddresses) !== JSON.stringify(newAddresses)) {
      throw alreadyHasError('addresses');
    }
  }

  const newAliases = stringList(inBase?.aliases);
  const oldAliases = stringList(existing.aliases);
  if (newAliases.length > 0) {
    if (oldAliases.length === 0) {
      patch.aliases = newAliases;
    } else if (JSON.stringify(oldAliases) !== JSON.stringify(newAliases)) {
      throw alreadyHasError('aliases');
    }
  }

  // empresaPreparadaDadosObrigatorios: "preparada" is derived (name, document, address, contact) and never
  // written; declaring the company prepared while required data is missing is refused.
  const merged: Flat = { ...existing, ...patch };
  const missing = missingData(merged, contactsCount);
  if (input.details?.inicio?.preparada === true && missing.length > 0) {
    throw new AppError(
      'COMPANY_NOT_PREPARED',
      `The company is only prepared with name, document, address and contact; missing: ${missing.join(', ')}.`,
      409,
      { ruleId: 'empresaPreparadaDadosObrigatorios' },
    );
  }

  if (Object.keys(patch).length === 0) {
    return toOutput(current.mdmId, current.version, existing, contactsFromDetails, contactsCount);
  }

  const updated = await ctx.mdm.entity.update({
    mdmId,
    expectedVersion: current.version,
    patch: patch as Parameters<typeof ctx.mdm.entity.update>[0]['patch'],
  });

  const updatedFlat = updated.details as Flat;
  const updatedContacts = objectList(updatedFlat.contacts);
  const updatedContactsCount = Math.max(updatedContacts.length, updated.related('contacts').length);
  return toOutput(updated.mdmId, updated.version, updatedFlat, updatedContacts, updatedContactsCount);
}
