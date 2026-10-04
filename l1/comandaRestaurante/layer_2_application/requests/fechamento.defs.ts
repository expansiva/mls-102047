/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/requests/fechamento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "fechamento",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/fecharComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/getComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/getItemComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/getMesa.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listMesa.defs.ts"
  ],
  "data": {
    "pageId": "fechamento",
    "requests": [
      {
        "route": "comandaRestaurante.fechamento.load",
        "kind": "qry",
        "uses": [
          "listComanda",
          "listMesa"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "fechamento",
            "entity": "Comanda",
            "fields": [
              "id",
              "version",
              "number",
              "status",
              "mesaId",
              "details.totalComanda",
              "details.subtotal",
              "details.discountAmount",
              "details.paymentMethod"
            ]
          },
          {
            "key": "atendimento",
            "entity": "Mesa",
            "fields": [
              "id",
              "code",
              "details.disponivel"
            ]
          }
        ],
        "params": [
          {
            "name": "mesaId",
            "target": "fechamento",
            "field": "mesaId"
          },
          {
            "name": "page",
            "target": "fechamento",
            "pages": "openComandaList"
          },
          {
            "name": "pageSize",
            "target": "fechamento",
            "pages": "openComandaList"
          }
        ]
      },
      {
        "route": "comandaRestaurante.fechamento.loadFechamento",
        "kind": "qry",
        "uses": [
          "listComanda"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "fechamento",
            "entity": "Comanda",
            "fields": [
              "id",
              "version",
              "number",
              "status",
              "mesaId",
              "details.totalComanda",
              "details.subtotal",
              "details.discountAmount",
              "details.paymentMethod"
            ]
          }
        ],
        "params": [
          {
            "name": "mesaId",
            "target": "fechamento",
            "field": "mesaId"
          },
          {
            "name": "page",
            "target": "fechamento",
            "pages": "openComandaList"
          },
          {
            "name": "pageSize",
            "target": "fechamento",
            "pages": "openComandaList"
          }
        ]
      },
      {
        "route": "comandaRestaurante.fechamento.loadComanda",
        "kind": "qry",
        "uses": [
          "getComanda"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "comanda",
            "entity": "Comanda",
            "fields": [
              "id",
              "version",
              "number",
              "status",
              "details.subtotal",
              "details.totalComanda"
            ]
          }
        ],
        "params": [
          {
            "name": "id",
            "target": "comanda",
            "field": "id"
          }
        ]
      },
      {
        "route": "comandaRestaurante.fechamento.fecharComandaPaga",
        "kind": "cmd",
        "uses": [
          "fecharComanda",
          "getItemComanda",
          "getMesa"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "comanda",
            "entity": "Comanda",
            "fields": [
              "id",
              "version",
              "details.discountAmount",
              "details.paymentMethod"
            ]
          },
          {
            "key": "itemComanda",
            "entity": "ItemComanda",
            "fields": [
              "id",
              "status",
              "itemCardapioId",
              "details.quantidade",
              "details.observacao",
              "details.precoUnitario",
              "details.valorTotal"
            ]
          },
          {
            "key": "mesa",
            "entity": "Mesa",
            "fields": [
              "id",
              "code",
              "details.disponivel"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
