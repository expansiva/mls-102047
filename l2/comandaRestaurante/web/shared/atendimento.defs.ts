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
        "effect": "select:acoesAtendimento",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:lookupAtendimento",
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
    "load": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "atendimento",
        "fechamento",
        "cardapio"
      ]
    },
    "loadAtendimento": {
      "kind": "qry",
      "trigger": "loadAtendimento",
      "returns": [
        "atendimento"
      ]
    },
    "loadComanda": {
      "kind": "qry",
      "trigger": "loadComanda",
      "returns": [
        "comanda"
      ]
    },
    "abrirComanda": {
      "kind": "cmd",
      "trigger": "abrirComanda",
      "returns": [
        "comanda",
        "itemComanda",
        "mesa"
      ],
      "writes": "Comanda.create"
    },
    "lancarItem": {
      "kind": "cmd",
      "trigger": "lancarItem",
      "returns": [
        "itemComanda",
        "comanda"
      ],
      "writes": "ItemComanda.create"
    },
    "cancelarItem": {
      "kind": "cmd",
      "trigger": "cancelarItem",
      "returns": [
        "itemComanda",
        "comanda"
      ],
      "writes": "ItemComanda.cancelarItemComanda"
    }
  },
  "states": {
    "atendimento": {
      "source": "load.atendimento",
      "description": "Mesas e comandas para atendimento."
    },
    "page": {
      "source": "entry.params.page",
      "description": "Página atual da lista de atendimento."
    },
    "comandaSelecionada": {
      "source": "entry.params.comandaId",
      "description": "Comanda selecionada pelo identificador de entrada."
    },
    "itemCardapioSelecionado": {
      "source": "entry.params.itemCardapioId",
      "description": "Item do cardápio selecionado pelo identificador de entrada."
    },
    "comanda": {
      "source": "loadComanda.comanda",
      "description": "Comanda selecionada com itens e totais."
    },
    "fechamento": {
      "source": "load.fechamento",
      "description": "Dados da comanda para conferência de fechamento."
    },
    "cardapio": {
      "source": "load.cardapio",
      "description": "Itens do cardápio e preços vigentes."
    },
    "itemComanda": {
      "source": "lancarItem.itemComanda",
      "description": "Item de comanda lançado ou cancelado."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega o atendimento inicial, os dados de fechamento e o cardápio.",
      "calls": "load",
      "sets": "atendimento",
      "updates": [
        "fechamento",
        "cardapio"
      ]
    },
    "filterLookupAtendimento": {
      "description": "Recarrega a primeira página das mesas de atendimento conforme os filtros.",
      "calls": "loadAtendimento",
      "sets": "atendimento"
    },
    "loadMoreLookupAtendimento": {
      "description": "Acrescenta a próxima página das mesas de atendimento.",
      "calls": "loadAtendimento",
      "sets": "atendimento"
    },
    "abrirComanda": {
      "description": "Abre uma comanda para a mesa disponível.",
      "calls": "abrirComanda",
      "sets": "comanda",
      "updates": [
        "atendimento",
        "fechamento",
        "itemComanda"
      ]
    },
    "lancarItem": {
      "description": "Lança o item informado na comanda aberta.",
      "calls": "lancarItem",
      "sets": "itemComanda",
      "updates": [
        "comanda",
        "fechamento"
      ]
    },
    "cancelarItem": {
      "description": "Cancela o item lançado na comanda aberta.",
      "calls": "cancelarItem",
      "sets": "itemComanda",
      "updates": [
        "comanda",
        "fechamento"
      ]
    },
    "carregarComanda": {
      "description": "Carrega os dados da comanda selecionada.",
      "calls": "loadComanda",
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
        "load",
        "filterLookupAtendimento",
        "loadMoreLookupAtendimento"
      ],
      "continuesIn": "atendimento"
    },
    {
      "step": "abrirComanda/criarComanda",
      "organisms": [
        "acoesAtendimento"
      ],
      "functions": [
        "abrirComanda"
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
        "carregarComanda"
      ],
      "continuesIn": "atendimento"
    },
    {
      "step": "lancarItemComanda/consultarItemCardapio",
      "organisms": [
        "lookupAtendimento",
        "formularioLancamento"
      ],
      "functions": [
        "load"
      ],
      "continuesIn": "cardapio"
    },
    {
      "step": "lancarItemComanda/adicionarItemComanda",
      "organisms": [
        "formularioLancamento",
        "acoesAtendimento"
      ],
      "functions": [
        "lancarItem"
      ],
      "continuesIn": "atendimento"
    },
    {
      "step": "cancelarItemComanda/localizarComandaParaCorrecao",
      "organisms": [
        "lookupAtendimento",
        "detalheComanda"
      ],
      "functions": [
        "carregarComanda"
      ],
      "continuesIn": "atendimento"
    },
    {
      "step": "cancelarItemComanda/conferirItemLancado",
      "organisms": [
        "detalheComanda",
        "acoesAtendimento"
      ],
      "functions": [
        "carregarComanda"
      ],
      "continuesIn": "atendimento"
    },
    {
      "step": "cancelarItemComanda/cancelarItemErrado",
      "organisms": [
        "acoesAtendimento"
      ],
      "functions": [
        "cancelarItem"
      ],
      "continuesIn": "atendimento"
    }
  ],
  "rules": {
    "load": [
      "mesaDisponivelParaAbrirComanda"
    ],
    "loadAtendimento": [
      "mesaDisponivelParaAbrirComanda"
    ],
    "loadComanda": [
      "itensSomenteEmComandaAberta",
      "itemComandaOperacaoSomenteComandaAberta"
    ],
    "abrirComanda": [
      "mesaDisponivelParaAbrirComanda",
      "umaComandaAbertaPorMesa"
    ],
    "lancarItem": [
      "itemComandaOperacaoSomenteComandaAberta"
    ],
    "cancelarItem": [
      "itemComandaOperacaoSomenteComandaAberta"
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
