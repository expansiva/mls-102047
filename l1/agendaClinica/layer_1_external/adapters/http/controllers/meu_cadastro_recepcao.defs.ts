/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/meu_cadastro_recepcao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "meu_cadastro_recepcao",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/requests/meu_cadastro_recepcao.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "meu_cadastro_recepcao",
    "handlers": [
      {
        "route": "agendaClinica.meu_cadastro_recepcao.createOwnReceptionist",
        "kind": "command",
        "grantIds": [
          "consultarProprioCadastroRecepcao"
        ],
        "serviceFunction": "agendaClinica.meu_cadastro_recepcao.createOwnReceptionist",
        "contractPath": "l2/agendaClinica/web/contracts/meu_cadastro_recepcao.defs.ts",
        "contractInterface": "Meu_cadastro_recepcaoContracts"
      },
      {
        "route": "agendaClinica.meu_cadastro_recepcao.load",
        "kind": "query",
        "grantIds": [
          "consultarProprioCadastroRecepcao"
        ],
        "serviceFunction": "agendaClinica.meu_cadastro_recepcao.load",
        "contractPath": "l2/agendaClinica/web/contracts/meu_cadastro_recepcao.defs.ts",
        "contractInterface": "Meu_cadastro_recepcaoContracts"
      },
      {
        "route": "agendaClinica.meu_cadastro_recepcao.updateOwnReceptionist",
        "kind": "command",
        "grantIds": [
          "consultarProprioCadastroRecepcao"
        ],
        "serviceFunction": "agendaClinica.meu_cadastro_recepcao.updateOwnReceptionist",
        "contractPath": "l2/agendaClinica/web/contracts/meu_cadastro_recepcao.defs.ts",
        "contractInterface": "Meu_cadastro_recepcaoContracts"
      }
    ]
  }
} as const;

export default definition;
