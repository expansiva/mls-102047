/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/ports/inscricaoRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "InscricaoRepository",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/inscricao.defs.ts"
  ],
  "data": {
    "entityId": "Inscricao",
    "interfaceName": "InscricaoRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "Inscricao"
        ],
        "returns": "Inscricao"
      },
      {
        "name": "list",
        "params": [
          "InscricaoFilter"
        ],
        "returns": "Inscricao[]"
      },
      {
        "name": "get",
        "params": [
          "id"
        ],
        "returns": "Inscricao"
      },
      {
        "name": "transition",
        "params": [
          "Inscricao",
          "transitionId"
        ],
        "returns": "Inscricao"
      }
    ]
  }
} as const;

export default definition;
