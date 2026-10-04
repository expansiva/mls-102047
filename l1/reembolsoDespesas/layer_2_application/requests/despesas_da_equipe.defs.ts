/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/despesas_da_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "despesas_da_equipe",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/aprovarDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listColaborador.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/rejeitarDespesa.defs.ts"
  ],
  "data": {
    "pageId": "despesas_da_equipe",
    "requests": [
      {
        "route": "reembolsoDespesas.despesas_da_equipe.load",
        "kind": "qry",
        "uses": [
          "listDespesa",
          "listColaborador"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "despesasDaEquipe",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "colaboradorId",
              "status",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.reenvioRealizado",
              "details.motivoRejeicao"
            ]
          },
          {
            "key": "colaborador",
            "entity": "Colaborador",
            "fields": [
              "id",
              "details.identification"
            ]
          }
        ],
        "params": [
          {
            "name": "colaboradorId",
            "target": "despesasDaEquipe",
            "field": "colaboradorId"
          },
          {
            "name": "page",
            "target": "despesasDaEquipe",
            "pages": "pendingTeamExpenses"
          },
          {
            "name": "pageSize",
            "target": "despesasDaEquipe",
            "pages": "pendingTeamExpenses"
          }
        ]
      },
      {
        "route": "reembolsoDespesas.despesas_da_equipe.loadDespesasDaEquipe",
        "kind": "qry",
        "uses": [
          "listDespesa"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "despesasDaEquipe",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "colaboradorId",
              "status",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.reenvioRealizado",
              "details.motivoRejeicao"
            ]
          }
        ],
        "params": [
          {
            "name": "colaboradorId",
            "target": "despesasDaEquipe",
            "field": "colaboradorId"
          },
          {
            "name": "page",
            "target": "despesasDaEquipe",
            "pages": "pendingTeamExpenses"
          },
          {
            "name": "pageSize",
            "target": "despesasDaEquipe",
            "pages": "pendingTeamExpenses"
          }
        ]
      },
      {
        "route": "reembolsoDespesas.despesas_da_equipe.approveExpense",
        "kind": "cmd",
        "uses": [
          "aprovarDespesa"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "despesa",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "details.motivoRejeicao"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "reembolsoDespesas.despesas_da_equipe.rejectExpense",
        "kind": "cmd",
        "uses": [
          "rejeitarDespesa"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "despesa",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "details.motivoRejeicao"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
