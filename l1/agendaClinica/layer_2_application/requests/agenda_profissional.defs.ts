/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/requests/agenda_profissional.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "agenda_profissional",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_2_application/usecases/listConsulta.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/listPaciente.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/registrarAtendimento.defs.ts"
  ],
  "data": {
    "pageId": "agenda_profissional",
    "requests": [
      {
        "route": "agendaClinica.agenda_profissional.load",
        "kind": "qry",
        "uses": [
          "listConsulta",
          "listPaciente"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "agendaProfissional",
            "entity": "Consulta",
            "fields": [
              "id",
              "version",
              "scheduledAt",
              "status",
              "pacienteId",
              "details.attendanceNote"
            ]
          },
          {
            "key": "pacientes",
            "entity": "Paciente",
            "fields": [
              "id",
              "details.identification.name",
              "details.identification.status"
            ]
          }
        ],
        "params": [
          {
            "name": "pacienteId",
            "target": "agendaProfissional",
            "field": "pacienteId"
          },
          {
            "name": "page",
            "target": "agendaProfissional",
            "pages": "consultasDoDia"
          },
          {
            "name": "pageSize",
            "target": "agendaProfissional",
            "pages": "consultasDoDia"
          }
        ]
      },
      {
        "route": "agendaClinica.agenda_profissional.loadAgendaProfissional",
        "kind": "qry",
        "uses": [
          "listConsulta"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "agendaProfissional",
            "entity": "Consulta",
            "fields": [
              "id",
              "version",
              "scheduledAt",
              "status",
              "pacienteId",
              "details.attendanceNote"
            ]
          }
        ],
        "params": [
          {
            "name": "pacienteId",
            "target": "agendaProfissional",
            "field": "pacienteId"
          },
          {
            "name": "page",
            "target": "agendaProfissional",
            "pages": "consultasDoDia"
          },
          {
            "name": "pageSize",
            "target": "agendaProfissional",
            "pages": "consultasDoDia"
          }
        ]
      },
      {
        "route": "agendaClinica.agenda_profissional.registrarAtendimento",
        "kind": "cmd",
        "uses": [
          "registrarAtendimento"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "consulta",
            "entity": "Consulta",
            "fields": [
              "id",
              "version",
              "details.attendanceNote"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
