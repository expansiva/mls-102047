/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/updateItemCardapio.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ItemCardapioRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.js';
import type { ItemCardapio } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.js';

export interface UpdateItemCardapioInput extends Record<string, unknown> {
  name: string;
  details: {
    precoVigente: string;
  };
  id: string;
  version: number;
}

export interface UpdateItemCardapioOutput extends Record<string, unknown> {
  id: string;
  version: number;
  name: string;
  details: {
    precoVigente: string;
  };
}

export async function updateItemCardapio(
  input: UpdateItemCardapioInput,
  ctx: RequestContext,
): Promise<UpdateItemCardapioOutput> {
  const repository = resolveRepository<ItemCardapioRepository>(ctx, 'ItemCardapioRepository');
  const rawInput = input as Record<string, unknown>;
  const id = String(rawInput.id);
  const version = Number(rawInput.version);
  const name = String(rawInput.name);
  const rawDetails = rawInput.details;

  if (rawDetails === null || typeof rawDetails !== 'object' || Array.isArray(rawDetails)) {
    throw new AppError('INVALID_VALUE', 'Item details must be an object.', 400);
  }
  const precoVigente = String((rawDetails as Record<string, unknown>).precoVigente);

  const found = await repository.list({ id });
  const current = found[0];
  if (!current) {
    throw new AppError('NOT_FOUND', 'ItemCardapio record was not found.', 404);
  }

  const next: ItemCardapio = {
    ...current,
    id,
    version,
    name,
    details: { precoVigente },
  };
  const updated = await repository.update(next);

  return {
    id: updated.id,
    version: updated.version,
    name: updated.name,
    details: { precoVigente: updated.details.precoVigente },
  };
}
