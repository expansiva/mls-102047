/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/createComanda.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.js';
import type { Comanda } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.js';

export interface CreateComandaInput extends Record<string, unknown> {
  mesaId: string;
}

export interface CreateComandaOutput extends Record<string, unknown> {
  id: string;
  version: number;
  number: number;
  mesaId: string;
  status: string;
  details: {
    discountAmount?: string;
    paymentMethod?: string;
    subtotal?: string;
    totalComanda?: string;
  };
}

export async function createComanda(
  input: CreateComandaInput,
  ctx: RequestContext,
): Promise<CreateComandaOutput> {
  const mesaId = String(input.mesaId).trim();
  if (mesaId.length === 0) {
    throw new AppError(
      'INVALID_MESA',
      'A mesa is required to open a comanda.',
      400,
      { ruleId: 'mesaDisponivelParaAbrirComanda' },
    );
  }

  const comandaRepository = resolveRepository<ComandaRepository>(ctx, 'ComandaRepository');
  const existingComandas = await comandaRepository.list({ mesaId, status: 'open' });
  if (existingComandas.length > 0) {
    throw new AppError(
      'OPEN_COMANDA_EXISTS',
      'The mesa already has an open comanda.',
      409,
      { ruleId: 'umaComandaAbertaPorMesa' },
    );
  }

  const allComandas = await comandaRepository.list({});
  let nextNumber = 1;
  for (const existing of allComandas) {
    if (existing.number >= nextNumber) {
      nextNumber = existing.number + 1;
    }
  }

  const comanda: Comanda = {
    id: ctx.idGenerator.newId(),
    version: 1,
    number: nextNumber,
    mesaId,
    status: 'open',
    details: {
      subtotal: '0',
      totalComanda: '0',
    },
  };

  const created = await comandaRepository.create(comanda);
  return {
    id: String(created.id),
    version: Number(created.version),
    number: Number(created.number),
    mesaId: String(created.mesaId),
    status: String(created.status),
    details: {
      ...(created.details.discountAmount === undefined
        ? {}
        : { discountAmount: String(created.details.discountAmount) }),
      ...(created.details.paymentMethod === undefined
        ? {}
        : { paymentMethod: String(created.details.paymentMethod) }),
      subtotal: '0',
      totalComanda: '0',
    },
  };
}
