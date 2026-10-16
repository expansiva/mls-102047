/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/persistence/lista.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "tarefas",
  "repositoryName": "lista",
  "tableName": "tarefas_lista",
  "purpose": "transacao",
  "description": "tarefas_lista",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "nome",
      "postgresType": "TEXT"
    },
    {
      "name": "ativa",
      "postgresType": "BOOLEAN",
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
      "name": "tarefas_lista_nome",
      "columns": [
        "nome"
      ],
      "unique": true
    },
    {
      "name": "tarefas_lista_ativa",
      "columns": [
        "ativa"
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
      "tableName": "tarefas_lista",
      "name": "tarefas_lista"
    },
    {
      "op": "createIndex",
      "tableName": "tarefas_lista",
      "name": "tarefas_lista_nome"
    },
    {
      "op": "createIndex",
      "tableName": "tarefas_lista",
      "name": "tarefas_lista_ativa"
    }
  ],
  "blocked": []
} as const;
