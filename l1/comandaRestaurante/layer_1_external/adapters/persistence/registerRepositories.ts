/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/registerRepositories.ts" enhancement="_blank"/>
import { registerRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { createComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/comandaRepositoryAdapter.js';
import { createItemCardapioRepository } from '/_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemCardapioRepositoryAdapter.js';
import { createItemComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemComandaRepositoryAdapter.js';
import { createMesaRepository } from '/_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/mesaRepositoryAdapter.js';

export function registerRepositories(): void {
  registerRepository("ComandaRepository", ctx => createComandaRepository(ctx));
  registerRepository("ItemCardapioRepository", ctx => createItemCardapioRepository(ctx));
  registerRepository("ItemComandaRepository", ctx => createItemComandaRepository(ctx));
  registerRepository("MesaRepository", ctx => createMesaRepository(ctx));
}

registerRepositories();
