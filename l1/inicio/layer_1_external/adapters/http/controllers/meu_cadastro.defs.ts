/// <mls fileReference="_102047_/l1/inicio/layer_1_external/adapters/http/controllers/meu_cadastro.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "meu_cadastro",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/inicio/layer_2_application/requests/meu_cadastro.defs.ts",
    "_102047_/l1/inicio/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "meu_cadastro",
    "handlers": [
      {
        "route": "inicio.meu_cadastro.qryMeuCadastro",
        "kind": "query",
        "grantIds": [
          "responsavelAcompanharPessoas",
          "responsavelMeuAcesso",
          "pessoaCompletarMeuAcesso",
          "responsavelPrepararEmpresa",
          "pessoaVerEmpresa"
        ],
        "serviceFunction": "inicio.meu_cadastro.qryMeuCadastro",
        "contractPath": "l2/inicio/web/contracts/meu_cadastro.defs.ts",
        "contractInterface": "Meu_cadastroContracts"
      },
      {
        "route": "inicio.meu_cadastro.salvarMeusDados",
        "kind": "command",
        "grantIds": [
          "responsavelAcompanharPessoas",
          "responsavelMeuAcesso",
          "pessoaCompletarMeuAcesso",
          "responsavelPrepararEmpresa",
          "pessoaVerEmpresa"
        ],
        "serviceFunction": "inicio.meu_cadastro.salvarMeusDados",
        "contractPath": "l2/inicio/web/contracts/meu_cadastro.defs.ts",
        "contractInterface": "Meu_cadastroContracts"
      }
    ]
  }
} as const;

export default definition;
