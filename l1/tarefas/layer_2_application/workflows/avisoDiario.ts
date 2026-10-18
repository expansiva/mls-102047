/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/workflows/avisoDiario.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { evaluateSchedule } from '/_102034_/l1/server/layer_2_application/schedule/evaluateSchedule.js';
import { occurrenceRecordId } from '/_102034_/l1/workflow/index.js';
import type { OccurrenceKey } from '/_102034_/l1/workflow/index.js';
import type { WorkflowEngine } from '/_102034_/l1/workflow/engine.js';
import type { WorkflowTable } from '/_102034_/l1/workflow/contracts.js';
import { engines, workflowTables } from '/_102047_/l1/tarefas/layer_1_external/adapters/workflow/engine.js';
import type { AvisoVencimentoRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/avisoVencimentoRepository.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { AvisoVencimento } from '/_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

const PROJECT_ID = '102047';
const MODULE_ID = 'tarefas';
const PROCESS_ID = 'avisoDiario';
const ENTITY_ID = 'AvisoVencimento';
const STEP_GERAR = 'gerarAvisos';
const STEP_AVISAR = 'avisarResponsavel';
const SCHEDULE = 'Todo dia às 8h';
const OPEN_STATUSES: Tarefa['status'][] = ['aFazer', 'emAndamento', 'emRevisao'];

type AvisoTarefa = AvisoVencimento['details']['tarefas'][number];

export interface ResponsavelComVencimento {
  responsavelId: string;
  tarefas: AvisoTarefa[];
}

export interface ResolverResponsaveisComVencimentoInput {
  dataReferencia: string;
}

export interface ResolverResponsaveisComVencimentoOutput {
  dataReferencia: string;
  responsaveis: ResponsavelComVencimento[];
}

// The scheduled run receives nothing: the day is the day of the clock.
export interface GerarAvisosDiariosInput {}

export interface GerarAvisosDiariosOutput {
  dataReferencia: string;
  iniciado: boolean;
  quantidadeAvisos: number;
}

function getEngine(): WorkflowEngine {
  const engine: WorkflowEngine | undefined = engines.avisoDiario;
  if (!engine) {
    throw new AppError('WORKFLOW_ENGINE_MISSING', 'The engine of the process avisoDiario is not configured', 500);
  }
  return engine;
}

function getTable(): WorkflowTable {
  const table: WorkflowTable | undefined = workflowTables.avisoDiario;
  if (!table) {
    throw new AppError('WORKFLOW_TABLE_MISSING', 'The step table of the process avisoDiario is not configured', 500);
  }
  return table;
}

function dateOf(ctx: RequestContext, moment: Date): string {
  const timezone = ctx.organization.timezone;
  if (timezone) {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(moment);
  }
  return moment.toISOString().slice(0, 10);
}

function keyOf(recordId: string): OccurrenceKey {
  return {
    project: PROJECT_ID,
    module: MODULE_ID,
    processId: PROCESS_ID,
    entity: ENTITY_ID,
    recordId,
  };
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function resolverResponsaveisComVencimento(
  input: ResolverResponsaveisComVencimentoInput,
  ctx: RequestContext,
): Promise<ResolverResponsaveisComVencimentoOutput> {
  if (!input.dataReferencia) {
    throw new AppError('DATA_REFERENCIA_REQUIRED', 'The reference date is required', 400, {
      ruleId: 'avisoSomenteTarefasAbertasVencendo',
    });
  }
  const hoje = input.dataReferencia;
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const grupos = new Map<string, AvisoTarefa[]>();

  for (const status of OPEN_STATUSES) {
    const tarefas = await tarefaRepository.list({ status });
    for (const tarefa of tarefas) {
      if (!OPEN_STATUSES.includes(tarefa.status)) continue;
      const prazo = tarefa.prazo.slice(0, 10);
      if (prazo > hoje) continue;
      const item: AvisoTarefa = {
        tarefaId: tarefa.id,
        prazo,
        situacaoPrazo: prazo === hoje ? 'dueToday' : 'overdue',
      };
      const atual = grupos.get(tarefa.responsavelId);
      if (atual) {
        if (!atual.some((t) => t.tarefaId === item.tarefaId)) atual.push(item);
      } else {
        grupos.set(tarefa.responsavelId, [item]);
      }
    }
  }

  const responsaveis: ResponsavelComVencimento[] = [];
  for (const [responsavelId, tarefas] of grupos) {
    responsaveis.push({ responsavelId, tarefas });
  }
  return { dataReferencia: hoje, responsaveis };
}

async function finalizar(
  ctx: RequestContext,
  repository: AvisoVencimentoRepository,
  aviso: AvisoVencimento,
): Promise<boolean> {
  if (aviso.status !== 'pending') return false;
  const finalizadoEm = ctx.clock.nowIso();
  const concluido: AvisoVencimento = {
    ...aviso,
    status: 'completed',
    details: { ...aviso.details, finalizadoEm },
  };
  await repository.transition(concluido, 'concluirAviso');
  return true;
}

async function falhar(
  ctx: RequestContext,
  repository: AvisoVencimentoRepository,
  aviso: AvisoVencimento,
  motivo: string,
): Promise<void> {
  if (aviso.status !== 'pending') return;
  const comFalha: AvisoVencimento = {
    ...aviso,
    status: 'failed',
    details: { ...aviso.details, finalizadoEm: ctx.clock.nowIso(), motivoFalha: motivo },
  };
  await repository.transition(comFalha, 'falharAviso');
}

export async function gerarAvisosDiarios(
  _input: GerarAvisosDiariosInput,
  ctx: RequestContext,
): Promise<GerarAvisosDiariosOutput> {
  const hoje = dateOf(ctx, new Date(ctx.clock.nowIso()));
  const repository = resolveRepository<AvisoVencimentoRepository>(ctx, 'AvisoVencimentoRepository');

  // avisoNaoIniciaSemConcluirAnterior: a notice of an earlier day still being sent blocks a new run.
  const emEnvio = await repository.list({ status: 'pending' });
  const anteriorEmEnvio = emEnvio.some((a) => a.dataReferencia < hoje);
  if (anteriorEmEnvio) {
    ctx.log.info('avisoDiario: previous notice still in progress, no new notice started', { dataReferencia: hoje });
    return { dataReferencia: hoje, iniciado: false, quantidadeAvisos: 0 };
  }

  const resolvidos = await resolverResponsaveisComVencimento({ dataReferencia: hoje }, ctx);
  const engine = getEngine();
  const table = getTable();
  let quantidadeAvisos = 0;

  for (const grupo of resolvidos.responsaveis) {
    const recordId = occurrenceRecordId(ctx, PROCESS_ID, `${grupo.responsavelId}:${hoje}`);
    const key = keyOf(recordId);
    const aberta = await engine.open(ctx, table, key, STEP_GERAR, null);
    let passo = aberta.occurrence.step;

    // avisoUnicoPorResponsavelEDia: one notice per responsible and day.
    const existentes = await repository.list({ responsavelId: grupo.responsavelId, dataReferencia: hoje });
    let aviso: AvisoVencimento | undefined = existentes[0];
    let criadoAgora = false;
    if (!aviso) {
      const novo: AvisoVencimento = {
        id: recordId,
        version: 0,
        responsavelId: grupo.responsavelId,
        dataReferencia: hoje,
        status: 'pending',
        details: {
          geradoEm: ctx.clock.nowIso(),
          tarefas: grupo.tarefas,
          quantidadeTarefas: grupo.tarefas.length,
          quantidadeAtrasadas: grupo.tarefas.filter((t) => t.situacaoPrazo === 'overdue').length,
        },
      };
      aviso = await repository.create(novo);
      criadoAgora = true;
    }

    try {
      if (passo === STEP_GERAR) {
        const avancado = await engine.advance(ctx, table, key, {
          from: STEP_GERAR,
          to: STEP_AVISAR,
          actorNow: grupo.responsavelId,
        });
        // conflict: another call already advanced; the current state is what counts.
        passo = avancado.occurrence.step;
      }
      const concluido = await finalizar(ctx, repository, aviso);
      if (concluido && criadoAgora) quantidadeAvisos += 1;
    } catch (error) {
      const motivo = messageOf(error);
      ctx.log.error('avisoDiario: notice failed', { responsavelId: grupo.responsavelId, motivo });
      await falhar(ctx, repository, aviso, motivo);
    }
  }

  return { dataReferencia: hoje, iniciado: true, quantidadeAvisos };
}

export async function onTick(ctx: RequestContext, now: Date): Promise<void> {
  const hoje = dateOf(ctx, now);
  const repository = resolveRepository<AvisoVencimentoRepository>(ctx, 'AvisoVencimentoRepository');
  const doDia = await repository.list({ dataReferencia: hoje });
  let lastRun: Date | null = null;
  for (const aviso of doDia) {
    const geradoEm = new Date(aviso.details.geradoEm);
    if (lastRun === null || geradoEm.getTime() > lastRun.getTime()) lastRun = geradoEm;
  }
  const due = evaluateSchedule(SCHEDULE, now, lastRun);
  if (due === null) return;
  await gerarAvisosDiarios({}, ctx);
}
