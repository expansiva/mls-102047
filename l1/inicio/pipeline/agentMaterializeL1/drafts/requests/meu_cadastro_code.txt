/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/meu_cadastro.ts" enhancement="_blank"/>
import type { Meu_cadastroContracts, MeuCadastro } from '/_102047_/l2/inicio/web/contracts/meu_cadastro.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';
import type { GetPessoaOrganizacaoOutput } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';
import { updatePessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/updatePessoaOrganizacao.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import { listPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.js';
import { concluirLiberacaoAcesso } from '/_102047_/l1/inicio/layer_2_application/workflows/liberacaoAcessoPessoa.js';

type Status = 'Active' | 'Inactive' | 'Merged' | 'Blocked';

// Brasil e países da União Europeia: exigem consentimento de privacidade.
const CONSENT_COUNTRIES: string[] = [
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT',
  'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

function isBlank(value: string | undefined | null): boolean {
  return value == null || value.trim() === '';
}

function toStatus(value: string): Status {
  if (value === 'Active' || value === 'Inactive' || value === 'Merged' || value === 'Blocked') return value;
  throw new AppError('INVALID_STATUS', 'situação do cadastro desconhecida: ' + value, 500);
}

function requiresConsent(countryCode: string | undefined | null): boolean {
  if (isBlank(countryCode)) return false;
  return CONSENT_COUNTRIES.indexOf((countryCode as string).trim().toUpperCase()) >= 0;
}

function hasConsent(consent: Record<string, unknown> | null | undefined): boolean {
  return consent != null && typeof consent === 'object' && Object.keys(consent).length > 0;
}

function sessionPersonId(ctx: RequestContext): string {
  const id = ctx.sessionContext.person?.mdmId;
  if (id == null || id === '') {
    throw new AppError('NOT_FOUND', 'cadastro da pessoa da sessão não encontrado', 404);
  }
  return id;
}

function emailsOf(contacts: unknown): string[] {
  const out: string[] = [];
  if (!Array.isArray(contacts)) return out;
  for (const c of contacts) {
    if (c == null || typeof c !== 'object') continue;
    const value = (c as { value?: unknown }).value;
    if (typeof value === 'string' && value.indexOf('@') >= 0) out.push(value.trim().toLowerCase());
  }
  return out;
}

function firstRef(refs: Record<string, unknown>, key: string): string | undefined {
  const list = refs[key];
  if (Array.isArray(list) && list.length > 0 && typeof list[0] === 'string') return list[0] as string;
  return undefined;
}

async function existsOtherWithSameEmail(person: GetPessoaOrganizacaoOutput, ctx: RequestContext): Promise<boolean> {
  const mine = emailsOf(person.details.base.contacts);
  if (mine.length === 0) return false;
  let page = 1;
  for (;;) {
    const res = await listPessoaOrganizacao({ page, pageSize: 200 }, ctx);
    for (const item of res.items) {
      if (item.id === person.id) continue;
      const theirs = emailsOf(item.details.base.contacts);
      if (theirs.some((e) => mine.indexOf(e) >= 0)) return true;
    }
    if (!res.hasMore) return false;
    page += 1;
  }
}

async function buildMeuCadastro(person: GetPessoaOrganizacaoOutput, ctx: RequestContext): Promise<MeuCadastro> {
  const name = person.details.identification.name;
  const countryCode = person.details.identification.countryCode;
  const refs = person.details.base.relationshipRefs ?? {};

  // acessoCompletoDadosMinimos / naoPedirDadoJaExistente: calculated on every read, never stored; lists only what is missing.
  const consentimentoExigido = requiresConsent(countryCode);
  const missing: string[] = [];
  if (isBlank(name)) missing.push('nome');
  if (isBlank(countryCode)) missing.push('país');
  if (consentimentoExigido && !hasConsent(person.details.person?.privacyConsent)) {
    missing.push('consentimento de privacidade');
  }
  // seguirDiretoSeCompleto: acessoCompleto true tells the page the person goes straight to the modules, without the form.
  const acessoCompleto = missing.length === 0;

  // ligacaoLoginPelaPlataforma / repetirNaoDuplicaPessoa: calculated from status, contacts and links; nothing is stored.
  const empresaId = firstRef(refs, 'assignments');
  const hasOther = await existsOtherWithSameEmail(person, ctx);
  const aguardaLiberacao = hasOther && (person.details.identification.status !== 'Active' || empresaId == null);

  if (empresaId == null) {
    throw new AppError('NOT_FOUND', 'empresa ligada à pessoa não encontrada', 404);
  }
  const empresa = await getEmpresa({ id: empresaId }, ctx);

  const identification: MeuCadastro['details']['identification'] = {
    status: toStatus(person.details.identification.status),
  };
  if (!isBlank(name)) identification.name = name;
  if (!isBlank(countryCode)) identification.countryCode = countryCode;

  return {
    id: person.id,
    version: person.version,
    details: {
      identification,
      base: {
        // emailContaNaoEditavel: the account e-mail comes in the contacts for display only.
        contacts: JSON.stringify(person.details.base.contacts ?? []),
        relationshipRefs: JSON.stringify(refs),
      },
      inicio: {
        acessoCompleto,
        dadosFaltantes: missing.join(', '),
        consentimentoExigido,
      },
    },
    aguardaLiberacao,
    empresa: { details: { identification: { name: empresa.details.identification.name } } },
  };
}

export const requests: { [K in keyof Meu_cadastroContracts]: (input: Meu_cadastroContracts[K]['input'], ctx: RequestContext) => Promise<Meu_cadastroContracts[K]['output']> } = {
  "inicio.meu_cadastro.qryMeuCadastro": async function (input, ctx) {
    const personId = sessionPersonId(ctx);
    const person = await getPessoaOrganizacao({ id: personId }, ctx);
    const meuCadastro = await buildMeuCadastro(person, ctx);
    return { meuCadastro };
  },

  "inicio.meu_cadastro.salvarMeusDados": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const personId = sessionPersonId(bound);
      if (String(input.id) !== personId) {
        throw new AppError('FORBIDDEN', 'o id informado não é o cadastro da pessoa da sessão', 403);
      }
      const current = await getPessoaOrganizacao({ id: personId }, bound);
      if (Number(input.version) !== current.version) {
        throw new AppError('VERSION_CONFLICT', 'a versão do cadastro está desatualizada', 409);
      }

      // naoPedirDadoJaExistente: only empty fields are filled; what the platform already has is kept.
      const currentName = current.details.identification.name;
      const currentCountry = current.details.identification.countryCode;
      const inputName = input.details.identification.name;
      const inputCountry = input.details.identification.countryCode;
      const finalName = !isBlank(currentName) ? currentName : (isBlank(inputName) ? '' : (inputName as string).trim());
      const finalCountry = !isBlank(currentCountry)
        ? currentCountry
        : (isBlank(inputCountry) ? '' : (inputCountry as string).trim().toUpperCase());
      if (finalName === '' || finalCountry === '') {
        throw new AppError('VALIDATION_ERROR', 'nome e país são necessários para completar o cadastro', 422, {
          ruleId: 'acessoCompletoDadosMinimos',
        });
      }

      // acessoCompletoDadosMinimos: consent is required when the informed or existing country is Brasil or União Europeia.
      const existingConsent = current.details.person?.privacyConsent;
      const inputConsent = input.details.person.privacyConsent;
      let consent: Record<string, unknown> | undefined;
      if (hasConsent(existingConsent)) {
        consent = existingConsent;
      } else if (!isBlank(inputConsent)) {
        consent = { accepted: true, acceptedAt: bound.clock.nowIso(), policy: (inputConsent as string).trim() };
      }
      if (requiresConsent(finalCountry) && consent == null) {
        throw new AppError('CONSENT_REQUIRED', 'o consentimento de privacidade é exigido para o país informado', 422, {
          ruleId: 'acessoCompletoDadosMinimos',
        });
      }

      // emailContaNaoEditavel: no e-mail or contact is sent; contacts are kept by the platform.
      // dadosNaoConcedemPermissoes: only data is written; no role or permission is granted.
      // repetirNaoDuplicaPessoa: the same record (session id) is updated; no person or link is created.
      const updated = await updatePessoaOrganizacao(
        {
          id: personId,
          version: current.version,
          details: {
            identification: { name: finalName, countryCode: finalCountry },
            base: {},
            ...(consent != null ? { person: { privacyConsent: consent } } : {}),
          },
        },
        bound,
      );

      // Process liberacaoAcessoPessoa: the occurrence of this person (requestId = person id) is advanced by the process function.
      await concluirLiberacaoAcesso({ requestId: personId }, bound);

      const meuCadastro = await buildMeuCadastro(updated, bound);
      return { meuCadastro };
    });
  },
};
