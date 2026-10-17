/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/inicio_responsavel.ts" enhancement="_blank"/>

import type { Inicio_responsavelContracts } from '/_102047_/l2/inicio/web/contracts/inicio_responsavel.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import { listPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.js';
import type { ListPessoaOrganizacaoInput, ListPessoaOrganizacaoOutput } from '/_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.js';
import { listContatoEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/listContatoEmpresa.js';

type PessoaItem = ListPessoaOrganizacaoOutput['items'][number];
type PessoaStatus = 'Active' | 'Inactive' | 'Merged' | 'Blocked';

const MAX_PAGE_SIZE = 200;
const DEFAULT_PAGE_SIZE = 20;

// Brasil e países da União Europeia: exigem consentimento de privacidade.
const COUNTRIES_WITH_CONSENT = new Set<string>([
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

function isBlank(value: string | null | undefined): boolean {
  return value == null || value.trim() === '';
}

function toStatus(value: string): PessoaStatus {
  switch (value) {
    case 'Active':
    case 'Inactive':
    case 'Merged':
    case 'Blocked':
      return value;
    default:
      throw new AppError('INVALID_STATUS', 'unsupported person status: ' + value, 500);
  }
}

/** acessoCompletoDadosMinimos: nome, país e consentimento (Brasil/UE); telefone não conta. */
function calcAcesso(p: PessoaItem): { dadosFaltantes: string[]; consentimentoExigido: boolean; consentimentoPendente: boolean } {
  const dadosFaltantes: string[] = [];
  const countryCode = p.details.identification.countryCode;
  if (isBlank(p.details.identification.name)) dadosFaltantes.push('nome');
  const semPais = isBlank(countryCode);
  if (semPais) dadosFaltantes.push('país');
  const consentimentoExigido = !semPais && COUNTRIES_WITH_CONSENT.has(countryCode.trim().toUpperCase());
  const consent = p.details.person?.privacyConsent;
  const temConsentimento = consent != null && Object.keys(consent).length > 0;
  const consentimentoPendente = consentimentoExigido && !temConsentimento;
  if (consentimentoPendente) dadosFaltantes.push('consentimento de privacidade');
  return { dadosFaltantes, consentimentoExigido, consentimentoPendente };
}

async function listAllPessoas(ctx: RequestContext, status?: string): Promise<PessoaItem[]> {
  const all: PessoaItem[] = [];
  let page = 1;
  for (;;) {
    const listInput: ListPessoaOrganizacaoInput = status === undefined
      ? { page, pageSize: MAX_PAGE_SIZE }
      : { details: { identification: { status } }, page, pageSize: MAX_PAGE_SIZE };
    const res = await listPessoaOrganizacao(listInput, ctx);
    all.push(...res.items);
    if (!res.hasMore) break;
    page += 1;
  }
  return all;
}

function contactsText(contacts: Record<string, unknown>[]): string {
  const parts: string[] = [];
  for (const c of contacts) {
    const candidate = c['value'] ?? c['contact'] ?? c['label'];
    if (typeof candidate === 'string' && candidate.trim() !== '') parts.push(candidate);
  }
  return parts.join(', ');
}

export const requests: { [K in keyof Inicio_responsavelContracts]: (input: Inicio_responsavelContracts[K]['input'], ctx: RequestContext) => Promise<Inicio_responsavelContracts[K]['output']> } = {
  "inicio.inicio_responsavel.qryPainelResponsavel": async function (_input, ctx) {
    const empresaId = ctx.sessionContext.activeCompanyId ?? ctx.sessionContext.businessContext.activeCompanyId;
    if (empresaId == null || empresaId === '') {
      throw new AppError('NOT_FOUND', 'empresa da organização não encontrada na sessão', 404);
    }
    const empresa = await getEmpresa({ id: empresaId }, ctx);

    // empresaPreparadaDadosObrigatorios + naoPedirDadoJaExistente: só lista o que a plataforma ainda não tem.
    const dadosFaltantesEmpresa: string[] = [];
    if (isBlank(empresa.details.identification.name)) dadosFaltantesEmpresa.push('nome');
    if (isBlank(empresa.details.identification.docId)) dadosFaltantesEmpresa.push('documento');
    if (empresa.details.base.addresses.length === 0) dadosFaltantesEmpresa.push('endereço');
    let temContato = empresa.details.base.contacts.length > 0;
    if (!temContato) {
      const contatos = await listContatoEmpresa({ details: { identification: { status: 'Active' } }, page: 1, pageSize: 1 }, ctx);
      temContato = contatos.items.length > 0;
    }
    if (!temContato) dadosFaltantesEmpresa.push('contato');
    const preparada = dadosFaltantesEmpresa.length === 0;

    // acessoCompletoDadosMinimos: contagens calculadas, nunca gravadas.
    const pessoas = await listAllPessoas(ctx);
    let totalAcessoCompleto = 0;
    let totalComDadosFaltando = 0;
    let totalConsentimentoPendente = 0;
    for (const p of pessoas) {
      const acesso = calcAcesso(p);
      if (acesso.dadosFaltantes.length === 0) totalAcessoCompleto += 1;
      else totalComDadosFaltando += 1;
      if (acesso.consentimentoPendente) totalConsentimentoPendente += 1;
    }

    return {
      empresa: {
        id: empresa.id,
        details: {
          identification: { name: empresa.details.identification.name },
          inicio: { preparada, dadosFaltantes: dadosFaltantesEmpresa },
        },
      },
      indicadores: { totalAcessoCompleto, totalComDadosFaltando, totalConsentimentoPendente },
    };
  },

  "inicio.inicio_responsavel.qryPessoasAguardandoLiberacao": async function (input, ctx) {
    const page = input.page >= 1 ? Math.floor(input.page) : 1;
    const pageSize = input.pageSize >= 1 ? Math.min(Math.floor(input.pageSize), MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE;

    // Situação na plataforma não ativa (Inactive ou Blocked): filtros exatos, um por situação.
    const inativas = await listAllPessoas(ctx, 'Inactive');
    const bloqueadas = await listAllPessoas(ctx, 'Blocked');
    const aguardando = [...inativas, ...bloqueadas];
    aguardando.sort((a, b) => a.details.identification.name.localeCompare(b.details.identification.name, 'pt-BR', { sensitivity: 'base' }));

    const start = (page - 1) * pageSize;
    const slice = aguardando.slice(start, start + pageSize);
    const hasMore = start + slice.length < aguardando.length;

    const items = slice.map((p) => ({
      id: p.id,
      details: {
        identification: {
          name: p.details.identification.name,
          status: toStatus(p.details.identification.status),
        },
        base: { contacts: contactsText(p.details.base.contacts) },
        // acessoCompletoDadosMinimos: dadosFaltantes calculado, o consentimento em si não é exposto.
        inicio: { dadosFaltantes: calcAcesso(p).dadosFaltantes },
      },
    }));

    return { pessoas: { items, page, pageSize, hasMore } };
  },
};
