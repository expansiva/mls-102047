export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "controleEstoque",
  "pageId": "controle_estoque_inicio",
  "pageName": "Visão geral do estoque",
  "baseClassName": "ControleEstoqueInicioShared",
  "routePattern": "/controle_estoque_inicio",
  "contractRef": {
    "defPath": "l2/controleEstoque/web/contracts/controle_estoque_inicio.defs.ts",
    "calls": [
      {
        "actionId": "listMovimentacaoEstoque",
        "routeConst": "listMovimentacaoEstoqueRoute",
        "inputType": "ListMovimentacaoEstoqueInput",
        "outputType": "ListMovimentacaoEstoqueOutput"
      },
      {
        "actionId": "listProduto",
        "routeConst": "listProdutoRoute",
        "inputType": "ListProdutoInput",
        "outputType": "ListProdutoOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.controle_estoque_inicio.pageStatus",
      "name": "pageStatus",
      "kind": "pageStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "empty",
        "success",
        "error"
      ]
    },
    {
      "stateKey": "ui.controle_estoque_inicio.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "consultarProdutoAvisado"
      ]
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueInput.MovimentacaoEstoque.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.produtoId",
      "name": "produtoId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueInput.MovimentacaoEstoque.produtoId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.occurredAt",
      "name": "occurredAt",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueInput.MovimentacaoEstoque.occurredAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueInput.MovimentacaoEstoque.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.status",
      "name": "listMovimentacaoEstoqueStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.error",
      "name": "listMovimentacaoEstoqueError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.result",
      "name": "listMovimentacaoEstoqueResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.Produto.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.Produto.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.Produto.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification_subtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.Produto.details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.Produto.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification_status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.Produto.details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.Produto.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.Produto.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.status",
      "name": "listProdutoStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listProduto"
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.error",
      "name": "listProdutoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProduto"
    },
    {
      "stateKey": "ui.controle_estoque_inicio.listProduto.result",
      "name": "listProdutoResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listProduto",
      "contractRef": "ListProdutoOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setListMovimentacaoEstoqueId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.id"
    },
    {
      "actionId": "setListMovimentacaoEstoqueProdutoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.produtoId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.produtoId"
    },
    {
      "actionId": "setListMovimentacaoEstoqueOccurredAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.occurredAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.occurredAt"
    },
    {
      "actionId": "setListMovimentacaoEstoquePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.page"
    },
    {
      "actionId": "listMovimentacaoEstoque",
      "kind": "query",
      "commandRef": "listMovimentacaoEstoque",
      "routeRef": "listMovimentacaoEstoqueRoute",
      "inputTypeRef": "ListMovimentacaoEstoqueInput",
      "outputTypeRef": "ListMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.id",
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.produtoId",
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.occurredAt",
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.page"
      ],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.result"
      ],
      "statusStateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.status",
      "errorStateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListProdutoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.id"
    },
    {
      "actionId": "setListProdutoDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details"
    },
    {
      "actionId": "setListProdutoDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification_subtype"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification_name"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification_status"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.details_identification_countryCode"
    },
    {
      "actionId": "setListProdutoPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.controle_estoque_inicio.listProduto.input.page"
    },
    {
      "actionId": "listProduto",
      "kind": "query",
      "commandRef": "listProduto",
      "routeRef": "listProdutoRoute",
      "inputTypeRef": "ListProdutoInput",
      "outputTypeRef": "ListProdutoOutput",
      "inputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.id",
        "ui.controle_estoque_inicio.listProduto.input.details",
        "ui.controle_estoque_inicio.listProduto.input.details_identification",
        "ui.controle_estoque_inicio.listProduto.input.details_identification_subtype",
        "ui.controle_estoque_inicio.listProduto.input.details_identification_name",
        "ui.controle_estoque_inicio.listProduto.input.details_identification_status",
        "ui.controle_estoque_inicio.listProduto.input.details_identification_countryCode",
        "ui.controle_estoque_inicio.listProduto.input.page"
      ],
      "outputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.result"
      ],
      "statusStateKey": "ui.controle_estoque_inicio.listProduto.status",
      "errorStateKey": "ui.controle_estoque_inicio.listProduto.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listMovimentacaoEstoque",
      "preconditions": [
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.id",
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.produtoId",
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.occurredAt"
      ]
    },
    {
      "value": "consultarProdutoAvisado",
      "kind": "detail",
      "actionId": "listProduto",
      "preconditions": [
        "ui.controle_estoque_inicio.listProduto.input.id",
        "ui.controle_estoque_inicio.listProduto.input.details"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "listMovimentacaoEstoque",
      "kind": "query",
      "routeRef": "listMovimentacaoEstoqueRoute",
      "inputTypeRef": "ListMovimentacaoEstoqueInput",
      "outputTypeRef": "ListMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.id",
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.produtoId",
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.occurredAt",
        "ui.controle_estoque_inicio.listMovimentacaoEstoque.input.page"
      ],
      "resultStateKey": "ui.controle_estoque_inicio.listMovimentacaoEstoque.result"
    },
    {
      "actionId": "listProduto",
      "kind": "query",
      "routeRef": "listProdutoRoute",
      "inputTypeRef": "ListProdutoInput",
      "outputTypeRef": "ListProdutoOutput",
      "inputStateKeys": [
        "ui.controle_estoque_inicio.listProduto.input.id",
        "ui.controle_estoque_inicio.listProduto.input.details",
        "ui.controle_estoque_inicio.listProduto.input.details_identification",
        "ui.controle_estoque_inicio.listProduto.input.details_identification_subtype",
        "ui.controle_estoque_inicio.listProduto.input.details_identification_name",
        "ui.controle_estoque_inicio.listProduto.input.details_identification_status",
        "ui.controle_estoque_inicio.listProduto.input.details_identification_countryCode",
        "ui.controle_estoque_inicio.listProduto.input.page"
      ],
      "resultStateKey": "ui.controle_estoque_inicio.listProduto.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "controle_estoque_inicio__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/controleEstoque/web/shared/controle_estoque_inicio.defs.ts",
    "outputPath": "l2/controleEstoque/web/shared/controle_estoque_inicio.ts",
    "dependsFiles": [
      "l2/controleEstoque/web/contracts/controle_estoque_inicio.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
