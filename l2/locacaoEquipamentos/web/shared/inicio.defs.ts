/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/shared/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "situacaoAtual": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:equipamentosPorSituacao",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:equipamentosPorSituacao",
        "persist": true
      }
    }
  },
  "forms": {},
  "requests": {
    "obterPainelInicio": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "quantidadeEmAtraso",
        "contratosEmAtraso",
        "totaisFrota"
      ]
    },
    "listarEquipamentosPorSituacao": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "equipamentos"
      ]
    }
  },
  "states": {
    "quantidadeEmAtraso": {
      "source": "obterPainelInicio.quantidadeEmAtraso",
      "description": "quantidadeEmAtraso para o destaque do topo, a lista de contratos em atraso pronta para os cartões e os três totais da frota já calculados.",
      "organisms": [
        "contratosEmAtraso"
      ]
    },
    "contratosEmAtraso": {
      "source": "obterPainelInicio.contratosEmAtraso",
      "description": "Contrato vigente com devolução prevista vencida, com cliente, dias de atraso e multa estimada.",
      "organisms": [
        "contratosEmAtraso"
      ]
    },
    "totaisFrota": {
      "source": "obterPainelInicio.totaisFrota",
      "description": "Totais de equipamentos por situação atual.",
      "organisms": [
        "equipamentosPorSituacao"
      ]
    },
    "equipamentos": {
      "source": "listarEquipamentosPorSituacao.equipamentos",
      "description": "Linha da lista da frota: equipamento com situação atual e, se locado, contrato vigente e data prevista de devolução.",
      "organisms": [
        "equipamentosPorSituacao"
      ]
    }
  },
  "functions": {
    "obterPainelInicio": {
      "description": "Carrega, numa única chamada na abertura do painel, os contratos em atraso já filtrados e os totais da frota por situação.",
      "calls": "obterPainelInicio",
      "sets": "quantidadeEmAtraso",
      "updates": [
        "contratosEmAtraso",
        "totaisFrota"
      ]
    },
    "listarEquipamentosPorSituacao": {
      "description": "Lista paginada dos equipamentos da frota com sua situação atual, filtrável por situação (disponível, locado, em manutenção). (equipamentos.items: append)",
      "calls": "listarEquipamentosPorSituacao",
      "sets": "equipamentos"
    },
    "abrirEquipamentos": {
      "description": "Equipamentos por situação atual, com os totais de disponíveis, locados e em manutenção. Para cada equipamento locado, aparecem o contrato vigente e a data prevista de devolução.",
      "navigate": "equipamentos"
    }
  },
  "journeys": [
    {
      "step": "acompanharSituacaoEquipamentos/filtrarPorSituacao",
      "organisms": [
        "equipamentosPorSituacao"
      ],
      "functions": [
        "obterPainelInicio",
        "listarEquipamentosPorSituacao"
      ]
    },
    {
      "step": "acompanharSituacaoEquipamentos/verEquipamento",
      "organisms": [
        "equipamentosPorSituacao"
      ],
      "functions": [
        "listarEquipamentosPorSituacao"
      ],
      "continuesIn": "equipamentos"
    }
  ],
  "rules": {
    "obterPainelInicio": [
      "multaAtrasoUmEMeio"
    ],
    "listarEquipamentosPorSituacao": []
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
    "ContratoLocacao.numero": [
      "contratosEmAtraso",
      "equipamentosPorSituacao"
    ],
    "ContratoLocacao.status": [
      "contratosEmAtraso"
    ],
    "Equipamento.codigo": [
      "equipamentosPorSituacao"
    ],
    "Equipamento.descricao": [
      "equipamentosPorSituacao"
    ],
    "Equipamento.details.contratoVigente": [
      "equipamentosPorSituacao"
    ],
    "Equipamento.details.dataPrevistaDevolucao": [
      "equipamentosPorSituacao"
    ],
    "Equipamento.details.locado": [
      "equipamentosPorSituacao"
    ],
    "Equipamento.details.situacaoAtual": [
      "equipamentosPorSituacao"
    ],
    "Equipamento.status": [
      "equipamentosPorSituacao"
    ]
  }
} as const;
