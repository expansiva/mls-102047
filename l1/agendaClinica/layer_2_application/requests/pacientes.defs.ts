/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/requests/pacientes.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "pacientes",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_2_application/usecases/createPaciente.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/getPaciente.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/listPaciente.defs.ts"
  ],
  "data": {
    "pageId": "pacientes",
    "requests": [
      {
        "route": "agendaClinica.pacientes.load",
        "kind": "qry",
        "uses": [
          "listPaciente"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "pacientes",
            "entity": "Paciente",
            "fields": [
              "id",
              "details.identification.name",
              "details.identification.docType",
              "details.identification.docId",
              "details.identification.status",
              "details.identification.countryCode",
              "details.base.contacts",
              "details.person.privacyConsent"
            ]
          }
        ],
        "params": [
          {
            "name": "search",
            "target": "pacientes",
            "field": "details.identification.name"
          },
          {
            "name": "page",
            "target": "pacientes",
            "pages": "patientList"
          },
          {
            "name": "pageSize",
            "target": "pacientes",
            "pages": "patientList"
          }
        ]
      },
      {
        "route": "agendaClinica.pacientes.loadPacientes",
        "kind": "qry",
        "uses": [
          "listPaciente"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "pacientes",
            "entity": "Paciente",
            "fields": [
              "id",
              "details.identification.name",
              "details.identification.docType",
              "details.identification.docId",
              "details.identification.status",
              "details.identification.countryCode",
              "details.base.contacts",
              "details.person.privacyConsent"
            ]
          }
        ],
        "params": [
          {
            "name": "search",
            "target": "pacientes",
            "field": "details.identification.name"
          },
          {
            "name": "page",
            "target": "pacientes",
            "pages": "patientList"
          },
          {
            "name": "pageSize",
            "target": "pacientes",
            "pages": "patientList"
          }
        ]
      },
      {
        "route": "agendaClinica.pacientes.loadPaciente",
        "kind": "qry",
        "uses": [
          "getPaciente"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "paciente",
            "entity": "Paciente",
            "fields": [
              "id",
              "details.identification.name",
              "details.identification.status",
              "details.identification.docType",
              "details.identification.docId",
              "details.identification.countryCode",
              "details.base.contacts",
              "details.person.privacyConsent"
            ]
          }
        ],
        "params": [
          {
            "name": "id",
            "target": "paciente",
            "field": "id"
          }
        ]
      },
      {
        "route": "agendaClinica.pacientes.submitPatientCreate",
        "kind": "cmd",
        "uses": [
          "createPaciente"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "paciente",
            "entity": "Paciente",
            "fields": [
              "id",
              "details.identification.name",
              "details.identification.docType",
              "details.identification.docId",
              "details.identification.countryCode",
              "details.person.privacyConsent"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
