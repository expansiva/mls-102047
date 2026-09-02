/// <mls fileReference="_102047_/l4/controleChamados/operations/listTicket.defs.ts" enhancement="_blank"/>

export const operationListTicket = {
  "operationId": "listTicket",
  "title": "Listar Chamado",
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
    "goal": "Listar Chamado",
    "steps": [
      "Encontrar o registro."
    ],
    "outcome": "Encontrar o registro."
  },
  "accessPattern": {
    "kind": "list",
    "description": "Listar Chamado",
    "entity": "Ticket",
    "keyField": "Ticket.ticketId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Ticket.ticketId",
      "Ticket.title",
      "Ticket.description",
      "Ticket.status"
    ]
  },
  "outputShape": {
    "kind": "list",
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
      "inputId": "search",
      "fieldRef": "Ticket.title",
      "required": false,
      "source": "userInput",
      "description": "Buscar por Título."
    },
    {
      "inputId": "sortBy",
      "fieldRef": "Ticket.status",
      "required": false,
      "source": "userInput",
      "description": "Campo de ordenação da listagem.",
      "enumValues": [
        "status"
      ]
    },
    {
      "inputId": "sortOrder",
      "fieldRef": "Ticket.status",
      "required": false,
      "source": "userInput",
      "description": "Direção da ordenação.",
      "enumValues": [
        "asc",
        "desc"
      ]
    }
  ],
  "pageId": "ticketCatalogue",
  "commandName": "qryListTicket",
  "bffName": "qryListTicket"
} as const;

export default operationListTicket;
