/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "produtos",
  "moduleName": "controleEstoque",
  "status": "generated",
  "dependencies": [
    "_102047_/l1/controleEstoque/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/controleEstoque/layer_2_application/scope/accessScope.defs.ts",
    "_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.defs.ts",
    "_102047_/l1/controleEstoque/layer_2_application/usecases/createProduto.defs.ts",
    "_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.defs.ts",
    "_102047_/l1/controleEstoque/layer_2_application/usecases/listProduto.defs.ts"
  ],
  "data": {
    "pageId": "produtos",
    "handlers": [
      {
        "route": "controleEstoque.produtos.cmdCreateMovimentacaoEstoque",
        "kind": "command",
        "usecaseId": "createMovimentacaoEstoque",
        "grantIds": [
          "gerenciarEstoque"
        ]
      },
      {
        "route": "controleEstoque.produtos.cmdCreateProduto",
        "kind": "command",
        "usecaseId": "createProduto",
        "grantIds": [
          "gerenciarEstoque"
        ]
      },
      {
        "route": "controleEstoque.produtos.qryListMovimentacaoEstoque",
        "kind": "query",
        "usecaseId": "listMovimentacaoEstoque",
        "grantIds": [
          "gerenciarEstoque"
        ]
      },
      {
        "route": "controleEstoque.produtos.qryListProduto",
        "kind": "query",
        "usecaseId": "listProduto",
        "grantIds": [
          "gerenciarEstoque"
        ]
      }
    ]
  }
} as const;

export default definition;
