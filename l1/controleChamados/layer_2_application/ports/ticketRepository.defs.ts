/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.defs.ts" enhancement="_blank"/>

export const ticketRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "TicketRepository",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Ticket",
    "interfaceName": "ITicketRepository",
    "methods": [
      {
        "name": "getById",
        "params": [
          "id: TicketId"
        ],
        "returns": "Ticket | null",
        "description": "Retrieves a ticket aggregate by its identifier."
      },
      {
        "name": "list",
        "params": [
          "filter: TicketListFilter"
        ],
        "returns": "Ticket[]",
        "description": "Lists ticket aggregates matching domain filter criteria."
      },
      {
        "name": "save",
        "params": [
          "aggregate: Ticket"
        ],
        "returns": "void",
        "description": "Persists a ticket aggregate."
      },
      {
        "name": "delete",
        "params": [
          "id: TicketId"
        ],
        "returns": "void",
        "description": "Deletes a ticket aggregate by its identifier."
      }
    ],
    "requiredMethods": [
      "delete"
    ]
  }
} as const;

export default ticketRepositoryPort;

export const pipeline = [
  {
    "id": "ticketRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticket.d.ts"
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
