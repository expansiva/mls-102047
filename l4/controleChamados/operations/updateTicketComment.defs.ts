/// <mls fileReference="_102047_/l4/controleChamados/operations/updateTicketComment.defs.ts" enhancement="_blank"/>

export const operationUpdateTicketComment = {
  "operationId": "updateTicketComment",
  "title": "Atualizar Comentário do chamado",
  "actors": [
    "atendente"
  ],
  "entity": "TicketComment",
  "kind": "update",
  "reads": [
    "Ticket",
    "TicketComment"
  ],
  "writes": [
    "TicketComment"
  ],
  "rulesApplied": [
    "onlyOpenTicketCanReceiveComment"
  ],
  "story": {
    "actor": "atendente",
    "goal": "Atualizar Comentário do chamado",
    "steps": [
      "Corrigir os dados do registro escolhido."
    ],
    "outcome": "Corrigir os dados do registro escolhido."
  },
  "accessPattern": {
    "kind": "update",
    "description": "Atualizar Comentário do chamado",
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
    },
    {
      "inputId": "ticketId",
      "fieldRef": "TicketComment.ticketId",
      "required": true,
      "source": "selectedEntity",
      "description": "Chamado selecionado ao qual este comentário pertence e em cujo histórico será exibido."
    },
    {
      "inputId": "commentText",
      "fieldRef": "TicketComment.commentText",
      "required": true,
      "source": "userInput",
      "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado."
    }
  ],
  "pageId": "ticketCommentCatalogue",
  "commandName": "cmdUpdateTicketComment",
  "bffName": "cmdUpdateTicketComment"
} as const;

export default operationUpdateTicketComment;
