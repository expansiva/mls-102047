/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/workflows/avisoDiario.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { evaluateSchedule } from '/_102034_/l1/server/layer_2_application/schedule/evaluateSchedule.js';
import { taskOccurrence } from '/_102047_/l1/tarefas/layer_1_external/adapters/workflow/taskOccurrence.js';
import type { OccurrenceRef } from '/_102047_/l1/tarefas/layer_1_external/adapters/workflow/taskOccurrence.js';
import type { AvisoVencimentoRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/avisoVencimentoRepository.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { AvisoVencimento } from '/_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

const PROJECT = 102047;
const MODULE = 'tarefas';
const PROCESS_ID = 'avisoDiario';
const WORKFLOW_VERSION = '1';
const SCHEDULE = 'Todo dia às 8h';
const STEP_GERAR = 'gerarAvisos';
const STEP_AVISAR = 'avisarResponsavel';
const SYSTEM_ACTOR = 'system';
const OPEN_STATUSES: Tarefa['status'][] = ['aFazer', 'emAndamento', 'emRevisao'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

type AvisoTarefa = AvisoVencimento['details']['tarefas'][number];

export interface ResponsavelComVencimento {
  responsavelId: string;
  tarefas: AvisoTarefa[];
}

export interface GerarAvisosDiariosInput {
  /** Reference day (YYYY-MM-DD); when absent, the day of `agora` (or of the clock) in the organization timezone. */
  dataReferencia?: string;
  /** Moment of the run (ISO); when absent, the request clock. */
  agora?: string;
}

export interface GerarAvisosDiariosOutput {
  dataReferencia: string;
  quantidadeAvisos: number;
  quantidadeFalhas: number;
}

export interface ResolverResponsaveisComVencimentoInput {
  dataReferencia: string;
}

export interface ResolverResponsaveisComVencimentoOutput {
  dataReferencia: string;
  responsaveis: ResponsavelComVencimento[];
}

function isoDate(date: Date, timeZone: string | undefined): string {
  if (timeZone) {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }
  return date.toISOString().slice(0, 10);
}

function parseNow(ctx: RequestContext, agora: string | undefined): Date {
  const date = new Date(agora ?? ctx.clock.nowIso());
  if (Number.isNaN(date.getTime())) {
    throw new AppError('INVALID_MOMENT', 'The moment of the run is not a valid date.', 400, {
      ruleId: 'avisoSomenteTarefasAbertasVencendo',
    });
  }
  return date;
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function resolverResponsaveisComVencimento(
  input: ResolverResponsaveisComVencimentoInput,
  ctx: RequestContext,
): Promise<ResolverResponsaveisComVencimentoOutput> {
  if (typeof input.dataReferencia !== 'string' || !ISO_DATE.test(input.dataReferencia)) {
    throw new AppError('INVALID_REFERENCE_DATE', 'dataReferencia must be a date in the format YYYY-MM-DD.', 400, {
      ruleId: 'avisoSomenteTarefasAbertasVencendo',
    });
  }
  const hoje = input.dataReferencia;
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const byResponsavel = new Map<string, AvisoTarefa[]>();

  for (const status of OPEN_STATUSES) {
    const tarefas = await tarefaRepository.list({ status });
    for (const tarefa of tarefas) {
      if (!OPEN_STATUSES.includes(tarefa.status)) continue;
      const prazo = tarefa.prazo.slice(0, 10);
      if (prazo > hoje) continue;
      const situacaoPrazo: AvisoTarefa['situacaoPrazo'] = prazo === hoje ? 'dueToday' : 'overdue';
      const list = byResponsavel.get(tarefa.responsavelId) ?? [];
      list.push({ tarefaId: tarefa.id, prazo, situacaoPrazo });
      byResponsavel.set(tarefa.responsavelId, list);
    }
  }

  const responsaveis: ResponsavelComVencimento[] = [];
  for (const responsavelId of [...byResponsavel.keys()].sort()) {
    const tarefas = [...(byResponsavel.get(responsavelId) ?? [])].sort((a, b) =>
      a.prazo === b.prazo ? a.tarefaId.localeCompare(b.tarefaId) : a.prazo.localeCompare(b.prazo),
    );
    responsaveis.push({ responsavelId, tarefas });
  }
  return { dataReferencia: hoje, responsaveis };
}

async function entregarAviso(
  ctx: RequestContext,
  repository: AvisoVencimentoRepository,
  aviso: AvisoVencimento,
  key: string,
  now: Date,
): Promise<void> {
  const ref: Omit<OccurrenceRef, 'workflowVersion'> = {
    project: PROJECT,
    module: MODULE,
    entity: 'AvisoVencimento',
    recordId: aviso.id,
    processId: PROCESS_ID,
  };
  let occurrence = await taskOccurrence.find(ctx, ref);
  if (!occurrence) {
    occurrence = await taskOccurrence.open(
      ctx,
      { ...ref, workflowVersion: WORKFLOW_VERSION },
      STEP_GERAR,
      SYSTEM_ACTOR,
      key,
    );
  }
  if (occurrence.step === STEP_GERAR) {
    occurrence = await taskOccurrence.advance(ctx, ref, STEP_AVISAR, aviso.responsavelId);
  }
  if (occurrence.step !== STEP_AVISAR) {
    throw new AppError(
      'OCCURRENCE_STEP_UNEXPECTED',
      `The occurrence of aviso ${aviso.id} is in step ${occurrence.step}, expected ${STEP_AVISAR}.`,
      409,
      { ruleId: 'avisoNaoIniciaSemConcluirAnterior' },
    );
  }
  const concluido: AvisoVencimento = {
    ...aviso,
    status: 'completed',
    details: { ...aviso.details, finalizadoEm: now.toISOString() },
  };
  await repository.transition(concluido, 'concluirAviso');
}

async function registrarFalha(
  repository: AvisoVencimentoRepository,
  aviso: AvisoVencimento,
  motivo: string,
  now: Date,
): Promise<void> {
  const falho: AvisoVencimento = {
    ...aviso,
    status: 'failed',
    details: { ...aviso.details, finalizadoEm: now.toISOString(), motivoFalha: motivo },
  };
  await repository.transition(falho, 'falharAviso');
}

export async function gerarAvisosDiarios(
  input: GerarAvisosDiariosInput,
  ctx: RequestContext,
): Promise<GerarAvisosDiariosOutput> {
  const now = parseNow(ctx, input.agora);
  const hoje = input.dataReferencia ?? isoDate(now, ctx.organization.timezone);
  if (!ISO_DATE.test(hoje)) {
    throw new AppError('INVALID_REFERENCE_DATE', 'dataReferencia must be a date in the format YYYY-MM-DD.', 400, {
      ruleId: 'avisoUnicoPorResponsavelEDia',
    });
  }

  const repository = resolveRepository<AvisoVencimentoRepository>(ctx, 'AvisoVencimentoRepository');

  const emEnvio = await repository.list({ status: 'pending' });
  const anterior = emEnvio.find((aviso) => aviso.status === 'pending' && aviso.dataReferencia < hoje);
  if (anterior) {
    throw new AppError(
      'AVISO_ANTERIOR_EM_ENVIO',
      `The aviso ${anterior.id} of ${anterior.dataReferencia} is still being sent; a new run does not start.`,
      409,
      { ruleId: 'avisoNaoIniciaSemConcluirAnterior' },
    );
  }

  const doDia = await repository.list({ dataReferencia: hoje });
  const existentes = new Map<string, AvisoVencimento>();
  for (const aviso of doDia) {
    if (aviso.dataReferencia === hoje) existentes.set(aviso.responsavelId, aviso);
  }

  const { responsaveis } = await resolverResponsaveisComVencimento({ dataReferencia: hoje }, ctx);
  const requestKey = ctx.requestMeta?.requestId ?? PROCESS_ID;
  let quantidadeAvisos = 0;
  let quantidadeFalhas = 0;

  const processar = async (aviso: AvisoVencimento): Promise<void> => {
    quantidadeAvisos += 1;
    if (aviso.status === 'completed') return;
    if (aviso.status === 'failed') {
      quantidadeFalhas += 1;
      return;
    }
    const key = `${requestKey}:${hoje}:${aviso.responsavelId}`;
    try {
      await entregarAviso(ctx, repository, aviso, key, now);
    } catch (error) {
      const motivo = messageOf(error);
      ctx.log.error('avisoDiario: delivery failed', { avisoId: aviso.id, responsavelId: aviso.responsavelId, motivo });
      await registrarFalha(repository, aviso, motivo, now);
      quantidadeFalhas += 1;
    }
  };

  for (const responsavel of responsaveis) {
    const existente = existentes.get(responsavel.responsavelId);
    if (existente) {
      existentes.delete(responsavel.responsavelId);
      await processar(existente);
      continue;
    }
    const quantidadeAtrasadas = responsavel.tarefas.filter((t) => t.situacaoPrazo === 'overdue').length;
    const novo: AvisoVencimento = {
      id: ctx.idGenerator.newId(),
      version: 1,
      responsavelId: responsavel.responsavelId,
      dataReferencia: hoje,
      status: 'pending',
      details: {
        geradoEm: now.toISOString(),
        tarefas: responsavel.tarefas,
        quantidadeTarefas: responsavel.tarefas.length,
        quantidadeAtrasadas,
      },
    };
    const criado = await repository.create(novo);
    await processar(criado);
  }

  // Avisos of the day written by an earlier call whose responsável no longer has due tasks: finish what was left pending.
  for (const restante of existentes.values()) {
    if (restante.status === 'pending') await processar(restante);
  }

  return { dataReferencia: hoje, quantidadeAvisos, quantidadeFalhas };
}

export async function onTick(ctx: RequestContext, now: Date): Promise<void> {
  const repository = resolveRepository<AvisoVencimentoRepository>(ctx, 'AvisoVencimentoRepository');
  const hoje = isoDate(now, ctx.organization.timezone);
  const doDia = await repository.list({ dataReferencia: hoje });
  let lastRun: Date | null = null;
  for (const aviso of doDia) {
    if (aviso.dataReferencia !== hoje) continue;
    const geradoEm = new Date(aviso.details.geradoEm);
    if (Number.isNaN(geradoEm.getTime())) continue;
    if (lastRun === null || geradoEm.getTime() > lastRun.getTime()) lastRun = geradoEm;
  }
  const due = evaluateSchedule(SCHEDULE, now, lastRun);
  if (due === null) return;
  try {
    await gerarAvisosDiarios({ dataReferencia: hoje, agora: now.toISOString() }, ctx);
  } catch (error) {
    if (error instanceof AppError && error.code === 'AVISO_ANTERIOR_EM_ENVIO') {
      ctx.log.error('avisoDiario: run skipped, previous aviso not finished', { message: error.message });
      return;
    }
    throw error;
  }
}
