/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-29-agent-defs-l2-definition-v1",
  "artifactType": "shared",
  "pageId": "movimentacoes",
  "intent": "Acompanho as entradas e saídas já registradas. Registro uma entrada ou saída de unidades de um produto. Registro a movimentação e atualizo o saldo.",
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
    "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts"
  },
  "states": [
    {
      "id": "stateCreateMovimentacaoEstoqueProdutoId",
      "purpose": "Produto",
      "origin": {
        "purpose": "selectedEntity",
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.produtoId"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.produtoId"
      },
      "uiType": "string",
      "required": true,
      "selection": {
        "sourceActionRef": "listProduto",
        "resultStateRef": "stateListProdutoResult",
        "identityRef": {
          "purpose": "selected record identity",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.movimentadoEm"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.details.tipo"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "CreateMovimentacaoEstoqueInput.details.quantidade"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
      "id": "stateListMovimentacaoEstoquePage",
      "purpose": "routeParam page",
      "origin": {
        "purpose": "routeParam",
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "ListMovimentacaoEstoqueInput.page"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "ListProdutoInput.page"
      },
      "typeRef": {
        "purpose": "contract input type",
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "createMovimentacaoEstoqueRoute"
      },
      "inputs": [
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
            "fragment": "CreateMovimentacaoEstoqueInput.produtoId"
          },
          "stateRef": "stateCreateMovimentacaoEstoqueProdutoId"
        },
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
            "fragment": "CreateMovimentacaoEstoqueInput.movimentadoEm"
          },
          "stateRef": "stateCreateMovimentacaoEstoqueMovimentadoEm"
        },
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
            "fragment": "CreateMovimentacaoEstoqueInput.details.tipo"
          },
          "stateRef": "stateCreateMovimentacaoEstoqueDetailsTipo"
        },
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
      "id": "listMovimentacaoEstoque",
      "callRef": {
        "purpose": "list operation",
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "listMovimentacaoEstoqueRoute"
      },
      "inputs": [
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
        "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "fragment": "listProdutoRoute"
      },
      "inputs": [
        {
          "parameterRef": {
            "purpose": "contract input parameter",
            "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
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
      "id": "contentList",
      "intent": "Acompanho as entradas e saídas já registradas.",
      "visibleWhen": [
        {
          "purpose": "visible in scenario base",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "scenarios.base"
        },
        {
          "purpose": "visible in scenario consultarSaldo",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "scenarios.consultarSaldo"
        },
        {
          "purpose": "visible in scenario createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "scenarios.createMovimentacaoEstoque"
        }
      ],
      "inactiveBehavior": "hiddenInertOutOfFocus"
    },
    {
      "id": "contentForm",
      "intent": "Registro uma entrada ou saída de unidades de um produto.",
      "visibleWhen": [
        {
          "purpose": "visible in scenario base",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "scenarios.base"
        },
        {
          "purpose": "visible in scenario consultarSaldo",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "scenarios.consultarSaldo"
        },
        {
          "purpose": "visible in scenario createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "scenarios.createMovimentacaoEstoque"
        }
      ],
      "inactiveBehavior": "hiddenInertOutOfFocus"
    },
    {
      "id": "contentActions",
      "intent": "Registro a movimentação e atualizo o saldo.",
      "visibleWhen": [
        {
          "purpose": "visible in scenario base",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "scenarios.base"
        },
        {
          "purpose": "visible in scenario consultarSaldo",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "scenarios.consultarSaldo"
        },
        {
          "purpose": "visible in scenario createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "scenarios.createMovimentacaoEstoque"
        }
      ],
      "inactiveBehavior": "hiddenInertOutOfFocus"
    }
  ],
  "scenarios": [
    {
      "id": "base",
      "actionRef": "listMovimentacaoEstoque",
      "contentRefs": [
        "contentList",
        "contentForm",
        "contentActions"
      ],
      "preconditions": []
    },
    {
      "id": "consultarSaldo",
      "actionRef": "listProduto",
      "contentRefs": [
        "contentList",
        "contentForm",
        "contentActions"
      ],
      "preconditions": []
    },
    {
      "id": "createMovimentacaoEstoque",
      "actionRef": "createMovimentacaoEstoque",
      "contentRefs": [
        "contentList",
        "contentForm",
        "contentActions"
      ],
      "preconditions": [
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "CreateMovimentacaoEstoqueInput.produtoId"
        },
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "CreateMovimentacaoEstoqueInput.movimentadoEm"
        },
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "CreateMovimentacaoEstoqueInput.details.tipo"
        },
        {
          "purpose": "scenario precondition",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "CreateMovimentacaoEstoqueInput.details.quantidade"
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
      "purpose": "page authority actor:estoquista",
      "fileRef": "l4/controleEstoque/access.defs.ts",
      "fragment": "authorities.actor:estoquista"
    }
  ]
} as const;
