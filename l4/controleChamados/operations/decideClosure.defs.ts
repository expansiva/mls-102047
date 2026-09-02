/// <mls fileReference="_102047_/l4/controleChamados/operations/decideClosure.defs.ts" enhancement="_blank"/>

export const operationDecideClosure = {
  "operationId": "decideClosure",
  "title": "Confirmar o fechamento do chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Ticket",
  "kind": "transition",
  "reads": [
    "Ticket"
  ],
  "writes": [
    "Ticket"
  ],
  "rulesApplied": [
    "onlyOpenTicketCanBeClosed"
  ],
  "story": {
    "actor": "atendente",
    "goal": "Confirmar o fechamento do chamado",
    "steps": [
      "Confirmar o fechamento do chamado",
      "O chamado passa a ter status fechado."
    ],
    "outcome": "O chamado passa a ter status fechado."
  },
  "accessPattern": {
    "kind": "transition",
    "description": "Confirmar o fechamento do chamado",
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
      "source": "routeParam",
      "description": "Chamado"
    },
    {
      "inputId": "status",
      "fieldRef": "Ticket.status",
      "required": true,
      "source": "userInput",
      "description": "Decisão tomada.",
      "enumValues": [
        "closed"
      ]
    }
  ],
  "pageId": "ticketCatalogue",
  "commandName": "cmdDecideClosure",
  "bffName": "cmdDecideClosure"
} as const;

export default operationDecideClosure;
