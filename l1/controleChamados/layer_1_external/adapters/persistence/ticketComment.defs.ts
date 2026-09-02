/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketComment.defs.ts" enhancement="_blank"/>

export const ticketCommentTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "TicketComment",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "TicketComment",
    "tableName": "controlechamados_ticket_comment",
    "columns": [
      {
        "name": "ticket_comment_id",
        "type": "uuid",
        "nullable": false,
        "description": "Primary key and foreign-key identifier for the ticket comment."
      },
      {
        "name": "ticket_id",
        "type": "uuid",
        "nullable": false,
        "description": "Foreign key identifying the ticket."
      },
      {
        "name": "details",
        "type": "jsonb",
        "nullable": false,
        "description": "Non-indexed comment fields and child collections."
      }
    ],
    "primaryKey": [
      "ticket_comment_id"
    ],
    "indexes": [
      {
        "indexName": "controlechamados_ticket_comment_ticket_id_idx",
        "columns": [
          "ticket_id"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "columnName": "details",
      "childCollections": []
    },
    "appendOnly": false,
    "purpose": "controle",
    "retentionDays": 0
  }
} as const;

export default ticketCommentTableDefinition;

export const pipeline = [
  {
    "id": "ticketComment__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketComment.ts",
    "defPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketComment.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/persistenceTable.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
