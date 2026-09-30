/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-29-agent-defs-l2-definition-v1",
  "artifactType": "shared",
  "pageId": "produtos",
  "intent": "Vejo o saldo atual de cada produto do estoque. Identifico os produtos com saldo abaixo da quantidade mínima. Localizo os produtos cadastrados no estoque. Consulto o produto, o saldo atual e a quantidade mínima. Informo o produto e a quantidade mínima para acompanhamento do estoque. Cadastro o produto.",
  "references": [
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/access.defs.ts"
    },
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts"
    },
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/ontology/Produto.defs.ts"
    },
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/rules.defs.ts"
    },
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/workflows.defs.ts"
    }
  ],
  "contractRef": {
    "purpose": "page operation contract",
    "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts"
  },
  "states": [
    {
      "id": "stateCreateMovimentacaoEstoqueProdutoId",
      "purpose": "Produto",
      "origin": {
        "purpose": "selectedEntity",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.produtoId"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.produtoId"
      },
      "uiType": "string",
      "required": true,
      "selection": {
        "sourceActionRef": "listProduto",
        "resultStateRef": "stateListProdutoResult",
        "identityRef": {
          "purpose": "selected record identity",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.id"
        }
      },
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false
    },
    {
      "id": "stateCreateMovimentacaoEstoqueMovimentadoEm",
      "purpose": "Data e hora da movimentação",
      "origin": {
        "purpose": "userInput",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.movimentadoEm"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.movimentadoEm"
      },
      "uiType": "string",
      "required": true,
      "source": "userInput",
      "presentation": "form",
      "editable": true
    },
    {
      "id": "stateCreateMovimentacaoEstoqueDetailsTipo",
      "purpose": "Tipo de movimentação",
      "origin": {
        "purpose": "userInput",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.details.tipo"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.details.tipo"
      },
      "uiType": "string",
      "required": true,
      "values": [
        "entrada",
        "saida"
      ],
      "source": "userInput",
      "presentation": "form",
      "editable": true
    },
    {
      "id": "stateCreateMovimentacaoEstoqueDetailsQuantidade",
      "purpose": "Quantidade",
      "origin": {
        "purpose": "userInput",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.details.quantidade"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.details.quantidade"
      },
      "uiType": "number",
      "required": true,
      "source": "userInput",
      "presentation": "form",
      "editable": true
    },
    {
      "id": "stateCreateMovimentacaoEstoqueResult",
      "purpose": "create result",
      "typeRef": {
        "purpose": "contract output type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueOutput"
      }
    },
    {
      "id": "stateCreateMovimentacaoEstoqueStatus",
      "purpose": "request feedback status",
      "uiType": "string",
      "initialValue": "idle",
      "values": [
        "idle",
        "loading",
        "success",
        "error"
      ]
    },
    {
      "id": "stateCreateMovimentacaoEstoqueError",
      "purpose": "request feedback error",
      "uiType": "object"
    },
    {
      "id": "stateCreateProdutoDetailsIdentificationName",
      "purpose": "Nome do produto",
      "origin": {
        "purpose": "userInput",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateProdutoInput.details.identification.name"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateProdutoInput.details.identification.name"
      },
      "uiType": "string",
      "required": false,
      "source": "userInput",
      "presentation": "form",
      "editable": true
    },
    {
      "id": "stateCreateProdutoDetailsProductUnitOfMeasure",
      "purpose": "Unidade de medida",
      "origin": {
        "purpose": "userInput",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateProdutoInput.details.product.unitOfMeasure"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateProdutoInput.details.product.unitOfMeasure"
      },
      "uiType": "string",
      "required": false,
      "source": "userInput",
      "presentation": "form",
      "editable": true
    },
    {
      "id": "stateCreateProdutoDetailsControleEstoqueQuantidadeMinima",
      "purpose": "Quantidade mínima",
      "origin": {
        "purpose": "userInput",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateProdutoInput.details.controleEstoque.quantidadeMinima"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateProdutoInput.details.controleEstoque.quantidadeMinima"
      },
      "uiType": "number",
      "required": false,
      "source": "userInput",
      "presentation": "form",
      "editable": true
    },
    {
      "id": "stateCreateProdutoResult",
      "purpose": "create result",
      "typeRef": {
        "purpose": "contract output type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "CreateProdutoOutput"
      }
    },
    {
      "id": "stateCreateProdutoStatus",
      "purpose": "request feedback status",
      "uiType": "string",
      "initialValue": "idle",
      "values": [
        "idle",
        "loading",
        "success",
        "error"
      ]
    },
    {
      "id": "stateCreateProdutoError",
      "purpose": "request feedback error",
      "uiType": "object"
    },
    {
      "id": "stateListMovimentacaoEstoquePage",
      "purpose": "routeParam page",
      "origin": {
        "purpose": "routeParam",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "ListMovimentacaoEstoqueInput.page"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "ListMovimentacaoEstoqueInput.page"
      },
      "uiType": "number",
      "required": false,
      "source": "routeParam",
      "presentation": "route",
      "editable": false
    },
    {
      "id": "stateListMovimentacaoEstoqueResult",
      "purpose": "list result",
      "typeRef": {
        "purpose": "contract output type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "ListMovimentacaoEstoqueOutput"
      },
      "uiType": "object"
    },
    {
      "id": "stateListMovimentacaoEstoqueStatus",
      "purpose": "request feedback status",
      "uiType": "string",
      "initialValue": "idle",
      "values": [
        "idle",
        "loading",
        "success",
        "error"
      ]
    },
    {
      "id": "stateListMovimentacaoEstoqueError",
      "purpose": "request feedback error",
      "uiType": "object"
    },
    {
      "id": "stateListProdutoPage",
      "purpose": "routeParam page",
      "origin": {
        "purpose": "routeParam",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "ListProdutoInput.page"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "ListProdutoInput.page"
      },
      "uiType": "number",
      "required": false,
      "source": "routeParam",
      "presentation": "route",
      "editable": false
    },
    {
      "id": "stateListProdutoResult",
      "purpose": "list result",
      "typeRef": {
        "purpose": "contract output type",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "ListProdutoOutput"
      },
      "uiType": "object"
    },
    {
      "id": "stateListProdutoStatus",
      "purpose": "request feedback status",
      "uiType": "string",
      "initialValue": "idle",
      "values": [
        "idle",
        "loading",
        "success",
        "error"
      ]
    },
    {
      "id": "stateListProdutoError",
      "purpose": "request feedback error",
      "uiType": "object"
    }
  ],
  "actions": [
    {
      "id": "createMovimentacaoEstoque",
      "callRef": {
        "purpose": "create operation",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "createMovimentacaoEstoqueRoute"
      },
      "inputs": [
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
            "fragment": "CreateMovimentacaoEstoqueInput.produtoId"
          },
          "stateRef": "stateCreateMovimentacaoEstoqueProdutoId"
        },
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
            "fragment": "CreateMovimentacaoEstoqueInput.movimentadoEm"
          },
          "stateRef": "stateCreateMovimentacaoEstoqueMovimentadoEm"
        },
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
            "fragment": "CreateMovimentacaoEstoqueInput.details.tipo"
          },
          "stateRef": "stateCreateMovimentacaoEstoqueDetailsTipo"
        },
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
            "fragment": "CreateMovimentacaoEstoqueInput.details.quantidade"
          },
          "stateRef": "stateCreateMovimentacaoEstoqueDetailsQuantidade"
        }
      ],
      "resultStateRef": "stateCreateMovimentacaoEstoqueResult",
      "statusStateRef": "stateCreateMovimentacaoEstoqueStatus",
      "errorStateRef": "stateCreateMovimentacaoEstoqueError",
      "refreshActionRefs": [
        "listMovimentacaoEstoque",
        "listProduto"
      ],
      "authorityRefs": [
        {
          "purpose": "actor estoquista",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "actors.estoquista"
        },
        {
          "purpose": "grant gerenciarEstoque",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "grants.gerenciarEstoque"
        },
        {
          "purpose": "authority estoquista",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "authorities.estoquista"
        },
        {
          "purpose": "rule movimentacaoEstoqueImutavel",
          "fileRef": "l4/controleEstoque/rules.defs.ts",
          "fragment": "rules.movimentacaoEstoqueImutavel"
        },
        {
          "purpose": "rule quantidadeMovimentadaPositiva",
          "fileRef": "l4/controleEstoque/rules.defs.ts",
          "fragment": "rules.quantidadeMovimentadaPositiva"
        },
        {
          "purpose": "rule registroMovimentacaoAtualizaSaldo",
          "fileRef": "l4/controleEstoque/rules.defs.ts",
          "fragment": "rules.registroMovimentacaoAtualizaSaldo"
        }
      ]
    },
    {
      "id": "createProduto",
      "callRef": {
        "purpose": "create operation",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "createProdutoRoute"
      },
      "inputs": [
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
            "fragment": "CreateProdutoInput.details.identification.name"
          },
          "stateRef": "stateCreateProdutoDetailsIdentificationName"
        },
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
            "fragment": "CreateProdutoInput.details.product.unitOfMeasure"
          },
          "stateRef": "stateCreateProdutoDetailsProductUnitOfMeasure"
        },
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
            "fragment": "CreateProdutoInput.details.controleEstoque.quantidadeMinima"
          },
          "stateRef": "stateCreateProdutoDetailsControleEstoqueQuantidadeMinima"
        }
      ],
      "resultStateRef": "stateCreateProdutoResult",
      "statusStateRef": "stateCreateProdutoStatus",
      "errorStateRef": "stateCreateProdutoError",
      "refreshActionRefs": [
        "listProduto"
      ],
      "authorityRefs": [
        {
          "purpose": "actor estoquista",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "actors.estoquista"
        },
        {
          "purpose": "grant gerenciarEstoque",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "grants.gerenciarEstoque"
        },
        {
          "purpose": "authority estoquista",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "authorities.estoquista"
        },
        {
          "purpose": "rule rule-foreign-namespace-refused",
          "fileRef": "l4/controleEstoque/ontology/Produto.defs.ts",
          "fragment": "rules[rule-foreign-namespace-refused]"
        },
        {
          "purpose": "rule rule-document-shape-validated",
          "fileRef": "l4/controleEstoque/ontology/Produto.defs.ts",
          "fragment": "rules[rule-document-shape-validated]"
        },
        {
          "purpose": "rule rule-identity-never-in-namespace",
          "fileRef": "l4/controleEstoque/ontology/Produto.defs.ts",
          "fragment": "rules[rule-identity-never-in-namespace]"
        },
        {
          "purpose": "rule quantidadeMinimaValida",
          "fileRef": "l4/controleEstoque/rules.defs.ts",
          "fragment": "rules.quantidadeMinimaValida"
        },
        {
          "purpose": "rule saldoAtualProduto",
          "fileRef": "l4/controleEstoque/rules.defs.ts",
          "fragment": "rules.saldoAtualProduto"
        },
        {
          "purpose": "rule avisoSaldoMinimoProduto",
          "fileRef": "l4/controleEstoque/rules.defs.ts",
          "fragment": "rules.avisoSaldoMinimoProduto"
        }
      ]
    },
    {
      "id": "listMovimentacaoEstoque",
      "callRef": {
        "purpose": "list operation",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "listMovimentacaoEstoqueRoute"
      },
      "inputs": [
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
            "fragment": "ListMovimentacaoEstoqueInput.page"
          },
          "stateRef": "stateListMovimentacaoEstoquePage"
        }
      ],
      "resultStateRef": "stateListMovimentacaoEstoqueResult",
      "statusStateRef": "stateListMovimentacaoEstoqueStatus",
      "errorStateRef": "stateListMovimentacaoEstoqueError",
      "authorityRefs": [
        {
          "purpose": "actor estoquista",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "actors.estoquista"
        },
        {
          "purpose": "grant gerenciarEstoque",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "grants.gerenciarEstoque"
        },
        {
          "purpose": "authority estoquista",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "authorities.estoquista"
        }
      ],
      "initialLoad": true
    },
    {
      "id": "listProduto",
      "callRef": {
        "purpose": "list operation",
        "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "fragment": "listProdutoRoute"
      },
      "inputs": [
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
            "fragment": "ListProdutoInput.page"
          },
          "stateRef": "stateListProdutoPage"
        }
      ],
      "resultStateRef": "stateListProdutoResult",
      "statusStateRef": "stateListProdutoStatus",
      "errorStateRef": "stateListProdutoError",
      "authorityRefs": [
        {
          "purpose": "actor estoquista",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "actors.estoquista"
        },
        {
          "purpose": "grant gerenciarEstoque",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "grants.gerenciarEstoque"
        },
        {
          "purpose": "authority estoquista",
          "fileRef": "l4/controleEstoque/access.defs.ts",
          "fragment": "authorities.estoquista"
        }
      ],
      "initialLoad": true
    }
  ],
  "contents": [
    {
      "id": "contentSummary",
      "intent": "Vejo o saldo atual de cada produto do estoque.",
      "visibleWhen": [
        {
          "purpose": "visible in scenario base",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.base"
        },
        {
          "purpose": "visible in scenario createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createMovimentacaoEstoque"
        },
        {
          "purpose": "visible in scenario createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createProduto"
        }
      ],
      "inactiveBehavior": "hiddenInertOutOfFocus"
    },
    {
      "id": "contentHighlights",
      "intent": "Identifico os produtos com saldo abaixo da quantidade mínima.",
      "visibleWhen": [
        {
          "purpose": "visible in scenario base",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.base"
        },
        {
          "purpose": "visible in scenario createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createMovimentacaoEstoque"
        },
        {
          "purpose": "visible in scenario createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createProduto"
        }
      ],
      "inactiveBehavior": "hiddenInertOutOfFocus"
    },
    {
      "id": "contentList",
      "intent": "Localizo os produtos cadastrados no estoque.",
      "visibleWhen": [
        {
          "purpose": "visible in scenario base",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.base"
        },
        {
          "purpose": "visible in scenario createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createMovimentacaoEstoque"
        },
        {
          "purpose": "visible in scenario createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createProduto"
        }
      ],
      "inactiveBehavior": "hiddenInertOutOfFocus"
    },
    {
      "id": "contentDetail",
      "intent": "Consulto o produto, o saldo atual e a quantidade mínima.",
      "visibleWhen": [
        {
          "purpose": "visible in scenario base",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.base"
        },
        {
          "purpose": "visible in scenario createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createMovimentacaoEstoque"
        },
        {
          "purpose": "visible in scenario createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createProduto"
        }
      ],
      "inactiveBehavior": "hiddenInertOutOfFocus"
    },
    {
      "id": "contentForm",
      "intent": "Informo o produto e a quantidade mínima para acompanhamento do estoque.",
      "visibleWhen": [
        {
          "purpose": "visible in scenario base",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.base"
        },
        {
          "purpose": "visible in scenario createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createMovimentacaoEstoque"
        },
        {
          "purpose": "visible in scenario createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createProduto"
        }
      ],
      "inactiveBehavior": "hiddenInertOutOfFocus"
    },
    {
      "id": "contentActions",
      "intent": "Cadastro o produto.",
      "visibleWhen": [
        {
          "purpose": "visible in scenario base",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.base"
        },
        {
          "purpose": "visible in scenario createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createMovimentacaoEstoque"
        },
        {
          "purpose": "visible in scenario createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "scenarios.createProduto"
        }
      ],
      "inactiveBehavior": "hiddenInertOutOfFocus"
    }
  ],
  "scenarios": [
    {
      "id": "base",
      "actionRef": "listProduto",
      "contentRefs": [
        "contentSummary",
        "contentHighlights",
        "contentList",
        "contentDetail",
        "contentForm",
        "contentActions"
      ],
      "preconditions": []
    },
    {
      "id": "createMovimentacaoEstoque",
      "actionRef": "createMovimentacaoEstoque",
      "contentRefs": [
        "contentSummary",
        "contentHighlights",
        "contentList",
        "contentDetail",
        "contentForm",
        "contentActions"
      ],
      "preconditions": [
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "CreateMovimentacaoEstoqueInput.produtoId"
        },
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "CreateMovimentacaoEstoqueInput.movimentadoEm"
        },
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "CreateMovimentacaoEstoqueInput.details.tipo"
        },
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "CreateMovimentacaoEstoqueInput.details.quantidade"
        }
      ]
    },
    {
      "id": "createProduto",
      "actionRef": "createProduto",
      "contentRefs": [
        "contentSummary",
        "contentHighlights",
        "contentList",
        "contentDetail",
        "contentForm",
        "contentActions"
      ],
      "preconditions": [
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "CreateProdutoInput.details.identification.name"
        },
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "CreateProdutoInput.details.product.unitOfMeasure"
        },
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "CreateProdutoInput.details.controleEstoque.quantidadeMinima"
        }
      ]
    }
  ],
  "authorityRefs": [
    {
      "purpose": "actor estoquista",
      "fileRef": "l4/controleEstoque/access.defs.ts",
      "fragment": "actors.estoquista"
    },
    {
      "purpose": "grant gerenciarEstoque",
      "fileRef": "l4/controleEstoque/access.defs.ts",
      "fragment": "grants.gerenciarEstoque"
    },
    {
      "purpose": "authority estoquista",
      "fileRef": "l4/controleEstoque/access.defs.ts",
      "fragment": "authorities.estoquista"
    },
    {
      "purpose": "rule movimentacaoEstoqueImutavel",
      "fileRef": "l4/controleEstoque/rules.defs.ts",
      "fragment": "rules.movimentacaoEstoqueImutavel"
    },
    {
      "purpose": "rule quantidadeMovimentadaPositiva",
      "fileRef": "l4/controleEstoque/rules.defs.ts",
      "fragment": "rules.quantidadeMovimentadaPositiva"
    },
    {
      "purpose": "rule registroMovimentacaoAtualizaSaldo",
      "fileRef": "l4/controleEstoque/rules.defs.ts",
      "fragment": "rules.registroMovimentacaoAtualizaSaldo"
    },
    {
      "purpose": "rule rule-foreign-namespace-refused",
      "fileRef": "l4/controleEstoque/ontology/Produto.defs.ts",
      "fragment": "rules[rule-foreign-namespace-refused]"
    },
    {
      "purpose": "rule rule-document-shape-validated",
      "fileRef": "l4/controleEstoque/ontology/Produto.defs.ts",
      "fragment": "rules[rule-document-shape-validated]"
    },
    {
      "purpose": "rule rule-identity-never-in-namespace",
      "fileRef": "l4/controleEstoque/ontology/Produto.defs.ts",
      "fragment": "rules[rule-identity-never-in-namespace]"
    },
    {
      "purpose": "rule quantidadeMinimaValida",
      "fileRef": "l4/controleEstoque/rules.defs.ts",
      "fragment": "rules.quantidadeMinimaValida"
    },
    {
      "purpose": "rule saldoAtualProduto",
      "fileRef": "l4/controleEstoque/rules.defs.ts",
      "fragment": "rules.saldoAtualProduto"
    },
    {
      "purpose": "rule avisoSaldoMinimoProduto",
      "fileRef": "l4/controleEstoque/rules.defs.ts",
      "fragment": "rules.avisoSaldoMinimoProduto"
    },
    {
      "purpose": "page authority actor:estoquista",
      "fileRef": "l4/controleEstoque/access.defs.ts",
      "fragment": "authorities.actor:estoquista"
    }
  ]
} as const;
