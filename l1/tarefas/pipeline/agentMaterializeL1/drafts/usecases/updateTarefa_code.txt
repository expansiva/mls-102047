/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
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

const PRIORIDADES: ReadonlyArray<Tarefa['prioridade']> = ['low', 'medium', 'high'];

function isGestor(ctx: RequestContext): boolean {
  const session = ctx.sessionContext;
  if (session.actorId === 'gestor') return true;
  const scope = session.actorScope ?? session.actorSession?.scope ?? [];
  return scope.some((entry) => entry === 'gestor' || entry.endsWith(':gestor'));
}

function currentActorId(ctx: RequestContext): string | undefined {
  const session = ctx.sessionContext;
  return session.person?.mdmId ?? session.actorId ?? session.actorSession?.actorId;
}

function text(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  return String(value);
}

export async function updateTarefa(input: UpdateTarefaInput, ctx: RequestContext): Promise<UpdateTarefaOutput> {
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'The task id is required.', 400);
  }

  const current = await tarefaRepository.get(id);
  if (!current) {
    throw new AppError('NOT_FOUND', 'Task not found.', 404);
  }

  if (input.version !== undefined && input.version !== null && Number(input.version) !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'The task was changed by someone else; reload and try again.', 409);
  }

  // edicaoNaoMudaSituacao: editing fields never changes the status; only transitions do
  if (input.status !== undefined && input.status !== null && String(input.status) !== current.status) {
    throw new AppError('STATUS_CHANGE_NOT_ALLOWED', 'Editing a task cannot change its status; use the process transitions.', 409, { ruleId: 'edicaoNaoMudaSituacao' });
  }

  const gestor = isGestor(ctx);
  const actorId = currentActorId(ctx);

  // editarSomenteTarefaVisivel
  const visible = gestor || (actorId !== undefined && (actorId === current.criadorId || actorId === current.responsavelId));
  if (!visible) {
    throw new AppError('FORBIDDEN', 'Only the creator, the assignee or a manager can edit this task.', 403, { ruleId: 'editarSomenteTarefaVisivel' });
  }

  // fields
  const titulo = input.titulo !== undefined ? String(input.titulo).trim() : current.titulo;
  if (!titulo) {
    throw new AppError('INVALID_INPUT', 'The task title is required.', 400);
  }
  if (titulo.length > 200) {
    throw new AppError('INVALID_INPUT', 'The task title must have at most 200 characters.', 400);
  }

  let prioridade: Tarefa['prioridade'] = current.prioridade;
  if (input.prioridade !== undefined) {
    const candidate = String(input.prioridade) as Tarefa['prioridade'];
    if (!PRIORIDADES.includes(candidate)) {
      throw new AppError('INVALID_INPUT', 'The priority must be low, medium or high.', 400);
    }
    prioridade = candidate;
  }

  const prazo = input.prazo !== undefined ? String(input.prazo) : current.prazo;
  if (!prazo) {
    throw new AppError('INVALID_INPUT', 'The task due date is required.', 400);
  }

  const listaId = input.listaId !== undefined ? String(input.listaId) : current.listaId;
  if (!listaId) {
    throw new AppError('INVALID_INPUT', 'The task list is required.', 400);
  }

  // reatribuicaoPorCriadorOuGestor
  const responsavelId = input.responsavelId !== undefined ? String(input.responsavelId) : current.responsavelId;
  if (!responsavelId) {
    throw new AppError('INVALID_INPUT', 'The task assignee is required.', 400);
  }
  if (responsavelId !== current.responsavelId) {
    const isCriador = actorId !== undefined && actorId === current.criadorId;
    if (!isCriador && !gestor) {
      throw new AppError('FORBIDDEN', 'Only the creator or a manager can change the assignee.', 403, { ruleId: 'reatribuicaoPorCriadorOuGestor' });
    }
  }

  // tarefaPaiNaoPodeSerElaMesma
  let tarefaPaiId: string | undefined = current.tarefaPaiId;
  if ('tarefaPaiId' in input) {
    const raw = text(input.tarefaPaiId);
    tarefaPaiId = raw === undefined || raw === '' ? undefined : raw;
  }
  if (tarefaPaiId !== undefined && tarefaPaiId === current.id) {
    throw new AppError('INVALID_INPUT', 'The parent task cannot be the task itself.', 400, { ruleId: 'tarefaPaiNaoPodeSerElaMesma' });
  }
  if (tarefaPaiId !== undefined && tarefaPaiId !== current.tarefaPaiId) {
    const pai = await tarefaRepository.get(tarefaPaiId);
    if (!pai) {
      throw new AppError('NOT_FOUND', 'Parent task not found.', 404);
    }
  }

  // details: only stored fields, never the derived ones
  const inputDetails = input.details;
  const details: Tarefa['details'] = {};
  const descricao = inputDetails && inputDetails.descricao !== undefined ? text(inputDetails.descricao) : current.details?.descricao;
  if (descricao !== undefined) details.descricao = descricao;
  const prev = current.details;
  if (prev?.motivoDevolucao !== undefined) details.motivoDevolucao = prev.motivoDevolucao;
  if (prev?.devolvidaEm !== undefined) details.devolvidaEm = prev.devolvidaEm;
  if (prev?.concluidaEm !== undefined) details.concluidaEm = prev.concluidaEm;
  if (prev?.canceladaEm !== undefined) details.canceladaEm = prev.canceladaEm;

  // status, creator, creation key and creation time stay as stored
  const next: Tarefa = {
    id: current.id,
    version: current.version,
    titulo,
    status: current.status,
    prioridade,
    prazo,
    listaId,
    responsavelId,
    criadorId: current.criadorId,
    chaveCriacao: current.chaveCriacao,
    criadaEm: current.criadaEm,
    details,
  };
  if (tarefaPaiId !== undefined) next.tarefaPaiId = tarefaPaiId;

  const saved = await tarefaRepository.update(next);

  // derived values, computed every time
  const itemRepository = resolveRepository<ItemChecklistRepository>(ctx, 'ItemChecklistRepository');
  const subtarefas = await tarefaRepository.list({ tarefaPaiId: saved.id });
  const itens = await itemRepository.list({ tarefaId: saved.id });
  const feitos = itens.filter((item) => item.feito).length;
  const aberta = saved.status === 'aFazer' || saved.status === 'emAndamento' || saved.status === 'emRevisao';
  const hoje = ctx.clock.nowIso().slice(0, 10);
  const prazoDia = saved.prazo.slice(0, 10);

  const outDetails: UpdateTarefaOutput['details'] = {
    aberta,
    venceHoje: aberta && prazoDia === hoje,
    atrasada: aberta && prazoDia < hoje,
    quantidadeSubtarefas: subtarefas.length,
    progressoChecklist: `${feitos}/${itens.length}`,
  };
  const sd = saved.details;
  if (sd?.descricao !== undefined) outDetails.descricao = sd.descricao;
  if (sd?.motivoDevolucao !== undefined) outDetails.motivoDevolucao = sd.motivoDevolucao;
  if (sd?.devolvidaEm !== undefined) outDetails.devolvidaEm = sd.devolvidaEm;
  if (sd?.concluidaEm !== undefined) outDetails.concluidaEm = sd.concluidaEm;
  if (sd?.canceladaEm !== undefined) outDetails.canceladaEm = sd.canceladaEm;

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
