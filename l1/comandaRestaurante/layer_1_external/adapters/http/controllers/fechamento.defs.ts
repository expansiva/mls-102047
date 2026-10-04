/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/http/controllers/fechamento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "fechamento",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/requests/fechamento.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "fechamento",
    "handlers": [
      {
        "route": "comandaRestaurante.fechamento.fecharComandaPaga",
        "kind": "command",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.fechamento.fecharComandaPaga",
        "contractPath": "l2/comandaRestaurante/web/contracts/fechamento.defs.ts",
        "contractInterface": "FechamentoContracts"
      },
      {
        "route": "comandaRestaurante.fechamento.load",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.fechamento.load",
        "contractPath": "l2/comandaRestaurante/web/contracts/fechamento.defs.ts",
        "contractInterface": "FechamentoContracts"
      },
      {
        "route": "comandaRestaurante.fechamento.loadComanda",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.fechamento.loadComanda",
        "contractPath": "l2/comandaRestaurante/web/contracts/fechamento.defs.ts",
        "contractInterface": "FechamentoContracts"
      },
      {
        "route": "comandaRestaurante.fechamento.loadFechamento",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.fechamento.loadFechamento",
        "contractPath": "l2/comandaRestaurante/web/contracts/fechamento.defs.ts",
        "contractInterface": "FechamentoContracts"
      }
    ]
  }
} as const;

export default definition;
