/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/http/controllers/despesas_aprovadas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "despesas_aprovadas",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/requests/despesas_aprovadas.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "despesas_aprovadas",
    "handlers": [
      {
        "route": "reembolsoDespesas.despesas_aprovadas.load",
        "kind": "query",
        "grantIds": [
          "financeiroConsultaEpagaDespesasAprovadas"
        ],
        "serviceFunction": "reembolsoDespesas.despesas_aprovadas.load",
        "contractPath": "l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.ts",
        "contractInterface": "Despesas_aprovadasContracts"
      },
      {
        "route": "reembolsoDespesas.despesas_aprovadas.loadDespesasAprovadas",
        "kind": "query",
        "grantIds": [
          "financeiroConsultaEpagaDespesasAprovadas"
        ],
        "serviceFunction": "reembolsoDespesas.despesas_aprovadas.loadDespesasAprovadas",
        "contractPath": "l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.ts",
        "contractInterface": "Despesas_aprovadasContracts"
      },
      {
        "route": "reembolsoDespesas.despesas_aprovadas.registerPayment",
        "kind": "command",
        "grantIds": [
          "financeiroConsultaEpagaDespesasAprovadas"
        ],
        "serviceFunction": "reembolsoDespesas.despesas_aprovadas.registerPayment",
        "contractPath": "l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.ts",
        "contractInterface": "Despesas_aprovadasContracts"
      }
    ]
  }
} as const;

export default definition;
