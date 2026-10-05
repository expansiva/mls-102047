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
        "route": "comandaRestaurante.fechamento.buscarComandasAbertas",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.fechamento.buscarComandasAbertas",
        "contractPath": "l2/comandaRestaurante/web/contracts/fechamento.defs.ts",
        "contractInterface": "FechamentoContracts"
      },
      {
        "route": "comandaRestaurante.fechamento.carregarFechamento",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.fechamento.carregarFechamento",
        "contractPath": "l2/comandaRestaurante/web/contracts/fechamento.defs.ts",
        "contractInterface": "FechamentoContracts"
      },
      {
        "route": "comandaRestaurante.fechamento.carregarMaisComandasAbertas",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.fechamento.carregarMaisComandasAbertas",
        "contractPath": "l2/comandaRestaurante/web/contracts/fechamento.defs.ts",
        "contractInterface": "FechamentoContracts"
      },
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
        "route": "comandaRestaurante.fechamento.obterComandaParaFechamento",
        "kind": "query",
        "grantIds": [
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.fechamento.obterComandaParaFechamento",
        "contractPath": "l2/comandaRestaurante/web/contracts/fechamento.defs.ts",
        "contractInterface": "FechamentoContracts"
      }
    ]
  }
} as const;

export default definition;
