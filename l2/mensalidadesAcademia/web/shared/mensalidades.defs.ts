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
        "effect": "filter:mensalidadesLista",
        "persist": true
      },
      "name": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:mensalidadesLista",
        "persist": true
      },
      "vencida": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:mensalidadesLista",
        "persist": true
      },
      "paga": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:mensalidadesLista",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:mensalidadesLista",
        "persist": true
      },
      "mensalidadeId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:mensalidadeDetalhe",
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
    "registrarPagamento": {
      "organism": "pagamentoForm",
      "submit": "registrarPagamento"
    },
    "gerarMensalidades": {
      "organism": "mensalidadeAcoes",
      "submit": "gerarMensalidades"
    }
  },
  "requests": {
    "qryMensalidades": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "mensalidades",
        "matriculasAtivas"
      ]
    },
    "qryMensalidadeDetalhe": {
      "kind": "qry",
      "trigger": "qryMensalidadeDetalhe",
      "returns": [
        "mensalidade"
      ]
    },
    "cmdRegistrarPagamento": {
      "kind": "cmd",
      "trigger": "registrarPagamento",
      "returns": [
        "mensalidade",
        "linha"
      ],
      "writes": "Pagamento.create"
    },
    "cmdGerarMensalidades": {
      "kind": "cmd",
      "trigger": "gerarMensalidades",
      "returns": [
        "quantidadeGeradas",
        "quantidadeJaExistentes"
      ],
      "writes": "Mensalidade.create"
    }
  },
  "states": {
    "mensalidades": {
      "source": "qryMensalidades.mensalidades",
      "description": "Linha da lista de mensalidades da competência.",
      "organisms": [
        "mensalidadesLista"
      ]
    },
    "mensalidade": {
      "source": "qryMensalidadeDetalhe.mensalidade",
      "description": "Mensalidade escolhida com aluno, matrícula e pagamentos em ordem de data.",
      "organisms": [
        "mensalidadeDetalhe",
        "mensalidadeHistorico",
        "pagamentoForm"
      ]
    },
    "matriculasAtivas": {
      "source": "qryMensalidades.matriculasAtivas",
      "description": "Página de linhas de mensalidade { items, page, pageSize, hasMore } e o número de matrículas ativas que receberão mensalidade.",
      "organisms": [
        "mensalidadeAcoes"
      ]
    },
    "selectedMensalidade": {
      "source": "entry.params.mensalidadeId",
      "description": "Mensalidade escolhida com aluno, matrícula e pagamentos em ordem de data.",
      "organisms": [
        "mensalidadeDetalhe",
        "mensalidadesLista",
        "pagamentoForm"
      ]
    }
  },
  "functions": {
    "qryMensalidades": {
      "description": "Carrega as mensalidades da competência para a recepção localizar a cobrança e a gerência conferir a geração do mês, junto com a contagem de matrículas ativas usada nas ações do mês.",
      "calls": "qryMensalidades",
      "sets": "mensalidades",
      "updates": [
        "matriculasAtivas"
      ]
    },
    "qryMensalidadeDetalhe": {
      "description": "Abre a mensalidade escolhida na lista com seus pagamentos, a matrícula e o bloqueio do aluno, para conferência e lançamento de pagamento.",
      "calls": "qryMensalidadeDetalhe",
      "sets": "mensalidade"
    },
    "cmdRegistrarPagamento": {
      "description": "Registra o pagamento da mensalidade escolhida e devolve a mensalidade já recalculada. (mensalidades.items: upsert)",
      "calls": "cmdRegistrarPagamento",
      "sets": "mensalidade",
      "updates": [
        "mensalidades"
      ]
    },
    "cmdGerarMensalidades": {
      "description": "Gera as mensalidades da competência informada pela gerência, uma por matrícula ativa.",
      "calls": "cmdGerarMensalidades",
      "updates": [
        "mensalidades",
        "matriculasAtivas"
      ]
    },
    "verMatriculas": {
      "description": "Mensalidade escolhida com competência, valor, vencimento, situação, total pago e os pagamentos já lançados, além da indicação de bloqueio do aluno.",
      "navigate": "matriculas",
      "carries": {
        "mensalidadeId": "selectedMensalidade.id"
      }
    }
  },
  "journeys": [
    {
      "step": "acompanharPainel/abrirPainel",
      "organisms": [],
      "functions": [],
      "continuesIn": "painel_mensalidades"
    },
    {
      "step": "acompanharPainel/listarInadimplentes",
      "organisms": [
        "mensalidadesLista"
      ],
      "functions": [
        "qryMensalidades"
      ]
    },
    {
      "step": "gerarMensalidadesDoMes/consultarMatriculasAtivas",
      "organisms": [
        "mensalidadeAcoes"
      ],
      "functions": [
        "qryMensalidades"
      ]
    },
    {
      "step": "gerarMensalidadesDoMes/gerarMensalidades",
      "organisms": [
        "mensalidadeAcoes"
      ],
      "functions": [
        "cmdGerarMensalidades"
      ]
    },
    {
      "step": "gerarMensalidadesDoMes/conferirMensalidades",
      "organisms": [
        "mensalidadesLista",
        "mensalidadeHistorico"
      ],
      "functions": [
        "qryMensalidades",
        "qryMensalidadeDetalhe"
      ]
    },
    {
      "step": "registrarPagamento/localizarMensalidade",
      "organisms": [
        "mensalidadesLista"
      ],
      "functions": [
        "qryMensalidades"
      ]
    },
    {
      "step": "registrarPagamento/verMensalidade",
      "organisms": [
        "mensalidadeDetalhe"
      ],
      "functions": [
        "qryMensalidadeDetalhe"
      ]
    },
    {
      "step": "registrarPagamento/lancarPagamento",
      "organisms": [
        "pagamentoForm"
      ],
      "functions": [
        "cmdRegistrarPagamento"
      ]
    }
  ],
  "rules": {
    "qryMensalidades": [
      "mensalidadeVencidaAposVencimento",
      "mensalidadePagaQuandoQuitada"
    ],
    "qryMensalidadeDetalhe": [
      "mensalidadePagaQuandoQuitada",
      "mensalidadeVencidaAposVencimento",
      "alunoBloqueadoComDuasVencidas"
    ],
    "cmdRegistrarPagamento": [
      "pagamentoQuitaMensalidade",
      "pagamentoValorPositivo",
      "pagamentoDataNaoFutura",
      "mensalidadePagaQuandoQuitada",
      "alunoDesbloqueadoAoRegularizarVencidas"
    ],
    "cmdGerarMensalidades": [
      "mensalidadeSomenteMatriculaAtiva",
      "matriculaCanceladaNaoGeraMensalidade",
      "mensalidadeSomenteAposDataInicio",
      "mensalidadeUnicaPorMatriculaCompetencia",
      "mensalidadeValorDoPlano",
      "mensalidadeVencimentoNoDiaDoPlano"
    ]
  },
  "access": {
    "actors": [
      "gerencia",
      "recepcao"
    ],
    "grants": [
      "recepcaoAlunos",
      "recepcaoMatriculasCobrancas",
      "gerenciaCobrancas",
      "gerenciaAlunos"
    ]
  },
  "fields": {
    "Aluno.details.identification.name": [
      "mensalidadeDetalhe",
      "mensalidadesLista"
    ],
    "Aluno.details.mensalidadesAcademia.bloqueado": [
      "mensalidadeDetalhe"
    ],
    "Matricula.codigo": [
      "mensalidadeDetalhe"
    ],
    "Matricula.status": [
      "mensalidadeAcoes"
    ],
    "Mensalidade.competencia": [
      "mensalidadeAcoes",
      "mensalidadeDetalhe",
      "mensalidadeHistorico",
      "mensalidadesLista"
    ],
    "Mensalidade.details.geradaEm": [
      "mensalidadeHistorico"
    ],
    "Mensalidade.details.observacao": [
      "mensalidadeDetalhe"
    ],
    "Mensalidade.details.paga": [
      "mensalidadesLista"
    ],
    "Mensalidade.details.situacao": [
      "mensalidadeDetalhe",
      "mensalidadesLista"
    ],
    "Mensalidade.details.totalPago": [
      "mensalidadeDetalhe",
      "mensalidadesLista",
      "pagamentoForm"
    ],
    "Mensalidade.details.valor": [
      "mensalidadeDetalhe",
      "mensalidadesLista",
      "pagamentoForm"
    ],
    "Mensalidade.details.vencida": [
      "mensalidadesLista"
    ],
    "Mensalidade.matriculaId": [
      "mensalidadesLista"
    ],
    "Mensalidade.vencimento": [
      "mensalidadeDetalhe",
      "mensalidadesLista"
    ],
    "Pagamento.dataPagamento": [
      "mensalidadeDetalhe",
      "mensalidadeHistorico",
      "pagamentoForm"
    ],
    "Pagamento.details.forma": [
      "mensalidadeDetalhe",
      "mensalidadeHistorico",
      "pagamentoForm"
    ],
    "Pagamento.details.observacao": [
      "pagamentoForm"
    ],
    "Pagamento.details.valor": [
      "mensalidadeDetalhe",
      "mensalidadeHistorico",
      "pagamentoForm"
    ],
    "Pagamento.mensalidadeId": [
      "pagamentoForm"
    ]
  }
} as const;
