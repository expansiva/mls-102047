/// <mls fileReference="_102047_/l2/financeiro/web/shared/titulos_pagador.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "pagadorId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:resumoPagador",
        "persist": true
      },
      "tituloReceberId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheTitulo",
        "persist": true
      },
      "tituloId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:acoesExtratoPagamento",
        "persist": false
      }
    }
  },
  "forms": {
    "pagarComCartao": {
      "organism": "acoesExtratoPagamento",
      "submit": "pagarComCartao"
    }
  },
  "requests": {
    "carregarPosicaoPagador": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "pagador",
        "resumo",
        "titulos",
        "recebimentos"
      ]
    },
    "pagarTituloComCartao": {
      "kind": "cmd",
      "trigger": "pagarComCartao",
      "returns": [
        "recebimento",
        "titulo",
        "resumo"
      ],
      "writes": "Recebimento.create"
    }
  },
  "states": {
    "pagador": {
      "source": "carregarPosicaoPagador.pagador",
      "description": "Nome e documento do pagador para o resumo, o extrato e a confirmação do pagamento.",
      "organisms": [
        "acoesExtratoPagamento",
        "resumoPagador"
      ]
    },
    "resumo": {
      "source": "carregarPosicaoPagador.resumo",
      "description": "Indicadores da posição do pagador, já calculados no servidor.",
      "organisms": [
        "resumoPagador"
      ]
    },
    "titulos": {
      "source": "carregarPosicaoPagador.titulos",
      "description": "Título do pagador com a situação e os dados de conferência usados na lista e no detalhe.",
      "organisms": [
        "acoesExtratoPagamento",
        "detalheTitulo",
        "titulosDoPagador"
      ]
    },
    "recebimentos": {
      "source": "carregarPosicaoPagador.recebimentos",
      "description": "Recebimento de um título do pagador na linha do tempo, com estorno quando houver.",
      "organisms": [
        "recebimentosDoPagador"
      ]
    },
    "selectedTituloReceber": {
      "source": "entry.params.tituloReceberId",
      "description": "Título do pagador com a situação e os dados de conferência usados na lista e no detalhe.",
      "organisms": [
        "detalheTitulo",
        "titulosDoPagador"
      ]
    }
  },
  "functions": {
    "carregarPosicaoPagador": {
      "description": "Carrega de uma vez a posição completa do pagador: identificação, indicadores, títulos com situação e histórico de recebimentos.",
      "calls": "carregarPosicaoPagador",
      "sets": "pagador",
      "updates": [
        "resumo",
        "titulos",
        "recebimentos"
      ]
    },
    "pagarTituloComCartao": {
      "description": "Paga com cartão via Stripe o saldo integral de um título em aberto do pagador logado e registra o recebimento. (titulos: upsert; recebimentos: upsert)",
      "calls": "pagarTituloComCartao",
      "sets": "resumo",
      "updates": [
        "titulos",
        "recebimentos"
      ]
    }
  },
  "journeys": [
    {
      "step": "consultarMeusTitulos/listarMeusTitulos",
      "organisms": [
        "resumoPagador",
        "titulosDoPagador"
      ],
      "functions": [
        "carregarPosicaoPagador"
      ]
    },
    {
      "step": "consultarMeusTitulos/verMeuTitulo",
      "organisms": [
        "detalheTitulo",
        "recebimentosDoPagador"
      ],
      "functions": [
        "carregarPosicaoPagador"
      ]
    },
    {
      "step": "emitirExtratoPagador/localizarPagador",
      "organisms": [
        "resumoPagador"
      ],
      "functions": [
        "carregarPosicaoPagador"
      ]
    },
    {
      "step": "emitirExtratoPagador/verExtrato",
      "organisms": [
        "titulosDoPagador",
        "recebimentosDoPagador",
        "resumoPagador"
      ],
      "functions": [
        "carregarPosicaoPagador"
      ]
    },
    {
      "step": "emitirExtratoPagador/emitirExtrato",
      "organisms": [
        "acoesExtratoPagamento"
      ],
      "functions": [
        "carregarPosicaoPagador"
      ]
    },
    {
      "step": "pagarTituloCartao/localizarTituloAberto",
      "organisms": [
        "titulosDoPagador"
      ],
      "functions": [
        "carregarPosicaoPagador"
      ]
    },
    {
      "step": "pagarTituloCartao/conferirValor",
      "organisms": [
        "detalheTitulo"
      ],
      "functions": [
        "carregarPosicaoPagador"
      ]
    },
    {
      "step": "pagarTituloCartao/pagarComCartao",
      "organisms": [
        "acoesExtratoPagamento"
      ],
      "functions": [
        "pagarTituloComCartao"
      ]
    }
  ],
  "rules": {
    "carregarPosicaoPagador": [
      "pagadorVeApenasProprios",
      "pagadorVeSomenteProprios",
      "saldoAbertoCalculado",
      "recebimentoEstornadoNaoConta",
      "estornoExcluiDoRecebido",
      "tituloQuitadoQuandoSaldoZera",
      "tituloVencidoEmAbertoAposVencimento"
    ],
    "pagarTituloComCartao": [
      "portalSomenteCartao",
      "portalPagaSaldoIntegral",
      "pagadorVeSomenteProprios",
      "tituloQuitadoNaoRecebe",
      "recebimentoValorPositivo",
      "recebimentoNaoExcedeSaldo",
      "numeroRecebimentoUnico",
      "stripePagamentoUnico",
      "saldoAbertoCalculado",
      "tituloQuitadoQuandoSaldoZera"
    ]
  },
  "access": {
    "actors": [
      "gerenteFinanceiro",
      "pagador"
    ],
    "grants": [
      "gerenteRecebiveis",
      "gerentePagadores",
      "pagadorMeuCadastro",
      "pagadorMeusTitulos",
      "pagadorMeusRecebimentos"
    ]
  },
  "fields": {
    "Pagador.details.identification.docId": [
      "acoesExtratoPagamento"
    ],
    "Pagador.details.identification.name": [
      "acoesExtratoPagamento",
      "resumoPagador"
    ],
    "Recebimento.details.baixaParcial": [
      "recebimentosDoPagador"
    ],
    "Recebimento.details.estorno.estornadoEm": [
      "recebimentosDoPagador"
    ],
    "Recebimento.details.valor": [
      "recebimentosDoPagador"
    ],
    "Recebimento.formaPagamento": [
      "recebimentosDoPagador"
    ],
    "Recebimento.numero": [
      "recebimentosDoPagador"
    ],
    "Recebimento.recebidoEm": [
      "recebimentosDoPagador"
    ],
    "Recebimento.status": [
      "recebimentosDoPagador"
    ],
    "Recebimento.tituloId": [
      "acoesExtratoPagamento"
    ],
    "TituloReceber.details.descricao": [
      "detalheTitulo"
    ],
    "TituloReceber.details.diasAtraso": [
      "detalheTitulo"
    ],
    "TituloReceber.details.origemRotulo": [
      "detalheTitulo"
    ],
    "TituloReceber.details.parcialmenteRecebido": [
      "titulosDoPagador"
    ],
    "TituloReceber.details.quitado": [
      "titulosDoPagador"
    ],
    "TituloReceber.details.saldoAberto": [
      "acoesExtratoPagamento",
      "detalheTitulo",
      "resumoPagador",
      "titulosDoPagador"
    ],
    "TituloReceber.details.totalRecebido": [
      "detalheTitulo",
      "resumoPagador"
    ],
    "TituloReceber.details.valor": [
      "detalheTitulo",
      "titulosDoPagador"
    ],
    "TituloReceber.details.vencido": [
      "resumoPagador",
      "titulosDoPagador"
    ],
    "TituloReceber.emissao": [
      "detalheTitulo"
    ],
    "TituloReceber.numero": [
      "detalheTitulo",
      "titulosDoPagador"
    ],
    "TituloReceber.origem": [
      "titulosDoPagador"
    ],
    "TituloReceber.vencimento": [
      "detalheTitulo",
      "titulosDoPagador"
    ]
  }
} as const;
