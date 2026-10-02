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
    "historicoMovimentacoes": {
      "source": "load.movimentacoes",
      "description": "Movimentações registradas do produto filtrado."
    },
    "produtos": {
      "source": "load.produtos",
      "description": "Produtos disponíveis com saldo e aviso de estoque."
    },
    "produtoId": {
      "source": "entry.params.produtoId",
      "description": "Identificador do produto usado no filtro do histórico."
    },
    "paginaHistorico": {
      "source": "entry.params.page",
      "description": "Página solicitada do histórico de movimentações."
    },
    "movimentacaoEmEdicao": {
      "source": "registrarMovimentacao.input",
      "description": "Dados da movimentação a registrar."
    },
    "movimentacaoRegistrada": {
      "source": "registrarMovimentacao.movimentacaoEstoque",
      "description": "Movimentação de estoque registrada."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega o histórico inicial de movimentações e os produtos.",
      "calls": "load",
      "sets": "historicoMovimentacoes",
      "updates": [
        "produtos"
      ]
    },
    "filterHistoricoMovimentacoes": {
      "description": "Recarrega a primeira página do histórico conforme produto e página.",
      "calls": "loadMovimentacoes",
      "sets": "historicoMovimentacoes",
      "updates": []
    },
    "loadMoreHistoricoMovimentacoes": {
      "description": "Acrescenta a próxima página ao histórico de movimentações.",
      "calls": "loadMovimentacoes",
      "sets": "historicoMovimentacoes",
      "updates": []
    },
    "registrarMovimentacao": {
      "description": "Registra a movimentação e atualiza os saldos do produto.",
      "calls": "registrarMovimentacao",
      "sets": "movimentacaoRegistrada",
      "updates": [
        "historicoMovimentacoes",
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
