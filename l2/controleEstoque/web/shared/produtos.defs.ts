/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "produtoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheProduto",
        "persist": true
      },
      "search": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaProdutos",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaProdutos",
        "persist": true
      }
    }
  },
  "forms": {
    "formularioCadastro": {
      "organism": "formularioCadastro",
      "submit": "cadastrarProduto"
    }
  },
  "requests": {
    "load": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "produtos"
      ]
    },
    "loadProdutos": {
      "kind": "qry",
      "trigger": "loadProdutos",
      "returns": [
        "produtos"
      ]
    },
    "cadastrarProduto": {
      "kind": "cmd",
      "trigger": "cadastrarProduto",
      "returns": [
        "produto"
      ],
      "writes": "Produto.create"
    }
  },
  "states": {
    "produtos": {
      "source": "load.produtos",
      "description": "Produtos carregados para consulta, saldos e alertas."
    },
    "produtoSelecionado": {
      "source": "entry.params.produtoId",
      "description": "Produto selecionado para detalhamento."
    },
    "buscaProdutos": {
      "source": "entry.params.search",
      "description": "Busca aplicada à lista de produtos."
    },
    "paginaProdutos": {
      "source": "entry.params.page",
      "description": "Página da lista de produtos."
    },
    "produtoCadastro": {
      "source": "cadastrarProduto.input",
      "description": "Dados do produto informados para cadastro."
    },
    "produtoCadastrado": {
      "source": "cadastrarProduto.produto",
      "description": "Produto retornado após o cadastro."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega os produtos, saldos e alertas de estoque.",
      "calls": "load",
      "sets": "produtos"
    },
    "filterListaProdutos": {
      "description": "Recarrega a primeira página de produtos conforme os filtros.",
      "calls": "loadProdutos",
      "sets": "produtos"
    },
    "loadMoreListaProdutos": {
      "description": "Carrega a próxima página de produtos.",
      "calls": "loadProdutos",
      "sets": "produtos"
    },
    "cadastrarProduto": {
      "description": "Cadastra o produto informado e atualiza a lista de produtos.",
      "calls": "cadastrarProduto",
      "sets": "produtoCadastrado",
      "updates": [
        "produtos"
      ]
    },
    "abrirMovimentacoes": {
      "description": "Abre as movimentações do produto selecionado.",
      "navigate": "movimentacoes",
      "carries": {
        "produtoId": "produtoSelecionado.id"
      }
    }
  },
  "journeys": [
    {
      "step": "acompanharSaldos/consultarSaldos",
      "organisms": [
        "saldosResumo",
        "alertasSaldoBaixo",
        "listaProdutos"
      ],
      "functions": [
        "load"
      ]
    },
    {
      "step": "acompanharSaldos/localizarProdutos",
      "organisms": [
        "listaProdutos"
      ],
      "functions": [
        "filterListaProdutos",
        "loadMoreListaProdutos"
      ]
    },
    {
      "step": "cadastrarProduto/informarProduto",
      "organisms": [
        "formularioCadastro",
        "acoesCadastro"
      ],
      "functions": [
        "cadastrarProduto"
      ]
    },
    {
      "step": "registrarMovimentacaoEstoque/consultarSaldo",
      "organisms": [
        "detalheProduto"
      ],
      "functions": [
        "abrirMovimentacoes"
      ],
      "continuesIn": "movimentacoes"
    },
    {
      "step": "registrarMovimentacaoEstoque/localizarProduto",
      "organisms": [
        "listaProdutos",
        "detalheProduto"
      ],
      "functions": [
        "abrirMovimentacoes"
      ],
      "continuesIn": "movimentacoes"
    },
    {
      "step": "registrarMovimentacaoEstoque/registrarMovimentacao",
      "organisms": [
        "detalheProduto"
      ],
      "functions": [
        "abrirMovimentacoes"
      ],
      "continuesIn": "movimentacoes"
    },
    {
      "step": "tratarAvisoSaldoBaixo/consultarProdutoAvisado",
      "organisms": [
        "alertasSaldoBaixo",
        "detalheProduto"
      ],
      "functions": [
        "abrirMovimentacoes"
      ],
      "continuesIn": "movimentacoes"
    }
  ],
  "rules": {
    "load": [
      "saldoAtualProduto",
      "avisoSaldoMinimoProduto"
    ],
    "loadProdutos": [
      "saldoAtualProduto",
      "avisoSaldoMinimoProduto"
    ],
    "cadastrarProduto": [
      "quantidadeMinimaValida"
    ]
  },
  "access": {
    "actors": [
      "estoquista"
    ],
    "grants": [
      "gerenciarEstoque"
    ]
  }
} as const;
