/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/meu_cadastro_profissional.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "meu_cadastro_profissional",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/requests/meu_cadastro_profissional.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "meu_cadastro_profissional",
    "handlers": [
      {
        "route": "agendaClinica.meu_cadastro_profissional.load",
        "kind": "query",
        "grantIds": [
          "consultarProprioCadastroProfissional"
        ],
        "serviceFunction": "agendaClinica.meu_cadastro_profissional.load",
        "contractPath": "l2/agendaClinica/web/contracts/meu_cadastro_profissional.defs.ts",
        "contractInterface": "Meu_cadastro_profissionalContracts"
      },
      {
        "route": "agendaClinica.meu_cadastro_profissional.persistProfessionalCreate",
        "kind": "command",
        "grantIds": [
          "consultarProprioCadastroProfissional"
        ],
        "serviceFunction": "agendaClinica.meu_cadastro_profissional.persistProfessionalCreate",
        "contractPath": "l2/agendaClinica/web/contracts/meu_cadastro_profissional.defs.ts",
        "contractInterface": "Meu_cadastro_profissionalContracts"
      },
      {
        "route": "agendaClinica.meu_cadastro_profissional.persistProfessionalUpdate",
        "kind": "command",
        "grantIds": [
          "consultarProprioCadastroProfissional"
        ],
        "serviceFunction": "agendaClinica.meu_cadastro_profissional.persistProfessionalUpdate",
        "contractPath": "l2/agendaClinica/web/contracts/meu_cadastro_profissional.defs.ts",
        "contractInterface": "Meu_cadastro_profissionalContracts"
      }
    ]
  }
} as const;

export default definition;
