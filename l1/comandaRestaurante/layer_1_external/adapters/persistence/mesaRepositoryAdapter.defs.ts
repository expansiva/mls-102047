/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/mesaRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "MesaRepository",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/mesa.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.defs.ts"
  ],
  "data": {
    "entityId": "Mesa",
    "portId": "MesaRepository",
    "tableId": "mesa",
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
        "field": "code",
        "column": "code"
      },
      {
        "field": "details.disponivel",
        "column": "json:details.disponivel"
      }
    ]
  }
} as const;

export default definition;
