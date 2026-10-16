/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listAvisoVencimento",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/ports/avisoVencimentoRepository.defs.ts",
    "_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.defs.ts"
  ],
  "data": {
    "usecaseId": "listAvisoVencimento",
    "entityId": "AvisoVencimento",
    "operation": "list",
    "rulesApplied": [],
    "effects": []
  }
} as const;

export default definition;
