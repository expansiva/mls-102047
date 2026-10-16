/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/iniciar.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

export interface IniciarInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface IniciarOutput extends Record<string, unknown> {
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

function toStoredDetails(details: Tarefa['details']): Tarefa['details'] {
  const stored: Tarefa['details'] = {};
  if (details.descricao !== undefined) stored.descricao = details.descricao;
  if (details.motivoDevolucao !== undefined) stored.motivoDevolucao = details.motivoDevolucao;
  if (details.devolvidaEm !== undefined) stored.devolvidaEm = details.devolvidaEm;
  if (details.concluidaEm !== undefined) stored.concluidaEm = details.concluidaEm;
  if (details.canceladaEm !== undefined) stored.canceladaEm = details.canceladaEm;
  return stored;
}

function toOutput(tarefa: Tarefa): IniciarOutput {
  const out: IniciarOutput = {
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
    details: {
      ...toStoredDetails(tarefa.details),
      aberta: tarefa.status === 'aFazer' || tarefa.status === 'emAndamento' || tarefa.status === 'emRevisao',
    },
  };
  if (tarefa.tarefaPaiId !== undefined) out.tarefaPaiId = tarefa.tarefaPaiId;
  return out;
}

export async function iniciar(input: IniciarInput, ctx: RequestContext): Promise<IniciarOutput> {
  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'The task id is required.', 400);
  }
  const version = Number(input.version);
  if (!Number.isFinite(version)) {
    throw new AppError('INVALID_INPUT', 'The task version is required.', 400);
  }

  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const tarefa = await repository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Task not found.', 404);
  }

  if (tarefa.version !== version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A completed or cancelled task cannot change status.', 409, {
      ruleId: 'tarefaEncerradaNaoTransiciona',
    });
  }

  if (tarefa.status !== 'aFazer') {
    throw new AppError('INVALID_TRANSITION', 'Only a task in "aFazer" can be started.', 409);
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId) {
    throw new AppError('INVALID_INPUT', 'The session has no identified team member.', 400, {
      ruleId: 'somenteResponsavelExecuta',
    });
  }
  if (actorId !== tarefa.responsavelId) {
    throw new AppError('FORBIDDEN', 'Only the task assignee can start it.', 409, {
      ruleId: 'somenteResponsavelExecuta',
    });
  }

  const next: Tarefa = {
    ...tarefa,
    status: 'emAndamento',
    details: toStoredDetails(tarefa.details),
  };
  const saved = await repository.transition(next, 'iniciar');
  return toOutput(saved);
}
