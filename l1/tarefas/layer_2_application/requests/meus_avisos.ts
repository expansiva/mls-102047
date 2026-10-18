/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/meus_avisos.ts" enhancement="_blank"/>

import type { Meus_avisosContracts, AvisoResumo, AvisoDetalhe, AvisoLinhaTarefa, TarefaAviso } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listAvisoVencimento } from '/_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.js';
import { getAvisoVencimento } from '/_102047_/l1/tarefas/layer_2_application/usecases/getAvisoVencimento.js';
import { getTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.js';

interface AvisoFonte {
  id: string;
  dataReferencia: string;
  status: string;
  details: {
    geradoEm: string;
    finalizadoEm?: string | null;
    motivoFalha?: string | null;
    tarefas: { tarefaId: string; prazo: string; situacaoPrazo: string }[];
  };
}

type AvisoStatus = 'pending' | 'completed' | 'failed';
type TarefaStatus = 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';

function actorOf(ctx: RequestContext): string {
  const actorId = ctx.sessionContext.actorId;
  if (actorId == null || actorId === '') {
    throw new AppError('UNAUTHORIZED', 'pessoa logada não identificada na sessão', 401);
  }
  return actorId;
}

function toAvisoStatus(value: string): AvisoStatus {
  if (value === 'pending' || value === 'completed' || value === 'failed') return value;
  throw new AppError('INVALID_DATA', 'situação de aviso desconhecida: ' + value, 500);
}

function toTarefaStatus(value: string): TarefaStatus {
  if (value === 'aFazer' || value === 'emAndamento' || value === 'emRevisao' || value === 'concluida' || value === 'cancelada') return value;
  throw new AppError('INVALID_DATA', 'situação de tarefa desconhecida: ' + value, 500);
}

function toSituacaoPrazo(value: string): 'dueToday' | 'overdue' {
  if (value === 'dueToday' || value === 'overdue') return value;
  throw new AppError('INVALID_DATA', 'situação de prazo desconhecida: ' + value, 500);
}

function resolvePage(page: number | undefined, pageSize: number | undefined): { page: number; pageSize: number } {
  const p = typeof page === 'number' && Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const sRaw = typeof pageSize === 'number' && Number.isFinite(pageSize) && pageSize >= 1 ? Math.floor(pageSize) : 20;
  return { page: p, pageSize: Math.min(sRaw, 200) };
}

function todayOf(ctx: RequestContext): string {
  const iso = ctx.clock.nowIso();
  const tz = ctx.organization.timezone;
  if (tz != null && tz !== '') {
    return new Date(iso).toLocaleDateString('en-CA', { timeZone: tz });
  }
  return iso.slice(0, 10);
}

function dayOf(value: string): string {
  return value.slice(0, 10);
}

async function listarAvisosDoResponsavel(ctx: RequestContext, responsavelId: string): Promise<AvisoFonte[]> {
  const all: AvisoFonte[] = [];
  let page = 1;
  for (;;) {
    const res = await listAvisoVencimento({ responsavelId, page, pageSize: 200 }, ctx);
    all.push(...res.items);
    if (!res.hasMore || res.items.length === 0) break;
    page += 1;
  }
  // ordered by dataReferencia descending
  all.sort((a, b) => dayOf(b.dataReferencia).localeCompare(dayOf(a.dataReferencia)));
  return all;
}

function toResumo(aviso: AvisoFonte): AvisoResumo {
  const tarefas = aviso.details.tarefas;
  // quantidadeTarefas / quantidadeAtrasadas: calculated from the lines, never stored
  const quantidadeTarefas = tarefas.length;
  const quantidadeAtrasadas = tarefas.filter((t) => t.situacaoPrazo === 'overdue').length;
  const details: AvisoResumo['details'] = {
    geradoEm: aviso.details.geradoEm,
    quantidadeTarefas,
    quantidadeAtrasadas,
  };
  const out: AvisoResumo = {
    id: aviso.id,
    dataReferencia: aviso.dataReferencia,
    status: toAvisoStatus(aviso.status),
    details,
  };
  if (aviso.details.finalizadoEm != null) {
    out.details = { ...out.details, finalizadoEm: aviso.details.finalizadoEm };
  }
  if (aviso.details.motivoFalha != null) {
    out.details = { ...out.details, motivoFalha: aviso.details.motivoFalha };
  }
  return out;
}

async function toDetalhe(aviso: AvisoFonte, ctx: RequestContext): Promise<AvisoDetalhe> {
  const hoje = todayOf(ctx);
  const linhas: AvisoLinhaTarefa[] = [];
  for (const linha of aviso.details.tarefas) {
    const tarefa = await getTarefa({ id: String(linha.tarefaId) }, ctx);
    const status = toTarefaStatus(tarefa.status);
    const aberta = status === 'aFazer' || status === 'emAndamento' || status === 'emRevisao';
    const prazoAtual = dayOf(tarefa.prazo);
    const tarefaAviso: TarefaAviso = {
      id: tarefa.id,
      titulo: tarefa.titulo,
      status,
      prazo: tarefa.prazo,
      details: {
        venceHoje: aberta && prazoAtual === hoje,
        atrasada: aberta && prazoAtual < hoje,
      },
    };
    // avisoSomenteTarefasAbertasVencendo: lines are kept as recorded at generation time
    linhas.push({
      tarefaId: linha.tarefaId,
      prazo: linha.prazo,
      situacaoPrazo: toSituacaoPrazo(linha.situacaoPrazo),
      tarefa: tarefaAviso,
    });
  }
  return {
    id: aviso.id,
    dataReferencia: aviso.dataReferencia,
    status: toAvisoStatus(aviso.status),
    details: {
      quantidadeTarefas: linhas.length,
      quantidadeAtrasadas: linhas.filter((l) => l.situacaoPrazo === 'overdue').length,
      tarefas: linhas,
    },
  };
}

export const requests: { [K in keyof Meus_avisosContracts]: (input: Meus_avisosContracts[K]['input'], ctx: RequestContext) => Promise<Meus_avisosContracts[K]['output']> } = {
  'tarefas.meus_avisos.qryPaginaMeusAvisos': async function (input, ctx) {
    const responsavelId = actorOf(ctx);
    const { pageSize } = resolvePage(1, input.pageSize);
    // avisoUnicoPorResponsavelEDia: at most one aviso per day, listed newest first
    const todos = await listarAvisosDoResponsavel(ctx, responsavelId);
    const pagina = todos.slice(0, pageSize);
    const output: Meus_avisosContracts['tarefas.meus_avisos.qryPaginaMeusAvisos']['output'] = {
      avisos: {
        items: pagina.map(toResumo),
        page: 1,
        pageSize,
        hasMore: todos.length > pageSize,
      },
    };
    if (todos.length > 0) {
      const maisRecente = await getAvisoVencimento({ id: todos[0].id }, ctx);
      if (maisRecente.responsavelId !== responsavelId) {
        throw new AppError('FORBIDDEN', 'o aviso não pertence à pessoa logada', 403);
      }
      output.avisoAtual = await toDetalhe(maisRecente, ctx);
    }
    return output;
  },

  'tarefas.meus_avisos.qryListarMeusAvisos': async function (input, ctx) {
    const responsavelId = actorOf(ctx);
    const { page, pageSize } = resolvePage(input.page, input.pageSize);
    // avisoUnicoPorResponsavelEDia: one aviso per day, newest first
    const todos = await listarAvisosDoResponsavel(ctx, responsavelId);
    const inicio = input.dataInicio != null && input.dataInicio !== '' ? dayOf(input.dataInicio) : undefined;
    const fim = input.dataFim != null && input.dataFim !== '' ? dayOf(input.dataFim) : undefined;
    const filtrados = todos.filter((a) => {
      const dia = dayOf(a.dataReferencia);
      if (inicio !== undefined && dia < inicio) return false;
      if (fim !== undefined && dia > fim) return false;
      return true;
    });
    const from = (page - 1) * pageSize;
    const items = filtrados.slice(from, from + pageSize).map(toResumo);
    return {
      avisos: {
        items,
        page,
        pageSize,
        hasMore: filtrados.length > from + pageSize,
      },
    };
  },

  'tarefas.meus_avisos.qryAvisoPorId': async function (input, ctx) {
    const responsavelId = actorOf(ctx);
    const aviso = await getAvisoVencimento({ id: String(input.id) }, ctx);
    if (aviso.responsavelId !== responsavelId) {
      throw new AppError('FORBIDDEN', 'o aviso não pertence à pessoa logada', 403);
    }
    return { aviso: await toDetalhe(aviso, ctx) };
  },
};
