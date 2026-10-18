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

function toOutput(tarefa: Tarefa, today: string): IniciarOutput {
  const aberta = tarefa.status === 'aFazer' || tarefa.status === 'emAndamento' || tarefa.status === 'emRevisao';
  const prazoDia = String(tarefa.prazo).slice(0, 10);
  const details: IniciarOutput['details'] = {
    aberta,
    venceHoje: aberta && prazoDia === today,
    atrasada: aberta && prazoDia < today,
  };
  if (tarefa.details?.descricao !== undefined) details.descricao = tarefa.details.descricao;
  if (tarefa.details?.motivoDevolucao !== undefined) details.motivoDevolucao = tarefa.details.motivoDevolucao;
  if (tarefa.details?.devolvidaEm !== undefined) details.devolvidaEm = tarefa.details.devolvidaEm;
  if (tarefa.details?.concluidaEm !== undefined) details.concluidaEm = tarefa.details.concluidaEm;
  if (tarefa.details?.canceladaEm !== undefined) details.canceladaEm = tarefa.details.canceladaEm;

  const output: IniciarOutput = {
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

export async function iniciar(input: IniciarInput, ctx: RequestContext): Promise<IniciarOutput> {
  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('VALIDATION_ERROR', 'id is required.', 400);
  }
  const version = Number(input.version);
  if (!Number.isFinite(version)) {
    throw new AppError('VALIDATION_ERROR', 'version is required.', 400);
  }

  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const tarefa = await tarefaRepository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Tarefa not found.', 404);
  }
  if (tarefa.version !== version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A closed task cannot change status.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }
  if (tarefa.status !== 'aFazer') {
    throw new AppError('INVALID_STATE', 'Only a task in aFazer can be started.', 409);
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId) {
    throw new AppError('UNAUTHENTICATED', 'The session has no identified team member.', 401);
  }
  if (actorId !== tarefa.responsavelId) {
    throw new AppError('FORBIDDEN', 'Only the responsible member can start the task.', 403, { ruleId: 'somenteResponsavelExecuta' });
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

  const saved = await tarefaRepository.transition(next, 'iniciar');
  return toOutput(saved, ctx.clock.nowIso().slice(0, 10));
}
