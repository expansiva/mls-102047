/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/atendimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "comandaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:detalheComanda",
        "persist": true
      },
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
        "effect": "filter:atualizarLocalizacaoAtendimento",
        "persist": true
      },
      "comandaNumero": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:atualizarLocalizacaoAtendimento",
        "persist": true
      },
      "itemTermo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:atualizarLocalizacaoAtendimento",
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
      "description": "Conjunto paginado de listas para localizar a mesa, a comanda aberta ou o item de cardápio no atendimento."
    },
    "comanda": {
      "source": "obterComandaAtendimento.comanda",
      "description": "Comanda completa para conferência do atendimento, incluindo as linhas e o subtotal calculado."
    },
    "selectedComanda": {
      "source": "entry.params.comandaId",
      "description": "Comanda completa para conferência do atendimento, incluindo as linhas e o subtotal calculado."
    }
  },
  "functions": {
    "carregarAtendimento": {
      "description": "Carrega o contexto inicial para o garçom localizar uma mesa disponível, uma comanda aberta ou um item do cardápio.",
      "calls": "carregarAtendimento",
      "sets": "contextoAtendimento"
    },
    "atualizarLocalizacaoAtendimento": {
      "description": "Atualiza sob demanda as listas de localização sem carregar detalhes de uma comanda.",
      "calls": "atualizarLocalizacaoAtendimento"
    },
    "obterComandaAtendimento": {
      "description": "Carrega a comanda escolhida com todas as linhas necessárias para o garçom conferir, lançar ou cancelar um item.",
      "calls": "obterComandaAtendimento",
      "sets": "comanda"
    },
    "abrirComanda": {
      "description": "Abre uma nova comanda para a mesa disponível selecionada e devolve imediatamente seu estado de atendimento.",
      "calls": "abrirComanda",
      "sets": "comanda",
      "updates": [
        "contextoAtendimento"
      ]
    },
    "lancarItem": {
      "description": "Registra o pedido informado na comanda aberta e retorna a comanda integralmente atualizada.",
      "calls": "lancarItem",
      "sets": "comanda"
    },
    "cancelarItem": {
      "description": "Cancela o item lançado por engano e devolve a comanda com o novo subtotal para conferência imediata.",
      "calls": "cancelarItem",
      "sets": "comanda"
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
