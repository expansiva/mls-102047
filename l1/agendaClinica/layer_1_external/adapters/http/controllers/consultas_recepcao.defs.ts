/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/consultas_recepcao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "consultas_recepcao",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/requests/consultas_recepcao.defs.ts",
    "_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "consultas_recepcao",
    "handlers": [
      {
        "route": "agendaClinica.consultas_recepcao.load",
        "kind": "query",
        "grantIds": [
          "organizarAgenda",
          "cadastrarPacientes",
          "consultarProfissionaisParaAgenda"
        ],
        "serviceFunction": "agendaClinica.consultas_recepcao.load",
        "contractPath": "l2/agendaClinica/web/contracts/consultas_recepcao.defs.ts",
        "contractInterface": "Consultas_recepcaoContracts"
      },
      {
        "route": "agendaClinica.consultas_recepcao.loadConsulta",
        "kind": "query",
        "grantIds": [
          "organizarAgenda"
        ],
        "serviceFunction": "agendaClinica.consultas_recepcao.loadConsulta",
        "contractPath": "l2/agendaClinica/web/contracts/consultas_recepcao.defs.ts",
        "contractInterface": "Consultas_recepcaoContracts"
      },
      {
        "route": "agendaClinica.consultas_recepcao.loadConsultasRecepcao",
        "kind": "query",
        "grantIds": [
          "organizarAgenda"
        ],
        "serviceFunction": "agendaClinica.consultas_recepcao.loadConsultasRecepcao",
        "contractPath": "l2/agendaClinica/web/contracts/consultas_recepcao.defs.ts",
        "contractInterface": "Consultas_recepcaoContracts"
      },
      {
        "route": "agendaClinica.consultas_recepcao.registrarAgendamento",
        "kind": "command",
        "grantIds": [
          "organizarAgenda"
        ],
        "serviceFunction": "agendaClinica.consultas_recepcao.registrarAgendamento",
        "contractPath": "l2/agendaClinica/web/contracts/consultas_recepcao.defs.ts",
        "contractInterface": "Consultas_recepcaoContracts"
      },
      {
        "route": "agendaClinica.consultas_recepcao.registrarConfirmacao",
        "kind": "command",
        "grantIds": [
          "organizarAgenda"
        ],
        "serviceFunction": "agendaClinica.consultas_recepcao.registrarConfirmacao",
        "contractPath": "l2/agendaClinica/web/contracts/consultas_recepcao.defs.ts",
        "contractInterface": "Consultas_recepcaoContracts"
      },
      {
        "route": "agendaClinica.consultas_recepcao.registrarFalta",
        "kind": "command",
        "grantIds": [
          "organizarAgenda"
        ],
        "serviceFunction": "agendaClinica.consultas_recepcao.registrarFalta",
        "contractPath": "l2/agendaClinica/web/contracts/consultas_recepcao.defs.ts",
        "contractInterface": "Consultas_recepcaoContracts"
      }
    ]
  }
} as const;

export default definition;
