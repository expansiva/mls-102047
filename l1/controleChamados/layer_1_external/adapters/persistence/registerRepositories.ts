/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/registerRepositories.ts" enhancement="_blank"/>

// Composition root — generated deterministically by agentCbRegister; do not edit by hand.
// The 102034 moduleRegistry imports this file through the persistenceModules[].tableDefsDir
// config link before loading the module controllers, so usecases can resolveRepository().
import { registerRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { createTicketRepositoryAdapter } from '/_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketRepositoryAdapter.js';
import { createTicketCommentRepositoryAdapter } from '/_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketCommentRepositoryAdapter.js';

registerRepository('Ticket', createTicketRepositoryAdapter);
registerRepository('TicketComment', createTicketCommentRepositoryAdapter);
