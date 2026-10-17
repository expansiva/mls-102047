/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/empresa.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { EmpresaContracts, ContatoEmpresaResumo, EmpresaPreparo } from '/_102047_/l2/inicio/web/contracts/empresa.defs.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import type { GetEmpresaOutput } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import { listContatoEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/listContatoEmpresa.js';
import { updateEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/updateEmpresa.js';
import { getPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';

type DocType = NonNullable<EmpresaPreparo['details']['identification']['docType']>;
type ContactType = ContatoEmpresaResumo['details']['contactChannel']['contactType'];
type Faltante = EmpresaPreparo['dadosFaltantes'];

const DOC_TYPES: string[] = ['CNPJ', 'EIN', 'VAT', 'NationalId', 'Other'];
const CONTACT_TYPES: string[] = ['Phone', 'Email', 'WhatsApp'];

function toDocType(value: string): DocType {
  if (!DOC_TYPES.includes(value)) {
    throw new AppError('INVALID_DATA', 'unsupported document type: ' + value, 422);
  }
  return value as DocType;
}

function toContactType(value: string): ContactType {
  if (!CONTACT_TYPES.includes(value)) {
    throw new AppError('INVALID_DATA', 'unsupported contact type: ' + value, 422);
  }
  return value as ContactType;
}

function hasText(value: string | undefined | null): value is string {
  return value != null && value.trim() !== '';
}

function addressToText(address: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const v of Object.values(address)) {
    if (typeof v === 'string' && v.trim() !== '') parts.push(v.trim());
    else if (typeof v === 'number') parts.push(String(v));
  }
  return parts.join(', ');
}

function isResponsavel(ctx: RequestContext): boolean {
  const scope = ctx.sessionContext.actorScope ?? [];
  return scope.some((s) => s === 'responsavel' || s.endsWith(':responsavel'));
}

function asIdList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const ids: string[] = [];
  for (const v of value) if (typeof v === 'string') ids.push(v);
  return ids;
}

async function resolveEmpresaId(ctx: RequestContext): Promise<string> {
  const active = ctx.sessionContext.activeCompanyId;
  if (hasText(active)) return active;
  const personId = ctx.sessionContext.person?.mdmId;
  if (!hasText(personId)) {
    throw new AppError('NOT_FOUND', 'company of the session not found', 404);
  }
  const pessoa = await getPessoaOrganizacao({ id: personId }, ctx);
  const assignments = asIdList(pessoa.details.base.relationshipRefs['assignments']);
  if (assignments.length === 0) {
    throw new AppError('NOT_FOUND', 'company of the session not found', 404);
  }
  return assignments[0];
}

async function listarContatosLigados(empresa: GetEmpresaOutput, ctx: RequestContext): Promise<ContatoEmpresaResumo[]> {
  const linkedIds = new Set<string>();
  for (const summary of empresa.details.base.contacts) {
    const id = summary['id'] ?? summary['mdmId'];
    if (typeof id === 'string') linkedIds.add(id);
  }
  const result: ContatoEmpresaResumo[] = [];
  if (linkedIds.size === 0) return result;
  let page = 1;
  for (;;) {
    const res = await listContatoEmpresa({ page, pageSize: 200 }, ctx);
    for (const item of res.items) {
      if (!linkedIds.has(item.id)) continue;
      if (item.details.identification.status === 'Inactive') continue;
      result.push({
        id: item.id,
        details: {
          identification: { name: item.details.identification.name },
          contactChannel: {
            contactType: toContactType(String(item.details.contactChannel.contactType)),
            value: item.details.contactChannel.value,
            isVerified: item.details.contactChannel.isVerified,
          },
        },
      });
    }
    if (!res.hasMore) break;
    page += 1;
  }
  return result;
}

async function montarEmpresaPreparo(empresa: GetEmpresaOutput, ctx: RequestContext): Promise<EmpresaPreparo> {
  const contacts = await listarContatosLigados(empresa, ctx);
  const ident = empresa.details.identification;
  const addresses: string[] = [];
  for (const a of empresa.details.base.addresses) {
    const text = addressToText(a);
    if (text !== '') addresses.push(text);
  }

  // empresaPreparadaDadosObrigatorios / naoPedirDadoJaExistente: only what the platform still lacks is listed.
  const faltantes: string[] = [];
  if (!hasText(ident.name)) faltantes.push('nome');
  if (!hasText(ident.docType) || !hasText(ident.docId)) faltantes.push('documento');
  if (addresses.length === 0) faltantes.push('endereco');
  if (contacts.length === 0) faltantes.push('contato');

  const identification: EmpresaPreparo['details']['identification'] = {};
  if (hasText(ident.name)) identification.name = ident.name;
  if (hasText(ident.docType)) identification.docType = toDocType(ident.docType);
  if (hasText(ident.docId)) identification.docId = ident.docId;
  if (hasText(ident.countryCode)) identification.countryCode = ident.countryCode;

  const company: EmpresaPreparo['details']['company'] = {};
  if (hasText(empresa.details.company.legalName)) company.legalName = empresa.details.company.legalName;
  if (hasText(empresa.details.company.tradeName)) company.tradeName = empresa.details.company.tradeName;

  return {
    id: empresa.id,
    version: empresa.version,
    details: { identification, company, base: { addresses } },
    contacts,
    preparada: faltantes.length === 0,
    // the list of missing data, joined by comma (l4: dadosFaltantes is the list as text)
    dadosFaltantes: faltantes.join(',') as Faltante,
  };
}

function validarDocumento(docType: string, docId: string, countryCode: string): void {
  const digits = docId.replace(/\D/g, '');
  if (docType === 'CNPJ' && digits.length !== 14) {
    throw new AppError('INVALID_DOCUMENT', 'CNPJ must have 14 digits', 422, { ruleId: 'rule-document-shape-validated' });
  }
  if (docType === 'CNPJ' && countryCode !== 'BR') {
    throw new AppError('INVALID_DOCUMENT', 'CNPJ is only valid for country BR', 422, { ruleId: 'rule-document-shape-validated' });
  }
  if (docType === 'EIN' && digits.length !== 9) {
    throw new AppError('INVALID_DOCUMENT', 'EIN must have 9 digits', 422, { ruleId: 'rule-document-shape-validated' });
  }
  if (docId.trim() === '') {
    throw new AppError('INVALID_DOCUMENT', 'document number is empty', 422, { ruleId: 'rule-document-shape-validated' });
  }
}

function recusarSobrescrita(campo: string): never {
  throw new AppError('DATA_ALREADY_EXISTS', 'the platform already has ' + campo, 409, { ruleId: 'naoPedirDadoJaExistente' });
}

export const requests: { [K in keyof EmpresaContracts]: (input: EmpresaContracts[K]['input'], ctx: RequestContext) => Promise<EmpresaContracts[K]['output']> } = {
  "inicio.empresa.qryEmpresaPreparo": async function (input, ctx) {
    const empresaId = await resolveEmpresaId(ctx);
    const empresa = await getEmpresa({ id: empresaId }, ctx);
    return { empresa: await montarEmpresaPreparo(empresa, ctx) };
  },

  "inicio.empresa.cmdSalvarDadosEmpresa": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };

      const current = await getEmpresa({ id: String(input.id) }, bound);

      // somenteResponsavelEditaEmpresa: the caller must be recognized by the platform as responsible for this company.
      const personId = ctx.sessionContext.person?.mdmId;
      let reconhecido = false;
      if (isResponsavel(ctx) && hasText(personId)) {
        const pessoa = await getPessoaOrganizacao({ id: personId }, bound);
        reconhecido = asIdList(pessoa.details.base.relationshipRefs['assignments']).includes(current.id);
      }
      if (!reconhecido) {
        throw new AppError('FORBIDDEN', 'only the responsible of the company can complete its data', 403, { ruleId: 'somenteResponsavelEditaEmpresa' });
      }

      const cur = current.details;
      const inId = input.details.identification;
      const inCompany = input.details.company;
      const inAddresses = input.details.base.addresses;

      // naoPedirDadoJaExistente: a datum the platform already has is never overwritten.
      let name = cur.identification.name;
      if (inId.name !== undefined) {
        if (hasText(cur.identification.name) && cur.identification.name !== inId.name) recusarSobrescrita('name');
        name = inId.name;
      }
      let docType = cur.identification.docType;
      let docId = cur.identification.docId;
      if (inId.docType !== undefined || inId.docId !== undefined) {
        const hasDoc = hasText(cur.identification.docType) && hasText(cur.identification.docId);
        if (hasDoc && (
          (inId.docType !== undefined && inId.docType !== cur.identification.docType) ||
          (inId.docId !== undefined && inId.docId !== cur.identification.docId)
        )) recusarSobrescrita('document');
        if (inId.docType !== undefined) docType = inId.docType;
        if (inId.docId !== undefined) docId = inId.docId;
      }
      const countryCode = inId.countryCode !== undefined ? inId.countryCode : cur.identification.countryCode;
      let legalName = cur.company.legalName;
      if (inCompany.legalName !== undefined) {
        if (hasText(cur.company.legalName) && cur.company.legalName !== inCompany.legalName) recusarSobrescrita('legalName');
        legalName = inCompany.legalName;
      }
      let tradeName = cur.company.tradeName;
      if (inCompany.tradeName !== undefined) {
        if (hasText(cur.company.tradeName) && cur.company.tradeName !== inCompany.tradeName) recusarSobrescrita('tradeName');
        tradeName = inCompany.tradeName;
      }
      let addresses: Record<string, unknown>[] = cur.base.addresses;
      if (inAddresses !== undefined && inAddresses.length > 0) {
        if (cur.base.addresses.length > 0) recusarSobrescrita('address');
        addresses = inAddresses.map((line) => ({ line1: line }));
      }

      // document shape by country (rule-document-shape-validated); duplicate check by document is done by the platform on write.
      if (hasText(docType) && hasText(docId)) {
        validarDocumento(docType, docId, countryCode);
      } else if (hasText(docType) !== hasText(docId)) {
        throw new AppError('INVALID_DOCUMENT', 'document type and number must be informed together', 422, { ruleId: 'rule-document-shape-validated' });
      }

      const identification: { name: string; docType?: string; docId?: string; countryCode: string } = { name, countryCode };
      if (hasText(docType)) identification.docType = docType;
      if (hasText(docId)) identification.docId = docId;
      const company: { companyKind: string; legalName: string; tradeName?: string } = {
        companyKind: cur.company.companyKind,
        legalName,
      };
      if (hasText(tradeName)) company.tradeName = tradeName;

      const updated = await updateEmpresa({
        id: String(input.id),
        version: Number(input.version),
        details: {
          identification,
          base: { aliases: cur.base.aliases, addresses },
          company,
          ...(cur.general !== undefined ? { general: cur.general } : {}),
        },
      }, bound);

      // empresaPreparadaDadosObrigatorios: recalculated here, never stored.
      return { empresa: await montarEmpresaPreparo(updated, bound) };
    });
  },
};
