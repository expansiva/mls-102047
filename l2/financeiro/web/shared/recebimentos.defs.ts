/// <mls fileReference="_102047_/l2/financeiro/web/shared/recebimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "numero": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:recebimentosList",
        "persist": true
      },
      "recebidoEm": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:recebimentosList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:recebimentosList",
        "persist": true
      },
      "recebimentoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:recebimentoDetail",
        "persist": true
      },
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:registrarRecebimentoForm",
        "persist": true
      },
      "tituloReceberId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:TituloReceber",
        "persist": true
      },
      "tituloId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:registrarRecebimentoForm",
        "persist": false
      }
    }
  },
  "forms": {
    "registrarRecebimento": {
      "organism": "registrarRecebimentoForm",
      "submit": "registrarRecebimento"
    },
    "estornarRecebimento": {
      "organism": "estornarRecebimentoActions",
      "submit": "estornarRecebimento"
    }
  },
  "requests": {
    "listarRecebimentos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "recebimentos"
      ]
    },
    "obterRecebimento": {
      "kind": "qry",
      "trigger": "obterRecebimento",
      "returns": [
        "recebimento"
      ]
    },
    "buscarTitulosAbertos": {
      "kind": "qry",
      "trigger": "buscarTitulosAbertos",
      "returns": [
        "titulos"
      ]
    },
    "registrarRecebimento": {
      "kind": "cmd",
      "trigger": "registrarRecebimento",
      "returns": [
        "recebimento",
        "titulo"
      ],
      "writes": "Recebimento.create"
    },
    "estornarRecebimento": {
      "kind": "cmd",
      "trigger": "estornarRecebimento",
      "returns": [
        "recebimento",
        "recebimentoItem"
      ],
      "writes": "Recebimento.estornar"
    }
  },
  "states": {
    "recebimentos": {
      "source": "listarRecebimentos.recebimentos",
      "description": "Linha da lista de recebimentos, com título e pagador já resolvidos.",
      "organisms": [
        "recebimentosList"
      ]
    },
    "recebimento": {
      "source": "obterRecebimento.recebimento",
      "description": "Recebimento completo para conferência e estorno.",
      "organisms": [
        "estornarRecebimentoActions",
        "recebimentoDetail"
      ]
    },
    "titulos": {
      "source": "buscarTitulosAbertos.titulos",
      "description": "Título em aberto disponível para receber, com pagador e saldo.",
      "organisms": [
        "registrarRecebimentoForm"
      ]
    },
    "selectedRecebimento": {
      "source": "entry.params.recebimentoId",
      "description": "Recebimento completo para conferência e estorno.",
      "organisms": [
        "recebimentoDetail",
        "recebimentosList"
      ]
    }
  },
  "functions": {
    "listarRecebimentos": {
      "description": "Lista paginada dos recebimentos da organização para o caixa e o gerente localizarem um recebimento e verem quais ainda podem ser estornados hoje. (recebimentos.items: append)",
      "calls": "listarRecebimentos",
      "sets": "recebimentos"
    },
    "obterRecebimento": {
      "description": "Carrega o recebimento selecionado na lista para conferência e eventual estorno.",
      "calls": "obterRecebimento",
      "sets": "recebimento"
    },
    "buscarTitulosAbertos": {
      "description": "Busca os títulos em aberto que o caixa pode receber no formulário de registro.",
      "calls": "buscarTitulosAbertos",
      "sets": "titulos"
    },
    "registrarRecebimento": {
      "description": "Registra no caixa o recebimento total ou parcial de um título. (recebimentos.items: upsert; titulos.items: upsert)",
      "calls": "registrarRecebimento",
      "updates": [
        "recebimentos",
        "titulos"
      ]
    },
    "estornarRecebimento": {
      "description": "Estorna, pelo caixa, um recebimento registrado por engano no mesmo dia. (recebimentos.items: upsert)",
      "calls": "estornarRecebimento",
      "sets": "recebimento",
      "updates": [
        "recebimentos",
        "titulos"
      ]
    },
    "abrirTitulo": {
      "description": "Conferência do recebimento: título baixado e seu saldo em aberto, valor recebido, forma de pagamento, canal, momento do recebimento, se gerou baixa parcial e, quando estornado, o motivo e o momento do estorno.",
      "navigate": "titulos_receber",
      "carries": {
        "recebimentoId": "selectedRecebimento.id"
      }
    }
  },
  "journeys": [
    {
      "step": "estornarRecebimento/localizarRecebimento",
      "organisms": [
        "recebimentosList"
      ],
      "functions": [
        "listarRecebimentos"
      ]
    },
    {
      "step": "estornarRecebimento/conferirRecebimento",
      "organisms": [
        "recebimentoDetail"
      ],
      "functions": [
        "obterRecebimento"
      ]
    },
    {
      "step": "estornarRecebimento/estornar",
      "organisms": [
        "estornarRecebimentoActions"
      ],
      "functions": [
        "estornarRecebimento"
      ]
    },
    {
      "step": "receberTitulo/localizarTitulo",
      "organisms": [
        "registrarRecebimentoForm"
      ],
      "functions": [
        "buscarTitulosAbertos"
      ]
    },
    {
      "step": "receberTitulo/conferirTitulo",
      "organisms": [
        "registrarRecebimentoForm"
      ],
      "functions": [
        "buscarTitulosAbertos"
      ]
    },
    {
      "step": "receberTitulo/registrarRecebimento",
      "organisms": [
        "registrarRecebimentoForm"
      ],
      "functions": [
        "registrarRecebimento"
      ]
    }
  ],
  "rules": {
    "listarRecebimentos": [
      "estornoSomenteMesmoDia"
    ],
    "obterRecebimento": [
      "estornoSomenteMesmoDia",
      "saldoAbertoCalculado",
      "recebimentoEstornadoNaoConta"
    ],
    "buscarTitulosAbertos": [
      "tituloQuitadoNaoRecebe",
      "saldoAbertoCalculado",
      "recebimentoEstornadoNaoConta"
    ],
    "registrarRecebimento": [
      "recebimentoValorPositivo",
      "recebimentoNaoExcedeSaldo",
      "tituloQuitadoNaoRecebe",
      "formaPagamentoPermitida",
      "numeroRecebimentoUnico",
      "stripePagamentoUnico",
      "tituloQuitadoQuandoSaldoZera",
      "saldoAbertoCalculado"
    ],
    "estornarRecebimento": [
      "estornoExigeMotivo",
      "estornoSomenteMesmoDia",
      "estornoRestabeleceSaldo",
      "recebimentoEstornadoNaoConta"
    ]
  },
  "access": {
    "actors": [
      "caixa",
      "gerenteFinanceiro"
    ],
    "grants": [
      "caixaTitulos",
      "caixaRecebimentos",
      "caixaPagadorIdentificacao",
      "gerenteRecebiveis",
      "gerentePagadores"
    ]
  },
  "fields": {
    "Pagador.details.identification.docId": [
      "registrarRecebimentoForm"
    ],
    "Pagador.details.identification.name": [
      "recebimentoDetail",
      "recebimentosList",
      "registrarRecebimentoForm"
    ],
    "Recebimento.details.baixaParcial": [
      "recebimentoDetail"
    ],
    "Recebimento.details.canal": [
      "recebimentoDetail"
    ],
    "Recebimento.details.estornavel": [
      "estornarRecebimentoActions",
      "recebimentosList"
    ],
    "Recebimento.details.estorno.estornadoEm": [
      "recebimentoDetail"
    ],
    "Recebimento.details.estorno.motivo": [
      "estornarRecebimentoActions",
      "recebimentoDetail"
    ],
    "Recebimento.details.observacao": [
      "recebimentoDetail",
      "registrarRecebimentoForm"
    ],
    "Recebimento.details.valor": [
      "recebimentoDetail",
      "recebimentosList",
      "registrarRecebimentoForm"
    ],
    "Recebimento.formaPagamento": [
      "recebimentoDetail",
      "recebimentosList",
      "registrarRecebimentoForm"
    ],
    "Recebimento.numero": [
      "estornarRecebimentoActions",
      "recebimentoDetail",
      "recebimentosList"
    ],
    "Recebimento.recebidoEm": [
      "estornarRecebimentoActions",
      "recebimentoDetail",
      "recebimentosList"
    ],
    "Recebimento.status": [
      "estornarRecebimentoActions",
      "recebimentoDetail",
      "recebimentosList"
    ],
    "Recebimento.tituloId": [
      "recebimentoDetail",
      "registrarRecebimentoForm"
    ],
    "TituloReceber.details.saldoAberto": [
      "recebimentoDetail",
      "registrarRecebimentoForm"
    ],
    "TituloReceber.details.valor": [
      "registrarRecebimentoForm"
    ],
    "TituloReceber.numero": [
      "recebimentoDetail",
      "recebimentosList",
      "registrarRecebimentoForm"
    ],
    "TituloReceber.vencimento": [
      "registrarRecebimentoForm"
    ]
  }
} as const;
