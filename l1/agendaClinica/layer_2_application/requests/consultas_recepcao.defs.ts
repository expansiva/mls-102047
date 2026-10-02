/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/requests/consultas_recepcao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "consultas_recepcao",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_2_application/usecases/confirmarConsulta.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/createConsulta.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/getConsulta.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/listConsulta.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/listPaciente.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/listProfissional.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/registrarFalta.defs.ts"
  ],
  "data": {
    "pageId": "consultas_recepcao",
    "requests": [
      {
        "route": "agendaClinica.consultas_recepcao.load",
        "kind": "qry",
        "uses": [
          "listConsulta",
          "listPaciente",
          "listProfissional"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "consultasRecepcao",
            "entity": "Consulta",
            "fields": [
              "id",
              "version",
              "pacienteId",
              "profissionalId",
              "scheduledAt",
              "status"
            ]
          },
          {
            "key": "pacientes",
            "entity": "Paciente",
            "fields": [
              "id",
              "details.identification"
            ]
          },
          {
            "key": "profissionaisRecepcao",
            "entity": "Profissional",
            "fields": [
              "id",
              "details.identification",
              "details.person"
            ]
          }
        ],
        "params": [
          {
            "name": "pacienteId",
            "target": "consultasRecepcao",
            "field": "pacienteId"
          },
          {
            "name": "page",
            "target": "consultasRecepcao",
            "pages": "listaConsultas"
          },
          {
            "name": "pageSize",
            "target": "consultasRecepcao",
            "pages": "listaConsultas"
          }
        ]
      },
      {
        "route": "agendaClinica.consultas_recepcao.loadConsultasRecepcao",
        "kind": "qry",
        "uses": [
          "listConsulta"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "consultasRecepcao",
            "entity": "Consulta",
            "fields": [
              "id",
              "version",
              "pacienteId",
              "profissionalId",
              "scheduledAt",
              "status"
            ]
          }
        ],
        "params": [
          {
            "name": "pacienteId",
            "target": "consultasRecepcao",
            "field": "pacienteId"
          },
          {
            "name": "page",
            "target": "consultasRecepcao",
            "pages": "listaConsultas"
          },
          {
            "name": "pageSize",
            "target": "consultasRecepcao",
            "pages": "listaConsultas"
          }
        ]
      },
      {
        "route": "agendaClinica.consultas_recepcao.loadConsulta",
        "kind": "qry",
        "uses": [
          "getConsulta"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "consulta",
            "entity": "Consulta",
            "fields": [
              "id",
              "version",
              "pacienteId",
              "profissionalId",
              "scheduledAt",
              "status"
            ]
          }
        ],
        "params": [
          {
            "name": "id",
            "target": "consulta",
            "field": "id"
          }
        ]
      },
      {
        "route": "agendaClinica.consultas_recepcao.registrarAgendamento",
        "kind": "cmd",
        "uses": [
          "createConsulta"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "consulta",
            "entity": "Consulta",
            "fields": [
              "id",
              "version",
              "pacienteId",
              "profissionalId",
              "scheduledAt"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "agendaClinica.consultas_recepcao.registrarConfirmacao",
        "kind": "cmd",
        "uses": [
          "confirmarConsulta"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "consulta",
            "entity": "Consulta",
            "fields": [
              "id",
              "version",
              "pacienteId",
              "profissionalId",
              "scheduledAt"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "agendaClinica.consultas_recepcao.registrarFalta",
        "kind": "cmd",
        "uses": [
          "registrarFalta"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "consulta",
            "entity": "Consulta",
            "fields": [
              "id",
              "version",
              "pacienteId",
              "profissionalId",
              "scheduledAt"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
