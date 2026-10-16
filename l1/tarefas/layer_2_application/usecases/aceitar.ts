/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/aceitar.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

export interface AceitarInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface AceitarOutput extends Record<string, unknown> {
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

export async function aceitar(input: AceitarInput, ctx: RequestContext): Promise<AceitarOutput> {
  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'The task id is required.', 400);
  }
  const inputVersion = Number(input.version);
  if (!Number.isFinite(inputVersion)) {
    throw new AppError('INVALID_INPUT', 'The task version is required.', 400);
  }

  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const tarefa: Tarefa = await repository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Task not found.', 404);
  }

  if (tarefa.version !== inputVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'The task was changed by someone else; reload and try again.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A completed or cancelled task no longer changes status.', 409, {
      ruleId: 'tarefaEncerradaNaoTransiciona',
    });
  }
  if (tarefa.status !== 'emRevisao') {
    throw new AppError('INVALID_STATE', 'Only a task in review can be accepted.', 409);
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId) {
    throw new AppError('FORBIDDEN', 'The session has no identified team member.', 403, {
      ruleId: 'somenteCriadorRevisa',
    });
  }
  if (actorId !== tarefa.criadorId) {
    throw new AppError('FORBIDDEN', 'Only the creator of the task can accept it.', 403, {
      ruleId: 'somenteCriadorRevisa',
    });
  }

  const concluidaEm = ctx.clock.nowIso();
  const next: Tarefa = {
    id: tarefa.id,
    version: tarefa.version,
    titulo: tarefa.titulo,
    status: 'concluida',
    prioridade: tarefa.prioridade,
    prazo: tarefa.prazo,
    listaId: tarefa.listaId,
    responsavelId: tarefa.responsavelId,
    criadorId: tarefa.criadorId,
    chaveCriacao: tarefa.chaveCriacao,
    criadaEm: tarefa.criadaEm,
    details: {
      descricao: tarefa.details?.descricao,
      motivoDevolucao: tarefa.details?.motivoDevolucao,
      devolvidaEm: tarefa.details?.devolvidaEm,
      concluidaEm,
      canceladaEm: tarefa.details?.canceladaEm,
    },
  };
  if (tarefa.tarefaPaiId !== undefined) {
    next.tarefaPaiId = tarefa.tarefaPaiId;
  }

  const saved = await repository.transition(next, 'aceitar');

  const output: AceitarOutput = {
    id: saved.id,
    version: saved.version,
    titulo: saved.titulo,
    status: saved.status,
    prioridade: saved.prioridade,
    prazo: saved.prazo,
    listaId: saved.listaId,
    responsavelId: saved.responsavelId,
    criadorId: saved.criadorId,
    chaveCriacao: saved.chaveCriacao,
    criadaEm: saved.criadaEm,
    details: {
      descricao: saved.details?.descricao,
      motivoDevolucao: saved.details?.motivoDevolucao,
      devolvidaEm: saved.details?.devolvidaEm,
      concluidaEm: saved.details?.concluidaEm,
      canceladaEm: saved.details?.canceladaEm,
      aberta: false,
      venceHoje: false,
      atrasada: false,
    },
  };
  if (saved.tarefaPaiId !== undefined) {
    output.tarefaPaiId = saved.tarefaPaiId;
  }
  return output;
}
