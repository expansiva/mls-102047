/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/meu_cadastro.ts" enhancement="_blank"/>
import type { Meu_cadastroContracts, MeuCadastro } from '/_102047_/l2/inicio/web/contracts/meu_cadastro.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';
import type { GetPessoaOrganizacaoOutput } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';
import { updatePessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/updatePessoaOrganizacao.js';
import type { UpdatePessoaOrganizacaoInput } from '/_102047_/l1/inicio/layer_2_application/usecases/updatePessoaOrganizacao.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import { listPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.js';
import { abrirPedidoLiberacaoAcesso } from '/_102047_/l1/inicio/layer_2_application/workflows/liberacaoAcessoPessoa.js';

type PessoaDoc = GetPessoaOrganizacaoOutput;
type PessoaCandidata = { id?: unknown; details?: { base?: { contacts?: unknown } } };

/** Brasil e países da União Europeia: onde o consentimento de privacidade é exigido (acessoCompletoDadosMinimos). */
const PAISES_CONSENTIMENTO: string[] = [
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

function sessionPersonId(ctx: RequestContext): string {
  const id = ctx.sessionContext.person?.mdmId;
  if (id == null || id === '') {
    throw new AppError('NOT_FOUND', 'Pessoa da sessão não encontrada', 404);
  }
  return id;
}

function toStatus(status: string): 'Active' | 'Inactive' | 'Merged' | 'Blocked' {
  switch (status) {
    case 'Active':
    case 'Inactive':
    case 'Merged':
    case 'Blocked':
      return status;
    default:
      throw new AppError('INVALID_STATE', 'Situação de cadastro desconhecida: ' + status, 500);
  }
}

function hasConsent(consent: Record<string, unknown> | null | undefined): boolean {
  return consent != null && typeof consent === 'object' && Object.keys(consent).length > 0;
}

function isNonEmpty(value: string | null | undefined): boolean {
  return value != null && value.trim() !== '';
}

function assignmentsOf(person: PessoaDoc): string[] {
  const refs = person.details.base.relationshipRefs;
  if (refs == null) return [];
  const assignments = refs['assignments'];
  if (!Array.isArray(assignments)) return [];
  return assignments.filter((a): a is string => typeof a === 'string');
}

function emailsOfContacts(contacts: unknown): string[] {
  if (!Array.isArray(contacts)) return [];
  const emails: string[] = [];
  for (const contact of contacts) {
    if (contact == null || typeof contact !== 'object') continue;
    const value = (contact as { value?: unknown }).value;
    if (typeof value === 'string' && value.includes('@')) emails.push(value.trim().toLowerCase());
  }
  return emails;
}

async function existsOtherWithEmail(selfId: string, emails: string[], ctx: RequestContext): Promise<boolean> {
  if (emails.length === 0) return false;
  let page = 1;
  for (;;) {
    const res = await listPessoaOrganizacao({ page, pageSize: 200 }, ctx);
    for (const item of res.items) {
      const candidate: PessoaCandidata = item;
      if (candidate.id === selfId) continue;
      const others = emailsOfContacts(candidate.details?.base?.contacts);
      if (others.some((e) => emails.includes(e))) return true;
    }
    if (!res.hasMore) return false;
    page += 1;
  }
}

/** ligacaoLoginPelaPlataforma + repetirNaoDuplicaPessoa: recalculated at every read, nothing stored, the link is not decided here. */
async function aguardaLiberacaoDe(person: PessoaDoc, ctx: RequestContext): Promise<boolean> {
  const status = toStatus(person.details.identification.status);
  const assignments = assignmentsOf(person);
  if (status !== 'Active' || assignments.length === 0) {
    return existsOtherWithEmail(person.id, emailsOfContacts(person.details.base.contacts), ctx);
  }
  return false;
}

async function buildMeuCadastro(person: PessoaDoc, aguardaLiberacao: boolean, ctx: RequestContext): Promise<MeuCadastro> {
  const name = person.details.identification.name;
  const countryCode = person.details.identification.countryCode;
  const status = toStatus(person.details.identification.status);
  const consent = person.details.person?.privacyConsent;

  // acessoCompletoDadosMinimos + naoPedirDadoJaExistente: calculated, never stored; lists only what is still missing (the phone does not count).
  const consentimentoExigido = isNonEmpty(countryCode) && PAISES_CONSENTIMENTO.includes(countryCode.trim().toUpperCase());
  const faltantes: string[] = [];
  if (!isNonEmpty(name)) faltantes.push('nome');
  if (!isNonEmpty(countryCode)) faltantes.push('país');
  if (consentimentoExigido && !hasConsent(consent)) faltantes.push('consentimento de privacidade');
  // seguirDiretoSeCompleto: acessoCompleto true tells the page the person goes straight to the modules.
  const acessoCompleto = faltantes.length === 0;

  const assignments = assignmentsOf(person);
  if (assignments.length === 0) {
    throw new AppError('NOT_FOUND', 'Empresa ligada à pessoa não encontrada', 404);
  }
  const empresa = await getEmpresa({ id: assignments[0] }, ctx);

  const identification: MeuCadastro['details']['identification'] = { status };
  if (isNonEmpty(name)) identification.name = name;
  if (isNonEmpty(countryCode)) identification.countryCode = countryCode;

  return {
    id: person.id,
    version: person.version,
    details: {
      identification,
      base: {
        // emailContaNaoEditavel: the account e-mail comes in the contacts for display only.
        contacts: JSON.stringify(person.details.base.contacts),
        relationshipRefs: JSON.stringify(person.details.base.relationshipRefs),
      },
      inicio: {
        acessoCompleto,
        dadosFaltantes: faltantes.join(', '),
        consentimentoExigido,
      },
    },
    aguardaLiberacao,
    empresa: { details: { identification: { name: empresa.details.identification.name } } },
  };
}

function parseConsent(raw: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new AppError('VALIDATION_ERROR', 'Consentimento de privacidade inválido: não é um documento legível', 422, {
      ruleId: 'acessoCompletoDadosMinimos',
    });
  }
  if (parsed == null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new AppError('VALIDATION_ERROR', 'Consentimento de privacidade inválido: esperado um documento', 422, {
      ruleId: 'acessoCompletoDadosMinimos',
    });
  }
  return parsed as Record<string, unknown>;
}

export const requests: { [K in keyof Meu_cadastroContracts]: (input: Meu_cadastroContracts[K]['input'], ctx: RequestContext) => Promise<Meu_cadastroContracts[K]['output']> } = {
  "inicio.meu_cadastro.qryMeuCadastro": async function (_input, ctx) {
    const personId = sessionPersonId(ctx);
    const person = await getPessoaOrganizacao({ id: personId }, ctx);
    const aguardaLiberacao = await aguardaLiberacaoDe(person, ctx);
    const meuCadastro = await buildMeuCadastro(person, aguardaLiberacao, ctx);
    return { meuCadastro };
  },

  "inicio.meu_cadastro.salvarMeusDados": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const personId = sessionPersonId(bound);
      if (String(input.id) !== personId) {
        throw new AppError('FORBIDDEN', 'O cadastro informado não é o da pessoa da sessão', 403);
      }
      const current = await getPessoaOrganizacao({ id: personId }, bound);
      if (Number(input.version) !== current.version) {
        throw new AppError('CONFLICT', 'A versão do cadastro está desatualizada', 409);
      }

      // naoPedirDadoJaExistente: only fields still empty are filled; what the platform already has is kept.
      const sentName = input.details.identification.name;
      const sentCountry = input.details.identification.countryCode;
      const currentName = current.details.identification.name;
      const currentCountry = current.details.identification.countryCode;
      const name = isNonEmpty(currentName) ? currentName : (sentName ?? '').trim();
      let country = isNonEmpty(currentCountry) ? currentCountry : (sentCountry ?? '').trim().toUpperCase();
      if (!isNonEmpty(currentCountry) && country !== '' && !/^[A-Z]{2}$/.test(country)) {
        throw new AppError('VALIDATION_ERROR', 'País deve ser um código ISO 3166-1 alfa-2', 422);
      }
      country = country.trim();

      const existingConsent = current.details.person?.privacyConsent;
      const sentConsentRaw = input.details.person.privacyConsent;
      let consent: Record<string, unknown> | undefined = hasConsent(existingConsent) ? existingConsent : undefined;
      let consentChanged = false;
      if (consent === undefined && sentConsentRaw != null && sentConsentRaw.trim() !== '') {
        consent = parseConsent(sentConsentRaw);
        consentChanged = true;
      }

      // acessoCompletoDadosMinimos: consent is required when the informed or existing country is Brazil or in the EU.
      if (country !== '' && PAISES_CONSENTIMENTO.includes(country.toUpperCase()) && consent === undefined) {
        throw new AppError('CONSENT_REQUIRED', 'O país informado exige o consentimento de privacidade', 422, {
          ruleId: 'acessoCompletoDadosMinimos',
        });
      }

      // emailContaNaoEditavel: the input carries no e-mail and the base (contacts) is not sent, so the account e-mail is never changed.
      // dadosNaoConcedemPermissoes: only identification and consent are written; no role or permission is touched.
      // repetirNaoDuplicaPessoa: the same record (id) is updated; nothing is written when nothing changed, and no person or link is created.
      const changed = name !== currentName || country !== currentCountry || consentChanged;
      let saved: PessoaDoc = current;
      if (changed) {
        const details: UpdatePessoaOrganizacaoInput['details'] = {
          identification: { name, countryCode: country },
          base: {},
        };
        if (consent !== undefined) details.person = { privacyConsent: consent };
        if (current.details.general !== undefined) details.general = current.details.general;
        saved = await updatePessoaOrganizacao({ id: personId, version: current.version, details }, bound);
      }

      // ligacaoLoginPelaPlataforma: the process of the release keeps the occurrence; the link is decided by the platform.
      const aguardaLiberacao = await aguardaLiberacaoDe(saved, bound);
      await abrirPedidoLiberacaoAcesso({ pessoaId: personId, conflitoEmailContato: aguardaLiberacao }, bound);

      // acessoCompleto, dadosFaltantes and consentimentoExigido are recalculated from the saved state, never written.
      const meuCadastro = await buildMeuCadastro(saved, aguardaLiberacao, bound);
      return { meuCadastro };
    });
  },
};
