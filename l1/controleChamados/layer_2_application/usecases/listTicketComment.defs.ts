/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/listTicketComment.defs.ts" enhancement="_blank"/>

export const listTicketCommentUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "listTicketComment",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "listTicketComment",
    "ports": [
      "TicketComment"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listTicketComment",
        "inputTypeName": "ListTicketCommentInput",
        "outputTypeName": "ListTicketCommentOutput",
        "input": [],
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
          "Query all TicketComment records through the TicketComment port.",
          "Return the selected ticketCommentId, ticketId, and commentText fields as the list output."
        ],
        "outputShape": {
          "kind": "list",
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

export default listTicketCommentUsecase;

export const pipeline = [
  {
    "id": "listTicketComment__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/listTicketComment.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/listTicketComment.defs.ts",
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
