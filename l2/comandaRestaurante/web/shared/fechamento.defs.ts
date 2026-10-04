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
    "localizarComandasAbertas": {
      "kind": "qry",
      "trigger": "localizarComandasAbertas",
      "returns": [
        "openComandas"
      ]
    },
    "consultarComandaParaFechamento": {
      "kind": "qry",
      "trigger": "consultarComandaParaFechamento",
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
    "comandaIdSelecionada": {
      "source": "entry.params.comandaId",
      "description": "comandaId"
    },
    "comandasAbertas": {
      "source": "carregarFechamento.openComandas",
      "description": "openComandas"
    },
    "comandaParaFechamento": {
      "source": "carregarFechamento.selectedComanda",
      "description": "selectedComanda"
    }
  },
  "functions": {
    "carregarFechamentoInicial": {
      "description": "carregarFechamento",
      "calls": "carregarFechamento",
      "sets": "comandasAbertas",
      "updates": [
        "comandaParaFechamento"
      ]
    },
    "localizarComandasAbertas": {
      "description": "localizarComandasAbertas",
      "calls": "localizarComandasAbertas",
      "sets": "comandasAbertas"
    },
    "consultarComandaParaFechamento": {
      "description": "consultarComandaParaFechamento",
      "calls": "consultarComandaParaFechamento",
      "sets": "comandaParaFechamento"
    },
    "fecharComandaPaga": {
      "description": "fecharComandaPaga",
      "calls": "fecharComandaPaga",
      "sets": "comandaParaFechamento"
    }
  },
  "journeys": [
    {
      "step": "fecharComanda/localizarComandaParaFechamento",
      "organisms": [
        "openComandaList",
        "comandaReview"
      ],
      "functions": [
        "carregarFechamentoInicial",
        "localizarComandasAbertas",
        "consultarComandaParaFechamento"
      ]
    },
    {
      "step": "fecharComanda/conferirTotalComanda",
      "organisms": [
        "comandaReview",
        "paymentForm"
      ],
      "functions": []
    },
    {
      "step": "fecharComanda/fecharComandaPaga",
      "organisms": [
        "paymentForm",
        "closeComandaActions"
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
    "localizarComandasAbertas": [
      "totalComandaCalculado"
    ],
    "consultarComandaParaFechamento": [
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
