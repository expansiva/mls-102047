/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/http/controllers/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "inicio",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/requests/inicio.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "inicio",
    "handlers": [
      {
        "route": "comandaRestaurante.inicio.load",
        "kind": "query",
        "grantIds": [
          "garcomAtendimentoComandas",
          "caixaFechamentoEcadastroOperacional"
        ],
        "serviceFunction": "comandaRestaurante.inicio.load",
        "contractPath": "l2/comandaRestaurante/web/contracts/inicio.defs.ts",
        "contractInterface": "InicioContracts"
      }
    ]
  }
} as const;

export default definition;
