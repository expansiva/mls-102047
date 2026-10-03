/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/despesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "despesa",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.defs.ts"
  ],
  "data": {
    "tableId": "despesa",
    "entityId": "Despesa",
    "physicalName": "reembolsoDespesas_despesa",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [],
    "indexes": [
      {
        "name": "reembolsoDespesas_despesa_colaboradorId",
        "columns": [
          "colaboradorId"
        ],
        "unique": false
      },
      {
        "name": "reembolsoDespesas_despesa_status",
        "columns": [
          "status"
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
