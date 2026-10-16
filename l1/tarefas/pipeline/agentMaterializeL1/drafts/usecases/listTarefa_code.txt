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

function asBoolean(value: unknown): boolean | undefined {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return undefined;
}

export async function listTarefa(input: ListTarefaInput, ctx: RequestContext): Promise<ListTarefaOutput> {
  const repository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

  // Exact-match filters (stored, non-derived columns only).
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

  // Derived fields are calculated every time, never read from storage.
  const today = ctx.clock.nowIso().slice(0, 10);
  const computed: Tarefa[] = found.map((tarefa) => {
    const aberta = tarefa.status === 'aFazer' || tarefa.status === 'emAndamento' || tarefa.status === 'emRevisao';
    const prazoDay = String(tarefa.prazo).slice(0, 10);
    return {
      ...tarefa,
      details: {
        ...(tarefa.details ?? {}),
        aberta,
        venceHoje: aberta && prazoDay === today,
        atrasada: aberta && prazoDay < today,
      },
    };
  });

  // Text search on the title: contains, case and accent insensitive.
  const term = filled(input.titulo) ? normalizeText(String(input.titulo)) : '';
  // Creation moment: a day (YYYY-MM-DD) or a full timestamp; matches by its leading part.
  const createdFilter = filled(input.criadaEm) ? String(input.criadaEm) : '';
  const wantAberta = asBoolean(input.details?.aberta);
  const wantVenceHoje = asBoolean(input.details?.venceHoje);
  const wantAtrasada = asBoolean(input.details?.atrasada);

  const kept = computed.filter((tarefa) => {
    if (term !== '' && !normalizeText(String(tarefa.titulo ?? '')).includes(term)) return false;
    if (createdFilter !== '' && !String(tarefa.criadaEm ?? '').startsWith(createdFilter)) return false;
    if (wantAberta !== undefined && tarefa.details.aberta !== wantAberta) return false;
    if (wantVenceHoje !== undefined && tarefa.details.venceHoje !== wantVenceHoje) return false;
    if (wantAtrasada !== undefined && tarefa.details.atrasada !== wantAtrasada) return false;
    return true;
  });

  const rawPage = Math.trunc(Number(input.page));
  const rawSize = Math.trunc(Number(input.pageSize));
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;
  const size = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(200, rawSize) : 20;
  const start = (page - 1) * size;
  const items = kept.slice(start, start + size);
  return { items, hasMore: start + size < kept.length };
}
