/// <mls fileReference="_102047_/l4/controleChamados/usecases/locateTicket.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const locateTicketUseCase = {
  "schemaVersion": "2026-08-10-ns4-usecase-v3",
  "moduleName": "controleChamados",
  "useCaseId": "locateTicket",
  "title": "Localizar o chamado aberto",
  "kind": "query",
  "compiledFrom": [
    "closeOpenTicket.locateTicket",
    "commentOpenTicket.locateTicket",
    "consultTicket.locateTicket"
  ],
  "description": "Localiza um chamado e o disponibiliza como chamado selecionado.",
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
  "useCaseHash": "sha256:23dbe6fecdc23416a6c699043a61a643029a904cb33c05dc36d76d4363f97d80"
} as const satisfies Ns4UseCaseArtifactV3;

export type LocateTicketUseCaseType = typeof locateTicketUseCase;

export default locateTicketUseCase;
