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
        "effect": "select:planoActions",
        "persist": true
      }
    }
  },
  "forms": {
    "registrarPlano": {
      "organism": "planoForm",
      "submit": "registrarPlano"
    }
  },
  "requests": {
    "consultarPlanos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "planos"
      ]
    },
    "registrarPlano": {
      "kind": "cmd",
      "trigger": "registrarPlano",
      "returns": [
        "plano"
      ],
      "writes": "Plano.create"
    }
  },
  "states": {
    "planos": {
      "source": "consultarPlanos.planos",
      "description": "Plano da academia como o catálogo o mostra: nome, periodicidade, valor, dia de vencimento, descrição e matrículas ativas.",
      "organisms": [
        "planoActions",
        "planosList"
      ]
    },
    "selectedPlano": {
      "source": "entry.params.planoId",
      "description": "Plano da academia como o catálogo o mostra: nome, periodicidade, valor, dia de vencimento, descrição e matrículas ativas.",
      "organisms": [
        "planoActions",
        "planosList"
      ]
    }
  },
  "functions": {
    "consultarPlanos": {
      "description": "Carrega, na abertura da página, todos os planos da academia para a gerência conferir antes de cadastrar e para a recepção escolher o plano da matrícula.",
      "calls": "consultarPlanos",
      "sets": "planos"
    },
    "registrarPlano": {
      "description": "Cadastra um novo plano pela gerência e o devolve pronto para entrar no catálogo. (planos: upsert)",
      "calls": "registrarPlano",
      "updates": [
        "planos"
      ]
    },
    "matricularNoPlano": {
      "description": "Escolher o plano para a matrícula, conferindo valor e dia de vencimento, e seguir para registrar a matrícula do aluno.",
      "navigate": "matriculas",
      "carries": {
        "planoId": "selectedPlano.id"
      }
    }
  },
  "journeys": [
    {
      "step": "cadastrarPlano/consultarPlanos",
      "organisms": [
        "planosList"
      ],
      "functions": [
        "consultarPlanos"
      ]
    },
    {
      "step": "cadastrarPlano/registrarPlano",
      "organisms": [
        "planoForm"
      ],
      "functions": [
        "registrarPlano"
      ]
    },
    {
      "step": "matricularAluno/escolherPlano",
      "organisms": [
        "planosList",
        "planoActions"
      ],
      "functions": [
        "consultarPlanos"
      ]
    },
    {
      "step": "matricularAluno/localizarAluno",
      "organisms": [],
      "functions": [],
      "continuesIn": "matriculas"
    },
    {
      "step": "matricularAluno/registrarMatricula",
      "organisms": [
        "planoActions"
      ],
      "functions": [],
      "continuesIn": "matriculas"
    }
  ],
  "rules": {
    "consultarPlanos": [],
    "registrarPlano": [
      "planoNomeUnico",
      "planoValorPositivo",
      "planoDiaVencimentoValido"
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
      "planoForm",
      "planosList"
    ],
    "Plano.details.diaVencimento": [
      "planoActions",
      "planoForm",
      "planosList"
    ],
    "Plano.details.quantidadeMatriculasAtivas": [
      "planosList"
    ],
    "Plano.details.valor": [
      "planoActions",
      "planoForm",
      "planosList"
    ],
    "Plano.nome": [
      "planoActions",
      "planoForm",
      "planosList"
    ],
    "Plano.periodicidade": [
      "planoActions",
      "planoForm",
      "planosList"
    ]
  }
} as const;
