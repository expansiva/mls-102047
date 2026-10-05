/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "ItemComandaRepository",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.defs.ts"
  ],
  "data": {
    "entityId": "ItemComanda",
    "interfaceName": "ItemComandaRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "ItemComanda"
        ],
        "returns": "ItemComanda"
      },
      {
        "name": "list",
        "params": [
          "ItemComandaFilter"
        ],
        "returns": "ItemComanda[]"
      },
      {
        "name": "transition",
        "params": [
          "ItemComanda",
          "transitionId"
        ],
        "returns": "ItemComanda"
      }
    ]
  }
} as const;

export default definition;
