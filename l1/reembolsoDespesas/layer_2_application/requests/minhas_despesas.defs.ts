/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/minhas_despesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "minhas_despesas",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/createDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/enviarParaAprovacao.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/reenviarParaAprovacao.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/updateDespesa.defs.ts"
  ],
  "data": {
    "pageId": "minhas_despesas",
    "requests": [
      {
        "route": "reembolsoDespesas.minhas_despesas.load",
        "kind": "qry",
        "uses": [
          "listDespesa"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "minhasDespesas",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "status",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.descricao",
              "details.reenvioRealizado"
            ]
          }
        ],
        "params": [
          {
            "name": "colaboradorId",
            "target": "minhasDespesas",
            "field": "colaboradorId"
          },
          {
            "name": "page",
            "target": "minhasDespesas",
            "pages": "listaMinhasDespesas"
          },
          {
            "name": "pageSize",
            "target": "minhasDespesas",
            "pages": "listaMinhasDespesas"
          }
        ]
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.loadMinhasDespesas",
        "kind": "qry",
        "uses": [
          "listDespesa"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "minhasDespesas",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "status",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.descricao",
              "details.reenvioRealizado"
            ]
          }
        ],
        "params": [
          {
            "name": "colaboradorId",
            "target": "minhasDespesas",
            "field": "colaboradorId"
          },
          {
            "name": "page",
            "target": "minhasDespesas",
            "pages": "listaMinhasDespesas"
          },
          {
            "name": "pageSize",
            "target": "minhasDespesas",
            "pages": "listaMinhasDespesas"
          }
        ]
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.registrarDespesa",
        "kind": "cmd",
        "uses": [
          "createDespesa"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "despesa",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.descricao"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.corrigirDespesa",
        "kind": "cmd",
        "uses": [
          "updateDespesa"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "despesa",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.descricao"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.enviarParaAprovacao",
        "kind": "cmd",
        "uses": [
          "enviarParaAprovacao"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "despesa",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.descricao"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.reenviarParaAprovacao",
        "kind": "cmd",
        "uses": [
          "reenviarParaAprovacao"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "despesa",
            "entity": "Despesa",
            "fields": [
              "id",
              "version",
              "details.dataDespesa",
              "details.categoria",
              "details.valor",
              "details.descricao"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
