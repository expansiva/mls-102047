/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ItemChecklist } from '/_102047_/l1/tarefas/layer_3_domain/entities/itemChecklist.js';
import type { ItemChecklistRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/itemChecklistRepository.js';

export interface ListItemChecklistInput extends Record<string, unknown> {
  id?: string;
  tarefaId?: string;
  ordem?: number;
  feito?: boolean;
  details?: {
    descricao?: string;
    marcadoEm?: string;
  };
  page: number;
  pageSize: number;
}

export interface ListItemChecklistOutput extends Record<string, unknown> {
  items: ItemChecklist[];
  hasMore: boolean;
}

export async function listItemChecklist(input: ListItemChecklistInput, ctx: RequestContext): Promise<ListItemChecklistOutput> {
  const repository = resolveRepository<ItemChecklistRepository>(ctx, 'ItemChecklistRepository');
  const given = (value: unknown): boolean => value !== undefined && value !== null && value !== '';

  const where: Record<string, unknown> = {};
  if (given(input.id)) where.id = String(input.id);
  if (given(input.tarefaId)) where.tarefaId = String(input.tarefaId);
  if (given(input.ordem)) {
    const ordem = Number(input.ordem);
    if (!Number.isFinite(ordem)) throw new AppError('INVALID_INPUT', 'ordem must be a number.', 400);
    where.ordem = ordem;
  }
  if (given(input.feito)) {
    const raw: unknown = input.feito;
    if (raw === true || raw === 'true') where.feito = true;
    else if (raw === false || raw === 'false') where.feito = false;
    else throw new AppError('INVALID_INPUT', 'feito must be a boolean.', 400);
  }

  const descricao = input.details?.descricao;
  const marcadoEm = input.details?.marcadoEm;

  const found = await repository.list(where);
  const kept = found
    .filter((item) => !given(descricao) || item.details?.descricao === String(descricao))
    .filter((item) => !given(marcadoEm) || item.details?.marcadoEm === String(marcadoEm))
    .slice()
    .sort((a, b) => a.ordem - b.ordem);

  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const items = kept.slice(start, start + size);
  return { items, hasMore: start + size < kept.length };
}
