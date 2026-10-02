/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/requests/meu_cadastro_recepcao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "meu_cadastro_recepcao",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_2_application/usecases/createRecepcionista.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/listRecepcionista.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/usecases/updateRecepcionista.defs.ts"
  ],
  "data": {
    "pageId": "meu_cadastro_recepcao",
    "requests": [
      {
        "route": "agendaClinica.meu_cadastro_recepcao.load",
        "kind": "qry",
        "uses": [
          "listRecepcionista"
        ],
        "transaction": "none",
        "outputs": [
          {
            "key": "recepcionista",
            "entity": "Recepcionista",
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
        "route": "agendaClinica.meu_cadastro_recepcao.createOwnReceptionist",
        "kind": "cmd",
        "uses": [
          "createRecepcionista"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "recepcionista",
            "entity": "Recepcionista",
            "fields": [
              "id",
              "version",
              "details.identification.name",
              "details.identification.docType",
              "details.identification.docId",
              "details.identification.countryCode",
              "details.person.privacyConsent"
            ]
          }
        ],
        "params": []
      },
      {
        "route": "agendaClinica.meu_cadastro_recepcao.updateOwnReceptionist",
        "kind": "cmd",
        "uses": [
          "updateRecepcionista"
        ],
        "transaction": "single",
        "outputs": [
          {
            "key": "recepcionista",
            "entity": "Recepcionista",
            "fields": [
              "id",
              "version",
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
