/// <mls fileReference="_102047_/l4/controleChamados/operations/listTicketComment.defs.ts" enhancement="_blank"/>

export const operationListTicketComment = {
  "operationId": "listTicketComment",
  "title": "Listar Comentário do chamado",
  "actors": [
    "atendente"
  ],
  "entity": "TicketComment",
  "kind": "query",
  "reads": [
    "TicketComment"
  ],
  "writes": [],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Listar Comentário do chamado",
    "steps": [
      "Encontrar o registro."
    ],
    "outcome": "Encontrar o registro."
  },
  "accessPattern": {
    "kind": "list",
    "description": "Listar Comentário do chamado",
    "entity": "TicketComment",
    "keyField": "TicketComment.ticketCommentId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "TicketComment.ticketCommentId",
      "TicketComment.ticketId",
      "TicketComment.commentText"
    ]
  },
  "outputShape": {
    "kind": "list",
    "fields": [
      {
        "name": "ticketCommentId",
        "type": "string",
        "required": true,
        "fieldRef": "TicketComment.ticketCommentId"
      },
      {
        "name": "ticketId",
        "type": "string",
        "required": true,
        "fieldRef": "TicketComment.ticketId"
      },
      {
        "name": "commentText",
        "type": "string",
        "required": true,
        "fieldRef": "TicketComment.commentText"
      }
    ]
  },
  "inputs": [],
  "pageId": "ticketCommentCatalogue",
  "commandName": "qryListTicketComment",
  "bffName": "qryListTicketComment"
} as const;

export default operationListTicketComment;
