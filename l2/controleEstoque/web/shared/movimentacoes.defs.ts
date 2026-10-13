/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "tipo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:historicoMovimentacoes",
        "persist": true
      },
      "registradoDe": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:historicoMovimentacoes",
        "persist": true
      },
      "registradoAte": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:historicoMovimentacoes",
        "persist": true
      },
      "numero": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:historicoMovimentacoes",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:historicoMovimentacoes",
        "persist": true
      },
      "texto": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:registroMovimentacao",
        "persist": true
      },
      "produtoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Produto",
        "persist": true
      }
    }
  },
  "forms": {
    "registrarMovimentacao": {
      "organism": "registroMovimentacao",
      "submit": "registrarMovimentacao"
    }
  },
  "requests": {
    "qryHistoricoMovimentacoes": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "movimentacoes"
      ]
    },
    "qryBuscarProdutos": {
      "kind": "qry",
      "trigger": "qryBuscarProdutos",
      "returns": [
        "produtos"
      ]
    },
    "qryProdutoSaldo": {
      "kind": "qry",
      "trigger": "qryProdutoSaldo",
      "returns": [
        "produto"
      ]
    },
    "cmdRegistrarMovimentacao": {
      "kind": "cmd",
      "trigger": "registrarMovimentacao",
      "returns": [
        "movimentacao",
        "produto",
        "avisoAbaixoDoMinimo"
      ],
      "writes": "Movimentacao.create"
    }
  },
  "states": {
    "movimentacoes": {
      "source": "qryHistoricoMovimentacoes.movimentacoes",
      "description": "Linha do histórico de movimentações, com o produto e sua unidade.",
      "organisms": [
        "historicoMovimentacoes"
      ]
    },
    "produtos": {
      "source": "qryBuscarProdutos.produtos",
      "description": "Produto encontrado na busca por nome, para o estoquista escolher o item da movimentação.",
      "organisms": [
        "registroMovimentacao"
      ]
    },
    "produto": {
      "source": "qryProdutoSaldo.produto",
      "description": "Produto escolhido com seu saldo atual, saldo mínimo e situação abaixo do mínimo, já calculados.",
      "organisms": [
        "acoesRegistro",
        "registroMovimentacao"
      ]
    },
    "avisoAbaixoDoMinimo": {
      "source": "cmdRegistrarMovimentacao.avisoAbaixoDoMinimo",
      "description": "movimentacao: linha nova para inserir no histórico; produto: saldo atualizado para o formulário e as ações; avisoAbaixoDoMinimo: true quando o produto ficou abaixo do mínimo, para exibir o aviso.",
      "organisms": [
        "acoesRegistro"
      ]
    }
  },
  "functions": {
    "qryHistoricoMovimentacoes": {
      "description": "Carrega o histórico permanente de entradas e saídas do estoque, paginado, ao abrir a página e quando o estoquista filtra ou pede a próxima página.",
      "calls": "qryHistoricoMovimentacoes",
      "sets": "movimentacoes"
    },
    "qryBuscarProdutos": {
      "description": "Busca produtos pelo nome enquanto o estoquista digita, para escolher o produto da movimentação.",
      "calls": "qryBuscarProdutos",
      "sets": "produtos"
    },
    "qryProdutoSaldo": {
      "description": "Lê o produto escolhido com o saldo atual e o mínimo, para o estoquista conferir antes de registrar.",
      "calls": "qryProdutoSaldo",
      "sets": "produto"
    },
    "cmdRegistrarMovimentacao": {
      "description": "Registra a entrada ou saída de quantidade do produto e devolve o que a página redesenha: a nova linha do histórico, o saldo atualizado e o aviso. (movimentacoes.items: upsert)",
      "calls": "cmdRegistrarMovimentacao",
      "sets": "produto",
      "updates": [
        "movimentacoes"
      ]
    }
  },
  "journeys": [
    {
      "step": "registrarMovimentacao/localizarProdutoMovimentacao",
      "organisms": [
        "registroMovimentacao"
      ],
      "functions": [
        "qryBuscarProdutos"
      ]
    },
    {
      "step": "registrarMovimentacao/verSaldoMovimentacao",
      "organisms": [
        "registroMovimentacao",
        "acoesRegistro"
      ],
      "functions": [
        "qryProdutoSaldo"
      ]
    },
    {
      "step": "registrarMovimentacao/registrarMovimentacaoEstoque",
      "organisms": [
        "registroMovimentacao",
        "acoesRegistro",
        "historicoMovimentacoes"
      ],
      "functions": [
        "cmdRegistrarMovimentacao",
        "qryHistoricoMovimentacoes"
      ]
    }
  ],
  "rules": {
    "qryHistoricoMovimentacoes": [],
    "qryBuscarProdutos": [],
    "qryProdutoSaldo": [
      "avisoSaldoAbaixoDoMinimo"
    ],
    "cmdRegistrarMovimentacao": [
      "quantidadePositiva",
      "movimentacaoImutavel",
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
    "Movimentacao.details.quantidade": [
      "historicoMovimentacoes",
      "registroMovimentacao"
    ],
    "Movimentacao.numero": [
      "historicoMovimentacoes"
    ],
    "Movimentacao.produtoId": [
      "historicoMovimentacoes",
      "registroMovimentacao"
    ],
    "Movimentacao.registradoEm": [
      "historicoMovimentacoes"
    ],
    "Movimentacao.tipo": [
      "historicoMovimentacoes",
      "registroMovimentacao"
    ],
    "Produto.details.controleEstoque.abaixoDoMinimo": [
      "acoesRegistro",
      "registroMovimentacao"
    ],
    "Produto.details.controleEstoque.saldoAtual": [
      "acoesRegistro",
      "registroMovimentacao"
    ],
    "Produto.details.controleEstoque.saldoMinimo": [
      "registroMovimentacao"
    ],
    "Produto.details.identification.name": [
      "historicoMovimentacoes",
      "registroMovimentacao"
    ],
    "Produto.details.product.sku": [
      "registroMovimentacao"
    ],
    "Produto.details.product.unitOfMeasure": [
      "historicoMovimentacoes",
      "registroMovimentacao"
    ]
  }
} as const;
