/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/registerRepositories.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryRegistration",
  "artifactId": "registerRepositories",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/despesaRepositoryAdapter.defs.ts"
  ],
  "data": {
    "registrationId": "registerRepositories",
    "adapters": [
      {
        "portId": "DespesaRepository",
        "adapterArtifactId": "DespesaRepository"
      }
    ]
  }
} as const;

export default definition;
