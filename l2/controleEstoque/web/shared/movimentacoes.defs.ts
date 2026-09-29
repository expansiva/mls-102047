/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-26-agent-defs-l2-shared-v4",
  "moduleName": "controleEstoque",
  "pageId": "movimentacoes",
  "pageName": "Movimentações",
  "baseClassName": "MovimentacoesShared",
  "routePattern": "/movimentacoes",
  "contractRef": {
    "defPath": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
      "stateKey": "ui.movimentacoes.pageStatus",
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
      "stateKey": "ui.movimentacoes.scenary",
      "memberName": "scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "createMovimentacaoEstoque"
      ]
    },
    {
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.input.produtoId",
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
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm",
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
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo",
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
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade",
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
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.status",
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
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.error",
      "memberName": "stateCreateMovimentacaoEstoqueError",
      "name": "createMovimentacaoEstoqueError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.result",
      "memberName": "stateCreateMovimentacaoEstoqueResult",
      "name": "createMovimentacaoEstoqueResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createMovimentacaoEstoque",
      "contractRef": "CreateMovimentacaoEstoqueOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.input.id",
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
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.input.produtoId",
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
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.input.movimentadoEm",
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
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.input.page",
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
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.status",
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
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.error",
      "memberName": "stateListMovimentacaoEstoqueError",
      "name": "listMovimentacaoEstoqueError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMovimentacaoEstoque"
    },
    {
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.result",
      "memberName": "stateListMovimentacaoEstoqueResult",
      "name": "listMovimentacaoEstoqueResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMovimentacaoEstoque",
      "contractRef": "ListMovimentacaoEstoqueOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.movimentacoes.listProduto.input.id",
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
      "stateKey": "ui.movimentacoes.listProduto.input.details.identification.subtype",
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
      "stateKey": "ui.movimentacoes.listProduto.input.details.identification.name",
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
      "stateKey": "ui.movimentacoes.listProduto.input.details.identification.status",
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
      "stateKey": "ui.movimentacoes.listProduto.input.page",
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
      "stateKey": "ui.movimentacoes.listProduto.status",
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
      "stateKey": "ui.movimentacoes.listProduto.error",
      "memberName": "stateListProdutoError",
      "name": "listProdutoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProduto"
    },
    {
      "stateKey": "ui.movimentacoes.listProduto.result",
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
        "ui.movimentacoes.scenary"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.scenary"
    },
    {
      "actionId": "select:createMovimentacaoEstoque:produtoId",
      "methodName": "selectCreateMovimentacaoEstoqueProdutoId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes.createMovimentacaoEstoque.input.produtoId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.input.produtoId",
      "selection": {
        "sourceActionId": "listProduto",
        "resultStateKey": "ui.movimentacoes.listProduto.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "set:createMovimentacaoEstoque:movimentadoEm",
      "methodName": "setCreateMovimentacaoEstoqueMovimentadoEm",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm"
    },
    {
      "actionId": "set:createMovimentacaoEstoque:details.tipo",
      "methodName": "setCreateMovimentacaoEstoqueDetailsTipo",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo"
    },
    {
      "actionId": "set:createMovimentacaoEstoque:details.quantidade",
      "methodName": "setCreateMovimentacaoEstoqueDetailsQuantidade",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade"
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
        "ui.movimentacoes.createMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm",
        "ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo",
        "ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade"
      ],
      "outputStateKeys": [
        "ui.movimentacoes.createMovimentacaoEstoque.result"
      ],
      "statusStateKey": "ui.movimentacoes.createMovimentacaoEstoque.status",
      "errorStateKey": "ui.movimentacoes.createMovimentacaoEstoque.error",
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
          "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:2cff350aae09d440467e18b93b28610d222124198a6cd39c88173d4af357435d",
          "l4/controleEstoque/access.defs.ts#sha256:bf7735be84da33112ac4a039066285ac8e986233b0aee85bd2254193f779621d",
          "l4/controleEstoque/rules.defs.ts#sha256:5219a6accfd5ec5d5f6bf561a11b7f584c0aeab260ec43ad463ef021ba843e87"
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
            "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:2cff350aae09d440467e18b93b28610d222124198a6cd39c88173d4af357435d",
            "l4/controleEstoque/access.defs.ts#sha256:bf7735be84da33112ac4a039066285ac8e986233b0aee85bd2254193f779621d",
            "l4/controleEstoque/rules.defs.ts#sha256:5219a6accfd5ec5d5f6bf561a11b7f584c0aeab260ec43ad463ef021ba843e87"
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
        "ui.movimentacoes.listMovimentacaoEstoque.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.input.id"
    },
    {
      "actionId": "select:listMovimentacaoEstoque:produtoId",
      "methodName": "selectListMovimentacaoEstoqueProdutoId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes.listMovimentacaoEstoque.input.produtoId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.input.produtoId",
      "selection": {
        "sourceActionId": "listProduto",
        "resultStateKey": "ui.movimentacoes.listProduto.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "set:listMovimentacaoEstoque:movimentadoEm",
      "methodName": "setListMovimentacaoEstoqueMovimentadoEm",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes.listMovimentacaoEstoque.input.movimentadoEm"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.input.movimentadoEm"
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
        "ui.movimentacoes.listMovimentacaoEstoque.input.id",
        "ui.movimentacoes.listMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes.listMovimentacaoEstoque.input.movimentadoEm",
        "ui.movimentacoes.listMovimentacaoEstoque.input.page"
      ],
      "outputStateKeys": [
        "ui.movimentacoes.listMovimentacaoEstoque.result"
      ],
      "statusStateKey": "ui.movimentacoes.listMovimentacaoEstoque.status",
      "errorStateKey": "ui.movimentacoes.listMovimentacaoEstoque.error",
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
          "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:2cff350aae09d440467e18b93b28610d222124198a6cd39c88173d4af357435d",
          "l4/controleEstoque/access.defs.ts#sha256:bf7735be84da33112ac4a039066285ac8e986233b0aee85bd2254193f779621d",
          "l4/controleEstoque/rules.defs.ts#sha256:5219a6accfd5ec5d5f6bf561a11b7f584c0aeab260ec43ad463ef021ba843e87"
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
            "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:2cff350aae09d440467e18b93b28610d222124198a6cd39c88173d4af357435d",
            "l4/controleEstoque/access.defs.ts#sha256:bf7735be84da33112ac4a039066285ac8e986233b0aee85bd2254193f779621d",
            "l4/controleEstoque/rules.defs.ts#sha256:5219a6accfd5ec5d5f6bf561a11b7f584c0aeab260ec43ad463ef021ba843e87"
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
        "ui.movimentacoes.listProduto.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.listProduto.input.id"
    },
    {
      "actionId": "set:listProduto:details.identification.subtype",
      "methodName": "setListProdutoDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes.listProduto.input.details.identification.subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.listProduto.input.details.identification.subtype"
    },
    {
      "actionId": "set:listProduto:details.identification.name",
      "methodName": "setListProdutoDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes.listProduto.input.details.identification.name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.listProduto.input.details.identification.name"
    },
    {
      "actionId": "set:listProduto:details.identification.status",
      "methodName": "setListProdutoDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.movimentacoes.listProduto.input.details.identification.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.movimentacoes.listProduto.input.details.identification.status"
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
        "ui.movimentacoes.listProduto.input.id",
        "ui.movimentacoes.listProduto.input.details.identification.subtype",
        "ui.movimentacoes.listProduto.input.details.identification.name",
        "ui.movimentacoes.listProduto.input.details.identification.status",
        "ui.movimentacoes.listProduto.input.page"
      ],
      "outputStateKeys": [
        "ui.movimentacoes.listProduto.result"
      ],
      "statusStateKey": "ui.movimentacoes.listProduto.status",
      "errorStateKey": "ui.movimentacoes.listProduto.error",
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
          "l4/controleEstoque/ontology/Produto.defs.ts#sha256:94864a1a4088484a4ecb947ea7924a069aaab6c6b00f49bcd8a61875f584b348",
          "l4/controleEstoque/access.defs.ts#sha256:bf7735be84da33112ac4a039066285ac8e986233b0aee85bd2254193f779621d",
          "l4/controleEstoque/rules.defs.ts#sha256:5219a6accfd5ec5d5f6bf561a11b7f584c0aeab260ec43ad463ef021ba843e87"
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
            "l4/controleEstoque/ontology/Produto.defs.ts#sha256:94864a1a4088484a4ecb947ea7924a069aaab6c6b00f49bcd8a61875f584b348",
            "l4/controleEstoque/access.defs.ts#sha256:bf7735be84da33112ac4a039066285ac8e986233b0aee85bd2254193f779621d",
            "l4/controleEstoque/rules.defs.ts#sha256:5219a6accfd5ec5d5f6bf561a11b7f584c0aeab260ec43ad463ef021ba843e87"
          ]
        }
      ]
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listMovimentacaoEstoque",
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
            "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:2cff350aae09d440467e18b93b28610d222124198a6cd39c88173d4af357435d",
            "l4/controleEstoque/access.defs.ts#sha256:bf7735be84da33112ac4a039066285ac8e986233b0aee85bd2254193f779621d",
            "l4/controleEstoque/rules.defs.ts#sha256:5219a6accfd5ec5d5f6bf561a11b7f584c0aeab260ec43ad463ef021ba843e87"
          ]
        }
      ]
    },
    {
      "value": "createMovimentacaoEstoque",
      "kind": "command",
      "actionId": "createMovimentacaoEstoque",
      "preconditions": [
        "ui.movimentacoes.createMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm",
        "ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo",
        "ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade"
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
            "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts#sha256:2cff350aae09d440467e18b93b28610d222124198a6cd39c88173d4af357435d",
            "l4/controleEstoque/access.defs.ts#sha256:bf7735be84da33112ac4a039066285ac8e986233b0aee85bd2254193f779621d",
            "l4/controleEstoque/rules.defs.ts#sha256:5219a6accfd5ec5d5f6bf561a11b7f584c0aeab260ec43ad463ef021ba843e87"
          ]
        }
      ]
    }
  ],
  "initialLoads": [
    {
      "actionId": "listMovimentacaoEstoque",
      "stateKey": "ui.movimentacoes.listMovimentacaoEstoque.result"
    },
    {
      "actionId": "listProduto",
      "stateKey": "ui.movimentacoes.listProduto.result"
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
        "ui.movimentacoes.createMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm",
        "ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo",
        "ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade"
      ],
      "resultStateKey": "ui.movimentacoes.createMovimentacaoEstoque.result"
    },
    {
      "actionId": "listMovimentacaoEstoque",
      "kind": "query",
      "routeRef": "listMovimentacaoEstoqueRoute",
      "inputTypeRef": "ListMovimentacaoEstoqueInput",
      "outputTypeRef": "ListMovimentacaoEstoqueOutput",
      "inputStateKeys": [
        "ui.movimentacoes.listMovimentacaoEstoque.input.id",
        "ui.movimentacoes.listMovimentacaoEstoque.input.produtoId",
        "ui.movimentacoes.listMovimentacaoEstoque.input.movimentadoEm",
        "ui.movimentacoes.listMovimentacaoEstoque.input.page"
      ],
      "resultStateKey": "ui.movimentacoes.listMovimentacaoEstoque.result"
    },
    {
      "actionId": "listProduto",
      "kind": "query",
      "routeRef": "listProdutoRoute",
      "inputTypeRef": "ListProdutoInput",
      "outputTypeRef": "ListProdutoOutput",
      "inputStateKeys": [
        "ui.movimentacoes.listProduto.input.id",
        "ui.movimentacoes.listProduto.input.details.identification.subtype",
        "ui.movimentacoes.listProduto.input.details.identification.name",
        "ui.movimentacoes.listProduto.input.details.identification.status",
        "ui.movimentacoes.listProduto.input.page"
      ],
      "resultStateKey": "ui.movimentacoes.listProduto.result"
    }
  ],
  "coverage": [
    {
      "organismId": "organism.list.1",
      "sourceIndex": 0,
      "kind": "list",
      "contentRef": "content.list",
      "content": "Acompanho as entradas e saídas já registradas.",
      "scenarioRefs": [
        "base",
        "createMovimentacaoEstoque"
      ],
      "capabilityRefs": [
        "createMovimentacaoEstoque",
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "outputFieldsByCapability": {
        "createMovimentacaoEstoque": [],
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
        "text": "Acompanho as entradas e saídas já registradas."
      }
    },
    {
      "organismId": "organism.form.1",
      "sourceIndex": 1,
      "kind": "form",
      "contentRef": "content.form",
      "content": "Registro uma entrada ou saída de unidades de um produto.",
      "scenarioRefs": [
        "base",
        "createMovimentacaoEstoque"
      ],
      "capabilityRefs": [
        "createMovimentacaoEstoque",
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "outputFieldsByCapability": {
        "createMovimentacaoEstoque": [],
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
        "text": "Registro uma entrada ou saída de unidades de um produto."
      }
    },
    {
      "organismId": "organism.actions.1",
      "sourceIndex": 2,
      "kind": "actions",
      "contentRef": "content.actions",
      "content": "Registro a movimentação e atualizo o saldo.",
      "scenarioRefs": [
        "base",
        "createMovimentacaoEstoque"
      ],
      "capabilityRefs": [
        "createMovimentacaoEstoque",
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "outputFieldsByCapability": {
        "createMovimentacaoEstoque": [],
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
        "text": "Registro a movimentação e atualizo o saldo."
      }
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "movimentacoes__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
    "outputPath": "l2/controleEstoque/web/shared/movimentacoes.ts",
    "dependsFiles": [
      "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
