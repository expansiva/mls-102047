/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/enviarParaRevisao.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

export interface EnviarParaRevisaoInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface EnviarParaRevisaoOutput extends Record<string, unknown> {
  id: string;
  version: number;
  titulo: string;
  status: string;
  prioridade: string;
  prazo: string;
  listaId: string;
  responsavelId: string;
  criadorId: string;
  tarefaPaiId?: string;
  chaveCriacao: string;
  criadaEm: string;
  details: {
    descricao?: string;
    motivoDevolucao?: string;
    devolvidaEm?: string;
    concluidaEm?: string;
    canceladaEm?: string;
    aberta?: boolean;
    venceHoje?: boolean;
    atrasada?: boolean;
    quantidadeSubtarefas?: number;
    progressoChecklist?: string;
  };
}

// Only stored fields: derived ones (aberta, venceHoje, atrasada, quantidadeSubtarefas, progressoChecklist) are never written.
function storedDetails(source: Tarefa['details']): Tarefa['details'] {
  const details: Tarefa['details'] = {};
  if (source.descricao !== undefined) details.descricao = source.descricao;
  if (source.motivoDevolucao !== undefined) details.motivoDevolucao = source.motivoDevolucao;
  if (source.devolvidaEm !== undefined) details.devolvidaEm = source.devolvidaEm;
  if (source.concluidaEm !== undefined) details.concluidaEm = source.concluidaEm;
  if (source.canceladaEm !== undefined) details.canceladaEm = source.canceladaEm;
  return details;
}

function toOutput(tarefa: Tarefa): EnviarParaRevisaoOutput {
  const output: EnviarParaRevisaoOutput = {
    id: tarefa.id,
    version: tarefa.version,
    titulo: tarefa.titulo,
    status: tarefa.status,
    prioridade: tarefa.prioridade,
    prazo: tarefa.prazo,
    listaId: tarefa.listaId,
    responsavelId: tarefa.responsavelId,
    criadorId: tarefa.criadorId,
    chaveCriacao: tarefa.chaveCriacao,
    criadaEm: tarefa.criadaEm,
    details: storedDetails(tarefa.details ?? {}),
  };
  if (tarefa.tarefaPaiId !== undefined) output.tarefaPaiId = tarefa.tarefaPaiId;
  return output;
}

export async function enviarParaRevisao(input: EnviarParaRevisaoInput, ctx: RequestContext): Promise<EnviarParaRevisaoOutput> {
  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'id is required.', 400);
  }
  const version = Number(input.version);
  if (!Number.isFinite(version)) {
    throw new AppError('INVALID_INPUT', 'version is required.', 400);
  }

  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const tarefa = await repository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', `Tarefa ${id} not found.`, 404);
  }

  if (tarefa.version !== version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A closed task (completed or cancelled) cannot change status.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }
  if (tarefa.status !== 'emAndamento') {
    throw new AppError('INVALID_STATE', 'Only a task in progress can be sent to review.', 409);
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId) {
    throw new AppError('FORBIDDEN', 'The session has no identified team member.', 403, { ruleId: 'somenteResponsavelExecuta' });
  }
  if (actorId !== tarefa.responsavelId) {
    throw new AppError('FORBIDDEN', 'Only the task assignee can send it to review.', 403, { ruleId: 'somenteResponsavelExecuta' });
  }

  const next: Tarefa = {
    ...tarefa,
    status: 'emRevisao',
    details: storedDetails(tarefa.details ?? {}),
  };
  const saved = await repository.transition(next, 'enviarParaRevisao');
  return toOutput(saved);
}
