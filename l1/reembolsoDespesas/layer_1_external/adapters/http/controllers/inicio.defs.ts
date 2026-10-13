/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/http/controllers/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "inicio",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/requests/inicio.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "inicio",
    "handlers": [
      {
        "route": "reembolsoDespesas.inicio.qryInicio",
        "kind": "query",
        "grantIds": [
          "gestorAnalisaDespesasDaEquipe"
        ],
        "serviceFunction": "reembolsoDespesas.inicio.qryInicio",
        "contractPath": "l2/reembolsoDespesas/web/contracts/inicio.defs.ts",
        "contractInterface": "InicioContracts"
      }
    ]
  }
} as const;

export default definition;
