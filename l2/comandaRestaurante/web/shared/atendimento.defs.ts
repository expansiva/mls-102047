/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/atendimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "mesasPage": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:lookupAtendimento",
        "persist": true
      },
      "comandasPage": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:lookupAtendimento",
        "persist": true
      },
      "itensPage": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:lookupAtendimento",
        "persist": true
      },
      "mesaTermo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:lookupAtendimento",
        "persist": true
      },
      "comandaNumero": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:lookupAtendimento",
        "persist": true
      },
      "itemTermo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:lookupAtendimento",
        "persist": true
      },
      "comandaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheComanda",
        "persist": true
      },
      "itemCardapioId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:formularioLancamento",
        "persist": false
      }
    }
  },
  "forms": {
    "lancarItem": {
      "organism": "formularioLancamento",
      "submit": "lancarItem"
    }
  },
  "requests": {
    "carregarAtendimento": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "contextoAtendimento"
      ]
    },
    "atualizarLocalizacaoAtendimento": {
      "kind": "qry",
      "trigger": "atualizarLocalizacaoAtendimento",
      "returns": [
        "contextoAtendimento"
      ]
    },
    "obterComandaAtendimento": {
      "kind": "qry",
      "trigger": "obterComandaAtendimento",
      "returns": [
        "comanda"
      ]
    },
    "abrirComanda": {
      "kind": "cmd",
      "trigger": "abrirComanda",
      "returns": [
        "comanda"
      ],
      "writes": "Comanda.create"
    },
    "lancarItem": {
      "kind": "cmd",
      "trigger": "lancarItem",
      "returns": [
        "comanda"
      ],
      "writes": "ItemComanda.create"
    },
    "cancelarItem": {
      "kind": "cmd",
      "trigger": "cancelarItem",
      "returns": [
        "comanda"
      ],
      "writes": "ItemComanda.cancelarItemComanda"
    }
  },
  "states": {
    "contextoAtendimento": {
      "source": "carregarAtendimento.contextoAtendimento",
      "description": "Listas independentes para localizar mesa, comanda aberta e item do cardápio."
    },
    "comanda": {
      "source": "obterComandaAtendimento.comanda",
      "description": "Comanda escolhida com a mesa, todas as linhas e subtotal calculado para o atendimento."
    },
    "selectedComanda": {
      "source": "entry.params.comandaId",
      "description": "Comanda escolhida com a mesa, todas as linhas e subtotal calculado para o atendimento."
    }
  },
  "functions": {
    "carregarAtendimento": {
      "description": "Carrega o contexto inicial de localização do atendimento para o garçom encontrar mesa, comanda aberta ou item do cardápio.",
      "calls": "carregarAtendimento",
      "sets": "contextoAtendimento"
    },
    "atualizarLocalizacaoAtendimento": {
      "description": "Pesquisa ou troca a página das listas de localização sem carregar detalhes de uma comanda.",
      "calls": "atualizarLocalizacaoAtendimento",
      "sets": "contextoAtendimento"
    },
    "obterComandaAtendimento": {
      "description": "Obtém a comanda selecionada com linhas e subtotal para conferência e ações imediatas do garçom.",
      "calls": "obterComandaAtendimento",
      "sets": "comanda"
    },
    "abrirComanda": {
      "description": "Abre uma comanda para a mesa disponível selecionada e devolve o atendimento pronto para receber pedidos. (comanda: upsert)",
      "calls": "abrirComanda",
      "updates": [
        "comanda",
        "contextoAtendimento"
      ]
    },
    "lancarItem": {
      "description": "Registra o pedido na comanda aberta e devolve a conferência integral já atualizada. (comanda: upsert)",
      "calls": "lancarItem",
      "updates": [
        "comanda"
      ]
    },
    "cancelarItem": {
      "description": "Cancela a linha escolhida por engano e devolve a comanda com a cobrança recalculada. (comanda: upsert)",
      "calls": "cancelarItem",
      "updates": [
        "comanda"
      ]
    }
  },
  "journeys": [
    {
      "step": "abrirComanda/localizarMesaDisponivel",
      "organisms": [
        "lookupAtendimento"
      ],
      "functions": [
        "carregarAtendimento",
        "atualizarLocalizacaoAtendimento"
      ]
    },
    {
      "step": "abrirComanda/criarComanda",
      "organisms": [
        "acoesAtendimento",
        "detalheComanda"
      ],
      "functions": [
        "abrirComanda"
      ],
      "continuesIn": "atendimento"
    },
    {
      "step": "cancelarItemComanda/localizarComandaParaCorrecao",
      "organisms": [
        "lookupAtendimento"
      ],
      "functions": [
        "carregarAtendimento",
        "atualizarLocalizacaoAtendimento",
        "obterComandaAtendimento"
      ]
    },
    {
      "step": "cancelarItemComanda/conferirItemLancado",
      "organisms": [
        "detalheComanda",
        "acoesAtendimento"
      ],
      "functions": [
        "obterComandaAtendimento"
      ]
    },
    {
      "step": "cancelarItemComanda/cancelarItemErrado",
      "organisms": [
        "acoesAtendimento",
        "detalheComanda"
      ],
      "functions": [
        "cancelarItem"
      ],
      "continuesIn": "atendimento"
    },
    {
      "step": "lancarItemComanda/localizarComandaAberta",
      "organisms": [
        "lookupAtendimento",
        "detalheComanda"
      ],
      "functions": [
        "carregarAtendimento",
        "atualizarLocalizacaoAtendimento",
        "obterComandaAtendimento"
      ]
    },
    {
      "step": "lancarItemComanda/consultarItemCardapio",
      "organisms": [
        "lookupAtendimento",
        "formularioLancamento"
      ],
      "functions": [
        "carregarAtendimento",
        "atualizarLocalizacaoAtendimento"
      ]
    },
    {
      "step": "lancarItemComanda/adicionarItemComanda",
      "organisms": [
        "formularioLancamento",
        "acoesAtendimento",
        "detalheComanda"
      ],
      "functions": [
        "lancarItem"
      ],
      "continuesIn": "atendimento"
    }
  ],
  "rules": {
    "carregarAtendimento": [],
    "atualizarLocalizacaoAtendimento": [],
    "obterComandaAtendimento": [
      "subtotalComandaCalculado",
      "valorTotalItemComandaCalculado"
    ],
    "abrirComanda": [
      "mesaDisponivelParaAbrirComanda",
      "umaComandaAbertaPorMesa",
      "subtotalComandaCalculado"
    ],
    "lancarItem": [
      "itensSomenteEmComandaAberta",
      "precoUnitarioRegistradoNoLancamento",
      "valorTotalItemComandaCalculado",
      "subtotalComandaCalculado"
    ],
    "cancelarItem": [
      "itemComandaOperacaoSomenteComandaAberta",
      "valorTotalItemComandaCalculado",
      "subtotalComandaCalculado"
    ]
  },
  "access": {
    "actors": [
      "garcom"
    ],
    "grants": [
      "garcomAtendimentoComandas"
    ]
  }
} as const;
