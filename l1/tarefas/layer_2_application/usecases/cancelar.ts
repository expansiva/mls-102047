/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/cancelar.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

export interface CancelarInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface CancelarOutput extends Record<string, unknown> {
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

function isGestor(ctx: RequestContext): boolean {
  const session = ctx.sessionContext;
  if (session.actorId === 'gestor') return true;
  const scope = session.actorScope ?? [];
  return scope.some((entry) => entry === 'gestor' || entry.endsWith(':gestor'));
}

export async function cancelar(input: CancelarInput, ctx: RequestContext): Promise<CancelarOutput> {
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
    throw new AppError('VERSION_CONFLICT', 'The task was changed by someone else; reload it before cancelling.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A completed or cancelled task cannot change status.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }
  if (tarefa.status !== 'aFazer' && tarefa.status !== 'emAndamento' && tarefa.status !== 'emRevisao') {
    throw new AppError('INVALID_STATE', 'The task can only be cancelled while to do, in progress or in review.', 409, { ruleId: 'cancelamentoPorCriadorOuGestor' });
  }

  const actorId = ctx.sessionContext.person?.mdmId ?? ctx.sessionContext.actorId;
  const isCriador = actorId !== undefined && actorId !== '' && actorId === tarefa.criadorId;
  if (!isCriador && !isGestor(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the task creator or the manager can cancel the task.', 403, { ruleId: 'cancelamentoPorCriadorOuGestor' });
  }

  const details: Tarefa['details'] = {};
  if (tarefa.details?.descricao !== undefined) details.descricao = tarefa.details.descricao;
  if (tarefa.details?.motivoDevolucao !== undefined) details.motivoDevolucao = tarefa.details.motivoDevolucao;
  if (tarefa.details?.devolvidaEm !== undefined) details.devolvidaEm = tarefa.details.devolvidaEm;
  if (tarefa.details?.concluidaEm !== undefined) details.concluidaEm = tarefa.details.concluidaEm;
  details.canceladaEm = ctx.clock.nowIso();

  const next: Tarefa = {
    id: tarefa.id,
    version: tarefa.version,
    titulo: tarefa.titulo,
    status: 'cancelada',
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

  const saved = await repository.transition(next, 'cancelar');

  const outDetails: CancelarOutput['details'] = {};
  if (saved.details?.descricao !== undefined) outDetails.descricao = saved.details.descricao;
  if (saved.details?.motivoDevolucao !== undefined) outDetails.motivoDevolucao = saved.details.motivoDevolucao;
  if (saved.details?.devolvidaEm !== undefined) outDetails.devolvidaEm = saved.details.devolvidaEm;
  if (saved.details?.concluidaEm !== undefined) outDetails.concluidaEm = saved.details.concluidaEm;
  if (saved.details?.canceladaEm !== undefined) outDetails.canceladaEm = saved.details.canceladaEm;
  outDetails.aberta = false;
  outDetails.venceHoje = false;
  outDetails.atrasada = false;

  const output: CancelarOutput = {
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
    details: outDetails,
  };
  if (saved.tarefaPaiId !== undefined) output.tarefaPaiId = saved.tarefaPaiId;
  return output;
}
