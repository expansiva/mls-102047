/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/updateTicketComment.defs.ts" enhancement="_blank"/>

export const updateTicketCommentUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateTicketComment",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateTicketComment",
    "ports": [
      "TicketComment",
      "Ticket"
    ],
    "rulesApplied": [
      "onlyOpenTicketCanReceiveComment"
    ],
    "functions": [
      {
        "functionName": "updateTicketComment",
        "inputTypeName": "UpdateTicketCommentInput",
        "outputTypeName": "UpdateTicketCommentOutput",
        "input": [
          {
            "name": "ticketCommentId",
            "type": "string",
            "required": true,
            "description": "Stable identifier of the comment to update.",
            "ofEntity": "TicketComment",
            "fieldRef": "TicketComment.ticketCommentId",
            "item": {
              "fields": []
            }
          },
          {
            "name": "ticketId",
            "type": "string",
            "required": true,
            "description": "Selected ticket identifier to which the comment belongs.",
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
            "description": "Updated comment text recorded in the ticket history.",
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
          "Within a single transaction wrapper, load the TicketComment by ticketCommentId through the TicketComment port and load the Ticket by ticketId through the Ticket port.",
          "Validate that the referenced Ticket has status open; if not, reject with an English AppError whose machine-readable details include ruleId onlyOpenTicketCanReceiveComment.",
          "Update the commentText on the loaded TicketComment, preserving its ticketCommentId and ticketId, and save it through the TicketComment port.",
          "Return the updated TicketComment projected as ticketCommentId, ticketId, and commentText."
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

export default updateTicketCommentUsecase;

export const pipeline = [
  {
    "id": "updateTicketComment__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/updateTicketComment.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/updateTicketComment.defs.ts",
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
