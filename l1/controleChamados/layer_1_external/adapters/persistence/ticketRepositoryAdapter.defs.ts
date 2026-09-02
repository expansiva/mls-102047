/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const ticketRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "TicketRepositoryAdapter",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Ticket",
    "className": "TicketRepositoryAdapter",
    "portRef": "ITicketRepository",
    "tableRef": "ticket",
    "mdmReads": [],
    "notes": [
      "Implement async delete(id), getById(id), list(filter?), and save(aggregate) using only ctx.data.moduleData.getTable<Row>('ticket').",
      "Map real columns ticketId, title, status to snake_case ticket_id, title, status; store description in details JSONB under the verbatim key description.",
      "getById and list map rows back to the Ticket aggregate, reading details.description.",
      "list supports optional filter.search with findMany ilike on title, filter.sortBy/sortOrder via orderBy; if sorting status, sort in memory using the declared domain enum order rather than SQL text.",
      "Use the table API's insert/update/delete/findOne/findMany operations and do not keep adapter state outside the runtime table store.",
      "Implement every port method: delete, getById, list, save."
    ],
    "portMethods": [
      "delete",
      "getById",
      "list",
      "save"
    ]
  }
} as const;

export default ticketRepositoryAdapter;

export const pipeline = [
  {
    "id": "ticketRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketRepositoryAdapter.ts",
    "defPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.d.ts",
      "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticket.d.ts",
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticket.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryAdapter.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
