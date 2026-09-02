/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.defs.ts" enhancement="_blank"/>

export const ticketCommentRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "TicketCommentRepository",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "TicketComment",
    "interfaceName": "ITicketCommentRepository",
    "methods": [
      {
        "name": "getById",
        "params": [
          "id: TicketCommentId"
        ],
        "returns": "TicketComment | null",
        "description": "Retrieves a ticket comment aggregate by its identifier."
      },
      {
        "name": "list",
        "params": [
          "filter: TicketCommentListFilter"
        ],
        "returns": "TicketComment[]",
        "description": "Lists ticket comment aggregates matching domain filter criteria."
      },
      {
        "name": "save",
        "params": [
          "aggregate: TicketComment"
        ],
        "returns": "void",
        "description": "Persists a ticket comment aggregate."
      },
      {
        "name": "delete",
        "params": [
          "id: TicketCommentId"
        ],
        "returns": "void",
        "description": "Deletes a ticket comment aggregate by its identifier."
      }
    ],
    "requiredMethods": [
      "delete"
    ]
  }
} as const;

export default ticketCommentRepositoryPort;

export const pipeline = [
  {
    "id": "ticketCommentRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
