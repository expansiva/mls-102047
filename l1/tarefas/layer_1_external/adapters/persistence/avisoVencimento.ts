/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/persistence/avisoVencimento.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "tarefas",
  "repositoryName": "avisoVencimento",
  "tableName": "tarefas_avisovencimento",
  "purpose": "transacao",
  "description": "tarefas_avisovencimento",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "responsavelId",
      "postgresType": "TEXT"
    },
    {
      "name": "dataReferencia",
      "postgresType": "TEXT"
    },
    {
      "name": "status",
      "postgresType": "TEXT",
      "nullable": true
    },
    {
      "name": "details",
      "postgresType": "JSONB",
      "defaultSql": "'{}'::jsonb"
    }
  ],
  "primaryKey": [
    "id"
  ],
  "indexes": [
    {
      "name": "tarefas_avisovencimento_responsavelId_dataReferencia",
      "columns": [
        "responsavelId",
        "dataReferencia"
      ],
      "unique": true
    },
    {
      "name": "tarefas_avisovencimento_responsavelId",
      "columns": [
        "responsavelId"
      ]
    },
    {
      "name": "tarefas_avisovencimento_dataReferencia",
      "columns": [
        "dataReferencia"
      ]
    },
    {
      "name": "tarefas_avisovencimento_status",
      "columns": [
        "status"
      ]
    }
  ],
  "version": 1
} satisfies TableDefinition;

export const migrationPlan = {
  "format": "102034-schema-snapshot",
  "applied": false,
  "steps": [
    {
      "op": "createTable",
      "tableName": "tarefas_avisovencimento",
      "name": "tarefas_avisovencimento"
    },
    {
      "op": "createIndex",
      "tableName": "tarefas_avisovencimento",
      "name": "tarefas_avisovencimento_responsavelId_dataReferencia"
    },
    {
      "op": "createIndex",
      "tableName": "tarefas_avisovencimento",
      "name": "tarefas_avisovencimento_responsavelId"
    },
    {
      "op": "createIndex",
      "tableName": "tarefas_avisovencimento",
      "name": "tarefas_avisovencimento_dataReferencia"
    },
    {
      "op": "createIndex",
      "tableName": "tarefas_avisovencimento",
      "name": "tarefas_avisovencimento_status"
    }
  ],
  "blocked": []
} as const;
