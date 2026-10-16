/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/persistence/registerRepositories.ts" enhancement="_blank"/>
import { registerRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { createAvisoVencimentoRepository } from '/_102047_/l1/tarefas/layer_1_external/adapters/persistence/avisoVencimentoRepositoryAdapter.js';
import { createItemChecklistRepository } from '/_102047_/l1/tarefas/layer_1_external/adapters/persistence/itemChecklistRepositoryAdapter.js';
import { createListaRepository } from '/_102047_/l1/tarefas/layer_1_external/adapters/persistence/listaRepositoryAdapter.js';
import { createTarefaRepository } from '/_102047_/l1/tarefas/layer_1_external/adapters/persistence/tarefaRepositoryAdapter.js';

export function registerRepositories(): void {
  registerRepository("AvisoVencimentoRepository", ctx => createAvisoVencimentoRepository(ctx));
  registerRepository("ItemChecklistRepository", ctx => createItemChecklistRepository(ctx));
  registerRepository("ListaRepository", ctx => createListaRepository(ctx));
  registerRepository("TarefaRepository", ctx => createTarefaRepository(ctx));
}

registerRepositories();
