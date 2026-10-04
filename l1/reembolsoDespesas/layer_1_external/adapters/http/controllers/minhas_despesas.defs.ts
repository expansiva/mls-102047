/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/http/controllers/minhas_despesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "minhas_despesas",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/requests/minhas_despesas.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "minhas_despesas",
    "handlers": [
      {
        "route": "reembolsoDespesas.minhas_despesas.corrigirDespesa",
        "kind": "command",
        "grantIds": [
          "colaboradorGerenciaPropriasDespesas"
        ],
        "serviceFunction": "reembolsoDespesas.minhas_despesas.corrigirDespesa",
        "contractPath": "l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.ts",
        "contractInterface": "Minhas_despesasContracts"
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.enviarParaAprovacao",
        "kind": "command",
        "grantIds": [
          "colaboradorGerenciaPropriasDespesas"
        ],
        "serviceFunction": "reembolsoDespesas.minhas_despesas.enviarParaAprovacao",
        "contractPath": "l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.ts",
        "contractInterface": "Minhas_despesasContracts"
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.load",
        "kind": "query",
        "grantIds": [
          "colaboradorGerenciaPropriasDespesas"
        ],
        "serviceFunction": "reembolsoDespesas.minhas_despesas.load",
        "contractPath": "l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.ts",
        "contractInterface": "Minhas_despesasContracts"
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.loadMinhasDespesas",
        "kind": "query",
        "grantIds": [
          "colaboradorGerenciaPropriasDespesas"
        ],
        "serviceFunction": "reembolsoDespesas.minhas_despesas.loadMinhasDespesas",
        "contractPath": "l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.ts",
        "contractInterface": "Minhas_despesasContracts"
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.reenviarParaAprovacao",
        "kind": "command",
        "grantIds": [
          "colaboradorGerenciaPropriasDespesas"
        ],
        "serviceFunction": "reembolsoDespesas.minhas_despesas.reenviarParaAprovacao",
        "contractPath": "l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.ts",
        "contractInterface": "Minhas_despesasContracts"
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.registrarDespesa",
        "kind": "command",
        "grantIds": [
          "colaboradorGerenciaPropriasDespesas"
        ],
        "serviceFunction": "reembolsoDespesas.minhas_despesas.registrarDespesa",
        "contractPath": "l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.ts",
        "contractInterface": "Minhas_despesasContracts"
      }
    ]
  }
} as const;

export default definition;
