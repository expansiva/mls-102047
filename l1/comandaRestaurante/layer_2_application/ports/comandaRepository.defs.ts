/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "ComandaRepository",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.defs.ts"
  ],
  "data": {
    "entityId": "Comanda",
    "interfaceName": "ComandaRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "Comanda"
        ],
        "returns": "Comanda"
      },
      {
        "name": "list",
        "params": [
          "ComandaFilter"
        ],
        "returns": "Comanda[]"
      },
      {
        "name": "get",
        "params": [
          "id"
        ],
        "returns": "Comanda"
      },
      {
        "name": "transition",
        "params": [
          "Comanda",
          "transitionId"
        ],
        "returns": "Comanda"
      }
    ]
  }
} as const;

export default definition;
