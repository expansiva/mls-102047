/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/requests/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "inicio",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listItemComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listMesa.defs.ts"
  ],
  "data": {
    "pageId": "inicio",
    "requests": [
      {
        "route": "comandaRestaurante.inicio.load",
        "kind": "qry",
        "uses": [
          "listMesa",
          "listComanda",
          "listItemComanda"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "atendimento",
            "entity": "Mesa",
            "fields": [
              "id",
              "details.disponivel"
            ]
          },
          {
            "key": "fechamento",
            "entity": "Comanda",
            "fields": [
              "id",
              "details.subtotal"
            ]
          },
          {
            "key": "itemComanda",
            "entity": "ItemComanda",
            "fields": [
              "id",
              "details.valorTotal"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
