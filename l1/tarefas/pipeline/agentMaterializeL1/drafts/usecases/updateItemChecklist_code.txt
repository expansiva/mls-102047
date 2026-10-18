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

  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'id is required.', 400);
  }

  const found = await itemRepository.list({ id });
  const existing: ItemChecklist | undefined = found.find((item) => item.id === id);
  if (!existing) {
    throw new AppError('NOT_FOUND', 'Checklist item not found.', 404);
  }

  if (input.version !== undefined && Number(input.version) !== existing.version) {
    throw new AppError('VERSION_CONFLICT', 'Version does not match the stored item.', 409);
  }

  if (input.tarefaId !== undefined && String(input.tarefaId) !== existing.tarefaId) {
    throw new AppError('INVALID_INPUT', 'The task of a checklist item cannot be changed.', 400);
  }

  // editarSomenteTarefaVisivel: the actor must see the task of the item
  // (member: created it or is responsible; manager: every task of the team).
  const tarefa = await tarefaRepository.get(existing.tarefaId);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Task of the checklist item not found.', 404);
  }
  const actorId = ctx.sessionContext.actorId ?? ctx.sessionContext.person?.mdmId;
  const scope = ctx.sessionContext.actorScope ?? [];
  const isGestor = scope.some((entry) => entry === 'gestor' || entry.endsWith(':gestor'));
  const canSee = isGestor || (actorId !== undefined && (tarefa.criadorId === actorId || tarefa.responsavelId === actorId));
  if (!canSee) {
    throw new AppError('FORBIDDEN', 'Only a person who can see the task may edit its checklist.', 403, { ruleId: 'editarSomenteTarefaVisivel' });
  }

  let ordem = existing.ordem;
  if (input.ordem !== undefined) {
    ordem = Number(input.ordem);
    if (!Number.isInteger(ordem) || ordem < 0) {
      throw new AppError('INVALID_INPUT', 'ordem must be an integer greater than or equal to 0.', 400);
    }
  }

  let descricao = existing.details.descricao;
  const inputDescricao = input.details?.descricao;
  if (inputDescricao !== undefined) {
    descricao = String(inputDescricao).trim();
    if (!descricao || descricao.length > 300) {
      throw new AppError('INVALID_INPUT', 'descricao is required and must have at most 300 characters.', 400);
    }
  }

  let feito = existing.feito;
  if (input.feito !== undefined) {
    if (typeof input.feito !== 'boolean') {
      throw new AppError('INVALID_INPUT', 'feito must be a boolean.', 400);
    }
    feito = input.feito;
  }

  const details: ItemChecklist['details'] = { descricao };
  if (feito) {
    if (existing.feito && existing.details.marcadoEm) {
      details.marcadoEm = existing.details.marcadoEm;
    } else {
      details.marcadoEm = ctx.clock.nowIso();
    }
  }

  // Only the checklist item is written; the task is never updated here.
  const saved = await itemRepository.update({
    id: existing.id,
    version: existing.version,
    tarefaId: existing.tarefaId,
    ordem,
    feito,
    details,
  });

  // checklistNaoMudaSituacao: the task status must be the same after the write.
  const tarefaAfter = await tarefaRepository.get(existing.tarefaId);
  if (!tarefaAfter || tarefaAfter.status !== tarefa.status) {
    throw new AppError('CONFLICT', 'Updating a checklist item must not change the status of the task.', 409, { ruleId: 'checklistNaoMudaSituacao' });
  }

  const outDetails: UpdateItemChecklistOutput['details'] = { descricao: saved.details.descricao };
  if (saved.details.marcadoEm !== undefined) {
    outDetails.marcadoEm = saved.details.marcadoEm;
  }

  return {
    id: saved.id,
    version: saved.version,
    tarefaId: saved.tarefaId,
    ordem: saved.ordem,
    feito: saved.feito,
    details: outDetails,
  };
}
