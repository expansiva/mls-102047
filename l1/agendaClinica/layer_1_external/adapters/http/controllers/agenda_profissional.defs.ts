/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/agenda_profissional.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "agenda_profissional",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/requests/agenda_profissional.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "agenda_profissional",
    "handlers": [
      {
        "route": "agendaClinica.agenda_profissional.load",
        "kind": "query",
        "grantIds": [
          "consultarPropriaAgenda",
          "consultarPacientesDaPropriaAgenda"
        ],
        "serviceFunction": "agendaClinica.agenda_profissional.load",
        "contractPath": "l2/agendaClinica/web/contracts/agenda_profissional.defs.ts",
        "contractInterface": "Agenda_profissionalContracts"
      },
      {
        "route": "agendaClinica.agenda_profissional.loadAgendaProfissional",
        "kind": "query",
        "grantIds": [
          "consultarPropriaAgenda"
        ],
        "serviceFunction": "agendaClinica.agenda_profissional.loadAgendaProfissional",
        "contractPath": "l2/agendaClinica/web/contracts/agenda_profissional.defs.ts",
        "contractInterface": "Agenda_profissionalContracts"
      },
      {
        "route": "agendaClinica.agenda_profissional.registrarAtendimento",
        "kind": "command",
        "grantIds": [
          "consultarPropriaAgenda"
        ],
        "serviceFunction": "agendaClinica.agenda_profissional.registrarAtendimento",
        "contractPath": "l2/agendaClinica/web/contracts/agenda_profissional.defs.ts",
        "contractInterface": "Agenda_profissionalContracts"
      }
    ]
  }
} as const;

export default definition;
