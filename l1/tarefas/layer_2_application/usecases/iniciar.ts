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

export async function iniciar(input: IniciarInput, ctx: RequestContext): Promise<IniciarOutput> {
  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'The task id is required.', 400);
  }

  const tarefa: Tarefa = await repository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Task not found.', 404);
  }

  if (input.version !== undefined && input.version !== null && Number(input.version) !== tarefa.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A completed or cancelled task cannot change status.', 409, {
      ruleId: 'tarefaEncerradaNaoTransiciona',
    });
  }

  if (tarefa.status !== 'aFazer') {
    throw new AppError('INVALID_STATE', 'Only a task in "aFazer" can be started.', 409);
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId || actorId !== tarefa.responsavelId) {
    throw new AppError('FORBIDDEN', 'Only the task assignee can start the task.', 403, {
      ruleId: 'somenteResponsavelExecuta',
    });
  }

  const details: Tarefa['details'] = {};
  if (tarefa.details?.descricao !== undefined) details.descricao = tarefa.details.descricao;
  if (tarefa.details?.motivoDevolucao !== undefined) details.motivoDevolucao = tarefa.details.motivoDevolucao;
  if (tarefa.details?.devolvidaEm !== undefined) details.devolvidaEm = tarefa.details.devolvidaEm;
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

  const saved = await repository.transition(next, 'iniciar');

  const subtarefas = await repository.list({ tarefaPaiId: saved.id });
  const today = ctx.clock.nowIso().slice(0, 10);
  const prazoDay = String(saved.prazo).slice(0, 10);
  const aberta = saved.status === 'aFazer' || saved.status === 'emAndamento' || saved.status === 'emRevisao';

  const outDetails: IniciarOutput['details'] = {};
  if (saved.details?.descricao !== undefined) outDetails.descricao = saved.details.descricao;
  if (saved.details?.motivoDevolucao !== undefined) outDetails.motivoDevolucao = saved.details.motivoDevolucao;
  if (saved.details?.devolvidaEm !== undefined) outDetails.devolvidaEm = saved.details.devolvidaEm;
  if (saved.details?.concluidaEm !== undefined) outDetails.concluidaEm = saved.details.concluidaEm;
  if (saved.details?.canceladaEm !== undefined) outDetails.canceladaEm = saved.details.canceladaEm;
  outDetails.aberta = aberta;
  outDetails.venceHoje = aberta && prazoDay === today;
  outDetails.atrasada = aberta && prazoDay < today;
  outDetails.quantidadeSubtarefas = subtarefas.length;

  const output: IniciarOutput = {
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
