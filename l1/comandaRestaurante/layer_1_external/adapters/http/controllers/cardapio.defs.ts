/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/http/controllers/cardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "cardapio",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/requests/cardapio.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "cardapio",
    "handlers": [
      {
        "route": "comandaRestaurante.cardapio.atualizarItemCardapio",
        "kind": "command",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.cardapio.atualizarItemCardapio",
        "contractPath": "l2/comandaRestaurante/web/contracts/cardapio.defs.ts",
        "contractInterface": "CardapioContracts"
      },
      {
        "route": "comandaRestaurante.cardapio.cadastrarItemCardapio",
        "kind": "command",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.cardapio.cadastrarItemCardapio",
        "contractPath": "l2/comandaRestaurante/web/contracts/cardapio.defs.ts",
        "contractInterface": "CardapioContracts"
      },
      {
        "route": "comandaRestaurante.cardapio.load",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.cardapio.load",
        "contractPath": "l2/comandaRestaurante/web/contracts/cardapio.defs.ts",
        "contractInterface": "CardapioContracts"
      },
      {
        "route": "comandaRestaurante.cardapio.loadCardapio",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.cardapio.loadCardapio",
        "contractPath": "l2/comandaRestaurante/web/contracts/cardapio.defs.ts",
        "contractInterface": "CardapioContracts"
      }
    ]
  }
} as const;

export default definition;
