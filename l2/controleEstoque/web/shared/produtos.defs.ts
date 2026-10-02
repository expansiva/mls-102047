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
      "description": "Produtos carregados para resumo de saldos, avisos, lista e detalhe."
    },
    "produtoSelecionado": {
      "source": "entry.params.produtoId",
      "description": "Produto selecionado na lista carregada."
    },
    "buscaProdutos": {
      "source": "entry.params.search",
      "description": "Termo de busca da lista de produtos."
    },
    "paginaProdutos": {
      "source": "entry.params.page",
      "description": "Página solicitada da lista de produtos."
    },
    "produtoCadastro": {
      "source": "cadastrarProduto.input",
      "description": "Dados do produto em cadastro."
    },
    "produtoCadastrado": {
      "source": "cadastrarProduto.produto",
      "description": "Produto criado no cadastro."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega produtos para saldos, avisos, lista e detalhe.",
      "calls": "load",
      "sets": "produtos",
      "updates": [
        "produtoSelecionado"
      ]
    },
    "filterListaProdutos": {
      "description": "Recarrega a primeira página de produtos conforme a busca e a página.",
      "calls": "loadProdutos",
      "sets": "produtos",
      "updates": [
        "produtoSelecionado"
      ]
    },
    "loadMoreListaProdutos": {
      "description": "Acrescenta a próxima página de produtos conforme a busca e a página.",
      "calls": "loadProdutos",
      "sets": "produtos",
      "updates": [
        "produtoSelecionado"
      ]
    },
    "cadastrarProduto": {
      "description": "Cria o produto informado e atualiza os produtos carregados.",
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
        "alertasSaldoBaixo"
      ],
      "functions": [
        "load"
      ]
    },
    {
      "step": "acompanharSaldos/localizarProdutos",
      "organisms": [
        "listaProdutos",
        "detalheProduto"
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
        "filterListaProdutos",
        "loadMoreListaProdutos",
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
        "load"
      ]
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
