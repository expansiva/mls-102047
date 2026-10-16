/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/updateItemChecklist.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ItemChecklistRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/itemChecklistRepository.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { ItemChecklist } from '/_102047_/l1/tarefas/layer_3_domain/entities/itemChecklist.js';

export interface UpdateItemChecklistInput extends Record<string, unknown> {
  tarefaId: string;
  ordem: number;
  feito: boolean;
  details: {
    descricao: string;
    marcadoEm?: string;
  };
  id: string;
  version: number;
}

export interface UpdateItemChecklistOutput extends Record<string, unknown> {
  id: string;
  version: number;
  tarefaId: string;
  ordem: number;
  feito: boolean;
  details: {
    descricao: string;
    marcadoEm?: string;
  };
}

export async function updateItemChecklist(input: UpdateItemChecklistInput, ctx: RequestContext): Promise<UpdateItemChecklistOutput> {
  const itemRepository = resolveRepository<ItemChecklistRepository>(ctx, 'ItemChecklistRepository');
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  if (input.id === undefined || input.id === null || String(input.id) === '') {
    throw new AppError('VALIDATION_ERROR', 'id is required to update a checklist item.', 400);
  }
  const id = String(input.id);

  const found = await itemRepository.list({ id });
  const current = found.find((item) => item.id === id);
  if (!current) {
    throw new AppError('NOT_FOUND', 'Checklist item not found: ' + id, 404);
  }

  if (input.version !== undefined && input.version !== null && Number(input.version) !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  // The parent task: the editor must be able to see it (member: creator or assignee; manager: all).
  const tarefa = await tarefaRepository.get(current.tarefaId);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Task of the checklist item not found: ' + current.tarefaId, 404);
  }

  const session = ctx.sessionContext;
  const actorId = session.person?.mdmId ?? session.actorId;
  const scope = session.actorScope ?? [];
  const isGestor = session.actorId === 'gestor' || scope.some((entry) => entry === 'gestor' || entry.endsWith(':gestor'));
  const canSee = isGestor || (actorId !== undefined && (tarefa.criadorId === actorId || tarefa.responsavelId === actorId));
  if (!canSee) {
    throw new AppError('FORBIDDEN', 'The person cannot see this task, so cannot edit its checklist.', 403, { ruleId: 'editarSomenteTarefaVisivel' });
  }

  let ordem = current.ordem;
  if (input.ordem !== undefined && input.ordem !== null) {
    ordem = Number(input.ordem);
    if (!Number.isInteger(ordem) || ordem < 0) {
      throw new AppError('VALIDATION_ERROR', 'ordem must be an integer greater than or equal to 0.', 400);
    }
  }

  let feito = current.feito;
  if (input.feito !== undefined && input.feito !== null) {
    if (typeof input.feito !== 'boolean') {
      throw new AppError('VALIDATION_ERROR', 'feito must be a boolean.', 400);
    }
    feito = input.feito;
  }

  let descricao = current.details.descricao;
  const inputDescricao = input.details?.descricao;
  if (inputDescricao !== undefined && inputDescricao !== null) {
    descricao = String(inputDescricao).trim();
  }
  if (descricao === '') {
    throw new AppError('VALIDATION_ERROR', 'descricao is required.', 400);
  }
  if (descricao.length > 300) {
    throw new AppError('VALIDATION_ERROR', 'descricao must have at most 300 characters.', 400);
  }

  const details: ItemChecklist['details'] = { descricao };
  if (feito) {
    if (!current.feito) {
      details.marcadoEm = ctx.clock.nowIso();
    } else if (current.details.marcadoEm !== undefined) {
      details.marcadoEm = current.details.marcadoEm;
    } else {
      details.marcadoEm = ctx.clock.nowIso();
    }
  }

  const record: ItemChecklist = {
    id: current.id,
    version: current.version,
    tarefaId: current.tarefaId,
    ordem,
    feito,
    details,
  };

  // Only the checklist item is written; the task is never updated or transitioned here.
  const saved = await itemRepository.update(record);

  // checklistNaoMudaSituacao: the task's situation must be the same after the checklist write.
  const tarefaAfter = await tarefaRepository.get(current.tarefaId);
  if (tarefaAfter.status !== tarefa.status) {
    throw new AppError('CONFLICT', 'Editing a checklist item must not change the task status.', 409, { ruleId: 'checklistNaoMudaSituacao' });
  }

  const output: UpdateItemChecklistOutput = {
    id: saved.id,
    version: saved.version,
    tarefaId: saved.tarefaId,
    ordem: saved.ordem,
    feito: saved.feito,
    details: { descricao: saved.details.descricao },
  };
  if (saved.details.marcadoEm !== undefined) {
    output.details.marcadoEm = saved.details.marcadoEm;
  }
  return output;
}
