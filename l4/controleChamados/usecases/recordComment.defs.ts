/// <mls fileReference="_102047_/l4/controleChamados/usecases/recordComment.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const recordCommentUseCase = {
  "schemaVersion": "2026-08-10-ns4-usecase-v3",
  "moduleName": "controleChamados",
  "useCaseId": "recordComment",
  "title": "Registrar comentário",
  "kind": "command",
  "compiledFrom": [
    "commentOpenTicket.recordComment"
  ],
  "description": "Registra um comentário no histórico do chamado selecionado quando ele está aberto.",
  "contexts": {
    "requires": [
      "selectedTicket"
    ],
    "provides": [
      "selectedTicketComment"
    ]
  },
  "entityRefs": [
    "Ticket",
    "TicketComment"
  ],
  "useRules": [
    "onlyOpenTicketCanReceiveComment"
  ],
  "transitionRefs": [],
  "useCaseHash": "sha256:d657ea9d78e877857748609e5f3a7dd814302afbe4b8ec5c615648d23cefb7c6"
} as const satisfies Ns4UseCaseArtifactV3;

export type RecordCommentUseCaseType = typeof recordCommentUseCase;

export default recordCommentUseCase;
