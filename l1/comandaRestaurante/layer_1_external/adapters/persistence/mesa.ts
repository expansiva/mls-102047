/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/mesa.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "comandaRestaurante",
  "repositoryName": "mesa",
  "tableName": "comandaRestaurante_mesa",
  "purpose": "transacao",
  "description": "comandaRestaurante_mesa",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "code",
      "postgresType": "TEXT"
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
      "name": "comandaRestaurante_mesa_code",
      "columns": [
        "code"
      ],
      "unique": true
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
      "tableName": "comandaRestaurante_mesa",
      "name": "comandaRestaurante_mesa"
    },
    {
      "op": "createIndex",
      "tableName": "comandaRestaurante_mesa",
      "name": "comandaRestaurante_mesa_code"
    }
  ],
  "blocked": []
} as const;
