export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "controleEstoque",
  "pageId": "movimentacoes_estoque",
  "pageName": "Movimentações de estoque",
  "baseClassName": "MovimentacoesEstoqueShared",
  "routePattern": "/movimentacoes_estoque",
  "contractRef": {
    "defPath": "l2/controleEstoque/web/contracts/movimentacoes_estoque.defs.ts",
    "calls": [
      {
        "actionId": "createMovimentacaoEstoque",
        "routeConst": "createMovimentacaoEstoqueRoute",
        "inputType": "CreateMovimentacaoEstoqueInput",
        "outputType": "CreateMovimentacaoEstoqueOutput"
      },
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
      "stateKey": "ui.movimentacoes_estoque.pageStatus",
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
      "stateKey": "ui.movimentacoes_estoque.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "produto",
        "createMovimentacaoEstoque"
      ]
    },
    {
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.produtoId",
      "name": "produtoId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueInput.MovimentacaoEstoque.produtoId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.occurredAt",
      "name": "occurredAt",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueInput.MovimentacaoEstoque.occurredAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueInput.MovimentacaoEstoque.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_movementType",
      "name": "movementType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueInput.MovimentacaoEstoque.details.movementType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_quantity",
      "name": "quantity",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueInput.MovimentacaoEstoque.details.quantity",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.status",
      "name": "createMovimentacaoEstoqueStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.error",
      "name": "createMovimentacaoEstoqueError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.result",
      "name": "createMovimentacaoEstoqueResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.id",
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
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.produtoId",
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
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.occurredAt",
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
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.page",
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
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.status",
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
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.error",
      "name": "listMovimentacaoEstoqueError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.result",
      "name": "listMovimentacaoEstoqueResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.id",
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
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details",
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
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification",
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
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification_subtype",
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
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification_name",
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
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification_status",
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
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification_countryCode",
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
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.page",
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
      "stateKey": "ui.movimentacoes_estoque.listProduto.status",
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
      "stateKey": "ui.movimentacoes_estoque.listProduto.error",
      "name": "listProdutoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProduto"
    },
    {
      "stateKey": "ui.movimentacoes_estoque.listProduto.result",
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
      "actionId": "setCreateMovimentacaoEstoqueProdutoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.produtoId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.produtoId"
    },
    {
      "actionId": "setCreateMovimentacaoEstoqueOccurredAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.occurredAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.occurredAt"
    },
    {
      "actionId": "setCreateMovimentacaoEstoqueDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details"
    },
    {
      "actionId": "setCreateMovimentacaoEstoqueDetailsMovementType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_movementType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_movementType"
    },
    {
      "actionId": "setCreateMovimentacaoEstoqueDetailsQuantity",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_quantity"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_quantity"
    },
    {
      "actionId": "createMovimentacaoEstoque",
      "kind": "command",
      "commandRef": "createMovimentacaoEstoque",
      "routeRef": "createMovimentacaoEstoqueRoute",
      "inputTypeRef": "CreateMovimentacaoEstoqueInput",
      "outputTypeRef": "CreateMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.occurredAt",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_movementType",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_quantity"
      ],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.result"
      ],
      "statusStateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.status",
      "errorStateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.error",
      "refreshActionIds": [
        "listMovimentacaoEstoque",
        "listProduto"
      ]
    },
    {
      "actionId": "setListMovimentacaoEstoqueId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.id"
    },
    {
      "actionId": "setListMovimentacaoEstoqueProdutoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.produtoId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.produtoId"
    },
    {
      "actionId": "setListMovimentacaoEstoqueOccurredAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.occurredAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.occurredAt"
    },
    {
      "actionId": "setListMovimentacaoEstoquePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.page"
    },
    {
      "actionId": "listMovimentacaoEstoque",
      "kind": "query",
      "commandRef": "listMovimentacaoEstoque",
      "routeRef": "listMovimentacaoEstoqueRoute",
      "inputTypeRef": "ListMovimentacaoEstoqueInput",
      "outputTypeRef": "ListMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.id",
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.occurredAt",
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.page"
      ],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.result"
      ],
      "statusStateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.status",
      "errorStateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListProdutoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.id"
    },
    {
      "actionId": "setListProdutoDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details"
    },
    {
      "actionId": "setListProdutoDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification_subtype"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification_name"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification_status"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.details_identification_countryCode"
    },
    {
      "actionId": "setListProdutoPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes_estoque.listProduto.input.page"
    },
    {
      "actionId": "listProduto",
      "kind": "query",
      "commandRef": "listProduto",
      "routeRef": "listProdutoRoute",
      "inputTypeRef": "ListProdutoInput",
      "outputTypeRef": "ListProdutoOutput",
      "inputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.id",
        "ui.movimentacoes_estoque.listProduto.input.details",
        "ui.movimentacoes_estoque.listProduto.input.details_identification",
        "ui.movimentacoes_estoque.listProduto.input.details_identification_subtype",
        "ui.movimentacoes_estoque.listProduto.input.details_identification_name",
        "ui.movimentacoes_estoque.listProduto.input.details_identification_status",
        "ui.movimentacoes_estoque.listProduto.input.details_identification_countryCode",
        "ui.movimentacoes_estoque.listProduto.input.page"
      ],
      "outputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.result"
      ],
      "statusStateKey": "ui.movimentacoes_estoque.listProduto.status",
      "errorStateKey": "ui.movimentacoes_estoque.listProduto.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listMovimentacaoEstoque",
      "preconditions": [
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.id",
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.occurredAt"
      ]
    },
    {
      "value": "produto",
      "kind": "detail",
      "actionId": "listProduto",
      "preconditions": [
        "ui.movimentacoes_estoque.listProduto.input.id",
        "ui.movimentacoes_estoque.listProduto.input.details"
      ]
    },
    {
      "value": "createMovimentacaoEstoque",
      "kind": "command",
      "actionId": "createMovimentacaoEstoque",
      "preconditions": [
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.occurredAt",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_movementType",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_quantity"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "createMovimentacaoEstoque",
      "kind": "command",
      "routeRef": "createMovimentacaoEstoqueRoute",
      "inputTypeRef": "CreateMovimentacaoEstoqueInput",
      "outputTypeRef": "CreateMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.occurredAt",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_movementType",
        "ui.movimentacoes_estoque.createMovimentacaoEstoque.input.details_quantity"
      ],
      "resultStateKey": "ui.movimentacoes_estoque.createMovimentacaoEstoque.result"
    },
    {
      "actionId": "listMovimentacaoEstoque",
      "kind": "query",
      "routeRef": "listMovimentacaoEstoqueRoute",
      "inputTypeRef": "ListMovimentacaoEstoqueInput",
      "outputTypeRef": "ListMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.id",
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.occurredAt",
        "ui.movimentacoes_estoque.listMovimentacaoEstoque.input.page"
      ],
      "resultStateKey": "ui.movimentacoes_estoque.listMovimentacaoEstoque.result"
    },
    {
      "actionId": "listProduto",
      "kind": "query",
      "routeRef": "listProdutoRoute",
      "inputTypeRef": "ListProdutoInput",
      "outputTypeRef": "ListProdutoOutput",
      "inputStateKeys": [
        "ui.movimentacoes_estoque.listProduto.input.id",
        "ui.movimentacoes_estoque.listProduto.input.details",
        "ui.movimentacoes_estoque.listProduto.input.details_identification",
        "ui.movimentacoes_estoque.listProduto.input.details_identification_subtype",
        "ui.movimentacoes_estoque.listProduto.input.details_identification_name",
        "ui.movimentacoes_estoque.listProduto.input.details_identification_status",
        "ui.movimentacoes_estoque.listProduto.input.details_identification_countryCode",
        "ui.movimentacoes_estoque.listProduto.input.page"
      ],
      "resultStateKey": "ui.movimentacoes_estoque.listProduto.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "movimentacoes_estoque__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/controleEstoque/web/shared/movimentacoes_estoque.defs.ts",
    "outputPath": "l2/controleEstoque/web/shared/movimentacoes_estoque.ts",
    "dependsFiles": [
      "l2/controleEstoque/web/contracts/movimentacoes_estoque.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
