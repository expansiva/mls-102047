/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/ports/listaRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { Lista } from '/_102047_/l1/tarefas/layer_3_domain/entities/lista.js';

export type ListaFilter = Record<string, unknown>;

export interface ListaRepository {
  create(lista: Lista): Promise<Lista>;
  list(listaFilter: ListaFilter): Promise<Lista[]>;
  get(id: string): Promise<Lista>;
  update(lista: Lista): Promise<Lista>;
}

let rows = createMemoryTableRepository<Lista>([]);
function table() { return rows; }
export function resetMemory(seed: Lista[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<Lista>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingListaRepository: ListaRepository = {
  async create(record: Lista): Promise<Lista> { await table().insert({ record }); return record; },
  async list(filter: ListaFilter): Promise<Lista[]> { return table().findMany({ where: filter as Partial<Lista> }); },
  async get(id: string): Promise<Lista> { throw new AppError('REPOSITORY_NOT_IMPLEMENTED', 'get is not implemented.', 501); },
  async update(lista: Lista): Promise<Lista> {  const where = { id: lista.id } as Partial<Lista>; await table().update({ where, patch: lista }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
};
