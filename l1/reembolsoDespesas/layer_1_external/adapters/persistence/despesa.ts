/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/despesa.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "reembolsoDespesas",
  "repositoryName": "despesa",
  "tableName": "reembolsoDespesas_despesa",
  "purpose": "transacao",
  "description": "reembolsoDespesas_despesa",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "colaboradorId",
      "postgresType": "TEXT",
      "nullable": true
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
      "name": "reembolsoDespesas_despesa_colaboradorId",
      "columns": [
        "colaboradorId"
      ]
    },
    {
      "name": "reembolsoDespesas_despesa_status",
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
      "tableName": "reembolsoDespesas_despesa",
      "name": "reembolsoDespesas_despesa"
    },
    {
      "op": "createIndex",
      "tableName": "reembolsoDespesas_despesa",
      "name": "reembolsoDespesas_despesa_colaboradorId"
    },
    {
      "op": "createIndex",
      "tableName": "reembolsoDespesas_despesa",
      "name": "reembolsoDespesas_despesa_status"
    }
  ],
  "blocked": []
} as const;
