/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/painel_mensalidades.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "competencia": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:resumoDoMes",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:resumoDoMes",
        "persist": true
      },
      "matriculaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:geracaoMensalidades",
        "persist": true
      }
    }
  },
  "forms": {
    "gerarMensalidades": {
      "organism": "geracaoMensalidades",
      "submit": "gerarMensalidades"
    }
  },
  "requests": {
    "carregarPainelMensalidades": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "resumo",
        "geracao",
        "vencidas"
      ]
    },
    "listarGeracaoDoMes": {
      "kind": "qry",
      "trigger": "listarGeracaoDoMes",
      "returns": [
        "geracao"
      ]
    },
    "listarMensalidadesVencidas": {
      "kind": "qry",
      "trigger": "listarMensalidadesVencidas",
      "returns": [
        "vencidas"
      ]
    },
    "gerarMensalidades": {
      "kind": "cmd",
      "trigger": "gerarMensalidades",
      "returns": [
        "quantidadeGeradas",
        "resumo",
        "geracao"
      ],
      "writes": "Mensalidade.create"
    }
  },
  "states": {
    "resumo": {
      "source": "carregarPainelMensalidades.resumo",
      "description": "Indicadores da competência lidos do painel de mensalidades, já calculados pelo servidor.",
      "organisms": [
        "lembreteGeracao",
        "resumoDoMes"
      ]
    },
    "geracao": {
      "source": "carregarPainelMensalidades.geracao",
      "description": "Uma matrícula ativa da competência com seu plano, o aluno e a mensalidade já gerada (ausente quando ainda não gerada).",
      "organisms": [
        "geracaoMensalidades"
      ]
    },
    "vencidas": {
      "source": "carregarPainelMensalidades.vencidas",
      "description": "Mensalidade vencida com a matrícula e o aluno em atraso.",
      "organisms": [
        "mensalidadesVencidas"
      ]
    },
    "selectedMatricula": {
      "source": "entry.params.matriculaId",
      "description": "Uma matrícula ativa da competência com seu plano, o aluno e a mensalidade já gerada (ausente quando ainda não gerada).",
      "organisms": [
        "geracaoMensalidades",
        "lembreteGeracao"
      ]
    }
  },
  "functions": {
    "carregarPainelMensalidades": {
      "description": "Carrega numa só chamada tudo o que o painel de mensalidades mostra ao abrir: os indicadores da competência, a primeira página da conferência da geração e a primeira página das mensalidades vencidas.",
      "calls": "carregarPainelMensalidades",
      "sets": "resumo",
      "updates": [
        "geracao",
        "vencidas"
      ]
    },
    "listarGeracaoDoMes": {
      "description": "Traz as páginas seguintes da conferência da geração do mês. (geracao.items: append)",
      "calls": "listarGeracaoDoMes",
      "updates": [
        "geracao"
      ]
    },
    "listarMensalidadesVencidas": {
      "description": "Traz as páginas seguintes das mensalidades vencidas e dos alunos inadimplentes. (vencidas.items: append)",
      "calls": "listarMensalidadesVencidas",
      "updates": [
        "vencidas"
      ]
    },
    "gerarMensalidades": {
      "description": "Gera as mensalidades da competência informada pela gerência, uma por matrícula ativa, e devolve o painel e a conferência já atualizados.",
      "calls": "gerarMensalidades",
      "sets": "resumo",
      "updates": [
        "geracao"
      ]
    },
    "abrirMensalidades": {
      "description": "Gerar e conferir as mensalidades do mês, uma por matrícula ativa, com o valor e o vencimento do plano, sem duplicar as já geradas.",
      "navigate": "mensalidades",
      "carries": {
        "matriculaId": "selectedMatricula.id"
      }
    },
    "abrirMatriculas": {
      "description": "Mensalidades vencidas e alunos inadimplentes, com situação e total em aberto de cada matrícula.",
      "navigate": "matriculas"
    }
  },
  "journeys": [
    {
      "step": "acompanharPainel/abrirPainel",
      "organisms": [
        "resumoDoMes"
      ],
      "functions": [
        "carregarPainelMensalidades"
      ]
    },
    {
      "step": "acompanharPainel/listarInadimplentes",
      "organisms": [
        "mensalidadesVencidas"
      ],
      "functions": [
        "carregarPainelMensalidades",
        "listarMensalidadesVencidas"
      ]
    },
    {
      "step": "gerarMensalidadesDoMes/consultarMatriculasAtivas",
      "organisms": [
        "geracaoMensalidades"
      ],
      "functions": [
        "carregarPainelMensalidades",
        "listarGeracaoDoMes"
      ]
    },
    {
      "step": "gerarMensalidadesDoMes/gerarMensalidades",
      "organisms": [
        "lembreteGeracao",
        "geracaoMensalidades"
      ],
      "functions": [
        "gerarMensalidades"
      ]
    },
    {
      "step": "gerarMensalidadesDoMes/conferirMensalidades",
      "organisms": [
        "geracaoMensalidades"
      ],
      "functions": [
        "carregarPainelMensalidades",
        "listarGeracaoDoMes"
      ]
    }
  ],
  "rules": {
    "carregarPainelMensalidades": [
      "painelTotalAreceber",
      "painelTotalRecebido",
      "alunoInadimplenteComMensalidadeVencida",
      "alunoBloqueadoComDuasVencidas",
      "bloqueioPorDuasMensalidadesVencidas",
      "mensalidadeVencidaAposVencimento",
      "mensalidadePagaQuandoQuitada",
      "mensalidadeSomenteMatriculaAtiva",
      "mensalidadeSomenteAposDataInicio"
    ],
    "listarGeracaoDoMes": [
      "mensalidadeSomenteMatriculaAtiva",
      "mensalidadeSomenteAposDataInicio"
    ],
    "listarMensalidadesVencidas": [
      "mensalidadeVencidaAposVencimento",
      "mensalidadePagaQuandoQuitada",
      "bloqueioPorDuasMensalidadesVencidas",
      "alunoBloqueadoComDuasVencidas",
      "alunoInadimplenteComMensalidadeVencida"
    ],
    "gerarMensalidades": [
      "mensalidadeSomenteMatriculaAtiva",
      "mensalidadeSomenteAposDataInicio",
      "matriculaCanceladaNaoGeraMensalidade",
      "matriculaCanceladaEncerraGeracao",
      "mensalidadeUnicaPorMatriculaCompetencia",
      "mensalidadeValorDoPlano",
      "mensalidadeVencimentoNoDiaDoPlano",
      "planoAlteracaoNaoAfetaMensalidadesGeradas"
    ]
  },
  "access": {
    "actors": [
      "gerencia"
    ],
    "grants": [
      "gerenciaPlanos",
      "gerenciaCobrancas",
      "gerenciaAlunos",
      "gerenciaPainel"
    ]
  },
  "fields": {
    "Aluno.details.identification.name": [
      "geracaoMensalidades",
      "mensalidadesVencidas"
    ],
    "Aluno.details.mensalidadesAcademia.bloqueado": [
      "mensalidadesVencidas"
    ],
    "Aluno.details.mensalidadesAcademia.inadimplente": [
      "mensalidadesVencidas"
    ],
    "Matricula.codigo": [
      "geracaoMensalidades",
      "mensalidadesVencidas"
    ],
    "Matricula.details.bloqueada": [
      "mensalidadesVencidas"
    ],
    "Matricula.details.inadimplente": [
      "mensalidadesVencidas"
    ],
    "Matricula.details.quantidadeMensalidadesVencidas": [
      "mensalidadesVencidas"
    ],
    "Matricula.details.totalEmAberto": [
      "mensalidadesVencidas"
    ],
    "Matricula.planoId": [
      "geracaoMensalidades"
    ],
    "Matricula.status": [
      "geracaoMensalidades"
    ],
    "Mensalidade.competencia": [
      "geracaoMensalidades",
      "mensalidadesVencidas"
    ],
    "Mensalidade.details.situacao": [
      "geracaoMensalidades",
      "mensalidadesVencidas"
    ],
    "Mensalidade.details.valor": [
      "geracaoMensalidades",
      "mensalidadesVencidas"
    ],
    "Mensalidade.details.vencida": [
      "mensalidadesVencidas"
    ],
    "Mensalidade.matriculaId": [
      "geracaoMensalidades"
    ],
    "Mensalidade.vencimento": [
      "geracaoMensalidades",
      "mensalidadesVencidas"
    ],
    "PainelMensalidades.competencia": [
      "lembreteGeracao",
      "resumoDoMes"
    ],
    "PainelMensalidades.details.alunosAtivos": [
      "resumoDoMes"
    ],
    "PainelMensalidades.details.alunosBloqueados": [
      "resumoDoMes"
    ],
    "PainelMensalidades.details.alunosInadimplentes": [
      "resumoDoMes"
    ],
    "PainelMensalidades.details.quantidadeMensalidades": [
      "lembreteGeracao"
    ],
    "PainelMensalidades.details.totalAReceber": [
      "resumoDoMes"
    ],
    "PainelMensalidades.details.totalRecebido": [
      "resumoDoMes"
    ],
    "Plano.details.diaVencimento": [
      "geracaoMensalidades"
    ],
    "Plano.details.valor": [
      "geracaoMensalidades"
    ],
    "Plano.nome": [
      "geracaoMensalidades"
    ]
  }
} as const;
