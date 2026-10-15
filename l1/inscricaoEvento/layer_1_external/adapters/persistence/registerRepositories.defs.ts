/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/registerRepositories.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryRegistration",
  "artifactId": "registerRepositories",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/eventoRepositoryAdapter.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/inscricaoRepositoryAdapter.defs.ts"
  ],
  "data": {
    "registrationId": "registerRepositories",
    "adapters": [
      {
        "portId": "EventoRepository",
        "adapterArtifactId": "EventoRepository"
      },
      {
        "portId": "InscricaoRepository",
        "adapterArtifactId": "InscricaoRepository"
      }
    ]
  }
} as const;

export default definition;
