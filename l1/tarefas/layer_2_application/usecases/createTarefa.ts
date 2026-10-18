/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/createTarefa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';

export interface CreateTarefaInput extends Record<string, unknown> {
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
}

export interface CreateTarefaOutput extends Record<string, unknown> {
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

function toOutput(t: Tarefa): CreateTarefaOutput {
  const out: CreateTarefaOutput = {
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
    details: {},
  };
  if (t.tarefaPaiId) out.tarefaPaiId = t.tarefaPaiId;
  if (t.details?.descricao !== undefined) out.details.descricao = t.details.descricao;
  if (t.details?.motivoDevolucao !== undefined) out.details.motivoDevolucao = t.details.motivoDevolucao;
  if (t.details?.devolvidaEm !== undefined) out.details.devolvidaEm = t.details.devolvidaEm;
  if (t.details?.concluidaEm !== undefined) out.details.concluidaEm = t.details.concluidaEm;
  if (t.details?.canceladaEm !== undefined) out.details.canceladaEm = t.details.canceladaEm;
  return out;
}

function requiredText(value: unknown, name: string): string {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) throw new AppError('INVALID_INPUT', `${name} is required.`, 400);
  return text;
}

export async function createTarefa(input: CreateTarefaInput, ctx: RequestContext): Promise<CreateTarefaOutput> {
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const listaRepository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');

  // criacaoIdempotente: the creation key is what makes a resend safe, so it is required.
  const chaveRaw = typeof input.chaveCriacao === 'string' ? input.chaveCriacao.trim() : '';
  if (!chaveRaw) {
    throw new AppError('INVALID_INPUT', 'chaveCriacao is required so the creation can be resent without duplicating the task.', 400, {
      ruleId: 'criacaoIdempotente',
    });
  }
  const chaveCriacao = chaveRaw;

  // criacaoIdempotente: the same creation key returns the task already created.
  const existing = await tarefaRepository.list({ chaveCriacao });
  const already = existing.find((t) => t.chaveCriacao === chaveCriacao);
  if (already) return toOutput(already);

  const titulo = requiredText(input.titulo, 'titulo');
  if (titulo.length > 200) {
    throw new AppError('INVALID_INPUT', 'titulo must have at most 200 characters.', 400);
  }
  const prazo = requiredText(input.prazo, 'prazo');
  const listaId = requiredText(input.listaId, 'listaId');
  const responsavelId = requiredText(input.responsavelId, 'responsavelId');
  const prioridadeRaw = requiredText(input.prioridade, 'prioridade');
  let prioridade: Tarefa['prioridade'];
  if (prioridadeRaw === 'low' || prioridadeRaw === 'medium' || prioridadeRaw === 'high') {
    prioridade = prioridadeRaw;
  } else {
    throw new AppError('INVALID_INPUT', 'prioridade must be low, medium or high.', 400);
  }

  // The creator is the member of the session.
  const criadorId = ctx.sessionContext.person?.mdmId;
  if (!criadorId) {
    throw new AppError('INVALID_INPUT', 'The session has no member to be the creator of the task.', 400);
  }

  const id = ctx.idGenerator.newId();

  const tarefaPaiRaw = input.tarefaPaiId;
  const tarefaPaiId = typeof tarefaPaiRaw === 'string' && tarefaPaiRaw.trim() ? tarefaPaiRaw.trim() : undefined;
  if (tarefaPaiId !== undefined) {
    if (tarefaPaiId === id) {
      throw new AppError('TAREFA_PAI_INVALIDA', 'The parent task cannot be the task itself.', 400, {
        ruleId: 'tarefaPaiNaoPodeSerElaMesma',
      });
    }
    const pai = await tarefaRepository.get(tarefaPaiId);
    if (!pai) throw new AppError('NOT_FOUND', 'Parent task not found.', 404);
  }

  // listaInativaNaoRecebeTarefa
  const lista = await listaRepository.get(listaId);
  if (!lista) throw new AppError('NOT_FOUND', 'List not found.', 404);
  if (!lista.ativa) {
    throw new AppError('LISTA_INATIVA', 'An inactive list cannot receive new tasks.', 409, {
      ruleId: 'listaInativaNaoRecebeTarefa',
    });
  }

  const descricao = typeof input.details?.descricao === 'string' ? input.details.descricao : undefined;

  const tarefa: Tarefa = {
    id,
    version: 1,
    titulo,
    status: 'aFazer',
    prioridade,
    prazo,
    listaId,
    responsavelId,
    criadorId,
    chaveCriacao,
    criadaEm: ctx.clock.nowIso(),
    details: {},
  };
  if (tarefaPaiId !== undefined) tarefa.tarefaPaiId = tarefaPaiId;
  if (descricao !== undefined) tarefa.details.descricao = descricao;

  const created = await tarefaRepository.create(tarefa);
  return toOutput(created);
}
