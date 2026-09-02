/// <mls fileReference="_102047_/l4/controleChamados/operations/deleteTicket.defs.ts" enhancement="_blank"/>

export const operationDeleteTicket = {
  "operationId": "deleteTicket",
  "title": "Excluir Chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Ticket",
  "kind": "delete",
  "reads": [
    "Ticket"
  ],
  "writes": [
    "Ticket"
  ],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Excluir Chamado",
    "steps": [
      "Remover o registro escolhido."
    ],
    "outcome": "Remover o registro escolhido."
  },
  "accessPattern": {
    "kind": "delete",
    "description": "Excluir Chamado",
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
  "commandName": "cmdDeleteTicket",
  "bffName": "cmdDeleteTicket"
} as const;

export default operationDeleteTicket;
