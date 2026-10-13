/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "nome": {
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
      },
      "produtoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheProduto",
        "persist": true
      }
    }
  },
  "forms": {
    "cadastrarProduto": {
      "organism": "cadastroProduto",
      "submit": "cadastrarProduto"
    }
  },
  "requests": {
    "carregarVisaoEstoque": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "resumo",
        "produtosAbaixoMinimo"
      ]
    },
    "buscarProdutos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "produtos"
      ]
    },
    "obterProduto": {
      "kind": "qry",
      "trigger": "obterProduto",
      "returns": [
        "produto"
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
    "resumo": {
      "source": "carregarVisaoEstoque.resumo",
      "description": "Indicadores do estoque já calculados no servidor.",
      "organisms": [
        "saldoResumo"
      ]
    },
    "produtosAbaixoMinimo": {
      "source": "carregarVisaoEstoque.produtosAbaixoMinimo",
      "description": "Produto com nome, catálogo, saldo mínimo, saldo atual e situação abaixo do mínimo; usado nas listas, no detalhe e no retorno do cadastro.",
      "organisms": [
        "produtosAbaixoMinimo"
      ]
    },
    "produtos": {
      "source": "buscarProdutos.produtos",
      "description": "Produto com nome, catálogo, saldo mínimo, saldo atual e situação abaixo do mínimo; usado nas listas, no detalhe e no retorno do cadastro.",
      "organisms": [
        "listaProdutos"
      ]
    },
    "produto": {
      "source": "obterProduto.produto",
      "description": "Produto com nome, catálogo, saldo mínimo, saldo atual e situação abaixo do mínimo; usado nas listas, no detalhe e no retorno do cadastro.",
      "organisms": [
        "detalheProduto"
      ]
    },
    "selectedProduto": {
      "source": "entry.params.produtoId",
      "description": "Produto com nome, catálogo, saldo mínimo, saldo atual e situação abaixo do mínimo; usado nas listas, no detalhe e no retorno do cadastro.",
      "organisms": [
        "detalheProduto",
        "listaProdutos",
        "produtosAbaixoMinimo"
      ]
    }
  },
  "functions": {
    "carregarVisaoEstoque": {
      "description": "Carrega, na abertura da página, o panorama do estoque: indicadores do saldo e os produtos abaixo do mínimo que geram aviso.",
      "calls": "carregarVisaoEstoque",
      "sets": "resumo",
      "updates": [
        "produtosAbaixoMinimo"
      ]
    },
    "buscarProdutos": {
      "description": "Lista os produtos do estoque, paginados, e localiza pelo nome o que o estoquista digita. (produtos.items: append)",
      "calls": "buscarProdutos",
      "sets": "produtos"
    },
    "obterProduto": {
      "description": "Carrega o produto escolhido na lista, no destaque de aviso ou vindo de uma notificação, com o saldo atualizado.",
      "calls": "obterProduto",
      "sets": "produto"
    },
    "cadastrarProduto": {
      "description": "Cadastra o produto no estoque com o saldo mínimo que dispara o aviso e devolve o produto gravado como confirmação. (produtos.items: upsert)",
      "calls": "cadastrarProduto",
      "updates": [
        "produtos",
        "resumo",
        "produtosAbaixoMinimo"
      ]
    },
    "registrarMovimentacao": {
      "description": "Vejo o produto escolhido, o saldo atual, o saldo mínimo e se está abaixo do mínimo; daqui sigo para registrar uma entrada ou saída.",
      "navigate": "movimentacoes",
      "carries": {
        "produtoId": "selectedProduto.id"
      }
    }
  },
  "journeys": [
    {
      "step": "cadastrarProduto/registrarProduto",
      "organisms": [
        "cadastroProduto",
        "acoesCadastro"
      ],
      "functions": [
        "cadastrarProduto"
      ]
    },
    {
      "step": "conferirAvisoMinimo/verProdutoAvisado",
      "organisms": [
        "produtosAbaixoMinimo",
        "detalheProduto"
      ],
      "functions": [
        "carregarVisaoEstoque",
        "obterProduto"
      ]
    },
    {
      "step": "consultarSaldo/localizarProdutoSaldo",
      "organisms": [
        "listaProdutos"
      ],
      "functions": [
        "buscarProdutos"
      ]
    },
    {
      "step": "consultarSaldo/verSaldoProduto",
      "organisms": [
        "detalheProduto"
      ],
      "functions": [
        "obterProduto"
      ]
    },
    {
      "step": "registrarMovimentacao/localizarProdutoMovimentacao",
      "organisms": [
        "listaProdutos"
      ],
      "functions": [
        "buscarProdutos"
      ]
    },
    {
      "step": "registrarMovimentacao/verSaldoMovimentacao",
      "organisms": [
        "detalheProduto"
      ],
      "functions": [
        "obterProduto"
      ]
    },
    {
      "step": "registrarMovimentacao/registrarMovimentacaoEstoque",
      "organisms": [
        "detalheProduto"
      ],
      "functions": [],
      "continuesIn": "movimentacoes"
    }
  ],
  "rules": {
    "carregarVisaoEstoque": [
      "avisoSaldoAbaixoDoMinimo"
    ],
    "buscarProdutos": [
      "avisoSaldoAbaixoDoMinimo"
    ],
    "obterProduto": [
      "avisoSaldoAbaixoDoMinimo"
    ],
    "cadastrarProduto": [
      "saldoMinimoNaoNegativo",
      "avisoSaldoAbaixoDoMinimo"
    ]
  },
  "access": {
    "actors": [
      "estoquista"
    ],
    "grants": [
      "gestaoCompletaEstoque"
    ]
  },
  "fields": {
    "Produto.details.controleEstoque.abaixoDoMinimo": [
      "detalheProduto",
      "listaProdutos",
      "produtosAbaixoMinimo",
      "saldoResumo"
    ],
    "Produto.details.controleEstoque.saldoAtual": [
      "detalheProduto",
      "listaProdutos",
      "produtosAbaixoMinimo",
      "saldoResumo"
    ],
    "Produto.details.controleEstoque.saldoMinimo": [
      "cadastroProduto",
      "detalheProduto",
      "produtosAbaixoMinimo"
    ],
    "Produto.details.identification.name": [
      "cadastroProduto",
      "detalheProduto",
      "listaProdutos",
      "produtosAbaixoMinimo",
      "saldoResumo"
    ],
    "Produto.details.product.category": [
      "cadastroProduto",
      "detalheProduto"
    ],
    "Produto.details.product.sku": [
      "cadastroProduto",
      "detalheProduto",
      "listaProdutos"
    ],
    "Produto.details.product.unitOfMeasure": [
      "cadastroProduto",
      "detalheProduto",
      "listaProdutos"
    ]
  }
} as const;
