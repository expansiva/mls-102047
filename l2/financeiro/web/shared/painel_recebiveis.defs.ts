/// <mls fileReference="_102047_/l2/financeiro/web/shared/painel_recebiveis.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "periodoInicio": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:recebiveisPorOrigem",
        "persist": true
      },
      "periodoFim": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:recebiveisPorOrigem",
        "persist": true
      },
      "origem": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:recebiveisPorOrigem",
        "persist": true
      },
      "pagadorBusca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:recebiveisPorOrigem",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:recebiveisPorOrigem",
        "persist": true
      },
      "tituloId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:detalheTituloVencido",
        "persist": true
      },
      "tituloReceberId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheTituloVencido",
        "persist": true
      }
    }
  },
  "forms": {},
  "requests": {
    "qryPainelRecebiveis": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "porOrigem",
        "resumoVencidos",
        "vencidos"
      ]
    },
    "qryVencidosPagina": {
      "kind": "qry",
      "trigger": "qryVencidosPagina",
      "returns": [
        "vencidos"
      ]
    },
    "qryTituloVencido": {
      "kind": "qry",
      "trigger": "qryTituloVencido",
      "returns": [
        "titulo"
      ]
    }
  },
  "states": {
    "porOrigem": {
      "source": "qryPainelRecebiveis.porOrigem",
      "description": "Posição do período escolhido para uma origem.",
      "organisms": [
        "recebiveisPorOrigem"
      ]
    },
    "resumoVencidos": {
      "source": "qryPainelRecebiveis.resumoVencidos",
      "description": "Resumo dos vencidos no período e origem filtrados.",
      "organisms": [
        "resumoVencidos"
      ]
    },
    "vencidos": {
      "source": "qryPainelRecebiveis.vencidos",
      "description": "Linha da lista de títulos vencidos.",
      "organisms": [
        "listaVencidos"
      ]
    },
    "titulo": {
      "source": "qryTituloVencido.titulo",
      "description": "Título vencido com pagador, saldo e recebimentos.",
      "organisms": [
        "detalheTituloVencido"
      ]
    },
    "selectedTituloReceber": {
      "source": "entry.params.tituloReceberId",
      "description": "Título vencido com pagador, saldo e recebimentos.",
      "organisms": [
        "detalheTituloVencido",
        "listaVencidos"
      ]
    }
  },
  "functions": {
    "qryPainelRecebiveis": {
      "description": "Carrega de uma vez o painel de recebíveis do período escolhido: os totais por origem, o resumo dos vencidos e a primeira página da lista de títulos vencidos. É chamada de novo quando o gerente troca período, origem ou busca de pagador.",
      "calls": "qryPainelRecebiveis",
      "sets": "porOrigem",
      "updates": [
        "resumoVencidos",
        "vencidos"
      ]
    },
    "qryVencidosPagina": {
      "description": "Traz as páginas seguintes da lista de títulos vencidos quando o gerente rola ou pede mais. (vencidos.items: append)",
      "calls": "qryVencidosPagina",
      "updates": [
        "vencidos"
      ]
    },
    "qryTituloVencido": {
      "description": "Abre o título vencido selecionado na lista com pagador, valores, atraso e todos os recebimentos, inclusive estornados.",
      "calls": "qryTituloVencido",
      "sets": "titulo"
    },
    "abrirTitulosReceber": {
      "description": "Título vencido selecionado: pagador, origem, valor, vencimento, total recebido, saldo em aberto, dias de atraso e os recebimentos parciais, incluindo estornos.",
      "navigate": "titulos_receber",
      "carries": {
        "tituloReceberId": "selectedTituloReceber.id"
      }
    }
  },
  "journeys": [
    {
      "step": "acompanharRecebiveis/filtrarRecebiveis",
      "organisms": [
        "listaVencidos",
        "recebiveisPorOrigem"
      ],
      "functions": [
        "qryPainelRecebiveis"
      ]
    },
    {
      "step": "acompanharRecebiveis/verPainel",
      "organisms": [
        "recebiveisPorOrigem"
      ],
      "functions": [
        "qryPainelRecebiveis"
      ]
    },
    {
      "step": "acompanharRecebiveis/listarVencidos",
      "organisms": [
        "resumoVencidos",
        "listaVencidos"
      ],
      "functions": [
        "qryPainelRecebiveis",
        "qryVencidosPagina"
      ]
    },
    {
      "step": "acompanharRecebiveis/verTituloVencido",
      "organisms": [
        "detalheTituloVencido"
      ],
      "functions": [
        "qryTituloVencido"
      ]
    }
  ],
  "rules": {
    "qryPainelRecebiveis": [
      "painelSomenteGerenteFinanceiro",
      "painelTotaisCalculados",
      "estornoExcluiDoRecebido",
      "tituloVencidoEmAbertoAposVencimento",
      "saldoAbertoCalculado"
    ],
    "qryVencidosPagina": [
      "painelSomenteGerenteFinanceiro",
      "tituloVencidoEmAbertoAposVencimento",
      "saldoAbertoCalculado"
    ],
    "qryTituloVencido": [
      "painelSomenteGerenteFinanceiro",
      "saldoAbertoCalculado",
      "recebimentoEstornadoNaoConta",
      "tituloQuitadoQuandoSaldoZera",
      "tituloVencidoEmAbertoAposVencimento"
    ]
  },
  "access": {
    "actors": [
      "gerenteFinanceiro"
    ],
    "grants": [
      "gerenteRecebiveis",
      "gerentePagadores"
    ]
  },
  "fields": {
    "Pagador.details.identification.docId": [
      "detalheTituloVencido"
    ],
    "Pagador.details.identification.name": [
      "detalheTituloVencido",
      "listaVencidos"
    ],
    "PainelRecebiveis.details.quantidadeRecebimentos": [
      "recebiveisPorOrigem"
    ],
    "PainelRecebiveis.details.quantidadeTitulos": [
      "recebiveisPorOrigem"
    ],
    "PainelRecebiveis.details.quantidadeVencidos": [
      "resumoVencidos"
    ],
    "PainelRecebiveis.details.totalAReceber": [
      "recebiveisPorOrigem"
    ],
    "PainelRecebiveis.details.totalEmAberto": [
      "recebiveisPorOrigem"
    ],
    "PainelRecebiveis.details.totalRecebido": [
      "recebiveisPorOrigem"
    ],
    "PainelRecebiveis.details.totalVencido": [
      "resumoVencidos"
    ],
    "PainelRecebiveis.origem": [
      "recebiveisPorOrigem",
      "resumoVencidos"
    ],
    "PainelRecebiveis.periodo": [
      "recebiveisPorOrigem",
      "resumoVencidos"
    ],
    "Recebimento.details.baixaParcial": [
      "detalheTituloVencido"
    ],
    "Recebimento.details.estorno.estornadoEm": [
      "detalheTituloVencido"
    ],
    "Recebimento.details.valor": [
      "detalheTituloVencido"
    ],
    "Recebimento.formaPagamento": [
      "detalheTituloVencido"
    ],
    "Recebimento.numero": [
      "detalheTituloVencido"
    ],
    "Recebimento.recebidoEm": [
      "detalheTituloVencido"
    ],
    "Recebimento.status": [
      "detalheTituloVencido"
    ],
    "TituloReceber.details.descricao": [
      "detalheTituloVencido"
    ],
    "TituloReceber.details.diasAtraso": [
      "detalheTituloVencido",
      "listaVencidos"
    ],
    "TituloReceber.details.origemRotulo": [
      "detalheTituloVencido"
    ],
    "TituloReceber.details.parcialmenteRecebido": [
      "detalheTituloVencido"
    ],
    "TituloReceber.details.saldoAberto": [
      "detalheTituloVencido",
      "listaVencidos"
    ],
    "TituloReceber.details.totalRecebido": [
      "detalheTituloVencido"
    ],
    "TituloReceber.details.valor": [
      "detalheTituloVencido"
    ],
    "TituloReceber.details.vencido": [
      "listaVencidos"
    ],
    "TituloReceber.emissao": [
      "listaVencidos"
    ],
    "TituloReceber.id": [
      "listaVencidos"
    ],
    "TituloReceber.numero": [
      "detalheTituloVencido",
      "listaVencidos"
    ],
    "TituloReceber.origem": [
      "detalheTituloVencido",
      "listaVencidos"
    ],
    "TituloReceber.pagadorId": [
      "listaVencidos"
    ],
    "TituloReceber.vencimento": [
      "detalheTituloVencido",
      "listaVencidos"
    ]
  }
} as const;
