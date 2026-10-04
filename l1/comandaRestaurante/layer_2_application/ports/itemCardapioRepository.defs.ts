/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "ItemCardapioRepository",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.defs.ts"
  ],
  "data": {
    "entityId": "ItemCardapio",
    "interfaceName": "ItemCardapioRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "ItemCardapio"
        ],
        "returns": "ItemCardapio"
      },
      {
        "name": "list",
        "params": [
          "ItemCardapioFilter"
        ],
        "returns": "ItemCardapio[]"
      },
      {
        "name": "update",
        "params": [
          "ItemCardapio"
        ],
        "returns": "ItemCardapio"
      }
    ]
  }
} as const;

export default definition;
