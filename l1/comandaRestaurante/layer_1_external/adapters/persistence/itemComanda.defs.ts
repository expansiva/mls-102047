/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "itemComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.defs.ts"
  ],
  "data": {
    "tableId": "itemComanda",
    "entityId": "ItemComanda",
    "physicalName": "comandaRestaurante_itemcomanda",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [],
    "indexes": [
      {
        "name": "comandaRestaurante_itemcomanda_comandaId",
        "columns": [
          "comandaId"
        ],
        "unique": false
      },
      {
        "name": "comandaRestaurante_itemcomanda_itemCardapioId",
        "columns": [
          "itemCardapioId"
        ],
        "unique": false
      },
      {
        "name": "comandaRestaurante_itemcomanda_status",
        "columns": [
          "status"
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
