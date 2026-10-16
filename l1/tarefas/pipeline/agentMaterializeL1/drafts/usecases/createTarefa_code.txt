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
  prioridade: string;
  prazo: string;
  listaId: string;
  responsavelId: string;
  tarefaPaiId?: string;
  chaveCriacao: string;
  details?: {
    descricao?: string;
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

const PRIORIDADES: ReadonlyArray<Tarefa['prioridade']> = ['low', 'medium', 'high'];

function requiredText(value: unknown, name: string): string {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) {
    throw new AppError('INVALID_INPUT', `${name} is required.`, 400);
  }
  return text;
}

async function toOutput(tarefa: Tarefa, ctx: RequestContext, tarefaRepository: TarefaRepository): Promise<CreateTarefaOutput> {
  const itemRepository = resolveRepository<ItemChecklistRepository>(ctx, 'ItemChecklistRepository');
  const subtarefas = await tarefaRepository.list({ tarefaPaiId: tarefa.id });
  const itens = await itemRepository.list({ tarefaId: tarefa.id });
  const feitos = itens.filter((item) => item.feito).length;
  const hoje = ctx.clock.nowIso().slice(0, 10);
  const prazoDia = tarefa.prazo.slice(0, 10);
  const aberta = tarefa.status === 'aFazer' || tarefa.status === 'emAndamento' || tarefa.status === 'emRevisao';
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
    details: {
      descricao: tarefa.details?.descricao,
      motivoDevolucao: tarefa.details?.motivoDevolucao,
      devolvidaEm: tarefa.details?.devolvidaEm,
      concluidaEm: tarefa.details?.concluidaEm,
      canceladaEm: tarefa.details?.canceladaEm,
      aberta,
      venceHoje: aberta && prazoDia === hoje,
      atrasada: aberta && prazoDia < hoje,
      quantidadeSubtarefas: subtarefas.length,
      progressoChecklist: `${feitos}/${itens.length}`,
    },
  };
  if (tarefa.tarefaPaiId) {
    output.tarefaPaiId = tarefa.tarefaPaiId;
  }
  return output;
}

export async function createTarefa(input: CreateTarefaInput, ctx: RequestContext): Promise<CreateTarefaOutput> {
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const listaRepository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');

  const chaveCriacao = requiredText(input.chaveCriacao, 'chaveCriacao');

  // criacaoIdempotente: the same creation key returns the task already created.
  const existentes = await tarefaRepository.list({ chaveCriacao });
  if (existentes.length > 0) {
    const existente = existentes[0];
    if (existente.chaveCriacao !== chaveCriacao) {
      throw new AppError('IDEMPOTENCY_MISMATCH', 'The stored task does not match the creation key.', 409, { ruleId: 'criacaoIdempotente' });
    }
    return toOutput(existente, ctx, tarefaRepository);
  }

  const titulo = requiredText(input.titulo, 'titulo');
  if (titulo.length > 200) {
    throw new AppError('INVALID_INPUT', 'titulo must have at most 200 characters.', 400);
  }
  const prioridadeText = requiredText(input.prioridade, 'prioridade');
  const prioridade = PRIORIDADES.find((p) => p === prioridadeText);
  if (!prioridade) {
    throw new AppError('INVALID_INPUT', 'prioridade must be low, medium or high.', 400);
  }
  const prazo = requiredText(input.prazo, 'prazo');
  const listaId = requiredText(input.listaId, 'listaId');
  const responsavelId = requiredText(input.responsavelId, 'responsavelId');
  const tarefaPaiId = typeof input.tarefaPaiId === 'string' && input.tarefaPaiId.trim() ? input.tarefaPaiId.trim() : undefined;

  const criadorId = ctx.sessionContext.person?.mdmId;
  if (!criadorId) {
    throw new AppError('UNAUTHENTICATED', 'The session has no team member to be the creator of the task.', 401);
  }

  // listaInativaNaoRecebeTarefa
  const lista = await listaRepository.get(listaId);
  if (!lista) {
    throw new AppError('NOT_FOUND', 'Lista not found.', 404);
  }
  if (!lista.ativa) {
    throw new AppError('LISTA_INATIVA', 'An inactive list cannot receive new tasks.', 409, { ruleId: 'listaInativaNaoRecebeTarefa' });
  }

  const id = ctx.idGenerator.newId();

  // tarefaPaiNaoPodeSerElaMesma
  if (tarefaPaiId !== undefined) {
    if (tarefaPaiId === id) {
      throw new AppError('TAREFA_PAI_INVALIDA', 'The parent task cannot be the task itself.', 400, { ruleId: 'tarefaPaiNaoPodeSerElaMesma' });
    }
    const pai = await tarefaRepository.get(tarefaPaiId);
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
  if (tarefaPaiId !== undefined) {
    nova.tarefaPaiId = tarefaPaiId;
  }
  if (descricao !== undefined) {
    nova.details.descricao = descricao;
  }

  const criada = await tarefaRepository.create(nova);
  return toOutput(criada, ctx, tarefaRepository);
}
