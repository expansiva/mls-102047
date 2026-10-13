/// <mls fileReference="_102047_/l2/manutencaoFrota/web/shared/painel_frota.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "forms": {},
  "requests": {
    "carregarPainelFrota": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "resumoPreventivas",
        "preventivasVencidas",
        "ordensEmAndamento",
        "abastecimentosRecentes"
      ]
    }
  },
  "states": {
    "resumoPreventivas": {
      "source": "carregarPainelFrota.resumoPreventivas",
      "description": "Contadores das preventivas vencidas, calculados no servidor.",
      "organisms": [
        "preventivasVencidas"
      ]
    },
    "preventivasVencidas": {
      "source": "carregarPainelFrota.preventivasVencidas",
      "description": "Plano de manutenção vencido por km ou por tempo, com o veículo.",
      "organisms": [
        "preventivasVencidas"
      ]
    },
    "ordensEmAndamento": {
      "source": "carregarPainelFrota.ordensEmAndamento",
      "description": "Ordem de manutenção aberta com veículo, oficina e dias na oficina.",
      "organisms": [
        "ordensEAbastecimentos"
      ]
    },
    "abastecimentosRecentes": {
      "source": "carregarPainelFrota.abastecimentosRecentes",
      "description": "Abastecimento recente com veículo, motorista e preço por litro.",
      "organisms": [
        "ordensEAbastecimentos"
      ]
    }
  },
  "functions": {
    "carregarPainelFrota": {
      "description": "Carrega em uma única chamada tudo o que o painel da frota mostra ao abrir: os contadores e a lista das preventivas vencidas, as ordens em andamento e os abastecimentos recentes com preço por litro.",
      "calls": "carregarPainelFrota",
      "sets": "resumoPreventivas",
      "updates": [
        "preventivasVencidas",
        "ordensEmAndamento",
        "abastecimentosRecentes"
      ]
    },
    "abrirPlanosPreventiva": {
      "description": "Preventivas vencidas por km ou por tempo. Para cada uma: o veículo pela placa, o plano, o km previsto, a quilometragem atual, quantos km passou do previsto, a data prevista e se já há ordem aberta. Os planos ainda sem ordem aberta ficam em destaque, porque são os que pedem ação do gestor.",
      "navigate": "planos_manutencao"
    },
    "abrirOrdens": {
      "description": "Ordens de manutenção em andamento, com número, veículo, oficina, data de entrada e dias na oficina, para ver os veículos parados há mais tempo. Também mostra o preço por litro dos abastecimentos recentes, por veículo e data, para acompanhar o custo do combustível.",
      "navigate": "ordens_manutencao"
    },
    "abrirAbastecimentos": {
      "description": "Ordens de manutenção em andamento, com número, veículo, oficina, data de entrada e dias na oficina, para ver os veículos parados há mais tempo. Também mostra o preço por litro dos abastecimentos recentes, por veículo e data, para acompanhar o custo do combustível.",
      "navigate": "abastecimentos"
    }
  },
  "journeys": [
    {
      "step": "acompanharPreventivasVencidas/listarVencidos",
      "organisms": [
        "preventivasVencidas"
      ],
      "functions": [
        "carregarPainelFrota"
      ]
    },
    {
      "step": "acompanharPreventivasVencidas/verPlanoVencido",
      "organisms": [
        "preventivasVencidas"
      ],
      "functions": [
        "carregarPainelFrota"
      ],
      "continuesIn": "planos_manutencao"
    }
  ],
  "rules": {
    "carregarPainelFrota": [
      "avisoPreventivaVencidaKm",
      "planoVencimentoCalculado",
      "precoPorLitroCalculado"
    ]
  },
  "access": {
    "actors": [
      "gestor"
    ],
    "grants": [
      "gestorFrota",
      "gestorCadastrosMestres"
    ]
  },
  "fields": {
    "Abastecimento.data": [
      "ordensEAbastecimentos"
    ],
    "Abastecimento.details.litros": [
      "ordensEAbastecimentos"
    ],
    "Abastecimento.details.precoPorLitro": [
      "ordensEAbastecimentos"
    ],
    "Abastecimento.details.valor": [
      "ordensEAbastecimentos"
    ],
    "Abastecimento.motoristaId": [
      "ordensEAbastecimentos"
    ],
    "Abastecimento.veiculoId": [
      "ordensEAbastecimentos"
    ],
    "Motorista.details.identification.name": [
      "ordensEAbastecimentos"
    ],
    "Oficina.details.identification.name": [
      "ordensEAbastecimentos"
    ],
    "OrdemManutencao.dataEntrada": [
      "ordensEAbastecimentos"
    ],
    "OrdemManutencao.details.diasNaOficina": [
      "ordensEAbastecimentos"
    ],
    "OrdemManutencao.numero": [
      "ordensEAbastecimentos"
    ],
    "OrdemManutencao.oficinaId": [
      "ordensEAbastecimentos"
    ],
    "OrdemManutencao.status": [
      "ordensEAbastecimentos"
    ],
    "OrdemManutencao.tipo": [
      "ordensEAbastecimentos"
    ],
    "OrdemManutencao.veiculoId": [
      "ordensEAbastecimentos"
    ],
    "PlanoManutencao.descricao": [
      "preventivasVencidas"
    ],
    "PlanoManutencao.details.dataPrevista": [
      "preventivasVencidas"
    ],
    "PlanoManutencao.details.dataUltimaPreventiva": [
      "preventivasVencidas"
    ],
    "PlanoManutencao.details.kmExcedido": [
      "preventivasVencidas"
    ],
    "PlanoManutencao.details.kmPrevisto": [
      "preventivasVencidas"
    ],
    "PlanoManutencao.details.kmUltimaPreventiva": [
      "preventivasVencidas"
    ],
    "PlanoManutencao.details.temOrdemAberta": [
      "preventivasVencidas"
    ],
    "PlanoManutencao.details.vencidoPorKm": [
      "preventivasVencidas"
    ],
    "PlanoManutencao.details.vencidoPorTempo": [
      "preventivasVencidas"
    ],
    "PlanoManutencao.veiculoId": [
      "preventivasVencidas"
    ],
    "Veiculo.details.quilometragemAtual": [
      "preventivasVencidas"
    ],
    "Veiculo.modelo": [
      "preventivasVencidas"
    ],
    "Veiculo.placa": [
      "ordensEAbastecimentos",
      "preventivasVencidas"
    ]
  }
} as const;
