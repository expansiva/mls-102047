/// <mls fileReference="_102047_/l4/controleChamados/journeys/registerTicket.defs.ts" enhancement="_blank"/>

import type { Ns4JourneyArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const registerTicketJourney = {
  "schemaVersion": "2026-08-14-ns4-journey-realized-v5",
  "journeyId": "registerTicket",
  "revision": 1,
  "business": {
    "actorRef": "atendente",
    "title": "Registrar chamado",
    "goal": "Criar um novo chamado para iniciar o atendimento.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "createTicket",
        "kind": "act",
        "entity": "Ticket",
        "title": "Registrar os dados do chamado",
        "description": "O atendente informa título e descrição, e cria o chamado com status aberto.",
        "featureRefs": [
          "ticketRegistration"
        ]
      }
    ],
    "outcome": {
      "statement": "Um novo chamado aberto fica disponível para acompanhamento.",
      "evidence": [
        "O chamado possui título e descrição registrados.",
        "O status inicial do chamado está aberto.",
        "O novo chamado está disponível na Lista de chamados."
      ]
    },
    "useRules": []
  },
  "businessHash": "sha256:fec1c17f3843924c7160eaf9b48ec99cecc163ce2a415c7f4c18385d34c79120",
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
          "registerTicket.createTicket"
        ],
        "consumerStepRefs": []
      }
    }
  },
  "realization": {
    "status": "compiled",
    "compiledFromBusinessHash": "sha256:fec1c17f3843924c7160eaf9b48ec99cecc163ce2a415c7f4c18385d34c79120",
    "steps": [
      {
        "stepId": "createTicket",
        "useCaseRefs": [
          "createTicket"
        ]
      }
    ],
    "transitionRefs": [],
    "realizationHash": "sha256:cf4753ec98f4f4fc1f8b9bbcce3e958dc16a9ea64073960cfa8fd25bd027f2e3"
  }
} as const satisfies Ns4JourneyArtifact;

export type RegisterTicketJourneyType = typeof registerTicketJourney;

export default registerTicketJourney;
