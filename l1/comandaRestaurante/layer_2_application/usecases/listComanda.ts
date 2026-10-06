/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/listComanda.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Comanda } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.js';
import type { ComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.js';

export interface ListComandaInput extends Record<string, unknown> {
  id: string;
  number: number;
  mesaId: string;
  status: string;
  details: {
    discountAmount?: string;
    paymentMethod?: string;
    subtotal?: string;
    totalComanda?: string;
  };
  page: number;
  pageSize: number;
}

export interface ListComandaOutput extends Record<string, unknown> {
  items: Comanda[];
  hasMore: boolean;
}

export async function listComanda(
  input: ListComandaInput,
  ctx: RequestContext,
): Promise<ListComandaOutput> {
  const isPresent = (value: unknown): boolean =>
    value !== undefined && value !== null && value !== '';

  const where: Record<string, unknown> = {};

  const id: unknown = input.id;
  if (isPresent(id)) {
    const value = String(id).trim();
    if (value.length === 0) {
      throw new AppError('INVALID_VALUE', 'id must not be empty.', 400, { ruleId: 'listComanda' });
    }
    where.id = value;
  }

  const number: unknown = input.number;
  if (isPresent(number)) {
    const value = Number(number);
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      throw new AppError('INVALID_VALUE', 'number must be an integer.', 400, { ruleId: 'listComanda' });
    }
    where.number = value;
  }

  const mesaId: unknown = input.mesaId;
  if (isPresent(mesaId)) {
    const value = String(mesaId).trim();
    if (value.length === 0) {
      throw new AppError('INVALID_VALUE', 'mesaId must not be empty.', 400, { ruleId: 'listComanda' });
    }
    where.mesaId = value;
  }

  const status: unknown = input.status;
  if (isPresent(status)) {
    const value = String(status);
    if (value !== 'open' && value !== 'closed') {
      throw new AppError('INVALID_VALUE', 'status must be open or closed.', 400, { ruleId: 'listComanda' });
    }
    where.status = value;
  }

  const details: unknown = input.details;
  if (details !== null && typeof details === 'object' && !Array.isArray(details)) {
    const detailRecord = details as Record<string, unknown>;
    const discountAmount = detailRecord.discountAmount;
    if (isPresent(discountAmount)) where['details.discountAmount'] = String(discountAmount);

    const paymentMethod = detailRecord.paymentMethod;
    if (isPresent(paymentMethod)) {
      const value = String(paymentMethod);
      if (!['cash', 'debitCard', 'creditCard', 'pix'].includes(value)) {
        throw new AppError(
          'INVALID_VALUE',
          'details.paymentMethod is invalid.',
          400,
          { ruleId: 'listComanda' },
        );
      }
      where['details.paymentMethod'] = value;
    }
    // subtotal and totalComanda are derived and are not read from storage or used as filters.
  }

  const rawPage: unknown = input.page;
  const rawPageSize: unknown = input.pageSize;
  const page = isPresent(rawPage) ? Number(rawPage) : 1;
  const pageSize = isPresent(rawPageSize) ? Number(rawPageSize) : 20;

  if (!Number.isFinite(page) || !Number.isInteger(page) || page < 1) {
    throw new AppError('INVALID_VALUE', 'page must be a positive integer.', 400, { ruleId: 'listComanda' });
  }
  if (!Number.isFinite(pageSize) || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 200) {
    throw new AppError(
      'INVALID_VALUE',
      'pageSize must be an integer between 1 and 200.',
      400,
      { ruleId: 'listComanda' },
    );
  }

  const repository = resolveRepository<ComandaRepository>(ctx, 'ComandaRepository');
  const found = await repository.list(where);
  const start = (page - 1) * pageSize;

  return {
    items: found.slice(start, start + pageSize),
    hasMore: start + pageSize < found.length,
  };
}
