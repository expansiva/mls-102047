/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/registerRepositories.ts" enhancement="_blank"/>
import { registerRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { createDespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/despesaRepositoryAdapter.js';

export function registerRepositories(): void {
  registerRepository("DespesaRepository", ctx => createDespesaRepository(ctx));
}

registerRepositories();
