/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/devolver.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

export interface DevolverInput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    motivoDevolucao?: string;
  };
}

export interface DevolverOutput extends Record<string, unknown> {
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

export async function devolver(input: DevolverInput, ctx: RequestContext): Promise<DevolverOutput> {
  const id = String(input.id ?? '').trim();
  if (!id) {
    throw new AppError('INVALID_INPUT', 'The task id is required.', 400);
  }

  const motivoRaw = (input.details as { motivoDevolucao?: unknown } | undefined)?.motivoDevolucao;
  const motivo = typeof motivoRaw === 'string' ? motivoRaw.trim() : '';
  if (!motivo) {
    throw new AppError('REASON_REQUIRED', 'Returning a task for adjustment requires the reason.', 400, { ruleId: 'devolucaoExigeMotivo' });
  }
  if (motivo.length > 2000) {
    throw new AppError('INVALID_INPUT', 'The return reason must have at most 2000 characters.', 400, { ruleId: 'devolucaoExigeMotivo' });
  }

  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const tarefa = await repository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Task not found.', 404);
  }

  if (input.version !== undefined && input.version !== null && Number(input.version) !== tarefa.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A completed or cancelled task no longer changes status.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }
  if (tarefa.status !== 'emRevisao') {
    throw new AppError('INVALID_STATE', 'Only a task in review can be returned for adjustment.', 409, { ruleId: 'somenteCriadorRevisa' });
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId || actorId !== tarefa.criadorId) {
    throw new AppError('FORBIDDEN', 'Only the creator of the task can return it for adjustment.', 403, { ruleId: 'somenteCriadorRevisa' });
  }

  const details: Tarefa['details'] = {
    motivoDevolucao: motivo,
    devolvidaEm: ctx.clock.nowIso(),
  };
  if (tarefa.details?.descricao !== undefined) details.descricao = tarefa.details.descricao;
  if (tarefa.details?.concluidaEm !== undefined) details.concluidaEm = tarefa.details.concluidaEm;
  if (tarefa.details?.canceladaEm !== undefined) details.canceladaEm = tarefa.details.canceladaEm;

  const next: Tarefa = {
    id: tarefa.id,
    version: tarefa.version,
    titulo: tarefa.titulo,
    status: 'emAndamento',
    prioridade: tarefa.prioridade,
    prazo: tarefa.prazo,
    listaId: tarefa.listaId,
    responsavelId: tarefa.responsavelId,
    criadorId: tarefa.criadorId,
    chaveCriacao: tarefa.chaveCriacao,
    criadaEm: tarefa.criadaEm,
    details,
  };
  if (tarefa.tarefaPaiId !== undefined) next.tarefaPaiId = tarefa.tarefaPaiId;

  const saved = await repository.transition(next, 'devolver');

  const out: DevolverOutput = {
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
      aberta: saved.status === 'aFazer' || saved.status === 'emAndamento' || saved.status === 'emRevisao',
    },
  };
  if (saved.tarefaPaiId !== undefined) out.tarefaPaiId = saved.tarefaPaiId;
  if (saved.details?.descricao !== undefined) out.details.descricao = saved.details.descricao;
  if (saved.details?.motivoDevolucao !== undefined) out.details.motivoDevolucao = saved.details.motivoDevolucao;
  if (saved.details?.devolvidaEm !== undefined) out.details.devolvidaEm = saved.details.devolvidaEm;
  if (saved.details?.concluidaEm !== undefined) out.details.concluidaEm = saved.details.concluidaEm;
  if (saved.details?.canceladaEm !== undefined) out.details.canceladaEm = saved.details.canceladaEm;
  return out;
}
