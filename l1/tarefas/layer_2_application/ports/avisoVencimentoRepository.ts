/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/ports/avisoVencimentoRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { AvisoVencimento } from '/_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.js';

export type AvisoVencimentoFilter = Record<string, unknown>;

export interface AvisoVencimentoRepository {
  list(avisoVencimentoFilter: AvisoVencimentoFilter): Promise<AvisoVencimento[]>;
  get(id: string): Promise<AvisoVencimento>;
  create(avisoVencimento: AvisoVencimento): Promise<AvisoVencimento>;
  transition(avisoVencimento: AvisoVencimento, transitionId: string): Promise<AvisoVencimento>;
}

let rows = createMemoryTableRepository<AvisoVencimento>([]);
function table() { return rows; }
export function resetMemory(seed: AvisoVencimento[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<AvisoVencimento>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingAvisoVencimentoRepository: AvisoVencimentoRepository = {
  async list(filter: AvisoVencimentoFilter): Promise<AvisoVencimento[]> { return table().findMany({ where: filter as Partial<AvisoVencimento> }); },
  async get(id: string): Promise<AvisoVencimento> { throw new AppError('REPOSITORY_NOT_IMPLEMENTED', 'get is not implemented.', 501); },
  async create(record: AvisoVencimento): Promise<AvisoVencimento> { await table().insert({ record }); return record; },
  async transition(avisoVencimento: AvisoVencimento, transitionId: string): Promise<AvisoVencimento> { void transitionId; const where = { id: avisoVencimento.id } as Partial<AvisoVencimento>; await table().update({ where, patch: avisoVencimento }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
};
