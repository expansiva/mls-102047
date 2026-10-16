/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/minhas_tarefas.ts" enhancement="_blank"/>

import type {
  Minhas_tarefasContracts,
  TarefaResumo,
  TarefaAberta,
  ItemChecklistLinha,
  ItemChecklistEntrada,
  MembroNome,
  MembroOpcao,
  ListaOpcao,
} from '/_102047_/l2/tarefas/web/contracts/minhas_tarefas.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { getTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import { updateTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.js';
import type { UpdateTarefaInput } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { listLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import { listItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';
import { updateItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateItemChecklist.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import { listMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.js';
import {
  abrirOcorrenciaTarefa,
  avancarEtapaTarefa,
  reatribuirQuemAge,
} from '/_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.js';
import type {
  TransicaoTarefa,
  AbrirOcorrenciaTarefaInput,
} from '/_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.js';

type StatusTarefa = TarefaResumo['status'];
type Prioridade = TarefaResumo['prioridade'];
type TipoLista = ListaOpcao['details']['details']['tipo'];
type StatusMembro = 'Active' | 'Inactive' | 'Merged' | 'Blocked';

interface TarefaLida {
  id: string;
  version: number;
  titulo: string;
  status: string;
  prioridade: string;
  prazo: string;
  listaId: string;
  responsavelId: string;
  criadorId: string;
  tarefaPaiId?: string;
  chaveCriacao: string;
  criadaEm: string;
  details: {
    descricao?: string;
    motivoDevolucao?: string;
    devolvidaEm?: string;
    concluidaEm?: string;
    canceladaEm?: string;
  };
}

interface ItemLido {
  id: string;
  version: number;
  tarefaId: string;
  ordem: number;
  feito: boolean;
  details: {
    descricao: string;
    marcadoEm?: string;
  };
}

interface MembroLido {
  id: string;
  details: {
    identification: {
      name: string;
      status: string;
    };
  };
}

interface ItemChecklistRepository {
  create(input: { tarefaId: string; ordem: number; feito: boolean; details: { descricao: string } }): Promise<unknown>;
  delete(id: string): Promise<unknown>;
}

interface FiltroTarefa {
  criadorId?: string;
  responsavelId?: string;
  status?: string;
  tarefaPaiId?: string;
  chaveCriacao?: string;
}

interface Caches {
  membros: Map<string, { name: string; status: string }>;
  listas: Map<string, string>;
}

interface Derivados {
  checklist: ItemLido[];
  subtarefas: number;
}

interface ParTarefa {
  tarefa: TarefaAberta;
  resumo: TarefaResumo;
}

const STATUS_VALIDOS: StatusTarefa[] = ['aFazer', 'emAndamento', 'emRevisao', 'concluida', 'cancelada'];
const PRIORIDADES_VALIDAS: Prioridade[] = ['low', 'medium', 'high'];
const TIPOS_LISTA: TipoLista[] = ['project', 'area'];
const STATUS_MEMBRO: StatusMembro[] = ['Active', 'Inactive', 'Merged', 'Blocked'];
const ABERTAS: StatusTarefa[] = ['aFazer', 'emAndamento', 'emRevisao'];

function asStatus(v: string): StatusTarefa {
  const f = STATUS_VALIDOS.find((s) => s === v);
  if (f === undefined) throw new AppError('INVALID_DATA', `situação de tarefa desconhecida: ${v}`, 500);
  return f;
}

function asPrioridade(v: string): Prioridade {
  const f = PRIORIDADES_VALIDAS.find((s) => s === v);
  if (f === undefined) throw new AppError('INVALID_DATA', `prioridade desconhecida: ${v}`, 500);
  return f;
}

function asTipoLista(v: string): TipoLista {
  const f = TIPOS_LISTA.find((s) => s === v);
  if (f === undefined) throw new AppError('INVALID_DATA', `tipo de lista desconhecido: ${v}`, 500);
  return f;
}

function asStatusMembro(v: string): StatusMembro | undefined {
  return STATUS_MEMBRO.find((s) => s === v);
}

function exigir(condicao: boolean, code: string, message: string, status: number, ruleId: string): void {
  if (!condicao) throw new AppError(code, message, status, { ruleId });
}

function sessionMemberId(ctx: RequestContext): string {
  const person = ctx.sessionContext.person;
  if (person == null || !person.mdmId) {
    throw new AppError('FORBIDDEN', 'membro da sessão não resolvido pelo login', 403);
  }
  return person.mdmId;
}

function hojeISO(ctx: RequestContext): string {
  const agora = ctx.clock.nowIso();
  const tz = ctx.organization.timezone;
  if (tz) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(agora));
  }
  return agora.slice(0, 10);
}

function novosCaches(): Caches {
  return { membros: new Map(), listas: new Map() };
}

function garantirVisivel(t: TarefaLida, me: string): void {
  // editarSomenteTarefaVisivel: o membro só vê tarefas que criou ou pelas quais é responsável.
  exigir(
    t.criadorId === me || t.responsavelId === me,
    'FORBIDDEN',
    'tarefa não visível ao membro da sessão',
    403,
    'editarSomenteTarefaVisivel',
  );
}

async function lerMembro(id: string, ctx: RequestContext, caches: Caches): Promise<{ name: string; status: string }> {
  const emCache = caches.membros.get(id);
  if (emCache !== undefined) return emCache;
  const m: MembroLido = await getMembroEquipe({ id }, ctx);
  const lido = { name: m.details.identification.name, status: m.details.identification.status };
  caches.membros.set(id, lido);
  return lido;
}

async function membroNome(id: string, ctx: RequestContext, caches: Caches): Promise<MembroNome> {
  const m = await lerMembro(id, ctx, caches);
  const status = asStatusMembro(m.status);
  return {
    details: {
      identification: {
        details: {
          identification: {
            name: m.name,
            ...(status !== undefined ? { status } : {}),
          },
        },
      },
    },
  };
}

async function nomeLista(id: string, ctx: RequestContext, caches: Caches): Promise<string> {
  const emCache = caches.listas.get(id);
  if (emCache !== undefined) return emCache;
  const l = await getLista({ id }, ctx);
  caches.listas.set(id, l.nome);
  return l.nome;
}

async function listarTarefas(filtro: FiltroTarefa, ctx: RequestContext): Promise<TarefaLida[]> {
  const out: TarefaLida[] = [];
  let page = 1;
  for (;;) {
    const r = await listTarefa(
      {
        ...(filtro.criadorId !== undefined ? { criadorId: filtro.criadorId } : {}),
        ...(filtro.responsavelId !== undefined ? { responsavelId: filtro.responsavelId } : {}),
        ...(filtro.status !== undefined ? { status: filtro.status } : {}),
        ...(filtro.tarefaPaiId !== undefined ? { tarefaPaiId: filtro.tarefaPaiId } : {}),
        ...(filtro.chaveCriacao !== undefined ? { chaveCriacao: filtro.chaveCriacao } : {}),
        page,
        pageSize: 200,
      },
      ctx,
    );
    for (const it of r.items) out.push(it);
    if (!r.hasMore) break;
    page += 1;
  }
  return out;
}

async function listarChecklist(tarefaId: string, ctx: RequestContext): Promise<ItemLido[]> {
  const out: ItemLido[] = [];
  let page = 1;
  for (;;) {
    const r = await listItemChecklist({ tarefaId, page, pageSize: 200 }, ctx);
    for (const it of r.items) out.push(it);
    if (!r.hasMore) break;
    page += 1;
  }
  return out.sort((a, b) => a.ordem - b.ordem);
}

async function carregarDerivados(t: TarefaLida, ctx: RequestContext): Promise<Derivados> {
  const checklist = await listarChecklist(t.id, ctx);
  const filhas = await listarTarefas({ tarefaPaiId: t.id }, ctx);
  return { checklist, subtarefas: filhas.length };
}

function progresso(checklist: ItemLido[]): string {
  return `${checklist.filter((i) => i.feito).length}/${checklist.length}`;
}

async function montarResumo(t: TarefaLida, d: Derivados, ctx: RequestContext, caches: Caches): Promise<TarefaResumo> {
  const status = asStatus(t.status);
  const aberta = ABERTAS.includes(status);
  const hoje = hojeISO(ctx);
  const prazoDia = t.prazo.slice(0, 10);
  // venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist são derivados: calculados aqui, nunca lidos do armazenamento.
  const venceHoje = aberta && prazoDia === hoje;
  const atrasada = aberta && prazoDia < hoje;
  return {
    id: t.id,
    version: t.version,
    titulo: t.titulo,
    listaId: t.listaId,
    lista: { nome: await nomeLista(t.listaId, ctx, caches) },
    responsavelId: t.responsavelId,
    responsavel: await membroNome(t.responsavelId, ctx, caches),
    criadorId: t.criadorId,
    criador: await membroNome(t.criadorId, ctx, caches),
    prioridade: asPrioridade(t.prioridade),
    prazo: t.prazo,
    status,
    details: {
      details: {
        quantidadeSubtarefas: d.subtarefas,
        progressoChecklist: progresso(d.checklist),
        venceHoje,
        atrasada,
        ...(t.details.devolvidaEm != null ? { devolvidaEm: t.details.devolvidaEm } : {}),
      },
    },
  };
}

async function montarAberta(t: TarefaLida, d: Derivados, ctx: RequestContext, caches: Caches): Promise<TarefaAberta> {
  const checklist: ItemChecklistLinha[] = d.checklist.map((i) => ({
    id: i.id,
    version: i.version,
    ordem: i.ordem,
    feito: i.feito,
    details: {
      details: {
        descricao: i.details.descricao,
        ...(i.details.marcadoEm != null ? { marcadoEm: i.details.marcadoEm } : {}),
      },
    },
  }));
  return {
    id: t.id,
    version: t.version,
    titulo: t.titulo,
    status: asStatus(t.status),
    prioridade: asPrioridade(t.prioridade),
    prazo: t.prazo,
    listaId: t.listaId,
    lista: { nome: await nomeLista(t.listaId, ctx, caches) },
    criadorId: t.criadorId,
    criador: await membroNome(t.criadorId, ctx, caches),
    responsavelId: t.responsavelId,
    responsavel: await membroNome(t.responsavelId, ctx, caches),
    criadaEm: t.criadaEm,
    details: {
      details: {
        ...(t.details.descricao != null ? { descricao: t.details.descricao } : {}),
        ...(t.details.motivoDevolucao != null ? { motivoDevolucao: t.details.motivoDevolucao } : {}),
        ...(t.details.devolvidaEm != null ? { devolvidaEm: t.details.devolvidaEm } : {}),
        ...(t.details.concluidaEm != null ? { concluidaEm: t.details.concluidaEm } : {}),
        ...(t.details.canceladaEm != null ? { canceladaEm: t.details.canceladaEm } : {}),
        progressoChecklist: progresso(d.checklist),
      },
    },
    checklist,
  };
}

async function montarPar(t: TarefaLida, ctx: RequestContext): Promise<ParTarefa> {
  const caches = novosCaches();
  const d = await carregarDerivados(t, ctx);
  return { tarefa: await montarAberta(t, d, ctx, caches), resumo: await montarResumo(t, d, ctx, caches) };
}

async function garantirListaAtiva(listaId: string, ctx: RequestContext): Promise<void> {
  const lista = await getLista({ id: listaId }, ctx);
  exigir(lista.ativa === true, 'LISTA_INATIVA', 'uma lista inativa não pode receber tarefas', 422, 'listaInativaNaoRecebeTarefa');
}

async function garantirResponsavelAtivo(responsavelId: string, ctx: RequestContext): Promise<void> {
  const m: MembroLido = await getMembroEquipe({ id: responsavelId }, ctx);
  exigir(
    m.details.identification.status === 'Active',
    'RESPONSAVEL_INATIVO',
    'o responsável deve ser um membro ativo da equipe',
    422,
    'responsavelDeveSerMembroAtivo',
  );
}

async function criarItens(tarefaId: string, itens: ItemChecklistEntrada[], ctx: RequestContext): Promise<void> {
  if (itens.length === 0) return;
  const repo = resolveRepository<ItemChecklistRepository>(ctx, 'ItemChecklistRepository');
  for (const e of itens) {
    await repo.create({ tarefaId, ordem: e.ordem, feito: false, details: { descricao: e.details.details.descricao } });
  }
}

async function aplicarChecklist(tarefaId: string, entradas: ItemChecklistEntrada[], ctx: RequestContext): Promise<void> {
  // checklistNaoMudaSituacao: só os itens são gravados; a situação da tarefa não é tocada.
  const atuais = await listarChecklist(tarefaId, ctx);
  const porId = new Map<string, ItemLido>();
  for (const i of atuais) porId.set(i.id, i);
  const mantidos = new Set<string>();
  const novos: ItemChecklistEntrada[] = [];
  for (const e of entradas) {
    const descricao = e.details.details.descricao;
    if (e.id != null) {
      const cur = porId.get(e.id);
      if (cur === undefined) {
        throw new AppError('NOT_FOUND', `item da checklist não encontrado nesta tarefa: ${e.id}`, 404);
      }
      mantidos.add(e.id);
      if (cur.ordem !== e.ordem || cur.details.descricao !== descricao) {
        await updateItemChecklist(
          {
            id: cur.id,
            version: e.version != null ? e.version : cur.version,
            tarefaId,
            ordem: e.ordem,
            feito: cur.feito,
            details: {
              descricao,
              ...(cur.details.marcadoEm != null ? { marcadoEm: cur.details.marcadoEm } : {}),
            },
          },
          ctx,
        );
      }
    } else {
      novos.push(e);
    }
  }
  await criarItens(tarefaId, novos, ctx);
  const removidos = atuais.filter((i) => !mantidos.has(i.id));
  if (removidos.length > 0) {
    const repo = resolveRepository<ItemChecklistRepository>(ctx, 'ItemChecklistRepository');
    for (const r of removidos) await repo.delete(r.id);
  }
}

function normalizar(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

async function transicionar(
  ctx: RequestContext,
  id: string,
  version: number,
  transicao: TransicaoTarefa,
  verificar: (t: TarefaLida, me: string) => void,
  motivoDevolucao?: string,
): Promise<ParTarefa> {
  return ctx.data.moduleData.runInTransaction(async (tx) => {
    const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
    const me = sessionMemberId(bound);
    const atual: TarefaLida = await getTarefa({ id }, bound);
    verificar(atual, me);
    // tarefaEncerradaNaoTransiciona: concluída ou cancelada não muda mais de situação.
    exigir(
      atual.status !== 'concluida' && atual.status !== 'cancelada',
      'TAREFA_ENCERRADA',
      'uma tarefa concluída ou cancelada não muda mais de situação',
      409,
      'tarefaEncerradaNaoTransiciona',
    );
    if (atual.version !== version) {
      throw new AppError('VERSION_CONFLICT', 'a tarefa foi alterada por outra pessoa; recarregue e tente de novo', 409);
    }
    const r = await avancarEtapaTarefa(
      {
        tarefaId: id,
        transicao,
        ...(motivoDevolucao !== undefined ? { motivoDevolucao } : {}),
      },
      bound,
    );
    const depois: TarefaLida = r.tarefa;
    return montarPar(depois, bound);
  });
}

export const requests: { [K in keyof Minhas_tarefasContracts]: (input: Minhas_tarefasContracts[K]['input'], ctx: RequestContext) => Promise<Minhas_tarefasContracts[K]['output']> } = {
  'tarefas.minhas_tarefas.minhasTarefas': async function (input, ctx) {
    const me = sessionMemberId(ctx);
    const page = input.page >= 1 ? Math.floor(input.page) : 1;
    const pageSize = input.pageSize >= 1 ? Math.min(Math.floor(input.pageSize), 200) : 20;
    const st: FiltroTarefa = input.status !== undefined ? { status: input.status } : {};

    // editarSomenteTarefaVisivel: a visão é limitada às tarefas em que o membro é criador ou responsável.
    let candidatas: TarefaLida[];
    if (input.criadasPorMim === true && input.atribuidasAMim === true) {
      candidatas = await listarTarefas({ ...st, criadorId: me, responsavelId: me }, ctx);
    } else if (input.criadasPorMim === true) {
      candidatas = await listarTarefas({ ...st, criadorId: me }, ctx);
    } else if (input.atribuidasAMim === true) {
      candidatas = await listarTarefas({ ...st, responsavelId: me }, ctx);
    } else {
      const criadas = await listarTarefas({ ...st, criadorId: me }, ctx);
      const atribuidas = await listarTarefas({ ...st, responsavelId: me }, ctx);
      const vistos = new Set<string>();
      candidatas = [];
      for (const t of [...criadas, ...atribuidas]) {
        if (vistos.has(t.id)) continue;
        vistos.add(t.id);
        candidatas.push(t);
      }
    }
    if (input.somenteDevolvidas === true) {
      candidatas = candidatas.filter((t) => t.details.devolvidaEm != null && t.status === 'emAndamento');
    }
    candidatas.sort((a, b) => (a.prazo < b.prazo ? -1 : a.prazo > b.prazo ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

    const inicio = (page - 1) * pageSize;
    const pagina = candidatas.slice(inicio, inicio + pageSize);
    const hasMore = inicio + pageSize < candidatas.length;

    const caches = novosCaches();
    const items: TarefaResumo[] = [];
    for (const t of pagina) {
      const d = await carregarDerivados(t, ctx);
      items.push(await montarResumo(t, d, ctx, caches));
    }
    return { tarefas: { items, page, pageSize, hasMore } };
  },

  'tarefas.minhas_tarefas.tarefaAberta': async function (input, ctx) {
    const me = sessionMemberId(ctx);
    const t: TarefaLida = await getTarefa({ id: input.tarefaId }, ctx);
    garantirVisivel(t, me);
    const caches = novosCaches();
    const d = await carregarDerivados(t, ctx);
    return { tarefa: await montarAberta(t, d, ctx, caches) };
  },

  'tarefas.minhas_tarefas.opcoesFormulario': async function (_input, ctx) {
    // listaInativaNaoRecebeTarefa: só listas ativas são oferecidas.
    const todas: ListaOpcao[] = [];
    let page = 1;
    for (;;) {
      const r = await listLista({ ativa: true, page, pageSize: 200 }, ctx);
      for (const l of r.items) {
        if (l.ativa !== true) continue;
        todas.push({
          tarefa: { listaId: l.id },
          nome: l.nome,
          ativa: l.ativa,
          details: { details: { tipo: asTipoLista(l.details.tipo) } },
        });
      }
      if (!r.hasMore) break;
      page += 1;
    }
    todas.sort((a, b) => a.nome.localeCompare(b.nome));
    return { listas: todas };
  },

  'tarefas.minhas_tarefas.buscarResponsaveis': async function (input, ctx) {
    const termo = normalizar(input.termo.trim());
    const limite = 10;
    const membros: MembroOpcao[] = [];
    let page = 1;
    for (;;) {
      const r = await listMembroEquipe({ details: { identification: { status: 'Active' } }, page, pageSize: 200 }, ctx);
      for (const item of r.items) {
        const m: MembroLido = item;
        // responsavelDeveSerMembroAtivo: só membros com situação Active são devolvidos.
        if (m.details.identification.status !== 'Active') continue;
        if (!normalizar(m.details.identification.name).includes(termo)) continue;
        membros.push({
          responsavelId: m.id,
          details: {
            identification: {
              details: {
                identification: { name: m.details.identification.name, status: 'Active' },
              },
            },
          },
        });
      }
      if (!r.hasMore) break;
      page += 1;
    }
    membros.sort((a, b) =>
      a.details.identification.details.identification.name.localeCompare(b.details.identification.details.identification.name),
    );
    return { membros: membros.slice(0, limite) };
  },

  'tarefas.minhas_tarefas.salvarNovaTarefa': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const me = sessionMemberId(bound);
      if (input.criadorId !== me) {
        throw new AppError('FORBIDDEN', 'criadorId deve ser o membro da sessão', 403);
      }

      // criacaoIdempotente: chave já usada devolve a tarefa existente, sem duplicar tarefa, checklist nem mensagem.
      const existentes = await listarTarefas({ chaveCriacao: input.chaveCriacao }, bound);
      if (existentes.length > 0) {
        return montarPar(existentes[0], bound);
      }

      await garantirListaAtiva(input.listaId, bound);
      await garantirResponsavelAtivo(input.responsavelId, bound);

      const abrir: AbrirOcorrenciaTarefaInput = {
        titulo: input.titulo,
        prioridade: input.prioridade,
        prazo: input.prazo,
        listaId: input.listaId,
        responsavelId: input.responsavelId,
        chaveCriacao: input.chaveCriacao,
        ...(input.details.descricao != null ? { details: { descricao: input.details.descricao } } : {}),
      };
      const aberta = await abrirOcorrenciaTarefa(abrir, bound);
      const criada: TarefaLida = aberta.tarefa;

      if (input.checklist !== undefined) {
        await criarItens(criada.id, input.checklist, bound);
      }
      return montarPar(criada, bound);
    });
  },

  'tarefas.minhas_tarefas.salvarEdicaoTarefa': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const me = sessionMemberId(bound);
      const atual: TarefaLida = await getTarefa({ id: input.id }, bound);
      garantirVisivel(atual, me);
      if (atual.version !== input.version) {
        throw new AppError('VERSION_CONFLICT', 'a tarefa foi alterada por outra pessoa; recarregue e tente de novo', 409);
      }

      const mudouResponsavel = input.responsavelId !== atual.responsavelId;
      if (mudouResponsavel) {
        exigir(
          me === atual.criadorId,
          'FORBIDDEN',
          'somente quem criou a tarefa pode trocar o responsável',
          403,
          'reatribuicaoPorCriadorOuGestor',
        );
        await garantirResponsavelAtivo(input.responsavelId, bound);
      }
      if (input.listaId !== atual.listaId) {
        await garantirListaAtiva(input.listaId, bound);
      }

      // edicaoNaoMudaSituacao: o status enviado ao usecase é sempre o atual.
      const detalhes: UpdateTarefaInput['details'] = {
        ...(input.details.descricao != null ? { descricao: input.details.descricao } : {}),
        ...(atual.details.motivoDevolucao != null ? { motivoDevolucao: atual.details.motivoDevolucao } : {}),
        ...(atual.details.devolvidaEm != null ? { devolvidaEm: atual.details.devolvidaEm } : {}),
        ...(atual.details.concluidaEm != null ? { concluidaEm: atual.details.concluidaEm } : {}),
        ...(atual.details.canceladaEm != null ? { canceladaEm: atual.details.canceladaEm } : {}),
      };
      const atualizacao: UpdateTarefaInput = {
        id: atual.id,
        version: input.version,
        titulo: input.titulo,
        status: atual.status,
        prioridade: input.prioridade,
        prazo: input.prazo,
        listaId: input.listaId,
        responsavelId: atual.responsavelId,
        criadorId: atual.criadorId,
        chaveCriacao: atual.chaveCriacao,
        ...(atual.tarefaPaiId != null ? { tarefaPaiId: atual.tarefaPaiId } : {}),
        details: detalhes,
      };
      await updateTarefa(atualizacao, bound);

      if (input.checklist !== undefined) {
        await aplicarChecklist(atual.id, input.checklist, bound);
      }
      if (mudouResponsavel) {
        await reatribuirQuemAge({ tarefaId: atual.id, novoResponsavelId: input.responsavelId }, bound);
      }

      const fresca: TarefaLida = await getTarefa({ id: atual.id }, bound);
      return montarPar(fresca, bound);
    });
  },

  'tarefas.minhas_tarefas.iniciarTarefa': async function (input, ctx) {
    return transicionar(ctx, input.id, input.version, 'iniciar', (t, me) => {
      exigir(
        t.responsavelId === me,
        'FORBIDDEN',
        'somente o responsável pode iniciar a tarefa',
        403,
        'somenteResponsavelExecuta',
      );
    });
  },

  'tarefas.minhas_tarefas.marcarItemChecklist': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const me = sessionMemberId(bound);
      const achados = await listItemChecklist({ id: input.id, page: 1, pageSize: 1 }, bound);
      if (achados.items.length === 0) {
        throw new AppError('NOT_FOUND', `item da checklist não encontrado: ${input.id}`, 404);
      }
      const item: ItemLido = achados.items[0];
      const tarefa: TarefaLida = await getTarefa({ id: item.tarefaId }, bound);
      garantirVisivel(tarefa, me);
      if (item.version !== input.version) {
        throw new AppError('VERSION_CONFLICT', 'o item foi alterado por outra pessoa; recarregue e tente de novo', 409);
      }
      // checklistNaoMudaSituacao: só o item é gravado; a situação da tarefa não é tocada.
      await updateItemChecklist(
        {
          id: item.id,
          version: input.version,
          tarefaId: item.tarefaId,
          ordem: item.ordem,
          feito: input.feito,
          details: {
            descricao: item.details.descricao,
            ...(input.feito ? { marcadoEm: bound.clock.nowIso() } : {}),
          },
        },
        bound,
      );
      const fresca: TarefaLida = await getTarefa({ id: item.tarefaId }, bound);
      return montarPar(fresca, bound);
    });
  },

  'tarefas.minhas_tarefas.enviarParaRevisao': async function (input, ctx) {
    return transicionar(ctx, input.id, input.version, 'enviarParaRevisao', (t, me) => {
      exigir(
        t.responsavelId === me,
        'FORBIDDEN',
        'somente o responsável pode enviar a tarefa para revisão',
        403,
        'somenteResponsavelExecuta',
      );
    });
  },

  'tarefas.minhas_tarefas.aceitarEntrega': async function (input, ctx) {
    return transicionar(ctx, input.id, input.version, 'aceitar', (t, me) => {
      exigir(
        t.criadorId === me,
        'FORBIDDEN',
        'somente quem criou a tarefa pode aceitá-la',
        403,
        'somenteCriadorRevisa',
      );
    });
  },

  'tarefas.minhas_tarefas.devolverComMotivo': async function (input, ctx) {
    const motivo = input.details.motivoDevolucao;
    return transicionar(
      ctx,
      input.id,
      input.version,
      'devolver',
      (t, me) => {
        exigir(
          t.criadorId === me,
          'FORBIDDEN',
          'somente quem criou a tarefa pode devolvê-la',
          403,
          'somenteCriadorRevisa',
        );
        exigir(
          typeof motivo === 'string' && motivo.trim().length > 0,
          'MOTIVO_OBRIGATORIO',
          'informe o motivo da devolução',
          422,
          'devolucaoExigeMotivo',
        );
      },
      motivo,
    );
  },

  'tarefas.minhas_tarefas.cancelarTarefa': async function (input, ctx) {
    return transicionar(ctx, input.id, input.version, 'cancelar', (t, me) => {
      exigir(
        t.criadorId === me,
        'FORBIDDEN',
        'somente quem criou a tarefa pode cancelá-la',
        403,
        'cancelamentoPorCriadorOuGestor',
      );
    });
  },
};
