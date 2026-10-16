/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/persistence/itemChecklistRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "ItemChecklistRepository",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/adapters/persistence/itemChecklist.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/ports/itemChecklistRepository.defs.ts"
  ],
  "data": {
    "entityId": "ItemChecklist",
    "portId": "ItemChecklistRepository",
    "tableId": "itemChecklist",
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
        "field": "tarefaId",
        "column": "tarefaId"
      },
      {
        "field": "ordem",
        "column": "ordem"
      },
      {
        "field": "feito",
        "column": "feito"
      },
      {
        "field": "details.descricao",
        "column": "json:details.descricao"
      },
      {
        "field": "details.marcadoEm",
        "column": "json:details.marcadoEm"
      }
    ]
  }
} as const;

export default definition;
