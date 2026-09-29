/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/adapters/persistence/registerRepositories.ts" enhancement="_blank"/>
import { registerRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { createMovimentacaoEstoqueRepository } from '/_102047_/l1/controleEstoque/layer_1_external/adapters/persistence/movimentacaoEstoqueRepositoryAdapter.js';

export function registerRepositories(): void {
  registerRepository("MovimentacaoEstoqueRepository", ctx => createMovimentacaoEstoqueRepository(ctx));
}

registerRepositories();
