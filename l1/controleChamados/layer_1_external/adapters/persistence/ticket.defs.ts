/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticket.defs.ts" enhancement="_blank"/>

export const ticketTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "Ticket",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "Ticket",
    "tableName": "controlechamados_ticket",
    "columns": [
      {
        "name": "ticket_id",
        "type": "uuid",
        "nullable": false,
        "description": "Primary key and foreign-key identifier for the ticket."
      },
      {
        "name": "title",
        "type": "text",
        "nullable": false,
        "description": "Searchable ticket title."
      },
      {
        "name": "status",
        "type": "text",
        "nullable": false,
        "description": "Ticket status."
      },
      {
        "name": "details",
        "type": "jsonb",
        "nullable": false,
        "description": "Non-indexed ticket fields and child collections."
      }
    ],
    "primaryKey": [
      "ticket_id"
    ],
    "indexes": [
      {
        "indexName": "controlechamados_ticket_title_idx",
        "columns": [
          "title"
        ],
        "unique": false
      },
      {
        "indexName": "controlechamados_ticket_status_idx",
        "columns": [
          "status"
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

export default ticketTableDefinition;

export const pipeline = [
  {
    "id": "ticket__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticket.ts",
    "defPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticket.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticket.d.ts"
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
