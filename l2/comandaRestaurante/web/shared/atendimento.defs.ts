/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/atendimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "forms": {
    "abrirComanda": {
      "organism": "acoesAtendimento",
      "submit": "abrirComanda"
    },
    "lancarItem": {
      "organism": "formularioLancamento",
      "submit": "lancarItem"
    },
    "cancelarItem": {
      "organism": "acoesAtendimento",
      "submit": "cancelarItem"
    }
  },
  "requests": {
    "carregarAtendimento": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "localizacao"
      ]
    },
    "buscarLocalizacaoAtendimento": {
      "kind": "qry",
      "trigger": "buscarLocalizacaoAtendimento",
      "returns": [
        "localizacao"
      ]
    },
    "consultarComandaAtendimento": {
      "kind": "qry",
      "trigger": "consultarComandaAtendimento",
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
    "localizacao": {
      "source": "carregarAtendimento.localizacao",
      "description": "localizacaoAtendimento"
    },
    "comanda": {
      "source": "consultarComandaAtendimento.comanda",
      "description": "comandaAtendimento"
    },
    "mesaId": {
      "source": "abrirComanda.input",
      "description": "mesaSelecionada"
    },
    "itemCardapioId": {
      "source": "lancarItem.input",
      "description": "itemCardapioSelecionado"
    },
    "quantidade": {
      "source": "lancarItem.input",
      "description": "quantidadeItem"
    },
    "observacao": {
      "source": "lancarItem.input",
      "description": "observacaoItem"
    },
    "itemComandaId": {
      "source": "cancelarItem.input",
      "description": "itemComandaSelecionado"
    },
    "versao": {
      "source": "cancelarItem.input",
      "description": "versaoItemComanda"
    }
  },
  "functions": {
    "carregarAtendimento": {
      "description": "carregarLocalizacaoAtendimento",
      "calls": "carregarAtendimento",
      "sets": "localizacao"
    },
    "buscarLocalizacaoAtendimento": {
      "description": "buscarLocalizacaoAtendimento",
      "calls": "buscarLocalizacaoAtendimento",
      "sets": "localizacao"
    },
    "consultarComandaAtendimento": {
      "description": "consultarComandaSelecionada",
      "calls": "consultarComandaAtendimento",
      "sets": "comanda"
    },
    "abrirComanda": {
      "description": "abrirComandaMesaSelecionada",
      "calls": "abrirComanda",
      "sets": "comanda",
      "updates": [
        "comanda"
      ]
    },
    "lancarItem": {
      "description": "lancarItemNaComanda",
      "calls": "lancarItem",
      "sets": "comanda",
      "updates": [
        "comanda"
      ]
    },
    "cancelarItem": {
      "description": "cancelarItemSelecionado",
      "calls": "cancelarItem",
      "sets": "comanda",
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
        "buscarLocalizacaoAtendimento"
      ],
      "continuesIn": "atendimento"
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
      "step": "lancarItemComanda/localizarComandaAberta",
      "organisms": [
        "lookupAtendimento",
        "detalheComanda"
      ],
      "functions": [
        "consultarComandaAtendimento"
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
        "buscarLocalizacaoAtendimento"
      ],
      "continuesIn": "atendimento"
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
    },
    {
      "step": "cancelarItemComanda/localizarComandaParaCorrecao",
      "organisms": [
        "lookupAtendimento",
        "detalheComanda"
      ],
      "functions": [
        "consultarComandaAtendimento"
      ],
      "continuesIn": "atendimento"
    },
    {
      "step": "cancelarItemComanda/conferirItemLancado",
      "organisms": [
        "detalheComanda"
      ],
      "functions": [],
      "continuesIn": "atendimento"
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
    }
  ],
  "rules": {
    "carregarAtendimento": [
      "mesaDisponivelParaAbrirComanda"
    ],
    "buscarLocalizacaoAtendimento": [
      "mesaDisponivelParaAbrirComanda"
    ],
    "consultarComandaAtendimento": [
      "subtotalComandaCalculado"
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
