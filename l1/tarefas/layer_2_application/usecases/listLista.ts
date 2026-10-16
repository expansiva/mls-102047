/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/listLista.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Lista } from '/_102047_/l1/tarefas/layer_3_domain/entities/lista.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';

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
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

export async function listLista(input: ListListaInput, ctx: RequestContext): Promise<ListListaOutput> {
  const repository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');

  // Exact filters go to the repository.
  const where: Record<string, unknown> = {};
  if (hasText(input.id)) where.id = input.id;
  if (input.ativa !== undefined && input.ativa !== null) {
    const raw: unknown = input.ativa;
    where.ativa = typeof raw === 'string' ? raw === 'true' : Boolean(raw);
  }

  const found = await repository.list(where);

  // Text searches (contains, accent/case-insensitive) and the enum filter are applied here.
  const nomeTerm = hasText(input.nome) ? normalize(input.nome.trim()) : '';
  const descricaoTerm = hasText(input.details?.descricao) ? normalize(String(input.details?.descricao).trim()) : '';
  const tipo = hasText(input.details?.tipo) ? String(input.details?.tipo) : '';

  const kept = found.filter((lista: Lista): boolean => {
    if (nomeTerm !== '' && !normalize(String(lista.nome ?? '')).includes(nomeTerm)) return false;
    if (descricaoTerm !== '' && !normalize(String(lista.details?.descricao ?? '')).includes(descricaoTerm)) return false;
    if (tipo !== '' && lista.details?.tipo !== tipo) return false;
    return true;
  });

  kept.sort((a: Lista, b: Lista): number => String(a.nome).localeCompare(String(b.nome)));

  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const items = kept.slice(start, start + size);
  return { items, hasMore: start + size < kept.length };
}
