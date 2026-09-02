/// <mls fileReference="_102047_/l4/controleChamados/journeys/consultTicket.defs.ts" enhancement="_blank"/>

import type { Ns4JourneyArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const consultTicketJourney = {
  "schemaVersion": "2026-08-14-ns4-journey-realized-v5",
  "journeyId": "consultTicket",
  "revision": 1,
  "business": {
    "actorRef": "atendente",
    "title": "Consultar chamados",
    "goal": "Acompanhar as informações e o histórico de um chamado.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "locateTicket",
        "kind": "locate",
        "entity": "Ticket",
        "title": "Localizar chamado na Lista de chamados",
        "description": "O atendente localiza um chamado na Lista de chamados, que é a fonte de consulta dos chamados registrados.",
        "featureRefs": [
          "ticketConsultation"
        ]
      },
      {
        "stepId": "inspectTicket",
        "kind": "act",
        "entity": "Ticket",
        "title": "Consultar informações e histórico do chamado",
        "description": "O atendente inspeciona o título, a descrição, o status e o histórico de comentários do chamado localizado.",
        "featureRefs": [
          "ticketConsultation"
        ]
      }
    ],
    "outcome": {
      "statement": "As informações do chamado ficam disponíveis para acompanhamento.",
      "evidence": [
        "O título, a descrição e o status do chamado podem ser consultados.",
        "O histórico de comentários do chamado pode ser consultado."
      ]
    },
    "useRules": []
  },
  "businessHash": "sha256:28f65c7aea1dbed9d07c2e278d447809cbf29f4800e00f70af45cd0dcfcca8ce",
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
          "consultTicket.inspectTicket",
          "consultTicket.locateTicket"
        ],
        "consumerStepRefs": [
          "consultTicket.inspectTicket"
        ]
      }
    }
  },
  "realization": {
    "status": "compiled",
    "compiledFromBusinessHash": "sha256:28f65c7aea1dbed9d07c2e278d447809cbf29f4800e00f70af45cd0dcfcca8ce",
    "steps": [
      {
        "stepId": "locateTicket",
        "useCaseRefs": [
          "locateTicket"
        ]
      },
      {
        "stepId": "inspectTicket",
        "useCaseRefs": [
          "inspectTicket"
        ]
      }
    ],
    "transitionRefs": [],
    "realizationHash": "sha256:3520e5211adc13e514ce66f362ca1a6b692976cb8b65d8888c38717c3a051c30"
  }
} as const satisfies Ns4JourneyArtifact;

export type ConsultTicketJourneyType = typeof consultTicketJourney;

export default consultTicketJourney;
