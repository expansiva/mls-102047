/// <mls fileReference="_102047_/l4/controleChamados/operations/deleteTicketComment.defs.ts" enhancement="_blank"/>

export const operationDeleteTicketComment = {
  "operationId": "deleteTicketComment",
  "title": "Excluir Comentário do chamado",
  "actors": [
    "atendente"
  ],
  "entity": "TicketComment",
  "kind": "delete",
  "reads": [
    "TicketComment"
  ],
  "writes": [
    "TicketComment"
  ],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Excluir Comentário do chamado",
    "steps": [
      "Remover o registro escolhido."
    ],
    "outcome": "Remover o registro escolhido."
  },
  "accessPattern": {
    "kind": "delete",
    "description": "Excluir Comentário do chamado",
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
  "commandName": "cmdDeleteTicketComment",
  "bffName": "cmdDeleteTicketComment"
} as const;

export default operationDeleteTicketComment;
