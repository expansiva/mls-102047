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

const ROLE_TAG = 'inicio.PessoaOrganizacao';

// Brasil e países da União Europeia: a lei exige consentimento de privacidade.
const CONSENT_COUNTRIES: readonly string[] = [
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

// Keys that would grant roles, permissions or access: never accepted from this operation.
const PERMISSION_KEYS: readonly string[] = [
  'tags', 'roles', 'role', 'permissions', 'permission', 'authorities', 'actorScope', 'scope', 'status',
];

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (value != null && typeof value === 'object' && !Array.isArray(value)) {
    return { ...(value as Record<string, unknown>) };
  }
  return undefined;
}

function asText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function hasPermissionKey(source: Record<string, unknown> | undefined): boolean {
  if (source == null) return false;
  return PERMISSION_KEYS.some((key) => source[key] != null);
}

export async function updatePessoaOrganizacao(input: UpdatePessoaOrganizacaoInput, ctx: RequestContext): Promise<UpdatePessoaOrganizacaoOutput> {
  const mdmId = String(input.id ?? '').trim();
  if (mdmId === '') {
    throw new AppError('INVALID_INPUT', 'The person id is required.', 400);
  }
  const expectedVersion = Number(input.version);
  if (!Number.isFinite(expectedVersion)) {
    throw new AppError('INVALID_INPUT', 'The version read by the caller is required.', 400);
  }

  // dadosNaoConcedemPermissoes: filling data never grants roles or permissions.
  const detailsInput = asRecord(input.details);
  const identificationInput = asRecord(detailsInput?.identification);
  const personInput = asRecord(detailsInput?.person);
  if (
    hasPermissionKey(asRecord(input)) ||
    hasPermissionKey(detailsInput) ||
    hasPermissionKey(identificationInput) ||
    hasPermissionKey(personInput)
  ) {
    throw new AppError(
      'PERMISSION_NOT_GRANTED_BY_DATA',
      'Filling in data does not grant roles or permissions; only the person in charge gives access to the modules.',
      403,
      { ruleId: 'dadosNaoConcedemPermissoes' },
    );
  }

  // emailContaNaoEditavel: the account e-mail (a contact of the person) is never edited here.
  const baseInput = asRecord(input.details?.base);
  if (baseInput != null && (baseInput.email != null || baseInput.contacts != null)) {
    throw new AppError(
      'EMAIL_NOT_EDITABLE',
      'The e-mail of the person is the one of the authenticated account and cannot be edited.',
      400,
      { ruleId: 'emailContaNaoEditavel' },
    );
  }

  const name = asText(input.details?.identification?.name).trim();
  const countryCode = asText(input.details?.identification?.countryCode).trim().toUpperCase();
  if (name === '') {
    throw new AppError('MINIMUM_DATA_INVALID', 'The name of the person is required.', 400, { ruleId: 'acessoCompletoDadosMinimos' });
  }
  if (name.length > 200) {
    throw new AppError('MINIMUM_DATA_INVALID', 'The name of the person must have at most 200 characters.', 400, { ruleId: 'acessoCompletoDadosMinimos' });
  }
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new AppError('MINIMUM_DATA_INVALID', 'The country must be an ISO 3166-1 alpha-2 code.', 400, { ruleId: 'acessoCompletoDadosMinimos' });
  }

  // repetirNaoDuplicaPessoa: only the existing record is updated, never a new person created.
  const current = await ctx.mdm.entity.get({ mdmId });
  if (current == null) {
    throw new AppError('NOT_FOUND', 'Person not found.', 404, { ruleId: 'repetirNaoDuplicaPessoa' });
  }
  const currentDetails: Record<string, unknown> = { ...current.details };
  const currentTags = Array.isArray(currentDetails.tags) ? currentDetails.tags.map((t) => String(t)) : [];
  if (!currentTags.includes(ROLE_TAG)) {
    throw new AppError('NOT_FOUND', 'Person of the organization not found.', 404, { ruleId: 'repetirNaoDuplicaPessoa' });
  }
  if (Number(current.version) !== expectedVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  // The patch carries only name, country and consent; tags, roles and permissions are never touched.
  const consentInput = asRecord(input.details?.person?.privacyConsent);
  const patch: MdmPatch = {
    name,
    countryCode,
    ...(consentInput != null ? { privacyConsent: consentInput as MdmPatch['privacyConsent'] } : {}),
  };

  const updated = await ctx.mdm.entity.update({ mdmId, expectedVersion, patch });

  const d: Record<string, unknown> = { ...updated.details };
  const savedName = asText(d.name).trim();
  const savedCountry = asText(d.countryCode).trim();
  const savedConsent = asRecord(d.privacyConsent);

  // acessoCompletoDadosMinimos: derived, computed every time, never stored.
  const consentimentoExigido = CONSENT_COUNTRIES.includes(savedCountry);
  const missing: string[] = [];
  if (savedName === '') missing.push('nome');
  if (savedCountry === '') missing.push('país');
  if (consentimentoExigido && savedConsent == null) missing.push('consentimento de privacidade');
  const acessoCompleto = missing.length === 0;

  const contacts: Record<string, unknown>[] = [];
  if (Array.isArray(d.contacts)) {
    for (const c of d.contacts) {
      const rec = asRecord(c);
      if (rec != null) contacts.push(rec);
    }
  }
  const tags = Array.isArray(d.tags) ? d.tags.map((t) => String(t)) : [];

  const output: UpdatePessoaOrganizacaoOutput = {
    id: updated.mdmId,
    version: updated.version,
    details: {
      identification: {
        subtype: asText(d.subtype) === '' ? 'Person' : asText(d.subtype),
        name: savedName,
        status: asText(d.status),
        countryCode: savedCountry,
        tags,
      },
      base: {
        contacts,
        relationshipRefs: asRecord(d.relationshipRefs) ?? {},
      },
      inicio: {
        acessoCompleto,
        dadosFaltantes: missing.join(', '),
        consentimentoExigido,
      },
    },
  };
  if (savedConsent != null) {
    output.details.person = { privacyConsent: savedConsent };
  }
  const general = asRecord(d.general);
  if (general != null) {
    output.details.general = general;
  }
  return output;
}
