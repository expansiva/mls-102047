/// <mls fileReference="_102047_/l1/inicio/layer_1_external/adapters/http/controllers/pessoas_organizacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "pessoas_organizacao",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/inicio/layer_2_application/requests/pessoas_organizacao.defs.ts",
    "_102047_/l1/inicio/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "pessoas_organizacao",
    "handlers": [
      {
        "route": "inicio.pessoas_organizacao.abrirPessoasOrganizacao",
        "kind": "query",
        "grantIds": [
          "responsavelPrepararEmpresa",
          "responsavelAcompanharPessoas",
          "responsavelMeuAcesso"
        ],
        "serviceFunction": "inicio.pessoas_organizacao.abrirPessoasOrganizacao",
        "contractPath": "l2/inicio/web/contracts/pessoas_organizacao.defs.ts",
        "contractInterface": "Pessoas_organizacaoContracts"
      },
      {
        "route": "inicio.pessoas_organizacao.buscarPessoas",
        "kind": "query",
        "grantIds": [
          "responsavelAcompanharPessoas",
          "responsavelMeuAcesso"
        ],
        "serviceFunction": "inicio.pessoas_organizacao.buscarPessoas",
        "contractPath": "l2/inicio/web/contracts/pessoas_organizacao.defs.ts",
        "contractInterface": "Pessoas_organizacaoContracts"
      },
      {
        "route": "inicio.pessoas_organizacao.obterPessoa",
        "kind": "query",
        "grantIds": [
          "responsavelAcompanharPessoas",
          "responsavelMeuAcesso"
        ],
        "serviceFunction": "inicio.pessoas_organizacao.obterPessoa",
        "contractPath": "l2/inicio/web/contracts/pessoas_organizacao.defs.ts",
        "contractInterface": "Pessoas_organizacaoContracts"
      }
    ]
  }
} as const;

export default definition;
