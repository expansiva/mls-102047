/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/adapters/persistence/movimentacaoEstoque.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "controleEstoque",
  "repositoryName": "movimentacaoEstoque",
  "tableName": "controleEstoque_movimentacaoestoque",
  "purpose": "transacao",
  "description": "controleEstoque_movimentacaoestoque",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "produtoId",
      "postgresType": "TEXT",
      "nullable": true
    },
    {
      "name": "movimentadoEm",
      "postgresType": "TIMESTAMPTZ",
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
      "name": "controleEstoque_movimentacaoestoque_produtoId",
      "columns": [
        "produtoId"
      ]
    },
    {
      "name": "controleEstoque_movimentacaoestoque_movimentadoEm",
      "columns": [
        "movimentadoEm"
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
      "tableName": "controleEstoque_movimentacaoestoque",
      "name": "controleEstoque_movimentacaoestoque"
    },
    {
      "op": "createIndex",
      "tableName": "controleEstoque_movimentacaoestoque",
      "name": "controleEstoque_movimentacaoestoque_produtoId"
    },
    {
      "op": "createIndex",
      "tableName": "controleEstoque_movimentacaoestoque",
      "name": "controleEstoque_movimentacaoestoque_movimentadoEm"
    }
  ],
  "blocked": []
} as const;
