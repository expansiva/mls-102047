/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/evento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "evento",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/evento.defs.ts"
  ],
  "data": {
    "tableId": "evento",
    "entityId": "Evento",
    "physicalName": "inscricaoEvento_evento",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [],
    "indexes": [
      {
        "name": "inscricaoEvento_evento_title",
        "columns": [
          "title"
        ],
        "unique": false
      },
      {
        "name": "inscricaoEvento_evento_eventDate",
        "columns": [
          "eventDate"
        ],
        "unique": false
      },
      {
        "name": "inscricaoEvento_evento_status",
        "columns": [
          "status"
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
