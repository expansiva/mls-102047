/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/requests/mesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "mesas",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/createMesa.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/listMesa.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/updateMesa.defs.ts"
  ],
  "data": {
    "pageId": "mesas",
    "requests": [
      {
        "route": "comandaRestaurante.mesas.load",
        "kind": "qry",
        "uses": [
          "listMesa"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "mesas",
            "entity": "Mesa",
            "fields": [
              "id",
              "version",
              "code",
              "details.disponivel"
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "mesas",
            "pages": "mesasList"
          },
          {
            "name": "pageSize",
            "target": "mesas",
            "pages": "mesasList"
          }
        ]
      },
      {
        "route": "comandaRestaurante.mesas.loadMesas",
        "kind": "qry",
        "uses": [
          "listMesa"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "mesas",
            "entity": "Mesa",
            "fields": [
              "id",
              "version",
              "code",
              "details.disponivel"
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "mesas",
            "pages": "mesasList"
          },
          {
            "name": "pageSize",
            "target": "mesas",
            "pages": "mesasList"
          }
        ]
      },
      {
        "route": "comandaRestaurante.mesas.createMesa",
        "kind": "cmd",
        "uses": [
          "createMesa"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "mesa",
            "entity": "Mesa",
            "fields": [
              "id",
              "version",
              "code"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "comandaRestaurante.mesas.updateMesa",
        "kind": "cmd",
        "uses": [
          "updateMesa"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "mesa",
            "entity": "Mesa",
            "fields": [
              "id",
              "version",
              "code"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
