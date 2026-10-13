/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/shared/equipamentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaEquipamentos",
        "persist": true
      },
      "situacaoAtual": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaEquipamentos",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaEquipamentos",
        "persist": true
      },
      "equipamentoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheEquipamento",
        "persist": true
      },
      "clienteId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Cliente",
        "persist": true
      }
    }
  },
  "forms": {},
  "requests": {
    "listarEquipamentos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "equipamentos"
      ]
    },
    "obterEquipamento": {
      "kind": "qry",
      "trigger": "obterEquipamento",
      "returns": [
        "equipamento"
      ]
    }
  },
  "states": {
    "equipamentos": {
      "source": "listarEquipamentos.equipamentos",
      "description": "Linha da lista de equipamentos: código, descrição, situação cadastral, situação atual e diária.",
      "organisms": [
        "listaEquipamentos"
      ]
    },
    "equipamento": {
      "source": "obterEquipamento.equipamento",
      "description": "Equipamento selecionado com dados cadastrais, situação atual e contrato atual.",
      "organisms": [
        "acoesEquipamentos",
        "cadastroEquipamento",
        "detalheEquipamento"
      ]
    },
    "selectedEquipamento": {
      "source": "entry.params.equipamentoId",
      "description": "Equipamento selecionado com dados cadastrais, situação atual e contrato atual.",
      "organisms": [
        "detalheEquipamento",
        "listaEquipamentos"
      ]
    }
  },
  "functions": {
    "listarEquipamentos": {
      "description": "Carrega, ao abrir a página, a lista paginada de equipamentos e a refaz quando a pessoa pesquisa por código ou descrição ou filtra pela situação atual, para saber o que está livre para locar. (equipamentos.items: append)",
      "calls": "listarEquipamentos",
      "sets": "equipamentos"
    },
    "obterEquipamento": {
      "description": "Carrega a ficha do equipamento escolhido na lista: dados cadastrais, situação atual, se está locado e o contrato atual com cliente e período.",
      "calls": "obterEquipamento",
      "sets": "equipamento"
    },
    "abrirContratoAtual": {
      "description": "Ficha do equipamento selecionado: código, descrição, situação atual, se está locado e o contrato atual, com o número, o cliente e o período da locação.",
      "navigate": "contratos_locacao",
      "carries": {
        "equipamentoId": "selectedEquipamento.id"
      }
    },
    "novoContratoComEquipamento": {
      "description": "Abrir um novo contrato de locação para incluir equipamentos disponíveis ou voltar ao painel com os totais por situação.",
      "navigate": "contratos_locacao"
    },
    "verPainelSituacao": {
      "description": "Abrir um novo contrato de locação para incluir equipamentos disponíveis ou voltar ao painel com os totais por situação.",
      "navigate": "painel_locacao"
    }
  },
  "journeys": [
    {
      "step": "acompanharSituacaoEquipamentos/listarEquipamentos",
      "organisms": [
        "listaEquipamentos"
      ],
      "functions": [
        "listarEquipamentos"
      ]
    },
    {
      "step": "acompanharSituacaoEquipamentos/verEquipamento",
      "organisms": [
        "detalheEquipamento",
        "cadastroEquipamento"
      ],
      "functions": [
        "obterEquipamento"
      ]
    },
    {
      "step": "criarContratoLocacao/consultarEquipamentos",
      "organisms": [
        "listaEquipamentos",
        "detalheEquipamento"
      ],
      "functions": [
        "listarEquipamentos",
        "obterEquipamento"
      ]
    },
    {
      "step": "criarContratoLocacao/localizarCliente",
      "organisms": [
        "acoesEquipamentos"
      ],
      "functions": [],
      "continuesIn": "contratos_locacao"
    },
    {
      "step": "criarContratoLocacao/informarPeriodo",
      "organisms": [
        "acoesEquipamentos"
      ],
      "functions": [],
      "continuesIn": "contratos_locacao"
    },
    {
      "step": "criarContratoLocacao/adicionarItens",
      "organisms": [
        "acoesEquipamentos"
      ],
      "functions": [],
      "continuesIn": "contratos_locacao"
    },
    {
      "step": "criarContratoLocacao/confirmarContrato",
      "organisms": [
        "acoesEquipamentos"
      ],
      "functions": [],
      "continuesIn": "contratos_locacao"
    }
  ],
  "rules": {
    "listarEquipamentos": [
      "equipamentoLocadoDecorreDeContratoAtivo"
    ],
    "obterEquipamento": [
      "equipamentoLocadoDecorreDeContratoAtivo"
    ]
  },
  "access": {
    "actors": [
      "atendente",
      "gerente"
    ],
    "grants": [
      "atendenteClientes",
      "atendenteContratos",
      "atendenteEquipamentos",
      "gerenteEquipamentos",
      "gerenteContratos",
      "gerenteClientes"
    ]
  },
  "fields": {
    "Cliente.details.identification.name": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.dataPrevistaDevolucao": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.dataRetirada": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.numero": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.status": [
      "detalheEquipamento"
    ],
    "Equipamento.codigo": [
      "cadastroEquipamento",
      "detalheEquipamento",
      "listaEquipamentos"
    ],
    "Equipamento.descricao": [
      "cadastroEquipamento",
      "detalheEquipamento",
      "listaEquipamentos"
    ],
    "Equipamento.details.contratoAtual": [
      "detalheEquipamento"
    ],
    "Equipamento.details.locado": [
      "detalheEquipamento"
    ],
    "Equipamento.details.situacaoAtual": [
      "acoesEquipamentos",
      "detalheEquipamento",
      "listaEquipamentos"
    ],
    "Equipamento.details.valorDiaria": [
      "cadastroEquipamento",
      "listaEquipamentos"
    ],
    "Equipamento.situacao": [
      "cadastroEquipamento",
      "listaEquipamentos"
    ]
  }
} as const;
