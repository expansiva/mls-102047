/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/pessoas_organizacao.ts" enhancement="_blank"/>

import type { Pessoas_organizacaoContracts, EmpresaPreparo, PessoaResumo, PessoaDetalhe, ContatoPessoa } from '/_102047_/l2/inicio/web/contracts/pessoas_organizacao.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import type { GetEmpresaOutput } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import { getPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';
import type { GetPessoaOrganizacaoOutput } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';

type Status = 'Active' | 'Inactive' | 'Merged' | 'Blocked';
type Etapa = 'pedidoEncaminhado' | 'acessoLiberado' | 'loginLigado' | 'acessoCompletado';

// Brasil e países da União Europeia: o consentimento de privacidade é exigido.
const PAISES_CONSENTIMENTO: string[] = [
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function toStatus(value: string): Status {
  if (value === 'Active' || value === 'Inactive' || value === 'Merged' || value === 'Blocked') return value;
  throw new AppError('INVALID_STATE', 'situação do cadastro desconhecida: ' + value, 500);
}

function refIds(details: Record<string, unknown>, key: string): string[] {
  const out: string[] = [];
  const sources: unknown[] = [details['relationshipRefs']];
  const base = details['base'];
  if (isRecord(base)) sources.push(base['relationshipRefs']);
  for (const src of sources) {
    if (!isRecord(src)) continue;
    const list = src[key];
    if (!Array.isArray(list)) continue;
    for (const id of list) {
      if (typeof id === 'string' && !out.includes(id)) out.push(id);
    }
  }
  return out;
}

function normalizeText(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function pageParams(page: number, pageSize: number): { page: number; pageSize: number } {
  const p = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const sRaw = Number.isFinite(pageSize) && pageSize >= 1 ? Math.floor(pageSize) : 20;
  return { page: p, pageSize: Math.min(sRaw, 200) };
}

function paginate<T>(all: T[], page: number, pageSize: number): { items: T[]; page: number; pageSize: number; hasMore: boolean } {
  const pp = pageParams(page, pageSize);
  const start = (pp.page - 1) * pp.pageSize;
  return {
    items: all.slice(start, start + pp.pageSize),
    page: pp.page,
    pageSize: pp.pageSize,
    hasMore: all.length > start + pp.pageSize,
  };
}

function consentimentoValido(consent: Record<string, unknown> | undefined): boolean {
  if (consent == null || !isRecord(consent)) return false;
  if (Object.keys(consent).length === 0) return false;
  if (consent['accepted'] === false || consent['granted'] === false) return false;
  if (consent['revokedAt'] != null || consent['withdrawnAt'] != null) return false;
  return true;
}

// acessoCompletoDadosMinimos: nome e país; consentimento válido se Brasil/UE; o telefone não conta.
function calcularAcesso(p: GetPessoaOrganizacaoOutput): { acessoCompleto: boolean; dadosFaltantes: string[]; consentimentoExigido: boolean } {
  const faltantes: string[] = [];
  const name = p.details.identification.name;
  const country = p.details.identification.countryCode;
  if (typeof name !== 'string' || name.trim() === '') faltantes.push('nome');
  if (typeof country !== 'string' || country.trim() === '') faltantes.push('país');
  const exigido = typeof country === 'string' && PAISES_CONSENTIMENTO.includes(country.toUpperCase());
  if (exigido && !consentimentoValido(p.details.person?.privacyConsent)) faltantes.push('consentimento de privacidade');
  return { acessoCompleto: faltantes.length === 0, dadosFaltantes: faltantes, consentimentoExigido: exigido };
}

// empresaPreparadaDadosObrigatorios: nome, documento, ao menos um endereço e ao menos um contato.
function calcularPreparo(e: GetEmpresaOutput): EmpresaPreparo {
  const faltantes: string[] = [];
  const ident = e.details.identification;
  if (typeof ident.name !== 'string' || ident.name.trim() === '') faltantes.push('nome');
  if (typeof ident.docId !== 'string' || ident.docId.trim() === '') faltantes.push('documento');
  if (!Array.isArray(e.details.base.addresses) || e.details.base.addresses.length === 0) faltantes.push('endereço');
  const temContato = refIds(e.details, 'contacts').length > 0
    || (Array.isArray(e.details.base.contacts) && e.details.base.contacts.length > 0);
  if (!temContato) faltantes.push('contato');
  return {
    id: e.id,
    details: { inicio: { preparada: faltantes.length === 0, dadosFaltantes: faltantes } },
  };
}

function toResumo(p: GetPessoaOrganizacaoOutput): PessoaResumo {
  const acesso = calcularAcesso(p);
  return {
    id: p.id,
    details: {
      identification: {
        name: p.details.identification.name,
        countryCode: p.details.identification.countryCode,
        status: toStatus(p.details.identification.status),
      },
      inicio: {
        acessoCompleto: acesso.acessoCompleto,
        dadosFaltantes: acesso.dadosFaltantes,
      },
    },
  };
}

function ordenar(list: PessoaResumo[]): PessoaResumo[] {
  return list.slice().sort((a, b) => {
    const ia = a.details.inicio.acessoCompleto ? 1 : 0;
    const ib = b.details.inicio.acessoCompleto ? 1 : 0;
    if (ia !== ib) return ia - ib;
    return a.details.identification.name.localeCompare(b.details.identification.name, 'pt-BR', { sensitivity: 'base' });
  });
}

function callerId(ctx: RequestContext): string {
  const id = ctx.sessionContext.person?.mdmId;
  if (id == null || id === '') throw new AppError('FORBIDDEN', 'pessoa da sessão não identificada', 403);
  return id;
}

// Resolve a empresa da organização do responsável logado (vínculo AssignedTo da pessoa da sessão).
async function resolverEmpresa(ctx: RequestContext): Promise<{ empresa: GetEmpresaOutput; callerId: string }> {
  const me = callerId(ctx);
  const pessoa = await getPessoaOrganizacao({ id: me }, ctx);
  const empresaIds = refIds(pessoa.details, 'assignments');
  if (empresaIds.length === 0) throw new AppError('NOT_FOUND', 'empresa da organização não encontrada para o responsável', 404);
  const empresa = await getEmpresa({ id: empresaIds[0] }, ctx);
  return { empresa, callerId: me };
}

async function carregarPessoas(ctx: RequestContext, empresa: GetEmpresaOutput, me: string): Promise<GetPessoaOrganizacaoOutput[]> {
  const ids: string[] = refIds(empresa.details, 'assignees');
  if (!ids.includes(me)) ids.push(me);
  return Promise.all(ids.map((id) => getPessoaOrganizacao({ id }, ctx)));
}

function derivarEtapa(status: Status, acessoCompleto: boolean): Etapa {
  // ligacaoLoginPelaPlataforma: a ligação do login é decidida pela liberação da plataforma; nada é registrado aqui.
  if (acessoCompleto) return 'acessoCompletado';
  if (status === 'Active') return 'loginLigado';
  if (status === 'Inactive') return 'acessoLiberado';
  return 'pedidoEncaminhado';
}

function contatosDe(p: GetPessoaOrganizacaoOutput): ContatoPessoa[] {
  const out: ContatoPessoa[] = [];
  const list = p.details.base.contacts;
  if (!Array.isArray(list)) return out;
  for (const c of list) {
    if (!isRecord(c)) continue;
    const raw = c['value'] ?? c['contact'] ?? c['contacts'];
    if (typeof raw === 'string' && raw !== '') out.push({ details: { base: { contacts: raw } } });
  }
  return out;
}

export const requests: { [K in keyof Pessoas_organizacaoContracts]: (input: Pessoas_organizacaoContracts[K]['input'], ctx: RequestContext) => Promise<Pessoas_organizacaoContracts[K]['output']> } = {
  "inicio.pessoas_organizacao.abrirPessoasOrganizacao": async function (input, ctx) {
    const { empresa, callerId: me } = await resolverEmpresa(ctx);
    // empresaPreparadaDadosObrigatorios: preparada e dadosFaltantes calculados, nunca lidos.
    const preparo = calcularPreparo(empresa);
    const pessoas = await carregarPessoas(ctx, empresa, me);
    // acessoCompletoDadosMinimos: calculado para cada pessoa.
    const resumos = ordenar(pessoas.map(toResumo));
    return {
      empresa: preparo,
      pessoas: paginate(resumos, input.page, input.pageSize),
    };
  },

  "inicio.pessoas_organizacao.buscarPessoas": async function (input, ctx) {
    const { empresa, callerId: me } = await resolverEmpresa(ctx);
    const pessoas = await carregarPessoas(ctx, empresa, me);
    // acessoCompletoDadosMinimos: calculado antes de aplicar o filtro de situação.
    let resumos = pessoas.map(toResumo);
    const termo = typeof input.busca === 'string' ? normalizeText(input.busca.trim()) : '';
    if (termo !== '') {
      resumos = resumos.filter((p) => normalizeText(p.details.identification.name).includes(termo));
    }
    if (input.situacao === 'acessoIncompleto') {
      resumos = resumos.filter((p) => !p.details.inicio.acessoCompleto);
    } else if (input.situacao === 'aguardandoLiberacao') {
      resumos = resumos.filter((p) => p.details.identification.status !== 'Active');
    }
    return { pessoas: paginate(ordenar(resumos), input.page, input.pageSize) };
  },

  "inicio.pessoas_organizacao.obterPessoa": async function (input, ctx) {
    const { empresa, callerId: me } = await resolverEmpresa(ctx);
    const pessoa = await getPessoaOrganizacao({ id: String(input.pessoaId) }, ctx);
    const pertence = pessoa.id === me
      || refIds(pessoa.details, 'assignments').includes(empresa.id)
      || refIds(empresa.details, 'assignees').includes(pessoa.id);
    if (!pertence) throw new AppError('FORBIDDEN', 'a pessoa não pertence à organização do responsável', 403);
    // acessoCompletoDadosMinimos: acessoCompleto, dadosFaltantes e consentimentoExigido calculados; o conteúdo do consentimento não sai.
    const acesso = calcularAcesso(pessoa);
    const status = toStatus(pessoa.details.identification.status);
    // dadosNaoConcedemPermissoes: só lê e calcula; nenhum papel nem permissão é concedido.
    const detalhe: PessoaDetalhe = {
      id: pessoa.id,
      details: {
        identification: {
          name: pessoa.details.identification.name,
          countryCode: pessoa.details.identification.countryCode,
          status,
        },
        inicio: {
          acessoCompleto: acesso.acessoCompleto,
          dadosFaltantes: acesso.dadosFaltantes,
          consentimentoExigido: acesso.consentimentoExigido,
        },
      },
      contacts: contatosDe(pessoa),
      etapaLiberacao: derivarEtapa(status, acesso.acessoCompleto),
    };
    return { pessoa: detalhe };
  },
};
