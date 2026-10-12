/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/matriculas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "apenasAtivas": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:matriculasList",
        "persist": true
      },
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:matriculasList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:matriculasList",
        "persist": true
      },
      "termo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:novaMatriculaForm",
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
      "planoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Plano",
        "persist": true
      },
      "pagamentoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Pagamento",
        "persist": true
      },
      "mensalidadeId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Mensalidade",
        "persist": true
      },
      "matriculaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:situacaoMatricula",
        "persist": true
      }
    }
  },
  "forms": {
    "criarMatricula": {
      "organism": "novaMatriculaForm",
      "submit": "criarMatricula"
    },
    "cancelarMatricula": {
      "organism": "acoesMatricula",
      "submit": "cancelarMatricula"
    }
  },
  "requests": {
    "listarMatriculas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "matriculas"
      ]
    },
    "buscarAlunos": {
      "kind": "qry",
      "trigger": "buscarAlunos",
      "returns": [
        "alunos"
      ]
    },
    "opcoesNovaMatricula": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "planos"
      ]
    },
    "criarMatricula": {
      "kind": "cmd",
      "trigger": "criarMatricula",
      "returns": [
        "matricula"
      ],
      "writes": "Matricula.create"
    },
    "cancelarMatricula": {
      "kind": "cmd",
      "trigger": "cancelarMatricula",
      "returns": [
        "matricula"
      ],
      "writes": "Matricula.cancelarMatricula"
    }
  },
  "states": {
    "matriculas": {
      "source": "listarMatriculas.matriculas",
      "description": "Matrícula com aluno, plano, situação e indicadores de vencidas e total em aberto; serve à lista, à situação selecionada e às ações.",
      "organisms": [
        "acoesMatricula",
        "matriculasList",
        "situacaoMatricula"
      ]
    },
    "planos": {
      "source": "opcoesNovaMatricula.planos",
      "description": "Plano oferecido na criação da matrícula.",
      "organisms": [
        "novaMatriculaForm"
      ]
    },
    "alunos": {
      "source": "buscarAlunos.alunos",
      "description": "Aluno com id e nome, usado na lista de matrículas e na escolha do aluno.",
      "organisms": [
        "novaMatriculaForm"
      ]
    },
    "selectedMatricula": {
      "source": "entry.params.matriculaId",
      "description": "Matrícula com aluno, plano, situação e indicadores de vencidas e total em aberto; serve à lista, à situação selecionada e às ações.",
      "organisms": [
        "matriculasList",
        "situacaoMatricula"
      ]
    }
  },
  "functions": {
    "listarMatriculas": {
      "description": "Carrega a lista paginada de matrículas da academia com aluno, plano, situação e indicadores de cobrança, já pronta para a lista, para a situação da matrícula escolhida e para as ações.",
      "calls": "listarMatriculas",
      "sets": "matriculas"
    },
    "buscarAlunos": {
      "description": "Procura o aluno a matricular pelo nome ou documento digitado no formulário de nova matrícula.",
      "calls": "buscarAlunos",
      "sets": "alunos"
    },
    "opcoesNovaMatricula": {
      "description": "Carrega os planos disponíveis para a escolha na nova matrícula.",
      "calls": "opcoesNovaMatricula",
      "sets": "planos"
    },
    "criarMatricula": {
      "description": "Cria a matrícula do aluno no plano escolhido a partir da data de início, já ativa. (matriculas.items: upsert)",
      "calls": "criarMatricula",
      "updates": [
        "matriculas"
      ]
    },
    "cancelarMatricula": {
      "description": "Registra o cancelamento pedido pelo aluno, passando a matrícula de ativa para cancelada. (matriculas.items: upsert)",
      "calls": "cancelarMatricula",
      "updates": [
        "matriculas"
      ]
    },
    "registrarAluno": {
      "description": "Registrar o cancelamento da matrícula ativa a pedido do aluno, com data e motivo, encerrando as mensalidades futuras; cadastrar um aluno novo antes de matricular; ir à geração das mensalidades do mês.",
      "navigate": "alunos"
    },
    "gerarMensalidades": {
      "description": "Registrar o cancelamento da matrícula ativa a pedido do aluno, com data e motivo, encerrando as mensalidades futuras; cadastrar um aluno novo antes de matricular; ir à geração das mensalidades do mês.",
      "navigate": "mensalidades"
    }
  },
  "journeys": [
    {
      "step": "cancelarMatricula/localizarMatriculaCancelar",
      "organisms": [
        "matriculasList"
      ],
      "functions": [
        "listarMatriculas"
      ]
    },
    {
      "step": "cancelarMatricula/conferirMatriculaCancelar",
      "organisms": [
        "situacaoMatricula"
      ],
      "functions": [
        "listarMatriculas"
      ]
    },
    {
      "step": "cancelarMatricula/registrarCancelamento",
      "organisms": [
        "acoesMatricula"
      ],
      "functions": [
        "cancelarMatricula"
      ]
    },
    {
      "step": "gerarMensalidadesDoMes/consultarMatriculasAtivas",
      "organisms": [
        "matriculasList"
      ],
      "functions": [
        "listarMatriculas"
      ]
    },
    {
      "step": "gerarMensalidadesDoMes/gerarMensalidades",
      "organisms": [
        "acoesMatricula"
      ],
      "functions": [],
      "continuesIn": "mensalidades"
    },
    {
      "step": "gerarMensalidadesDoMes/conferirMensalidades",
      "organisms": [],
      "functions": [],
      "continuesIn": "mensalidades"
    },
    {
      "step": "matricularAluno/localizarAluno",
      "organisms": [
        "novaMatriculaForm"
      ],
      "functions": [
        "buscarAlunos"
      ]
    },
    {
      "step": "matricularAluno/registrarAluno",
      "organisms": [
        "acoesMatricula"
      ],
      "functions": [],
      "continuesIn": "alunos"
    },
    {
      "step": "matricularAluno/escolherPlano",
      "organisms": [
        "novaMatriculaForm"
      ],
      "functions": [
        "opcoesNovaMatricula"
      ]
    },
    {
      "step": "matricularAluno/criarMatricula",
      "organisms": [
        "novaMatriculaForm"
      ],
      "functions": [
        "criarMatricula"
      ]
    },
    {
      "step": "verificarAcessoAluno/buscarAlunoEntrada",
      "organisms": [
        "matriculasList"
      ],
      "functions": [
        "listarMatriculas"
      ]
    },
    {
      "step": "verificarAcessoAluno/verSituacaoMatricula",
      "organisms": [
        "situacaoMatricula"
      ],
      "functions": [
        "listarMatriculas"
      ]
    }
  ],
  "rules": {
    "listarMatriculas": [
      "bloqueioPorDuasMensalidadesVencidas",
      "mensalidadeVencidaAposVencimento",
      "alunoBloqueadoNaoEntra"
    ],
    "buscarAlunos": [],
    "opcoesNovaMatricula": [],
    "criarMatricula": [
      "matriculaUnicaAtivaPorAluno",
      "codigoMatriculaSequencial"
    ],
    "cancelarMatricula": [
      "cancelamentoEncerraMensalidadesFuturas",
      "matriculaCanceladaNaoGeraMensalidade"
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
      "matriculasList",
      "novaMatriculaForm",
      "situacaoMatricula"
    ],
    "Matricula.alunoId": [
      "matriculasList",
      "novaMatriculaForm"
    ],
    "Matricula.codigo": [
      "acoesMatricula",
      "matriculasList",
      "situacaoMatricula"
    ],
    "Matricula.dataCancelamento": [
      "acoesMatricula"
    ],
    "Matricula.dataInicio": [
      "matriculasList",
      "novaMatriculaForm"
    ],
    "Matricula.details.bloqueada": [
      "situacaoMatricula"
    ],
    "Matricula.details.cancelamento.motivo": [
      "acoesMatricula"
    ],
    "Matricula.details.inadimplente": [
      "situacaoMatricula"
    ],
    "Matricula.details.observacoes": [
      "novaMatriculaForm"
    ],
    "Matricula.details.quantidadeMensalidadesVencidas": [
      "matriculasList",
      "situacaoMatricula"
    ],
    "Matricula.details.totalEmAberto": [
      "matriculasList",
      "situacaoMatricula"
    ],
    "Matricula.planoId": [
      "matriculasList",
      "novaMatriculaForm"
    ],
    "Matricula.status": [
      "acoesMatricula",
      "matriculasList",
      "situacaoMatricula"
    ],
    "Plano.details.diaVencimento": [
      "novaMatriculaForm"
    ],
    "Plano.details.valor": [
      "novaMatriculaForm"
    ],
    "Plano.nome": [
      "matriculasList",
      "novaMatriculaForm"
    ],
    "Plano.periodicidade": [
      "novaMatriculaForm"
    ]
  }
} as const;
