/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/listLista.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Lista } from '/_102047_/l1/tarefas/layer_3_domain/entities/lista.js';
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

function normalize(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export async function listLista(input: ListListaInput, ctx: RequestContext): Promise<ListListaOutput> {
  const listaRepository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  const where: Record<string, unknown> = {};
  if (input.id !== undefined && input.id !== null && String(input.id) !== '') {
    where.id = String(input.id);
  }
  if (input.ativa !== undefined && input.ativa !== null) {
    const raw: unknown = input.ativa;
    if (typeof raw === 'boolean') {
      where.ativa = raw;
    } else if (raw === 'true' || raw === 'false') {
      where.ativa = raw === 'true';
    } else {
      throw new AppError('INVALID_FILTER', 'ativa must be a boolean.', 400);
    }
  }

  const found = await listaRepository.list(where);

  const term = typeof input.nome === 'string' ? normalize(input.nome) : '';
  const tipo = input.details?.tipo;
  const kept = found
    .filter((lista) => term === '' || normalize(String(lista.nome)).includes(term))
    .filter((lista) => tipo === undefined || tipo === null || tipo === '' || lista.details?.tipo === tipo)
    .sort((a, b) => String(a.nome).localeCompare(String(b.nome)));

  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const pageRows = kept.slice(start, start + size);

  const openStatuses = ['aFazer', 'emAndamento', 'emRevisao'];
  const items: Lista[] = [];
  for (const lista of pageRows) {
    const tarefas = await tarefaRepository.list({ listaId: lista.id });
    const quantidadeTarefasAbertas = tarefas.filter((tarefa) => openStatuses.includes(tarefa.status)).length;
    items.push({
      id: lista.id,
      version: lista.version,
      nome: lista.nome,
      ativa: lista.ativa,
      details: {
        tipo: lista.details.tipo,
        descricao: lista.details.descricao,
        quantidadeTarefasAbertas,
      },
    });
  }

  return { items, hasMore: start + size < kept.length };
}
