/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "DespesaRepository",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.defs.ts"
  ],
  "data": {
    "entityId": "Despesa",
    "interfaceName": "DespesaRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "Despesa"
        ],
        "returns": "Despesa"
      },
      {
        "name": "list",
        "params": [
          "DespesaFilter"
        ],
        "returns": "Despesa[]"
      },
      {
        "name": "update",
        "params": [
          "Despesa"
        ],
        "returns": "Despesa"
      },
      {
        "name": "transition",
        "params": [
          "Despesa",
          "transitionId"
        ],
        "returns": "Despesa"
      }
    ]
  }
} as const;

export default definition;
