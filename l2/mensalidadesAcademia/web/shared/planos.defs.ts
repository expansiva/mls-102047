/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/planos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "planoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:planoForm",
        "persist": true
      }
    }
  },
  "forms": {
    "cadastrarPlano": {
      "organism": "planoForm",
      "submit": "cadastrarPlano"
    },
    "ajustarPlano": {
      "organism": "planoForm",
      "submit": "ajustarPlano"
    }
  },
  "requests": {
    "qryPlanos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "planos"
      ]
    },
    "cmdCadastrarPlano": {
      "kind": "cmd",
      "trigger": "cadastrarPlano",
      "returns": [
        "plano"
      ],
      "writes": "Plano.create"
    },
    "cmdAjustarPlano": {
      "kind": "cmd",
      "trigger": "ajustarPlano",
      "returns": [
        "plano"
      ],
      "writes": "Plano.update"
    }
  },
  "states": {
    "planos": {
      "source": "qryPlanos.planos",
      "description": "Plano da academia com os dados exibidos na lista e carregados no formulário de ajuste.",
      "organisms": [
        "planoForm",
        "planosLista"
      ]
    },
    "selectedPlano": {
      "source": "entry.params.planoId",
      "description": "Plano da academia com os dados exibidos na lista e carregados no formulário de ajuste.",
      "organisms": [
        "planoForm",
        "planosLista"
      ]
    }
  },
  "functions": {
    "qryPlanos": {
      "description": "Carrega, na abertura da página, todos os planos da academia já prontos para a lista e para o formulário de ajuste.",
      "calls": "qryPlanos",
      "sets": "planos"
    },
    "cmdCadastrarPlano": {
      "description": "Cadastra um novo plano da academia, a pedido da gerência. (planos: upsert)",
      "calls": "cmdCadastrarPlano",
      "updates": [
        "planos"
      ]
    },
    "cmdAjustarPlano": {
      "description": "Ajusta os dados de um plano existente (valor, vencimento, nome, periodicidade, descrição), a pedido da gerência. (planos: upsert)",
      "calls": "cmdAjustarPlano",
      "updates": [
        "planos"
      ]
    },
    "irMatricular": {
      "description": "Cadastrar plano e ajustar plano; a partir daqui também é possível ir matricular um aluno ou registrar um novo aluno.",
      "navigate": "matriculas"
    },
    "irRegistrarAluno": {
      "description": "Cadastrar plano e ajustar plano; a partir daqui também é possível ir matricular um aluno ou registrar um novo aluno.",
      "navigate": "alunos"
    }
  },
  "journeys": [
    {
      "step": "manterPlanos/localizarPlanos",
      "organisms": [
        "planosLista"
      ],
      "functions": [
        "qryPlanos"
      ]
    },
    {
      "step": "manterPlanos/cadastrarPlano",
      "organisms": [
        "planoForm",
        "planoAcoes"
      ],
      "functions": [
        "cmdCadastrarPlano"
      ]
    },
    {
      "step": "manterPlanos/ajustarPlano",
      "organisms": [
        "planosLista",
        "planoForm",
        "planoAcoes"
      ],
      "functions": [
        "cmdAjustarPlano"
      ]
    },
    {
      "step": "matricularAluno/escolherPlano",
      "organisms": [
        "planosLista",
        "planoAcoes"
      ],
      "functions": [
        "qryPlanos"
      ],
      "continuesIn": "matriculas"
    },
    {
      "step": "matricularAluno/localizarAluno",
      "organisms": [],
      "functions": [],
      "continuesIn": "alunos"
    },
    {
      "step": "matricularAluno/registrarAluno",
      "organisms": [],
      "functions": [],
      "continuesIn": "alunos"
    },
    {
      "step": "matricularAluno/criarMatricula",
      "organisms": [],
      "functions": [],
      "continuesIn": "matriculas"
    }
  ],
  "rules": {
    "qryPlanos": [],
    "cmdCadastrarPlano": [
      "planoNomeUnico",
      "planoValorPositivo",
      "planoDiaVencimentoValido"
    ],
    "cmdAjustarPlano": [
      "planoNomeUnico",
      "planoValorPositivo",
      "planoDiaVencimentoValido",
      "planoAlteracaoNaoAfetaMensalidadesGeradas"
    ]
  },
  "access": {
    "actors": [
      "gerencia",
      "recepcao"
    ],
    "grants": [
      "recepcaoPlanos",
      "gerenciaPlanos"
    ]
  },
  "fields": {
    "Plano.details.descricao": [
      "planoForm"
    ],
    "Plano.details.diaVencimento": [
      "planoForm",
      "planosLista"
    ],
    "Plano.details.matriculasAtivas": [
      "planosLista"
    ],
    "Plano.details.valor": [
      "planoForm",
      "planosLista"
    ],
    "Plano.nome": [
      "planoForm",
      "planosLista"
    ],
    "Plano.periodicidade": [
      "planoForm",
      "planosLista"
    ]
  }
} as const;
