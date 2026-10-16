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

function toOutput(t: Tarefa): AceitarOutput {
  const details: AceitarOutput['details'] = {};
  if (t.details.descricao !== undefined) details.descricao = t.details.descricao;
  if (t.details.motivoDevolucao !== undefined) details.motivoDevolucao = t.details.motivoDevolucao;
  if (t.details.devolvidaEm !== undefined) details.devolvidaEm = t.details.devolvidaEm;
  if (t.details.concluidaEm !== undefined) details.concluidaEm = t.details.concluidaEm;
  if (t.details.canceladaEm !== undefined) details.canceladaEm = t.details.canceladaEm;
  // Derived: calculated from the status, never stored.
  const aberta = t.status === 'aFazer' || t.status === 'emAndamento' || t.status === 'emRevisao';
  details.aberta = aberta;
  details.venceHoje = false;
  details.atrasada = false;
  const out: AceitarOutput = {
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
    details,
  };
  if (t.tarefaPaiId !== undefined) out.tarefaPaiId = t.tarefaPaiId;
  return out;
}

export async function aceitar(input: AceitarInput, ctx: RequestContext): Promise<AceitarOutput> {
  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'id is required.', 400);
  }
  const version = Number(input.version);
  if (!Number.isFinite(version)) {
    throw new AppError('INVALID_INPUT', 'version is required.', 400);
  }

  const tarefa = await repository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Tarefa not found.', 404);
  }

  if (tarefa.version !== version) {
    throw new AppError('VERSION_CONFLICT', 'The task was changed by someone else; reload and try again.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TASK_CLOSED', 'A completed or cancelled task does not change status anymore.', 409, {
      ruleId: 'tarefaEncerradaNaoTransiciona',
    });
  }
  if (tarefa.status !== 'emRevisao') {
    throw new AppError('INVALID_STATE', 'Only a task in review can be accepted.', 409);
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId) {
    throw new AppError('FORBIDDEN', 'The session member could not be identified.', 403, {
      ruleId: 'somenteCriadorRevisa',
    });
  }
  if (actorId !== tarefa.criadorId) {
    throw new AppError('FORBIDDEN', 'Only the creator of the task can accept it.', 403, {
      ruleId: 'somenteCriadorRevisa',
    });
  }

  const details: Tarefa['details'] = {};
  if (tarefa.details.descricao !== undefined) details.descricao = tarefa.details.descricao;
  if (tarefa.details.motivoDevolucao !== undefined) details.motivoDevolucao = tarefa.details.motivoDevolucao;
  if (tarefa.details.devolvidaEm !== undefined) details.devolvidaEm = tarefa.details.devolvidaEm;
  if (tarefa.details.canceladaEm !== undefined) details.canceladaEm = tarefa.details.canceladaEm;
  details.concluidaEm = ctx.clock.nowIso();

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
    details,
  };
  if (tarefa.tarefaPaiId !== undefined) next.tarefaPaiId = tarefa.tarefaPaiId;

  const saved = await repository.transition(next, 'aceitar');
  return toOutput(saved);
}
