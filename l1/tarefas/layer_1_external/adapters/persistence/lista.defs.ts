/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/persistence/lista.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "lista",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_3_domain/entities/lista.defs.ts"
  ],
  "data": {
    "tableId": "lista",
    "entityId": "Lista",
    "physicalName": "tarefas_lista",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [
      [
        "nome"
      ]
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
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
