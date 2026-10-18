/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { createOccurrenceContext, occurrenceRecordId } from '/_102034_/l1/workflow/index.js';
import type { OccurrenceKey, OccurrenceSnapshot, OccurrenceHistoryEntry } from '/_102034_/l1/workflow/index.js';
import { engines, workflowTables, transitionTo } from '/_102047_/l1/tarefas/layer_1_external/adapters/workflow/engine.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import { createTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/createTarefa.js';
import type { CreateTarefaInput } from '/_102047_/l1/tarefas/layer_2_application/usecases/createTarefa.js';
import { updateTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.js';
import type { UpdateTarefaInput } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.js';
import { iniciar } from '/_102047_/l1/tarefas/layer_2_application/usecases/iniciar.js';
import { enviarParaRevisao } from '/_102047_/l1/tarefas/layer_2_application/usecases/enviarParaRevisao.js';
import { aceitar } from '/_102047_/l1/tarefas/layer_2_application/usecases/aceitar.js';
import { devolver } from '/_102047_/l1/tarefas/layer_2_application/usecases/devolver.js';
import { cancelar } from '/_102047_/l1/tarefas/layer_2_application/usecases/cancelar.js';

const PROCESS_ID = 'cicloTarefa';
const MODULE_ID = 'tarefas';
const ENTITY_ID = 'Tarefa';
const FIRST_STEP = 'aguardarInicio';

export type TransicaoTarefa = 'iniciar' | 'enviarParaRevisao' | 'aceitar' | 'devolver' | 'cancelar';

export interface TaskView {
  etapa: string;
  quemAgeId: string | null;
  concluida: boolean;
  historico: OccurrenceHistoryEntry[];
}

export interface AbrirOcorrenciaTarefaInput {
  chaveCriacao: string;
  titulo: string;
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  listaId: string;
  responsavelId: string;
  tarefaPaiId?: string;
  descricao?: string;
}

export interface AbrirOcorrenciaTarefaOutput {
  tarefa: Tarefa;
  task: TaskView;
}

export interface AvancarEtapaTarefaInput {
  id: string;
  transicao: TransicaoTarefa;
  motivoDevolucao?: string;
}

export interface AvancarEtapaTarefaOutput {
  tarefa: Tarefa;
  task: TaskView;
}

export interface ReatribuirQuemAgeInput {
  id: string;
  novoResponsavelId: string;
}

export interface ReatribuirQuemAgeOutput {
  tarefa: Tarefa;
  task: TaskView;
}

export interface ResolverQuemAgeAgoraInput {
  etapa: string;
  responsavelId: string;
  criadorId: string;
}

export interface ResolverQuemAgeAgoraOutput {
  quemAgeId: string;
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function tarefaRepository(ctx: RequestContext): TarefaRepository {
  return resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
}

function listaRepository(ctx: RequestContext): ListaRepository {
  return resolveRepository<ListaRepository>(ctx, 'ListaRepository');
}

function actorIdOf(ctx: RequestContext): string {
  const person = ctx.sessionContext.person;
  if (person === undefined || person.mdmId.trim() === '') {
    throw new AppError('ACTOR_REQUIRED', 'The caller must be an identified person of the team', 403);
  }
  return person.mdmId;
}

function isGestor(ctx: RequestContext): boolean {
  const scopes: string[] = [
    ...(ctx.sessionContext.actorScope ?? []),
    ...(ctx.sessionContext.actorSession.scope ?? []),
  ];
  return scopes.some((s) => s === 'gestor' || s === `${MODULE_ID}:gestor`);
}

function requireText(value: string | undefined, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new AppError('FIELD_REQUIRED', `The field ${field} is required`, 400);
  }
  return value;
}

function keyFor(ctx: RequestContext, recordId: string): OccurrenceKey {
  const project = ctx.sessionContext.project.projectId;
  if (project === undefined || project === '') {
    throw new AppError('PROJECT_REQUIRED', 'The request context has no project', 400);
  }
  return { project, module: MODULE_ID, processId: PROCESS_ID, entity: ENTITY_ID, recordId };
}

function viewOf(snapshot: OccurrenceSnapshot): TaskView {
  return {
    etapa: snapshot.step,
    quemAgeId: snapshot.actorNow,
    concluida: snapshot.done,
    historico: snapshot.history,
  };
}

function destinationOf(transicao: TransicaoTarefa): string {
  const full = transitionTo[`${ENTITY_ID}.${transicao}`];
  const destination = full !== undefined ? full : transitionTo[transicao];
  if (destination === undefined) {
    throw new AppError('DESTINATION_UNKNOWN', `The engine has no destination status for ${transicao}`, 500);
  }
  return destination;
}

function detailsOf(tarefa: Tarefa): UpdateTarefaInput['details'] {
  const details: UpdateTarefaInput['details'] = {};
  const d = tarefa.details;
  if (d.descricao !== undefined) details.descricao = d.descricao;
  if (d.motivoDevolucao !== undefined) details.motivoDevolucao = d.motivoDevolucao;
  if (d.devolvidaEm !== undefined) details.devolvidaEm = d.devolvidaEm;
  if (d.concluidaEm !== undefined) details.concluidaEm = d.concluidaEm;
  if (d.canceladaEm !== undefined) details.canceladaEm = d.canceladaEm;
  return details;
}

/** Steps the occurrence goes through for a transition, from the step it is in. Null when the step does not accept it. */
function routeOf(transicao: TransicaoTarefa, step: string, cancelStep: string): string[] | null {
  switch (transicao) {
    case 'iniciar':
      return step === 'aguardarInicio' ? ['executar'] : null;
    case 'enviarParaRevisao':
      if (step === 'executar' || step === 'retomar') return ['revisar'];
      if (step === 'aguardarAjuste') return ['retomar', 'revisar'];
      return null;
    case 'aceitar':
      return step === 'revisar' ? ['end'] : null;
    case 'devolver':
      return step === 'revisar' ? ['aguardarAjuste'] : null;
    case 'cancelar':
      return ['aguardarInicio', 'executar', 'aguardarAjuste', 'retomar', 'revisar'].includes(step)
        ? [cancelStep, 'end']
        : null;
  }
}

function checkActor(transicao: TransicaoTarefa, tarefa: Tarefa, ctx: RequestContext): void {
  const actor = actorIdOf(ctx);
  if (transicao === 'iniciar' || transicao === 'enviarParaRevisao') {
    if (actor !== tarefa.responsavelId) {
      throw new AppError('ONLY_RESPONSIBLE_EXECUTES', 'Only the responsible person can start or send the task for review', 403, {
        ruleId: 'somenteResponsavelExecuta',
      });
    }
    return;
  }
  if (transicao === 'aceitar' || transicao === 'devolver') {
    if (actor !== tarefa.criadorId) {
      throw new AppError('ONLY_CREATOR_REVIEWS', 'Only the creator can accept or return the task', 403, {
        ruleId: 'somenteCriadorRevisa',
      });
    }
    return;
  }
  if (actor !== tarefa.criadorId && !isGestor(ctx)) {
    throw new AppError('ONLY_CREATOR_OR_MANAGER_CANCELS', 'Only the creator or the manager can cancel the task', 403, {
      ruleId: 'cancelamentoPorCriadorOuGestor',
    });
  }
}

async function applyUsecase(
  transicao: TransicaoTarefa,
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
      await devolver({ ...base, details: { motivoDevolucao } }, ctx);
      return;
    case 'cancelar':
      await cancelar(base, ctx);
      return;
  }
}

async function actorForStep(step: string, tarefa: Tarefa, ctx: RequestContext): Promise<string | null> {
  if (step === 'end') return null;
  if (step === 'cancelarCriador' || step === 'cancelarGestor') return actorIdOf(ctx);
  const resolved = await resolverQuemAgeAgora(
    { etapa: step, responsavelId: tarefa.responsavelId, criadorId: tarefa.criadorId },
    ctx,
  );
  return resolved.quemAgeId;
}

// ---------------------------------------------------------------------------
// functions
// ---------------------------------------------------------------------------

export async function resolverQuemAgeAgora(
  input: ResolverQuemAgeAgoraInput,
  _ctx: RequestContext,
): Promise<ResolverQuemAgeAgoraOutput> {
  const responsavelId = requireText(input.responsavelId, 'responsavelId');
  const criadorId = requireText(input.criadorId, 'criadorId');
  switch (input.etapa) {
    case 'aguardarInicio':
    case 'executar':
    case 'aguardarAjuste':
    case 'retomar':
      return { quemAgeId: responsavelId };
    case 'revisar':
      return { quemAgeId: criadorId };
    default:
      throw new AppError('STEP_UNKNOWN', `The step ${String(input.etapa)} has no person who acts`, 400);
  }
}

export async function abrirOcorrenciaTarefa(
  input: AbrirOcorrenciaTarefaInput,
  ctx: RequestContext,
): Promise<AbrirOcorrenciaTarefaOutput> {
  const chaveCriacao = requireText(input.chaveCriacao, 'chaveCriacao');
  const titulo = requireText(input.titulo, 'titulo');
  const prazo = requireText(input.prazo, 'prazo');
  const listaId = requireText(input.listaId, 'listaId');
  const responsavelId = requireText(input.responsavelId, 'responsavelId');
  if (input.prioridade !== 'low' && input.prioridade !== 'medium' && input.prioridade !== 'high') {
    throw new AppError('FIELD_INVALID', 'The field prioridade must be low, medium or high', 400);
  }
  const criadorId = actorIdOf(ctx);

  const repository = tarefaRepository(ctx);
  const existing = await repository.list({ chaveCriacao });
  let tarefa: Tarefa;
  let recordId: string;

  if (existing.length > 0) {
    tarefa = existing[0];
    recordId = tarefa.id;
  } else {
    const lista = await listaRepository(ctx).get(listaId);
    if (!lista.ativa) {
      throw new AppError('LIST_INACTIVE', 'An inactive list cannot receive new tasks', 409, {
        ruleId: 'listaInativaNaoRecebeTarefa',
      });
    }
    recordId = occurrenceRecordId(ctx, PROCESS_ID, chaveCriacao);
    const details: CreateTarefaInput['details'] = {};
    if (input.descricao !== undefined) details.descricao = input.descricao;
    const createInput: CreateTarefaInput = {
      titulo,
      status: 'aFazer',
      prioridade: input.prioridade,
      prazo,
      listaId,
      responsavelId,
      criadorId,
      chaveCriacao,
      details,
    };
    if (input.tarefaPaiId !== undefined) createInput.tarefaPaiId = input.tarefaPaiId;
    const created = await createTarefa(createInput, createOccurrenceContext(ctx, recordId));
    if (created.id !== recordId) {
      throw new AppError('RECORD_ID_MISMATCH', 'The created task does not use the occurrence record id', 500);
    }
    tarefa = await repository.get(created.id);
  }

  const opened = await engines.cicloTarefa.open(
    ctx,
    workflowTables.cicloTarefa,
    keyFor(ctx, recordId),
    FIRST_STEP,
    tarefa.responsavelId,
  );
  return { tarefa, task: viewOf(opened.occurrence) };
}

export async function avancarEtapaTarefa(
  input: AvancarEtapaTarefaInput,
  ctx: RequestContext,
): Promise<AvancarEtapaTarefaOutput> {
  const id = requireText(input.id, 'id');
  const transicao = input.transicao;
  if (transicao === 'devolver') {
    requireText(input.motivoDevolucao, 'motivoDevolucao');
  }
  const repository = tarefaRepository(ctx);
  const engine = engines.cicloTarefa;
  const table = workflowTables.cicloTarefa;
  const key = keyFor(ctx, id);

  const tarefa = await repository.get(id);
  const snapshot = await engine.find(ctx, key);
  if (snapshot === null) {
    throw new AppError('OCCURRENCE_NOT_FOUND', `No occurrence of ${PROCESS_ID} for task ${id}`, 404);
  }
  const destination = destinationOf(transicao);
  const cancelStep = tarefa.criadorId === ctx.sessionContext.person?.mdmId ? 'cancelarCriador' : 'cancelarGestor';
  const route = routeOf(transicao, snapshot.step, cancelStep);

  if (route === null) {
    if (snapshot.done || tarefa.status === destination) {
      return { tarefa, task: viewOf(snapshot) };
    }
    throw new AppError('STEP_NOT_ALLOWED', `The transition ${transicao} is not allowed on step ${snapshot.step}`, 409, {
      ruleId: 'tarefaEncerradaNaoTransiciona',
    });
  }

  checkActor(transicao, tarefa, ctx);

  // A call that died after the write is finished here: the record is already in the destination.
  if (tarefa.status !== destination) {
    await applyUsecase(transicao, tarefa, input.motivoDevolucao, ctx);
  }

  const current = await repository.get(id);
  let from = snapshot.step;
  let last: OccurrenceSnapshot = snapshot;
  for (const to of route) {
    const actorNow = await actorForStep(to, current, ctx);
    const result = await engine.advance(ctx, table, key, { from, to, actorNow });
    last = result.occurrence;
    if (result.outcome === 'conflict') {
      return { tarefa: current, task: viewOf(last) };
    }
    from = to;
  }
  return { tarefa: current, task: viewOf(last) };
}

export async function reatribuirQuemAge(
  input: ReatribuirQuemAgeInput,
  ctx: RequestContext,
): Promise<ReatribuirQuemAgeOutput> {
  const id = requireText(input.id, 'id');
  const novoResponsavelId = requireText(input.novoResponsavelId, 'novoResponsavelId');
  const repository = tarefaRepository(ctx);
  const engine = engines.cicloTarefa;
  const table = workflowTables.cicloTarefa;
  const key = keyFor(ctx, id);

  const tarefa = await repository.get(id);
  const actor = actorIdOf(ctx);
  if (actor !== tarefa.criadorId && !isGestor(ctx)) {
    throw new AppError('ONLY_CREATOR_OR_MANAGER_REASSIGNS', 'Only the creator or the manager can change the responsible', 403, {
      ruleId: 'reatribuicaoPorCriadorOuGestor',
    });
  }
  const snapshot = await engine.find(ctx, key);
  if (snapshot === null) {
    throw new AppError('OCCURRENCE_NOT_FOUND', `No occurrence of ${PROCESS_ID} for task ${id}`, 404);
  }
  if (tarefa.responsavelId === novoResponsavelId && snapshot.actorNow === null && snapshot.done) {
    return { tarefa, task: viewOf(snapshot) };
  }
  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada' || snapshot.done) {
    if (tarefa.responsavelId === novoResponsavelId) {
      return { tarefa, task: viewOf(snapshot) };
    }
    throw new AppError('TASK_CLOSED', 'A closed task cannot change its responsible', 409, {
      ruleId: 'tarefaEncerradaNaoTransiciona',
    });
  }

  let current = tarefa;
  if (tarefa.responsavelId !== novoResponsavelId) {
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
      details: detailsOf(tarefa),
    };
    if (tarefa.tarefaPaiId !== undefined) updateInput.tarefaPaiId = tarefa.tarefaPaiId;
    await updateTarefa(updateInput, ctx);
    current = await repository.get(id);
  }

  // Who acts now changes only when the turn is of the responsible; the creator keeps the review turn.
  const quemAge = await resolverQuemAgeAgora(
    { etapa: snapshot.step, responsavelId: current.responsavelId, criadorId: current.criadorId },
    ctx,
  );
  if (snapshot.actorNow === quemAge.quemAgeId) {
    return { tarefa: current, task: viewOf(snapshot) };
  }
  const result = await engine.advance(ctx, table, key, {
    from: snapshot.step,
    to: snapshot.step,
    actorNow: quemAge.quemAgeId,
  });
  return { tarefa: current, task: viewOf(result.occurrence) };
}
