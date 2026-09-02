/// <mls fileReference="_102047_/l4/controleChamados/operations/updateTicket.defs.ts" enhancement="_blank"/>

export const operationUpdateTicket = {
  "operationId": "updateTicket",
  "title": "Atualizar Chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Ticket",
  "kind": "update",
  "reads": [
    "Ticket"
  ],
  "writes": [
    "Ticket"
  ],
  "rulesApplied": [
    "onlyOpenTicketCanReceiveComment",
    "onlyOpenTicketCanBeClosed",
    "closedTicketCannotBeReopened"
  ],
  "story": {
    "actor": "atendente",
    "goal": "Atualizar Chamado",
    "steps": [
      "Corrigir os dados do registro escolhido."
    ],
    "outcome": "Corrigir os dados do registro escolhido."
  },
  "accessPattern": {
    "kind": "update",
    "description": "Atualizar Chamado",
    "entity": "Ticket",
    "keyField": "Ticket.ticketId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "Ticket.ticketId",
      "Ticket.title",
      "Ticket.description",
      "Ticket.status"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "ticketId",
        "type": "string",
        "required": true,
        "fieldRef": "Ticket.ticketId"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "fieldRef": "Ticket.title"
      },
      {
        "name": "description",
        "type": "string",
        "required": true,
        "fieldRef": "Ticket.description"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "Ticket.status"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "ticketId",
      "fieldRef": "Ticket.ticketId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador estável do chamado, usado para vinculá-lo aos comentários e aos fluxos de atendimento."
    },
    {
      "inputId": "title",
      "fieldRef": "Ticket.title",
      "required": true,
      "source": "userInput",
      "description": "Título que identifica resumidamente a solicitação de atendimento."
    },
    {
      "inputId": "description",
      "fieldRef": "Ticket.description",
      "required": true,
      "source": "userInput",
      "description": "Descrição detalhada da solicitação de atendimento registrada no chamado."
    },
    {
      "inputId": "status",
      "fieldRef": "Ticket.status",
      "required": true,
      "source": "systemDefault",
      "description": "Situação atual do chamado durante o atendimento.",
      "enumValues": [
        "open",
        "closed"
      ]
    }
  ],
  "pageId": "ticketCatalogue",
  "commandName": "cmdUpdateTicket",
  "bffName": "cmdUpdateTicket"
} as const;

export default operationUpdateTicket;
