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

const CONSENT_COUNTRIES: ReadonlyArray<string> = [
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value);
}

export async function getPessoaOrganizacao(input: GetPessoaOrganizacaoInput, ctx: RequestContext): Promise<GetPessoaOrganizacaoOutput> {
  const id = input.id == null ? '' : String(input.id).trim();
  if (id === '') {
    throw new AppError('VALIDATION_ERROR', 'id is required.', 400);
  }

  const found = await ctx.mdm.entity.get({ mdmId: id });
  if (!found) {
    throw new AppError('NOT_FOUND', 'PessoaOrganizacao was not found.', 404);
  }

  const details: Record<string, unknown> = { ...found.details };

  const name = details.name == null ? '' : String(details.name).trim();
  const countryCode = details.countryCode == null ? '' : String(details.countryCode).trim();
  const privacyConsent = isObject(details.privacyConsent) ? details.privacyConsent : undefined;
  const tags = Array.isArray(details.tags) ? details.tags.map(tag => String(tag)) : [];
  const contacts = Array.isArray(details.contacts)
    ? details.contacts.filter(isObject)
    : [];
  const relationshipRefs = isObject(details.relationshipRefs) ? details.relationshipRefs : {};

  // Derived values: calculated every time, never read from storage.
  const consentimentoExigido = CONSENT_COUNTRIES.includes(countryCode.toUpperCase());
  const missing: string[] = [];
  if (name === '') missing.push('nome');
  if (countryCode === '') missing.push('país');
  if (consentimentoExigido && !privacyConsent) missing.push('consentimento de privacidade');

  const output: GetPessoaOrganizacaoOutput = {
    id: String(found.mdmId),
    version: Number(found.version),
    details: {
      identification: {
        subtype: details.subtype == null ? '' : String(details.subtype),
        name,
        status: details.status == null ? '' : String(details.status),
        countryCode,
        tags,
      },
      base: {
        contacts,
        relationshipRefs,
      },
      inicio: {
        acessoCompleto: missing.length === 0,
        dadosFaltantes: missing.join(', '),
        consentimentoExigido,
      },
    },
  };

  if (privacyConsent) {
    output.details.person = { privacyConsent };
  }
  if (isObject(details.general)) {
    output.details.general = details.general;
  }

  return output;
}
