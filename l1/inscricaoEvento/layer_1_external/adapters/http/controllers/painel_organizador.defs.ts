/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/http/controllers/painel_organizador.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "painel_organizador",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/requests/painel_organizador.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "painel_organizador",
    "handlers": [
      {
        "route": "inscricaoEvento.painel_organizador.qryPainelOrganizador",
        "kind": "query",
        "grantIds": [
          "organizadorEventos"
        ],
        "serviceFunction": "inscricaoEvento.painel_organizador.qryPainelOrganizador",
        "contractPath": "l2/inscricaoEvento/web/contracts/painel_organizador.defs.ts",
        "contractInterface": "Painel_organizadorContracts"
      }
    ]
  }
} as const;

export default definition;
