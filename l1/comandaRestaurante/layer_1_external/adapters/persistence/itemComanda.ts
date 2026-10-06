/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemComanda.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "comandaRestaurante",
  "repositoryName": "itemComanda",
  "tableName": "comandaRestaurante_itemcomanda",
  "purpose": "transacao",
  "description": "comandaRestaurante_itemcomanda",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "comandaId",
      "postgresType": "TEXT",
      "nullable": true
    },
    {
      "name": "itemCardapioId",
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
      "name": "comandaRestaurante_itemcomanda_comandaId",
      "columns": [
        "comandaId"
      ]
    },
    {
      "name": "comandaRestaurante_itemcomanda_itemCardapioId",
      "columns": [
        "itemCardapioId"
      ]
    },
    {
      "name": "comandaRestaurante_itemcomanda_status",
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
      "tableName": "comandaRestaurante_itemcomanda",
      "name": "comandaRestaurante_itemcomanda"
    },
    {
      "op": "createIndex",
      "tableName": "comandaRestaurante_itemcomanda",
      "name": "comandaRestaurante_itemcomanda_comandaId"
    },
    {
      "op": "createIndex",
      "tableName": "comandaRestaurante_itemcomanda",
      "name": "comandaRestaurante_itemcomanda_itemCardapioId"
    },
    {
      "op": "createIndex",
      "tableName": "comandaRestaurante_itemcomanda",
      "name": "comandaRestaurante_itemcomanda_status"
    }
  ],
  "blocked": []
} as const;
