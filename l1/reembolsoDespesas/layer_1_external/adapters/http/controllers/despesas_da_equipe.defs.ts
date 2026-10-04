/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/http/controllers/despesas_da_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "despesas_da_equipe",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/requests/despesas_da_equipe.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "despesas_da_equipe",
    "handlers": [
      {
        "route": "reembolsoDespesas.despesas_da_equipe.approveExpense",
        "kind": "command",
        "grantIds": [
          "gestorAnalisaDespesasDaEquipe"
        ],
        "serviceFunction": "reembolsoDespesas.despesas_da_equipe.approveExpense",
        "contractPath": "l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.ts",
        "contractInterface": "Despesas_da_equipeContracts"
      },
      {
        "route": "reembolsoDespesas.despesas_da_equipe.load",
        "kind": "query",
        "grantIds": [
          "gestorAnalisaDespesasDaEquipe"
        ],
        "serviceFunction": "reembolsoDespesas.despesas_da_equipe.load",
        "contractPath": "l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.ts",
        "contractInterface": "Despesas_da_equipeContracts"
      },
      {
        "route": "reembolsoDespesas.despesas_da_equipe.loadDespesasDaEquipe",
        "kind": "query",
        "grantIds": [
          "gestorAnalisaDespesasDaEquipe"
        ],
        "serviceFunction": "reembolsoDespesas.despesas_da_equipe.loadDespesasDaEquipe",
        "contractPath": "l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.ts",
        "contractInterface": "Despesas_da_equipeContracts"
      },
      {
        "route": "reembolsoDespesas.despesas_da_equipe.rejectExpense",
        "kind": "command",
        "grantIds": [
          "gestorAnalisaDespesasDaEquipe"
        ],
        "serviceFunction": "reembolsoDespesas.despesas_da_equipe.rejectExpense",
        "contractPath": "l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.ts",
        "contractInterface": "Despesas_da_equipeContracts"
      }
    ]
  }
} as const;

export default definition;
