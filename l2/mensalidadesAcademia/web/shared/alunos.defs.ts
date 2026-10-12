/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/alunos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:alunosLista",
        "persist": true
      },
      "nome": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:alunosLista",
        "persist": true
      },
      "alunoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:situacaoEntrada",
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
      },
      "planoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:matricularAcoes",
        "persist": false
      }
    }
  },
  "forms": {
    "registrarAluno": {
      "organism": "novoAlunoForm",
      "submit": "registrarAluno"
    },
    "criarMatricula": {
      "organism": "matricularAcoes",
      "submit": "criarMatricula"
    }
  },
  "requests": {
    "carregarAlunos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "alunos",
        "planos"
      ]
    },
    "buscarAlunos": {
      "kind": "qry",
      "trigger": "buscarAlunos",
      "returns": [
        "alunos"
      ]
    },
    "obterSituacaoAluno": {
      "kind": "qry",
      "trigger": "obterSituacaoAluno",
      "returns": [
        "situacao"
      ]
    },
    "registrarAluno": {
      "kind": "cmd",
      "trigger": "registrarAluno",
      "returns": [
        "aluno"
      ],
      "writes": "Aluno.create"
    },
    "criarMatricula": {
      "kind": "cmd",
      "trigger": "criarMatricula",
      "returns": [
        "matricula"
      ],
      "writes": "Matricula.create"
    }
  },
  "states": {
    "alunos": {
      "source": "carregarAlunos.alunos",
      "description": "Aluno como aparece na lista de busca, com a situação do cadastro e os indicadores de inadimplência e bloqueio.",
      "organisms": [
        "alunosLista"
      ]
    },
    "situacao": {
      "source": "obterSituacaoAluno.situacao",
      "description": "Situação do aluno escolhido na entrada da academia.",
      "organisms": [
        "situacaoEntrada"
      ]
    },
    "planos": {
      "source": "carregarAlunos.planos",
      "description": "Plano oferecido na escolha do plano da matrícula.",
      "organisms": [
        "matricularAcoes"
      ]
    },
    "selectedAluno": {
      "source": "entry.params.alunoId",
      "description": "Situação do aluno escolhido na entrada da academia.",
      "organisms": [
        "alunosLista",
        "situacaoEntrada"
      ]
    }
  },
  "functions": {
    "carregarAlunos": {
      "description": "Abre a página de alunos com a primeira página da lista de alunos e os planos disponíveis para matrícula, em uma única chamada.",
      "calls": "carregarAlunos",
      "sets": "alunos",
      "updates": [
        "planos"
      ]
    },
    "buscarAlunos": {
      "description": "Procura alunos pelo nome digitado e traz a página pedida da lista.",
      "calls": "buscarAlunos",
      "sets": "alunos"
    },
    "obterSituacaoAluno": {
      "description": "Mostra a situação de entrada do aluno escolhido na lista.",
      "calls": "obterSituacaoAluno",
      "sets": "situacao"
    },
    "registrarAluno": {
      "description": "Registra um aluno novo quando a busca não o encontrou. (alunos.items: upsert)",
      "calls": "registrarAluno",
      "updates": [
        "alunos"
      ]
    },
    "criarMatricula": {
      "description": "Matricula o aluno no plano escolhido a partir da data de início, deixando a matrícula ativa.",
      "calls": "criarMatricula",
      "updates": [
        "situacao"
      ]
    },
    "verMatriculas": {
      "description": "Situação do aluno selecionado na entrada: quantidade de mensalidades vencidas, se está inadimplente e se está bloqueado (duas ou mais vencidas), com destaque quando não pode entrar.",
      "navigate": "matriculas",
      "carries": {
        "alunoId": "selectedAluno.id"
      }
    },
    "abrirMatriculas": {
      "description": "Registrar o aluno e matriculá-lo em um plano escolhido (mensal, trimestral ou anual) com a data de início, deixando a matrícula ativa.",
      "navigate": "matriculas"
    }
  },
  "journeys": [
    {
      "step": "matricularAluno/localizarAluno",
      "organisms": [
        "alunosLista"
      ],
      "functions": [
        "carregarAlunos",
        "buscarAlunos"
      ]
    },
    {
      "step": "matricularAluno/registrarAluno",
      "organisms": [
        "novoAlunoForm"
      ],
      "functions": [
        "registrarAluno"
      ]
    },
    {
      "step": "matricularAluno/escolherPlano",
      "organisms": [
        "matricularAcoes"
      ],
      "functions": [
        "carregarAlunos"
      ]
    },
    {
      "step": "matricularAluno/criarMatricula",
      "organisms": [
        "matricularAcoes"
      ],
      "functions": [
        "criarMatricula"
      ]
    },
    {
      "step": "verificarAcessoAluno/buscarAlunoEntrada",
      "organisms": [
        "alunosLista"
      ],
      "functions": [
        "carregarAlunos",
        "buscarAlunos"
      ]
    },
    {
      "step": "verificarAcessoAluno/verSituacaoMatricula",
      "organisms": [
        "situacaoEntrada"
      ],
      "functions": [
        "obterSituacaoAluno"
      ]
    }
  ],
  "rules": {
    "carregarAlunos": [
      "alunoBloqueadoComDuasVencidas"
    ],
    "buscarAlunos": [
      "alunoBloqueadoComDuasVencidas"
    ],
    "obterSituacaoAluno": [
      "alunoBloqueadoComDuasVencidas",
      "alunoBloqueadoNaoPodeEntrar",
      "alunoBloqueadoNaoEntra"
    ],
    "registrarAluno": [],
    "criarMatricula": [
      "matriculaUnicaAtivaPorAluno",
      "codigoMatriculaSequencial"
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
      "recepcaoMatriculasCobrancas",
      "gerenciaPlanos",
      "gerenciaCobrancas",
      "gerenciaAlunos"
    ]
  },
  "fields": {
    "Aluno.details.identification.name": [
      "alunosLista",
      "novoAlunoForm",
      "situacaoEntrada"
    ],
    "Aluno.details.identification.status": [
      "alunosLista",
      "situacaoEntrada"
    ],
    "Aluno.details.mensalidadesAcademia.bloqueado": [
      "alunosLista",
      "situacaoEntrada"
    ],
    "Aluno.details.mensalidadesAcademia.inadimplente": [
      "alunosLista",
      "situacaoEntrada"
    ],
    "Aluno.details.mensalidadesAcademia.quantidadeMensalidadesVencidas": [
      "situacaoEntrada"
    ],
    "Matricula.dataInicio": [
      "matricularAcoes"
    ],
    "Matricula.details.observacoes": [
      "matricularAcoes"
    ],
    "Matricula.planoId": [
      "matricularAcoes"
    ],
    "Plano.details.diaVencimento": [
      "matricularAcoes"
    ],
    "Plano.details.valor": [
      "matricularAcoes"
    ],
    "Plano.nome": [
      "matricularAcoes"
    ],
    "Plano.periodicidade": [
      "matricularAcoes"
    ]
  }
} as const;
