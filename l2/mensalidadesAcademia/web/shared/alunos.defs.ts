/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/alunos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAlunos",
        "persist": true
      },
      "somenteInadimplentes": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAlunos",
        "persist": true
      },
      "somenteBloqueados": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAlunos",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAlunos",
        "persist": true
      },
      "alunoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:situacaoFinanceiraAluno",
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
  "forms": {},
  "requests": {
    "listarAlunos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "alunos"
      ]
    },
    "obterSituacaoFinanceiraAluno": {
      "kind": "qry",
      "trigger": "obterSituacaoFinanceiraAluno",
      "returns": [
        "aluno"
      ]
    }
  },
  "states": {
    "alunos": {
      "source": "listarAlunos.alunos",
      "description": "Linha da lista de alunos com os sinais financeiros já calculados.",
      "organisms": [
        "listaAlunos"
      ]
    },
    "aluno": {
      "source": "obterSituacaoFinanceiraAluno.aluno",
      "description": "Cabeçalho do aluno com indicadores de bloqueio e inadimplência e suas matrículas com as mensalidades.",
      "organisms": [
        "situacaoFinanceiraAluno"
      ]
    },
    "selectedAluno": {
      "source": "entry.params.alunoId",
      "description": "Cabeçalho do aluno com indicadores de bloqueio e inadimplência e suas matrículas com as mensalidades.",
      "organisms": [
        "listaAlunos",
        "situacaoFinanceiraAluno"
      ]
    }
  },
  "functions": {
    "listarAlunos": {
      "description": "Carrega a lista paginada de alunos da academia com os sinais de inadimplência, bloqueio e quantidade de mensalidades vencidas, e atende a busca pelo nome.",
      "calls": "listarAlunos",
      "sets": "alunos"
    },
    "obterSituacaoFinanceiraAluno": {
      "description": "Carrega, ao escolher um aluno na lista, sua situação financeira completa: indicadores, matrículas com liberação de entrada e mensalidades com saldo.",
      "calls": "obterSituacaoFinanceiraAluno",
      "sets": "aluno"
    },
    "irParaMatricularAluno": {
      "description": "Alunos da academia com nome, situação do cadastro e indicação de inadimplente, bloqueado e quantidade de mensalidades vencidas, para achar quem precisa de atenção no balcão ou na cobrança.",
      "navigate": "matriculas",
      "carries": {
        "alunoId": "selectedAluno.id"
      }
    },
    "abrirMatriculasDoAluno": {
      "description": "Situação financeira do aluno na academia: se está bloqueado ou inadimplente, quantas mensalidades estão vencidas, suas matrículas com entrada liberada ou bloqueada e as mensalidades com total pago e saldo devedor.",
      "navigate": "matriculas",
      "carries": {
        "alunoId": "selectedAluno.id"
      }
    },
    "abrirMensalidadesDoAluno": {
      "description": "Situação financeira do aluno na academia: se está bloqueado ou inadimplente, quantas mensalidades estão vencidas, suas matrículas com entrada liberada ou bloqueada e as mensalidades com total pago e saldo devedor.",
      "navigate": "mensalidades",
      "carries": {
        "alunoId": "selectedAluno.id"
      }
    }
  },
  "journeys": [
    {
      "step": "matricularAluno/localizarAluno",
      "organisms": [
        "listaAlunos"
      ],
      "functions": [
        "listarAlunos"
      ]
    },
    {
      "step": "matricularAluno/escolherPlano",
      "organisms": [],
      "functions": [],
      "continuesIn": "matriculas"
    },
    {
      "step": "matricularAluno/registrarMatricula",
      "organisms": [],
      "functions": [],
      "continuesIn": "matriculas"
    }
  ],
  "rules": {
    "listarAlunos": [
      "mensalidadeVencida",
      "mensalidadeVencidaAposVencimento",
      "alunoBloqueadoDuasVencidas"
    ],
    "obterSituacaoFinanceiraAluno": [
      "mensalidadeVencida",
      "mensalidadeVencidaAposVencimento",
      "alunoBloqueadoDuasVencidas",
      "alunoBloqueadoComDuasVencidas",
      "alunoBloqueadoNaoEntra",
      "bloqueadoNaoEntra"
    ]
  },
  "access": {
    "actors": [
      "gerencia",
      "recepcao"
    ],
    "grants": [
      "recepcaoAlunos",
      "recepcaoPlanos",
      "recepcaoMatriculas",
      "gerenciaPlanos",
      "gerenciaMensalidades",
      "gerenciaAlunos"
    ]
  },
  "fields": {
    "Aluno.details.identification.name": [
      "listaAlunos",
      "situacaoFinanceiraAluno"
    ],
    "Aluno.details.identification.status": [
      "listaAlunos",
      "situacaoFinanceiraAluno"
    ],
    "Aluno.details.mensalidadesAcademia.bloqueado": [
      "listaAlunos",
      "situacaoFinanceiraAluno"
    ],
    "Aluno.details.mensalidadesAcademia.inadimplente": [
      "listaAlunos",
      "situacaoFinanceiraAluno"
    ],
    "Aluno.details.mensalidadesAcademia.quantidadeMensalidadesVencidas": [
      "listaAlunos",
      "situacaoFinanceiraAluno"
    ],
    "Matricula.dataInicio": [
      "situacaoFinanceiraAluno"
    ],
    "Matricula.details.bloqueada": [
      "situacaoFinanceiraAluno"
    ],
    "Matricula.details.entradaLiberada": [
      "situacaoFinanceiraAluno"
    ],
    "Matricula.details.inadimplente": [
      "situacaoFinanceiraAluno"
    ],
    "Matricula.details.mensalidadesVencidas": [
      "situacaoFinanceiraAluno"
    ],
    "Matricula.numero": [
      "situacaoFinanceiraAluno"
    ],
    "Matricula.status": [
      "situacaoFinanceiraAluno"
    ],
    "Mensalidade.competencia": [
      "situacaoFinanceiraAluno"
    ],
    "Mensalidade.details.saldoDevedor": [
      "situacaoFinanceiraAluno"
    ],
    "Mensalidade.details.totalPago": [
      "situacaoFinanceiraAluno"
    ],
    "Mensalidade.details.valor": [
      "situacaoFinanceiraAluno"
    ],
    "Mensalidade.details.vencida": [
      "situacaoFinanceiraAluno"
    ],
    "Mensalidade.status": [
      "situacaoFinanceiraAluno"
    ],
    "Mensalidade.vencimento": [
      "situacaoFinanceiraAluno"
    ],
    "Plano.nome": [
      "situacaoFinanceiraAluno"
    ]
  }
} as const;
