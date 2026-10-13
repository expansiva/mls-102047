/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/painel_financeiro.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:mensalidadesVencidas",
        "persist": true
      },
      "mensalidadeId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:atalhos",
        "persist": true
      }
    }
  },
  "forms": {},
  "requests": {
    "qryPainelMes": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "painel"
      ]
    },
    "qryMensalidadesVencidas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "mensalidades"
      ]
    }
  },
  "states": {
    "painel": {
      "source": "qryPainelMes.painel",
      "description": "Linha do painel do mês corrente com seus indicadores.",
      "organisms": [
        "indicadoresMes",
        "lembreteGeracao"
      ]
    },
    "mensalidades": {
      "source": "qryMensalidadesVencidas.mensalidades",
      "description": "Mensalidade vencida com matrícula, aluno e saldo devedor.",
      "organisms": [
        "mensalidadesVencidas"
      ]
    },
    "selectedMensalidade": {
      "source": "entry.params.mensalidadeId",
      "description": "Mensalidade vencida com matrícula, aluno e saldo devedor.",
      "organisms": [
        "atalhos",
        "mensalidadesVencidas"
      ]
    }
  },
  "functions": {
    "qryPainelMes": {
      "description": "Carrega, ao abrir a página, os indicadores financeiros do mês corrente para o resumo e para o lembrete de geração.",
      "calls": "qryPainelMes",
      "sets": "painel"
    },
    "qryMensalidadesVencidas": {
      "description": "Lista, paginada, as mensalidades vencidas dos alunos inadimplentes para a gerência priorizar a cobrança. (mensalidades.items: append)",
      "calls": "qryMensalidadesVencidas",
      "sets": "mensalidades"
    },
    "abrirMensalidadeInadimplente": {
      "description": "Atalhos para abrir uma mensalidade inadimplente e acompanhar a cobrança, ou ir para a geração das mensalidades do mês.",
      "navigate": "mensalidades",
      "carries": {
        "mensalidadeId": "selectedMensalidade.id"
      }
    },
    "irParaGeracaoMensalidades": {
      "description": "Atalhos para abrir uma mensalidade inadimplente e acompanhar a cobrança, ou ir para a geração das mensalidades do mês.",
      "navigate": "mensalidades",
      "carries": {
        "mensalidadeId": "selectedMensalidade.id"
      }
    }
  },
  "journeys": [
    {
      "step": "acompanharPainel/verPainel",
      "organisms": [
        "indicadoresMes",
        "lembreteGeracao"
      ],
      "functions": [
        "qryPainelMes"
      ]
    },
    {
      "step": "acompanharPainel/detalharInadimplentes",
      "organisms": [
        "mensalidadesVencidas",
        "atalhos"
      ],
      "functions": [
        "qryMensalidadesVencidas"
      ],
      "continuesIn": "mensalidades"
    }
  ],
  "rules": {
    "qryPainelMes": [
      "painelTotalAreceber",
      "painelTotalRecebido",
      "painelQuantidadeAlunos",
      "alunoInadimplente",
      "alunoBloqueadoDuasVencidas",
      "mensalidadeVencida"
    ],
    "qryMensalidadesVencidas": [
      "mensalidadeVencida",
      "mensalidadeVencidaAposVencimento",
      "alunoInadimplente"
    ]
  },
  "access": {
    "actors": [
      "gerencia"
    ],
    "grants": [
      "gerenciaMensalidades",
      "gerenciaAlunos",
      "gerenciaPainel"
    ]
  },
  "fields": {
    "Aluno.details.identification.name": [
      "mensalidadesVencidas"
    ],
    "Aluno.details.mensalidadesAcademia.inadimplente": [
      "mensalidadesVencidas"
    ],
    "Aluno.details.mensalidadesAcademia.quantidadeMensalidadesVencidas": [
      "mensalidadesVencidas"
    ],
    "Matricula.numero": [
      "mensalidadesVencidas"
    ],
    "Mensalidade.competencia": [
      "mensalidadesVencidas"
    ],
    "Mensalidade.details.saldoDevedor": [
      "mensalidadesVencidas"
    ],
    "Mensalidade.details.totalPago": [
      "mensalidadesVencidas"
    ],
    "Mensalidade.details.vencida": [
      "mensalidadesVencidas"
    ],
    "Mensalidade.status": [
      "mensalidadesVencidas"
    ],
    "Mensalidade.vencimento": [
      "mensalidadesVencidas"
    ],
    "PainelMensalidades.details.alunosAtivos": [
      "indicadoresMes",
      "lembreteGeracao"
    ],
    "PainelMensalidades.details.alunosBloqueados": [
      "indicadoresMes"
    ],
    "PainelMensalidades.details.alunosInadimplentes": [
      "indicadoresMes"
    ],
    "PainelMensalidades.details.totalAReceber": [
      "indicadoresMes"
    ],
    "PainelMensalidades.details.totalRecebido": [
      "indicadoresMes"
    ],
    "PainelMensalidades.mesReferencia": [
      "indicadoresMes",
      "lembreteGeracao"
    ]
  }
} as const;
