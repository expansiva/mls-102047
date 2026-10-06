/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/comanda.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "comandaRestaurante",
  "repositoryName": "comanda",
  "tableName": "comandaRestaurante_comanda",
  "purpose": "transacao",
  "description": "comandaRestaurante_comanda",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "number",
      "postgresType": "INTEGER"
    },
    {
      "name": "mesaId",
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
      "name": "comandaRestaurante_comanda_number",
      "columns": [
        "number"
      ],
      "unique": true
    },
    {
      "name": "comandaRestaurante_comanda_mesaId",
      "columns": [
        "mesaId"
      ]
    },
    {
      "name": "comandaRestaurante_comanda_status",
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
      "tableName": "comandaRestaurante_comanda",
      "name": "comandaRestaurante_comanda"
    },
    {
      "op": "createIndex",
      "tableName": "comandaRestaurante_comanda",
      "name": "comandaRestaurante_comanda_number"
    },
    {
      "op": "createIndex",
      "tableName": "comandaRestaurante_comanda",
      "name": "comandaRestaurante_comanda_mesaId"
    },
    {
      "op": "createIndex",
      "tableName": "comandaRestaurante_comanda",
      "name": "comandaRestaurante_comanda_status"
    }
  ],
  "blocked": []
} as const;
