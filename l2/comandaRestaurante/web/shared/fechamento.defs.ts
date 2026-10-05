/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/fechamento.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "comandaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:comandaReview",
        "persist": true
      },
      "number": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:openComandaList",
        "persist": true
      },
      "mesaCode": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:openComandaList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:openComandaList",
        "persist": true
      },
      "id": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:comandaReview",
        "persist": true
      }
    }
  },
  "forms": {
    "fecharComandaPaga": {
      "organism": "paymentForm",
      "submit": "fecharComandaPaga"
    }
  },
  "requests": {
    "carregarFechamento": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "openComandas",
        "selectedComanda"
      ]
    },
    "buscarComandasAbertas": {
      "kind": "qry",
      "trigger": "buscarComandasAbertas",
      "returns": [
        "openComandas"
      ]
    },
    "obterComandaParaFechamento": {
      "kind": "qry",
      "trigger": "obterComandaParaFechamento",
      "returns": [
        "comanda"
      ]
    },
    "fecharComandaPaga": {
      "kind": "cmd",
      "trigger": "fecharComandaPaga",
      "returns": [
        "comanda"
      ],
      "writes": "Comanda.fecharComanda"
    }
  },
  "states": {
    "openComandas": {
      "source": "carregarFechamento.openComandas",
      "description": "Página paginada de comandas abertas já filtrada para a localização no fechamento."
    },
    "comanda": {
      "source": "obterComandaParaFechamento.comanda",
      "description": "Comanda selecionada, com itens válidos, valores calculados e situação da mesa, para conferência ou confirmação do fechamento."
    },
    "selectedComanda": {
      "source": "entry.params.comandaId",
      "description": "Comanda selecionada, com itens válidos, valores calculados e situação da mesa, para conferência ou confirmação do fechamento."
    }
  },
  "functions": {
    "carregarFechamento": {
      "description": "Carrega a tela de fechamento com uma página de comandas abertas e, se houver uma comanda no contexto, sua cobrança completa.",
      "calls": "carregarFechamento",
      "sets": "openComandas",
      "updates": [
        "comanda"
      ]
    },
    "buscarComandasAbertas": {
      "description": "Pesquisa sob demanda as comandas que ainda podem ser fechadas.",
      "calls": "buscarComandasAbertas",
      "sets": "openComandas"
    },
    "obterComandaParaFechamento": {
      "description": "Obtém a comanda aberta escolhida pelo caixa, pronta para conferir e fechar.",
      "calls": "obterComandaParaFechamento",
      "sets": "comanda"
    },
    "fecharComandaPaga": {
      "description": "Registra desconto e pagamento, fecha a comanda aberta e confirma a liberação da mesa. (comanda: upsert)",
      "calls": "fecharComandaPaga",
      "updates": [
        "comanda",
        "openComandas"
      ]
    }
  },
  "journeys": [
    {
      "step": "fecharComanda/localizarComandaParaFechamento",
      "organisms": [
        "openComandaList"
      ],
      "functions": [
        "carregarFechamento",
        "buscarComandasAbertas",
        "obterComandaParaFechamento"
      ]
    },
    {
      "step": "fecharComanda/conferirTotalComanda",
      "organisms": [
        "comandaReview",
        "paymentForm"
      ],
      "functions": [
        "obterComandaParaFechamento"
      ]
    },
    {
      "step": "fecharComanda/fecharComandaPaga",
      "organisms": [
        "paymentForm",
        "closeComandaActions",
        "comandaReview"
      ],
      "functions": [
        "fecharComandaPaga"
      ]
    }
  ],
  "rules": {
    "carregarFechamento": [
      "subtotalComandaCalculado",
      "totalComandaCalculado",
      "valorTotalItemComandaCalculado"
    ],
    "buscarComandasAbertas": [
      "subtotalComandaCalculado",
      "totalComandaCalculado",
      "valorTotalItemComandaCalculado"
    ],
    "obterComandaParaFechamento": [
      "subtotalComandaCalculado",
      "totalComandaCalculado",
      "valorTotalItemComandaCalculado"
    ],
    "fecharComandaPaga": [
      "pagamentoObrigatorioNoFechamento",
      "descontoNaoExcedeSubtotal",
      "fechamentoLiberaMesa",
      "subtotalComandaCalculado",
      "totalComandaCalculado",
      "valorTotalItemComandaCalculado"
    ]
  },
  "access": {
    "actors": [
      "caixa"
    ],
    "grants": [
      "caixaFechamentoEcadastroOperacional"
    ]
  }
} as const;
