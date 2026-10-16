/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/persistence/avisoVencimentoRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "AvisoVencimentoRepository",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/adapters/persistence/avisoVencimento.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/ports/avisoVencimentoRepository.defs.ts"
  ],
  "data": {
    "entityId": "AvisoVencimento",
    "portId": "AvisoVencimentoRepository",
    "tableId": "avisoVencimento",
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
        "field": "responsavelId",
        "column": "responsavelId"
      },
      {
        "field": "dataReferencia",
        "column": "dataReferencia"
      },
      {
        "field": "status",
        "column": "status"
      },
      {
        "field": "details.geradoEm",
        "column": "json:details.geradoEm"
      },
      {
        "field": "details.finalizadoEm",
        "column": "json:details.finalizadoEm"
      },
      {
        "field": "details.motivoFalha",
        "column": "json:details.motivoFalha"
      },
      {
        "field": "details.tarefas.tarefaId",
        "column": "json:details.tarefas.tarefaId"
      },
      {
        "field": "details.tarefas.prazo",
        "column": "json:details.tarefas.prazo"
      },
      {
        "field": "details.tarefas.situacaoPrazo",
        "column": "json:details.tarefas.situacaoPrazo"
      },
      {
        "field": "details.quantidadeTarefas",
        "column": "json:details.quantidadeTarefas"
      },
      {
        "field": "details.quantidadeAtrasadas",
        "column": "json:details.quantidadeAtrasadas"
      }
    ]
  }
} as const;

export default definition;
