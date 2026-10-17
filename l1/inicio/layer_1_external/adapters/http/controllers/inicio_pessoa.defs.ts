/// <mls fileReference="_102047_/l1/inicio/layer_1_external/adapters/http/controllers/inicio_pessoa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "inicio_pessoa",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/inicio/layer_2_application/requests/inicio_pessoa.defs.ts",
    "_102047_/l1/inicio/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "inicio_pessoa",
    "handlers": [
      {
        "route": "inicio.inicio_pessoa.qryInicioPessoa",
        "kind": "query",
        "grantIds": [
          "pessoaCompletarMeuAcesso",
          "pessoaVerEmpresa"
        ],
        "serviceFunction": "inicio.inicio_pessoa.qryInicioPessoa",
        "contractPath": "l2/inicio/web/contracts/inicio_pessoa.defs.ts",
        "contractInterface": "Inicio_pessoaContracts"
      }
    ]
  }
} as const;

export default definition;
