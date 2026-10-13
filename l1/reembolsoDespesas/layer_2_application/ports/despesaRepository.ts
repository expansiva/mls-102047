/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';

export type DespesaFilter = Record<string, unknown>;

export interface DespesaRepository {
  create(despesa: Despesa): Promise<Despesa>;
  list(despesaFilter: DespesaFilter): Promise<Despesa[]>;
  update(despesa: Despesa): Promise<Despesa>;
  transition(despesa: Despesa, transitionId: string): Promise<Despesa>;
}

let rows = createMemoryTableRepository<Despesa>([]);
function table() { return rows; }
export function resetMemory(seed: Despesa[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<Despesa>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingDespesaRepository: DespesaRepository = {
  async create(record: Despesa): Promise<Despesa> { await table().insert({ record }); return record; },
  async list(filter: DespesaFilter): Promise<Despesa[]> { return table().findMany({ where: filter as Partial<Despesa> }); },
  async update(despesa: Despesa): Promise<Despesa> {  const where = { id: despesa.id } as Partial<Despesa>; await table().update({ where, patch: despesa }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
  async transition(despesa: Despesa, transitionId: string): Promise<Despesa> { void transitionId; const where = { id: despesa.id } as Partial<Despesa>; await table().update({ where, patch: despesa }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
};
