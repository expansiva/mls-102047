/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { ItemCardapio } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.js';

export type ItemCardapioFilter = Record<string, unknown>;

export interface ItemCardapioRepository {
  create(itemCardapio: ItemCardapio): Promise<ItemCardapio>;
  list(itemCardapioFilter: ItemCardapioFilter): Promise<ItemCardapio[]>;
  get(id: string): Promise<ItemCardapio>;
  update(itemCardapio: ItemCardapio): Promise<ItemCardapio>;
}

let rows = createMemoryTableRepository<ItemCardapio>([]);
function table() { return rows; }
export function resetMemory(seed: ItemCardapio[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<ItemCardapio>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingItemCardapioRepository: ItemCardapioRepository = {
  async create(record: ItemCardapio): Promise<ItemCardapio> { await table().insert({ record }); return record; },
  async list(filter: ItemCardapioFilter): Promise<ItemCardapio[]> { return table().findMany({ where: filter as Partial<ItemCardapio> }); },
  async get(id: string): Promise<ItemCardapio> { throw new AppError('REPOSITORY_NOT_IMPLEMENTED', 'get is not implemented.', 501); },
  async update(itemCardapio: ItemCardapio): Promise<ItemCardapio> {  const where = { id: itemCardapio.id } as Partial<ItemCardapio>; await table().update({ where, patch: itemCardapio }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
};
