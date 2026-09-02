/// <mls fileReference="_102047_/l4/controleChamados/usecases/decideClosure.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const decideClosureUseCase = {
  "schemaVersion": "2026-08-10-ns4-usecase-v3",
  "moduleName": "controleChamados",
  "useCaseId": "decideClosure",
  "title": "Confirmar o fechamento do chamado",
  "kind": "command",
  "compiledFrom": [
    "closeOpenTicket.decideClosure"
  ],
  "description": "Confirma o fechamento de um chamado aberto.",
  "contexts": {
    "requires": [
      "selectedTicket"
    ],
    "provides": [
      "selectedTicket"
    ]
  },
  "entityRefs": [
    "Ticket"
  ],
  "useRules": [
    "onlyOpenTicketCanBeClosed"
  ],
  "transitionRefs": [
    "closeTicket"
  ],
  "useCaseHash": "sha256:ccffc522c34fe9145b4ba8ffbbe76b6c2c21edf94ca88998f17633e94e852c5e"
} as const satisfies Ns4UseCaseArtifactV3;

export type DecideClosureUseCaseType = typeof decideClosureUseCase;

export default decideClosureUseCase;
