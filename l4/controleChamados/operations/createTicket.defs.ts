/// <mls fileReference="_102047_/l4/controleChamados/operations/createTicket.defs.ts" enhancement="_blank"/>

export const operationCreateTicket = {
  "operationId": "createTicket",
  "title": "Criar Chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Ticket",
  "kind": "create",
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
    "goal": "Criar Chamado",
    "steps": [
      "Informar os dados do novo registro."
    ],
    "outcome": "Informar os dados do novo registro."
  },
  "accessPattern": {
    "kind": "create",
    "description": "Criar Chamado",
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
  "commandName": "cmdCreateTicket",
  "bffName": "cmdCreateTicket"
} as const;

export default operationCreateTicket;
