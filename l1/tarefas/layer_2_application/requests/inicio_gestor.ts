/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/inicio_gestor.ts" enhancement="_blank"/>

import type { Inicio_gestorContracts } from '/_102047_/l2/tarefas/web/contracts/inicio_gestor.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import type { ListTarefaOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import { listLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import type { ListListaOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import { listItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';
import type { ListItemChecklistOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';

type TarefaRec = ListTarefaOutput['items'][number];
type ListaRec = ListListaOutput['items'][number];
type ItemRec = ListItemChecklistOutput['items'][number];
type TarefaAcao = Inicio_gestorContracts['tarefas.inicio_gestor.listarTarefasParaAcao']['output']['tarefas']['items'][number];

const MAX_PAGE_SIZE = 200;
const DEFAULT_PAGE_SIZE = 20;

/** Today as YYYY-MM-DD, in the organization timezone when it has one. */
function todayOf(ctx: RequestContext): string {
  const nowIso = ctx.clock.nowIso();
  const tz = ctx.organization.timezone;
  if (tz) {
    return new Date(nowIso).toLocaleDateString('en-CA', { timeZone: tz });
  }
  return nowIso.slice(0, 10);
}

/** Reads every page of a paginated usecase list. */
async function fetchAll<T>(read: (page: number, pageSize: number) => Promise<{ items: T[]; hasMore: boolean }>): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  for (;;) {
    const res = await read(page, MAX_PAGE_SIZE);
    for (const it of res.items) all.push(it);
    if (!res.hasMore) break;
    page += 1;
  }
  return all;
}

// Tarefa.details.aberta (derived): a fazer, em andamento ou em revisão.
function isAberta(t: TarefaRec): boolean {
  const s = String(t.status);
  return s === 'aFazer' || s === 'emAndamento' || s === 'emRevisao';
}

// Tarefa.details.venceHoje (derived): aberta com prazo hoje.
function isVenceHoje(t: TarefaRec, today: string): boolean {
  return isAberta(t) && String(t.prazo).slice(0, 10) === today;
}

// Tarefa.details.atrasada (derived): aberta com prazo anterior a hoje.
function isAtrasada(t: TarefaRec, today: string): boolean {
  return isAberta(t) && String(t.prazo).slice(0, 10) < today;
}

function toStatus(value: string): TarefaAcao['status'] {
  if (value === 'aFazer' || value === 'emAndamento' || value === 'emRevisao' || value === 'concluida' || value === 'cancelada') {
    return value;
  }
  throw new AppError('INVALID_DATA', `unsupported task status: ${value}`, 500);
}

function toPrioridade(value: string): TarefaAcao['prioridade'] {
  if (value === 'low' || value === 'medium' || value === 'high') return value;
  throw new AppError('INVALID_DATA', `unsupported task priority: ${value}`, 500);
}

function prioridadeRank(value: string): number {
  if (value === 'high') return 3;
  if (value === 'medium') return 2;
  return 1;
}

function countItems(items: ItemRec[]): { feitos: number; total: number } {
  let feitos = 0;
  for (const it of items) if (it.feito) feitos += 1;
  return { feitos, total: items.length };
}

export const requests: { [K in keyof Inicio_gestorContracts]: (input: Inicio_gestorContracts[K]['input'], ctx: RequestContext) => Promise<Inicio_gestorContracts[K]['output']> } = {
  "tarefas.inicio_gestor.obterPanoramaEquipe": async function (input, ctx) {
    const today = todayOf(ctx);
    const tarefas = await fetchAll<TarefaRec>((page, pageSize) => listTarefa({ page, pageSize }, ctx));
    const abertas = tarefas.filter((t) => isAberta(t));

    const totalAbertas = abertas.length;
    const totalVenceHoje = abertas.filter((t) => isVenceHoje(t, today)).length;
    const totalAtrasadas = abertas.filter((t) => isAtrasada(t, today)).length;

    // Progress over the checklists of the open tasks: done items / total items.
    const abertasIds = new Set<string>(abertas.map((t) => String(t.id)));
    const itens = await fetchAll<ItemRec>((page, pageSize) => listItemChecklist({ page, pageSize }, ctx));
    const itensAbertas = itens.filter((it) => abertasIds.has(String(it.tarefaId)));
    const soma = countItems(itensAbertas);

    // Lista.details.quantidadeTarefasAbertas (derived): open tasks with that listaId.
    const abertasPorLista = new Map<string, number>();
    for (const t of abertas) {
      const k = String(t.listaId);
      abertasPorLista.set(k, (abertasPorLista.get(k) ?? 0) + 1);
    }
    const listasRec = await fetchAll<ListaRec>((page, pageSize) => listLista({ page, pageSize }, ctx));
    const ordenadas = [...listasRec].sort((a, b) => String(a.nome).localeCompare(String(b.nome), 'pt-BR', { sensitivity: 'base' }));

    return {
      totalAbertas,
      totalVenceHoje,
      totalAtrasadas,
      progressoChecklist: `${soma.feitos}/${soma.total}`,
      listas: ordenadas.map((l) => ({
        id: String(l.id),
        nome: String(l.nome),
        details: { quantidadeTarefasAbertas: abertasPorLista.get(String(l.id)) ?? 0 },
      })),
    };
  },

  "tarefas.inicio_gestor.listarTarefasParaAcao": async function (input, ctx) {
    const today = todayOf(ctx);
    const page = input.page >= 1 ? Math.floor(input.page) : 1;
    const pageSize = input.pageSize >= 1 ? Math.min(Math.floor(input.pageSize), MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE;

    const tarefas = await fetchAll<TarefaRec>((p, ps) => listTarefa({ page: p, pageSize: ps }, ctx));
    const candidatas = tarefas.filter((t) => isAberta(t) && (isAtrasada(t, today) || isVenceHoje(t, today)));

    // Atrasadas first, then vencem hoje; within each group prazo asc, prioridade desc.
    const ordenadas = [...candidatas].sort((a, b) => {
      const ga = isAtrasada(a, today) ? 0 : 1;
      const gb = isAtrasada(b, today) ? 0 : 1;
      if (ga !== gb) return ga - gb;
      const pa = String(a.prazo).slice(0, 10);
      const pb = String(b.prazo).slice(0, 10);
      if (pa !== pb) return pa < pb ? -1 : 1;
      return prioridadeRank(String(b.prioridade)) - prioridadeRank(String(a.prioridade));
    });

    const start = (page - 1) * pageSize;
    const pagina = ordenadas.slice(start, start + pageSize);
    const hasMore = ordenadas.length > start + pageSize;

    const listaNomes = new Map<string, string>();
    const membroNomes = new Map<string, string>();
    const resultado: TarefaAcao[] = [];

    for (const t of pagina) {
      const listaId = String(t.listaId);
      const responsavelId = String(t.responsavelId);

      let listaNome = listaNomes.get(listaId);
      if (listaNome === undefined) {
        const lista = await getLista({ id: listaId }, ctx);
        listaNome = String(lista.nome);
        listaNomes.set(listaId, listaNome);
      }

      let membroNome = membroNomes.get(responsavelId);
      if (membroNome === undefined) {
        const membro = await getMembroEquipe({ id: responsavelId }, ctx);
        membroNome = String(membro.details.identification.name);
        membroNomes.set(responsavelId, membroNome);
      }

      const itens = await fetchAll<ItemRec>((p, ps) => listItemChecklist({ tarefaId: String(t.id), page: p, pageSize: ps }, ctx));
      const c = countItems(itens);

      resultado.push({
        id: String(t.id),
        titulo: String(t.titulo),
        status: toStatus(String(t.status)),
        prioridade: toPrioridade(String(t.prioridade)),
        prazo: String(t.prazo),
        listaId,
        responsavelId,
        details: {
          aberta: isAberta(t),
          venceHoje: isVenceHoje(t, today),
          atrasada: isAtrasada(t, today),
          progressoChecklist: `${c.feitos}/${c.total}`,
        },
        lista: { nome: listaNome },
        membroEquipe: { details: { identification: { name: membroNome } } },
      });
    }

    return { tarefas: { items: resultado, page, pageSize, hasMore } };
  },
};
