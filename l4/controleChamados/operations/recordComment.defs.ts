/// <mls fileReference="_102047_/l4/controleChamados/operations/recordComment.defs.ts" enhancement="_blank"/>

export const operationRecordComment = {
  "operationId": "recordComment",
  "title": "Registrar comentário",
  "actors": [
    "atendente"
  ],
  "entity": "TicketComment",
  "kind": "commandInput",
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
    "goal": "Registrar comentário",
    "steps": [
      "Registrar comentário",
      "Um comentário fica registrado no histórico do chamado."
    ],
    "outcome": "Um comentário fica registrado no histórico do chamado."
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Registrar comentário",
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
      "fieldRef": "Ticket.ticketId",
      "required": true,
      "source": "routeParam",
      "description": "Chamado"
    },
    {
      "inputId": "commentText",
      "fieldRef": "TicketComment.commentText",
      "required": true,
      "source": "userInput",
      "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado."
    }
  ],
  "pageId": "commentOpenTicket",
  "commandName": "cmdRecordComment",
  "bffName": "cmdRecordComment"
} as const;

export default operationRecordComment;
