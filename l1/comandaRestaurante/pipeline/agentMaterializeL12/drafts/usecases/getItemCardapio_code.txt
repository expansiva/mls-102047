/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/getItemCardapio.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ItemCardapioRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.js';
import type { ItemCardapio } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.js';

export interface GetItemCardapioInput extends Record<string, unknown> {
  id: string;
}

export interface GetItemCardapioOutput extends Record<string, unknown> {
  id: string;
  version: number;
  name: string;
  details: {
    precoVigente: string;
  };
}

export async function getItemCardapio(
  input: GetItemCardapioInput,
  ctx: RequestContext,
): Promise<GetItemCardapioOutput> {
  const repository = resolveRepository<ItemCardapioRepository>(ctx, 'ItemCardapioRepository');
  const found = await repository.get(String(input.id));

  if (found === null || found === undefined) {
    throw new AppError('NOT_FOUND', 'ItemCardapio was not found.', 404);
  }

  return found as ItemCardapio as GetItemCardapioOutput;
}
