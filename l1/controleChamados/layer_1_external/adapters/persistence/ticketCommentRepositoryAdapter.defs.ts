/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketCommentRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const ticketCommentRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "TicketCommentRepositoryAdapter",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "TicketComment",
    "className": "TicketCommentRepositoryAdapter",
    "portRef": "ITicketCommentRepository",
    "tableRef": "ticket_comment",
    "mdmReads": [],
    "notes": [
      "Implement async delete(id), getById(id), list(filter?), and save(aggregate) using only ctx.data.moduleData.getTable<Row>('ticket_comment').",
      "Map real columns ticketCommentId and ticketId to snake_case ticket_comment_id and ticket_id; store commentText in details JSONB under the verbatim key commentText.",
      "getById and list map rows back to TicketComment, reading details.commentText.",
      "list supports optional filter.search with findMany ilike on the applicable text field when present; filter.sortBy/sortOrder uses orderBy, with enum fields sorted in memory by declared enum order rather than SQL text.",
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

export default ticketCommentRepositoryAdapter;

export const pipeline = [
  {
    "id": "ticketCommentRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketCommentRepositoryAdapter.ts",
    "defPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketCommentRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.d.ts",
      "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketComment.d.ts",
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.d.ts"
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
