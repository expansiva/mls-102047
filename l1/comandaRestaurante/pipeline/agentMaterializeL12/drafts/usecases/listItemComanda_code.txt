/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/listItemComanda.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ItemComanda } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.js';
import type { ItemComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';

export interface ListItemComandaInput extends Record<string, unknown> {
  comandaId?: string;
  itemCardapioId?: string;
  status?: string;
  details?: {
    quantidade?: number;
    observacao?: string;
    precoUnitario?: string;
  };
  page?: number;
  pageSize?: number;
}

export interface ListItemComandaOutput extends Record<string, unknown> {
  items: ItemComanda[];
  hasMore: boolean;
}

export async function listItemComanda(
  input: ListItemComandaInput,
  ctx: RequestContext,
): Promise<ListItemComandaOutput> {
  const repository = resolveRepository<ItemComandaRepository>(ctx, 'ItemComandaRepository');
  const filter: Record<string, unknown> = {};

  const hasValue = (value: unknown): boolean =>
    value !== undefined && value !== null && value !== '';

  if (hasValue(input.comandaId)) filter.comandaId = String(input.comandaId);
  if (hasValue(input.itemCardapioId)) filter.itemCardapioId = String(input.itemCardapioId);
  if (hasValue(input.status)) filter.status = String(input.status);

  const detailsFilter: Record<string, unknown> = {};
  const details = input.details;
  if (details && typeof details === 'object') {
    if (hasValue(details.quantidade)) detailsFilter.quantidade = Number(details.quantidade);
    if (hasValue(details.observacao)) detailsFilter.observacao = String(details.observacao);
    if (hasValue(details.precoUnitario)) detailsFilter.precoUnitario = String(details.precoUnitario);
  }
  if (Object.keys(detailsFilter).length > 0) filter.details = detailsFilter;

  const found = await repository.list(filter);
  const calculatedItems = found.map((item) => {
    const quantidade = Number(item.details.quantidade);
    const precoUnitario = Number(item.details.precoUnitario);
    if (!Number.isFinite(quantidade) || !Number.isFinite(precoUnitario)) {
      throw new AppError(
        'INVALID_DERIVED_VALUE',
        'The item total cannot be calculated from its quantity and unit price.',
        400,
      );
    }
    return {
      ...item,
      details: {
        ...item.details,
        valorTotal: String(quantidade * precoUnitario),
      },
    };
  });

  const pageNumber = Number(input.page);
  const requestedPageSize = Number(input.pageSize);
  const page = Number.isFinite(pageNumber) && pageNumber >= 1 ? Math.trunc(pageNumber) : 1;
  const pageSize = Number.isFinite(requestedPageSize) && requestedPageSize >= 1
    ? Math.min(200, Math.trunc(requestedPageSize))
    : 20;
  const start = (page - 1) * pageSize;

  return {
    items: calculatedItems.slice(start, start + pageSize),
    hasMore: start + pageSize < calculatedItems.length,
  };
}
