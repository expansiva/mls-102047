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
      "contratoLocacaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:ContratoLocacao",
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
      }
    }
  },
  "forms": {},
  "requests": {
    "listarEquipamentos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "equipamentos",
        "totais"
      ]
    },
    "obterEquipamento": {
      "kind": "qry",
      "trigger": "obterEquipamento",
      "returns": [
        "equipamento"
      ]
    },
    "enviarManutencao": {
      "kind": "cmd",
      "trigger": "enviarManutencao",
      "returns": [
        "equipamento"
      ],
      "writes": "Equipamento.enviarManutencao"
    },
    "retornarManutencao": {
      "kind": "cmd",
      "trigger": "retornarManutencao",
      "returns": [
        "equipamento"
      ],
      "writes": "Equipamento.retornarManutencao"
    }
  },
  "states": {
    "equipamentos": {
      "source": "listarEquipamentos.equipamentos",
      "description": "Linha da lista de equipamentos com a situação atual já calculada.",
      "organisms": [
        "listaEquipamentos"
      ]
    },
    "totais": {
      "source": "listarEquipamentos.totais",
      "description": "Totais de equipamentos por situação atual, calculados no servidor.",
      "organisms": [
        "listaEquipamentos"
      ]
    },
    "equipamento": {
      "source": "obterEquipamento.equipamento",
      "description": "Ficha completa do equipamento: dados de cadastro, situação calculada e contrato vigente quando locado.",
      "organisms": [
        "acoesManutencao",
        "dadosEquipamento",
        "detalheEquipamento"
      ]
    },
    "selectedEquipamento": {
      "source": "entry.params.equipamentoId",
      "description": "Ficha completa do equipamento: dados de cadastro, situação calculada e contrato vigente quando locado.",
      "organisms": [
        "detalheEquipamento",
        "listaEquipamentos"
      ]
    }
  },
  "functions": {
    "listarEquipamentos": {
      "description": "Carrega, ao abrir a página e a cada pesquisa ou troca de filtro, a lista paginada de equipamentos com a situação atual e os totais por situação.",
      "calls": "listarEquipamentos",
      "sets": "equipamentos",
      "updates": [
        "totais"
      ]
    },
    "obterEquipamento": {
      "description": "Abre a ficha do equipamento escolhido na lista, com situação, diária, contrato vigente e devolução prevista.",
      "calls": "obterEquipamento",
      "sets": "equipamento"
    },
    "enviarManutencao": {
      "description": "Envia o equipamento para manutenção, retirando-o de operação.",
      "calls": "enviarManutencao",
      "sets": "equipamento",
      "updates": [
        "equipamentos",
        "totais"
      ]
    },
    "retornarManutencao": {
      "description": "Retorna o equipamento da manutenção à operação, deixando-o disponível para novas locações.",
      "calls": "retornarManutencao",
      "sets": "equipamento",
      "updates": [
        "equipamentos",
        "totais"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharSituacaoEquipamentos/filtrarPorSituacao",
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
        "detalheEquipamento"
      ],
      "functions": [
        "obterEquipamento"
      ]
    },
    {
      "step": "enviarEquipamentoManutencao/localizarEquipamento",
      "organisms": [
        "listaEquipamentos"
      ],
      "functions": [
        "listarEquipamentos"
      ]
    },
    {
      "step": "enviarEquipamentoManutencao/conferirEquipamento",
      "organisms": [
        "detalheEquipamento",
        "acoesManutencao"
      ],
      "functions": [
        "obterEquipamento"
      ]
    },
    {
      "step": "enviarEquipamentoManutencao/enviarManutencao",
      "organisms": [
        "acoesManutencao"
      ],
      "functions": [
        "enviarManutencao"
      ]
    },
    {
      "step": "retornarEquipamentoManutencao/localizarEmManutencao",
      "organisms": [
        "listaEquipamentos"
      ],
      "functions": [
        "listarEquipamentos",
        "obterEquipamento"
      ]
    },
    {
      "step": "retornarEquipamentoManutencao/retornarManutencao",
      "organisms": [
        "acoesManutencao"
      ],
      "functions": [
        "retornarManutencao"
      ]
    }
  ],
  "rules": {
    "listarEquipamentos": [],
    "obterEquipamento": [],
    "enviarManutencao": [
      "equipamentoLocadoNaoVaiManutencao"
    ],
    "retornarManutencao": []
  },
  "access": {
    "actors": [
      "atendente",
      "gerente"
    ],
    "grants": [
      "atendenteContratos",
      "atendenteConsultaEquipamentos",
      "gerenteEquipamentos",
      "gerenteContratosVigentes",
      "gerenteClienteNome"
    ]
  },
  "fields": {
    "Cliente.details.identification.name": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.clienteId": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.dataPrevistaDevolucao": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.dataRetirada": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.details.atrasado": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.numero": [
      "detalheEquipamento"
    ],
    "ContratoLocacao.status": [
      "detalheEquipamento"
    ],
    "Equipamento.codigo": [
      "acoesManutencao",
      "dadosEquipamento",
      "detalheEquipamento",
      "listaEquipamentos"
    ],
    "Equipamento.descricao": [
      "dadosEquipamento",
      "detalheEquipamento",
      "listaEquipamentos"
    ],
    "Equipamento.details.contratoVigente": [
      "acoesManutencao",
      "detalheEquipamento"
    ],
    "Equipamento.details.dataPrevistaDevolucao": [
      "detalheEquipamento"
    ],
    "Equipamento.details.locado": [
      "acoesManutencao",
      "detalheEquipamento"
    ],
    "Equipamento.details.situacaoAtual": [
      "acoesManutencao",
      "detalheEquipamento",
      "listaEquipamentos"
    ],
    "Equipamento.details.valorDiaria": [
      "dadosEquipamento",
      "detalheEquipamento",
      "listaEquipamentos"
    ],
    "Equipamento.status": [
      "acoesManutencao",
      "listaEquipamentos"
    ],
    "ItemContrato.contratoId": [
      "detalheEquipamento"
    ],
    "ItemContrato.equipamentoId": [
      "detalheEquipamento"
    ]
  }
} as const;
