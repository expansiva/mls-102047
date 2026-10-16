/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/createTarefa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import type { ItemChecklistRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/itemChecklistRepository.js';
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

const PRIORIDADES = ['low', 'medium', 'high'] as const;

function requiredText(value: unknown, field: string): string {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) {
    throw new AppError('VALIDATION_ERROR', `${field} is required.`, 400);
  }
  return text;
}

async function toOutput(tarefa: Tarefa, ctx: RequestContext): Promise<CreateTarefaOutput> {
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const itemRepository = resolveRepository<ItemChecklistRepository>(ctx, 'ItemChecklistRepository');
  const today = ctx.clock.nowIso().slice(0, 10);
  const subtarefas = await tarefaRepository.list({ tarefaPaiId: tarefa.id });
  const itens = await itemRepository.list({ tarefaId: tarefa.id });
  const feitos = itens.filter((item) => item.feito === true).length;
  const aberta = tarefa.status === 'aFazer' || tarefa.status === 'emAndamento' || tarefa.status === 'emRevisao';
  const prazoDia = String(tarefa.prazo).slice(0, 10);

  const details: CreateTarefaOutput['details'] = {};
  if (tarefa.details?.descricao !== undefined) details.descricao = tarefa.details.descricao;
  if (tarefa.details?.motivoDevolucao !== undefined) details.motivoDevolucao = tarefa.details.motivoDevolucao;
  if (tarefa.details?.devolvidaEm !== undefined) details.devolvidaEm = tarefa.details.devolvidaEm;
  if (tarefa.details?.concluidaEm !== undefined) details.concluidaEm = tarefa.details.concluidaEm;
  if (tarefa.details?.canceladaEm !== undefined) details.canceladaEm = tarefa.details.canceladaEm;
  // Derived values are calculated here every time, never stored.
  details.aberta = aberta;
  details.venceHoje = aberta && prazoDia === today;
  details.atrasada = aberta && prazoDia < today;
  details.quantidadeSubtarefas = subtarefas.length;
  details.progressoChecklist = `${feitos}/${itens.length}`;

  const output: CreateTarefaOutput = {
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
  if (tarefa.tarefaPaiId !== undefined) {
    output.tarefaPaiId = tarefa.tarefaPaiId;
  }
  return output;
}

export async function createTarefa(input: CreateTarefaInput, ctx: RequestContext): Promise<CreateTarefaOutput> {
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  // criacaoIdempotente: the creation key identifies the creation; without it a resend could not be recognized.
  const chaveText = typeof input.chaveCriacao === 'string' ? input.chaveCriacao.trim() : '';
  if (!chaveText) {
    throw new AppError('CHAVE_CRIACAO_OBRIGATORIA', 'chaveCriacao is required so that a resend does not create a second task.', 400, {
      ruleId: 'criacaoIdempotente',
    });
  }
  const chaveCriacao = chaveText;

  // criacaoIdempotente: the same creation key returns the task already created.
  const existentes = await tarefaRepository.list({ chaveCriacao });
  const existente = existentes.find((item) => item.chaveCriacao === chaveCriacao);
  if (existente) {
    return toOutput(existente, ctx);
  }

  const titulo = requiredText(input.titulo, 'titulo');
  if (titulo.length > 200) {
    throw new AppError('VALIDATION_ERROR', 'titulo must have at most 200 characters.', 400);
  }
  const prazo = requiredText(input.prazo, 'prazo');
  const listaId = requiredText(input.listaId, 'listaId');
  const responsavelId = requiredText(input.responsavelId, 'responsavelId');
  const prioridadeText = requiredText(input.prioridade, 'prioridade');
  const prioridade = PRIORIDADES.find((value) => value === prioridadeText);
  if (!prioridade) {
    throw new AppError('VALIDATION_ERROR', 'prioridade must be low, medium or high.', 400);
  }

  // The creator is the session member, set by the system.
  const criadorId = ctx.sessionContext.person?.mdmId;
  if (!criadorId) {
    throw new AppError('VALIDATION_ERROR', 'The session has no team member to be the creator of the task.', 400);
  }

  // listaInativaNaoRecebeTarefa: the list must exist and be active.
  const listaRepository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');
  const lista = await listaRepository.get(listaId);
  if (!lista) {
    throw new AppError('NOT_FOUND', 'Lista not found.', 404);
  }
  if (lista.ativa !== true) {
    throw new AppError('LISTA_INATIVA', 'An inactive list cannot receive new tasks.', 409, { ruleId: 'listaInativaNaoRecebeTarefa' });
  }

  const id = ctx.idGenerator.newId();
  const tarefaPaiText = typeof input.tarefaPaiId === 'string' ? input.tarefaPaiId.trim() : '';
  if (tarefaPaiText) {
    if (tarefaPaiText === id) {
      throw new AppError('TAREFA_PAI_INVALIDA', 'The parent task cannot be the task itself.', 400, { ruleId: 'tarefaPaiNaoPodeSerElaMesma' });
    }
    const pai = await tarefaRepository.get(tarefaPaiText);
    if (!pai) {
      throw new AppError('NOT_FOUND', 'Parent task not found.', 404);
    }
  }

  const descricao = typeof input.details?.descricao === 'string' ? input.details.descricao : undefined;

  const nova: Tarefa = {
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
  if (tarefaPaiText) {
    nova.tarefaPaiId = tarefaPaiText;
  }
  if (descricao !== undefined) {
    nova.details.descricao = descricao;
  }

  const criada = await tarefaRepository.create(nova);
  return toOutput(criada, ctx);
}
