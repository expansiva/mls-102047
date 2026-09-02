/// <mls fileReference="_102047_/l4/controleChamados/operations/getTicketComment.defs.ts" enhancement="_blank"/>

export const operationGetTicketComment = {
  "operationId": "getTicketComment",
  "title": "Obter Comentário do chamado",
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
    "goal": "Obter Comentário do chamado",
    "steps": [
      "Ler o registro pelo identificador."
    ],
    "outcome": "Ler o registro pelo identificador."
  },
  "accessPattern": {
    "kind": "getById",
    "description": "Obter Comentário do chamado",
    "entity": "TicketComment",
    "keyField": "TicketComment.ticketCommentId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "TicketComment.ticketCommentId",
      "TicketComment.ticketId",
      "TicketComment.commentText"
    ]
  },
  "outputShape": {
    "kind": "object",
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
  "inputs": [
    {
      "inputId": "ticketCommentId",
      "fieldRef": "TicketComment.ticketCommentId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado."
    }
  ],
  "pageId": "ticketCommentCatalogue",
  "commandName": "qryGetTicketComment",
  "bffName": "qryGetTicketComment"
} as const;

export default operationGetTicketComment;
