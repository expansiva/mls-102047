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
  const scope = session.actorScope ?? session.actorSession?.scope ?? [];
  if (scope.includes('tarefas:gestor')) return true;
  return session.actorId === 'gestor' || session.actorSession?.actorId === 'gestor';
}

export async function cancelar(input: CancelarInput, ctx: RequestContext): Promise<CancelarOutput> {
  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'id is required.', 400);
  }
  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const tarefa: Tarefa = await repository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Tarefa not found.', 404);
  }

  if (input.version !== undefined && input.version !== null && Number(input.version) !== tarefa.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TAREFA_ENCERRADA', 'A closed task cannot change status.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }
  if (tarefa.status !== 'aFazer' && tarefa.status !== 'emAndamento' && tarefa.status !== 'emRevisao') {
    throw new AppError('INVALID_STATE', 'Only a task to do, in progress or in review can be cancelled.', 409, { ruleId: 'cancelamentoPorCriadorOuGestor' });
  }

  const personId = ctx.sessionContext.person?.mdmId;
  const isCriador = personId !== undefined && personId === tarefa.criadorId;
  if (!isCriador && !isGestor(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the creator or the manager can cancel the task.', 403, { ruleId: 'cancelamentoPorCriadorOuGestor' });
  }

  const canceladaEm = ctx.clock.nowIso();
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
    details: {
      descricao: tarefa.details?.descricao,
      motivoDevolucao: tarefa.details?.motivoDevolucao,
      devolvidaEm: tarefa.details?.devolvidaEm,
      concluidaEm: tarefa.details?.concluidaEm,
      canceladaEm,
    },
  };
  if (tarefa.tarefaPaiId !== undefined) {
    next.tarefaPaiId = tarefa.tarefaPaiId;
  }

  const saved = await repository.transition(next, 'cancelar');

  const out: CancelarOutput = {
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
    out.tarefaPaiId = saved.tarefaPaiId;
  }
  return out;
}
