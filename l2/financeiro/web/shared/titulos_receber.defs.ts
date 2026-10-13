/// <mls fileReference="_102047_/l2/financeiro/web/shared/titulos_receber.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:resumoTitulos",
        "persist": true
      },
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaTitulos",
        "persist": true
      },
      "origem": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaTitulos",
        "persist": true
      },
      "somenteVencidos": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaTitulos",
        "persist": true
      },
      "tituloId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:detalheTitulo",
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
      "recebimentoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Recebimento",
        "persist": true
      }
    }
  },
  "forms": {
    "registrarRecebimento": {
      "organism": "registroRecebimento",
      "submit": "registrarRecebimento"
    }
  },
  "requests": {
    "carregarTitulosReceber": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "resumo",
        "titulos"
      ]
    },
    "buscarTitulos": {
      "kind": "qry",
      "trigger": "buscarTitulos",
      "returns": [
        "titulos"
      ]
    },
    "obterTitulo": {
      "kind": "qry",
      "trigger": "obterTitulo",
      "returns": [
        "titulo"
      ]
    },
    "registrarRecebimento": {
      "kind": "cmd",
      "trigger": "registrarRecebimento",
      "returns": [
        "titulo",
        "tituloItem",
        "resumo"
      ],
      "writes": "Recebimento.create"
    }
  },
  "states": {
    "resumo": {
      "source": "carregarTitulosReceber.resumo",
      "description": "Indicadores da posição dos títulos a receber, já calculados no servidor.",
      "organisms": [
        "resumoTitulos"
      ]
    },
    "titulos": {
      "source": "carregarTitulosReceber.titulos",
      "description": "Linha da lista de títulos com situação já calculada.",
      "organisms": [
        "listaTitulos"
      ]
    },
    "titulo": {
      "source": "obterTitulo.titulo",
      "description": "Título com pagador, totais derivados e os recebimentos lançados.",
      "organisms": [
        "detalheTitulo",
        "registroRecebimento"
      ]
    },
    "selectedTituloReceber": {
      "source": "entry.params.tituloReceberId",
      "description": "Título com pagador, totais derivados e os recebimentos lançados.",
      "organisms": [
        "detalheTitulo",
        "listaTitulos"
      ]
    }
  },
  "functions": {
    "carregarTitulosReceber": {
      "description": "Abre a tela de títulos a receber com os indicadores de posição e a primeira página da lista de títulos, em uma única chamada.",
      "calls": "carregarTitulosReceber",
      "sets": "resumo",
      "updates": [
        "titulos"
      ]
    },
    "buscarTitulos": {
      "description": "Busca títulos pelo número ou pelo nome/documento do pagador, com filtros opcionais de origem e de vencidos, para levar o usuário direto ao título a conferir.",
      "calls": "buscarTitulos",
      "sets": "titulos"
    },
    "obterTitulo": {
      "description": "Carrega a ficha do título selecionado com os recebimentos já lançados, para conferência e para o registro do recebimento ao lado.",
      "calls": "obterTitulo",
      "sets": "titulo"
    },
    "registrarRecebimento": {
      "description": "Registra no caixa o recebimento total ou parcial do título e devolve o título, a linha da lista e os indicadores já atualizados. (titulos.items: upsert)",
      "calls": "registrarRecebimento",
      "sets": "titulo",
      "updates": [
        "resumo",
        "titulos"
      ]
    },
    "verRecebimentos": {
      "description": "Ficha do título selecionado: pagador, origem e documento de origem, valor, vencimento, total recebido, saldo em aberto, dias de atraso e os recebimentos já lançados.",
      "navigate": "recebimentos",
      "carries": {
        "tituloReceberId": "selectedTituloReceber.id"
      }
    }
  },
  "journeys": [
    {
      "step": "acompanharRecebiveis/filtrarRecebiveis",
      "organisms": [
        "listaTitulos"
      ],
      "functions": [
        "buscarTitulos"
      ],
      "continuesIn": "painel_recebiveis"
    },
    {
      "step": "acompanharRecebiveis/verPainel",
      "organisms": [],
      "functions": [],
      "continuesIn": "painel_recebiveis"
    },
    {
      "step": "acompanharRecebiveis/listarVencidos",
      "organisms": [
        "resumoTitulos",
        "listaTitulos"
      ],
      "functions": [
        "carregarTitulosReceber",
        "buscarTitulos"
      ]
    },
    {
      "step": "acompanharRecebiveis/verTituloVencido",
      "organisms": [
        "detalheTitulo"
      ],
      "functions": [
        "obterTitulo"
      ]
    },
    {
      "step": "receberTitulo/localizarTitulo",
      "organisms": [
        "listaTitulos"
      ],
      "functions": [
        "carregarTitulosReceber",
        "buscarTitulos"
      ]
    },
    {
      "step": "receberTitulo/conferirTitulo",
      "organisms": [
        "detalheTitulo"
      ],
      "functions": [
        "obterTitulo"
      ]
    },
    {
      "step": "receberTitulo/registrarRecebimento",
      "organisms": [
        "registroRecebimento",
        "detalheTitulo"
      ],
      "functions": [
        "registrarRecebimento"
      ]
    }
  ],
  "rules": {
    "carregarTitulosReceber": [
      "saldoAbertoCalculado",
      "recebimentoEstornadoNaoConta",
      "tituloQuitadoQuandoSaldoZera",
      "tituloVencidoEmAbertoAposVencimento"
    ],
    "buscarTitulos": [
      "saldoAbertoCalculado",
      "recebimentoEstornadoNaoConta",
      "tituloQuitadoQuandoSaldoZera",
      "tituloVencidoEmAbertoAposVencimento"
    ],
    "obterTitulo": [
      "saldoAbertoCalculado",
      "recebimentoEstornadoNaoConta",
      "tituloQuitadoQuandoSaldoZera",
      "tituloVencidoEmAbertoAposVencimento"
    ],
    "registrarRecebimento": [
      "recebimentoValorPositivo",
      "recebimentoNaoExcedeSaldo",
      "tituloQuitadoNaoRecebe",
      "formaPagamentoPermitida",
      "stripePagamentoUnico",
      "numeroRecebimentoUnico",
      "saldoAbertoCalculado",
      "tituloQuitadoQuandoSaldoZera",
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
      "detalheTitulo",
      "listaTitulos"
    ],
    "Pagador.details.identification.docType": [
      "detalheTitulo"
    ],
    "Pagador.details.identification.name": [
      "detalheTitulo",
      "listaTitulos"
    ],
    "Recebimento.details.baixaParcial": [
      "detalheTitulo"
    ],
    "Recebimento.details.observacao": [
      "registroRecebimento"
    ],
    "Recebimento.details.valor": [
      "detalheTitulo",
      "registroRecebimento"
    ],
    "Recebimento.formaPagamento": [
      "detalheTitulo",
      "registroRecebimento"
    ],
    "Recebimento.numero": [
      "detalheTitulo"
    ],
    "Recebimento.recebidoEm": [
      "detalheTitulo"
    ],
    "Recebimento.status": [
      "detalheTitulo"
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
      "listaTitulos",
      "resumoTitulos"
    ],
    "TituloReceber.details.quitado": [
      "listaTitulos",
      "registroRecebimento"
    ],
    "TituloReceber.details.saldoAberto": [
      "detalheTitulo",
      "listaTitulos",
      "registroRecebimento",
      "resumoTitulos"
    ],
    "TituloReceber.details.totalRecebido": [
      "detalheTitulo",
      "resumoTitulos"
    ],
    "TituloReceber.details.valor": [
      "detalheTitulo",
      "listaTitulos"
    ],
    "TituloReceber.details.vencido": [
      "listaTitulos",
      "resumoTitulos"
    ],
    "TituloReceber.emissao": [
      "detalheTitulo"
    ],
    "TituloReceber.numero": [
      "detalheTitulo",
      "listaTitulos",
      "registroRecebimento"
    ],
    "TituloReceber.origem": [
      "detalheTitulo",
      "listaTitulos"
    ],
    "TituloReceber.pagadorId": [
      "listaTitulos"
    ],
    "TituloReceber.vencimento": [
      "detalheTitulo",
      "listaTitulos"
    ]
  }
} as const;
