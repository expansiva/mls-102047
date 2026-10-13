/// <mls fileReference="_102047_/l2/manutencaoFrota/web/shared/meus_abastecimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "dataInicio": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:meusAbastecimentosLista",
        "persist": true
      },
      "dataFim": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:meusAbastecimentosLista",
        "persist": true
      },
      "veiculoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:meusAbastecimentosLista",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:meusAbastecimentosLista",
        "persist": true
      },
      "abastecimentoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:abastecimentoDetalhe",
        "persist": true
      }
    }
  },
  "forms": {
    "registrarAbastecimento": {
      "organism": "lancarAbastecimento",
      "submit": "registrarAbastecimento"
    }
  },
  "requests": {
    "carregarMeusAbastecimentos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "motoristaId",
        "precosPorLitro"
      ]
    },
    "listarMeusAbastecimentos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "abastecimentos"
      ]
    },
    "obterAbastecimento": {
      "kind": "qry",
      "trigger": "obterAbastecimento",
      "returns": [
        "abastecimento"
      ]
    },
    "registrarAbastecimento": {
      "kind": "cmd",
      "trigger": "registrarAbastecimento",
      "returns": [
        "abastecimento"
      ],
      "writes": "Abastecimento.create"
    }
  },
  "states": {
    "motoristaId": {
      "source": "carregarMeusAbastecimentos.motoristaId",
      "description": "motoristaId para o formulário lancarAbastecimento e precosPorLitro (data e preço por litro) para o resumo de variação.",
      "organisms": [
        "lancarAbastecimento"
      ]
    },
    "precosPorLitro": {
      "source": "carregarMeusAbastecimentos.precosPorLitro",
      "description": "Ponto da série de preço por litro ao longo das datas.",
      "organisms": [
        "precoPorLitroResumo"
      ]
    },
    "abastecimentos": {
      "source": "listarMeusAbastecimentos.abastecimentos",
      "description": "Linha da lista de meus abastecimentos.",
      "organisms": [
        "meusAbastecimentosLista"
      ]
    },
    "abastecimento": {
      "source": "obterAbastecimento.abastecimento",
      "description": "Abastecimento completo com o nome do motorista.",
      "organisms": [
        "abastecimentoDetalhe"
      ]
    },
    "selectedAbastecimento": {
      "source": "entry.params.abastecimentoId",
      "description": "Abastecimento completo com o nome do motorista.",
      "organisms": [
        "abastecimentoDetalhe",
        "meusAbastecimentosLista"
      ]
    }
  },
  "functions": {
    "carregarMeusAbastecimentos": {
      "description": "Abre a página: identifica o motorista logado para o formulário de lançamento e entrega a série de preço por litro dos seus abastecimentos.",
      "calls": "carregarMeusAbastecimentos",
      "sets": "motoristaId",
      "updates": [
        "precosPorLitro"
      ]
    },
    "listarMeusAbastecimentos": {
      "description": "Lista, paginada, os abastecimentos do motorista logado, com filtro por período e veículo; roda ao abrir e novamente quando o motorista muda o filtro ou pede a próxima página.",
      "calls": "listarMeusAbastecimentos",
      "sets": "abastecimentos"
    },
    "obterAbastecimento": {
      "description": "Abre o abastecimento escolhido na lista para o motorista conferir os dados completos.",
      "calls": "obterAbastecimento",
      "sets": "abastecimento"
    },
    "registrarAbastecimento": {
      "description": "Registra o abastecimento lançado pelo motorista e atualiza a quilometragem do veículo. (abastecimentos.items: upsert)",
      "calls": "registrarAbastecimento",
      "updates": [
        "abastecimentos",
        "motoristaId",
        "precosPorLitro"
      ]
    }
  },
  "journeys": [
    {
      "step": "consultarMeusAbastecimentos/listarAbastecimentos",
      "organisms": [
        "meusAbastecimentosLista",
        "precoPorLitroResumo"
      ],
      "functions": [
        "listarMeusAbastecimentos",
        "carregarMeusAbastecimentos"
      ]
    },
    {
      "step": "consultarMeusAbastecimentos/verAbastecimento",
      "organisms": [
        "abastecimentoDetalhe"
      ],
      "functions": [
        "obterAbastecimento"
      ]
    },
    {
      "step": "registrarAbastecimento/localizarVeiculo",
      "organisms": [
        "lancarAbastecimento"
      ],
      "functions": [
        "carregarMeusAbastecimentos"
      ],
      "continuesIn": "meus_veiculos"
    },
    {
      "step": "registrarAbastecimento/conferirVeiculo",
      "organisms": [],
      "functions": [],
      "continuesIn": "meus_veiculos"
    },
    {
      "step": "registrarAbastecimento/lancarAbastecimento",
      "organisms": [
        "lancarAbastecimento"
      ],
      "functions": [
        "registrarAbastecimento"
      ]
    }
  ],
  "rules": {
    "carregarMeusAbastecimentos": [
      "motoristaVeSomenteSeusAbastecimentos",
      "precoPorLitroCalculado"
    ],
    "listarMeusAbastecimentos": [
      "motoristaVeSomenteSeusAbastecimentos",
      "precoPorLitroCalculado"
    ],
    "obterAbastecimento": [
      "motoristaVeSomenteSeusAbastecimentos",
      "precoPorLitroCalculado"
    ],
    "registrarAbastecimento": [
      "abastecimentoSomenteVeiculoAtribuido",
      "litrosEValorPositivos",
      "kmPainelNaoMenorQueAtual",
      "kmPainelAtualizaQuilometragemVeiculo",
      "precoPorLitroCalculado"
    ]
  },
  "access": {
    "actors": [
      "motorista"
    ],
    "grants": [
      "motoristaMeusAbastecimentos",
      "motoristaProprioCadastro"
    ]
  },
  "fields": {
    "Abastecimento.data": [
      "abastecimentoDetalhe",
      "lancarAbastecimento",
      "meusAbastecimentosLista",
      "precoPorLitroResumo"
    ],
    "Abastecimento.details.kmPainel": [
      "abastecimentoDetalhe",
      "lancarAbastecimento",
      "meusAbastecimentosLista"
    ],
    "Abastecimento.details.litros": [
      "abastecimentoDetalhe",
      "lancarAbastecimento",
      "meusAbastecimentosLista"
    ],
    "Abastecimento.details.precoPorLitro": [
      "abastecimentoDetalhe",
      "meusAbastecimentosLista",
      "precoPorLitroResumo"
    ],
    "Abastecimento.details.valor": [
      "abastecimentoDetalhe",
      "lancarAbastecimento",
      "meusAbastecimentosLista"
    ],
    "Abastecimento.id": [
      "meusAbastecimentosLista"
    ],
    "Abastecimento.motoristaId": [
      "abastecimentoDetalhe",
      "lancarAbastecimento"
    ],
    "Abastecimento.veiculoId": [
      "abastecimentoDetalhe",
      "lancarAbastecimento",
      "meusAbastecimentosLista"
    ],
    "Motorista.details.identification.name": [
      "abastecimentoDetalhe"
    ]
  }
} as const;
