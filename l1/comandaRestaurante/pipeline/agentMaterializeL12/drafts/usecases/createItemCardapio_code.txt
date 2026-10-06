/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/createItemCardapio.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ItemCardapioRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.js';
import type { ItemCardapio } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.js';

export interface CreateItemCardapioInput extends Record<string, unknown> {
  name: string;
  details: {
    precoVigente: string;
  };
}

export interface CreateItemCardapioOutput extends Record<string, unknown> {
  id: string;
  version: number;
  name: string;
  details: {
    precoVigente: string;
  };
}

export async function createItemCardapio(input: CreateItemCardapioInput, ctx: RequestContext): Promise<CreateItemCardapioOutput> {
  const name = String(input.name);
  const detailsInput = input.details as { precoVigente: unknown };
  const precoVigente = String(detailsInput.precoVigente);
  const repository = resolveRepository<ItemCardapioRepository>(ctx, 'ItemCardapioRepository');
  const record: ItemCardapio = {
    id: ctx.idGenerator.newId(),
    version: 1,
    name,
    details: { precoVigente },
  };
  const saved = await repository.create(record);
  return {
    id: saved.id,
    version: saved.version,
    name: saved.name,
    details: { precoVigente: saved.details.precoVigente },
  };
}
