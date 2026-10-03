/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/despesaRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "DespesaRepository",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/despesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.defs.ts"
  ],
  "data": {
    "entityId": "Despesa",
    "portId": "DespesaRepository",
    "tableId": "despesa",
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
        "field": "colaboradorId",
        "column": "colaboradorId"
      },
      {
        "field": "status",
        "column": "status"
      },
      {
        "field": "details.dataDespesa",
        "column": "json:details.dataDespesa"
      },
      {
        "field": "details.categoria",
        "column": "json:details.categoria"
      },
      {
        "field": "details.valor",
        "column": "json:details.valor"
      },
      {
        "field": "details.descricao",
        "column": "json:details.descricao"
      },
      {
        "field": "details.motivoRejeicao",
        "column": "json:details.motivoRejeicao"
      },
      {
        "field": "details.reenvioRealizado",
        "column": "json:details.reenvioRealizado"
      },
      {
        "field": "details.dataPagamento",
        "column": "json:details.dataPagamento"
      }
    ]
  }
} as const;

export default definition;
