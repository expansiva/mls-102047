/// <mls fileReference="_102047_/l4/controleChamados/operations/createTicketComment.defs.ts" enhancement="_blank"/>

export const operationCreateTicketComment = {
  "operationId": "createTicketComment",
  "title": "Criar Comentário do chamado",
  "actors": [
    "atendente"
  ],
  "entity": "TicketComment",
  "kind": "create",
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
    "goal": "Criar Comentário do chamado",
    "steps": [
      "Informar os dados do novo registro."
    ],
    "outcome": "Informar os dados do novo registro."
  },
  "accessPattern": {
    "kind": "create",
    "description": "Criar Comentário do chamado",
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
  "commandName": "cmdCreateTicketComment",
  "bffName": "cmdCreateTicketComment"
} as const;

export default operationCreateTicketComment;
