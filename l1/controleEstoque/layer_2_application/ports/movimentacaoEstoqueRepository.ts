/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { MovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.js';

export type MovimentacaoEstoqueFilter = Record<string, unknown>;

export interface MovimentacaoEstoqueRepository {
  create(movimentacaoEstoque: MovimentacaoEstoque): Promise<MovimentacaoEstoque>;
  list(movimentacaoEstoqueFilter: MovimentacaoEstoqueFilter): Promise<MovimentacaoEstoque[]>;
}

let rows = createMemoryTableRepository<MovimentacaoEstoque>([]);
function table() { return rows; }
export function resetMemory(seed: MovimentacaoEstoque[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<MovimentacaoEstoque>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingMovimentacaoEstoqueRepository: MovimentacaoEstoqueRepository = {
  async create(record: MovimentacaoEstoque): Promise<MovimentacaoEstoque> { await table().insert({ record }); return record; },
  async list(filter: MovimentacaoEstoqueFilter): Promise<MovimentacaoEstoque[]> { return table().findMany({ where: filter as Partial<MovimentacaoEstoque> }); },
};
