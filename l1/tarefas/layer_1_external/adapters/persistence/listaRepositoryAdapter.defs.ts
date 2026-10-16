/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/persistence/listaRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "ListaRepository",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/adapters/persistence/lista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/ports/listaRepository.defs.ts"
  ],
  "data": {
    "entityId": "Lista",
    "portId": "ListaRepository",
    "tableId": "lista",
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
        "field": "nome",
        "column": "nome"
      },
      {
        "field": "ativa",
        "column": "ativa"
      },
      {
        "field": "details.tipo",
        "column": "json:details.tipo"
      },
      {
        "field": "details.descricao",
        "column": "json:details.descricao"
      },
      {
        "field": "details.quantidadeTarefasAbertas",
        "column": "json:details.quantidadeTarefasAbertas"
      }
    ]
  }
} as const;

export default definition;
