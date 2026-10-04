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
      "mesaId": {
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
    "load": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "fechamento",
        "atendimento"
      ]
    },
    "loadFechamento": {
      "kind": "qry",
      "trigger": "loadFechamento",
      "returns": [
        "fechamento"
      ]
    },
    "loadComanda": {
      "kind": "qry",
      "trigger": "loadComanda",
      "returns": [
        "comanda"
      ]
    },
    "fecharComandaPaga": {
      "kind": "cmd",
      "trigger": "fecharComandaPaga",
      "returns": [
        "comanda",
        "itemComanda",
        "mesa"
      ],
      "writes": "Comanda.fecharComanda"
    }
  },
  "states": {
    "fechamento": {
      "source": "load.fechamento",
      "description": "Comandas abertas para fechamento."
    },
    "mesa": {
      "source": "load.atendimento",
      "description": "Mesas vinculadas às comandas abertas."
    },
    "comandaSelecionada": {
      "source": "entry.params.comandaId",
      "description": "Comanda selecionada para revisão."
    },
    "mesaId": {
      "source": "entry.params.mesaId",
      "description": "Filtro de mesa das comandas abertas."
    },
    "page": {
      "source": "entry.params.page",
      "description": "Página das comandas abertas."
    },
    "comanda": {
      "source": "loadComanda.comanda",
      "description": "Detalhes da comanda selecionada para fechamento."
    },
    "itemComanda": {
      "source": "comanda",
      "description": "Itens da comanda selecionada."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega as comandas abertas e as mesas relacionadas.",
      "calls": "load",
      "sets": "fechamento",
      "updates": [
        "mesa"
      ]
    },
    "filterOpenComandaList": {
      "description": "Filtra e recarrega as comandas abertas.",
      "calls": "loadFechamento",
      "sets": "fechamento"
    },
    "loadMoreOpenComandaList": {
      "description": "Carrega a próxima página de comandas abertas.",
      "calls": "loadFechamento",
      "sets": "fechamento"
    },
    "fecharComandaPaga": {
      "description": "Registra o pagamento e fecha a comanda.",
      "calls": "fecharComandaPaga",
      "sets": "comanda",
      "updates": [
        "fechamento",
        "mesa",
        "itemComanda"
      ]
    },
    "loadComanda": {
      "description": "Carrega os detalhes da comanda selecionada.",
      "calls": "loadComanda",
      "sets": "comanda",
      "updates": [
        "itemComanda"
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
        "load",
        "filterOpenComandaList",
        "loadMoreOpenComandaList"
      ]
    },
    {
      "step": "fecharComanda/conferirTotalComanda",
      "organisms": [
        "comandaReview"
      ],
      "functions": [
        "loadComanda"
      ]
    },
    {
      "step": "fecharComanda/fecharComandaPaga",
      "organisms": [
        "paymentForm",
        "closeComandaActions"
      ],
      "functions": [
        "fecharComandaPaga"
      ],
      "continuesIn": "fechamento"
    }
  ],
  "rules": {
    "load": [
      "umaComandaAbertaPorMesa"
    ],
    "loadFechamento": [
      "umaComandaAbertaPorMesa"
    ],
    "loadComanda": [
      "itensSomenteEmComandaAberta",
      "descontoNaoExcedeSubtotal"
    ],
    "fecharComandaPaga": [
      "pagamentoObrigatorioNoFechamento",
      "descontoNaoExcedeSubtotal",
      "fechamentoLiberaMesa"
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
