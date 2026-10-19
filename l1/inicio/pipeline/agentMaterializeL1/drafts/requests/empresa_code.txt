/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/empresa.ts" enhancement="_blank"/>

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { EmpresaContracts, EmpresaPreparo, ContatoEmpresaResumo } from '/_102047_/l2/inicio/web/contracts/empresa.defs.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import type { GetEmpresaOutput } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import { listContatoEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/listContatoEmpresa.js';
import { updateEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/updateEmpresa.js';
import type { UpdateEmpresaInput } from '/_102047_/l1/inicio/layer_2_application/usecases/updateEmpresa.js';
import { getPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';

type DocType = NonNullable<EmpresaPreparo['details']['identification']['docType']>;
type Falta = EmpresaPreparo['dadosFaltantes'];
type ContactType = ContatoEmpresaResumo['details']['contactChannel']['contactType'];

const DOC_TYPES: DocType[] = ['CNPJ', 'EIN', 'VAT', 'NationalId', 'Other'];
const CONTACT_TYPES: ContactType[] = ['Phone', 'Email', 'WhatsApp'];
const ADDRESS_LINE_KEY = 'line1';

function hasText(value: string | undefined | null): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

function toDocType(value: string | undefined | null): DocType | undefined {
  if (!hasText(value)) return undefined;
  const found = DOC_TYPES.find((t) => t === value);
  if (found === undefined) {
    throw new AppError('INVALID_DOCUMENT', 'Tipo de documento não suportado: ' + value, 422, { ruleId: 'rule-document-shape-validated' });
  }
  return found;
}

function toContactType(value: string): ContactType {
  const found = CONTACT_TYPES.find((t) => t === value);
  if (found === undefined) {
    throw new AppError('INVALID_CONTACT', 'Tipo de contato não suportado: ' + value, 422);
  }
  return found;
}

function addressText(address: Record<string, unknown>): string {
  const preferred = [ADDRESS_LINE_KEY, 'formatted', 'street'];
  for (const key of preferred) {
    const v = address[key];
    if (typeof v === 'string' && v.trim() !== '') return v;
  }
  return Object.values(address)
    .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
    .join(', ');
}

function validCnpj(raw: string): boolean {
  const d = raw.replace(/\D/g, '');
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const digit = (len: number): number => {
    const weights = len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(d.charAt(i)) * weights[i];
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return digit(12) === Number(d.charAt(12)) && digit(13) === Number(d.charAt(13));
}

function isResponsavel(ctx: RequestContext): boolean {
  const scope = ctx.sessionContext.actorScope ?? [];
  return scope.some((item) => item === 'responsavel' || item.endsWith(':responsavel'));
}

async function resolveEmpresaId(ctx: RequestContext): Promise<string> {
  const active = ctx.sessionContext.activeCompanyId;
  if (hasText(active)) return active;
  const person = ctx.sessionContext.person;
  if (person != null) {
    const pessoa = await getPessoaOrganizacao({ id: person.mdmId }, ctx);
    const assignments = pessoa.details.base.relationshipRefs['assignments'];
    if (Array.isArray(assignments) && typeof assignments[0] === 'string') return assignments[0];
  }
  throw new AppError('NOT_FOUND', 'Empresa da sessão não encontrada.', 404);
}

async function listContatos(ctx: RequestContext): Promise<ContatoEmpresaResumo[]> {
  const result: ContatoEmpresaResumo[] = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await listContatoEmpresa({ details: { identification: { status: 'Active' } }, page, pageSize: 200 }, ctx);
    for (const item of res.items) {
      // inactive contacts are not contacts of the company
      if (item.details.identification.status !== 'Active') continue;
      result.push({
        id: item.id,
        details: {
          identification: { name: item.details.identification.name },
          contactChannel: {
            contactType: toContactType(item.details.contactChannel.contactType),
            value: item.details.contactChannel.value,
            isVerified: item.details.contactChannel.isVerified,
          },
        },
      });
    }
    hasMore = res.hasMore;
    page += 1;
  }
  return result;
}

function firstMissing(list: Falta[]): Falta {
  // When nothing is missing the list is empty and the field stays absent in the response.
  return list[0];
}

function buildEmpresa(empresa: GetEmpresaOutput, contacts: ContatoEmpresaResumo[]): EmpresaPreparo {
  const ident = empresa.details.identification;
  const docType = toDocType(ident.docType);
  const addresses = empresa.details.base.addresses.map(addressText).filter((a) => a !== '');

  // naoPedirDadoJaExistente: only what the platform does not have yet is listed as missing.
  // empresaPreparadaDadosObrigatorios: prepared only with name, document (type and number), one address and one contact.
  const faltas: Falta[] = [];
  if (!hasText(ident.name)) faltas.push('nome');
  if (docType === undefined || !hasText(ident.docId)) faltas.push('documento');
  if (addresses.length === 0) faltas.push('endereco');
  if (contacts.length === 0) faltas.push('contato');
  const preparada = faltas.length === 0;

  return {
    id: empresa.id,
    version: empresa.version,
    details: {
      identification: {
        ...(hasText(ident.name) ? { name: ident.name } : {}),
        ...(docType !== undefined ? { docType } : {}),
        ...(hasText(ident.docId) ? { docId: ident.docId } : {}),
        ...(hasText(ident.countryCode) ? { countryCode: ident.countryCode } : {}),
      },
      company: {
        ...(hasText(empresa.details.company.legalName) ? { legalName: empresa.details.company.legalName } : {}),
        ...(hasText(empresa.details.company.tradeName) ? { tradeName: empresa.details.company.tradeName } : {}),
      },
      base: { addresses },
    },
    contacts,
    preparada,
    dadosFaltantes: firstMissing(faltas),
  };
}

export const requests: { [K in keyof EmpresaContracts]: (input: EmpresaContracts[K]['input'], ctx: RequestContext) => Promise<EmpresaContracts[K]['output']> } = {
  'inicio.empresa.qryEmpresaPreparo': async function (input, ctx) {
    const empresaId = await resolveEmpresaId(ctx);
    const empresa = await getEmpresa({ id: empresaId }, ctx);
    const contacts = await listContatos(ctx);
    return { empresa: buildEmpresa(empresa, contacts) };
  },

  'inicio.empresa.cmdSalvarDadosEmpresa': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };

      // somenteResponsavelEditaEmpresa: the platform session must recognize the caller as the responsible of this company.
      const sessionEmpresaId = isResponsavel(ctx) ? await resolveEmpresaId(bound) : undefined;
      if (sessionEmpresaId === undefined || sessionEmpresaId !== input.id) {
        throw new AppError('FORBIDDEN', 'Só o responsável reconhecido pela plataforma pode completar os dados da empresa.', 403, { ruleId: 'somenteResponsavelEditaEmpresa' });
      }

      const current = await getEmpresa({ id: input.id }, bound);
      const cur = current.details;
      const sent = input.details;

      // naoPedirDadoJaExistente: data the platform already has is never overwritten; only missing data is applied.
      const name = hasText(cur.identification.name) ? cur.identification.name : (sent.identification.name ?? cur.identification.name);

      const curDocType = toDocType(cur.identification.docType);
      const curHasDoc = curDocType !== undefined && hasText(cur.identification.docId);
      const docType = curHasDoc ? curDocType : (toDocType(sent.identification.docType) ?? curDocType);
      const docId = curHasDoc ? cur.identification.docId : (hasText(sent.identification.docId) ? sent.identification.docId.trim() : cur.identification.docId);
      const settingDoc = !curHasDoc && (sent.identification.docType !== undefined || sent.identification.docId !== undefined);
      const countryCode = !curHasDoc && hasText(sent.identification.countryCode) ? sent.identification.countryCode : cur.identification.countryCode;

      // rule-document-shape-validated: the document format follows its type.
      if (settingDoc && docType === 'CNPJ' && (!hasText(docId) || !validCnpj(docId))) {
        throw new AppError('INVALID_DOCUMENT', 'CNPJ inválido.', 422, { ruleId: 'rule-document-shape-validated' });
      }
      if (settingDoc && (docType === undefined || !hasText(docId))) {
        throw new AppError('INVALID_DOCUMENT', 'Informe o tipo e o número do documento.', 422, { ruleId: 'rule-document-shape-validated' });
      }

      const legalName = hasText(cur.company.legalName) ? cur.company.legalName : (sent.company.legalName ?? cur.company.legalName);
      const tradeName = hasText(cur.company.tradeName) ? cur.company.tradeName : (hasText(sent.company.tradeName) ? sent.company.tradeName : undefined);

      const sentAddresses = (sent.base.addresses ?? []).filter(hasText);
      const hasAddress = cur.base.addresses.map(addressText).some((a) => a !== '');
      const addresses: Record<string, unknown>[] = hasAddress || sentAddresses.length === 0
        ? cur.base.addresses
        : sentAddresses.map((text) => ({ [ADDRESS_LINE_KEY]: text }));

      const updateInput: UpdateEmpresaInput = {
        id: input.id,
        version: Number(input.version),
        details: {
          identification: {
            name,
            countryCode,
            ...(docType !== undefined ? { docType } : {}),
            ...(hasText(docId) ? { docId } : {}),
          },
          base: { aliases: cur.base.aliases, addresses },
          company: {
            companyKind: cur.company.companyKind,
            legalName,
            ...(tradeName !== undefined ? { tradeName } : {}),
          },
          ...(cur.general !== undefined ? { general: cur.general } : {}),
        },
      };

      const updated = await updateEmpresa(updateInput, bound);
      const contacts = await listContatos(bound);
      // empresaPreparadaDadosObrigatorios: recalculated here, not stored.
      return { empresa: buildEmpresa(updated, contacts) };
    });
  },
};
