/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/profissionais_recepcao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "profissionais_recepcao",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/requests/profissionais_recepcao.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "profissionais_recepcao",
    "handlers": [
      {
        "route": "agendaClinica.profissionais_recepcao.load",
        "kind": "query",
        "grantIds": [
          "consultarProfissionaisParaAgenda"
        ],
        "serviceFunction": "agendaClinica.profissionais_recepcao.load",
        "contractPath": "l2/agendaClinica/web/contracts/profissionais_recepcao.defs.ts",
        "contractInterface": "Profissionais_recepcaoContracts"
      },
      {
        "route": "agendaClinica.profissionais_recepcao.loadProfissionaisRecepcao",
        "kind": "query",
        "grantIds": [
          "consultarProfissionaisParaAgenda"
        ],
        "serviceFunction": "agendaClinica.profissionais_recepcao.loadProfissionaisRecepcao",
        "contractPath": "l2/agendaClinica/web/contracts/profissionais_recepcao.defs.ts",
        "contractInterface": "Profissionais_recepcaoContracts"
      }
    ]
  }
} as const;

export default definition;
