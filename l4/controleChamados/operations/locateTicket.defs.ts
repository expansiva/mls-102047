/// <mls fileReference="_102047_/l4/controleChamados/operations/locateTicket.defs.ts" enhancement="_blank"/>

export const operationLocateTicket = {
  "operationId": "locateTicket",
  "title": "Localizar o chamado aberto",
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
    "goal": "Localizar o chamado aberto",
    "steps": [
      "Localizar o chamado aberto",
      "Um chamado aberto é selecionado a partir da Lista de chamados para encerramento."
    ],
    "outcome": "Um chamado aberto é selecionado a partir da Lista de chamados para encerramento."
  },
  "accessPattern": {
    "kind": "list",
    "description": "Localizar o chamado aberto",
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
  "inputs": [],
  "pageId": "commentOpenTicket",
  "commandName": "qryLocateTicket",
  "bffName": "qryLocateTicket"
} as const;

export default operationLocateTicket;
