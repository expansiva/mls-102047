/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.ts" enhancement="_blank"/>

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { taskOccurrence } from '/_102047_/l1/tarefas/layer_1_external/adapters/workflow/taskOccurrence.js';
import type { OccurrenceRef, TaskOccurrence } from '/_102047_/l1/tarefas/layer_1_external/adapters/workflow/taskOccurrence.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';
import { createTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/createTarefa.js';
import { updateTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.js';
import type { UpdateTarefaInput } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.js';
import { iniciar } from '/_102047_/l1/tarefas/layer_2_application/usecases/iniciar.js';
import { enviarParaRevisao } from '/_102047_/l1/tarefas/layer_2_application/usecases/enviarParaRevisao.js';
import { aceitar } from '/_102047_/l1/tarefas/layer_2_application/usecases/aceitar.js';
import { devolver } from '/_102047_/l1/tarefas/layer_2_application/usecases/devolver.js';
import { cancelar } from '/_102047_/l1/tarefas/layer_2_application/usecases/cancelar.js';

// The process keeps, in the Task, only the reference and the progress (step, actorNow, history).
// The message of origin, the task-room posts and the notices of "who acts now" have no port in this module:
// the Task step/actorNow/history written here is what those services read.

const PROJECT = 102047;
const MODULE = 'tarefas';
const ENTITY = 'Tarefa';
const PROCESS_ID = 'cicloTarefa';
const WORKFLOW_VERSION = '1';

const STEP_AGUARDAR_INICIO = 'aguardarInicio';
const STEP_EXECUTAR = 'executar';
const STEP_REVISAR = 'revisar';
const STEP_AGUARDAR_AJUSTE = 'aguardarAjuste';
const STEP_RETOMAR = 'retomar';
const STEP_CONCLUIDA = 'concluida';
const STEP_CANCELADA = 'cancelada';

const RESPONSAVEL_STEPS: string[] = [STEP_AGUARDAR_INICIO, STEP_EXECUTAR, STEP_RETOMAR, STEP_AGUARDAR_AJUSTE];
const CRIADOR_STEPS: string[] = [STEP_REVISAR, STEP_CONCLUIDA, STEP_CANCELADA];

const PRIORIDADES: Tarefa['prioridade'][] = ['low', 'medium', 'high'];

type TransitionId = 'iniciar' | 'enviarParaRevisao' | 'aceitar' | 'devolver' | 'cancelar';

interface TransitionRule {
  fromStatus: Tarefa['status'][];
  toStatus: Tarefa['status'];
  fromSteps: string[];
  toStep: string;
  who: 'responsavel' | 'criador' | 'criadorOuGestor';
  ruleId: string;
}

const TRANSITIONS: Record<TransitionId, TransitionRule> = {
  iniciar: {
    fromStatus: ['aFazer'],
    toStatus: 'emAndamento',
    fromSteps: [STEP_AGUARDAR_INICIO],
    toStep: STEP_EXECUTAR,
    who: 'responsavel',
    ruleId: 'somenteResponsavelExecuta',
  },
  enviarParaRevisao: {
    fromStatus: ['emAndamento'],
    toStatus: 'emRevisao',
    fromSteps: [STEP_EXECUTAR, STEP_RETOMAR, STEP_AGUARDAR_AJUSTE],
    toStep: STEP_REVISAR,
    who: 'responsavel',
    ruleId: 'somenteResponsavelExecuta',
  },
  aceitar: {
    fromStatus: ['emRevisao'],
    toStatus: 'concluida',
    fromSteps: [STEP_REVISAR],
    toStep: STEP_CONCLUIDA,
    who: 'criador',
    ruleId: 'somenteCriadorRevisa',
  },
  devolver: {
    fromStatus: ['emRevisao'],
    toStatus: 'emAndamento',
    fromSteps: [STEP_REVISAR],
    toStep: STEP_AGUARDAR_AJUSTE,
    who: 'criador',
    ruleId: 'somenteCriadorRevisa',
  },
  cancelar: {
    fromStatus: ['aFazer', 'emAndamento', 'emRevisao'],
    toStatus: 'cancelada',
    fromSteps: [STEP_AGUARDAR_INICIO, STEP_EXECUTAR, STEP_REVISAR, STEP_AGUARDAR_AJUSTE, STEP_RETOMAR],
    toStep: STEP_CANCELADA,
    who: 'criadorOuGestor',
    ruleId: 'cancelamentoPorCriadorOuGestor',
  },
};

function isTransitionId(value: string): value is TransitionId {
  return Object.prototype.hasOwnProperty.call(TRANSITIONS, value);
}

function refOf(recordId: string): Omit<OccurrenceRef, 'workflowVersion'> {
  return { project: PROJECT, module: MODULE, entity: ENTITY, recordId, processId: PROCESS_ID };
}

function requireText(value: string | undefined, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new AppError('FIELD_REQUIRED', `The field ${field} is required.`, 400, { field });
  }
  return value;
}

function requireActor(ctx: RequestContext, ruleId: string): string {
  const actor = ctx.sessionContext.person?.mdmId;
  if (actor === undefined || actor === '') {
    throw new AppError('ACTOR_NOT_RESOLVED', 'The session has no team member who can act on the task.', 403, { ruleId });
  }
  return actor;
}

function isGestor(ctx: RequestContext): boolean {
  const scope = ctx.sessionContext.actorScope ?? [];
  if (ctx.sessionContext.actorId === 'gestor') return true;
  return scope.some((entry) => entry === 'gestor' || entry.endsWith(':gestor'));
}

function writableDetails(tarefa: Tarefa): UpdateTarefaInput['details'] {
  const d = tarefa.details;
  return {
    ...(d.descricao !== undefined ? { descricao: d.descricao } : {}),
    ...(d.motivoDevolucao !== undefined ? { motivoDevolucao: d.motivoDevolucao } : {}),
    ...(d.devolvidaEm !== undefined ? { devolvidaEm: d.devolvidaEm } : {}),
    ...(d.concluidaEm !== undefined ? { concluidaEm: d.concluidaEm } : {}),
    ...(d.canceladaEm !== undefined ? { canceladaEm: d.canceladaEm } : {}),
  };
}

async function findOccurrence(ctx: RequestContext, tarefaId: string): Promise<TaskOccurrence> {
  const occurrence = await taskOccurrence.find(ctx, refOf(tarefaId));
  if (occurrence === null) {
    throw new AppError('OCCURRENCE_NOT_FOUND', `The task ${tarefaId} has no open occurrence of the process ${PROCESS_ID}.`, 404);
  }
  return occurrence;
}

// ---------------------------------------------------------------------------------------------
// resolverQuemAgeAgora
// ---------------------------------------------------------------------------------------------

export interface ResolverQuemAgeAgoraInput {
  tarefaId: string;
  etapa: string;
}

export interface ResolverQuemAgeAgoraOutput {
  quemAgeId: string;
}

export async function resolverQuemAgeAgora(input: ResolverQuemAgeAgoraInput, ctx: RequestContext): Promise<ResolverQuemAgeAgoraOutput> {
  const tarefaId = requireText(input.tarefaId, 'tarefaId');
  const etapa = requireText(input.etapa, 'etapa');
  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const tarefa = await repository.get(tarefaId);
  if (RESPONSAVEL_STEPS.includes(etapa)) return { quemAgeId: tarefa.responsavelId };
  if (CRIADOR_STEPS.includes(etapa)) return { quemAgeId: tarefa.criadorId };
  throw new AppError('STEP_UNKNOWN', `The step ${etapa} does not belong to the process ${PROCESS_ID}.`, 400);
}

// ---------------------------------------------------------------------------------------------
// abrirOcorrenciaTarefa
// ---------------------------------------------------------------------------------------------

export interface AbrirOcorrenciaTarefaInput {
  titulo: string;
  prioridade: Tarefa['prioridade'];
  prazo: string;
  listaId: string;
  responsavelId: string;
  tarefaPaiId?: string;
  chaveCriacao: string;
  details?: { descricao?: string };
}

export interface AbrirOcorrenciaTarefaOutput {
  tarefa: Tarefa;
  task: TaskOccurrence;
}

export async function abrirOcorrenciaTarefa(input: AbrirOcorrenciaTarefaInput, ctx: RequestContext): Promise<AbrirOcorrenciaTarefaOutput> {
  const key = ctx.requestMeta?.requestId;
  if (key === undefined || key === '') {
    throw new AppError('IDEMPOTENCY_KEY_REQUIRED', 'The request has no requestId to use as the idempotency key.', 400, { ruleId: 'criacaoIdempotente' });
  }
  const titulo = requireText(input.titulo, 'titulo');
  const prazo = requireText(input.prazo, 'prazo');
  const listaId = requireText(input.listaId, 'listaId');
  const responsavelId = requireText(input.responsavelId, 'responsavelId');
  const chaveCriacao = requireText(input.chaveCriacao, 'chaveCriacao');
  if (!PRIORIDADES.includes(input.prioridade)) {
    throw new AppError('PRIORIDADE_INVALID', 'The priority must be low, medium or high.', 400);
  }

  const tarefas = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  // Same key again: the task already written is returned; only what is missing (the Task) is finished.
  const existing = (await tarefas.list({ chaveCriacao })).find((t) => t.chaveCriacao === chaveCriacao);
  if (existing !== undefined) {
    const task = await taskOccurrence.open(
      ctx,
      { ...refOf(existing.id), workflowVersion: WORKFLOW_VERSION },
      STEP_AGUARDAR_INICIO,
      existing.responsavelId,
      key,
    );
    return { tarefa: existing, task };
  }

  const criadorId = requireActor(ctx, 'criacaoIdempotente');

  const listas = resolveRepository<ListaRepository>(ctx, 'ListaRepository');
  const lista = await listas.get(listaId);
  if (!lista.ativa) {
    throw new AppError('LISTA_INATIVA', 'An inactive list cannot receive new tasks.', 409, { ruleId: 'listaInativaNaoRecebeTarefa' });
  }

  // The active-member check of the responsible (responsavelDeveSerMembroAtivo) is applied by the usecase.
  const created = await createTarefa(
    {
      titulo,
      status: 'aFazer',
      prioridade: input.prioridade,
      prazo,
      listaId,
      responsavelId,
      criadorId,
      chaveCriacao,
      ...(input.tarefaPaiId !== undefined ? { tarefaPaiId: input.tarefaPaiId } : {}),
      details: input.details?.descricao !== undefined ? { descricao: input.details.descricao } : {},
    },
    ctx,
  );

  const tarefa = await tarefas.get(created.id);
  const task = await taskOccurrence.open(
    ctx,
    { ...refOf(tarefa.id), workflowVersion: WORKFLOW_VERSION },
    STEP_AGUARDAR_INICIO,
    tarefa.responsavelId,
    key,
  );
  return { tarefa, task };
}

// ---------------------------------------------------------------------------------------------
// avancarEtapaTarefa
// ---------------------------------------------------------------------------------------------

export interface AvancarEtapaTarefaInput {
  id: string;
  transicao: 'iniciar' | 'enviarParaRevisao' | 'aceitar' | 'devolver' | 'cancelar';
  motivoDevolucao?: string;
}

export interface AvancarEtapaTarefaOutput {
  tarefa: Tarefa;
  task: TaskOccurrence;
}

async function applyTransition(
  transicao: TransitionId,
  tarefa: Tarefa,
  motivoDevolucao: string | undefined,
  ctx: RequestContext,
): Promise<void> {
  const base = { id: tarefa.id, version: tarefa.version };
  switch (transicao) {
    case 'iniciar':
      await iniciar(base, ctx);
      return;
    case 'enviarParaRevisao':
      await enviarParaRevisao(base, ctx);
      return;
    case 'aceitar':
      await aceitar(base, ctx);
      return;
    case 'devolver':
      await devolver({ ...base, details: { motivoDevolucao: requireText(motivoDevolucao, 'motivoDevolucao') } }, ctx);
      return;
    case 'cancelar':
      await cancelar(base, ctx);
      return;
  }
}

export async function avancarEtapaTarefa(input: AvancarEtapaTarefaInput, ctx: RequestContext): Promise<AvancarEtapaTarefaOutput> {
  const id = requireText(input.id, 'id');
  const transicaoName: string = input.transicao;
  if (!isTransitionId(transicaoName)) {
    throw new AppError('TRANSITION_UNKNOWN', `The transition ${transicaoName} is not part of the process.`, 400);
  }
  const rule = TRANSITIONS[transicaoName];
  if (transicaoName === 'devolver') {
    if (input.motivoDevolucao === undefined || input.motivoDevolucao.trim() === '') {
      throw new AppError('MOTIVO_REQUIRED', 'Returning a task requires the reason.', 400, { ruleId: 'devolucaoExigeMotivo' });
    }
  }

  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const tarefa = await repository.get(id);
  const occurrence = await findOccurrence(ctx, id);

  const actor = requireActor(ctx, rule.ruleId);
  const allowed =
    rule.who === 'responsavel'
      ? actor === tarefa.responsavelId
      : rule.who === 'criador'
        ? actor === tarefa.criadorId
        : actor === tarefa.criadorId || isGestor(ctx);
  if (!allowed) {
    throw new AppError('ACTOR_NOT_ALLOWED', `The caller cannot apply ${transicaoName} on this task.`, 403, { ruleId: rule.ruleId });
  }

  // Already applied and the Task already moved: nothing to do, the current state is returned.
  if (tarefa.status === rule.toStatus && occurrence.step === rule.toStep) {
    return { tarefa, task: occurrence };
  }

  if (!rule.fromSteps.includes(occurrence.step)) {
    throw new AppError(
      'STEP_CONFLICT',
      `The occurrence is in the step ${occurrence.step}, which does not accept ${transicaoName}.`,
      409,
      { ruleId: rule.ruleId },
    );
  }

  if (rule.fromStatus.includes(tarefa.status)) {
    await applyTransition(transicaoName, tarefa, input.motivoDevolucao, ctx);
  } else if (tarefa.status !== rule.toStatus) {
    const ruleId = tarefa.status === 'concluida' || tarefa.status === 'cancelada' ? 'tarefaEncerradaNaoTransiciona' : rule.ruleId;
    throw new AppError(
      'STATE_CONFLICT',
      `The task is ${tarefa.status} and cannot receive ${transicaoName}.`,
      409,
      { ruleId },
    );
  }
  // else: the record already carries the target status (a previous call stopped before the Task moved): finish the Task.

  const path: string[] =
    transicaoName === 'enviarParaRevisao' && occurrence.step === STEP_AGUARDAR_AJUSTE
      ? [STEP_RETOMAR, rule.toStep]
      : [rule.toStep];

  let task = occurrence;
  for (const step of path) {
    const { quemAgeId } = await resolverQuemAgeAgora({ tarefaId: id, etapa: step }, ctx);
    task = await taskOccurrence.advance(ctx, refOf(id), step, quemAgeId);
  }

  return { tarefa: await repository.get(id), task };
}

// ---------------------------------------------------------------------------------------------
// reatribuirQuemAge
// ---------------------------------------------------------------------------------------------

export interface ReatribuirQuemAgeInput {
  id: string;
  responsavelId: string;
}

export interface ReatribuirQuemAgeOutput {
  tarefa: Tarefa;
  task: TaskOccurrence;
}

export async function reatribuirQuemAge(input: ReatribuirQuemAgeInput, ctx: RequestContext): Promise<ReatribuirQuemAgeOutput> {
  const id = requireText(input.id, 'id');
  const novoResponsavelId = requireText(input.responsavelId, 'responsavelId');

  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const tarefa = await repository.get(id);
  const occurrence = await findOccurrence(ctx, id);

  const actor = requireActor(ctx, 'reatribuicaoPorCriadorOuGestor');
  if (actor !== tarefa.criadorId && !isGestor(ctx)) {
    throw new AppError('ACTOR_NOT_ALLOWED', 'Only the creator or the manager can change the responsible.', 403, {
      ruleId: 'reatribuicaoPorCriadorOuGestor',
    });
  }
  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('STATE_CONFLICT', `The task is ${tarefa.status} and cannot be reassigned.`, 409, {
      ruleId: 'tarefaEncerradaNaoTransiciona',
    });
  }

  const responsavelTurn = RESPONSAVEL_STEPS.includes(occurrence.step);

  if (tarefa.responsavelId !== novoResponsavelId) {
    // The active-member check of the new responsible (responsavelDeveSerMembroAtivo) is applied by the usecase.
    const payload: UpdateTarefaInput = {
      id: tarefa.id,
      version: tarefa.version,
      titulo: tarefa.titulo,
      status: tarefa.status,
      prioridade: tarefa.prioridade,
      prazo: tarefa.prazo,
      listaId: tarefa.listaId,
      responsavelId: novoResponsavelId,
      criadorId: tarefa.criadorId,
      chaveCriacao: tarefa.chaveCriacao,
      ...(tarefa.tarefaPaiId !== undefined ? { tarefaPaiId: tarefa.tarefaPaiId } : {}),
      details: writableDetails(tarefa),
    };
    await updateTarefa(payload, ctx);
  }

  // Record written; the Task follows. A repeated call finds the record done and only finishes the Task.
  let task = occurrence;
  if (responsavelTurn && occurrence.actorNow !== novoResponsavelId) {
    task = await taskOccurrence.advance(ctx, refOf(id), occurrence.step, novoResponsavelId);
  }

  return { tarefa: await repository.get(id), task };
}
