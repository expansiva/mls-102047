/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { Mesa } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.js';

export type MesaFilter = Record<string, unknown>;

export interface MesaRepository {
  create(mesa: Mesa): Promise<Mesa>;
  list(mesaFilter: MesaFilter): Promise<Mesa[]>;
  get(id: string): Promise<Mesa>;
  update(mesa: Mesa): Promise<Mesa>;
}

let rows = createMemoryTableRepository<Mesa>([]);
function table() { return rows; }
export function resetMemory(seed: Mesa[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<Mesa>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingMesaRepository: MesaRepository = {
  async create(record: Mesa): Promise<Mesa> { await table().insert({ record }); return record; },
  async list(filter: MesaFilter): Promise<Mesa[]> { return table().findMany({ where: filter as Partial<Mesa> }); },
  async get(id: string): Promise<Mesa> { throw new AppError('REPOSITORY_NOT_IMPLEMENTED', 'get is not implemented.', 501); },
  async update(mesa: Mesa): Promise<Mesa> {  const where = { id: mesa.id } as Partial<Mesa>; await table().update({ where, patch: mesa }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
};
