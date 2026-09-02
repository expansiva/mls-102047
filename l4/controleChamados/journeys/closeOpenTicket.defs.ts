/// <mls fileReference="_102047_/l4/controleChamados/journeys/closeOpenTicket.defs.ts" enhancement="_blank"/>

import type { Ns4JourneyArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const closeOpenTicketJourney = {
  "schemaVersion": "2026-08-14-ns4-journey-realized-v5",
  "journeyId": "closeOpenTicket",
  "revision": 1,
  "business": {
    "actorRef": "atendente",
    "title": "Fechar chamado aberto",
    "goal": "Encerrar um chamado quando o atendimento estiver concluído.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "locateTicket",
        "kind": "locate",
        "entity": "Ticket",
        "title": "Localizar o chamado aberto",
        "description": "Um chamado aberto é selecionado a partir da Lista de chamados para encerramento.",
        "featureRefs": [
          "ticketClosure"
        ]
      },
      {
        "stepId": "decideClosure",
        "kind": "decide",
        "entity": "Ticket",
        "title": "Confirmar o fechamento do chamado",
        "description": "O chamado passa a ter status fechado.",
        "featureRefs": [
          "ticketClosure"
        ]
      }
    ],
    "outcome": {
      "statement": "O chamado é encerrado e deixa de aceitar novos comentários.",
      "evidence": [
        "O status do chamado está fechado.",
        "O histórico do chamado permanece disponível para consulta."
      ]
    },
    "useRules": [
      "onlyOpenTicketCanBeClosed",
      "closedTicketCannotBeReopened"
    ]
  },
  "businessHash": "sha256:59a221f329e03b3d9664759d9ade26252066313814e79d983a82e7fb299aba3e",
  "resolution": {
    "status": "compiled",
    "contexts": {
      "selectedTicket": {
        "contextId": "selectedTicket",
        "businessObject": "Ticket",
        "cardinality": "one",
        "required": true,
        "idFieldRef": "ticketId",
        "sourceRefs": [
          "closeOpenTicket.decideClosure",
          "closeOpenTicket.entry",
          "closeOpenTicket.locateTicket"
        ],
        "consumerStepRefs": [
          "closeOpenTicket.decideClosure"
        ]
      }
    }
  },
  "realization": {
    "status": "compiled",
    "compiledFromBusinessHash": "sha256:59a221f329e03b3d9664759d9ade26252066313814e79d983a82e7fb299aba3e",
    "steps": [
      {
        "stepId": "locateTicket",
        "useCaseRefs": [
          "locateTicket"
        ]
      },
      {
        "stepId": "decideClosure",
        "useCaseRefs": [
          "decideClosure"
        ]
      }
    ],
    "transitionRefs": [
      "closeTicket"
    ],
    "realizationHash": "sha256:9c8107bff769bb1091226a48e72089cf4b02f8e140b0bf01ebe463301f27b842"
  }
} as const satisfies Ns4JourneyArtifact;

export type CloseOpenTicketJourneyType = typeof closeOpenTicketJourney;

export default closeOpenTicketJourney;
