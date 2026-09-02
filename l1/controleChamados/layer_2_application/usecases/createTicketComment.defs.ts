/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/createTicketComment.defs.ts" enhancement="_blank"/>

export const createTicketCommentUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createTicketComment",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createTicketComment",
    "ports": [
      "TicketComment",
      "Ticket"
    ],
    "rulesApplied": [
      "onlyOpenTicketCanReceiveComment"
    ],
    "functions": [
      {
        "functionName": "createTicketComment",
        "inputTypeName": "CreateTicketCommentInput",
        "outputTypeName": "CreateTicketCommentOutput",
        "input": [
          {
            "name": "ticketId",
            "type": "string",
            "required": true,
            "description": "Selected ticket to which the comment belongs.",
            "ofEntity": "TicketComment",
            "fieldRef": "TicketComment.ticketId",
            "item": {
              "fields": []
            }
          },
          {
            "name": "commentText",
            "type": "string",
            "required": true,
            "description": "Comment text to record in the ticket history.",
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
          "Load the Ticket aggregate through the Ticket port using the public ticketId.",
          "Apply onlyOpenTicketCanReceiveComment: reject with a machine-readable rule identifier and an English user-facing message when the ticket status is not open.",
          "Create a TicketComment through the TicketComment port with a generated ticketCommentId, the selected ticketId, and commentText.",
          "Return the created comment using the canonical output shape."
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

export default createTicketCommentUsecase;

export const pipeline = [
  {
    "id": "createTicketComment__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/createTicketComment.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/createTicketComment.defs.ts",
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
