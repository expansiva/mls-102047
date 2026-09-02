/// <mls fileReference="_102047_/l4/controleChamados/usecases/inspectTicket.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const inspectTicketUseCase = {
  "schemaVersion": "2026-08-10-ns4-usecase-v3",
  "moduleName": "controleChamados",
  "useCaseId": "inspectTicket",
  "title": "Consultar informações e histórico do chamado",
  "kind": "command",
  "compiledFrom": [
    "consultTicket.inspectTicket"
  ],
  "description": "Consulta as informações do chamado selecionado e seu histórico de comentários.",
  "contexts": {
    "requires": [
      "selectedTicket"
    ],
    "provides": [
      "selectedTicket"
    ]
  },
  "entityRefs": [
    "Ticket",
    "TicketComment"
  ],
  "useRules": [],
  "transitionRefs": [],
  "useCaseHash": "sha256:76d3254e8fac81c69a2f973caace12ec233578cfd0944f38c6e4c43541d95c1f"
} as const satisfies Ns4UseCaseArtifactV3;

export type InspectTicketUseCaseType = typeof inspectTicketUseCase;

export default inspectTicketUseCase;
