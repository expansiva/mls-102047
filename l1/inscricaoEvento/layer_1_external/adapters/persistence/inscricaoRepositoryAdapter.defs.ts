/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/inscricaoRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "InscricaoRepository",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/inscricao.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/inscricaoRepository.defs.ts"
  ],
  "data": {
    "entityId": "Inscricao",
    "portId": "InscricaoRepository",
    "tableId": "inscricao",
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
        "field": "registrationCode",
        "column": "registrationCode"
      },
      {
        "field": "eventoId",
        "column": "eventoId"
      },
      {
        "field": "participanteId",
        "column": "participanteId"
      },
      {
        "field": "status",
        "column": "status"
      },
      {
        "field": "receivedAt",
        "column": "receivedAt"
      },
      {
        "field": "details.promotedAt",
        "column": "json:details.promotedAt"
      },
      {
        "field": "details.cancelledAt",
        "column": "json:details.cancelledAt"
      },
      {
        "field": "details.posicaoListaEspera",
        "column": "json:details.posicaoListaEspera"
      },
      {
        "field": "details.ocupaVaga",
        "column": "json:details.ocupaVaga"
      }
    ]
  }
} as const;

export default definition;
