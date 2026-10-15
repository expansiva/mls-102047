/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/http/controllers/gestao_eventos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "gestao_eventos",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/requests/gestao_eventos.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "gestao_eventos",
    "handlers": [
      {
        "route": "inscricaoEvento.gestao_eventos.cmdPublicarEvento",
        "kind": "command",
        "grantIds": [
          "organizadorEventos"
        ],
        "serviceFunction": "inscricaoEvento.gestao_eventos.cmdPublicarEvento",
        "contractPath": "l2/inscricaoEvento/web/contracts/gestao_eventos.defs.ts",
        "contractInterface": "Gestao_eventosContracts"
      },
      {
        "route": "inscricaoEvento.gestao_eventos.cmdSalvarEvento",
        "kind": "command",
        "grantIds": [
          "organizadorEventos"
        ],
        "serviceFunction": "inscricaoEvento.gestao_eventos.cmdSalvarEvento",
        "contractPath": "l2/inscricaoEvento/web/contracts/gestao_eventos.defs.ts",
        "contractInterface": "Gestao_eventosContracts"
      },
      {
        "route": "inscricaoEvento.gestao_eventos.qryEventoPainel",
        "kind": "query",
        "grantIds": [
          "organizadorEventos",
          "organizadorInscritos"
        ],
        "serviceFunction": "inscricaoEvento.gestao_eventos.qryEventoPainel",
        "contractPath": "l2/inscricaoEvento/web/contracts/gestao_eventos.defs.ts",
        "contractInterface": "Gestao_eventosContracts"
      },
      {
        "route": "inscricaoEvento.gestao_eventos.qryEventos",
        "kind": "query",
        "grantIds": [
          "organizadorEventos"
        ],
        "serviceFunction": "inscricaoEvento.gestao_eventos.qryEventos",
        "contractPath": "l2/inscricaoEvento/web/contracts/gestao_eventos.defs.ts",
        "contractInterface": "Gestao_eventosContracts"
      },
      {
        "route": "inscricaoEvento.gestao_eventos.qryInscritosEvento",
        "kind": "query",
        "grantIds": [
          "organizadorInscritos"
        ],
        "serviceFunction": "inscricaoEvento.gestao_eventos.qryInscritosEvento",
        "contractPath": "l2/inscricaoEvento/web/contracts/gestao_eventos.defs.ts",
        "contractInterface": "Gestao_eventosContracts"
      }
    ]
  }
} as const;

export default definition;
