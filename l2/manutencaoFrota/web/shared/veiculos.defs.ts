/// <mls fileReference="_102047_/l2/manutencaoFrota/web/shared/veiculos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:frotaList",
        "persist": true
      },
      "somenteVencidas": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:frotaList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:frotaList",
        "persist": true
      },
      "veiculoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:veiculoDetail",
        "persist": true
      },
      "texto": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:acoesVeiculo",
        "persist": true
      },
      "motoristaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:acoesVeiculo",
        "persist": false
      },
      "oficinaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:acoesVeiculo",
        "persist": false
      }
    }
  },
  "forms": {
    "cadastrarVeiculo": {
      "organism": "cadastroVeiculoForm",
      "submit": "cadastrarVeiculo"
    },
    "atribuirMotorista": {
      "organism": "cadastroVeiculoForm",
      "submit": "atribuirMotorista"
    },
    "cadastrarPlano": {
      "organism": "acoesVeiculo",
      "submit": "cadastrarPlano"
    },
    "abrirOrdemDefeito": {
      "organism": "acoesVeiculo",
      "submit": "abrirOrdemDefeito"
    }
  },
  "requests": {
    "veiculosFrota": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "veiculos"
      ]
    },
    "veiculoFicha": {
      "kind": "qry",
      "trigger": "veiculoFicha",
      "returns": [
        "veiculo"
      ]
    },
    "buscarMotoristas": {
      "kind": "qry",
      "trigger": "buscarMotoristas",
      "returns": [
        "motoristas"
      ]
    },
    "buscarOficinas": {
      "kind": "qry",
      "trigger": "buscarOficinas",
      "returns": [
        "oficinas"
      ]
    },
    "cadastrarVeiculo": {
      "kind": "cmd",
      "trigger": "cadastrarVeiculo",
      "returns": [
        "item",
        "veiculo"
      ],
      "writes": "Veiculo.create"
    },
    "atribuirMotorista": {
      "kind": "cmd",
      "trigger": "atribuirMotorista",
      "returns": [
        "item",
        "veiculo"
      ],
      "writes": "Veiculo.update"
    },
    "cadastrarPlano": {
      "kind": "cmd",
      "trigger": "cadastrarPlano",
      "returns": [
        "item",
        "veiculo"
      ],
      "writes": "PlanoManutencao.create"
    },
    "abrirOrdemDefeito": {
      "kind": "cmd",
      "trigger": "abrirOrdemDefeito",
      "returns": [
        "veiculo"
      ],
      "writes": "OrdemManutencao.create"
    }
  },
  "states": {
    "veiculos": {
      "source": "veiculosFrota.veiculos",
      "description": "Linha da lista da frota.",
      "organisms": [
        "frotaList"
      ]
    },
    "veiculo": {
      "source": "veiculoFicha.veiculo",
      "description": "Ficha completa do veículo com motorista, planos e ordens.",
      "organisms": [
        "acoesVeiculo",
        "veiculoDetail"
      ]
    },
    "motoristas": {
      "source": "buscarMotoristas.motoristas",
      "description": "Motorista com id e nome, para exibir e escolher na atribuição.",
      "organisms": [
        "acoesVeiculo"
      ]
    },
    "oficinas": {
      "source": "buscarOficinas.oficinas",
      "description": "Oficina com id e nome, para exibir na ordem e escolher na abertura.",
      "organisms": [
        "acoesVeiculo"
      ]
    },
    "selectedVeiculo": {
      "source": "entry.params.veiculoId",
      "description": "Ficha completa do veículo com motorista, planos e ordens.",
      "organisms": [
        "acoesVeiculo",
        "frotaList",
        "veiculoDetail"
      ]
    }
  },
  "functions": {
    "veiculosFrota": {
      "description": "Carrega a lista paginada da frota com a situação da preventiva de cada veículo, para o gestor localizar um veículo pela placa e ver os vencidos.",
      "calls": "veiculosFrota",
      "sets": "veiculos"
    },
    "veiculoFicha": {
      "description": "Abre a ficha do veículo escolhido na lista, com seus planos de preventiva e ordens de manutenção, numa só chamada.",
      "calls": "veiculoFicha",
      "sets": "veiculo"
    },
    "buscarMotoristas": {
      "description": "Localiza motoristas pelo nome digitado para o gestor escolher quem vai dirigir o veículo.",
      "calls": "buscarMotoristas",
      "sets": "motoristas"
    },
    "buscarOficinas": {
      "description": "Localiza oficinas pelo nome para o gestor escolher onde a ordem por defeito será executada.",
      "calls": "buscarOficinas",
      "sets": "oficinas"
    },
    "cadastrarVeiculo": {
      "description": "Cadastra um novo veículo na frota. (veiculos.items: upsert)",
      "calls": "cadastrarVeiculo",
      "sets": "veiculo",
      "updates": [
        "veiculos"
      ]
    },
    "atribuirMotorista": {
      "description": "Atribui ou troca o motorista que dirige o veículo selecionado. (veiculos.items: upsert)",
      "calls": "atribuirMotorista",
      "sets": "veiculo",
      "updates": [
        "veiculos"
      ]
    },
    "cadastrarPlano": {
      "description": "Cadastra um plano de preventiva para o veículo selecionado, a cada N km ou N meses. (veiculos.items: upsert)",
      "calls": "cadastrarPlano",
      "sets": "veiculo",
      "updates": [
        "veiculos"
      ]
    },
    "abrirOrdemDefeito": {
      "description": "Abre uma ordem de manutenção corretiva por defeito para o veículo selecionado.",
      "calls": "abrirOrdemDefeito",
      "sets": "veiculo"
    },
    "verPlanos": {
      "description": "Ficha do veículo: placa, modelo, ano e km atual, os planos de preventiva com o próximo vencimento previsto e as ordens de manutenção com oficina, situação e dias na oficina.",
      "navigate": "planos_manutencao",
      "carries": {
        "veiculoId": "selectedVeiculo.id"
      }
    },
    "verOrdens": {
      "description": "Ficha do veículo: placa, modelo, ano e km atual, os planos de preventiva com o próximo vencimento previsto e as ordens de manutenção com oficina, situação e dias na oficina.",
      "navigate": "ordens_manutencao",
      "carries": {
        "veiculoId": "selectedVeiculo.id"
      }
    }
  },
  "journeys": [
    {
      "step": "abrirOrdemDefeito/localizarVeiculoDefeito",
      "organisms": [
        "frotaList"
      ],
      "functions": [
        "veiculosFrota",
        "veiculoFicha"
      ]
    },
    {
      "step": "abrirOrdemDefeito/abrirOrdemCorretiva",
      "organisms": [
        "acoesVeiculo"
      ],
      "functions": [
        "buscarOficinas",
        "abrirOrdemDefeito"
      ]
    },
    {
      "step": "cadastrarPlanoPreventiva/localizarVeiculoPlano",
      "organisms": [
        "frotaList"
      ],
      "functions": [
        "veiculosFrota"
      ]
    },
    {
      "step": "cadastrarPlanoPreventiva/verVeiculoPlano",
      "organisms": [
        "veiculoDetail"
      ],
      "functions": [
        "veiculoFicha"
      ]
    },
    {
      "step": "cadastrarPlanoPreventiva/criarPlano",
      "organisms": [
        "acoesVeiculo"
      ],
      "functions": [
        "cadastrarPlano"
      ]
    },
    {
      "step": "cadastrarVeiculo/criarVeiculo",
      "organisms": [
        "cadastroVeiculoForm"
      ],
      "functions": [
        "cadastrarVeiculo"
      ]
    },
    {
      "step": "cadastrarVeiculo/atribuirMotorista",
      "organisms": [
        "acoesVeiculo"
      ],
      "functions": [
        "buscarMotoristas",
        "atribuirMotorista"
      ]
    }
  ],
  "rules": {
    "veiculosFrota": [
      "avisoPreventivaVencidaKm",
      "planoVencimentoCalculado"
    ],
    "veiculoFicha": [
      "planoVencimentoCalculado",
      "avisoPreventivaVencidaKm"
    ],
    "buscarMotoristas": [],
    "buscarOficinas": [
      "oficinaInativaSemNovasOrdens"
    ],
    "cadastrarVeiculo": [
      "placaUnica"
    ],
    "atribuirMotorista": [
      "motoristaVeSomenteVeiculosAtribuidos"
    ],
    "cadastrarPlano": [
      "planoIntervaloObrigatorio",
      "planoVencimentoCalculado",
      "avisoPreventivaVencidaKm"
    ],
    "abrirOrdemDefeito": [
      "ordemCorretivaSemPlano",
      "oficinaInativaSemNovasOrdens",
      "numeroOrdemUnico"
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
    "Motorista.details.identification.name": [
      "acoesVeiculo",
      "frotaList",
      "veiculoDetail"
    ],
    "Oficina.details.identification.name": [
      "acoesVeiculo",
      "veiculoDetail"
    ],
    "OrdemManutencao.dataEntrada": [
      "acoesVeiculo",
      "veiculoDetail"
    ],
    "OrdemManutencao.dataSaida": [
      "veiculoDetail"
    ],
    "OrdemManutencao.details.descricao": [
      "acoesVeiculo"
    ],
    "OrdemManutencao.details.diasNaOficina": [
      "veiculoDetail"
    ],
    "OrdemManutencao.details.kmEntrada": [
      "acoesVeiculo"
    ],
    "OrdemManutencao.numero": [
      "veiculoDetail"
    ],
    "OrdemManutencao.oficinaId": [
      "acoesVeiculo"
    ],
    "OrdemManutencao.status": [
      "veiculoDetail"
    ],
    "OrdemManutencao.tipo": [
      "veiculoDetail"
    ],
    "PlanoManutencao.descricao": [
      "acoesVeiculo",
      "veiculoDetail"
    ],
    "PlanoManutencao.details.dataPrevista": [
      "veiculoDetail"
    ],
    "PlanoManutencao.details.dataReferencia": [
      "acoesVeiculo"
    ],
    "PlanoManutencao.details.intervaloKm": [
      "acoesVeiculo",
      "veiculoDetail"
    ],
    "PlanoManutencao.details.intervaloMeses": [
      "acoesVeiculo",
      "veiculoDetail"
    ],
    "PlanoManutencao.details.kmPrevisto": [
      "veiculoDetail"
    ],
    "PlanoManutencao.details.kmReferencia": [
      "acoesVeiculo"
    ],
    "PlanoManutencao.details.observacoes": [
      "acoesVeiculo"
    ],
    "PlanoManutencao.details.temOrdemAberta": [
      "veiculoDetail"
    ],
    "PlanoManutencao.details.vencidoPorKm": [
      "veiculoDetail"
    ],
    "PlanoManutencao.details.vencidoPorTempo": [
      "veiculoDetail"
    ],
    "Veiculo.details.ano": [
      "cadastroVeiculoForm",
      "veiculoDetail"
    ],
    "Veiculo.details.kmProximaPreventiva": [
      "frotaList"
    ],
    "Veiculo.details.preventivaVencida": [
      "frotaList"
    ],
    "Veiculo.details.quilometragemAtual": [
      "acoesVeiculo",
      "cadastroVeiculoForm",
      "frotaList",
      "veiculoDetail"
    ],
    "Veiculo.modelo": [
      "cadastroVeiculoForm",
      "frotaList",
      "veiculoDetail"
    ],
    "Veiculo.motoristaId": [
      "acoesVeiculo",
      "frotaList"
    ],
    "Veiculo.placa": [
      "acoesVeiculo",
      "cadastroVeiculoForm",
      "frotaList",
      "veiculoDetail"
    ]
  }
} as const;
