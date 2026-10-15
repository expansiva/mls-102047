/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/http/controllers/minhas_inscricoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "minhas_inscricoes",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/requests/minhas_inscricoes.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "minhas_inscricoes",
    "handlers": [
      {
        "route": "inscricaoEvento.minhas_inscricoes.buscarInscricoes",
        "kind": "query",
        "grantIds": [
          "publicoMinhasInscricoes"
        ],
        "serviceFunction": "inscricaoEvento.minhas_inscricoes.buscarInscricoes",
        "contractPath": "l2/inscricaoEvento/web/contracts/minhas_inscricoes.defs.ts",
        "contractInterface": "Minhas_inscricoesContracts"
      },
      {
        "route": "inscricaoEvento.minhas_inscricoes.cancelarInscricao",
        "kind": "command",
        "grantIds": [
          "publicoMinhasInscricoes"
        ],
        "serviceFunction": "inscricaoEvento.minhas_inscricoes.cancelarInscricao",
        "contractPath": "l2/inscricaoEvento/web/contracts/minhas_inscricoes.defs.ts",
        "contractInterface": "Minhas_inscricoesContracts"
      },
      {
        "route": "inscricaoEvento.minhas_inscricoes.carregarMinhasInscricoes",
        "kind": "query",
        "grantIds": [
          "publicoMinhasInscricoes"
        ],
        "serviceFunction": "inscricaoEvento.minhas_inscricoes.carregarMinhasInscricoes",
        "contractPath": "l2/inscricaoEvento/web/contracts/minhas_inscricoes.defs.ts",
        "contractInterface": "Minhas_inscricoesContracts"
      },
      {
        "route": "inscricaoEvento.minhas_inscricoes.obterInscricao",
        "kind": "query",
        "grantIds": [
          "publicoMinhasInscricoes"
        ],
        "serviceFunction": "inscricaoEvento.minhas_inscricoes.obterInscricao",
        "contractPath": "l2/inscricaoEvento/web/contracts/minhas_inscricoes.defs.ts",
        "contractInterface": "Minhas_inscricoesContracts"
      }
    ]
  }
} as const;

export default definition;
