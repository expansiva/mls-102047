/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/mensalidades.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "competencia": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaMensalidades",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaMensalidades",
        "persist": true
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaMensalidades",
        "persist": true
      },
      "vencida": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaMensalidades",
        "persist": true
      },
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaMensalidades",
        "persist": true
      },
      "mensalidadeId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheMensalidade",
        "persist": true
      },
      "alunoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Aluno",
        "persist": true
      },
      "matriculaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Matricula",
        "persist": true
      }
    }
  },
  "forms": {
    "lancarPagamento": {
      "organism": "formPagamento",
      "submit": "lancarPagamento"
    },
    "gerarMensalidades": {
      "organism": "acoesMensalidades",
      "submit": "gerarMensalidades"
    }
  },
  "requests": {
    "carregarMensalidades": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "resumoMes",
        "mensalidades"
      ]
    },
    "buscarMensalidades": {
      "kind": "qry",
      "trigger": "buscarMensalidades",
      "returns": [
        "mensalidades"
      ]
    },
    "obterMensalidade": {
      "kind": "qry",
      "trigger": "obterMensalidade",
      "returns": [
        "mensalidade"
      ]
    },
    "lancarPagamento": {
      "kind": "cmd",
      "trigger": "lancarPagamento",
      "returns": [
        "mensalidade"
      ],
      "writes": "Pagamento.create"
    },
    "gerarMensalidades": {
      "kind": "cmd",
      "trigger": "gerarMensalidades",
      "returns": [
        "competencia",
        "quantidadeGeradas",
        "quantidadeJaExistentes"
      ],
      "writes": "Mensalidade.create"
    }
  },
  "states": {
    "mensalidades": {
      "source": "carregarMensalidades.mensalidades",
      "description": "Linha da lista de mensalidades por competência e aluno.",
      "organisms": [
        "listaMensalidades"
      ]
    },
    "mensalidade": {
      "source": "obterMensalidade.mensalidade",
      "description": "Mensalidade escolhida com seus pagamentos e saldo, usada na conferência e no lançamento do pagamento.",
      "organisms": [
        "detalheMensalidade",
        "formPagamento"
      ]
    },
    "resumoMes": {
      "source": "carregarMensalidades.resumoMes",
      "description": "Contexto das ações do mês: competência sugerida e quantidades para a gerência conferir antes de gerar.",
      "organisms": [
        "acoesMensalidades"
      ]
    },
    "selectedMensalidade": {
      "source": "entry.params.mensalidadeId",
      "description": "Mensalidade escolhida com seus pagamentos e saldo, usada na conferência e no lançamento do pagamento.",
      "organisms": [
        "detalheMensalidade",
        "formPagamento",
        "listaMensalidades"
      ]
    }
  },
  "functions": {
    "carregarMensalidades": {
      "description": "Abre a página de mensalidades em uma só chamada: o resumo do mês para as ações e a primeira página da lista de mensalidades.",
      "calls": "carregarMensalidades",
      "sets": "mensalidades",
      "updates": [
        "resumoMes"
      ]
    },
    "buscarMensalidades": {
      "description": "Filtra e pagina a lista de mensalidades: a recepção acha a cobrança do aluno, a gerência revisa as geradas do mês ou as vencidas.",
      "calls": "buscarMensalidades",
      "sets": "mensalidades"
    },
    "obterMensalidade": {
      "description": "Carrega a mensalidade escolhida na lista para conferência e para alimentar o lançamento do pagamento.",
      "calls": "obterMensalidade",
      "sets": "mensalidade"
    },
    "lancarPagamento": {
      "description": "Registra o pagamento recebido no balcão para a mensalidade conferida e devolve a mensalidade atualizada.",
      "calls": "lancarPagamento",
      "sets": "mensalidade",
      "updates": [
        "mensalidades",
        "resumoMes"
      ]
    },
    "gerarMensalidades": {
      "description": "Gera as mensalidades do mês de referência informado pela gerência, uma por matrícula ativa.",
      "calls": "gerarMensalidades",
      "updates": [
        "mensalidades",
        "resumoMes"
      ]
    },
    "conferirMatriculasAtivas": {
      "description": "A gerência informa o mês de referência e gera uma mensalidade por matrícula ativa, sem duplicar as já geradas, e pode conferir as matrículas ativas antes. A recepção registra o pagamento da mensalidade escolhida.",
      "navigate": "matriculas"
    }
  },
  "journeys": [
    {
      "step": "acompanharPainel/verPainel",
      "organisms": [],
      "functions": [],
      "continuesIn": "painel_financeiro"
    },
    {
      "step": "acompanharPainel/detalharInadimplentes",
      "organisms": [
        "listaMensalidades"
      ],
      "functions": [
        "carregarMensalidades",
        "buscarMensalidades"
      ]
    },
    {
      "step": "gerarMensalidadesMes/conferirMatriculasAtivas",
      "organisms": [
        "acoesMensalidades"
      ],
      "functions": [
        "carregarMensalidades"
      ],
      "continuesIn": "matriculas"
    },
    {
      "step": "gerarMensalidadesMes/gerarMensalidades",
      "organisms": [
        "acoesMensalidades"
      ],
      "functions": [
        "gerarMensalidades"
      ]
    },
    {
      "step": "gerarMensalidadesMes/revisarMensalidadesGeradas",
      "organisms": [
        "listaMensalidades"
      ],
      "functions": [
        "carregarMensalidades",
        "buscarMensalidades"
      ]
    },
    {
      "step": "registrarPagamento/localizarMensalidade",
      "organisms": [
        "listaMensalidades"
      ],
      "functions": [
        "carregarMensalidades",
        "buscarMensalidades"
      ]
    },
    {
      "step": "registrarPagamento/conferirMensalidade",
      "organisms": [
        "detalheMensalidade"
      ],
      "functions": [
        "obterMensalidade"
      ]
    },
    {
      "step": "registrarPagamento/lancarPagamento",
      "organisms": [
        "formPagamento"
      ],
      "functions": [
        "lancarPagamento"
      ]
    }
  ],
  "rules": {
    "carregarMensalidades": [
      "mensalidadeVencida",
      "mensalidadeVencidaAposVencimento",
      "gerarSomenteMatriculaAtiva",
      "somenteAtivaGeraMensalidade"
    ],
    "buscarMensalidades": [
      "mensalidadeVencida",
      "mensalidadeVencidaAposVencimento"
    ],
    "obterMensalidade": [
      "mensalidadeVencida",
      "mensalidadeVencidaAposVencimento"
    ],
    "lancarPagamento": [
      "pagamentoValorPositivo",
      "pagamentoSomenteMensalidadeEmAberto",
      "pagamentoQuitaMensalidade",
      "quitacaoPorPagamento",
      "regularizacaoDesbloqueiaAluno"
    ],
    "gerarMensalidades": [
      "gerarSomenteMatriculaAtiva",
      "somenteAtivaGeraMensalidade",
      "cancelamentoEncerraMensalidadesFuturas",
      "mensalidadeUnicaPorMatriculaMes",
      "valorDoPlanoNaGeracao",
      "vencimentoNoDiaDoPlano"
    ]
  },
  "access": {
    "actors": [
      "gerencia",
      "recepcao"
    ],
    "grants": [
      "recepcaoAlunos",
      "recepcaoMatriculas",
      "gerenciaMensalidades",
      "gerenciaAlunos"
    ]
  },
  "fields": {
    "Aluno.details.identification.name": [
      "detalheMensalidade",
      "formPagamento",
      "listaMensalidades"
    ],
    "Matricula.numero": [
      "listaMensalidades"
    ],
    "Matricula.status": [
      "acoesMensalidades"
    ],
    "Mensalidade.competencia": [
      "acoesMensalidades",
      "detalheMensalidade",
      "listaMensalidades"
    ],
    "Mensalidade.details.geradaEm": [
      "detalheMensalidade"
    ],
    "Mensalidade.details.quitadaEm": [
      "detalheMensalidade"
    ],
    "Mensalidade.details.saldoDevedor": [
      "detalheMensalidade",
      "formPagamento",
      "listaMensalidades"
    ],
    "Mensalidade.details.totalPago": [
      "detalheMensalidade",
      "listaMensalidades"
    ],
    "Mensalidade.details.valor": [
      "detalheMensalidade",
      "listaMensalidades"
    ],
    "Mensalidade.details.vencida": [
      "detalheMensalidade",
      "listaMensalidades"
    ],
    "Mensalidade.status": [
      "detalheMensalidade",
      "listaMensalidades"
    ],
    "Mensalidade.vencimento": [
      "detalheMensalidade",
      "formPagamento",
      "listaMensalidades"
    ],
    "Pagamento.dataPagamento": [
      "detalheMensalidade",
      "formPagamento"
    ],
    "Pagamento.details.formaPagamento": [
      "detalheMensalidade",
      "formPagamento"
    ],
    "Pagamento.details.observacao": [
      "formPagamento"
    ],
    "Pagamento.details.valor": [
      "detalheMensalidade",
      "formPagamento"
    ],
    "Pagamento.mensalidadeId": [
      "formPagamento"
    ],
    "Pagamento.registradoEm": [
      "detalheMensalidade"
    ]
  }
} as const;
