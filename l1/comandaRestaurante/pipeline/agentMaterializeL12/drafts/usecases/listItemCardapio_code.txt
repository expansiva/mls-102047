/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/listItemCardapio.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ItemCardapio } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.js';
import type { ItemCardapioRepository, ItemCardapioFilter } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.js';
export interface ListItemCardapioInput extends Record<string, unknown> {
  name?: string;
  details?: {
    precoVigente: string;
  };
  page?: number;
  pageSize?: number;
}
export interface ListItemCardapioOutput extends Record<string, unknown> {
  items: ItemCardapio[];
  hasMore: boolean;
}
export async function listItemCardapio(input: ListItemCardapioInput, ctx: RequestContext): Promise<ListItemCardapioOutput> {
  const repository = resolveRepository<ItemCardapioRepository>(ctx, 'ItemCardapioRepository');
  const filter: ItemCardapioFilter = {};

  if (input.name !== undefined && input.name !== null && input.name !== '') {
    filter.name = String(input.name);
  }

  if (input.details !== undefined && input.details !== null) {
    if (typeof input.details !== 'object' || Array.isArray(input.details)) {
      throw new AppError('INVALID_VALUE', 'details must be an object.', 400);
    }
    const details = input.details as Record<string, unknown>;
    if (details.precoVigente === undefined || details.precoVigente === null || details.precoVigente === '') {
      throw new AppError('INVALID_VALUE', 'details.precoVigente is required when details is provided.', 400);
    }
    filter.details = { precoVigente: String(details.precoVigente) };
  }

  const pageValue = input.page === undefined || input.page === null ? 1 : Number(input.page);
  const pageSizeValue = input.pageSize === undefined || input.pageSize === null ? 20 : Number(input.pageSize);
  if (!Number.isFinite(pageValue) || !Number.isInteger(pageValue) || pageValue < 1) {
    throw new AppError('INVALID_VALUE', 'page must be a positive integer.', 400);
  }
  if (!Number.isFinite(pageSizeValue) || !Number.isInteger(pageSizeValue) || pageSizeValue < 1 || pageSizeValue > 200) {
    throw new AppError('INVALID_VALUE', 'pageSize must be an integer between 1 and 200.', 400);
  }

  const found = await repository.list(filter);
  const start = (pageValue - 1) * pageSizeValue;
  const items = found.slice(start, start + pageSizeValue);
  return {
    items,
    hasMore: start + pageSizeValue < found.length,
  };
}
