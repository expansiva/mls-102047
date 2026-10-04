/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/auth/authorityMap.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "authorityMap",
  "artifactId": "authorityMap",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "mapId": "authorityMap",
    "entries": [
      {
        "grantId": "colaboradorGerenciaPropriasDespesas",
        "actorRef": "colaborador"
      },
      {
        "grantId": "financeiroConsultaEpagaDespesasAprovadas",
        "actorRef": "financeiro"
      },
      {
        "grantId": "gestorAnalisaDespesasDaEquipe",
        "actorRef": "gestorEquipe"
      }
    ]
  }
} as const;

export default definition;
