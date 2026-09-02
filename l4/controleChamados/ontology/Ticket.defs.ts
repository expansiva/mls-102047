/// <mls fileReference="_102047_/l4/controleChamados/ontology/Ticket.defs.ts" enhancement="_blank"/>

import type { Ns4OntologyEntityArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosEntityTicket = {
  "schemaVersion": "2026-08-11-ns4-ontology-v6",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "solutionMode": "new",
  "entityId": "Ticket",
  "title": "Chamado",
  "description": "Registro operacional de uma solicitação de atendimento, com título, descrição, status e histórico de comentários.",
  "kind": "core",
  "ownership": "moduleOwned",
  "party": "none",
  "sourceRefs": {
    "journeyIds": [
      "registerTicket",
      "consultTicket",
      "commentOpenTicket",
      "closeOpenTicket"
    ],
    "featureIds": [
      "ticketRegistration",
      "ticketConsultation",
      "ticketCommenting",
      "ticketClosure"
    ],
    "authorityRefs": [
      "tickets:read",
      "tickets:manage"
    ]
  },
  "fields": [
    {
      "fieldId": "ticketId",
      "title": "Identificador do chamado",
      "type": "uuid",
      "required": true,
      "description": "Identificador estável do chamado, usado para vinculá-lo aos comentários e aos fluxos de atendimento.",
      "constraints": [
        {
          "constraintId": "uniqueTicketId",
          "kind": "unique",
          "value": "true",
          "description": "Cada chamado possui um identificador estável e exclusivo.",
          "source": "inferred"
        }
      ]
    },
    {
      "fieldId": "title",
      "title": "Título",
      "type": "string",
      "required": true,
      "description": "Título que identifica resumidamente a solicitação de atendimento.",
      "constraints": []
    },
    {
      "fieldId": "description",
      "title": "Descrição",
      "type": "text",
      "required": true,
      "description": "Descrição detalhada da solicitação de atendimento registrada no chamado.",
      "constraints": []
    },
    {
      "fieldId": "status",
      "title": "Status",
      "type": "string",
      "required": true,
      "description": "Situação atual do chamado durante o atendimento.",
      "constraints": [
        {
          "constraintId": "ticketStatusEnum",
          "kind": "enum",
          "value": "[\"open\",\"closed\"]",
          "description": "Estados permitidos para o ciclo de vida do chamado.",
          "source": "journey"
        }
      ],
      "enum": [
        "open",
        "closed"
      ]
    }
  ],
  "lifecycleStates": [
    "open",
    "closed"
  ],
  "statusEnum": [
    "open",
    "closed"
  ],
  "lifecycleLabels": [
    {
      "code": "open",
      "label": "Aberto"
    },
    {
      "code": "closed",
      "label": "Fechado"
    }
  ],
  "initialState": "open",
  "terminalStates": [
    "closed"
  ],
  "lifecyclePredicates": [
    {
      "predicateId": "commentableTicket",
      "description": "Um chamado pode receber comentários somente enquanto estiver aberto.",
      "stateIds": [
        "open"
      ],
      "source": "journey"
    },
    {
      "predicateId": "closableTicket",
      "description": "Um chamado pode ser fechado somente enquanto estiver aberto.",
      "stateIds": [
        "open"
      ],
      "source": "journey"
    },
    {
      "predicateId": "closedTicket",
      "description": "Um chamado fechado está encerrado definitivamente e não pode voltar ao estado aberto.",
      "stateIds": [
        "closed"
      ],
      "source": "journey"
    }
  ],
  "useRules": [
    "onlyOpenTicketCanReceiveComment",
    "onlyOpenTicketCanBeClosed",
    "closedTicketCannotBeReopened"
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "ticketId",
    "notes": "Chamado é um registro operacional transacional da organização e seu status não deve compor cadastro mestre."
  },
  "ontologyHash": "sha256:563cf2c2d6bfb3cca7f9abda33d56065755c6df6b2e5dba2880f51bb37e1787a",
  "approvedBy": "auto",
  "approvedAt": "2026-09-02T12:55:28.916Z"
} as const satisfies Ns4OntologyEntityArtifact;

export type ControleChamadosEntityTicketType = typeof controleChamadosEntityTicket;

export default controleChamadosEntityTicket;
