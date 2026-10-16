/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/getLista.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getLista",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/ports/listaRepository.defs.ts",
    "_102047_/l1/tarefas/layer_3_domain/entities/lista.defs.ts"
  ],
  "data": {
    "usecaseId": "getLista",
    "entityId": "Lista",
    "operation": "get",
    "rulesApplied": [],
    "effects": []
  }
} as const;

export default definition;
