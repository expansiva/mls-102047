/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/despesas_aprovadas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "despesas_aprovadas",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/registrarPagamento.defs.ts"
  ],
  "data": {
    "pageId": "despesas_aprovadas",
    "requests": [
      {
        "route": "reembolsoDespesas.despesas_aprovadas.load",
        "kind": "qry",
        "uses": [
          "listDespesa"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "despesasAprovadas",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "colaboradorId",
              "status",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.dataPagamento"
            ]
          }
        ],
        "params": [
          {
            "name": "colaboradorId",
            "target": "despesasAprovadas",
            "field": "colaboradorId"
          },
          {
            "name": "page",
            "target": "despesasAprovadas",
            "pages": "approvedExpensesList"
          },
          {
            "name": "pageSize",
            "target": "despesasAprovadas",
            "pages": "approvedExpensesList"
          }
        ]
      },
      {
        "route": "reembolsoDespesas.despesas_aprovadas.loadDespesasAprovadas",
        "kind": "qry",
        "uses": [
          "listDespesa"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "despesasAprovadas",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "colaboradorId",
              "status",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.dataPagamento"
            ]
          }
        ],
        "params": [
          {
            "name": "colaboradorId",
            "target": "despesasAprovadas",
            "field": "colaboradorId"
          },
          {
            "name": "page",
            "target": "despesasAprovadas",
            "pages": "approvedExpensesList"
          },
          {
            "name": "pageSize",
            "target": "despesasAprovadas",
            "pages": "approvedExpensesList"
          }
        ]
      },
      {
        "route": "reembolsoDespesas.despesas_aprovadas.registerPayment",
        "kind": "cmd",
        "uses": [
          "registrarPagamento"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "despesa",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "details.dataPagamento"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
