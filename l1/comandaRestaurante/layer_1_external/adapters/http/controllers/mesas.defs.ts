/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/http/controllers/mesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "mesas",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/requests/mesas.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "mesas",
    "handlers": [
      {
        "route": "comandaRestaurante.mesas.createMesa",
        "kind": "command",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.mesas.createMesa",
        "contractPath": "l2/comandaRestaurante/web/contracts/mesas.defs.ts",
        "contractInterface": "MesasContracts"
      },
      {
        "route": "comandaRestaurante.mesas.load",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.mesas.load",
        "contractPath": "l2/comandaRestaurante/web/contracts/mesas.defs.ts",
        "contractInterface": "MesasContracts"
      },
      {
        "route": "comandaRestaurante.mesas.loadMesas",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.mesas.loadMesas",
        "contractPath": "l2/comandaRestaurante/web/contracts/mesas.defs.ts",
        "contractInterface": "MesasContracts"
      },
      {
        "route": "comandaRestaurante.mesas.updateMesa",
        "kind": "command",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.mesas.updateMesa",
        "contractPath": "l2/comandaRestaurante/web/contracts/mesas.defs.ts",
        "contractInterface": "MesasContracts"
      }
    ]
  }
} as const;

export default definition;
