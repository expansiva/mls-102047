/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/pacientes.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "pacientes",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/requests/pacientes.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "pacientes",
    "handlers": [
      {
        "route": "agendaClinica.pacientes.load",
        "kind": "query",
        "grantIds": [
          "cadastrarPacientes"
        ],
        "serviceFunction": "agendaClinica.pacientes.load",
        "contractPath": "l2/agendaClinica/web/contracts/pacientes.defs.ts",
        "contractInterface": "PacientesContracts"
      },
      {
        "route": "agendaClinica.pacientes.loadPaciente",
        "kind": "query",
        "grantIds": [
          "cadastrarPacientes"
        ],
        "serviceFunction": "agendaClinica.pacientes.loadPaciente",
        "contractPath": "l2/agendaClinica/web/contracts/pacientes.defs.ts",
        "contractInterface": "PacientesContracts"
      },
      {
        "route": "agendaClinica.pacientes.loadPacientes",
        "kind": "query",
        "grantIds": [
          "cadastrarPacientes"
        ],
        "serviceFunction": "agendaClinica.pacientes.loadPacientes",
        "contractPath": "l2/agendaClinica/web/contracts/pacientes.defs.ts",
        "contractInterface": "PacientesContracts"
      },
      {
        "route": "agendaClinica.pacientes.submitPatientCreate",
        "kind": "command",
        "grantIds": [
          "cadastrarPacientes"
        ],
        "serviceFunction": "agendaClinica.pacientes.submitPatientCreate",
        "contractPath": "l2/agendaClinica/web/contracts/pacientes.defs.ts",
        "contractInterface": "PacientesContracts"
      }
    ]
  }
} as const;

export default definition;
