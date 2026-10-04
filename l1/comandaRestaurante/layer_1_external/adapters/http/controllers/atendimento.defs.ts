/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/http/controllers/atendimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "atendimento",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/requests/atendimento.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "atendimento",
    "handlers": [
      {
        "route": "comandaRestaurante.atendimento.abrirComanda",
        "kind": "command",
        "grantIds": [
          "garcomAtendimentoComandas"
        ],
        "serviceFunction": "comandaRestaurante.atendimento.abrirComanda",
        "contractPath": "l2/comandaRestaurante/web/contracts/atendimento.defs.ts",
        "contractInterface": "AtendimentoContracts"
      },
      {
        "route": "comandaRestaurante.atendimento.cancelarItem",
        "kind": "command",
        "grantIds": [
          "garcomAtendimentoComandas"
        ],
        "serviceFunction": "comandaRestaurante.atendimento.cancelarItem",
        "contractPath": "l2/comandaRestaurante/web/contracts/atendimento.defs.ts",
        "contractInterface": "AtendimentoContracts"
      },
      {
        "route": "comandaRestaurante.atendimento.lancarItem",
        "kind": "command",
        "grantIds": [
          "garcomAtendimentoComandas"
        ],
        "serviceFunction": "comandaRestaurante.atendimento.lancarItem",
        "contractPath": "l2/comandaRestaurante/web/contracts/atendimento.defs.ts",
        "contractInterface": "AtendimentoContracts"
      },
      {
        "route": "comandaRestaurante.atendimento.load",
        "kind": "query",
        "grantIds": [
          "garcomAtendimentoComandas"
        ],
        "serviceFunction": "comandaRestaurante.atendimento.load",
        "contractPath": "l2/comandaRestaurante/web/contracts/atendimento.defs.ts",
        "contractInterface": "AtendimentoContracts"
      },
      {
        "route": "comandaRestaurante.atendimento.loadAtendimento",
        "kind": "query",
        "grantIds": [
          "garcomAtendimentoComandas"
        ],
        "serviceFunction": "comandaRestaurante.atendimento.loadAtendimento",
        "contractPath": "l2/comandaRestaurante/web/contracts/atendimento.defs.ts",
        "contractInterface": "AtendimentoContracts"
      },
      {
        "route": "comandaRestaurante.atendimento.loadComanda",
        "kind": "query",
        "grantIds": [
          "garcomAtendimentoComandas"
        ],
        "serviceFunction": "comandaRestaurante.atendimento.loadComanda",
        "contractPath": "l2/comandaRestaurante/web/contracts/atendimento.defs.ts",
        "contractInterface": "AtendimentoContracts"
      }
    ]
  }
} as const;

export default definition;
