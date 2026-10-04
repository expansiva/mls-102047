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
        "effect": "filter:openComandaList",
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
      "description": "Página de comandas abertas, já filtrada para localização pelo caixa."
    },
    "comanda": {
      "source": "obterComandaParaFechamento.comanda",
      "description": "Comanda selecionada com linhas válidas, totais calculados e situação da mesa para conferência ou resultado do fechamento."
    },
    "selectedComanda": {
      "source": "entry.params.comandaId",
      "description": "Comanda selecionada com linhas válidas, totais calculados e situação da mesa para conferência ou resultado do fechamento."
    }
  },
  "functions": {
    "carregarFechamento": {
      "description": "Carrega o fechamento com a primeira página de comandas abertas e, quando uma comanda vier no contexto, seus dados completos para conferência.",
      "calls": "carregarFechamento",
      "sets": "openComandas"
    },
    "buscarComandasAbertas": {
      "description": "Localiza sob demanda as comandas ainda abertas por número ou código da mesa.",
      "calls": "buscarComandasAbertas"
    },
    "obterComandaParaFechamento": {
      "description": "Obtém a comanda aberta escolhida pelo caixa, pronta para conferir cobrança e preencher o fechamento.",
      "calls": "obterComandaParaFechamento",
      "sets": "comanda"
    },
    "fecharComandaPaga": {
      "description": "Registra o desconto e o pagamento da comanda aberta, conclui seu fechamento e devolve a cobrança fechada com a mesa liberada.",
      "calls": "fecharComandaPaga",
      "sets": "comanda",
      "updates": [
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
