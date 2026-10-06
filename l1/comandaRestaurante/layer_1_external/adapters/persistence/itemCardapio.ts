/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemCardapio.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "comandaRestaurante",
  "repositoryName": "itemCardapio",
  "tableName": "comandaRestaurante_itemcardapio",
  "purpose": "transacao",
  "description": "comandaRestaurante_itemcardapio",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "name",
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
      "name": "comandaRestaurante_itemcardapio_name",
      "columns": [
        "name"
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
      "tableName": "comandaRestaurante_itemcardapio",
      "name": "comandaRestaurante_itemcardapio"
    },
    {
      "op": "createIndex",
      "tableName": "comandaRestaurante_itemcardapio",
      "name": "comandaRestaurante_itemcardapio_name"
    }
  ],
  "blocked": []
} as const;
