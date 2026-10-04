/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/comanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "comanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.defs.ts"
  ],
  "data": {
    "tableId": "comanda",
    "entityId": "Comanda",
    "physicalName": "comandaRestaurante_comanda",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [
      [
        "number"
      ]
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
        ],
        "unique": false
      },
      {
        "name": "comandaRestaurante_comanda_status",
        "columns": [
          "status"
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
