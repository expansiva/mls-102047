/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';

export interface ListTarefaInput extends Record<string, unknown> {
  id?: string;
  titulo?: string;
  status?: string;
  prioridade?: string;
  prazo?: string;
  listaId?: string;
  responsavelId?: string;
  criadorId?: string;
  tarefaPaiId?: string;
  chaveCriacao?: string;
  criadaEm?: string;
  details?: {
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
  page: number;
  pageSize: number;
}

export interface ListTarefaOutput extends Record<string, unknown> {
  items: Tarefa[];
  hasMore: boolean;
}

function filled(value: unknown): boolean {
  return value !== undefined && value !== null && value !== '';
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export async function listTarefa(input: ListTarefaInput, ctx: RequestContext): Promise<ListTarefaOutput> {
  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  // Exact filters (stored, non-derived columns).
  const where: Record<string, unknown> = {};
  if (filled(input.id)) where.id = String(input.id);
  if (filled(input.status)) where.status = String(input.status);
  if (filled(input.prioridade)) where.prioridade = String(input.prioridade);
  if (filled(input.prazo)) where.prazo = String(input.prazo);
  if (filled(input.listaId)) where.listaId = String(input.listaId);
  if (filled(input.responsavelId)) where.responsavelId = String(input.responsavelId);
  if (filled(input.criadorId)) where.criadorId = String(input.criadorId);
  if (filled(input.tarefaPaiId)) where.tarefaPaiId = String(input.tarefaPaiId);
  if (filled(input.chaveCriacao)) where.chaveCriacao = String(input.chaveCriacao);

  const found = await repository.list(where);
  let kept: Tarefa[] = found;

  // Text search on the title: contains, case and accent insensitive.
  if (filled(input.titulo)) {
    const term = normalizeText(String(input.titulo));
    kept = kept.filter((tarefa) => normalizeText(String(tarefa.titulo ?? '')).includes(term));
  }

  // criadaEm is a timestamp: the filter is the day (from the start to the end of that day).
  if (filled(input.criadaEm)) {
    const day = String(input.criadaEm).slice(0, 10);
    kept = kept.filter((tarefa) => String(tarefa.criadaEm ?? '').slice(0, 10) === day);
  }

  // Derived flags are computed, never read from storage.
  const today = ctx.clock.nowIso().slice(0, 10);
  const isOpen = (tarefa: Tarefa): boolean => tarefa.status === 'aFazer' || tarefa.status === 'emAndamento' || tarefa.status === 'emRevisao';
  const dueDay = (tarefa: Tarefa): string => String(tarefa.prazo ?? '').slice(0, 10);

  const detailsFilter = input.details;
  if (detailsFilter && typeof detailsFilter.aberta === 'boolean') {
    const wanted = detailsFilter.aberta;
    kept = kept.filter((tarefa) => isOpen(tarefa) === wanted);
  }
  if (detailsFilter && typeof detailsFilter.venceHoje === 'boolean') {
    const wanted = detailsFilter.venceHoje;
    kept = kept.filter((tarefa) => (isOpen(tarefa) && dueDay(tarefa) === today) === wanted);
  }
  if (detailsFilter && typeof detailsFilter.atrasada === 'boolean') {
    const wanted = detailsFilter.atrasada;
    kept = kept.filter((tarefa) => (isOpen(tarefa) && dueDay(tarefa) !== '' && dueDay(tarefa) < today) === wanted);
  }

  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const items = kept.slice(start, start + size);
  return { items, hasMore: start + size < kept.length };
}
