/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/persistence/avisoVencimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "avisoVencimento",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.defs.ts"
  ],
  "data": {
    "tableId": "avisoVencimento",
    "entityId": "AvisoVencimento",
    "physicalName": "tarefas_avisovencimento",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [
      [
        "responsavelId",
        "dataReferencia"
      ]
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
        ],
        "unique": false
      },
      {
        "name": "tarefas_avisovencimento_dataReferencia",
        "columns": [
          "dataReferencia"
        ],
        "unique": false
      },
      {
        "name": "tarefas_avisovencimento_status",
        "columns": [
          "status"
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
