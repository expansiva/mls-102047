/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/listLista.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Lista } from '/_102047_/l1/tarefas/layer_3_domain/entities/lista.js';
import type { Tarefa } from '/_102047_/l1/tarefas/layer_3_domain/entities/tarefa.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';

export interface ListListaInput extends Record<string, unknown> {
  id?: string;
  nome?: string;
  ativa?: boolean;
  details?: {
    tipo?: string;
    descricao?: string;
    quantidadeTarefasAbertas?: number;
  };
  page: number;
  pageSize: number;
}

export interface ListListaOutput extends Record<string, unknown> {
  items: Lista[];
  hasMore: boolean;
}

const OPEN_STATUS: ReadonlyArray<Tarefa['status']> = ['aFazer', 'emAndamento', 'emRevisao'];

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export async function listLista(input: ListListaInput, ctx: RequestContext): Promise<ListListaOutput> {
  const listaRepository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  // Exact filters (applied by the repository).
  const where: Record<string, unknown> = {};
  if (input.id !== undefined && input.id !== null && String(input.id) !== '') {
    where.id = String(input.id);
  }
  const rawAtiva: unknown = input.ativa;
  if (rawAtiva !== undefined && rawAtiva !== null && (rawAtiva as unknown) !== '') {
    if (typeof rawAtiva === 'boolean') where.ativa = rawAtiva;
    else if (rawAtiva === 'true') where.ativa = true;
    else if (rawAtiva === 'false') where.ativa = false;
    else throw new AppError('INVALID_FILTER', 'ativa must be a boolean.', 400);
  }

  const found = await listaRepository.list(where);

  // Text search on nome (contains, accent- and case-insensitive) and exact match on details.tipo.
  const nomeTerm = typeof input.nome === 'string' ? normalizeText(input.nome) : '';
  const tipo = typeof input.details?.tipo === 'string' ? input.details.tipo : '';
  const kept = found.filter((lista) => {
    if (nomeTerm !== '' && !normalizeText(String(lista.nome)).includes(nomeTerm)) return false;
    if (tipo !== '' && lista.details?.tipo !== tipo) return false;
    return true;
  });
  kept.sort((a, b) => String(a.nome).localeCompare(String(b.nome), 'pt-BR', { sensitivity: 'base' }));

  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const pageRecords = kept.slice(start, start + size);

  // quantidadeTarefasAbertas is derived: calculated from the tasks of each list, never stored.
  const items: Lista[] = [];
  for (const lista of pageRecords) {
    const tarefas = await tarefaRepository.list({ listaId: lista.id });
    const abertas = tarefas.filter((t) => OPEN_STATUS.includes(t.status)).length;
    items.push({
      id: lista.id,
      version: lista.version,
      nome: lista.nome,
      ativa: lista.ativa,
      details: {
        tipo: lista.details.tipo,
        descricao: lista.details.descricao,
        quantidadeTarefasAbertas: abertas,
      },
    });
  }

  return { items, hasMore: start + size < kept.length };
}
