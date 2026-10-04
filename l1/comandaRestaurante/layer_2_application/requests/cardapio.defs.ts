/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/requests/cardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "cardapio",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/createItemCardapio.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listItemCardapio.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/updateItemCardapio.defs.ts"
  ],
  "data": {
    "pageId": "cardapio",
    "requests": [
      {
        "route": "comandaRestaurante.cardapio.load",
        "kind": "qry",
        "uses": [
          "listItemCardapio"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "cardapio",
            "entity": "ItemCardapio",
            "fields": [
              "id",
              "version",
              "name",
              "details.precoVigente"
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "cardapio",
            "pages": "listaItensCardapio"
          },
          {
            "name": "pageSize",
            "target": "cardapio",
            "pages": "listaItensCardapio"
          }
        ]
      },
      {
        "route": "comandaRestaurante.cardapio.loadCardapio",
        "kind": "qry",
        "uses": [
          "listItemCardapio"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "cardapio",
            "entity": "ItemCardapio",
            "fields": [
              "id",
              "version",
              "name",
              "details.precoVigente"
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "cardapio",
            "pages": "listaItensCardapio"
          },
          {
            "name": "pageSize",
            "target": "cardapio",
            "pages": "listaItensCardapio"
          }
        ]
      },
      {
        "route": "comandaRestaurante.cardapio.cadastrarItemCardapio",
        "kind": "cmd",
        "uses": [
          "createItemCardapio"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "itemCardapio",
            "entity": "ItemCardapio",
            "fields": [
              "id",
              "version",
              "name",
              "details.precoVigente"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "comandaRestaurante.cardapio.atualizarItemCardapio",
        "kind": "cmd",
        "uses": [
          "updateItemCardapio"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "itemCardapio",
            "entity": "ItemCardapio",
            "fields": [
              "id",
              "version",
              "name",
              "details.precoVigente"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
