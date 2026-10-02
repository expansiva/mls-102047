/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/requests/profissionais_recepcao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "profissionais_recepcao",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_2_application/usecases/listProfissional.defs.ts"
  ],
  "data": {
    "pageId": "profissionais_recepcao",
    "requests": [
      {
        "route": "agendaClinica.profissionais_recepcao.load",
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
              "details.identification",
              "details.person"
            ]
          }
        ],
        "params": [
          {
            "name": "search",
            "target": "profissionaisRecepcao",
            "field": "details.identification.name"
          },
          {
            "name": "page",
            "target": "profissionaisRecepcao",
            "pages": "listaProfissionais"
          },
          {
            "name": "pageSize",
            "target": "profissionaisRecepcao",
            "pages": "listaProfissionais"
          }
        ]
      },
      {
        "route": "agendaClinica.profissionais_recepcao.loadProfissionaisRecepcao",
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
              "details.identification",
              "details.person"
            ]
          }
        ],
        "params": [
          {
            "name": "search",
            "target": "profissionaisRecepcao",
            "field": "details.identification.name"
          },
          {
            "name": "page",
            "target": "profissionaisRecepcao",
            "pages": "listaProfissionais"
          },
          {
            "name": "pageSize",
            "target": "profissionaisRecepcao",
            "pages": "listaProfissionais"
          }
        ]
      }
    ]
  }
} as const;

export default definition;
