/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-26-agent-defs-l2-shared-v4",
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
      "memberName": "pageStatus",
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
      "memberName": "scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "detail",
        "createMovimentacaoEstoque",
        "createProduto"
      ]
    },
    {
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.produtoId",
      "memberName": "stateCreateMovimentacaoEstoqueProdutoId",
      "name": "produtoId",
      "kind": "input",
      "defaultValue": null,
      "title": "Produto",
      "description": "Produto mestre ao qual a entrada ou saída de estoque se refere.",
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueInput.produtoId",
      "ontologyRef": "MovimentacaoEstoque.produtoId",
      "dtoPath": "produtoId",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.movimentadoEm",
      "memberName": "stateCreateMovimentacaoEstoqueMovimentadoEm",
      "name": "movimentadoEm",
      "kind": "input",
      "defaultValue": null,
      "title": "Data e hora da movimentação",
      "description": "Data e hora em que a entrada ou saída foi registrada, usada para ordenar e consultar o histórico do produto.",
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueInput.movimentadoEm",
      "ontologyRef": "MovimentacaoEstoque.movimentadoEm",
      "dtoPath": "movimentadoEm",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details.tipo",
      "memberName": "stateCreateMovimentacaoEstoqueDetailsTipo",
      "name": "tipo",
      "kind": "input",
      "defaultValue": null,
      "title": "Tipo de movimentação",
      "description": "Indica se as unidades foram adicionadas ao estoque ou retiradas dele.",
      "enumOptions": [
        {
          "value": "entrada",
          "label": "Entrada"
        },
        {
          "value": "saida",
          "label": "Saída"
        }
      ],
      "valueSet": [
        "entrada",
        "saida"
      ],
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueInput.details.tipo",
      "ontologyRef": "MovimentacaoEstoque.details.tipo",
      "dtoPath": "details.tipo",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details.quantidade",
      "memberName": "stateCreateMovimentacaoEstoqueDetailsQuantidade",
      "name": "quantidade",
      "kind": "input",
      "defaultValue": null,
      "title": "Quantidade",
      "description": "Quantidade positiva de unidades que entra ou sai do estoque.",
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueInput.details.quantidade",
      "ontologyRef": "MovimentacaoEstoque.details.quantidade",
      "dtoPath": "details.quantidade",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.produtos.createMovimentacaoEstoque.status",
      "memberName": "stateCreateMovimentacaoEstoqueStatus",
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
      "memberName": "stateCreateMovimentacaoEstoqueError",
      "name": "createMovimentacaoEstoqueError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.produtos.createMovimentacaoEstoque.result",
      "memberName": "stateCreateMovimentacaoEstoqueResult",
      "name": "createMovimentacaoEstoqueResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details.identification.name",
      "memberName": "stateCreateProdutoDetailsIdentificationName",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "title": "Nome do produto",
      "description": "Nome usado pelo estoquista para localizar e reconhecer o produto controlado.",
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.details.identification.name",
      "ontologyRef": "Produto.details.identification.name",
      "dtoPath": "details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details.product.unitOfMeasure",
      "memberName": "stateCreateProdutoDetailsProductUnitOfMeasure",
      "name": "unitOfMeasure",
      "kind": "input",
      "defaultValue": null,
      "title": "Unidade de medida",
      "description": "Unidade em que o estoquista registra entradas, saídas, saldo e quantidade mínima do produto.",
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.details.product.unitOfMeasure",
      "ontologyRef": "Produto.details.product.unitOfMeasure",
      "dtoPath": "details.product.unitOfMeasure",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima",
      "memberName": "stateCreateProdutoDetailsControleEstoqueQuantidadeMinima",
      "name": "quantidadeMinima",
      "kind": "input",
      "defaultValue": null,
      "title": "Quantidade mínima",
      "description": "Quantidade mínima em estoque a partir da qual o produto deve ser acompanhado por aviso.",
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoInput.details.controleEstoque.quantidadeMinima",
      "ontologyRef": "Produto.details.controleEstoque.quantidadeMinima",
      "dtoPath": "details.controleEstoque.quantidadeMinima",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.createProduto.status",
      "memberName": "stateCreateProdutoStatus",
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
      "memberName": "stateCreateProdutoError",
      "name": "createProdutoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createProduto"
    },
    {
      "stateKey": "ui.produtos.createProduto.result",
      "memberName": "stateCreateProdutoResult",
      "name": "createProdutoResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createProduto",
      "contractRef": "CreateProdutoOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.id",
      "memberName": "stateListMovimentacaoEstoqueId",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "title": "Id",
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueInput.id",
      "ontologyRef": "MovimentacaoEstoque.id",
      "dtoPath": "id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.produtoId",
      "memberName": "stateListMovimentacaoEstoqueProdutoId",
      "name": "produtoId",
      "kind": "input",
      "defaultValue": null,
      "title": "Produto",
      "description": "Produto mestre ao qual a entrada ou saída de estoque se refere.",
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueInput.produtoId",
      "ontologyRef": "MovimentacaoEstoque.produtoId",
      "dtoPath": "produtoId",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": false
    },
    {
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.movimentadoEm",
      "memberName": "stateListMovimentacaoEstoqueMovimentadoEm",
      "name": "movimentadoEm",
      "kind": "input",
      "defaultValue": null,
      "title": "Data e hora da movimentação",
      "description": "Data e hora em que a entrada ou saída foi registrada, usada para ordenar e consultar o histórico do produto.",
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueInput.movimentadoEm",
      "ontologyRef": "MovimentacaoEstoque.movimentadoEm",
      "dtoPath": "movimentadoEm",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.page",
      "memberName": "stateListMovimentacaoEstoquePage",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueInput.page",
      "ontologyRef": "MovimentacaoEstoque.$page",
      "dtoPath": "page",
      "source": "routeParam",
      "presentation": "route",
      "editable": false,
      "required": false
    },
    {
      "stateKey": "ui.produtos.listMovimentacaoEstoque.status",
      "memberName": "stateListMovimentacaoEstoqueStatus",
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
      "memberName": "stateListMovimentacaoEstoqueError",
      "name": "listMovimentacaoEstoqueError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.produtos.listMovimentacaoEstoque.result",
      "memberName": "stateListMovimentacaoEstoqueResult",
      "name": "listMovimentacaoEstoqueResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.produtos.listProduto.input.id",
      "memberName": "stateListProdutoId",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "description": "mdmId; stable through promotion and merge.",
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.id",
      "ontologyRef": "Produto.id",
      "dtoPath": "id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.listProduto.input.details.identification.subtype",
      "memberName": "stateListProdutoDetailsIdentificationSubtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "title": "Tipo de cadastro",
      "description": "Identifica este cadastro mestre como um produto.",
      "enumOptions": [
        {
          "value": "Product",
          "label": "Produto"
        }
      ],
      "valueSet": [
        "Product"
      ],
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.details.identification.subtype",
      "ontologyRef": "Produto.details.identification.subtype",
      "dtoPath": "details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.listProduto.input.details.identification.name",
      "memberName": "stateListProdutoDetailsIdentificationName",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "title": "Nome do produto",
      "description": "Nome usado pelo estoquista para localizar e reconhecer o produto controlado.",
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.details.identification.name",
      "ontologyRef": "Produto.details.identification.name",
      "dtoPath": "details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.listProduto.input.details.identification.status",
      "memberName": "stateListProdutoDetailsIdentificationStatus",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "title": "Situação do cadastro",
      "description": "Situação do produto no cadastro mestre, usada para indicar se ele está ativo para o controle de estoque.",
      "enumOptions": [
        {
          "value": "Active",
          "label": "Ativo"
        },
        {
          "value": "Inactive",
          "label": "Inativo"
        },
        {
          "value": "Merged",
          "label": "Mesclado"
        },
        {
          "value": "Blocked",
          "label": "Bloqueado"
        }
      ],
      "valueSet": [
        "Active",
        "Inactive",
        "Merged",
        "Blocked"
      ],
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.details.identification.status",
      "ontologyRef": "Produto.details.identification.status",
      "dtoPath": "details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.produtos.listProduto.input.page",
      "memberName": "stateListProdutoPage",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProduto",
      "contractRef": "ListProdutoInput.page",
      "ontologyRef": "Produto.$page",
      "dtoPath": "page",
      "source": "routeParam",
      "presentation": "route",
      "editable": false,
      "required": false
    },
    {
      "stateKey": "ui.produtos.listProduto.status",
      "memberName": "stateListProdutoStatus",
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
      "memberName": "stateListProdutoError",
      "name": "listProdutoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProduto"
    },
    {
      "stateKey": "ui.produtos.listProduto.result",
      "memberName": "stateListProdutoResult",
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
      "actionId": "set:scenario",
      "methodName": "setScenario",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.scenary"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.scenary"
    },
    {
      "actionId": "select:createMovimentacaoEstoque:produtoId",
      "methodName": "selectCreateMovimentacaoEstoqueProdutoId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.produtoId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.produtoId",
      "selection": {
        "sourceActionId": "listProduto",
        "resultStateKey": "ui.produtos.listProduto.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "set:createMovimentacaoEstoque:movimentadoEm",
      "methodName": "setCreateMovimentacaoEstoqueMovimentadoEm",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.movimentadoEm"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.movimentadoEm"
    },
    {
      "actionId": "set:createMovimentacaoEstoque:details.tipo",
      "methodName": "setCreateMovimentacaoEstoqueDetailsTipo",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.details.tipo"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details.tipo"
    },
    {
      "actionId": "set:createMovimentacaoEstoque:details.quantidade",
      "methodName": "setCreateMovimentacaoEstoqueDetailsQuantidade",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.details.quantidade"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createMovimentacaoEstoque.input.details.quantidade"
    },
    {
      "actionId": "createMovimentacaoEstoque",
      "methodName": "runCreateMovimentacaoEstoque",
      "kind": "command",
      "commandRef": "createMovimentacaoEstoque",
      "routeRef": "createMovimentacaoEstoqueRoute",
      "inputTypeRef": "CreateMovimentacaoEstoqueInput",
      "outputTypeRef": "CreateMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.produtoId",
        "ui.produtos.createMovimentacaoEstoque.input.movimentadoEm",
        "ui.produtos.createMovimentacaoEstoque.input.details.tipo",
        "ui.produtos.createMovimentacaoEstoque.input.details.quantidade"
      ],
      "outputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.result"
      ],
      "statusStateKey": "ui.produtos.createMovimentacaoEstoque.status",
      "errorStateKey": "ui.produtos.createMovimentacaoEstoque.error",
      "refreshActionIds": [
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "operationBinding": {
        "actorRef": "estoquista",
        "grantRefs": [
          "gerenciarEstoque"
        ],
        "authorities": [
          "estoquista"
        ],
        "ruleRefs": [
          {
            "ruleId": "movimentacaoEstoqueImutavel",
            "file": "l4/controleEstoque/rules.defs.ts",
            "symbol": "rules.movimentacaoEstoqueImutavel",
            "description": "Uma movimentação de estoque não pode ser alterada depois de registrada."
          },
          {
            "ruleId": "quantidadeMovimentadaPositiva",
            "file": "l4/controleEstoque/rules.defs.ts",
            "symbol": "rules.quantidadeMovimentadaPositiva",
            "description": "A quantidade registrada em uma movimentação de estoque deve ser um número inteiro positivo."
          },
          {
            "ruleId": "registroMovimentacaoAtualizaSaldo",
            "file": "l4/controleEstoque/rules.defs.ts",
            "symbol": "rules.registroMovimentacaoAtualizaSaldo",
            "description": "O registro de uma entrada ou saída deve atualizar o saldo atual do produto correspondente conforme o tipo e a quantidade movimentada."
          }
        ],
        "sourceHashes": [
          "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:27dee69852129a16a21ec26a9099a741b1b3f205a70fe2ddc28655120b495549",
          "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
          "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "estoquista",
          "grantRefs": [
            "gerenciarEstoque"
          ],
          "authorities": [
            "estoquista"
          ],
          "ruleRefs": [
            {
              "ruleId": "movimentacaoEstoqueImutavel",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.movimentacaoEstoqueImutavel",
              "description": "Uma movimentação de estoque não pode ser alterada depois de registrada."
            },
            {
              "ruleId": "quantidadeMovimentadaPositiva",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.quantidadeMovimentadaPositiva",
              "description": "A quantidade registrada em uma movimentação de estoque deve ser um número inteiro positivo."
            },
            {
              "ruleId": "registroMovimentacaoAtualizaSaldo",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.registroMovimentacaoAtualizaSaldo",
              "description": "O registro de uma entrada ou saída deve atualizar o saldo atual do produto correspondente conforme o tipo e a quantidade movimentada."
            }
          ],
          "sourceHashes": [
            "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:27dee69852129a16a21ec26a9099a741b1b3f205a70fe2ddc28655120b495549",
            "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
            "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
          ]
        }
      ]
    },
    {
      "actionId": "set:createProduto:details.identification.name",
      "methodName": "setCreateProdutoDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details.identification.name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details.identification.name"
    },
    {
      "actionId": "set:createProduto:details.product.unitOfMeasure",
      "methodName": "setCreateProdutoDetailsProductUnitOfMeasure",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details.product.unitOfMeasure"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details.product.unitOfMeasure"
    },
    {
      "actionId": "set:createProduto:details.controleEstoque.quantidadeMinima",
      "methodName": "setCreateProdutoDetailsControleEstoqueQuantidadeMinima",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima"
    },
    {
      "actionId": "createProduto",
      "methodName": "runCreateProduto",
      "kind": "command",
      "commandRef": "createProduto",
      "routeRef": "createProdutoRoute",
      "inputTypeRef": "CreateProdutoInput",
      "outputTypeRef": "CreateProdutoOutput",
      "inputStateKeys": [
        "ui.produtos.createProduto.input.details.identification.name",
        "ui.produtos.createProduto.input.details.product.unitOfMeasure",
        "ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima"
      ],
      "outputStateKeys": [
        "ui.produtos.createProduto.result"
      ],
      "statusStateKey": "ui.produtos.createProduto.status",
      "errorStateKey": "ui.produtos.createProduto.error",
      "refreshActionIds": [
        "listProduto"
      ],
      "operationBinding": {
        "actorRef": "estoquista",
        "grantRefs": [
          "gerenciarEstoque"
        ],
        "authorities": [
          "estoquista"
        ],
        "ruleRefs": [
          {
            "ruleId": "rule-foreign-namespace-refused",
            "file": "l4/controleEstoque/ontology/Produto.defs.ts",
            "symbol": "rules[rule-foreign-namespace-refused]",
            "description": ""
          },
          {
            "ruleId": "rule-document-shape-validated",
            "file": "l4/controleEstoque/ontology/Produto.defs.ts",
            "symbol": "rules[rule-document-shape-validated]",
            "description": ""
          },
          {
            "ruleId": "rule-identity-never-in-namespace",
            "file": "l4/controleEstoque/ontology/Produto.defs.ts",
            "symbol": "rules[rule-identity-never-in-namespace]",
            "description": ""
          },
          {
            "ruleId": "quantidadeMinimaValida",
            "file": "l4/controleEstoque/rules.defs.ts",
            "symbol": "rules.quantidadeMinimaValida",
            "description": "A quantidade mínima definida para um produto deve ser maior ou igual a zero."
          },
          {
            "ruleId": "saldoAtualProduto",
            "file": "l4/controleEstoque/rules.defs.ts",
            "symbol": "rules.saldoAtualProduto",
            "description": "O saldo atual de cada produto é calculado pela soma das quantidades das entradas menos a soma das quantidades das saídas registradas para esse produto."
          },
          {
            "ruleId": "avisoSaldoMinimoProduto",
            "file": "l4/controleEstoque/rules.defs.ts",
            "symbol": "rules.avisoSaldoMinimoProduto",
            "description": "Um produto deve ser sinalizado com aviso de saldo baixo quando seu saldo atual for menor que sua quantidade mínima definida."
          }
        ],
        "sourceHashes": [
          "l4/controleEstoque/ontology/Produto.defs.ts#sha256:d72afd5390e92f408c41b59ea09ffb17fab91daeebc56e170dd4ad41deae2557",
          "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
          "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "estoquista",
          "grantRefs": [
            "gerenciarEstoque"
          ],
          "authorities": [
            "estoquista"
          ],
          "ruleRefs": [
            {
              "ruleId": "rule-foreign-namespace-refused",
              "file": "l4/controleEstoque/ontology/Produto.defs.ts",
              "symbol": "rules[rule-foreign-namespace-refused]",
              "description": ""
            },
            {
              "ruleId": "rule-document-shape-validated",
              "file": "l4/controleEstoque/ontology/Produto.defs.ts",
              "symbol": "rules[rule-document-shape-validated]",
              "description": ""
            },
            {
              "ruleId": "rule-identity-never-in-namespace",
              "file": "l4/controleEstoque/ontology/Produto.defs.ts",
              "symbol": "rules[rule-identity-never-in-namespace]",
              "description": ""
            },
            {
              "ruleId": "quantidadeMinimaValida",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.quantidadeMinimaValida",
              "description": "A quantidade mínima definida para um produto deve ser maior ou igual a zero."
            },
            {
              "ruleId": "saldoAtualProduto",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.saldoAtualProduto",
              "description": "O saldo atual de cada produto é calculado pela soma das quantidades das entradas menos a soma das quantidades das saídas registradas para esse produto."
            },
            {
              "ruleId": "avisoSaldoMinimoProduto",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.avisoSaldoMinimoProduto",
              "description": "Um produto deve ser sinalizado com aviso de saldo baixo quando seu saldo atual for menor que sua quantidade mínima definida."
            }
          ],
          "sourceHashes": [
            "l4/controleEstoque/ontology/Produto.defs.ts#sha256:d72afd5390e92f408c41b59ea09ffb17fab91daeebc56e170dd4ad41deae2557",
            "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
            "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
          ]
        }
      ]
    },
    {
      "actionId": "set:listMovimentacaoEstoque:id",
      "methodName": "setListMovimentacaoEstoqueId",
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
      "actionId": "select:listMovimentacaoEstoque:produtoId",
      "methodName": "selectListMovimentacaoEstoqueProdutoId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.input.produtoId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.produtoId",
      "selection": {
        "sourceActionId": "listProduto",
        "resultStateKey": "ui.produtos.listProduto.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "set:listMovimentacaoEstoque:movimentadoEm",
      "methodName": "setListMovimentacaoEstoqueMovimentadoEm",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.input.movimentadoEm"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listMovimentacaoEstoque.input.movimentadoEm"
    },
    {
      "actionId": "listMovimentacaoEstoque",
      "methodName": "runListMovimentacaoEstoque",
      "kind": "query",
      "commandRef": "listMovimentacaoEstoque",
      "routeRef": "listMovimentacaoEstoqueRoute",
      "inputTypeRef": "ListMovimentacaoEstoqueInput",
      "outputTypeRef": "ListMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.input.id",
        "ui.produtos.listMovimentacaoEstoque.input.produtoId",
        "ui.produtos.listMovimentacaoEstoque.input.movimentadoEm",
        "ui.produtos.listMovimentacaoEstoque.input.page"
      ],
      "outputStateKeys": [
        "ui.produtos.listMovimentacaoEstoque.result"
      ],
      "statusStateKey": "ui.produtos.listMovimentacaoEstoque.status",
      "errorStateKey": "ui.produtos.listMovimentacaoEstoque.error",
      "refreshActionIds": [],
      "operationBinding": {
        "actorRef": "estoquista",
        "grantRefs": [
          "gerenciarEstoque"
        ],
        "authorities": [
          "estoquista"
        ],
        "ruleRefs": [],
        "sourceHashes": [
          "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:27dee69852129a16a21ec26a9099a741b1b3f205a70fe2ddc28655120b495549",
          "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
          "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "estoquista",
          "grantRefs": [
            "gerenciarEstoque"
          ],
          "authorities": [
            "estoquista"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:27dee69852129a16a21ec26a9099a741b1b3f205a70fe2ddc28655120b495549",
            "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
            "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
          ]
        }
      ]
    },
    {
      "actionId": "set:listProduto:id",
      "methodName": "setListProdutoId",
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
      "actionId": "set:listProduto:details.identification.subtype",
      "methodName": "setListProdutoDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.details.identification.subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.details.identification.subtype"
    },
    {
      "actionId": "set:listProduto:details.identification.name",
      "methodName": "setListProdutoDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.details.identification.name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.details.identification.name"
    },
    {
      "actionId": "set:listProduto:details.identification.status",
      "methodName": "setListProdutoDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.produtos.listProduto.input.details.identification.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.produtos.listProduto.input.details.identification.status"
    },
    {
      "actionId": "listProduto",
      "methodName": "runListProduto",
      "kind": "query",
      "commandRef": "listProduto",
      "routeRef": "listProdutoRoute",
      "inputTypeRef": "ListProdutoInput",
      "outputTypeRef": "ListProdutoOutput",
      "inputStateKeys": [
        "ui.produtos.listProduto.input.id",
        "ui.produtos.listProduto.input.details.identification.subtype",
        "ui.produtos.listProduto.input.details.identification.name",
        "ui.produtos.listProduto.input.details.identification.status",
        "ui.produtos.listProduto.input.page"
      ],
      "outputStateKeys": [
        "ui.produtos.listProduto.result"
      ],
      "statusStateKey": "ui.produtos.listProduto.status",
      "errorStateKey": "ui.produtos.listProduto.error",
      "refreshActionIds": [],
      "operationBinding": {
        "actorRef": "estoquista",
        "grantRefs": [
          "gerenciarEstoque"
        ],
        "authorities": [
          "estoquista"
        ],
        "ruleRefs": [],
        "sourceHashes": [
          "l4/controleEstoque/ontology/Produto.defs.ts#sha256:d72afd5390e92f408c41b59ea09ffb17fab91daeebc56e170dd4ad41deae2557",
          "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
          "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "estoquista",
          "grantRefs": [
            "gerenciarEstoque"
          ],
          "authorities": [
            "estoquista"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/controleEstoque/ontology/Produto.defs.ts#sha256:d72afd5390e92f408c41b59ea09ffb17fab91daeebc56e170dd4ad41deae2557",
            "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
            "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
          ]
        }
      ]
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listProduto",
      "preconditions": [],
      "methodName": "enterBaseScenario",
      "operationBindings": [
        {
          "actorRef": "estoquista",
          "grantRefs": [
            "gerenciarEstoque"
          ],
          "authorities": [
            "estoquista"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/controleEstoque/ontology/Produto.defs.ts#sha256:d72afd5390e92f408c41b59ea09ffb17fab91daeebc56e170dd4ad41deae2557",
            "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
            "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
          ]
        }
      ]
    },
    {
      "value": "detail",
      "kind": "detail",
      "actionId": "listProduto",
      "preconditions": [
        "ui.produtos.listProduto.input.id"
      ],
      "methodName": "enterDetailScenario",
      "operationBindings": [
        {
          "actorRef": "estoquista",
          "grantRefs": [
            "gerenciarEstoque"
          ],
          "authorities": [
            "estoquista"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/controleEstoque/ontology/Produto.defs.ts#sha256:d72afd5390e92f408c41b59ea09ffb17fab91daeebc56e170dd4ad41deae2557",
            "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
            "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
          ]
        }
      ]
    },
    {
      "value": "createMovimentacaoEstoque",
      "kind": "command",
      "actionId": "createMovimentacaoEstoque",
      "preconditions": [
        "ui.produtos.createMovimentacaoEstoque.input.produtoId",
        "ui.produtos.createMovimentacaoEstoque.input.movimentadoEm",
        "ui.produtos.createMovimentacaoEstoque.input.details.tipo",
        "ui.produtos.createMovimentacaoEstoque.input.details.quantidade"
      ],
      "methodName": "enterCreateMovimentacaoEstoqueScenario",
      "operationBindings": [
        {
          "actorRef": "estoquista",
          "grantRefs": [
            "gerenciarEstoque"
          ],
          "authorities": [
            "estoquista"
          ],
          "ruleRefs": [
            {
              "ruleId": "movimentacaoEstoqueImutavel",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.movimentacaoEstoqueImutavel",
              "description": "Uma movimentação de estoque não pode ser alterada depois de registrada."
            },
            {
              "ruleId": "quantidadeMovimentadaPositiva",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.quantidadeMovimentadaPositiva",
              "description": "A quantidade registrada em uma movimentação de estoque deve ser um número inteiro positivo."
            },
            {
              "ruleId": "registroMovimentacaoAtualizaSaldo",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.registroMovimentacaoAtualizaSaldo",
              "description": "O registro de uma entrada ou saída deve atualizar o saldo atual do produto correspondente conforme o tipo e a quantidade movimentada."
            }
          ],
          "sourceHashes": [
            "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:27dee69852129a16a21ec26a9099a741b1b3f205a70fe2ddc28655120b495549",
            "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
            "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
          ]
        }
      ]
    },
    {
      "value": "createProduto",
      "kind": "command",
      "actionId": "createProduto",
      "preconditions": [
        "ui.produtos.createProduto.input.details.identification.name",
        "ui.produtos.createProduto.input.details.product.unitOfMeasure",
        "ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima"
      ],
      "methodName": "enterCreateProdutoScenario",
      "operationBindings": [
        {
          "actorRef": "estoquista",
          "grantRefs": [
            "gerenciarEstoque"
          ],
          "authorities": [
            "estoquista"
          ],
          "ruleRefs": [
            {
              "ruleId": "rule-foreign-namespace-refused",
              "file": "l4/controleEstoque/ontology/Produto.defs.ts",
              "symbol": "rules[rule-foreign-namespace-refused]",
              "description": ""
            },
            {
              "ruleId": "rule-document-shape-validated",
              "file": "l4/controleEstoque/ontology/Produto.defs.ts",
              "symbol": "rules[rule-document-shape-validated]",
              "description": ""
            },
            {
              "ruleId": "rule-identity-never-in-namespace",
              "file": "l4/controleEstoque/ontology/Produto.defs.ts",
              "symbol": "rules[rule-identity-never-in-namespace]",
              "description": ""
            },
            {
              "ruleId": "quantidadeMinimaValida",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.quantidadeMinimaValida",
              "description": "A quantidade mínima definida para um produto deve ser maior ou igual a zero."
            },
            {
              "ruleId": "saldoAtualProduto",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.saldoAtualProduto",
              "description": "O saldo atual de cada produto é calculado pela soma das quantidades das entradas menos a soma das quantidades das saídas registradas para esse produto."
            },
            {
              "ruleId": "avisoSaldoMinimoProduto",
              "file": "l4/controleEstoque/rules.defs.ts",
              "symbol": "rules.avisoSaldoMinimoProduto",
              "description": "Um produto deve ser sinalizado com aviso de saldo baixo quando seu saldo atual for menor que sua quantidade mínima definida."
            }
          ],
          "sourceHashes": [
            "l4/controleEstoque/ontology/Produto.defs.ts#sha256:d72afd5390e92f408c41b59ea09ffb17fab91daeebc56e170dd4ad41deae2557",
            "l4/controleEstoque/access.defs.ts#sha256:47f0109c8317ed94d3abc15736b8b022a094d4394a33a9f3a4d43a36262835da",
            "l4/controleEstoque/rules.defs.ts#sha256:1b7872806ecc60b0b44e4a348bda6f0b300720354f64b30b35d0be28033f7a87"
          ]
        }
      ]
    }
  ],
  "initialLoads": [
    {
      "actionId": "listMovimentacaoEstoque",
      "stateKey": "ui.produtos.listMovimentacaoEstoque.result"
    },
    {
      "actionId": "listProduto",
      "stateKey": "ui.produtos.listProduto.result"
    }
  ],
  "dataBindings": [
    {
      "actionId": "createMovimentacaoEstoque",
      "kind": "command",
      "routeRef": "createMovimentacaoEstoqueRoute",
      "inputTypeRef": "CreateMovimentacaoEstoqueInput",
      "outputTypeRef": "CreateMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.produtos.createMovimentacaoEstoque.input.produtoId",
        "ui.produtos.createMovimentacaoEstoque.input.movimentadoEm",
        "ui.produtos.createMovimentacaoEstoque.input.details.tipo",
        "ui.produtos.createMovimentacaoEstoque.input.details.quantidade"
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
        "ui.produtos.createProduto.input.details.identification.name",
        "ui.produtos.createProduto.input.details.product.unitOfMeasure",
        "ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima"
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
        "ui.produtos.listMovimentacaoEstoque.input.movimentadoEm",
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
        "ui.produtos.listProduto.input.details.identification.subtype",
        "ui.produtos.listProduto.input.details.identification.name",
        "ui.produtos.listProduto.input.details.identification.status",
        "ui.produtos.listProduto.input.page"
      ],
      "resultStateKey": "ui.produtos.listProduto.result"
    }
  ],
  "coverage": [
    {
      "organismId": "organism.summary.1",
      "sourceIndex": 0,
      "kind": "summary",
      "contentRef": "content.summary",
      "content": "Vejo o saldo atual de cada produto do estoque.",
      "scenarioRefs": [
        "base",
        "detail",
        "createMovimentacaoEstoque",
        "createProduto"
      ],
      "capabilityRefs": [
        "createMovimentacaoEstoque",
        "createProduto",
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "outputFieldsByCapability": {
        "createMovimentacaoEstoque": [],
        "createProduto": [],
        "listMovimentacaoEstoque": [
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "version"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "produtoId"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentadoEm"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.tipo"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.quantidade"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification.name"
          }
        ],
        "listProduto": [
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "id"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "version"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.subtype"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.name"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.status"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.base"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product.unitOfMeasure"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.general"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.quantidadeMinima"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAtual"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAbaixoDoMinimo"
          }
        ]
      },
      "source": {
        "kind": "summary",
        "text": "Vejo o saldo atual de cada produto do estoque."
      }
    },
    {
      "organismId": "organism.highlights.1",
      "sourceIndex": 1,
      "kind": "highlights",
      "contentRef": "content.highlights",
      "content": "Identifico os produtos com saldo abaixo da quantidade mínima.",
      "scenarioRefs": [
        "base",
        "detail",
        "createMovimentacaoEstoque",
        "createProduto"
      ],
      "capabilityRefs": [
        "createMovimentacaoEstoque",
        "createProduto",
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "outputFieldsByCapability": {
        "createMovimentacaoEstoque": [],
        "createProduto": [],
        "listMovimentacaoEstoque": [
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "version"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "produtoId"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentadoEm"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.tipo"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.quantidade"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification.name"
          }
        ],
        "listProduto": [
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "id"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "version"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.subtype"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.name"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.status"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.base"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product.unitOfMeasure"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.general"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.quantidadeMinima"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAtual"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAbaixoDoMinimo"
          }
        ]
      },
      "source": {
        "kind": "highlights",
        "text": "Identifico os produtos com saldo abaixo da quantidade mínima."
      }
    },
    {
      "organismId": "organism.list.1",
      "sourceIndex": 2,
      "kind": "list",
      "contentRef": "content.list",
      "content": "Localizo os produtos cadastrados no estoque.",
      "scenarioRefs": [
        "base",
        "detail",
        "createMovimentacaoEstoque",
        "createProduto"
      ],
      "capabilityRefs": [
        "createMovimentacaoEstoque",
        "createProduto",
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "outputFieldsByCapability": {
        "createMovimentacaoEstoque": [],
        "createProduto": [],
        "listMovimentacaoEstoque": [
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "version"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "produtoId"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentadoEm"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.tipo"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.quantidade"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification.name"
          }
        ],
        "listProduto": [
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "id"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "version"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.subtype"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.name"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.status"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.base"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product.unitOfMeasure"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.general"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.quantidadeMinima"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAtual"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAbaixoDoMinimo"
          }
        ]
      },
      "source": {
        "kind": "list",
        "text": "Localizo os produtos cadastrados no estoque."
      }
    },
    {
      "organismId": "organism.detail.1",
      "sourceIndex": 3,
      "kind": "detail",
      "contentRef": "content.detail",
      "content": "Consulto o produto, o saldo atual e a quantidade mínima.",
      "scenarioRefs": [
        "base",
        "detail",
        "createMovimentacaoEstoque",
        "createProduto"
      ],
      "capabilityRefs": [
        "createMovimentacaoEstoque",
        "createProduto",
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "outputFieldsByCapability": {
        "createMovimentacaoEstoque": [],
        "createProduto": [],
        "listMovimentacaoEstoque": [
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "version"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "produtoId"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentadoEm"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.tipo"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.quantidade"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification.name"
          }
        ],
        "listProduto": [
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "id"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "version"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.subtype"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.name"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.status"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.base"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product.unitOfMeasure"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.general"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.quantidadeMinima"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAtual"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAbaixoDoMinimo"
          }
        ]
      },
      "source": {
        "kind": "detail",
        "text": "Consulto o produto, o saldo atual e a quantidade mínima."
      }
    },
    {
      "organismId": "organism.form.1",
      "sourceIndex": 4,
      "kind": "form",
      "contentRef": "content.form",
      "content": "Informo o produto e a quantidade mínima para acompanhamento do estoque.",
      "scenarioRefs": [
        "base",
        "detail",
        "createMovimentacaoEstoque",
        "createProduto"
      ],
      "capabilityRefs": [
        "createMovimentacaoEstoque",
        "createProduto",
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "outputFieldsByCapability": {
        "createMovimentacaoEstoque": [],
        "createProduto": [],
        "listMovimentacaoEstoque": [
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "version"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "produtoId"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentadoEm"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.tipo"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.quantidade"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification.name"
          }
        ],
        "listProduto": [
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "id"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "version"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.subtype"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.name"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.status"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.base"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product.unitOfMeasure"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.general"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.quantidadeMinima"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAtual"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAbaixoDoMinimo"
          }
        ]
      },
      "source": {
        "kind": "form",
        "text": "Informo o produto e a quantidade mínima para acompanhamento do estoque."
      }
    },
    {
      "organismId": "organism.actions.1",
      "sourceIndex": 5,
      "kind": "actions",
      "contentRef": "content.actions",
      "content": "Cadastro o produto.",
      "scenarioRefs": [
        "base",
        "detail",
        "createMovimentacaoEstoque",
        "createProduto"
      ],
      "capabilityRefs": [
        "createMovimentacaoEstoque",
        "createProduto",
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "outputFieldsByCapability": {
        "createMovimentacaoEstoque": [],
        "createProduto": [],
        "listMovimentacaoEstoque": [
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "version"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "produtoId"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentadoEm"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.tipo"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "details.quantidade"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.id"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification"
          },
          {
            "actionId": "listMovimentacaoEstoque",
            "outputTypeRef": "ListMovimentacaoEstoqueOutput",
            "path": "movimentacaoEstoqueProduto.details.identification.name"
          }
        ],
        "listProduto": [
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "id"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "version"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.subtype"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.name"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.identification.status"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.base"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.product.unitOfMeasure"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.general"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.quantidadeMinima"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAtual"
          },
          {
            "actionId": "listProduto",
            "outputTypeRef": "ListProdutoOutput",
            "path": "details.controleEstoque.saldoAbaixoDoMinimo"
          }
        ]
      },
      "source": {
        "kind": "actions",
        "text": "Cadastro o produto."
      }
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
      "_102029_.d.ts",
      "l4/controleEstoque/access.defs.ts",
      "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts",
      "l4/controleEstoque/ontology/Produto.defs.ts",
      "l4/controleEstoque/rules.defs.ts",
      "l4/controleEstoque/workflows.defs.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
