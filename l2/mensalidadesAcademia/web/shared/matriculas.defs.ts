/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/matriculas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:matriculasList",
        "persist": true
      },
      "status": {
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
      "nome": {
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
      "matriculaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:situacaoMatricula",
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
      }
    }
  },
  "forms": {
    "registrarMatricula": {
      "organism": "novaMatriculaForm",
      "submit": "registrarMatricula"
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
    "obterSituacaoMatricula": {
      "kind": "qry",
      "trigger": "obterSituacaoMatricula",
      "returns": [
        "situacao"
      ]
    },
    "buscarAlunos": {
      "kind": "qry",
      "trigger": "buscarAlunos",
      "returns": [
        "alunos"
      ]
    },
    "listarPlanos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "planos"
      ]
    },
    "registrarMatricula": {
      "kind": "cmd",
      "trigger": "registrarMatricula",
      "returns": [
        "matricula"
      ],
      "writes": "Matricula.create"
    },
    "cancelarMatricula": {
      "kind": "cmd",
      "trigger": "cancelarMatricula",
      "returns": [
        "situacao"
      ],
      "writes": "Matricula.cancelar"
    }
  },
  "states": {
    "matriculas": {
      "source": "listarMatriculas.matriculas",
      "description": "Linha da lista de matrículas com aluno, plano e indicadores de situação calculados.",
      "organisms": [
        "matriculasList"
      ]
    },
    "situacao": {
      "source": "obterSituacaoMatricula.situacao",
      "description": "Situação da matrícula selecionada com a liberação da entrada e as mensalidades vencidas.",
      "organisms": [
        "acoesMatricula",
        "situacaoMatricula"
      ]
    },
    "alunos": {
      "source": "buscarAlunos.alunos",
      "description": "Aluno encontrado na busca da nova matrícula.",
      "organisms": [
        "novaMatriculaForm"
      ]
    },
    "planos": {
      "source": "listarPlanos.planos",
      "description": "Plano oferecido na matrícula com valor e dia de vencimento.",
      "organisms": [
        "novaMatriculaForm"
      ]
    },
    "selectedMatricula": {
      "source": "entry.params.matriculaId",
      "description": "Situação da matrícula selecionada com a liberação da entrada e as mensalidades vencidas.",
      "organisms": [
        "matriculasList",
        "situacaoMatricula"
      ]
    }
  },
  "functions": {
    "listarMatriculas": {
      "description": "Carrega a lista paginada de matrículas do balcão, com nome do aluno, plano e indicadores de bloqueio e inadimplência.",
      "calls": "listarMatriculas",
      "sets": "matriculas"
    },
    "obterSituacaoMatricula": {
      "description": "Abre a situação da matrícula escolhida na lista para a recepção decidir se o aluno entra.",
      "calls": "obterSituacaoMatricula",
      "sets": "situacao"
    },
    "buscarAlunos": {
      "description": "Busca o aluno pelo nome ao iniciar a nova matrícula.",
      "calls": "buscarAlunos",
      "sets": "alunos"
    },
    "listarPlanos": {
      "description": "Carrega os planos oferecidos para o formulário de nova matrícula.",
      "calls": "listarPlanos",
      "sets": "planos"
    },
    "registrarMatricula": {
      "description": "Registra a matrícula do aluno no plano escolhido a partir da data de início. (matriculas.items: upsert)",
      "calls": "registrarMatricula",
      "updates": [
        "matriculas"
      ]
    },
    "cancelarMatricula": {
      "description": "Cancela a matrícula a pedido do aluno, encerrando a geração de mensalidades futuras.",
      "calls": "cancelarMatricula",
      "sets": "situacao",
      "updates": [
        "matriculas"
      ]
    },
    "verSituacaoAluno": {
      "description": "Cancelar a matrícula a pedido do aluno, informando data e motivo, o que encerra as mensalidades futuras; consultar a situação do aluno; e ir para a geração das mensalidades do mês.",
      "navigate": "alunos"
    },
    "gerarMensalidadesMes": {
      "description": "Cancelar a matrícula a pedido do aluno, informando data e motivo, o que encerra as mensalidades futuras; consultar a situação do aluno; e ir para a geração das mensalidades do mês.",
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
      "step": "cancelarMatricula/conferirSituacaoMatricula",
      "organisms": [
        "situacaoMatricula"
      ],
      "functions": [
        "obterSituacaoMatricula"
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
      "step": "gerarMensalidadesMes/conferirMatriculasAtivas",
      "organisms": [
        "matriculasList"
      ],
      "functions": [
        "listarMatriculas"
      ]
    },
    {
      "step": "gerarMensalidadesMes/gerarMensalidades",
      "organisms": [],
      "functions": [],
      "continuesIn": "mensalidades"
    },
    {
      "step": "gerarMensalidadesMes/revisarMensalidadesGeradas",
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
      "step": "matricularAluno/escolherPlano",
      "organisms": [
        "novaMatriculaForm"
      ],
      "functions": [
        "listarPlanos"
      ]
    },
    {
      "step": "matricularAluno/registrarMatricula",
      "organisms": [
        "novaMatriculaForm"
      ],
      "functions": [
        "registrarMatricula"
      ]
    },
    {
      "step": "verificarAcessoAluno/localizarMatriculaAluno",
      "organisms": [
        "matriculasList"
      ],
      "functions": [
        "listarMatriculas"
      ]
    },
    {
      "step": "verificarAcessoAluno/consultarSituacao",
      "organisms": [
        "situacaoMatricula"
      ],
      "functions": [
        "obterSituacaoMatricula"
      ]
    }
  ],
  "rules": {
    "listarMatriculas": [
      "alunoBloqueadoComDuasVencidas",
      "alunoBloqueadoDuasVencidas",
      "mensalidadeVencida"
    ],
    "obterSituacaoMatricula": [
      "mensalidadeVencida",
      "mensalidadeVencidaAposVencimento",
      "alunoBloqueadoComDuasVencidas",
      "alunoBloqueadoDuasVencidas",
      "alunoBloqueadoNaoEntra",
      "bloqueadoNaoEntra"
    ],
    "buscarAlunos": [],
    "listarPlanos": [],
    "registrarMatricula": [
      "matriculaExigeAlunoEPlano"
    ],
    "cancelarMatricula": [
      "cancelamentoEncerraGeracao"
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
      "matriculasList",
      "novaMatriculaForm",
      "situacaoMatricula"
    ],
    "Matricula.alunoId": [
      "matriculasList",
      "novaMatriculaForm"
    ],
    "Matricula.dataInicio": [
      "matriculasList",
      "novaMatriculaForm",
      "situacaoMatricula"
    ],
    "Matricula.details.bloqueada": [
      "matriculasList",
      "situacaoMatricula"
    ],
    "Matricula.details.cancelamento.dataCancelamento": [
      "acoesMatricula"
    ],
    "Matricula.details.cancelamento.motivo": [
      "acoesMatricula"
    ],
    "Matricula.details.entradaLiberada": [
      "situacaoMatricula"
    ],
    "Matricula.details.inadimplente": [
      "matriculasList",
      "situacaoMatricula"
    ],
    "Matricula.details.mensalidadesVencidas": [
      "situacaoMatricula"
    ],
    "Matricula.details.observacoes": [
      "novaMatriculaForm"
    ],
    "Matricula.numero": [
      "acoesMatricula",
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
    "Mensalidade.competencia": [
      "situacaoMatricula"
    ],
    "Mensalidade.details.saldoDevedor": [
      "situacaoMatricula"
    ],
    "Mensalidade.details.valor": [
      "situacaoMatricula"
    ],
    "Mensalidade.details.vencida": [
      "situacaoMatricula"
    ],
    "Mensalidade.vencimento": [
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
      "novaMatriculaForm",
      "situacaoMatricula"
    ],
    "Plano.periodicidade": [
      "novaMatriculaForm"
    ]
  }
} as const;
