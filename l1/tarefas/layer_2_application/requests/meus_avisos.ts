/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/meus_avisos.ts" enhancement="_blank"/>
import type { Meus_avisosContracts, AvisoResumo, AvisoDetalhe, TarefaAviso, TarefaResumo } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getAvisoVencimento } from '/_102047_/l1/tarefas/layer_2_application/usecases/getAvisoVencimento.js';
import type { GetAvisoVencimentoOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/getAvisoVencimento.js';
import { listAvisoVencimento } from '/_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.js';
import { getTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.js';

type LinhaAviso = { tarefaId: string; prazo: string; situacaoPrazo: string };

const MAX_PAGE_SIZE = 200;

function toAvisoStatus(value: string): AvisoResumo['status'] {
  if (value === 'pending' || value === 'completed' || value === 'failed') return value;
  throw new AppError('INVALID_DATA', `AvisoVencimento with unknown status: ${value}`, 500);
}

function toSituacaoPrazo(value: string): TarefaAviso['details']['tarefas']['situacaoPrazo'] {
  if (value === 'dueToday' || value === 'overdue') return value;
  throw new AppError('INVALID_DATA', `AvisoVencimento line with unknown situacaoPrazo: ${value}`, 500);
}

function toTarefaStatus(value: string): TarefaResumo['status'] {
  if (value === 'aFazer' || value === 'emAndamento' || value === 'emRevisao' || value === 'concluida' || value === 'cancelada') return value;
  throw new AppError('INVALID_DATA', `Tarefa with unknown status: ${value}`, 500);
}

// The lines of the aviso are a collection; the usecase may hand them as an array.
function readRows(aviso: GetAvisoVencimentoOutput): LinhaAviso[] {
  const raw: unknown = aviso.details.tarefas;
  if (raw == null) return [];
  return Array.isArray(raw) ? (raw as LinhaAviso[]) : [raw as LinhaAviso];
}

// Totals are calculated from the lines, never read from storage (derived fields).
function calcTotais(rows: LinhaAviso[]): { quantidadeTarefas: number; quantidadeAtrasadas: number } {
  let atrasadas = 0;
  for (const row of rows) {
    if (row.situacaoPrazo === 'overdue') atrasadas += 1;
  }
  return { quantidadeTarefas: rows.length, quantidadeAtrasadas: atrasadas };
}

// Scope own: the aviso belongs to the caller of the session.
function assertOwn(responsavelId: string, ctx: RequestContext): void {
  const actorId = ctx.sessionContext.actorId;
  if (actorId == null || actorId !== responsavelId) {
    throw new AppError('FORBIDDEN', 'O aviso não pertence ao responsável da sessão', 403);
  }
}

function toResumo(aviso: GetAvisoVencimentoOutput): AvisoResumo {
  const totais = calcTotais(readRows(aviso));
  const finalizadoEm = aviso.details.finalizadoEm;
  const motivoFalha = aviso.details.motivoFalha;
  return {
    id: aviso.id,
    dataReferencia: aviso.dataReferencia,
    status: toAvisoStatus(aviso.status),
    details: {
      details: {
        quantidadeTarefas: totais.quantidadeTarefas,
        quantidadeAtrasadas: totais.quantidadeAtrasadas,
        geradoEm: aviso.details.geradoEm,
        ...(finalizadoEm != null ? { finalizadoEm } : {}),
        ...(motivoFalha != null ? { motivoFalha } : {}),
      },
    },
  };
}

async function toDetalhe(aviso: GetAvisoVencimentoOutput, ctx: RequestContext): Promise<AvisoDetalhe> {
  // avisoSomenteTarefasAbertasVencendo: the lines are the ones the daily process recorded
  // (open tasks due that day or overdue); they are shown as recorded, with the current task data.
  const rows = readRows(aviso);
  const tarefas: TarefaAviso[] = await Promise.all(rows.map(async (row): Promise<TarefaAviso> => {
    const tarefa = await getTarefa({ id: String(row.tarefaId) }, ctx);
    return {
      details: {
        tarefas: {
          tarefaId: String(row.tarefaId),
          prazo: row.prazo,
          situacaoPrazo: toSituacaoPrazo(row.situacaoPrazo),
        },
      },
      tarefa: {
        id: tarefa.id,
        titulo: tarefa.titulo,
        status: toTarefaStatus(tarefa.status),
        prazo: tarefa.prazo,
      },
    };
  }));
  const totais = calcTotais(rows);
  return {
    id: aviso.id,
    dataReferencia: aviso.dataReferencia,
    status: toAvisoStatus(aviso.status),
    details: {
      details: {
        quantidadeTarefas: totais.quantidadeTarefas,
        quantidadeAtrasadas: totais.quantidadeAtrasadas,
      },
      tarefas,
    },
  };
}

export const requests: { [K in keyof Meus_avisosContracts]: (input: Meus_avisosContracts[K]['input'], ctx: RequestContext) => Promise<Meus_avisosContracts[K]['output']> } = {
  "tarefas.meus_avisos.carregarMeusAvisos": async function (input, ctx) {
    assertOwn(input.responsavelId, ctx);
    const page = input.page > 0 ? Math.floor(input.page) : 1;
    const pageSize = input.pageSize > 0 ? Math.min(Math.floor(input.pageSize), MAX_PAGE_SIZE) : 20;

    // avisoUnicoPorResponsavelEDia: at most one aviso per date, so no grouping is needed.
    // List every aviso of the caller (filter: responsavelId only), then order and page here.
    const todos: { id: string; dataReferencia: string }[] = [];
    let lp = 1;
    for (;;) {
      const res = await listAvisoVencimento({ responsavelId: input.responsavelId, page: lp, pageSize: MAX_PAGE_SIZE }, ctx);
      for (const item of res.items) {
        todos.push({ id: String(item.id), dataReferencia: String(item.dataReferencia) });
      }
      if (!res.hasMore) break;
      lp += 1;
    }

    const hoje = ctx.clock.nowIso().slice(0, 10);
    todos.sort((a, b) => {
      const aHoje = a.dataReferencia.slice(0, 10) === hoje ? 1 : 0;
      const bHoje = b.dataReferencia.slice(0, 10) === hoje ? 1 : 0;
      if (aHoje !== bHoje) return bHoje - aHoje;
      if (a.dataReferencia === b.dataReferencia) return 0;
      return a.dataReferencia < b.dataReferencia ? 1 : -1;
    });

    const start = (page - 1) * pageSize;
    const slice = todos.slice(start, start + pageSize);
    const hasMore = todos.length > start + pageSize;
    const items: AvisoResumo[] = await Promise.all(slice.map(async (ref) => {
      const aviso = await getAvisoVencimento({ id: ref.id }, ctx);
      return toResumo(aviso);
    }));

    const output: Meus_avisosContracts['tarefas.meus_avisos.carregarMeusAvisos']['output'] = {
      avisos: { items, page, pageSize, hasMore },
    };
    const primeiro = todos[0];
    if (primeiro !== undefined) {
      const maisRecente = await getAvisoVencimento({ id: primeiro.id }, ctx);
      output.avisoAberto = await toDetalhe(maisRecente, ctx);
    }
    return output;
  },

  "tarefas.meus_avisos.abrirAviso": async function (input, ctx) {
    const aviso = await getAvisoVencimento({ id: String(input.avisoId) }, ctx);
    assertOwn(aviso.responsavelId, ctx);
    return { aviso: await toDetalhe(aviso, ctx) };
  },
};
