/// <mls fileReference="_102047_/l4/controleChamados/usecases/createTicket.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const createTicketUseCase = {
  "schemaVersion": "2026-08-10-ns4-usecase-v3",
  "moduleName": "controleChamados",
  "useCaseId": "createTicket",
  "title": "Registrar os dados do chamado",
  "kind": "command",
  "compiledFrom": [
    "registerTicket.createTicket"
  ],
  "description": "Registra um chamado com título e descrição, iniciando-o com status aberto.",
  "contexts": {
    "requires": [],
    "provides": [
      "selectedTicket"
    ]
  },
  "entityRefs": [
    "Ticket"
  ],
  "useRules": [],
  "transitionRefs": [],
  "useCaseHash": "sha256:349119b3b7c62ec3a84ac030108473f9447db64a3af8595b043ad6670f35013e"
} as const satisfies Ns4UseCaseArtifactV3;

export type CreateTicketUseCaseType = typeof createTicketUseCase;

export default createTicketUseCase;
