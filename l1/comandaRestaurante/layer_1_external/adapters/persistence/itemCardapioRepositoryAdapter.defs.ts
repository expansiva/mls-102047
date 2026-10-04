/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemCardapioRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "ItemCardapioRepository",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemCardapio.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.defs.ts"
  ],
  "data": {
    "entityId": "ItemCardapio",
    "portId": "ItemCardapioRepository",
    "tableId": "itemCardapio",
    "columns": [
      {
        "field": "id",
        "column": "id"
      },
      {
        "field": "version",
        "column": "json:version"
      },
      {
        "field": "name",
        "column": "name"
      },
      {
        "field": "details.precoVigente",
        "column": "json:details.precoVigente"
      }
    ]
  }
} as const;

export default definition;
