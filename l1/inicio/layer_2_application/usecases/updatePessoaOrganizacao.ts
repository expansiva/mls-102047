/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/updatePessoaOrganizacao.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface UpdatePessoaOrganizacaoInput extends Record<string, unknown> {
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
    inicio?: Record<string, unknown>;
  };
  id: string;
  version: number;
}

export interface UpdatePessoaOrganizacaoOutput extends Record<string, unknown> {
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

type MdmPatch = Parameters<RequestContext['mdm']['entity']['update']>[0]['patch'];

const CONSENT_COUNTRIES = new Set<string>([
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function hasValidConsent(value: unknown): boolean {
  return isPlainObject(value) && Object.keys(value).length > 0;
}

export async function updatePessoaOrganizacao(input: UpdatePessoaOrganizacaoInput, ctx: RequestContext): Promise<UpdatePessoaOrganizacaoOutput> {
  const mdmId = String(input.id ?? '').trim();
  if (mdmId === '') {
    throw new AppError('INVALID_INPUT', 'id is required.', 400);
  }
  const expectedVersion = Number(input.version);
  if (!Number.isInteger(expectedVersion)) {
    throw new AppError('INVALID_INPUT', 'version is required.', 400);
  }

  const identificationIn: Record<string, unknown> = isPlainObject(input.details?.identification)
    ? input.details.identification
    : {};
  const baseIn: Record<string, unknown> = isPlainObject(input.details?.base) ? input.details.base : {};

  // emailContaNaoEditavel: the account e-mail is never written by this usecase.
  if (baseIn.email != null || identificationIn.email != null) {
    throw new AppError('EMAIL_NOT_EDITABLE', 'The account e-mail cannot be edited.', 400, { ruleId: 'emailContaNaoEditavel' });
  }

  // dadosNaoConcedemPermissoes: filling data never grants roles, permissions or status.
  if (identificationIn.tags != null || identificationIn.status != null || identificationIn.subtype != null) {
    throw new AppError('PERMISSIONS_NOT_GRANTED_BY_DATA', 'Filling in data does not grant roles or permissions.', 400, { ruleId: 'dadosNaoConcedemPermissoes' });
  }

  const name = String(identificationIn.name ?? '').trim();
  if (name === '' || name.length > 200) {
    throw new AppError('INVALID_NAME', 'name is required and must have at most 200 characters.', 400, { ruleId: 'acessoCompletoDadosMinimos' });
  }
  const countryCode = String(identificationIn.countryCode ?? '').trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new AppError('INVALID_COUNTRY', 'countryCode must be an ISO 3166-1 alpha-2 code.', 400, { ruleId: 'acessoCompletoDadosMinimos' });
  }

  const consentIn: unknown = input.details?.person?.privacyConsent;
  if (consentIn != null && !isPlainObject(consentIn)) {
    throw new AppError('INVALID_PRIVACY_CONSENT', 'privacyConsent must be an object.', 400, { ruleId: 'acessoCompletoDadosMinimos' });
  }

  const current = await ctx.mdm.entity.get({ mdmId });
  if (current == null) {
    throw new AppError('NOT_FOUND', 'PessoaOrganizacao not found.', 404);
  }
  if (current.version !== expectedVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  const patchFields: Record<string, unknown> = { name, countryCode };
  if (consentIn != null) {
    patchFields.privacyConsent = consentIn;
  }
  const patch = patchFields as MdmPatch;

  const updated = await ctx.mdm.entity.update({ mdmId, expectedVersion: current.version, patch });
  const d: Record<string, unknown> = { ...updated.details };

  const outName = d.name != null ? String(d.name) : name;
  const outCountry = d.countryCode != null ? String(d.countryCode) : countryCode;
  const consent: unknown = d.privacyConsent;

  // Derived values: calculated every time, never stored.
  const consentimentoExigido = CONSENT_COUNTRIES.has(outCountry);
  const missing: string[] = [];
  if (outName.trim() === '') missing.push('nome');
  if (outCountry.trim() === '') missing.push('país');
  if (consentimentoExigido && !hasValidConsent(consent)) missing.push('consentimento de privacidade');

  const tags: string[] = Array.isArray(d.tags) ? d.tags.map((t) => String(t)) : [];
  const contacts: Record<string, unknown>[] = Array.isArray(d.contacts)
    ? d.contacts.filter((c): c is Record<string, unknown> => isPlainObject(c))
    : [];
  const relationshipRefs: Record<string, unknown> = isPlainObject(d.relationshipRefs) ? d.relationshipRefs : {};

  const output: UpdatePessoaOrganizacaoOutput = {
    id: updated.mdmId,
    version: updated.version,
    details: {
      identification: {
        subtype: d.subtype != null ? String(d.subtype) : 'Person',
        name: outName,
        status: d.status != null ? String(d.status) : 'Active',
        countryCode: outCountry,
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
  if (isPlainObject(consent)) {
    output.details.person = { privacyConsent: consent };
  }
  if (isPlainObject(d.general)) {
    output.details.general = d.general;
  }
  return output;
}
