/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { taskOccurrence, type OccurrenceRef, type TaskOccurrence } from '/_102047_/l1/tarefas/layer_1_external/adapters/workflow/taskOccurrence.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import { createTarefa, type CreateTarefaInput } from '/_102047_/l1/tarefas/layer_2_application/usecases/createTarefa.js';
import { updateTarefa, type UpdateTarefaInput } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.js';
import { iniciar } from '/_102047_/l1/tarefas/layer_2_application/usecases/iniciar.js';
import { enviarParaRevisao } from '/_102047_/l1/tarefas/layer_2_application/usecases/enviarParaRevisao.js';
import { aceitar } from '/_102047_/l1/tarefas/layer_2_application/usecases/aceitar.js';
import { devolver } from '/_102047_/l1/tarefas/layer_2_application/usecases/devolver.js';
import { cancelar } from '/_102047_/l1/tarefas/layer_2_application/usecases/cancelar.js';

// Posting to the task-room / thread and notifying the person are not reachable from the ports
// and platform files this module gives to the workflow service; the progress (step, actorNow,
// history) is what this service records, through taskOccurrence.

const PROJECT = 102047;
const MODULE = 'tarefas';
const ENTITY = 'Tarefa';
const PROCESS_ID = 'cicloTarefa';
const WORKFLOW_VERSION = '1';

type TarefaStatus = Tarefa['status'];
export type TransicaoTarefa = 'iniciar' | 'enviarParaRevisao' | 'aceitar' | 'devolver' | 'cancelar';

type OccurrenceKey = Omit<OccurrenceRef, 'workflowVersion'>;

const STEP_AGUARDAR_INICIO = 'aguardarInicio';
const STEP_EXECUTAR = 'executar';
const STEP_REVISAR = 'revisar';
const STEP_AGUARDAR_AJUSTE = 'aguardarAjuste';
const STEP_RETOMAR = 'retomar';
const STEP_CONCLUIDA = 'concluida';
const STEP_CANCELAR_CRIADOR = 'cancelarCriador';
const STEP_CANCELAR_GESTOR = 'cancelarGestor';

const TERMINAL_STEPS: readonly string[] = [STEP_CONCLUIDA, STEP_CANCELAR_CRIADOR, STEP_CANCELAR_GESTOR];

interface TransitionSpec {
  from: readonly TarefaStatus[];
  to: TarefaStatus;
  fromSteps: readonly string[];
  doneSteps: readonly string[];
}

const TRANSITIONS: Record<TransicaoTarefa, TransitionSpec> = {
  iniciar: {
    from: ['aFazer'],
    to: 'emAndamento',
    fromSteps: [STEP_AGUARDAR_INICIO],
    doneSteps: [STEP_EXECUTAR],
  },
  enviarParaRevisao: {
    from: ['emAndamento'],
    to: 'emRevisao',
    fromSteps: [STEP_EXECUTAR, STEP_AGUARDAR_AJUSTE, STEP_RETOMAR],
    doneSteps: [STEP_REVISAR],
  },
  aceitar: {
    from: ['emRevisao'],
    to: 'concluida',
    fromSteps: [STEP_REVISAR],
    doneSteps: [STEP_CONCLUIDA],
  },
  devolver: {
    from: ['emRevisao'],
    to: 'emAndamento',
    fromSteps: [STEP_REVISAR],
    doneSteps: [STEP_AGUARDAR_AJUSTE],
  },
  cancelar: {
    from: ['aFazer', 'emAndamento', 'emRevisao'],
    to: 'cancelada',
    fromSteps: [STEP_AGUARDAR_INICIO, STEP_EXECUTAR, STEP_REVISAR, STEP_AGUARDAR_AJUSTE, STEP_RETOMAR],
    doneSteps: [STEP_CANCELAR_CRIADOR, STEP_CANCELAR_GESTOR],
  },
};

const PRIORIDADES: readonly string[] = ['low', 'medium', 'high'];

// ---------------------------------------------------------------- helpers

function occurrenceKey(recordId: string): OccurrenceKey {
  return { project: PROJECT, module: MODULE, entity: ENTITY, recordId, processId: PROCESS_ID };
}

function requireText(value: unknown, field: string, ruleId: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new AppError('INVALID_INPUT', `The field ${field} is required.`, 400, { ruleId });
  }
  return value;
}

function callerId(ctx: RequestContext): string {
  const id = ctx.sessionContext.person?.mdmId;
  if (id === undefined || id === '') {
    throw new AppError('CALLER_NOT_IDENTIFIED', 'The caller is not identified as a team member.', 403, { ruleId: 'somenteResponsavelExecuta' });
  }
  return id;
}

function isGestor(ctx: RequestContext): boolean {
  const scope: string[] = [...(ctx.sessionContext.actorScope ?? []), ...(ctx.sessionContext.actorSession.scope ?? [])];
  const actorId = ctx.sessionContext.actorId ?? ctx.sessionContext.actorSession.actorId;
  return actorId === 'gestor' || actorId === 'tarefas:gestor' || scope.includes('gestor') || scope.includes('tarefas:gestor');
}

function tarefaRepository(ctx: RequestContext): TarefaRepository {
  return resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
}

async function requireOccurrence(ctx: RequestContext, recordId: string): Promise<TaskOccurrence> {
  const occurrence = await taskOccurrence.find(ctx, occurrenceKey(recordId));
  if (occurrence === null) {
    throw new AppError('OCCURRENCE_NOT_FOUND', `No occurrence of ${PROCESS_ID} was opened for the task ${recordId}.`, 404, { ruleId: 'criacaoIdempotente' });
  }
  return occurrence;
}

function detailsForUpdate(details: Tarefa['details']): UpdateTarefaInput['details'] {
  const out: UpdateTarefaInput['details'] = {};
  if (details.descricao !== undefined) out.descricao = details.descricao;
  if (details.motivoDevolucao !== undefined) out.motivoDevolucao = details.motivoDevolucao;
  if (details.devolvidaEm !== undefined) out.devolvidaEm = details.devolvidaEm;
  if (details.concluidaEm !== undefined) out.concluidaEm = details.concluidaEm;
  if (details.canceladaEm !== undefined) out.canceladaEm = details.canceladaEm;
  return out;
}

// ---------------------------------------------------------------- resolverQuemAgeAgora

export interface ResolverQuemAgeAgoraInput {
  etapa: string;
  responsavelId: string;
  criadorId: string;
}

export interface ResolverQuemAgeAgoraOutput {
  quemAgeAgora: string;
}

export async function resolverQuemAgeAgora(input: ResolverQuemAgeAgoraInput, ctx: RequestContext): Promise<ResolverQuemAgeAgoraOutput> {
  void ctx;
  const etapa = requireText(input.etapa, 'etapa', 'somenteResponsavelExecuta');
  const responsavelId = requireText(input.responsavelId, 'responsavelId', 'somenteResponsavelExecuta');
  const criadorId = requireText(input.criadorId, 'criadorId', 'somenteCriadorRevisa');
  if (etapa === STEP_AGUARDAR_INICIO || etapa === STEP_EXECUTAR || etapa === STEP_RETOMAR || etapa === STEP_AGUARDAR_AJUSTE) {
    return { quemAgeAgora: responsavelId };
  }
  if (etapa === STEP_REVISAR) {
    return { quemAgeAgora: criadorId };
  }
  throw new AppError('STEP_HAS_NO_ACTOR', `The step ${etapa} has no person who acts now.`, 400, { ruleId: 'somenteResponsavelExecuta' });
}

// ---------------------------------------------------------------- abrirOcorrenciaTarefa

export interface AbrirOcorrenciaTarefaInput {
  titulo: string;
  prioridade: string;
  prazo: string;
  listaId: string;
  responsavelId: string;
  tarefaPaiId?: string;
  chaveCriacao: string;
  details?: {
    descricao?: string;
  };
}

export interface AbrirOcorrenciaTarefaOutput {
  tarefa: Tarefa;
  task: TaskOccurrence;
}

export async function abrirOcorrenciaTarefa(input: AbrirOcorrenciaTarefaInput, ctx: RequestContext): Promise<AbrirOcorrenciaTarefaOutput> {
  const key = ctx.requestMeta?.requestId;
  if (key === undefined || key === '') {
    throw new AppError('IDEMPOTENCY_KEY_REQUIRED', 'The request has no idempotency key (requestId).', 400, { ruleId: 'criacaoIdempotente' });
  }
  const titulo = requireText(input.titulo, 'titulo', 'criacaoIdempotente');
  const prazo = requireText(input.prazo, 'prazo', 'criacaoIdempotente');
  const listaId = requireText(input.listaId, 'listaId', 'listaInativaNaoRecebeTarefa');
  const responsavelId = requireText(input.responsavelId, 'responsavelId', 'responsavelDeveSerMembroAtivo');
  const chaveCriacao = requireText(input.chaveCriacao, 'chaveCriacao', 'criacaoIdempotente');
  const prioridade = requireText(input.prioridade, 'prioridade', 'criacaoIdempotente');
  if (!PRIORIDADES.includes(prioridade)) {
    throw new AppError('INVALID_PRIORITY', `The priority ${prioridade} is not low, medium or high.`, 400, { ruleId: 'criacaoIdempotente' });
  }

  const repository = tarefaRepository(ctx);

  // The record the same creation key already wrote (a retry) is reused, never created twice.
  const existing = (await repository.list({ chaveCriacao })).find((t) => t.chaveCriacao === chaveCriacao);

  let tarefa: Tarefa;
  if (existing !== undefined) {
    tarefa = existing;
    const opened = await taskOccurrence.find(ctx, occurrenceKey(tarefa.id));
    if (opened !== null) {
      return { tarefa, task: opened };
    }
  } else {
    const listaRepository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');
    const lista = await listaRepository.get(listaId);
    if (!lista.ativa) {
      throw new AppError('LIST_INACTIVE', 'An inactive list cannot receive new tasks.', 409, { ruleId: 'listaInativaNaoRecebeTarefa' });
    }
    // The usecase applies the active-member rule of the responsible person and the creator of the session.
    const createInput: CreateTarefaInput = { titulo, prioridade, prazo, listaId, responsavelId, chaveCriacao };
    if (input.tarefaPaiId !== undefined) createInput.tarefaPaiId = input.tarefaPaiId;
    if (input.details !== undefined) createInput.details = input.details;
    const created = await createTarefa(createInput, ctx);
    tarefa = await repository.get(created.id);
  }

  const ref: OccurrenceRef = { ...occurrenceKey(tarefa.id), workflowVersion: WORKFLOW_VERSION };
  const { quemAgeAgora } = await resolverQuemAgeAgora(
    { etapa: STEP_AGUARDAR_INICIO, responsavelId: tarefa.responsavelId, criadorId: tarefa.criadorId },
    ctx,
  );
  const task = await taskOccurrence.open(ctx, ref, STEP_AGUARDAR_INICIO, quemAgeAgora, key);
  return { tarefa, task };
}

// ---------------------------------------------------------------- avancarEtapaTarefa

export interface AvancarEtapaTarefaInput {
  tarefaId: string;
  transicao: TransicaoTarefa;
  motivoDevolucao?: string;
}

export interface AvancarEtapaTarefaOutput {
  tarefa: Tarefa;
  task: TaskOccurrence;
}

function stepsAfter(transicao: TransicaoTarefa, currentStep: string, byCreator: boolean): string[] {
  switch (transicao) {
    case 'iniciar':
      return [STEP_EXECUTAR];
    case 'enviarParaRevisao':
      return currentStep === STEP_AGUARDAR_AJUSTE ? [STEP_RETOMAR, STEP_REVISAR] : [STEP_REVISAR];
    case 'aceitar':
      return [STEP_CONCLUIDA];
    case 'devolver':
      return [STEP_AGUARDAR_AJUSTE];
    case 'cancelar':
      return [byCreator ? STEP_CANCELAR_CRIADOR : STEP_CANCELAR_GESTOR];
  }
}

function assertCallerMayApply(transicao: TransicaoTarefa, tarefa: Tarefa, caller: string, ctx: RequestContext): void {
  if (transicao === 'iniciar' || transicao === 'enviarParaRevisao') {
    if (caller !== tarefa.responsavelId) {
      throw new AppError('ONLY_RESPONSIBLE_EXECUTES', 'Only the responsible person can start the task or send it to review.', 403, { ruleId: 'somenteResponsavelExecuta' });
    }
    return;
  }
  if (transicao === 'aceitar' || transicao === 'devolver') {
    if (caller !== tarefa.criadorId) {
      throw new AppError('ONLY_CREATOR_REVIEWS', 'Only the creator of the task can accept or return it.', 403, { ruleId: 'somenteCriadorRevisa' });
    }
    return;
  }
  if (caller !== tarefa.criadorId && !isGestor(ctx)) {
    throw new AppError('ONLY_CREATOR_OR_MANAGER_CANCELS', 'Only the creator or the manager can cancel the task.', 403, { ruleId: 'cancelamentoPorCriadorOuGestor' });
  }
}

export async function avancarEtapaTarefa(input: AvancarEtapaTarefaInput, ctx: RequestContext): Promise<AvancarEtapaTarefaOutput> {
  const tarefaId = requireText(input.tarefaId, 'tarefaId', 'tarefaEncerradaNaoTransiciona');
  const transicao = input.transicao;
  const spec: TransitionSpec | undefined = TRANSITIONS[transicao];
  if (spec === undefined) {
    throw new AppError('UNKNOWN_TRANSITION', `The transition ${String(transicao)} does not exist.`, 400, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }
  let motivo = '';
  if (transicao === 'devolver') {
    motivo = requireText(input.motivoDevolucao, 'motivoDevolucao', 'devolucaoExigeMotivo').trim();
  }

  const caller = callerId(ctx);
  const repository = tarefaRepository(ctx);
  const tarefa = await repository.get(tarefaId);
  const occurrence = await requireOccurrence(ctx, tarefaId);
  assertCallerMayApply(transicao, tarefa, caller, ctx);

  let mustApply = false;
  if (tarefa.status === spec.to) {
    if (spec.doneSteps.includes(occurrence.step)) {
      // Already applied and recorded: nothing to do.
      return { tarefa, task: occurrence };
    }
    if (!spec.fromSteps.includes(occurrence.step)) {
      throw new AppError('STEP_CONFLICT', `The task is in ${tarefa.status} but its occurrence is in the step ${occurrence.step}.`, 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
    }
    // The record already has the transition; only the Task is behind and is finished below.
  } else if (spec.from.includes(tarefa.status)) {
    if (!spec.fromSteps.includes(occurrence.step)) {
      throw new AppError('STEP_CONFLICT', `The occurrence is in the step ${occurrence.step}, which does not allow ${transicao}.`, 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
    }
    mustApply = true;
  } else {
    throw new AppError('TRANSITION_NOT_ALLOWED', `The transition ${transicao} is not allowed from ${tarefa.status}.`, 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }

  if (mustApply) {
    const base = { id: tarefa.id, version: tarefa.version };
    switch (transicao) {
      case 'iniciar':
        await iniciar(base, ctx);
        break;
      case 'enviarParaRevisao':
        await enviarParaRevisao(base, ctx);
        break;
      case 'aceitar':
        await aceitar(base, ctx);
        break;
      case 'devolver':
        await devolver({ ...base, details: { motivoDevolucao: motivo } }, ctx);
        break;
      case 'cancelar':
        await cancelar(base, ctx);
        break;
    }
  }

  const updated = await repository.get(tarefaId);
  const ref = occurrenceKey(tarefaId);
  const steps = stepsAfter(transicao, occurrence.step, caller === tarefa.criadorId);
  let task = occurrence;
  for (const step of steps) {
    let actorNow = caller;
    if (!TERMINAL_STEPS.includes(step)) {
      const resolved = await resolverQuemAgeAgora(
        { etapa: step, responsavelId: updated.responsavelId, criadorId: updated.criadorId },
        ctx,
      );
      actorNow = resolved.quemAgeAgora;
    }
    task = await taskOccurrence.advance(ctx, ref, step, actorNow);
  }
  return { tarefa: updated, task };
}

// ---------------------------------------------------------------- reatribuirQuemAge

export interface ReatribuirQuemAgeInput {
  tarefaId: string;
  novoResponsavelId: string;
}

export interface ReatribuirQuemAgeOutput {
  tarefa: Tarefa;
  task: TaskOccurrence;
}

export async function reatribuirQuemAge(input: ReatribuirQuemAgeInput, ctx: RequestContext): Promise<ReatribuirQuemAgeOutput> {
  const tarefaId = requireText(input.tarefaId, 'tarefaId', 'reatribuicaoPorCriadorOuGestor');
  const novoResponsavelId = requireText(input.novoResponsavelId, 'novoResponsavelId', 'responsavelDeveSerMembroAtivo');

  const caller = callerId(ctx);
  const repository = tarefaRepository(ctx);
  const tarefa = await repository.get(tarefaId);
  const occurrence = await requireOccurrence(ctx, tarefaId);

  if (caller !== tarefa.criadorId && !isGestor(ctx)) {
    throw new AppError('ONLY_CREATOR_OR_MANAGER_REASSIGNS', 'Only the creator or the manager can change the responsible person.', 403, { ruleId: 'reatribuicaoPorCriadorOuGestor' });
  }
  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A completed or cancelled task cannot be reassigned.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }

  const responsibleTurn = occurrence.step !== STEP_REVISAR;
  const ref = occurrenceKey(tarefaId);

  if (tarefa.responsavelId === novoResponsavelId) {
    // Same responsible person: no new write and no new notice. Only a Task left behind by an
    // earlier call (still pointing at the previous person) is finished.
    if (responsibleTurn && occurrence.actorNow !== novoResponsavelId) {
      const task = await taskOccurrence.advance(ctx, ref, occurrence.step, novoResponsavelId);
      return { tarefa, task };
    }
    return { tarefa, task: occurrence };
  }

  // The usecase applies the rule that the new responsible person is an active team member.
  const updateInput: UpdateTarefaInput = {
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
    details: detailsForUpdate(tarefa.details),
  };
  if (tarefa.tarefaPaiId !== undefined) updateInput.tarefaPaiId = tarefa.tarefaPaiId;
  await updateTarefa(updateInput, ctx);

  const updated = await repository.get(tarefaId);
  const actorNow = responsibleTurn ? novoResponsavelId : occurrence.actorNow;
  const task = await taskOccurrence.advance(ctx, ref, occurrence.step, actorNow);
  return { tarefa: updated, task };
}
