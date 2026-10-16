/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/ports/avisoVencimentoRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "AvisoVencimentoRepository",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.defs.ts"
  ],
  "data": {
    "entityId": "AvisoVencimento",
    "interfaceName": "AvisoVencimentoRepository",
    "methods": [
      {
        "name": "list",
        "params": [
          "AvisoVencimentoFilter"
        ],
        "returns": "AvisoVencimento[]"
      },
      {
        "name": "get",
        "params": [
          "id"
        ],
        "returns": "AvisoVencimento"
      }
    ]
  }
} as const;

export default definition;
