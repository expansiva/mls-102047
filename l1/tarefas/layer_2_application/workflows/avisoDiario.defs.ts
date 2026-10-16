/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/workflows/avisoDiario.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "workflowProcess",
  "artifactId": "avisoDiario",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l4/tarefas/journeys/avisoDiarioVencimentos.defs.ts",
    "_102047_/l4/tarefas/ontology/AvisoVencimento.defs.ts",
    "_102047_/l4/tarefas/workflows.defs.ts"
  ],
  "data": {
    "processId": "avisoDiario",
    "trigger": {
      "kind": "scheduled",
      "schedule": "Todo dia às 8h"
    },
    "functions": [
      "gerarAvisosDiarios",
      "resolverResponsaveisComVencimento"
    ],
    "operations": [
      {
        "operation": "AvisoVencimento.create",
        "steps": [
          "task:gerarAvisos"
        ]
      }
    ],
    "occurrence": {
      "entityId": "AvisoVencimento"
    }
  }
} as const;

export default definition;
