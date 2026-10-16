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
  details?: {
    aberta?: boolean;
    venceHoje?: boolean;
    atrasada?: boolean;
  };
  page: number;
  pageSize: number;
}

export interface ListTarefaOutput extends Record<string, unknown> {
  items: Tarefa[];
  hasMore: boolean;
}

export async function listTarefa(input: ListTarefaInput, ctx: RequestContext): Promise<ListTarefaOutput> {
  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const filled = (value: unknown): value is string => typeof value === 'string' && value !== '';
  const normalize = (text: string): string => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  // Exact-match filters (locate.byColumn / listByForeignKey).
  const where: Record<string, unknown> = {};
  if (filled(input.id)) where.id = input.id;
  if (filled(input.status)) where.status = input.status;
  if (filled(input.prioridade)) where.prioridade = input.prioridade;
  if (filled(input.prazo)) where.prazo = input.prazo;
  if (filled(input.listaId)) where.listaId = input.listaId;
  if (filled(input.responsavelId)) where.responsavelId = input.responsavelId;
  if (filled(input.criadorId)) where.criadorId = input.criadorId;
  if (filled(input.tarefaPaiId)) where.tarefaPaiId = input.tarefaPaiId;
  if (filled(input.chaveCriacao)) where.chaveCriacao = input.chaveCriacao;

  const found = await tarefaRepository.list(where);

  // Derived flags are calculated from status and prazo, never read from storage.
  const today = ctx.clock.nowIso().slice(0, 10);
  const isOpen = (t: Tarefa): boolean => t.status === 'aFazer' || t.status === 'emAndamento' || t.status === 'emRevisao';
  const wantAberta = typeof input.details?.aberta === 'boolean' ? input.details.aberta : undefined;
  const wantVenceHoje = typeof input.details?.venceHoje === 'boolean' ? input.details.venceHoje : undefined;
  const wantAtrasada = typeof input.details?.atrasada === 'boolean' ? input.details.atrasada : undefined;

  // Text search (locate.byText): case-insensitive, accent-insensitive contains over the title.
  const term = filled(input.titulo) ? normalize(input.titulo.trim()) : '';

  const kept = found.filter((t: Tarefa): boolean => {
    if (term !== '' && !normalize(String(t.titulo ?? '')).includes(term)) return false;
    if (wantAberta !== undefined && isOpen(t) !== wantAberta) return false;
    if (wantVenceHoje !== undefined && (isOpen(t) && String(t.prazo).slice(0, 10) === today) !== wantVenceHoje) return false;
    if (wantAtrasada !== undefined && (isOpen(t) && String(t.prazo).slice(0, 10) < today) !== wantAtrasada) return false;
    return true;
  });

  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const items = kept.slice(start, start + size);
  return { items, hasMore: start + size < kept.length };
}
