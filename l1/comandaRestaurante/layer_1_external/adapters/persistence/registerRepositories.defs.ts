/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/registerRepositories.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryRegistration",
  "artifactId": "registerRepositories",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/comandaRepositoryAdapter.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemCardapioRepositoryAdapter.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemComandaRepositoryAdapter.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/mesaRepositoryAdapter.defs.ts"
  ],
  "data": {
    "registrationId": "registerRepositories",
    "adapters": [
      {
        "portId": "ComandaRepository",
        "adapterArtifactId": "ComandaRepository"
      },
      {
        "portId": "ItemCardapioRepository",
        "adapterArtifactId": "ItemCardapioRepository"
      },
      {
        "portId": "ItemComandaRepository",
        "adapterArtifactId": "ItemComandaRepository"
      },
      {
        "portId": "MesaRepository",
        "adapterArtifactId": "MesaRepository"
      }
    ]
  }
} as const;

export default definition;
