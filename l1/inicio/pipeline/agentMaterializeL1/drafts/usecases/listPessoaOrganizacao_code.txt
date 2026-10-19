/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { PessoaOrganizacao } from '/_102047_/l1/inicio/layer_3_domain/entities/pessoaOrganizacao.js';

export interface ListPessoaOrganizacaoInput extends Record<string, unknown> {
  id?: string;
  details?: {
    identification?: {
      subtype?: string;
      name?: string;
      status?: string;
      countryCode?: string;
      tags?: string[];
    };
    base?: {
      contacts?: Record<string, unknown>[];
      relationshipRefs?: Record<string, unknown>;
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
  page: number;
  pageSize: number;
}

export interface ListPessoaOrganizacaoOutput extends Record<string, unknown> {
  items: PessoaOrganizacao[];
  hasMore: boolean;
}

const ROLE = 'inicio.PessoaOrganizacao';
const CONSENT_COUNTRIES = ['BR', 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];

type Status = PessoaOrganizacao['details']['identification']['status'];

function toRecord(value: unknown): Record<string, unknown> {
  if (value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function pack(mdmId: string, version: number, flat: Record<string, unknown>): PessoaOrganizacao {
  const name = flat.name == null ? '' : String(flat.name);
  const countryCode = flat.countryCode == null ? '' : String(flat.countryCode);
  const tags = Array.isArray(flat.tags) ? flat.tags.map((tag) => String(tag)) : [];
  const contacts: Record<string, unknown>[] = Array.isArray(flat.contacts)
    ? flat.contacts.map((contact) => toRecord(contact))
    : [];
  const relationshipRefs = toRecord(flat.relationshipRefs);
  const consent = flat.privacyConsent != null && typeof flat.privacyConsent === 'object'
    ? toRecord(flat.privacyConsent)
    : undefined;
  const consentimentoExigido = CONSENT_COUNTRIES.includes(countryCode.toUpperCase());
  const missing: string[] = [];
  if (name.trim() === '') missing.push('nome');
  if (countryCode === '') missing.push('país');
  if (consentimentoExigido && !consent) missing.push('consentimento de privacidade');
  const record: PessoaOrganizacao = {
    id: mdmId,
    version,
    details: {
      identification: {
        subtype: 'Person',
        name,
        status: String(flat.status ?? 'Active') as Status,
        countryCode,
        tags,
      },
      base: { contacts, relationshipRefs },
      inicio: {
        acessoCompleto: missing.length === 0,
        dadosFaltantes: missing.join(', '),
        consentimentoExigido,
      },
    },
  };
  if (consent) record.details.person = { privacyConsent: consent };
  if (flat.general != null && typeof flat.general === 'object') {
    record.details.general = toRecord(flat.general);
  }
  return record;
}

export async function listPessoaOrganizacao(input: ListPessoaOrganizacaoInput, ctx: RequestContext): Promise<ListPessoaOrganizacaoOutput> {
  type ListQuery = Parameters<typeof ctx.mdm.collection.listByType>[0];

  const rawPage = Number(input.page);
  const rawSize = Number(input.pageSize);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  const pageSize = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(Math.floor(rawSize), 200) : 20;

  const id = input.id == null ? '' : String(input.id);
  const name = input.details?.identification?.name == null ? '' : String(input.details.identification.name);
  const status = input.details?.identification?.status == null ? '' : String(input.details.identification.status);
  const countryCode = input.details?.identification?.countryCode == null ? '' : String(input.details.identification.countryCode);

  if (id !== '') {
    const found = await ctx.mdm.entity.get({ mdmId: id });
    if (!found) throw new AppError('NOT_FOUND', 'PessoaOrganizacao not found: ' + id, 404);
    const record = pack(String(found.mdmId), Number(found.version), toRecord(found.details));
    return { items: [record], hasMore: false };
  }

  const buildQuery = (p: number, size: number): ListQuery => {
    const query: ListQuery = { type: ROLE, page: p, pageSize: size };
    if (name !== '') query.name = name;
    if (status !== '') query.status = status as ListQuery['status'];
    return query;
  };

  const hydrate = async (row: Record<string, unknown>): Promise<PessoaOrganizacao> => {
    const rowId = String(row.mdmId);
    if (typeof row.version === 'number') {
      return pack(rowId, row.version, toRecord(row.details));
    }
    const full = await ctx.mdm.entity.get({ mdmId: rowId });
    if (!full) throw new AppError('NOT_FOUND', 'PessoaOrganizacao not found: ' + rowId, 404);
    return pack(String(full.mdmId), Number(full.version), toRecord(full.details));
  };

  if (countryCode === '') {
    const result = await ctx.mdm.collection.listByType(buildQuery(page, pageSize));
    const items: PessoaOrganizacao[] = [];
    for (const item of result.items) {
      items.push(await hydrate(toRecord(item)));
    }
    return { items, hasMore: page * pageSize < Number(result.total) };
  }

  // countryCode is not a filter of the MDM listing: list every page, keep the matches and paginate here.
  const kept: PessoaOrganizacao[] = [];
  let current = 1;
  let total = 0;
  do {
    const result = await ctx.mdm.collection.listByType(buildQuery(current, 200));
    total = Number(result.total);
    for (const item of result.items) {
      const record = await hydrate(toRecord(item));
      if (record.details.identification.countryCode === countryCode) kept.push(record);
    }
    current += 1;
  } while ((current - 1) * 200 < total);

  const start = (page - 1) * pageSize;
  return { items: kept.slice(start, start + pageSize), hasMore: start + pageSize < kept.length };
}
