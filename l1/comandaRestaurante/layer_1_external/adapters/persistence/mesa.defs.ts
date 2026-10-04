/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/mesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "mesa",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.defs.ts"
  ],
  "data": {
    "tableId": "mesa",
    "entityId": "Mesa",
    "physicalName": "comandaRestaurante_mesa",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [
      [
        "code"
      ]
    ],
    "indexes": [
      {
        "name": "comandaRestaurante_mesa_code",
        "columns": [
          "code"
        ],
        "unique": true
      }
    ]
  }
} as const;

export default definition;
