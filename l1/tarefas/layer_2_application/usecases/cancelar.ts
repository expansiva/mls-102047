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
  if (session.actorId === 'gestor' || session.actorSession?.actorId === 'gestor') return true;
  const scope = session.actorScope ?? session.actorSession?.scope ?? [];
  return scope.some((s) => s === 'gestor' || s.endsWith(':gestor'));
}

function toOutput(t: Tarefa): CancelarOutput {
  const out: CancelarOutput = {
    id: t.id,
    version: t.version,
    titulo: t.titulo,
    status: t.status,
    prioridade: t.prioridade,
    prazo: t.prazo,
    listaId: t.listaId,
    responsavelId: t.responsavelId,
    criadorId: t.criadorId,
    chaveCriacao: t.chaveCriacao,
    criadaEm: t.criadaEm,
    details: { ...t.details },
  };
  if (t.tarefaPaiId !== undefined) out.tarefaPaiId = t.tarefaPaiId;
  return out;
}

export async function cancelar(input: CancelarInput, ctx: RequestContext): Promise<CancelarOutput> {
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
    throw new AppError('NOT_FOUND', 'Tarefa not found: ' + id, 404);
  }
  if (tarefa.version !== version) {
    throw new AppError('VERSION_CONFLICT', 'Tarefa version does not match the stored version.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TAREFA_ENCERRADA', 'A closed task (concluida or cancelada) cannot change status.', 409, {
      ruleId: 'tarefaEncerradaNaoTransiciona',
    });
  }
  if (tarefa.status !== 'aFazer' && tarefa.status !== 'emAndamento' && tarefa.status !== 'emRevisao') {
    throw new AppError('INVALID_STATE', 'Only a task that is aFazer, emAndamento or emRevisao can be cancelled.', 409, {
      ruleId: 'cancelamentoPorCriadorOuGestor',
    });
  }

  const personId = ctx.sessionContext.person?.mdmId;
  const isCriador = personId !== undefined && personId === tarefa.criadorId;
  if (!isCriador && !isGestor(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the creator of the task or the gestor can cancel it.', 403, {
      ruleId: 'cancelamentoPorCriadorOuGestor',
    });
  }

  const details: Tarefa['details'] = {};
  if (tarefa.details.descricao !== undefined) details.descricao = tarefa.details.descricao;
  if (tarefa.details.motivoDevolucao !== undefined) details.motivoDevolucao = tarefa.details.motivoDevolucao;
  if (tarefa.details.devolvidaEm !== undefined) details.devolvidaEm = tarefa.details.devolvidaEm;
  if (tarefa.details.concluidaEm !== undefined) details.concluidaEm = tarefa.details.concluidaEm;
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
  return toOutput(saved);
}
