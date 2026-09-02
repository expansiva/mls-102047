/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicketComment.defs.ts" enhancement="_blank"/>

export const deleteTicketCommentUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "deleteTicketComment",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "deleteTicketComment",
    "ports": [
      "TicketComment"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "deleteTicketComment",
        "inputTypeName": "DeleteTicketCommentInput",
        "outputTypeName": "DeleteTicketCommentOutput",
        "input": [
          {
            "name": "ticketCommentId",
            "type": "string",
            "required": true,
            "description": "Stable identifier of the comment to delete.",
            "ofEntity": "TicketComment",
            "fieldRef": "TicketComment.ticketCommentId",
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
          "TicketComment"
        ],
        "rulesApplied": [],
        "transactional": true,
        "steps": [
          "Resolve the selected TicketComment by ticketCommentId through the TicketComment port.",
          "If the comment does not exist, apply the repository/domain not-found behavior and do not perform a delete.",
          "Capture ticketCommentId, ticketId, and commentText for the response before deletion.",
          "Delete the TicketComment through the TicketComment port within the transaction wrapper.",
          "Return the deleted comment projection matching the declared output shape."
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

export default deleteTicketCommentUsecase;

export const pipeline = [
  {
    "id": "deleteTicketComment__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicketComment.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicketComment.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.d.ts",
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
