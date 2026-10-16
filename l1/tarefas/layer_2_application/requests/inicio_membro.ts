/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/inicio_membro.ts" enhancement="_blank"/>

import type { Inicio_membroContracts, ResumoMinhasTarefas, TarefaResumo, AvisoDoDia, AvisoTarefa, Pendencia } from '/_102047_/l2/tarefas/web/contracts/inicio_membro.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import type { ListTarefaOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import { getTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import { listItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';
import { listAvisoVencimento } from '/_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.js';
import { avancarEtapaTarefa } from '/_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.js';

type TarefaRec = ListTarefaOutput['items'][number];
type TarefaStatus = TarefaResumo['status'];
type TarefaPrioridade = TarefaResumo['prioridade'];
type AvisoStatus = AvisoDoDia['status'];
type SituacaoPrazo = AvisoTarefa['details']['tarefas']['situacaoPrazo'];
type Transicao = 'iniciar' | 'enviarParaRevisao' | 'aceitar' | 'devolver';

const STATUS_VALUES: TarefaStatus[] = ['aFazer', 'emAndamento', 'emRevisao', 'concluida', 'cancelada'];
const PRIORIDADE_VALUES: TarefaPrioridade[] = ['low', 'medium', 'high'];
const AVISO_STATUS_VALUES: AvisoStatus[] = ['pending', 'completed', 'failed'];
const SITUACAO_VALUES: SituacaoPrazo[] = ['dueToday', 'overdue'];
const PRIORIDADE_RANK: Record<TarefaPrioridade, number> = { high: 0, medium: 1, low: 2 };
const PAGE_SIZE = 200;

function toStatus(v: string): TarefaStatus {
  const found = STATUS_VALUES.find((s) => s === v);
  if (found === undefined) throw new AppError('INVALID_DATA', `status de tarefa desconhecido: ${v}`, 500);
  return found;
}

function toPrioridade(v: string): TarefaPrioridade {
  const found = PRIORIDADE_VALUES.find((s) => s === v);
  if (found === undefined) throw new AppError('INVALID_DATA', `prioridade de tarefa desconhecida: ${v}`, 500);
  return found;
}

function toAvisoStatus(v: string): AvisoStatus {
  const found = AVISO_STATUS_VALUES.find((s) => s === v);
  if (found === undefined) throw new AppError('INVALID_DATA', `situacao de aviso desconhecida: ${v}`, 500);
  return found;
}

function toSituacao(v: string): SituacaoPrazo {
  const found = SITUACAO_VALUES.find((s) => s === v);
  if (found === undefined) throw new AppError('INVALID_DATA', `situacao de prazo desconhecida: ${v}`, 500);
  return found;
}

function callerId(ctx: RequestContext): string {
  const id = ctx.sessionContext.actorId;
  if (id == null || id === '') throw new AppError('UNAUTHENTICATED', 'membro da sessão não identificado', 401);
  return id;
}

function todayOf(ctx: RequestContext): string {
  return ctx.clock.nowIso().slice(0, 10);
}

function dayOf(v: string): string {
  return v.slice(0, 10);
}

function isAberta(status: TarefaStatus): boolean {
  return status === 'aFazer' || status === 'emAndamento' || status === 'emRevisao';
}

async function collect<T>(fetchPage: (page: number) => Promise<{ items: T[]; hasMore: boolean }>): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  for (;;) {
    const res = await fetchPage(page);
    for (const it of res.items) all.push(it);
    if (!res.hasMore) break;
    page += 1;
  }
  return all;
}

async function progressoChecklist(tarefaId: string, ctx: RequestContext): Promise<string> {
  const itens = await collect((page) => listItemChecklist({ tarefaId, page, pageSize: PAGE_SIZE }, ctx));
  const feitos = itens.filter((i) => i.feito).length;
  return `${feitos}/${itens.length}`;
}

function byPrazo(a: { prazo: string }, b: { prazo: string }): number {
  const da = dayOf(a.prazo);
  const db = dayOf(b.prazo);
  return da < db ? -1 : da > db ? 1 : 0;
}

async function montarResumo(myTasks: TarefaRec[], today: string, ctx: RequestContext): Promise<ResumoMinhasTarefas> {
  const abertas = myTasks.filter((t) => isAberta(toStatus(t.status))).sort(byPrazo);
  const listaNomes = new Map<string, string>();
  const tarefas: TarefaResumo[] = [];
  let vencemHoje = 0;
  let atrasadas = 0;
  for (const t of abertas) {
    const status = toStatus(t.status);
    // derived fields are calculated here, never read from storage
    const aberta = isAberta(status);
    const venceHoje = aberta && dayOf(t.prazo) === today;
    const atrasada = aberta && dayOf(t.prazo) < today;
    if (venceHoje) vencemHoje += 1;
    if (atrasada) atrasadas += 1;
    let nomeLista = listaNomes.get(t.listaId);
    if (nomeLista === undefined) {
      const lista = await getLista({ id: t.listaId }, ctx);
      nomeLista = lista.nome;
      listaNomes.set(t.listaId, nomeLista);
    }
    tarefas.push({
      id: t.id,
      titulo: t.titulo,
      status,
      prazo: t.prazo,
      prioridade: toPrioridade(t.prioridade),
      listaId: t.listaId,
      lista: { nome: nomeLista },
      details: {
        details: {
          aberta,
          venceHoje,
          atrasada,
          progressoChecklist: await progressoChecklist(t.id, ctx),
        },
      },
    });
  }
  return {
    quantidadeAbertas: tarefas.length,
    quantidadeVencemHoje: vencemHoje,
    quantidadeAtrasadas: atrasadas,
    tarefas,
  };
}

function acaoEsperada(t: TarefaRec, souResponsavel: boolean): string | null {
  const status = toStatus(t.status);
  // somenteResponsavelExecuta: the responsible executes (iniciar / enviarParaRevisao / ajustar)
  if (souResponsavel && status === 'aFazer') return 'iniciar';
  if (souResponsavel && status === 'emAndamento') {
    return t.details.devolvidaEm != null ? 'ajustar' : 'enviarParaRevisao';
  }
  return null;
}

async function montarPendencias(me: string, myTasks: TarefaRec[], ctx: RequestContext): Promise<Pendencia[]> {
  const candidatas = new Map<string, { t: TarefaRec; acao: string }>();
  for (const t of myTasks) {
    if (t.responsavelId !== me) continue;
    const acao = acaoEsperada(t, true);
    if (acao !== null) candidatas.set(t.id, { t, acao });
  }
  // somenteCriadorRevisa: the creator reviews tasks in emRevisao
  const criadas = await collect((page) => listTarefa({ criadorId: me, status: 'emRevisao', page, pageSize: PAGE_SIZE }, ctx));
  for (const t of criadas) {
    if (t.criadorId !== me) continue;
    if (toStatus(t.status) !== 'emRevisao') continue;
    candidatas.set(t.id, { t, acao: 'revisar' });
  }
  const nomes = new Map<string, string>();
  const nomeDe = async (id: string): Promise<string> => {
    const cached = nomes.get(id);
    if (cached !== undefined) return cached;
    const m = await getMembroEquipe({ id }, ctx);
    const nome = m.details.identification.name;
    nomes.set(id, nome);
    return nome;
  };
  const ordenadas = Array.from(candidatas.values()).sort((a, b) => {
    const p = byPrazo(a.t, b.t);
    if (p !== 0) return p;
    return PRIORIDADE_RANK[toPrioridade(a.t.prioridade)] - PRIORIDADE_RANK[toPrioridade(b.t.prioridade)];
  });
  const out: Pendencia[] = [];
  for (const { t, acao } of ordenadas) {
    const nomeResp = await nomeDe(t.responsavelId);
    const nomeCriador = await nomeDe(t.criadorId);
    const detalhes: Pendencia['details']['details'] = {
      progressoChecklist: await progressoChecklist(t.id, ctx),
    };
    if (t.details.motivoDevolucao != null) detalhes.motivoDevolucao = t.details.motivoDevolucao;
    if (t.details.devolvidaEm != null) detalhes.devolvidaEm = t.details.devolvidaEm;
    out.push({
      id: t.id,
      version: Number(t.version),
      titulo: t.titulo,
      status: toStatus(t.status),
      prazo: t.prazo,
      prioridade: toPrioridade(t.prioridade),
      responsavelId: t.responsavelId,
      criadorId: t.criadorId,
      responsavel: { details: { identification: { details: { identification: { name: nomeResp } } } } },
      criador: { details: { identification: { details: { identification: { name: nomeCriador } } } } },
      acaoEsperada: acao,
      details: { details: detalhes },
    });
  }
  return out;
}

async function recompor(me: string, ctx: RequestContext): Promise<{ resumo: ResumoMinhasTarefas; pendencias: Pendencia[] }> {
  const myTasks = await collect((page) => listTarefa({ responsavelId: me, page, pageSize: PAGE_SIZE }, ctx));
  const resumo = await montarResumo(myTasks, todayOf(ctx), ctx);
  const pendencias = await montarPendencias(me, myTasks, ctx);
  return { resumo, pendencias };
}

async function montarAviso(me: string, today: string, ctx: RequestContext): Promise<AvisoDoDia | null> {
  const res = await listAvisoVencimento({ responsavelId: me, dataReferencia: today, page: 1, pageSize: 20 }, ctx);
  // avisoUnicoPorResponsavelEDia: at most one notice per member and day
  const aviso = res.items.find((a) => a.responsavelId === me && dayOf(a.dataReferencia) === today);
  if (aviso === undefined) return null;
  // avisoSomenteTarefasAbertasVencendo: the notice carries only open tasks due today or overdue
  const tarefas: AvisoTarefa[] = aviso.details.tarefas.map((t) => ({
    details: {
      tarefas: {
        tarefaId: t.tarefaId,
        prazo: t.prazo,
        situacaoPrazo: toSituacao(t.situacaoPrazo),
      },
    },
  }));
  const atrasadas = tarefas.filter((t) => t.details.tarefas.situacaoPrazo === 'overdue').length;
  return {
    id: aviso.id,
    dataReferencia: aviso.dataReferencia,
    status: toAvisoStatus(aviso.status),
    details: {
      details: {
        geradoEm: aviso.details.geradoEm,
        quantidadeTarefas: tarefas.length,
        quantidadeAtrasadas: atrasadas,
      },
      tarefas,
    },
  };
}

async function executarTransicao(
  ctx: RequestContext,
  id: string,
  version: number,
  transicao: Transicao,
  motivoDevolucao?: string,
): Promise<{ resumo: ResumoMinhasTarefas; pendencias: Pendencia[] }> {
  return ctx.data.moduleData.runInTransaction(async (tx) => {
    const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
    const me = callerId(bound);
    const tarefa = await getTarefa({ id }, bound);
    const status = toStatus(tarefa.status);
    if (status === 'concluida' || status === 'cancelada') {
      throw new AppError('TAREFA_ENCERRADA', 'Tarefa concluída ou cancelada não muda de situação.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
    }
    if (transicao === 'iniciar' || transicao === 'enviarParaRevisao') {
      if (tarefa.responsavelId !== me) {
        throw new AppError('FORBIDDEN', 'Somente o responsável da tarefa pode iniciá-la ou enviá-la para revisão.', 403, { ruleId: 'somenteResponsavelExecuta' });
      }
    } else {
      if (tarefa.criadorId !== me) {
        throw new AppError('FORBIDDEN', 'Somente o criador da tarefa pode aceitá-la ou devolvê-la.', 403, { ruleId: 'somenteCriadorRevisa' });
      }
    }
    if (transicao === 'devolver' && (motivoDevolucao == null || motivoDevolucao.trim() === '')) {
      throw new AppError('VALIDATION_ERROR', 'Informe o motivo da devolução.', 400, { ruleId: 'devolucaoExigeMotivo' });
    }
    if (Number(tarefa.version) !== version) {
      throw new AppError('VERSION_CONFLICT', 'A tarefa foi alterada: versão desatualizada.', 409);
    }
    if (transicao === 'devolver') {
      await avancarEtapaTarefa({ id, transicao, motivoDevolucao: (motivoDevolucao ?? '').trim() }, bound);
    } else {
      await avancarEtapaTarefa({ id, transicao }, bound);
    }
    return recompor(me, bound);
  });
}

export const requests: { [K in keyof Inicio_membroContracts]: (input: Inicio_membroContracts[K]['input'], ctx: RequestContext) => Promise<Inicio_membroContracts[K]['output']> } = {
  'tarefas.inicio_membro.qryInicioMembro': async function (input, ctx) {
    const me = callerId(ctx);
    const today = todayOf(ctx);
    const { resumo, pendencias } = await recompor(me, ctx);
    const aviso = await montarAviso(me, today, ctx);
    if (aviso === null) {
      return { resumo, pendencias };
    }
    return { resumo, avisoHoje: aviso, pendencias };
  },

  'tarefas.inicio_membro.cmdIniciarTarefa': async function (input, ctx) {
    return executarTransicao(ctx, String(input.id), Number(input.version), 'iniciar');
  },

  'tarefas.inicio_membro.cmdEnviarParaRevisao': async function (input, ctx) {
    return executarTransicao(ctx, String(input.id), Number(input.version), 'enviarParaRevisao');
  },

  'tarefas.inicio_membro.cmdAceitarEntrega': async function (input, ctx) {
    return executarTransicao(ctx, String(input.id), Number(input.version), 'aceitar');
  },

  'tarefas.inicio_membro.cmdDevolverComMotivo': async function (input, ctx) {
    return executarTransicao(ctx, String(input.id), Number(input.version), 'devolver', input.details.motivoDevolucao);
  },
};
