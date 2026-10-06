/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/fecharComanda.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Comanda } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.js';
import type { ComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.js';

export interface FecharComandaInput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    discountAmount?: string;
    paymentMethod?: string;
  };
}

export interface FecharComandaOutput extends Record<string, unknown> {
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

interface ItemComandaRecord {
  comandaId?: string;
  status?: string;
  quantity?: number;
  unitPrice?: string;
}

interface ItemComandaRepository {
  list(filter: Record<string, unknown>): Promise<ItemComandaRecord[]>;
}

export async function fecharComanda(input: FecharComandaInput, ctx: RequestContext): Promise<FecharComandaOutput> {
  const comandaRepository = resolveRepository<ComandaRepository>(ctx, 'ComandaRepository');
  const itemRepository = resolveRepository<ItemComandaRepository>(ctx, 'ItemComandaRepository');

  const id = String(input.id);
  const version = Number(input.version);
  if (!id || !Number.isInteger(version)) {
    throw new AppError('VALIDATION_ERROR', 'A valid comanda id and version are required.', 400, { ruleId: 'fecharComanda' });
  }

  const current = await comandaRepository.get(id) as unknown as Comanda | null | undefined;
  if (!current) {
    throw new AppError('NOT_FOUND', 'Comanda was not found.', 404);
  }
  if (current.version !== version) {
    throw new AppError('VERSION_CONFLICT', 'The comanda was changed by another operation.', 409, { ruleId: 'fecharComanda' });
  }
  if (current.status !== 'open') {
    throw new AppError('STATE_CONFLICT', 'Only an open comanda can be closed.', 409, { ruleId: 'fecharComanda' });
  }

  const detailsInput = input.details as unknown as Record<string, unknown>;
  const paymentMethod = detailsInput.paymentMethod === undefined ? undefined : String(detailsInput.paymentMethod);
  if (!paymentMethod || !['cash', 'debitCard', 'creditCard', 'pix'].includes(paymentMethod)) {
    throw new AppError('VALIDATION_ERROR', 'A payment method is required to close the comanda.', 400, { ruleId: 'pagamentoObrigatorioNoFechamento' });
  }

  const discountValue = detailsInput.discountAmount === undefined || detailsInput.discountAmount === ''
    ? 0
    : Number(detailsInput.discountAmount);
  if (!Number.isFinite(discountValue) || discountValue < 0) {
    throw new AppError('VALIDATION_ERROR', 'The discount amount must be a valid non-negative value.', 400, { ruleId: 'descontoNaoExcedeSubtotal' });
  }

  const items = await itemRepository.list({ comandaId: current.id });
  let subtotalValue = 0;
  for (const item of items) {
    if (item.status === 'cancelled') continue;
    const quantity = Number(item.quantity);
    const unitPrice = Number(item.unitPrice);
    if (!Number.isFinite(quantity) || !Number.isFinite(unitPrice)) {
      throw new AppError('VALIDATION_ERROR', 'Every valid item must have a quantity and a registered unit price.', 400, { ruleId: 'subtotalComandaCalculado' });
    }
    subtotalValue += quantity * unitPrice;
  }
  if (discountValue > subtotalValue) {
    throw new AppError('VALIDATION_ERROR', 'The discount cannot exceed the comanda subtotal.', 400, { ruleId: 'descontoNaoExcedeSubtotal' });
  }

  const subtotal = subtotalValue.toFixed(2);
  const discountAmount = discountValue.toFixed(2);
  const totalComanda = (subtotalValue - discountValue).toFixed(2);
  const next: Comanda = {
    ...current,
    status: 'closed',
    version: current.version + 1,
    details: {
      ...current.details,
      discountAmount,
      paymentMethod: paymentMethod as 'cash' | 'debitCard' | 'creditCard' | 'pix',
      subtotal,
      totalComanda,
    },
  };

  const closed = await comandaRepository.transition(next, 'fecharComanda');
  const result = closed as unknown as Comanda;
  if (result.status !== 'closed') {
    throw new AppError('STATE_CONFLICT', 'Closing the comanda did not release the mesa and complete the transition.', 409, { ruleId: 'fechamentoLiberaMesa' });
  }

  return {
    id: result.id,
    version: result.version,
    number: result.number,
    mesaId: result.mesaId,
    status: result.status,
    details: {
      discountAmount: result.details.discountAmount,
      paymentMethod: result.details.paymentMethod,
      subtotal,
      totalComanda,
    },
  };
}
