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
throw new AppError('INVALID_INPUT', 'The id of the checklist item is required.', 400);
}
const id = String(input.id);
const found = await itemRepository.list({ id });
const current: ItemChecklist | undefined = found.find((entry) => entry.id === id);
if (!current) {
throw new AppError('NOT_FOUND', 'Checklist item not found.', 404);
}
if (input.version !== undefined && input.version !== null && Number(input.version) !== current.version) {
throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
}

// editarSomenteTarefaVisivel: the parent task must be visible to the actor.
const tarefa = await tarefaRepository.get(current.tarefaId);
if (!tarefa) {
throw new AppError('NOT_FOUND', 'Task of the checklist item not found.', 404);
}
const session = ctx.sessionContext;
const identities: string[] = [];
if (session.person?.mdmId) identities.push(session.person.mdmId);
if (session.actorId) identities.push(session.actorId);
const scope = session.actorScope ?? [];
const isGestor = scope.some((entry) => entry === 'gestor' || entry.endsWith(':gestor'));
const isCriadorOuResponsavel = identities.some((who) => who === tarefa.criadorId || who === tarefa.responsavelId);
if (!isGestor && !isCriadorOuResponsavel) {
throw new AppError(
'TASK_NOT_VISIBLE',
'Only the creator, the assignee or a manager can edit the checklist of this task.',
403,
{ ruleId: 'editarSomenteTarefaVisivel' },
);
}

// Field values: what is given replaces what is stored.
let ordem = current.ordem;
if (input.ordem !== undefined && input.ordem !== null) {
ordem = Number(input.ordem);
if (!Number.isInteger(ordem) || ordem < 0) {
throw new AppError('INVALID_INPUT', 'ordem must be an integer greater than or equal to 0.', 400);
}
}
let feito = current.feito;
if (input.feito !== undefined && input.feito !== null) {
if (typeof input.feito !== 'boolean') {
throw new AppError('INVALID_INPUT', 'feito must be a boolean.', 400);
}
feito = input.feito;
}
let descricao = current.details.descricao;
const givenDescricao = input.details?.descricao;
if (givenDescricao !== undefined && givenDescricao !== null) {
descricao = String(givenDescricao).trim();
}
if (descricao === '') {
throw new AppError('INVALID_INPUT', 'details.descricao is required.', 400);
}
if (descricao.length > 300) {
throw new AppError('INVALID_INPUT', 'details.descricao must have at most 300 characters.', 400);
}

const details: ItemChecklist['details'] = { descricao };
if (feito) {
if (current.feito && current.details.marcadoEm) {
details.marcadoEm = current.details.marcadoEm;
} else {
details.marcadoEm = ctx.clock.nowIso();
}
}

// checklistNaoMudaSituacao: only the checklist item is written; the task is never updated or transitioned.
const statusBefore = tarefa.status;
const next: ItemChecklist = {
id: current.id,
version: current.version,
tarefaId: current.tarefaId,
ordem,
feito,
details,
};
const saved = await itemRepository.update(next);

const tarefaAfter = await tarefaRepository.get(current.tarefaId);
if (!tarefaAfter || tarefaAfter.status !== statusBefore) {
throw new AppError(
'TASK_STATUS_CHANGED',
'Updating a checklist item must not change the status of the task.',
409,
{ ruleId: 'checklistNaoMudaSituacao' },
);
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
