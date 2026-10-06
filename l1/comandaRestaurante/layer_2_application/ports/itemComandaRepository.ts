/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { ItemComanda } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.js';

export type ItemComandaFilter = Record<string, unknown>;

export interface ItemComandaRepository {
  create(itemComanda: ItemComanda): Promise<ItemComanda>;
  list(itemComandaFilter: ItemComandaFilter): Promise<ItemComanda[]>;
  transition(itemComanda: ItemComanda, transitionId: string): Promise<ItemComanda>;
}

let rows = createMemoryTableRepository<ItemComanda>([]);
function table() { return rows; }
export function resetMemory(seed: ItemComanda[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<ItemComanda>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingItemComandaRepository: ItemComandaRepository = {
  async create(record: ItemComanda): Promise<ItemComanda> { await table().insert({ record }); return record; },
  async list(filter: ItemComandaFilter): Promise<ItemComanda[]> { return table().findMany({ where: filter as Partial<ItemComanda> }); },
  async transition(itemComanda: ItemComanda, transitionId: string): Promise<ItemComanda> { void transitionId; const where = { id: itemComanda.id } as Partial<ItemComanda>; await table().update({ where, patch: itemComanda }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
};
