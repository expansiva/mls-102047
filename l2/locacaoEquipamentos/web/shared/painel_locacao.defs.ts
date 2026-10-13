/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/shared/painel_locacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:situacaoEquipamentos",
        "persist": true
      },
      "equipamentoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Equipamento",
        "persist": true
      }
    }
  },
  "forms": {},
  "requests": {
    "obterPainelLocacao": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "contratosEmAtraso",
        "totalContratosEmAtraso",
        "totalMultas",
        "totalDisponiveis",
        "totalLocados",
        "totalEmManutencao"
      ]
    },
    "listarEquipamentosLocados": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "equipamentos"
      ]
    }
  },
  "states": {
    "contratosEmAtraso": {
      "source": "obterPainelLocacao.contratosEmAtraso",
      "description": "Contrato em atraso com cliente, datas, dias de atraso e multa.",
      "organisms": [
        "contratosEmAtraso"
      ]
    },
    "totalContratosEmAtraso": {
      "source": "obterPainelLocacao.totalContratosEmAtraso",
      "description": "Lista de contratos em atraso e indicadores já calculados, para a seção de atrasos e os números da situação dos equipamentos sem cálculo no cliente.",
      "organisms": [
        "contratosEmAtraso"
      ]
    },
    "totalMultas": {
      "source": "obterPainelLocacao.totalMultas",
      "description": "Lista de contratos em atraso e indicadores já calculados, para a seção de atrasos e os números da situação dos equipamentos sem cálculo no cliente.",
      "organisms": [
        "contratosEmAtraso"
      ]
    },
    "totalDisponiveis": {
      "source": "obterPainelLocacao.totalDisponiveis",
      "description": "Lista de contratos em atraso e indicadores já calculados, para a seção de atrasos e os números da situação dos equipamentos sem cálculo no cliente.",
      "organisms": [
        "situacaoEquipamentos"
      ]
    },
    "totalLocados": {
      "source": "obterPainelLocacao.totalLocados",
      "description": "Lista de contratos em atraso e indicadores já calculados, para a seção de atrasos e os números da situação dos equipamentos sem cálculo no cliente.",
      "organisms": [
        "situacaoEquipamentos"
      ]
    },
    "totalEmManutencao": {
      "source": "obterPainelLocacao.totalEmManutencao",
      "description": "Lista de contratos em atraso e indicadores já calculados, para a seção de atrasos e os números da situação dos equipamentos sem cálculo no cliente.",
      "organisms": [
        "situacaoEquipamentos"
      ]
    },
    "equipamentos": {
      "source": "listarEquipamentosLocados.equipamentos",
      "description": "Equipamento com sua situação atual e o contrato em que está locado.",
      "organisms": [
        "situacaoEquipamentos"
      ]
    }
  },
  "functions": {
    "obterPainelLocacao": {
      "description": "Carrega, em uma única chamada ao abrir o painel, os contratos em atraso com dias e multa, o total de contratos atrasados, a soma das multas em aberto e os totais de equipamentos disponíveis, locados e em manutenção.",
      "calls": "obterPainelLocacao",
      "sets": "contratosEmAtraso",
      "updates": [
        "totalContratosEmAtraso",
        "totalMultas",
        "totalDisponiveis",
        "totalLocados",
        "totalEmManutencao"
      ]
    },
    "listarEquipamentosLocados": {
      "description": "Lista, paginada, os equipamentos locados com o contrato atual de cada um, para a seção de situação dos equipamentos. (equipamentos.items: append)",
      "calls": "listarEquipamentosLocados",
      "sets": "equipamentos"
    },
    "abrirContratos": {
      "description": "Contratos em atraso, com número, cliente, data prevista de devolução, dias de atraso e valor da multa de cada um, além do total de multas em aberto. A partir daqui o usuário abre os contratos para registrar a devolução.",
      "navigate": "contratos_locacao"
    },
    "abrirEquipamentos": {
      "description": "Equipamentos por situação atual: totais de disponíveis, locados e em manutenção e, para os locados, o contrato atual em que estão. A partir daqui o usuário abre a página de equipamentos para ver os detalhes ou mudar a situação.",
      "navigate": "equipamentos"
    }
  },
  "journeys": [
    {
      "step": "acompanharSituacaoEquipamentos/listarEquipamentos",
      "organisms": [
        "situacaoEquipamentos"
      ],
      "functions": [
        "obterPainelLocacao",
        "listarEquipamentosLocados"
      ]
    },
    {
      "step": "acompanharSituacaoEquipamentos/verEquipamento",
      "organisms": [],
      "functions": [],
      "continuesIn": "equipamentos"
    }
  ],
  "rules": {
    "obterPainelLocacao": [
      "multaAtrasoDevolucao",
      "multaPorAtraso",
      "equipamentoLocadoDecorreDeContratoAtivo"
    ],
    "listarEquipamentosLocados": [
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
      "contratosEmAtraso"
    ],
    "ContratoLocacao.clienteId": [
      "contratosEmAtraso"
    ],
    "ContratoLocacao.dataPrevistaDevolucao": [
      "contratosEmAtraso"
    ],
    "ContratoLocacao.dataRetirada": [
      "contratosEmAtraso"
    ],
    "ContratoLocacao.details.atrasado": [
      "contratosEmAtraso"
    ],
    "ContratoLocacao.details.diasAtraso": [
      "contratosEmAtraso"
    ],
    "ContratoLocacao.details.quantidadeItens": [
      "contratosEmAtraso"
    ],
    "ContratoLocacao.details.valorMulta": [
      "contratosEmAtraso"
    ],
    "ContratoLocacao.numero": [
      "contratosEmAtraso"
    ],
    "ContratoLocacao.status": [
      "contratosEmAtraso"
    ],
    "Equipamento.codigo": [
      "situacaoEquipamentos"
    ],
    "Equipamento.descricao": [
      "situacaoEquipamentos"
    ],
    "Equipamento.details.contratoAtual": [
      "situacaoEquipamentos"
    ],
    "Equipamento.details.locado": [
      "situacaoEquipamentos"
    ],
    "Equipamento.details.situacaoAtual": [
      "situacaoEquipamentos"
    ],
    "Equipamento.details.valorDiaria": [
      "situacaoEquipamentos"
    ],
    "Equipamento.situacao": [
      "situacaoEquipamentos"
    ]
  }
} as const;
