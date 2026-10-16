/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/enviarParaRevisao.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

export interface EnviarParaRevisaoInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface EnviarParaRevisaoOutput extends Record<string, unknown> {
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

export async function enviarParaRevisao(input: EnviarParaRevisaoInput, ctx: RequestContext): Promise<EnviarParaRevisaoOutput> {
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
    throw new AppError('NOT_FOUND', 'Tarefa not found.', 404);
  }
  if (tarefa.version !== version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
    throw new AppError('TAREFA_ENCERRADA', 'A closed task cannot change status.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
  }
  if (tarefa.status !== 'emAndamento') {
    throw new AppError('INVALID_STATE', 'Only a task in progress can be sent to review.', 409);
  }

  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId) {
    throw new AppError('FORBIDDEN', 'The session has no identified team member.', 403, { ruleId: 'somenteResponsavelExecuta' });
  }
  if (actorId !== tarefa.responsavelId) {
    throw new AppError('FORBIDDEN', 'Only the task assignee can send it to review.', 403, { ruleId: 'somenteResponsavelExecuta' });
  }

  const {
    aberta: _aberta,
    venceHoje: _venceHoje,
    atrasada: _atrasada,
    quantidadeSubtarefas: _quantidadeSubtarefas,
    progressoChecklist: _progressoChecklist,
    ...storedDetails
  } = tarefa.details;
  void _aberta;
  void _venceHoje;
  void _atrasada;
  void _quantidadeSubtarefas;
  void _progressoChecklist;

  const next: Tarefa = {
    ...tarefa,
    status: 'emRevisao',
    details: storedDetails,
  };
  const saved = await repository.transition(next, 'enviarParaRevisao');

  const output: EnviarParaRevisaoOutput = {
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
      aberta: saved.status !== 'concluida' && saved.status !== 'cancelada',
    },
  };
  if (saved.tarefaPaiId !== undefined) {
    output.tarefaPaiId = saved.tarefaPaiId;
  }
  return output;
}
