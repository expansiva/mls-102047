/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/recordComment.defs.ts" enhancement="_blank"/>

export const recordCommentUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "recordComment",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "recordComment",
    "ports": [
      "TicketComment",
      "Ticket"
    ],
    "rulesApplied": [
      "onlyOpenTicketCanReceiveComment"
    ],
    "functions": [
      {
        "functionName": "recordComment",
        "inputTypeName": "RecordCommentInput",
        "outputTypeName": "RecordCommentOutput",
        "input": [
          {
            "name": "ticketId",
            "type": "string",
            "required": true,
            "description": "Chamado",
            "ofEntity": "Ticket",
            "fieldRef": "Ticket.ticketId",
            "item": {
              "fields": []
            }
          },
          {
            "name": "commentText",
            "type": "string",
            "required": true,
            "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado.",
            "ofEntity": "TicketComment",
            "fieldRef": "TicketComment.commentText",
            "item": {
              "fields": []
            }
          }
        ],
        "output": [
          {
            "name": "ticketCommentId",
            "type": "string",
            "required": true,
            "ofEntity": "TicketComment"
          },
          {
            "name": "ticketId",
            "type": "string",
            "required": true,
            "ofEntity": "TicketComment"
          },
          {
            "name": "commentText",
            "type": "string",
            "required": true,
            "ofEntity": "TicketComment"
          }
        ],
        "ports": [
          "TicketComment",
          "Ticket"
        ],
        "rulesApplied": [
          "onlyOpenTicketCanReceiveComment"
        ],
        "transactional": true,
        "steps": [
          "Load the Ticket through the Ticket port using the route ticketId.",
          "Reject with rule details onlyOpenTicketCanReceiveComment when the ticket does not exist or its status is not open; the rule requires that only an open ticket can receive comments.",
          "Generate the TicketComment identifier with ctx.idGenerator.",
          "Create the TicketComment through the TicketComment port with ticketId and commentText, then persist it within the transaction wrapper.",
          "Return the created comment identifier, ticket identifier, and comment text."
        ],
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
        }
      }
    ],
    "mdmRefs": []
  }
} as const;

export default recordCommentUsecase;

export const pipeline = [
  {
    "id": "recordComment__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/recordComment.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/recordComment.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.d.ts",
      "_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.d.ts",
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.d.ts",
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticket.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "onlyOpenTicketCanReceiveComment"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
