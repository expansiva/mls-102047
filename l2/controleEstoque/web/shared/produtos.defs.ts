export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "controleEstoque",
  "pageId": "produtos",
  "pageName": "Produtos",
  "baseClassName": "ProdutosShared",
  "routePattern": "/produtos",
  "contractRef": {
    "defPath": "l2/controleEstoque/web/contracts/produtos.defs.ts",
    "calls": [
      {
        "actionId": "createMovimentacaoEstoque",
        "routeConst": "createMovimentacaoEstoqueRoute",
        "inputType": "CreateMovimentacaoEstoqueInput",
        "outputType": "CreateMovimentacaoEstoqueOutput"
      },
      {
        "actionId": "createProduto",
        "routeConst": "createProdutoRoute",
        "inputType": "CreateProdutoInput",
        "outputType": "CreateProdutoOutput"
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
      "stateKey": "ui.produtos.pageStatus",
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
      "stateKey": "ui.produtos.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "listMovimentacaoEstoque",
        "createMovimentacaoEstoque",
        "createProduto"
      ]
    },
    {
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.produtoId",
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
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.occurredAt",
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
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details",
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
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details_movementType",
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
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details_quantity",
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
      "stateKey": "ui.produtos.createMovimentacaoEstoque.status",
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
      "stateKey": "ui.produtos.createMovimentacaoEstoque.error",
      "name": "createMovimentacaoEstoqueError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.produtos.createMovimentacaoEstoque.result",
      "name": "createMovimentacaoEstoqueResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.Produto.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.Produto.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.Produto.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.Produto.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details_product",
      "name": "product",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.Produto.details.product",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details_product_unitOfMeasure",
      "name": "unitOfMeasure",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.Produto.details.product.unitOfMeasure",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details_controleEstoque",
      "name": "controleEstoque",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.Produto.details.controleEstoque",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details_controleEstoque_minimumStock",
      "name": "minimumStock",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.Produto.details.controleEstoque.minimumStock",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.produtos.createProduto.status",
      "name": "createProdutoStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createProduto"
    },
    {
      "stateKey": "ui.produtos.createProduto.error",
      "name": "createProdutoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createProduto"
    },
    {
      "stateKey": "ui.produtos.createProduto.result",
      "name": "createProdutoResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.id",
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
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.produtoId",
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
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.occurredAt",
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
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.page",
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
      "stateKey": "ui.produtos.listMovimentacaoEstoque.status",
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
      "stateKey": "ui.produtos.listMovimentacaoEstoque.error",
      "name": "listMovimentacaoEstoqueError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.produtos.listMovimentacaoEstoque.result",
      "name": "listMovimentacaoEstoqueResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.produtos.listProduto.input.id",
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
      "stateKey": "ui.produtos.listProduto.input.details",
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
      "stateKey": "ui.produtos.listProduto.input.details_identification",
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
      "stateKey": "ui.produtos.listProduto.input.details_identification_subtype",
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
      "stateKey": "ui.produtos.listProduto.input.details_identification_name",
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
      "stateKey": "ui.produtos.listProduto.input.details_identification_status",
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
      "stateKey": "ui.produtos.listProduto.input.details_identification_countryCode",
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
      "stateKey": "ui.produtos.listProduto.input.page",
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
      "stateKey": "ui.produtos.listProduto.status",
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
      "stateKey": "ui.produtos.listProduto.error",
      "name": "listProdutoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProduto"
    },
    {
      "stateKey": "ui.produtos.listProduto.result",
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
        "ui.produtos.createMovimentacaoEstoque.input.produtoId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.produtoId"
    },
    {
      "actionId": "setCreateMovimentacaoEstoqueOccurredAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.occurredAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.occurredAt"
    },
    {
      "actionId": "setCreateMovimentacaoEstoqueDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details"
    },
    {
      "actionId": "setCreateMovimentacaoEstoqueDetailsMovementType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.details_movementType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details_movementType"
    },
    {
      "actionId": "setCreateMovimentacaoEstoqueDetailsQuantity",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.details_quantity"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details_quantity"
    },
    {
      "actionId": "createMovimentacaoEstoque",
      "kind": "command",
      "commandRef": "createMovimentacaoEstoque",
      "routeRef": "createMovimentacaoEstoqueRoute",
      "inputTypeRef": "CreateMovimentacaoEstoqueInput",
      "outputTypeRef": "CreateMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.produtoId",
        "ui.produtos.createMovimentacaoEstoque.input.occurredAt",
        "ui.produtos.createMovimentacaoEstoque.input.details",
        "ui.produtos.createMovimentacaoEstoque.input.details_movementType",
        "ui.produtos.createMovimentacaoEstoque.input.details_quantity"
      ],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.result"
      ],
      "statusStateKey": "ui.produtos.createMovimentacaoEstoque.status",
      "errorStateKey": "ui.produtos.createMovimentacaoEstoque.error",
      "refreshActionIds": [
        "listProduto",
        "listMovimentacaoEstoque"
      ]
    },
    {
      "actionId": "setCreateProdutoDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details"
    },
    {
      "actionId": "setCreateProdutoDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details_identification"
    },
    {
      "actionId": "setCreateProdutoDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details_identification_name"
    },
    {
      "actionId": "setCreateProdutoDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details_identification_countryCode"
    },
    {
      "actionId": "setCreateProdutoDetailsProduct",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details_product"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details_product"
    },
    {
      "actionId": "setCreateProdutoDetailsProductUnitOfMeasure",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details_product_unitOfMeasure"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details_product_unitOfMeasure"
    },
    {
      "actionId": "setCreateProdutoDetailsControleEstoque",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details_controleEstoque"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details_controleEstoque"
    },
    {
      "actionId": "setCreateProdutoDetailsControleEstoqueMinimumStock",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details_controleEstoque_minimumStock"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details_controleEstoque_minimumStock"
    },
    {
      "actionId": "createProduto",
      "kind": "command",
      "commandRef": "createProduto",
      "routeRef": "createProdutoRoute",
      "inputTypeRef": "CreateProdutoInput",
      "outputTypeRef": "CreateProdutoOutput",
      "inputStateKeys": [
        "ui.produtos.createProduto.input.details",
        "ui.produtos.createProduto.input.details_identification",
        "ui.produtos.createProduto.input.details_identification_name",
        "ui.produtos.createProduto.input.details_identification_countryCode",
        "ui.produtos.createProduto.input.details_product",
        "ui.produtos.createProduto.input.details_product_unitOfMeasure",
        "ui.produtos.createProduto.input.details_controleEstoque",
        "ui.produtos.createProduto.input.details_controleEstoque_minimumStock"
      ],
      "outputStateKeys": [
        "ui.produtos.createProduto.result"
      ],
      "statusStateKey": "ui.produtos.createProduto.status",
      "errorStateKey": "ui.produtos.createProduto.error",
      "refreshActionIds": [
        "listProduto"
      ]
    },
    {
      "actionId": "setListMovimentacaoEstoqueId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.id"
    },
    {
      "actionId": "setListMovimentacaoEstoqueProdutoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.input.produtoId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.produtoId"
    },
    {
      "actionId": "setListMovimentacaoEstoqueOccurredAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.input.occurredAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.occurredAt"
    },
    {
      "actionId": "setListMovimentacaoEstoquePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.page"
    },
    {
      "actionId": "listMovimentacaoEstoque",
      "kind": "query",
      "commandRef": "listMovimentacaoEstoque",
      "routeRef": "listMovimentacaoEstoqueRoute",
      "inputTypeRef": "ListMovimentacaoEstoqueInput",
      "outputTypeRef": "ListMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.input.id",
        "ui.produtos.listMovimentacaoEstoque.input.produtoId",
        "ui.produtos.listMovimentacaoEstoque.input.occurredAt",
        "ui.produtos.listMovimentacaoEstoque.input.page"
      ],
      "outputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.result"
      ],
      "statusStateKey": "ui.produtos.listMovimentacaoEstoque.status",
      "errorStateKey": "ui.produtos.listMovimentacaoEstoque.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListProdutoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.id"
    },
    {
      "actionId": "setListProdutoDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.details"
    },
    {
      "actionId": "setListProdutoDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.details_identification"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.details_identification_subtype"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.details_identification_name"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.details_identification_status"
    },
    {
      "actionId": "setListProdutoDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.details_identification_countryCode"
    },
    {
      "actionId": "setListProdutoPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.page"
    },
    {
      "actionId": "listProduto",
      "kind": "query",
      "commandRef": "listProduto",
      "routeRef": "listProdutoRoute",
      "inputTypeRef": "ListProdutoInput",
      "outputTypeRef": "ListProdutoOutput",
      "inputStateKeys": [
        "ui.produtos.listProduto.input.id",
        "ui.produtos.listProduto.input.details",
        "ui.produtos.listProduto.input.details_identification",
        "ui.produtos.listProduto.input.details_identification_subtype",
        "ui.produtos.listProduto.input.details_identification_name",
        "ui.produtos.listProduto.input.details_identification_status",
        "ui.produtos.listProduto.input.details_identification_countryCode",
        "ui.produtos.listProduto.input.page"
      ],
      "outputStateKeys": [
        "ui.produtos.listProduto.result"
      ],
      "statusStateKey": "ui.produtos.listProduto.status",
      "errorStateKey": "ui.produtos.listProduto.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listProduto",
      "preconditions": []
    },
    {
      "value": "listMovimentacaoEstoque",
      "kind": "detail",
      "actionId": "listMovimentacaoEstoque",
      "preconditions": [
        "ui.produtos.listMovimentacaoEstoque.input.produtoId"
      ]
    },
    {
      "value": "createMovimentacaoEstoque",
      "kind": "command",
      "actionId": "createMovimentacaoEstoque",
      "preconditions": [
        "ui.produtos.createMovimentacaoEstoque.input.produtoId",
        "ui.produtos.createMovimentacaoEstoque.input.occurredAt",
        "ui.produtos.createMovimentacaoEstoque.input.details_movementType",
        "ui.produtos.createMovimentacaoEstoque.input.details_quantity"
      ]
    },
    {
      "value": "createProduto",
      "kind": "command",
      "actionId": "createProduto",
      "preconditions": [
        "ui.produtos.createProduto.input.details_identification_name",
        "ui.produtos.createProduto.input.details_identification_countryCode",
        "ui.produtos.createProduto.input.details_product_unitOfMeasure",
        "ui.produtos.createProduto.input.details_controleEstoque_minimumStock"
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
        "ui.produtos.createMovimentacaoEstoque.input.produtoId",
        "ui.produtos.createMovimentacaoEstoque.input.occurredAt",
        "ui.produtos.createMovimentacaoEstoque.input.details",
        "ui.produtos.createMovimentacaoEstoque.input.details_movementType",
        "ui.produtos.createMovimentacaoEstoque.input.details_quantity"
      ],
      "resultStateKey": "ui.produtos.createMovimentacaoEstoque.result"
    },
    {
      "actionId": "createProduto",
      "kind": "command",
      "routeRef": "createProdutoRoute",
      "inputTypeRef": "CreateProdutoInput",
      "outputTypeRef": "CreateProdutoOutput",
      "inputStateKeys": [
        "ui.produtos.createProduto.input.details",
        "ui.produtos.createProduto.input.details_identification",
        "ui.produtos.createProduto.input.details_identification_name",
        "ui.produtos.createProduto.input.details_identification_countryCode",
        "ui.produtos.createProduto.input.details_product",
        "ui.produtos.createProduto.input.details_product_unitOfMeasure",
        "ui.produtos.createProduto.input.details_controleEstoque",
        "ui.produtos.createProduto.input.details_controleEstoque_minimumStock"
      ],
      "resultStateKey": "ui.produtos.createProduto.result"
    },
    {
      "actionId": "listMovimentacaoEstoque",
      "kind": "query",
      "routeRef": "listMovimentacaoEstoqueRoute",
      "inputTypeRef": "ListMovimentacaoEstoqueInput",
      "outputTypeRef": "ListMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.input.id",
        "ui.produtos.listMovimentacaoEstoque.input.produtoId",
        "ui.produtos.listMovimentacaoEstoque.input.occurredAt",
        "ui.produtos.listMovimentacaoEstoque.input.page"
      ],
      "resultStateKey": "ui.produtos.listMovimentacaoEstoque.result"
    },
    {
      "actionId": "listProduto",
      "kind": "query",
      "routeRef": "listProdutoRoute",
      "inputTypeRef": "ListProdutoInput",
      "outputTypeRef": "ListProdutoOutput",
      "inputStateKeys": [
        "ui.produtos.listProduto.input.id",
        "ui.produtos.listProduto.input.details",
        "ui.produtos.listProduto.input.details_identification",
        "ui.produtos.listProduto.input.details_identification_subtype",
        "ui.produtos.listProduto.input.details_identification_name",
        "ui.produtos.listProduto.input.details_identification_status",
        "ui.produtos.listProduto.input.details_identification_countryCode",
        "ui.produtos.listProduto.input.page"
      ],
      "resultStateKey": "ui.produtos.listProduto.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "produtos__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/controleEstoque/web/shared/produtos.defs.ts",
    "outputPath": "l2/controleEstoque/web/shared/produtos.ts",
    "dependsFiles": [
      "l2/controleEstoque/web/contracts/produtos.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
