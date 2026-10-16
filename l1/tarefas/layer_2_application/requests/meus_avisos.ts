/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/meus_avisos.ts" enhancement="_blank"/>
import type { Meus_avisosContracts, AvisoResumo, AvisoDetalhe, TarefaAviso, TarefaResumo } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listAvisoVencimento } from '/_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.js';
import { getAvisoVencimento } from '/_102047_/l1/tarefas/layer_2_application/usecases/getAvisoVencimento.js';
import { getTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.js';

interface AvisoRegistro {
  id: string;
  dataReferencia: string;
  status: string;
  details: {
    geradoEm: string;
    finalizadoEm?: string | null;
    motivoFalha?: string | null;
    tarefas?: { tarefaId: string; prazo: string; situacaoPrazo: string }[];
  };
}

type AvisoStatus = AvisoResumo['status'];
type TarefaStatus = TarefaResumo['status'];
type SituacaoPrazo = TarefaAviso['details']['tarefas']['situacaoPrazo'];

function sessionActorId(ctx: RequestContext): string {
  const actorId = ctx.sessionContext.actorId;
  if (actorId == null || actorId === '') {
    throw new AppError('FORBIDDEN', 'session has no member (actorId) to own the avisos', 403);
  }
  return actorId;
}

function toAvisoStatus(value: string): AvisoStatus {
  if (value === 'pending' || value === 'completed' || value === 'failed') return value;
  throw new AppError('INVALID_DATA', 'unsupported aviso status: ' + value, 500);
}

function toTarefaStatus(value: string): TarefaStatus {
  if (value === 'aFazer' || value === 'emAndamento' || value === 'emRevisao' || value === 'concluida' || value === 'cancelada') return value;
  throw new AppError('INVALID_DATA', 'unsupported tarefa status: ' + value, 500);
}

function toSituacaoPrazo(value: string): SituacaoPrazo {
  if (value === 'dueToday' || value === 'overdue') return value;
  throw new AppError('INVALID_DATA', 'unsupported situacaoPrazo: ' + value, 500);
}

function linhasDe(aviso: AvisoRegistro): { tarefaId: string; prazo: string; situacaoPrazo: SituacaoPrazo }[] {
  const linhas = aviso.details.tarefas;
  if (linhas == null) return [];
  return linhas.map((l) => ({ tarefaId: l.tarefaId, prazo: l.prazo, situacaoPrazo: toSituacaoPrazo(l.situacaoPrazo) }));
}

// Totals are calculated from the rows (derived fields), never read from storage.
function totais(aviso: AvisoRegistro): { quantidadeTarefas: number; quantidadeAtrasadas: number } {
  const linhas = linhasDe(aviso);
  return {
    quantidadeTarefas: linhas.length,
    quantidadeAtrasadas: linhas.filter((l) => l.situacaoPrazo === 'overdue').length,
  };
}

function toResumo(aviso: AvisoRegistro): AvisoResumo {
  const t = totais(aviso);
  const inner: AvisoResumo['details']['details'] = {
    quantidadeTarefas: t.quantidadeTarefas,
    quantidadeAtrasadas: t.quantidadeAtrasadas,
    geradoEm: aviso.details.geradoEm,
  };
  const out: { -readonly [K in keyof typeof inner]: (typeof inner)[K] } = { ...inner };
  if (aviso.details.finalizadoEm != null) out.finalizadoEm = aviso.details.finalizadoEm;
  if (aviso.details.motivoFalha != null) out.motivoFalha = aviso.details.motivoFalha;
  return {
    id: aviso.id,
    dataReferencia: aviso.dataReferencia,
    status: toAvisoStatus(aviso.status),
    details: { details: out },
  };
}

async function toDetalhe(aviso: AvisoRegistro, ctx: RequestContext): Promise<AvisoDetalhe> {
  const linhas = linhasDe(aviso);
  const tarefas: TarefaAviso[] = [];
  for (const linha of linhas) {
    const tarefa = await getTarefa({ id: linha.tarefaId }, ctx);
    tarefas.push({
      details: { tarefas: { tarefaId: linha.tarefaId, prazo: linha.prazo, situacaoPrazo: linha.situacaoPrazo } },
      tarefa: {
        id: tarefa.id,
        titulo: tarefa.titulo,
        status: toTarefaStatus(tarefa.status),
        prazo: tarefa.prazo,
      },
    });
  }
  const t = totais(aviso);
  return {
    id: aviso.id,
    dataReferencia: aviso.dataReferencia,
    status: toAvisoStatus(aviso.status),
    details: {
      details: { quantidadeTarefas: t.quantidadeTarefas, quantidadeAtrasadas: t.quantidadeAtrasadas },
      tarefas,
    },
  };
}

export const requests: { [K in keyof Meus_avisosContracts]: (input: Meus_avisosContracts[K]['input'], ctx: RequestContext) => Promise<Meus_avisosContracts[K]['output']> } = {
  'tarefas.meus_avisos.carregarMeusAvisos': async function (input, ctx) {
    // own scope: the avisos are the ones of the session member, never of the screen
    const responsavelId = sessionActorId(ctx);
    const page = input.page >= 1 ? Math.floor(input.page) : 1;
    const pageSize = input.pageSize >= 1 ? Math.min(Math.floor(input.pageSize), 200) : 20;

    const todos: AvisoRegistro[] = [];
    let cursor = 1;
    for (;;) {
      const r = await listAvisoVencimento({ responsavelId, page: cursor, pageSize: 200 }, ctx);
      todos.push(...r.items);
      if (!r.hasMore) break;
      cursor += 1;
    }
    // dataReferencia descending: today's aviso (the latest) comes first
    todos.sort((a, b) => (a.dataReferencia < b.dataReferencia ? 1 : a.dataReferencia > b.dataReferencia ? -1 : 0));

    const start = (page - 1) * pageSize;
    const pageItems = todos.slice(start, start + pageSize);
    const avisos = {
      items: pageItems.map(toResumo),
      page,
      pageSize,
      hasMore: start + pageSize < todos.length,
    };

    if (todos.length === 0) {
      return { avisos };
    }
    const avisoAberto = await toDetalhe(todos[0], ctx);
    return { avisos, avisoAberto };
  },

  'tarefas.meus_avisos.abrirAviso': async function (input, ctx) {
    const responsavelId = sessionActorId(ctx);
    const registro = await getAvisoVencimento({ id: String(input.avisoId) }, ctx);
    if (registro.responsavelId !== responsavelId) {
      throw new AppError('FORBIDDEN', 'o aviso não pertence ao responsável da sessão', 403);
    }
    const aviso = await toDetalhe(registro, ctx);
    return { aviso };
  },
};
