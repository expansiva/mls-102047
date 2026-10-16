/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/getAvisoVencimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getAvisoVencimento",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/ports/avisoVencimentoRepository.defs.ts",
    "_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.defs.ts"
  ],
  "data": {
    "usecaseId": "getAvisoVencimento",
    "entityId": "AvisoVencimento",
    "operation": "get",
    "rulesApplied": [],
    "effects": []
  }
} as const;

export default definition;
