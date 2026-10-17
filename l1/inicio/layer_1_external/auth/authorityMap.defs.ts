/// <mls fileReference="_102047_/l1/inicio/layer_1_external/auth/authorityMap.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "authorityMap",
  "artifactId": "authorityMap",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "mapId": "authorityMap",
    "entries": [
      {
        "grantId": "pessoaCompletarMeuAcesso",
        "actorRef": "pessoaOrganizacao"
      },
      {
        "grantId": "pessoaMeuTelefone",
        "actorRef": "pessoaOrganizacao"
      },
      {
        "grantId": "pessoaVerEmpresa",
        "actorRef": "pessoaOrganizacao"
      },
      {
        "grantId": "responsavelAcompanharPessoas",
        "actorRef": "responsavel"
      },
      {
        "grantId": "responsavelMeuAcesso",
        "actorRef": "responsavel"
      },
      {
        "grantId": "responsavelMeuTelefone",
        "actorRef": "responsavel"
      },
      {
        "grantId": "responsavelPrepararEmpresa",
        "actorRef": "responsavel"
      }
    ]
  }
} as const;

export default definition;
