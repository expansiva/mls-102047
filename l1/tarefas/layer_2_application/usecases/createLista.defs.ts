/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/createLista.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createLista",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/ports/listaRepository.defs.ts",
    "_102047_/l1/tarefas/layer_3_domain/entities/lista.defs.ts",
    "_102047_/l4/tarefas/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "createLista",
    "entityId": "Lista",
    "operation": "create",
    "rulesApplied": [
      "listaInativaNaoRecebeTarefa",
      "listaMantidaPorGestor",
      "listaNomeUnico"
    ],
    "effects": []
  }
} as const;

export default definition;
