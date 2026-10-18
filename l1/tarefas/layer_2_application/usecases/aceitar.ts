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

function toOutput(tarefa: Tarefa): AceitarOutput {
  // Derived flags are calculated from the status, never read from storage.
  const aberta = tarefa.status === 'aFazer' || tarefa.status === 'emAndamento' || tarefa.status === 'emRevisao';
  const details: AceitarOutput['details'] = {
    aberta,
    venceHoje: false,
    atrasada: false,
  };
  if (tarefa.details.descricao !== undefined) details.descricao = tarefa.details.descricao;
  if (tarefa.details.motivoDevolucao !== undefined) details.motivoDevolucao = tarefa.details.motivoDevolucao;
  if (tarefa.details.devolvidaEm !== undefined) details.devolvidaEm = tarefa.details.devolvidaEm;
  if (tarefa.details.concluidaEm !== undefined) details.concluidaEm = tarefa.details.concluidaEm;
  if (tarefa.details.canceladaEm !== undefined) details.canceladaEm = tarefa.details.canceladaEm;

  const output: AceitarOutput = {
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
    details,
  };
  if (tarefa.tarefaPaiId !== undefined) output.tarefaPaiId = tarefa.tarefaPaiId;
  return output;
}

export async function aceitar(input: AceitarInput, ctx: RequestContext): Promise<AceitarOutput> {
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'The task id is required.', 400);
  }
  const version = Number(input.version);
  if (!Number.isFinite(version)) {
    throw new AppError('INVALID_INPUT', 'The task version is required.', 400);
  }

  const tarefa = await tarefaRepository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Task not found.', 404);
  }
  if (tarefa.version !== version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A completed or cancelled task no longer changes status.', 409, {
      ruleId: 'tarefaEncerradaNaoTransiciona',
    });
  }

  if (tarefa.status !== 'emRevisao') {
    throw new AppError('INVALID_STATE', 'Only a task under review can be accepted.', 409, {
      ruleId: 'somenteCriadorRevisa',
    });
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId || actorId !== tarefa.criadorId) {
    throw new AppError('FORBIDDEN', 'Only the creator of the task can accept it.', 403, {
      ruleId: 'somenteCriadorRevisa',
    });
  }

  const next: Tarefa = {
    ...tarefa,
    status: 'concluida',
    details: {
      ...(tarefa.details.descricao !== undefined ? { descricao: tarefa.details.descricao } : {}),
      ...(tarefa.details.motivoDevolucao !== undefined ? { motivoDevolucao: tarefa.details.motivoDevolucao } : {}),
      ...(tarefa.details.devolvidaEm !== undefined ? { devolvidaEm: tarefa.details.devolvidaEm } : {}),
      ...(tarefa.details.canceladaEm !== undefined ? { canceladaEm: tarefa.details.canceladaEm } : {}),
      concluidaEm: ctx.clock.nowIso(),
    },
  };

  const saved = await tarefaRepository.transition(next, 'aceitar');
  return toOutput(saved);
}
