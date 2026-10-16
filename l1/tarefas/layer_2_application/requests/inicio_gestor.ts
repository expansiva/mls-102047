/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/inicio_gestor.ts" enhancement="_blank"/>

import type { Inicio_gestorContracts } from '/_102047_/l2/tarefas/web/contracts/inicio_gestor.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import type { ListTarefaOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import { listLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { listItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';

type TarefaRec = ListTarefaOutput['items'][number];
type TarefaAcaoItem = Inicio_gestorContracts['tarefas.inicio_gestor.qryTarefasPedemAcao']['output']['tarefas']['items'][number];

const STATUS_ABERTOS = ['aFazer', 'emAndamento', 'emRevisao'];
const PAGE_LIMIT = 200;

function hoje(ctx: RequestContext): string {
  return ctx.clock.nowIso().slice(0, 10);
}

function dia(prazo: string): string {
  return prazo.slice(0, 10);
}

async function listarTodas<T>(fetchPage: (page: number) => Promise<{ items: T[]; hasMore: boolean }>): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  for (;;) {
    const res = await fetchPage(page);
    for (const it of res.items) all.push(it);
    if (!res.hasMore || res.items.length === 0) break;
    page += 1;
  }
  return all;
}

async function tarefasAbertas(ctx: RequestContext): Promise<TarefaRec[]> {
  const all: TarefaRec[] = [];
  for (const status of STATUS_ABERTOS) {
    const part = await listarTodas<TarefaRec>((page) => listTarefa({ status, page, pageSize: PAGE_LIMIT }, ctx));
    for (const t of part) all.push(t);
  }
  return all;
}

async function contarChecklist(tarefaId: string, ctx: RequestContext): Promise<{ feitos: number; total: number }> {
  const itens = await listarTodas((page) => listItemChecklist({ tarefaId, page, pageSize: PAGE_LIMIT }, ctx));
  let feitos = 0;
  for (const it of itens) {
    if (it.feito === true) feitos += 1;
  }
  return { feitos, total: itens.length };
}

function toStatus(value: string): TarefaAcaoItem['status'] {
  switch (value) {
    case 'aFazer':
    case 'emAndamento':
    case 'emRevisao':
    case 'concluida':
    case 'cancelada':
      return value;
    default:
      throw new AppError('INVALID_DATA', `status de tarefa desconhecido: ${value}`, 500);
  }
}

function toPrioridade(value: string): TarefaAcaoItem['prioridade'] {
  switch (value) {
    case 'low':
    case 'medium':
    case 'high':
      return value;
    default:
      throw new AppError('INVALID_DATA', `prioridade de tarefa desconhecida: ${value}`, 500);
  }
}

function pesoPrioridade(value: string): number {
  if (value === 'high') return 3;
  if (value === 'medium') return 2;
  return 1;
}

export const requests: { [K in keyof Inicio_gestorContracts]: (input: Inicio_gestorContracts[K]['input'], ctx: RequestContext) => Promise<Inicio_gestorContracts[K]['output']> } = {
  "tarefas.inicio_gestor.qryPanoramaEquipe": async function (_input, ctx) {
    const dataHoje = hoje(ctx);
    const abertas = await tarefasAbertas(ctx);

    let vencemHoje = 0;
    let atrasadas = 0;
    let itensFeitos = 0;
    let itensTotal = 0;
    const abertasPorLista = new Map<string, number>();

    for (const t of abertas) {
      const prazo = dia(t.prazo);
      if (prazo === dataHoje) vencemHoje += 1; // derived venceHoje: aberta e prazo = hoje
      if (prazo < dataHoje) atrasadas += 1; // derived atrasada: aberta e prazo < hoje
      abertasPorLista.set(t.listaId, (abertasPorLista.get(t.listaId) ?? 0) + 1);
      const c = await contarChecklist(t.id, ctx);
      itensFeitos += c.feitos;
      itensTotal += c.total;
    }

    const listasAtivas = await listarTodas((page) => listLista({ ativa: true, page, pageSize: PAGE_LIMIT }, ctx));
    const ordenadas = [...listasAtivas].sort((a, b) => a.nome.localeCompare(b.nome));

    return {
      totais: {
        abertas: abertas.length,
        vencemHoje,
        atrasadas,
        itensChecklistFeitos: itensFeitos,
        itensChecklistTotal: itensTotal,
        progressoChecklist: `${itensFeitos}/${itensTotal}`,
      },
      listas: ordenadas.map((l) => ({
        id: l.id,
        nome: l.nome,
        details: { details: { quantidadeTarefasAbertas: abertasPorLista.get(l.id) ?? 0 } },
      })),
    };
  },

  "tarefas.inicio_gestor.qryTarefasPedemAcao": async function (input, ctx) {
    const dataHoje = hoje(ctx);
    const page = Number.isFinite(Number(input.page)) && Number(input.page) >= 1 ? Math.floor(Number(input.page)) : 1;
    const rawSize = Number(input.pageSize);
    const pageSize = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(Math.floor(rawSize), PAGE_LIMIT) : 20;

    const abertas = await tarefasAbertas(ctx);
    const pedemAcao = abertas.filter((t) => dia(t.prazo) <= dataHoje);
    // atrasadas primeiro (prazo anterior a hoje), prazo crescente, prioridade decrescente
    pedemAcao.sort((a, b) => {
      const pa = dia(a.prazo);
      const pb = dia(b.prazo);
      if (pa !== pb) return pa < pb ? -1 : 1;
      return pesoPrioridade(String(b.prioridade)) - pesoPrioridade(String(a.prioridade));
    });

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pagina = pedemAcao.slice(start, end);
    const hasMore = end < pedemAcao.length;

    // carregados em lote: um acesso por lista e por responsável distintos
    const nomesLista = new Map<string, string>();
    const nomesMembro = new Map<string, string>();
    for (const t of pagina) {
      if (!nomesLista.has(t.listaId)) {
        const lista = await getLista({ id: t.listaId }, ctx);
        nomesLista.set(t.listaId, lista.nome);
      }
      if (!nomesMembro.has(t.responsavelId)) {
        const membro = await getMembroEquipe({ id: t.responsavelId }, ctx);
        nomesMembro.set(t.responsavelId, membro.details.identification.name);
      }
    }

    const items: TarefaAcaoItem[] = [];
    for (const t of pagina) {
      const prazo = dia(t.prazo);
      const c = await contarChecklist(t.id, ctx);
      const nomeLista = nomesLista.get(t.listaId);
      const nomeMembro = nomesMembro.get(t.responsavelId);
      if (nomeLista === undefined) {
        throw new AppError('NOT_FOUND', `Lista ${t.listaId} da tarefa ${t.id} não encontrada`, 404);
      }
      if (nomeMembro === undefined) {
        throw new AppError('NOT_FOUND', `Responsável ${t.responsavelId} da tarefa ${t.id} não encontrado`, 404);
      }
      items.push({
        id: t.id,
        titulo: t.titulo,
        status: toStatus(String(t.status)),
        prioridade: toPrioridade(String(t.prioridade)),
        prazo: t.prazo,
        listaId: t.listaId,
        responsavelId: t.responsavelId,
        details: {
          details: {
            aberta: true,
            venceHoje: prazo === dataHoje,
            atrasada: prazo < dataHoje,
            progressoChecklist: `${c.feitos}/${c.total}`,
          },
        },
        lista: { nome: nomeLista },
        membroEquipe: { details: { identification: { details: { identification: { name: nomeMembro } } } } },
      });
    }

    return { tarefas: { items, page, pageSize, hasMore } };
  },
};
