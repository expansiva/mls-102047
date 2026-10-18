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
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('VALIDATION_ERROR', 'id is required.', 400);
  }

  const rawMotivo = (input.details as { motivoDevolucao?: unknown } | undefined)?.motivoDevolucao;
  const motivo = typeof rawMotivo === 'string' ? rawMotivo.trim() : '';
  if (!motivo) {
    throw new AppError('MOTIVO_DEVOLUCAO_REQUIRED', 'The return reason is required to send a task back for adjustment.', 400, { ruleId: 'devolucaoExigeMotivo' });
  }
  if (motivo.length > 2000) {
    throw new AppError('MOTIVO_DEVOLUCAO_TOO_LONG', 'The return reason must have at most 2000 characters.', 400, { ruleId: 'devolucaoExigeMotivo' });
  }

  const tarefa = await tarefaRepository.get(id);
  if (!tarefa) {
    throw new AppError('NOT_FOUND', 'Tarefa not found.', 404);
  }

  if (input.version !== undefined && input.version !== null && Number(input.version) !== tarefa.version) {
    throw new AppError('VERSION_CONFLICT', 'The task was changed by someone else; reload and try again.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TAREFA_ENCERRADA', 'A closed task (completed or cancelled) does not change status anymore.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }
  if (tarefa.status !== 'emRevisao') {
    throw new AppError('INVALID_STATE', 'Only a task in review can be sent back for adjustment.', 409);
  }

  const actorPersonId = ctx.sessionContext.person?.mdmId;
  if (!actorPersonId) {
    throw new AppError('FORBIDDEN', 'The session person is required to review a task.', 403, { ruleId: 'somenteCriadorRevisa' });
  }
  if (actorPersonId !== tarefa.criadorId) {
    throw new AppError('FORBIDDEN', 'Only the creator of the task can send it back for adjustment.', 403, { ruleId: 'somenteCriadorRevisa' });
  }

  const nowIso = ctx.clock.nowIso();
  const details: Tarefa['details'] = {
    motivoDevolucao: motivo,
    devolvidaEm: nowIso,
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

  const saved = await tarefaRepository.transition(next, 'devolver');

  const today = nowIso.slice(0, 10);
  const prazoDay = String(saved.prazo).slice(0, 10);
  const aberta = saved.status === 'aFazer' || saved.status === 'emAndamento' || saved.status === 'emRevisao';

  const outDetails: DevolverOutput['details'] = {
    aberta,
    venceHoje: aberta && prazoDay === today,
    atrasada: aberta && prazoDay < today,
  };
  if (saved.details?.descricao !== undefined) outDetails.descricao = saved.details.descricao;
  if (saved.details?.motivoDevolucao !== undefined) outDetails.motivoDevolucao = saved.details.motivoDevolucao;
  if (saved.details?.devolvidaEm !== undefined) outDetails.devolvidaEm = saved.details.devolvidaEm;
  if (saved.details?.concluidaEm !== undefined) outDetails.concluidaEm = saved.details.concluidaEm;
  if (saved.details?.canceladaEm !== undefined) outDetails.canceladaEm = saved.details.canceladaEm;

  const output: DevolverOutput = {
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
