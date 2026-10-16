/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
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
  const scope = ctx.sessionContext.actorScope ?? ctx.sessionContext.actorSession?.scope ?? [];
  const actorId = ctx.sessionContext.actorId ?? ctx.sessionContext.actorSession?.actorId;
  return actorId === 'gestor' || scope.some((s) => s === 'gestor' || s.endsWith(':gestor'));
}

export async function updateTarefa(input: UpdateTarefaInput, ctx: RequestContext): Promise<UpdateTarefaOutput> {
  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'id is required.', 400);
  }

  const current = await repository.get(id);
  if (!current) {
    throw new AppError('NOT_FOUND', `Tarefa ${id} not found.`, 404);
  }

  if (input.version !== undefined && input.version !== null && Number(input.version) !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  // edicaoNaoMudaSituacao: editing fields never changes the status; only transitions do.
  if (input.status !== undefined && input.status !== null && String(input.status) !== current.status) {
    throw new AppError('STATUS_CHANGE_NOT_ALLOWED', 'Editing a task cannot change its status; use the transitions.', 409, { ruleId: 'edicaoNaoMudaSituacao' });
  }

  // editarSomenteTarefaVisivel: the member sees tasks they created or are responsible for; the gestor sees all.
  const gestor = isGestor(ctx);
  const actorPersonId = ctx.sessionContext.person?.mdmId;
  if (!gestor) {
    const sees = actorPersonId !== undefined
      && (actorPersonId === current.criadorId || actorPersonId === current.responsavelId);
    if (!sees) {
      throw new AppError('FORBIDDEN', 'Only the creator, the assignee or a manager can edit this task.', 403, { ruleId: 'editarSomenteTarefaVisivel' });
    }
  }

  // tarefaPaiNaoPodeSerElaMesma
  let tarefaPaiId: string | undefined = current.tarefaPaiId;
  if (input.tarefaPaiId !== undefined) {
    const paiRaw = input.tarefaPaiId === null ? '' : String(input.tarefaPaiId);
    tarefaPaiId = paiRaw === '' ? undefined : paiRaw;
  }
  if (tarefaPaiId !== undefined && tarefaPaiId === current.id) {
    throw new AppError('INVALID_PARENT_TASK', 'The parent task cannot be the task itself.', 400, { ruleId: 'tarefaPaiNaoPodeSerElaMesma' });
  }

  // reatribuicaoPorCriadorOuGestor
  let responsavelId = current.responsavelId;
  if (input.responsavelId !== undefined && input.responsavelId !== null && String(input.responsavelId) !== '') {
    const novo = String(input.responsavelId);
    if (novo !== current.responsavelId) {
      const isCriador = actorPersonId !== undefined && actorPersonId === current.criadorId;
      if (!isCriador && !gestor) {
        throw new AppError('FORBIDDEN', 'Only the creator or a manager can change the assignee.', 403, { ruleId: 'reatribuicaoPorCriadorOuGestor' });
      }
      responsavelId = novo;
    }
  }

  let titulo = current.titulo;
  if (input.titulo !== undefined) {
    titulo = String(input.titulo).trim();
    if (titulo === '' || titulo.length > 200) {
      throw new AppError('INVALID_INPUT', 'titulo is required and must have at most 200 characters.', 400);
    }
  }

  let prioridade = current.prioridade;
  if (input.prioridade !== undefined) {
    const p = String(input.prioridade) as Tarefa['prioridade'];
    if (!PRIORIDADES.includes(p)) {
      throw new AppError('INVALID_INPUT', 'prioridade must be low, medium or high.', 400);
    }
    prioridade = p;
  }

  let prazo = current.prazo;
  if (input.prazo !== undefined) {
    prazo = String(input.prazo);
    if (prazo === '') {
      throw new AppError('INVALID_INPUT', 'prazo is required.', 400);
    }
  }

  let listaId = current.listaId;
  if (input.listaId !== undefined) {
    listaId = String(input.listaId);
    if (listaId === '') {
      throw new AppError('INVALID_INPUT', 'listaId is required.', 400);
    }
  }

  const descricao = input.details?.descricao !== undefined ? String(input.details.descricao) : current.details?.descricao;

  // The status, criador, chaveCriacao and criadaEm are kept as stored.
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
    tarefaPaiId,
    chaveCriacao: current.chaveCriacao,
    criadaEm: current.criadaEm,
    details: {
      descricao,
      motivoDevolucao: current.details?.motivoDevolucao,
      devolvidaEm: current.details?.devolvidaEm,
      concluidaEm: current.details?.concluidaEm,
      canceladaEm: current.details?.canceladaEm,
    },
  };

  const saved = await repository.update(next);

  const out: UpdateTarefaOutput = {
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
      aberta: saved.status === 'aFazer' || saved.status === 'emAndamento' || saved.status === 'emRevisao',
    },
  };
  if (saved.tarefaPaiId !== undefined) {
    out.tarefaPaiId = saved.tarefaPaiId;
  }
  return out;
}
