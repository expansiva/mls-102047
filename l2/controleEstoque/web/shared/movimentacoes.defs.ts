/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "produtoId": {
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
      }
    }
  },
  "forms": {
    "formularioMovimentacao": {
      "organism": "formularioMovimentacao",
      "submit": "registrarMovimentacao"
    }
  },
  "requests": {
    "load": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "movimentacoes",
        "produtos"
      ]
    },
    "loadMovimentacoes": {
      "kind": "qry",
      "trigger": "loadMovimentacoes",
      "returns": [
        "movimentacoes"
      ]
    },
    "registrarMovimentacao": {
      "kind": "cmd",
      "trigger": "registrarMovimentacao",
      "returns": [
        "movimentacaoEstoque",
        "produto"
      ],
      "writes": "MovimentacaoEstoque.create"
    }
  },
  "states": {
    "movimentacoes": {
      "source": "load.movimentacoes",
      "description": "Histórico de movimentações carregado."
    },
    "produtos": {
      "source": "load.produtos",
      "description": "Produtos com saldo e aviso de estoque."
    },
    "produtoIdFiltro": {
      "source": "entry.params.produtoId",
      "description": "Produto usado para filtrar o histórico."
    },
    "paginaHistorico": {
      "source": "entry.params.page",
      "description": "Página solicitada do histórico."
    },
    "movimentacaoEmEdicao": {
      "source": "registrarMovimentacao.input",
      "description": "Dados da movimentação em preenchimento."
    },
    "movimentacaoRegistrada": {
      "source": "registrarMovimentacao.movimentacaoEstoque",
      "description": "Movimentação registrada."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega produtos e o histórico inicial de movimentações.",
      "calls": "load",
      "sets": "movimentacoes",
      "updates": [
        "produtos"
      ]
    },
    "filterHistoricoMovimentacoes": {
      "description": "Recarrega o histórico desde a primeira página conforme o produto e a página informados.",
      "calls": "loadMovimentacoes",
      "sets": "movimentacoes",
      "updates": []
    },
    "loadMoreHistoricoMovimentacoes": {
      "description": "Acrescenta a próxima página ao histórico de movimentações.",
      "calls": "loadMovimentacoes",
      "sets": "movimentacoes",
      "updates": []
    },
    "registrarMovimentacao": {
      "description": "Registra a movimentação de estoque e atualiza o histórico e o saldo do produto.",
      "calls": "registrarMovimentacao",
      "sets": "movimentacaoRegistrada",
      "updates": [
        "movimentacoes",
        "produtos"
      ]
    }
  },
  "journeys": [
    {
      "step": "registrarMovimentacaoEstoque/consultarSaldo",
      "organisms": [
        "formularioMovimentacao",
        "confirmarMovimentacao"
      ],
      "functions": [
        "load"
      ]
    },
    {
      "step": "registrarMovimentacaoEstoque/localizarProduto",
      "organisms": [
        "formularioMovimentacao",
        "historicoMovimentacoes"
      ],
      "functions": [
        "filterHistoricoMovimentacoes",
        "loadMoreHistoricoMovimentacoes"
      ]
    },
    {
      "step": "registrarMovimentacaoEstoque/registrarMovimentacao",
      "organisms": [
        "formularioMovimentacao",
        "confirmarMovimentacao"
      ],
      "functions": [
        "registrarMovimentacao"
      ]
    }
  ],
  "rules": {
    "load": [
      "saldoAtualProduto",
      "avisoSaldoMinimoProduto"
    ],
    "loadMovimentacoes": [],
    "registrarMovimentacao": [
      "quantidadeMovimentadaPositiva",
      "registroMovimentacaoAtualizaSaldo"
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
