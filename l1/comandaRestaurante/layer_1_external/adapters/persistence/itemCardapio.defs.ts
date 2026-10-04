/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemCardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "itemCardapio",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.defs.ts"
  ],
  "data": {
    "tableId": "itemCardapio",
    "entityId": "ItemCardapio",
    "physicalName": "comandaRestaurante_itemcardapio",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [],
    "indexes": [
      {
        "name": "comandaRestaurante_itemcardapio_name",
        "columns": [
          "name"
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
