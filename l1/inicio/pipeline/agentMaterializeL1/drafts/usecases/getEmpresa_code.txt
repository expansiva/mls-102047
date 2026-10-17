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

function asText(value: unknown): string {
  return value == null ? '' : String(value);
}

function asTextList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter(item => item != null).map(item => String(item)) : [];
}

function asObjectList(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  const out: Record<string, unknown>[] = [];
  for (const item of value) {
    if (item && typeof item === 'object' && !Array.isArray(item)) out.push(item as Record<string, unknown>);
  }
  return out;
}

export async function getEmpresa(input: GetEmpresaInput, ctx: RequestContext): Promise<GetEmpresaOutput> {
  const id = input.id == null ? '' : String(input.id);
  if (id === '') throw new AppError('INVALID_INPUT', 'The id of the empresa is required.', 400);

  const found = await ctx.mdm.entity.get({ mdmId: id });
  if (!found || found.mdmId == null) throw new AppError('NOT_FOUND', 'Empresa was not found.', 404);

  const rawDetails: unknown = found.details;
  const d: Record<string, unknown> =
    rawDetails && typeof rawDetails === 'object' ? (rawDetails as Record<string, unknown>) : {};

  const name = asText(d.name);
  const docType = d.docType == null ? undefined : String(d.docType);
  const docId = d.docId == null ? undefined : String(d.docId);
  const addresses = asObjectList(d.addresses);
  const contacts = asObjectList(d.contacts);

  // derived: preparada / dadosFaltantes are calculated every time, never read from storage
  const missing: string[] = [];
  if (name.trim() === '') missing.push('nome');
  if (docType === undefined || docType === '' || docId === undefined || docId.trim() === '') missing.push('documento');
  if (addresses.length === 0) missing.push('endereço');
  if (contacts.length === 0) missing.push('contato');

  const identification: GetEmpresaOutput['details']['identification'] = {
    subtype: 'Company',
    name,
    status: asText(d.status),
    countryCode: asText(d.countryCode),
    tags: asTextList(d.tags),
  };
  if (docType !== undefined) identification.docType = docType;
  if (docId !== undefined) identification.docId = docId;

  const company: GetEmpresaOutput['details']['company'] = {
    companyKind: 'LegalEntity',
    legalName: asText(d.legalName),
  };
  if (d.tradeName != null) company.tradeName = String(d.tradeName);

  const details: GetEmpresaOutput['details'] = {
    identification,
    base: {
      aliases: asTextList(d.aliases),
      addresses,
      contacts,
    },
    company,
    inicio: {
      preparada: missing.length === 0,
      dadosFaltantes: missing.join(', '),
    },
  };
  if (d.general && typeof d.general === 'object' && !Array.isArray(d.general)) {
    details.general = d.general as Record<string, unknown>;
  }

  return {
    id: String(found.mdmId),
    version: Number(found.version),
    details,
  };
}
