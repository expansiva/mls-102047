/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/inscricao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "inscricao",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/inscricao.defs.ts"
  ],
  "data": {
    "tableId": "inscricao",
    "entityId": "Inscricao",
    "physicalName": "inscricaoEvento_inscricao",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [
      [
        "eventoId",
        "participanteId"
      ]
    ],
    "indexes": [
      {
        "name": "inscricaoEvento_inscricao_eventoId_participanteId",
        "columns": [
          "eventoId",
          "participanteId"
        ],
        "unique": true
      },
      {
        "name": "inscricaoEvento_inscricao_registrationCode",
        "columns": [
          "registrationCode"
        ],
        "unique": false
      },
      {
        "name": "inscricaoEvento_inscricao_eventoId",
        "columns": [
          "eventoId"
        ],
        "unique": false
      },
      {
        "name": "inscricaoEvento_inscricao_participanteId",
        "columns": [
          "participanteId"
        ],
        "unique": false
      },
      {
        "name": "inscricaoEvento_inscricao_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "name": "inscricaoEvento_inscricao_receivedAt",
        "columns": [
          "receivedAt"
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
