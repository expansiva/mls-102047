/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import type { ItemChecklistRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/itemChecklistRepository.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

export interface UpdateTarefaInput extends Record<string, unknown> {
  titulo: string;
  status: string;
  prioridade: string;
  prazo: string;
  listaId: string;
  responsavelId: string;
  criadorId: string;
  tarefaPaiId?: string;
  chaveCriacao: string;
  details: {
    descricao?: string;
    motivoDevolucao?: string;
    devolvidaEm?: string;
    concluidaEm?: string;
    canceladaEm?: string;
  };
  id: string;
  version: number;
}

export interface UpdateTarefaOutput extends Record<string, unknown> {
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

const PRIORIDADES = ['low', 'medium', 'high'];

function isGestor(ctx: RequestContext): boolean {
  const session = ctx.sessionContext;
  if (session.actorId === 'gestor') return true;
  const scope = session.actorScope ?? session.actorSession?.scope ?? [];
  return scope.some((s) => s === 'gestor' || s.endsWith(':gestor'));
}

function optionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  const text = String(value);
  return text === '' ? undefined : text;
}

export async function updateTarefa(input: UpdateTarefaInput, ctx: RequestContext): Promise<UpdateTarefaOutput> {
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const listaRepository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');
  const itemRepository = resolveRepository<ItemChecklistRepository>(ctx, 'ItemChecklistRepository');

  const id = String(input.id ?? '');
  if (!id) throw new AppError('INVALID_INPUT', 'id is required.', 400);

  const existing = await tarefaRepository.get(id);
  if (!existing) throw new AppError('NOT_FOUND', 'Tarefa not found: ' + id, 404);

  if (input.version !== undefined && input.version !== null && Number(input.version) !== existing.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  // editarSomenteTarefaVisivel
  const gestor = isGestor(ctx);
  const actorId = ctx.sessionContext.person?.mdmId;
  if (!gestor) {
    if (!actorId) {
      throw new AppError('FORBIDDEN', 'The session has no team member to edit the task.', 403, { ruleId: 'editarSomenteTarefaVisivel' });
    }
    if (actorId !== existing.criadorId && actorId !== existing.responsavelId) {
      throw new AppError('FORBIDDEN', 'Only the creator, the assignee or the manager can edit this task.', 403, { ruleId: 'editarSomenteTarefaVisivel' });
    }
  }

  // edicaoNaoMudaSituacao / tarefaEncerradaNaoTransiciona
  const requestedStatus = optionalString(input.status);
  if (requestedStatus !== undefined && requestedStatus !== existing.status) {
    if (existing.status === 'concluida' || existing.status === 'cancelada') {
      throw new AppError('TASK_CLOSED', 'A completed or cancelled task no longer changes status.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
    }
    throw new AppError('STATUS_CHANGE_NOT_ALLOWED', 'Editing a task never changes its status; use the transitions.', 409, { ruleId: 'edicaoNaoMudaSituacao' });
  }

  // fields
  const titulo = input.titulo === undefined ? existing.titulo : String(input.titulo).trim();
  if (!titulo) throw new AppError('INVALID_INPUT', 'titulo is required.', 400);
  if (titulo.length > 200) throw new AppError('INVALID_INPUT', 'titulo must have at most 200 characters.', 400);

  const prioridadeText = input.prioridade === undefined ? existing.prioridade : String(input.prioridade);
  if (!PRIORIDADES.includes(prioridadeText)) {
    throw new AppError('INVALID_INPUT', 'prioridade must be low, medium or high.', 400);
  }
  const prioridade = prioridadeText as Tarefa['prioridade'];

  const prazo = optionalString(input.prazo) ?? existing.prazo;
  const listaId = optionalString(input.listaId) ?? existing.listaId;
  const responsavelId = optionalString(input.responsavelId) ?? existing.responsavelId;
  const tarefaPaiId = input.tarefaPaiId === undefined ? existing.tarefaPaiId : optionalString(input.tarefaPaiId);

  // tarefaPaiNaoPodeSerElaMesma
  if (tarefaPaiId !== undefined) {
    if (tarefaPaiId === existing.id) {
      throw new AppError('INVALID_PARENT', 'The parent task cannot be the task itself.', 400, { ruleId: 'tarefaPaiNaoPodeSerElaMesma' });
    }
    if (tarefaPaiId !== existing.tarefaPaiId) {
      const pai = await tarefaRepository.get(tarefaPaiId);
      if (!pai) throw new AppError('NOT_FOUND', 'Parent task not found: ' + tarefaPaiId, 404);
    }
  }

  // reatribuicaoPorCriadorOuGestor
  if (responsavelId !== existing.responsavelId) {
    const isCriador = actorId !== undefined && actorId === existing.criadorId;
    if (!gestor && !isCriador) {
      throw new AppError('FORBIDDEN', 'Only the creator or the manager can change the assignee.', 403, { ruleId: 'reatribuicaoPorCriadorOuGestor' });
    }
  }

  // listaInativaNaoRecebeTarefa (when the task moves to another list)
  if (listaId !== existing.listaId) {
    const lista = await listaRepository.get(listaId);
    if (!lista) throw new AppError('NOT_FOUND', 'Lista not found: ' + listaId, 404);
    if (!lista.ativa) {
      throw new AppError('LISTA_INATIVA', 'An inactive list cannot receive tasks.', 409, { ruleId: 'listaInativaNaoRecebeTarefa' });
    }
  }

  const descricao = input.details?.descricao === undefined ? existing.details.descricao : String(input.details.descricao);

  const details: Tarefa['details'] = {};
  if (descricao !== undefined) details.descricao = descricao;
  if (existing.details.motivoDevolucao !== undefined) details.motivoDevolucao = existing.details.motivoDevolucao;
  if (existing.details.devolvidaEm !== undefined) details.devolvidaEm = existing.details.devolvidaEm;
  if (existing.details.concluidaEm !== undefined) details.concluidaEm = existing.details.concluidaEm;
  if (existing.details.canceladaEm !== undefined) details.canceladaEm = existing.details.canceladaEm;

  const toStore: Tarefa = {
    id: existing.id,
    version: existing.version,
    titulo,
    status: existing.status,
    prioridade,
    prazo,
    listaId,
    responsavelId,
    criadorId: existing.criadorId,
    chaveCriacao: existing.chaveCriacao,
    criadaEm: existing.criadaEm,
    details,
  };
  if (tarefaPaiId !== undefined) toStore.tarefaPaiId = tarefaPaiId;

  const saved = await tarefaRepository.update(toStore);

  // derived values, calculated every time
  const today = ctx.clock.nowIso().slice(0, 10);
  const aberta = saved.status === 'aFazer' || saved.status === 'emAndamento' || saved.status === 'emRevisao';
  const prazoDay = saved.prazo.slice(0, 10);
  const filhas = await tarefaRepository.list({ tarefaPaiId: saved.id });
  const itens = await itemRepository.list({ tarefaId: saved.id });
  const feitos = itens.filter((item) => item.feito).length;

  const outDetails: UpdateTarefaOutput['details'] = {
    aberta,
    venceHoje: aberta && prazoDay === today,
    atrasada: aberta && prazoDay < today,
    quantidadeSubtarefas: filhas.length,
    progressoChecklist: feitos + '/' + itens.length,
  };
  if (saved.details.descricao !== undefined) outDetails.descricao = saved.details.descricao;
  if (saved.details.motivoDevolucao !== undefined) outDetails.motivoDevolucao = saved.details.motivoDevolucao;
  if (saved.details.devolvidaEm !== undefined) outDetails.devolvidaEm = saved.details.devolvidaEm;
  if (saved.details.concluidaEm !== undefined) outDetails.concluidaEm = saved.details.concluidaEm;
  if (saved.details.canceladaEm !== undefined) outDetails.canceladaEm = saved.details.canceladaEm;

  const output: UpdateTarefaOutput = {
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
