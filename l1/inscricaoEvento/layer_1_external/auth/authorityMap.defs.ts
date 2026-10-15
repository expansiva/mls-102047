/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/auth/authorityMap.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "authorityMap",
  "artifactId": "authorityMap",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "mapId": "authorityMap",
    "entries": [
      {
        "grantId": "organizadorEventos",
        "actorRef": "organizador"
      },
      {
        "grantId": "organizadorInscritos",
        "actorRef": "organizador"
      },
      {
        "grantId": "publicoMeuCadastro",
        "actorRef": "publico"
      },
      {
        "grantId": "publicoMinhasInscricoes",
        "actorRef": "publico"
      }
    ]
  }
} as const;

export default definition;
