/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/pessoas_organizacao.ts" enhancement="_blank"/>
import type { Pessoas_organizacaoContracts, PessoaResumo, PessoaDetalhe, ContatoPessoa, EmpresaPreparo } from '/_102047_/l2/inicio/web/contracts/pessoas_organizacao.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import { getPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';
import { listPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.js';

type Status = 'Active' | 'Inactive' | 'Merged' | 'Blocked';
type Etapa = 'pedidoEncaminhado' | 'acessoLiberado' | 'loginLigado' | 'acessoCompletado';

type PessoaFonte = {
  id: string;
  details: {
    identification: { name: string; countryCode: string; status: string };
    base?: { relationshipRefs?: Record<string, unknown>; contacts?: Record<string, Record<string, unknown>[] | unknown> | Record<string, unknown>[] };
    person?: { privacyConsent?: Record<string, unknown> };
  };
};

type PessoaCalculada = {
  id: string;
  name: string;
  countryCode: string;
  status: Status;
  acessoCompleto: boolean;
  dadosFaltantes: string[];
  consentimentoExigido: boolean;
};

// Brasil e países da União Europeia: exigem consentimento de privacidade.
const PAISES_COM_CONSENTIMENTO = new Set<string>([
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

function toStatus(value: string): Status {
  if (value === 'Active' || value === 'Inactive' || value === 'Merged' || value === 'Blocked') return value;
  throw new AppError('INVALID_STATUS', 'Situação da pessoa na plataforma desconhecida: ' + String(value), 500);
}

function idsFromRefs(refs: unknown, key: string): string[] {
  if (refs == null || typeof refs !== 'object') return [];
  const value = (refs as Record<string, unknown>)[key];
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

function refsOf(details: unknown): unknown[] {
  // O vínculo pode estar em details.base.relationshipRefs (documento da pessoa) ou em details.relationshipRefs (chaves compactas da plataforma).
  if (details == null || typeof details !== 'object') return [];
  const d = details as Record<string, unknown>;
  const base = d['base'];
  const baseRefs = base != null && typeof base === 'object' ? (base as Record<string, unknown>)['relationshipRefs'] : undefined;
  return [baseRefs, d['relationshipRefs']];
}

function assignmentsOf(details: unknown): string[] {
  const out: string[] = [];
  for (const refs of refsOf(details)) out.push(...idsFromRefs(refs, 'assignments'));
  return out;
}

function contactIdsOf(details: unknown): string[] {
  const out: string[] = [];
  for (const refs of refsOf(details)) out.push(...idsFromRefs(refs, 'contacts'));
  return out;
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function hasText(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

/** acessoCompletoDadosMinimos: nome e país; consentimento de privacidade válido se Brasil/UE; telefone não conta. */
function calcularPessoa(p: PessoaFonte): PessoaCalculada {
  const ident = p.details.identification;
  const consentimentoExigido = hasText(ident.countryCode) && PAISES_COM_CONSENTIMENTO.has(ident.countryCode.toUpperCase());
  const consent = p.details.person?.privacyConsent;
  const consentimentoValido = consent != null && typeof consent === 'object' && Object.keys(consent).length > 0;
  const dadosFaltantes: string[] = [];
  if (!hasText(ident.name)) dadosFaltantes.push('nome');
  if (!hasText(ident.countryCode)) dadosFaltantes.push('país');
  if (consentimentoExigido && !consentimentoValido) dadosFaltantes.push('consentimento de privacidade');
  return {
    id: p.id,
    name: ident.name,
    countryCode: ident.countryCode,
    status: toStatus(ident.status),
    acessoCompleto: dadosFaltantes.length === 0,
    dadosFaltantes,
    consentimentoExigido,
  };
}

function ordenar(list: PessoaCalculada[]): PessoaCalculada[] {
  return [...list].sort((a, b) => {
    if (a.acessoCompleto !== b.acessoCompleto) return a.acessoCompleto ? 1 : -1;
    return a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' });
  });
}

function toResumo(p: PessoaCalculada): PessoaResumo {
  return {
    id: p.id,
    details: {
      identification: { name: p.name, countryCode: p.countryCode, status: p.status },
      inicio: { acessoCompleto: p.acessoCompleto, dadosFaltantes: p.dadosFaltantes },
    },
  };
}

function paginar<T>(all: T[], page: number, pageSize: number): { items: T[]; page: number; pageSize: number; hasMore: boolean } {
  const p = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const sizeRaw = Number.isFinite(pageSize) && pageSize >= 1 ? Math.floor(pageSize) : 20;
  const size = Math.min(sizeRaw, 200);
  const start = (p - 1) * size;
  const end = start + size;
  return { items: all.slice(start, end), page: p, pageSize: size, hasMore: all.length > end };
}

/** Empresa da organização do responsável logado: o vínculo AssignedTo da pessoa da sessão. */
async function resolveEmpresaId(ctx: RequestContext): Promise<string> {
  const person = ctx.sessionContext.person;
  if (person != null) {
    const me = await getPessoaOrganizacao({ id: person.mdmId }, ctx);
    const ids = assignmentsOf(me.details);
    if (ids.length > 0) return ids[0];
  }
  const active = ctx.sessionContext.activeCompanyId;
  if (active != null && active !== '') return active;
  throw new AppError('NOT_FOUND', 'Empresa da organização do responsável não encontrada', 404);
}

async function listarPessoasDaEmpresa(ctx: RequestContext, empresaId: string): Promise<{ fonte: PessoaFonte; calc: PessoaCalculada }[]> {
  const result: { fonte: PessoaFonte; calc: PessoaCalculada }[] = [];
  let page = 1;
  for (;;) {
    const res = await listPessoaOrganizacao({ page, pageSize: 200 }, ctx);
    for (const item of res.items) {
      const fonte: PessoaFonte = item;
      if (!assignmentsOf(fonte.details).includes(empresaId)) continue;
      result.push({ fonte, calc: calcularPessoa(fonte) });
    }
    if (!res.hasMore) break;
    page += 1;
  }
  return result;
}

export const requests: { [K in keyof Pessoas_organizacaoContracts]: (input: Pessoas_organizacaoContracts[K]['input'], ctx: RequestContext) => Promise<Pessoas_organizacaoContracts[K]['output']> } = {
  'inicio.pessoas_organizacao.abrirPessoasOrganizacao': async function (input, ctx) {
    const empresaId = await resolveEmpresaId(ctx);
    const empresa = await getEmpresa({ id: empresaId }, ctx);

    // empresaPreparadaDadosObrigatorios: nome, documento, ao menos um endereço e ao menos um contato.
    const faltantesEmpresa: string[] = [];
    if (!hasText(empresa.details.identification.name)) faltantesEmpresa.push('nome');
    if (!hasText(empresa.details.identification.docType) || !hasText(empresa.details.identification.docId)) faltantesEmpresa.push('documento');
    if (!Array.isArray(empresa.details.base.addresses) || empresa.details.base.addresses.length === 0) faltantesEmpresa.push('endereço');
    const temContato = (Array.isArray(empresa.details.base.contacts) && empresa.details.base.contacts.length > 0) || contactIdsOf(empresa.details).length > 0;
    if (!temContato) faltantesEmpresa.push('contato');
    const empresaPreparo: EmpresaPreparo = {
      id: empresa.id,
      details: { inicio: { preparada: faltantesEmpresa.length === 0, dadosFaltantes: faltantesEmpresa } },
    };

    // acessoCompletoDadosMinimos: calculado para cada pessoa, nunca lido do armazenamento.
    const pessoas = await listarPessoasDaEmpresa(ctx, empresaId);
    const ordenadas = ordenar(pessoas.map((p) => p.calc));
    const pagina = paginar(ordenadas, input.page, input.pageSize);
    return {
      empresa: empresaPreparo,
      pessoas: { items: pagina.items.map(toResumo), page: pagina.page, pageSize: pagina.pageSize, hasMore: pagina.hasMore },
    };
  },

  'inicio.pessoas_organizacao.buscarPessoas': async function (input, ctx) {
    const empresaId = await resolveEmpresaId(ctx);
    const pessoas = await listarPessoasDaEmpresa(ctx, empresaId);
    const termo = input.busca != null ? normalizeText(input.busca.trim()) : '';
    const situacao = input.situacao ?? 'todas';
    const filtradas = pessoas
      .map((p) => p.calc)
      // locate.byName: contém o trecho, sem diferenciar maiúsculas nem acentos.
      .filter((p) => termo === '' || normalizeText(p.name).includes(termo))
      // acessoCompletoDadosMinimos: o filtro de situação usa o valor calculado e o status.
      .filter((p) => {
        if (situacao === 'acessoIncompleto') return !p.acessoCompleto;
        if (situacao === 'aguardandoLiberacao') return p.status !== 'Active';
        return true;
      });
    const pagina = paginar(ordenar(filtradas), input.page, input.pageSize);
    return {
      pessoas: { items: pagina.items.map(toResumo), page: pagina.page, pageSize: pagina.pageSize, hasMore: pagina.hasMore },
    };
  },

  'inicio.pessoas_organizacao.obterPessoa': async function (input, ctx) {
    const empresaId = await resolveEmpresaId(ctx);
    const record = await getPessoaOrganizacao({ id: String(input.pessoaId) }, ctx);
    if (!assignmentsOf(record.details).includes(empresaId)) {
      throw new AppError('FORBIDDEN', 'A pessoa não pertence à organização do responsável', 403);
    }
    const fonte: PessoaFonte = record;
    const calc = calcularPessoa(fonte);

    // Contatos: e-mail da conta e telefone opcional (resumo da plataforma).
    const contacts: ContatoPessoa[] = [];
    for (const c of record.details.base.contacts) {
      const value = typeof c['value'] === 'string' ? c['value'] : typeof c['contact'] === 'string' ? c['contact'] : null;
      if (value == null) continue;
      contacts.push({ details: { base: { contacts: value } } });
    }

    // ligacaoLoginPelaPlataforma: a ligação do login é decidida pela plataforma; aqui só se deriva a etapa, sem registrar pendência.
    // dadosNaoConcedemPermissoes: nenhum papel ou permissão é concedido nem lido aqui.
    let etapa: Etapa;
    if (calc.acessoCompleto) etapa = 'acessoCompletado';
    else if (calc.status === 'Active') etapa = 'loginLigado';
    else if (calc.status === 'Inactive') etapa = 'acessoLiberado';
    else etapa = 'pedidoEncaminhado';

    const pessoa: PessoaDetalhe = {
      id: calc.id,
      details: {
        identification: { name: calc.name, countryCode: calc.countryCode, status: calc.status },
        inicio: {
          acessoCompleto: calc.acessoCompleto,
          dadosFaltantes: calc.dadosFaltantes,
          consentimentoExigido: calc.consentimentoExigido,
        },
      },
      contacts,
      etapaLiberacao: etapa,
    };
    return { pessoa };
  },
};
