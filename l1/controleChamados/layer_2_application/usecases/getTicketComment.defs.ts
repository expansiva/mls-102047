/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/getTicketComment.defs.ts" enhancement="_blank"/>

export const getTicketCommentUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "getTicketComment",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "getTicketComment",
    "ports": [
      "TicketComment"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "getTicketComment",
        "inputTypeName": "GetTicketCommentInput",
        "outputTypeName": "GetTicketCommentOutput",
        "input": [
          {
            "name": "ticketCommentId",
            "type": "string",
            "required": true,
            "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado.",
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
        "transactional": false,
        "steps": [
          "Load the TicketComment aggregate through the TicketComment port using ticketCommentId.",
          "Return ticketCommentId, ticketId, and commentText according to the canonical output shape.",
          "If the comment is not found, apply the repository/domain not-found behavior without inventing an additional L4 validation rule."
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

export default getTicketCommentUsecase;

export const pipeline = [
  {
    "id": "getTicketComment__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/getTicketComment.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/getTicketComment.defs.ts",
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
