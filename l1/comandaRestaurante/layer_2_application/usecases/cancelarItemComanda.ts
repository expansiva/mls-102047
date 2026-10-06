/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/cancelarItemComanda.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ItemComanda } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.js';
import type { ItemComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.js';
import type { ComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.js';

export interface CancelarItemComandaInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface CancelarItemComandaOutput extends Record<string, unknown> {
  id: string;
  version: number;
  comandaId: string;
  itemCardapioId: string;
  status: string;
  details: {
    quantidade: number;
    observacao?: string;
    precoUnitario: string;
    valorTotal?: string;
  };
}

export async function cancelarItemComanda(input: CancelarItemComandaInput, ctx: RequestContext): Promise<CancelarItemComandaOutput> {
  const id = String(input.id);
  const expectedVersion = Number(input.version);
  if (!id || !Number.isInteger(expectedVersion) || expectedVersion < 0) {
    throw new AppError('VALIDATION_ERROR', 'A valid item id and version are required.', 400);
  }

  const repository = resolveRepository<ItemComandaRepository>(ctx, 'ItemComandaRepository');
  const records = await repository.list({ id });
  const current = records[0];
  if (!current) {
    throw new AppError('NOT_FOUND', 'Item da comanda not found.', 404);
  }

  if (current.version !== expectedVersion) {
    throw new AppError('VERSION_CONFLICT', 'The item version is outdated.', 409);
  }

  const comandaRepository = resolveRepository<ComandaRepository>(ctx, 'ComandaRepository');
  const comandas = await comandaRepository.list({ id: current.comandaId });
  const comanda = comandas[0];
  if (!comanda) {
    throw new AppError('NOT_FOUND', 'The comanda of the item was not found.', 404);
  }
  if (comanda.status !== 'open') {
    throw new AppError(
      'STATE_CONFLICT',
      'An item can only be canceled while its comanda is open.',
      409,
      { ruleId: 'itemComandaOperacaoSomenteComandaAberta' },
    );
  }

  if (current.status !== 'launched') {
    throw new AppError('STATE_CONFLICT', 'Only a launched item can be canceled.', 409);
  }

  const next: ItemComanda = {
    ...current,
    status: 'canceled',
    // The repository compares this version with the stored row and increments it.
    version: current.version,
    details: {
      ...current.details,
      valorTotal: String(Number(current.details.quantidade) * Number(current.details.precoUnitario)),
    },
  };
  const saved = await repository.transition(next, 'cancelarItemComanda');
  const value = Number(saved.details.quantidade) * Number(saved.details.precoUnitario);
  return {
    id: saved.id,
    version: saved.version,
    comandaId: saved.comandaId,
    itemCardapioId: saved.itemCardapioId,
    status: saved.status,
    details: {
      quantidade: saved.details.quantidade,
      ...(saved.details.observacao === undefined ? {} : { observacao: saved.details.observacao }),
      precoUnitario: saved.details.precoUnitario,
      valorTotal: String(value),
    },
  };
}
