/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/inicio_gestor.ts" enhancement="_blank"/>
import type { Inicio_gestorContracts, TarefaAcao, ListaAbertas } from '/_102047_/l2/tarefas/web/contracts/inicio_gestor.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import type { ListTarefaOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import { listLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { listItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';

type TarefaRec = ListTarefaOutput['items'][number];

const OPEN_STATUSES = ['aFazer', 'emAndamento', 'emRevisao'] as const;
const MAX_PAGE_SIZE = 200;

function todayOf(ctx: RequestContext): string {
  return ctx.clock.nowIso().slice(0, 10);
}

function dayOf(prazo: string): string {
  return prazo.slice(0, 10);
}

function toStatus(value: string): TarefaAcao['status'] {
  if (value === 'aFazer' || value === 'emAndamento' || value === 'emRevisao' || value === 'concluida' || value === 'cancelada') return value;
  throw new AppError('INVALID_DATA', 'unsupported Tarefa.status: ' + value, 500);
}

function toPrioridade(value: string): TarefaAcao['prioridade'] {
  if (value === 'low' || value === 'medium' || value === 'high') return value;
  throw new AppError('INVALID_DATA', 'unsupported Tarefa.prioridade: ' + value, 500);
}

function prioridadeRank(value: string): number {
  if (value === 'high') return 3;
  if (value === 'medium') return 2;
  return 1;
}

async function listOpenTarefas(ctx: RequestContext): Promise<TarefaRec[]> {
  const all: TarefaRec[] = [];
  for (const status of OPEN_STATUSES) {
    let page = 1;
    for (;;) {
      const res = await listTarefa({ status, page, pageSize: MAX_PAGE_SIZE }, ctx);
      for (const t of res.items) all.push(t);
      if (!res.hasMore) break;
      page += 1;
    }
  }
  return all;
}

async function checklistCounts(ctx: RequestContext, tarefaIds: Set<string>): Promise<Map<string, { feitos: number; total: number }>> {
  const counts = new Map<string, { feitos: number; total: number }>();
  if (tarefaIds.size === 0) return counts;
  let page = 1;
  for (;;) {
    const res = await listItemChecklist({ page, pageSize: MAX_PAGE_SIZE }, ctx);
    for (const item of res.items) {
      if (!tarefaIds.has(item.tarefaId)) continue;
      const cur = counts.get(item.tarefaId) ?? { feitos: 0, total: 0 };
      cur.total += 1;
      if (item.feito === true) cur.feitos += 1;
      counts.set(item.tarefaId, cur);
    }
    if (!res.hasMore) break;
    page += 1;
  }
  return counts;
}

export const requests: { [K in keyof Inicio_gestorContracts]: (input: Inicio_gestorContracts[K]['input'], ctx: RequestContext) => Promise<Inicio_gestorContracts[K]['output']> } = {
  "tarefas.inicio_gestor.qryPanoramaEquipe": async function (input, ctx) {
    const hoje = todayOf(ctx);
    const abertas = await listOpenTarefas(ctx);

    // derived indicators (aberta, venceHoje, atrasada) calculated here, never stored
    let vencemHoje = 0;
    let atrasadas = 0;
    const openIds = new Set<string>();
    const abertasPorLista = new Map<string, number>();
    for (const t of abertas) {
      openIds.add(t.id);
      const prazo = dayOf(t.prazo);
      if (prazo === hoje) vencemHoje += 1;
      else if (prazo < hoje) atrasadas += 1;
      abertasPorLista.set(t.listaId, (abertasPorLista.get(t.listaId) ?? 0) + 1);
    }

    const counts = await checklistCounts(ctx, openIds);
    let feitos = 0;
    let total = 0;
    for (const c of counts.values()) {
      feitos += c.feitos;
      total += c.total;
    }

    const listasAtivas: ListaAbertas[] = [];
    let page = 1;
    for (;;) {
      const res = await listLista({ ativa: true, page, pageSize: MAX_PAGE_SIZE }, ctx);
      for (const l of res.items) {
        listasAtivas.push({
          id: l.id,
          nome: l.nome,
          details: { details: { quantidadeTarefasAbertas: abertasPorLista.get(l.id) ?? 0 } },
        });
      }
      if (!res.hasMore) break;
      page += 1;
    }
    listasAtivas.sort((a, b) => a.nome.localeCompare(b.nome));

    return {
      totais: {
        abertas: abertas.length,
        vencemHoje,
        atrasadas,
        itensChecklistFeitos: feitos,
        itensChecklistTotal: total,
        progressoChecklist: feitos + '/' + total,
      },
      listas: listasAtivas,
    };
  },

  "tarefas.inicio_gestor.qryTarefasPedemAcao": async function (input, ctx) {
    const hoje = todayOf(ctx);
    const pageRaw = Number(input.page);
    const sizeRaw = Number(input.pageSize);
    const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.floor(pageRaw) : 1;
    const pageSize = Number.isFinite(sizeRaw) && sizeRaw >= 1 ? Math.min(Math.floor(sizeRaw), MAX_PAGE_SIZE) : 20;

    const abertas = await listOpenTarefas(ctx);
    const pedemAcao = abertas.filter((t) => dayOf(t.prazo) <= hoje);

    // atrasadas first, prazo ascending, prioridade descending
    pedemAcao.sort((a, b) => {
      const pa = dayOf(a.prazo);
      const pb = dayOf(b.prazo);
      const atrasadaA = pa < hoje ? 0 : 1;
      const atrasadaB = pb < hoje ? 0 : 1;
      if (atrasadaA !== atrasadaB) return atrasadaA - atrasadaB;
      if (pa !== pb) return pa < pb ? -1 : 1;
      return prioridadeRank(b.prioridade) - prioridadeRank(a.prioridade);
    });

    const start = (page - 1) * pageSize;
    const pageRecords = pedemAcao.slice(start, start + pageSize);
    const hasMore = start + pageSize < pedemAcao.length;

    const tarefaIds = new Set<string>(pageRecords.map((t) => t.id));
    const counts = await checklistCounts(ctx, tarefaIds);

    // batch load of lista names and member names
    const listaIds = Array.from(new Set<string>(pageRecords.map((t) => t.listaId)));
    const membroIds = Array.from(new Set<string>(pageRecords.map((t) => t.responsavelId)));
    const listaNomes = new Map<string, string>();
    const membroNomes = new Map<string, string>();
    await Promise.all(listaIds.map(async (id) => {
      const lista = await getLista({ id }, ctx);
      listaNomes.set(id, lista.nome);
    }));
    await Promise.all(membroIds.map(async (id) => {
      const membro = await getMembroEquipe({ id }, ctx);
      membroNomes.set(id, membro.details.identification.name);
    }));

    const items: TarefaAcao[] = pageRecords.map((t) => {
      const prazo = dayOf(t.prazo);
      const c = counts.get(t.id) ?? { feitos: 0, total: 0 };
      return {
        id: t.id,
        titulo: t.titulo,
        status: toStatus(t.status),
        prioridade: toPrioridade(t.prioridade),
        prazo: t.prazo,
        listaId: t.listaId,
        responsavelId: t.responsavelId,
        details: {
          details: {
            aberta: true,
            venceHoje: prazo === hoje,
            atrasada: prazo < hoje,
            progressoChecklist: c.feitos + '/' + c.total,
          },
        },
        lista: { nome: listaNomes.get(t.listaId) ?? '' },
        membroEquipe: {
          details: {
            identification: {
              details: { identification: { name: membroNomes.get(t.responsavelId) ?? '' } },
            },
          },
        },
      };
    });

    return { tarefas: { items, page, pageSize, hasMore } };
  },
};
