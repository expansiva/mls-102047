/// <mls fileReference="_102047_/l4/controleChamados/operations/getTicket.defs.ts" enhancement="_blank"/>

export const operationGetTicket = {
  "operationId": "getTicket",
  "title": "Obter Chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Ticket",
  "kind": "query",
  "reads": [
    "Ticket"
  ],
  "writes": [],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Obter Chamado",
    "steps": [
      "Ler o registro pelo identificador."
    ],
    "outcome": "Ler o registro pelo identificador."
  },
  "accessPattern": {
    "kind": "getById",
    "description": "Obter Chamado",
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
    }
  ],
  "pageId": "ticketCatalogue",
  "commandName": "qryGetTicket",
  "bffName": "qryGetTicket"
} as const;

export default operationGetTicket;
