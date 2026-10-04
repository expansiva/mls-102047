/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "MesaRepository",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.defs.ts"
  ],
  "data": {
    "entityId": "Mesa",
    "interfaceName": "MesaRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "Mesa"
        ],
        "returns": "Mesa"
      },
      {
        "name": "list",
        "params": [
          "MesaFilter"
        ],
        "returns": "Mesa[]"
      },
      {
        "name": "get",
        "params": [
          "id"
        ],
        "returns": "Mesa"
      },
      {
        "name": "update",
        "params": [
          "Mesa"
        ],
        "returns": "Mesa"
      }
    ]
  }
} as const;

export default definition;
