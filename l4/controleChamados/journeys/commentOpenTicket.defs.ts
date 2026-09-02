/// <mls fileReference="_102047_/l4/controleChamados/journeys/commentOpenTicket.defs.ts" enhancement="_blank"/>

import type { Ns4JourneyArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const commentOpenTicketJourney = {
  "schemaVersion": "2026-08-14-ns4-journey-realized-v5",
  "journeyId": "commentOpenTicket",
  "revision": 1,
  "business": {
    "actorRef": "atendente",
    "title": "Registrar comentário em chamado aberto",
    "goal": "Documentar o andamento do atendimento em um chamado aberto.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "locateTicket",
        "kind": "locate",
        "entity": "Ticket",
        "title": "Localizar o chamado aberto",
        "description": "Um chamado aberto é selecionado a partir da Lista de chamados para acompanhamento.",
        "featureRefs": [
          "ticketCommenting"
        ]
      },
      {
        "stepId": "recordComment",
        "kind": "act",
        "entity": "TicketComment",
        "title": "Registrar comentário",
        "description": "Um comentário fica registrado no histórico do chamado.",
        "featureRefs": [
          "ticketCommenting"
        ]
      }
    ],
    "outcome": {
      "statement": "O histórico do chamado passa a registrar uma atualização do atendimento.",
      "evidence": [
        "O comentário está associado ao chamado selecionado.",
        "O comentário pode ser consultado no histórico do chamado."
      ]
    },
    "useRules": [
      "onlyOpenTicketCanReceiveComment"
    ]
  },
  "businessHash": "sha256:496a92da9d280e9db4975401bd6575e57c703078ff53ed3fe4a1383c62164363",
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
          "commentOpenTicket.entry",
          "commentOpenTicket.locateTicket"
        ],
        "consumerStepRefs": [
          "commentOpenTicket.recordComment"
        ]
      },
      "selectedTicketComment": {
        "contextId": "selectedTicketComment",
        "businessObject": "TicketComment",
        "cardinality": "one",
        "required": true,
        "idFieldRef": "ticketCommentId",
        "sourceRefs": [
          "commentOpenTicket.recordComment"
        ],
        "consumerStepRefs": []
      }
    }
  },
  "realization": {
    "status": "compiled",
    "compiledFromBusinessHash": "sha256:496a92da9d280e9db4975401bd6575e57c703078ff53ed3fe4a1383c62164363",
    "steps": [
      {
        "stepId": "locateTicket",
        "useCaseRefs": [
          "locateTicket"
        ]
      },
      {
        "stepId": "recordComment",
        "useCaseRefs": [
          "recordComment"
        ]
      }
    ],
    "transitionRefs": [],
    "realizationHash": "sha256:77f9f7cd35b279df81ae1658429277273afd878e7f265312f5e4428719268dc1"
  }
} as const satisfies Ns4JourneyArtifact;

export type CommentOpenTicketJourneyType = typeof commentOpenTicketJourney;

export default commentOpenTicketJourney;
