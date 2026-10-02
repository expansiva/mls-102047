/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/requests/meu_cadastro_profissional.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "meu_cadastro_profissional",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_2_application/usecases/createProfissional.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/listProfissional.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/updateProfissional.defs.ts"
  ],
  "data": {
    "pageId": "meu_cadastro_profissional",
    "requests": [
      {
        "route": "agendaClinica.meu_cadastro_profissional.load",
        "kind": "qry",
        "uses": [
          "listProfissional"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "profissionaisRecepcao",
            "entity": "Profissional",
            "fields": [
              "id",
              "version",
              "details.identification",
              "details.person"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "agendaClinica.meu_cadastro_profissional.persistProfessionalCreate",
        "kind": "cmd",
        "uses": [
          "createProfissional"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "profissional",
            "entity": "Profissional",
            "fields": [
              "id",
              "version",
              "details.identification.name",
              "details.identification.docType",
              "details.identification.docId",
              "details.identification.countryCode",
              "details.person.occupation"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "agendaClinica.meu_cadastro_profissional.persistProfessionalUpdate",
        "kind": "cmd",
        "uses": [
          "updateProfissional"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "profissional",
            "entity": "Profissional",
            "fields": [
              "id",
              "version",
              "details.identification.name",
              "details.identification.docType",
              "details.identification.docId",
              "details.identification.countryCode",
              "details.person.occupation"
            ]
          }
        ],
        "params": []
      }
    ]
  }
} as const;

export default definition;
