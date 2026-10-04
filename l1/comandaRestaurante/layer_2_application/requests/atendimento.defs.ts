/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/requests/atendimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "atendimento",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/cancelarItemComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/createComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/createItemComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/getComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/getItemComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/getMesa.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listItemCardapio.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listMesa.defs.ts"
  ],
  "data": {
    "pageId": "atendimento",
    "requests": [
      {
        "route": "comandaRestaurante.atendimento.load",
        "kind": "qry",
        "uses": [
          "listMesa",
          "listComanda",
          "listItemCardapio"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "atendimento",
            "entity": "Mesa",
            "fields": [
              "id",
              "code",
              "details.disponivel"
            ]
          },
          {
            "key": "fechamento",
            "entity": "Comanda",
            "fields": [
              "id",
              "number",
              "mesaId",
              "status"
            ]
          },
          {
            "key": "cardapio",
            "entity": "ItemCardapio",
            "fields": [
              "id",
              "name",
              "details.precoVigente"
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "atendimento",
            "pages": "lookupAtendimento"
          },
          {
            "name": "pageSize",
            "target": "atendimento",
            "pages": "lookupAtendimento"
          }
        ]
      },
      {
        "route": "comandaRestaurante.atendimento.loadAtendimento",
        "kind": "qry",
        "uses": [
          "listMesa"
        ],
        "transaction": "none",
        "outputs": [
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
            "name": "page",
            "target": "atendimento",
            "pages": "lookupAtendimento"
          },
          {
            "name": "pageSize",
            "target": "atendimento",
            "pages": "lookupAtendimento"
          }
        ]
      },
      {
        "route": "comandaRestaurante.atendimento.loadComanda",
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
              "number",
              "mesaId",
              "status",
              "details.subtotal"
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
        "route": "comandaRestaurante.atendimento.abrirComanda",
        "kind": "cmd",
        "uses": [
          "createComanda",
          "getItemComanda",
          "getMesa"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "comanda",
            "entity": "Comanda",
            "fields": [
              "id"
            ]
          },
          {
            "key": "itemComanda",
            "entity": "ItemComanda",
            "fields": [
              "id",
              "version",
              "comandaId",
              "itemCardapioId",
              "status",
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
      },
      {
        "route": "comandaRestaurante.atendimento.lancarItem",
        "kind": "cmd",
        "uses": [
          "createItemComanda",
          "getComanda"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "itemComanda",
            "entity": "ItemComanda",
            "fields": [
              "id",
              "version",
              "itemCardapioId",
              "details.quantidade",
              "details.observacao"
            ]
          },
          {
            "key": "comanda",
            "entity": "Comanda",
            "fields": [
              "id",
              "number",
              "mesaId",
              "status"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "comandaRestaurante.atendimento.cancelarItem",
        "kind": "cmd",
        "uses": [
          "cancelarItemComanda",
          "getComanda"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "itemComanda",
            "entity": "ItemComanda",
            "fields": [
              "id",
              "version"
            ]
          },
          {
            "key": "comanda",
            "entity": "Comanda",
            "fields": [
              "id",
              "number",
              "mesaId",
              "status"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
