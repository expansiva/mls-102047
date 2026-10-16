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

function storedDetails(details: Tarefa['details']): Tarefa['details'] {
  const out: Tarefa['details'] = {};
  if (details.descricao !== undefined) out.descricao = details.descricao;
  if (details.motivoDevolucao !== undefined) out.motivoDevolucao = details.motivoDevolucao;
  if (details.devolvidaEm !== undefined) out.devolvidaEm = details.devolvidaEm;
  if (details.concluidaEm !== undefined) out.concluidaEm = details.concluidaEm;
  if (details.canceladaEm !== undefined) out.canceladaEm = details.canceladaEm;
  return out;
}

function toOutput(tarefa: Tarefa, todayIso: string): DevolverOutput {
  const aberta = tarefa.status === 'aFazer' || tarefa.status === 'emAndamento' || tarefa.status === 'emRevisao';
  const prazoDay = String(tarefa.prazo).slice(0, 10);
  const today = todayIso.slice(0, 10);
  const details: DevolverOutput['details'] = {
    ...storedDetails(tarefa.details),
    aberta,
    venceHoje: aberta && prazoDay === today,
    atrasada: aberta && prazoDay < today,
  };
  const out: DevolverOutput = {
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
  if (tarefa.tarefaPaiId !== undefined) out.tarefaPaiId = tarefa.tarefaPaiId;
  return out;
}

export async function devolver(input: DevolverInput, ctx: RequestContext): Promise<DevolverOutput> {
  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  const id = String(input.id ?? '');
  if (id === '') {
    throw new AppError('INVALID_INPUT', 'id is required.', 400);
  }
  const inputVersion = Number(input.version);
  if (!Number.isFinite(inputVersion)) {
    throw new AppError('INVALID_INPUT', 'version is required.', 400);
  }

  const motivoRaw = input.details?.motivoDevolucao;
  const motivo = typeof motivoRaw === 'string' ? motivoRaw.trim() : '';
  if (motivo === '') {
    throw new AppError('MOTIVO_REQUIRED', 'Returning a task for adjustment requires the reason.', 400, { ruleId: 'devolucaoExigeMotivo' });
  }
  if (motivo.length > 2000) {
    throw new AppError('MOTIVO_TOO_LONG', 'The return reason must have at most 2000 characters.', 400, { ruleId: 'devolucaoExigeMotivo' });
  }

  const current = await repository.get(id);
  if (!current) {
    throw new AppError('NOT_FOUND', 'Tarefa not found.', 404);
  }

  if (current.status === 'concluida' || current.status === 'cancelada') {
    throw new AppError('TAREFA_ENCERRADA', 'A completed or cancelled task no longer changes status.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }
  if (current.status !== 'emRevisao') {
    throw new AppError('INVALID_STATE', 'Only a task under review can be returned for adjustment.', 409, { ruleId: 'somenteCriadorRevisa' });
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId || actorId !== current.criadorId) {
    throw new AppError('FORBIDDEN', 'Only the creator of the task can return it for adjustment.', 403, { ruleId: 'somenteCriadorRevisa' });
  }

  if (inputVersion !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  const now = ctx.clock.nowIso();
  const next: Tarefa = {
    ...current,
    status: 'emAndamento',
    details: {
      ...storedDetails(current.details),
      motivoDevolucao: motivo,
      devolvidaEm: now,
    },
  };

  const saved = await repository.transition(next, 'devolver');
  return toOutput(saved, now);
}
