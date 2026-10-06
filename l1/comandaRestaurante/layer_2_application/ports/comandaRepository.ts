/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { Comanda } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.js';

export type ComandaFilter = Record<string, unknown>;

export interface ComandaRepository {
  create(comanda: Comanda): Promise<Comanda>;
  list(comandaFilter: ComandaFilter): Promise<Comanda[]>;
  get(id: string): Promise<Comanda>;
  transition(comanda: Comanda, transitionId: string): Promise<Comanda>;
}

let rows = createMemoryTableRepository<Comanda>([]);
function table() { return rows; }
export function resetMemory(seed: Comanda[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<Comanda>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingComandaRepository: ComandaRepository = {
  async create(record: Comanda): Promise<Comanda> { await table().insert({ record }); return record; },
  async list(filter: ComandaFilter): Promise<Comanda[]> { return table().findMany({ where: filter as Partial<Comanda> }); },
  async get(id: string): Promise<Comanda> { throw new AppError('REPOSITORY_NOT_IMPLEMENTED', 'get is not implemented.', 501); },
  async transition(comanda: Comanda, transitionId: string): Promise<Comanda> { void transitionId; const where = { id: comanda.id } as Partial<Comanda>; await table().update({ where, patch: comanda }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
};
