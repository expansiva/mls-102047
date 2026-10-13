/// <mls fileReference="_102047_/l2/manutencaoFrota/web/shared/meus_veiculos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "veiculoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:fichaVeiculo",
        "persist": true
      }
    }
  },
  "forms": {
    "lancarAbastecimento": {
      "organism": "registrarAbastecimento",
      "submit": "lancarAbastecimento"
    }
  },
  "requests": {
    "carregarMeusVeiculos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "motorista",
        "veiculos"
      ]
    },
    "lancarAbastecimento": {
      "kind": "cmd",
      "trigger": "lancarAbastecimento",
      "returns": [
        "veiculo"
      ],
      "writes": "Abastecimento.create"
    }
  },
  "states": {
    "veiculos": {
      "source": "carregarMeusVeiculos.veiculos",
      "description": "Veículo atribuído ao motorista, com os dados da ficha e o último abastecimento como referência de km.",
      "organisms": [
        "fichaVeiculo",
        "listaVeiculos",
        "registrarAbastecimento",
        "resumoVeiculos"
      ]
    },
    "motorista": {
      "source": "carregarMeusVeiculos.motorista",
      "description": "Motorista logado, dono dos veículos e dos abastecimentos da página.",
      "organisms": [
        "fichaVeiculo",
        "registrarAbastecimento"
      ]
    },
    "selectedVeiculo": {
      "source": "entry.params.veiculoId",
      "description": "Veículo atribuído ao motorista, com os dados da ficha e o último abastecimento como referência de km.",
      "organisms": [
        "fichaVeiculo",
        "listaVeiculos",
        "registrarAbastecimento"
      ]
    }
  },
  "functions": {
    "carregarMeusVeiculos": {
      "description": "Carrega de uma vez tudo o que a página Meus veículos mostra ao abrir: o motorista logado e os veículos atribuídos a ele, cada um com seus dados de ficha e o último abastecimento registrado.",
      "calls": "carregarMeusVeiculos",
      "sets": "veiculos",
      "updates": [
        "motorista"
      ]
    },
    "lancarAbastecimento": {
      "description": "Registra o abastecimento do veículo escolhido e atualiza a quilometragem atual dele numa só operação. (veiculos: upsert)",
      "calls": "lancarAbastecimento",
      "updates": [
        "veiculos"
      ]
    },
    "verMeusAbastecimentos": {
      "description": "Para cada veículo que você dirige: quilometragem atual e o último abastecimento que você registrou, com data, km no painel e preço por litro. Assim você sabe de qual km partir ao lançar o próximo.",
      "navigate": "meus_abastecimentos"
    },
    "abrirMeusAbastecimentos": {
      "description": "Registrar o abastecimento deste veículo: informe data, litros, valor e km no painel. O km informado passa a ser a quilometragem atual do veículo e não pode ser menor que ela.",
      "navigate": "meus_abastecimentos",
      "carries": {
        "veiculoId": "selectedVeiculo.id"
      }
    }
  },
  "journeys": [
    {
      "step": "registrarAbastecimento/localizarVeiculo",
      "organisms": [
        "listaVeiculos"
      ],
      "functions": [
        "carregarMeusVeiculos"
      ]
    },
    {
      "step": "registrarAbastecimento/conferirVeiculo",
      "organisms": [
        "fichaVeiculo"
      ],
      "functions": [
        "carregarMeusVeiculos"
      ]
    },
    {
      "step": "registrarAbastecimento/lancarAbastecimento",
      "organisms": [
        "registrarAbastecimento"
      ],
      "functions": [
        "lancarAbastecimento"
      ]
    }
  ],
  "rules": {
    "carregarMeusVeiculos": [
      "motoristaVeSomenteVeiculosAtribuidos",
      "motoristaVeSomenteSeusAbastecimentos",
      "precoPorLitroCalculado"
    ],
    "lancarAbastecimento": [
      "abastecimentoSomenteVeiculoAtribuido",
      "litrosEValorPositivos",
      "kmPainelNaoMenorQueAtual",
      "kmPainelAtualizaQuilometragemVeiculo",
      "quilometragemNaoRegride",
      "precoPorLitroCalculado"
    ]
  },
  "access": {
    "actors": [
      "motorista"
    ],
    "grants": [
      "motoristaVeiculosAtribuidos",
      "motoristaMeusAbastecimentos",
      "motoristaProprioCadastro"
    ]
  },
  "fields": {
    "Abastecimento.data": [
      "registrarAbastecimento",
      "resumoVeiculos"
    ],
    "Abastecimento.details.kmPainel": [
      "registrarAbastecimento",
      "resumoVeiculos"
    ],
    "Abastecimento.details.litros": [
      "registrarAbastecimento"
    ],
    "Abastecimento.details.precoPorLitro": [
      "resumoVeiculos"
    ],
    "Abastecimento.details.valor": [
      "registrarAbastecimento"
    ],
    "Abastecimento.veiculoId": [
      "registrarAbastecimento",
      "resumoVeiculos"
    ],
    "Motorista.details.identification.name": [
      "fichaVeiculo",
      "registrarAbastecimento"
    ],
    "Motorista.details.identification.status": [
      "registrarAbastecimento"
    ],
    "Veiculo.details.ano": [
      "fichaVeiculo"
    ],
    "Veiculo.details.quilometragemAtual": [
      "fichaVeiculo",
      "listaVeiculos",
      "registrarAbastecimento",
      "resumoVeiculos"
    ],
    "Veiculo.modelo": [
      "fichaVeiculo",
      "listaVeiculos"
    ],
    "Veiculo.motoristaId": [
      "fichaVeiculo",
      "listaVeiculos"
    ],
    "Veiculo.placa": [
      "fichaVeiculo",
      "listaVeiculos",
      "registrarAbastecimento",
      "resumoVeiculos"
    ]
  }
} as const;
