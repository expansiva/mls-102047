/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/http/controllers/eventos_abertos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "eventos_abertos",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/requests/eventos_abertos.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "eventos_abertos",
    "handlers": [
      {
        "route": "inscricaoEvento.eventos_abertos.inscreverEmEvento",
        "kind": "command",
        "grantIds": [
          "publicoMinhasInscricoes"
        ],
        "serviceFunction": "inscricaoEvento.eventos_abertos.inscreverEmEvento",
        "contractPath": "l2/inscricaoEvento/web/contracts/eventos_abertos.defs.ts",
        "contractInterface": "Eventos_abertosContracts"
      },
      {
        "route": "inscricaoEvento.eventos_abertos.listarEventosPublicados",
        "kind": "query",
        "grantIds": [
          "publicoMinhasInscricoes"
        ],
        "serviceFunction": "inscricaoEvento.eventos_abertos.listarEventosPublicados",
        "contractPath": "l2/inscricaoEvento/web/contracts/eventos_abertos.defs.ts",
        "contractInterface": "Eventos_abertosContracts"
      },
      {
        "route": "inscricaoEvento.eventos_abertos.obterEventoPublico",
        "kind": "query",
        "grantIds": [
          "publicoMinhasInscricoes"
        ],
        "serviceFunction": "inscricaoEvento.eventos_abertos.obterEventoPublico",
        "contractPath": "l2/inscricaoEvento/web/contracts/eventos_abertos.defs.ts",
        "contractInterface": "Eventos_abertosContracts"
      }
    ]
  }
} as const;

export default definition;
