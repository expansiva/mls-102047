/// <mls fileReference="_102047_/l2/manutencaoFrota/web/shared/planos_manutencao.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "situacao": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:planosLista",
        "persist": true
      },
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:planosLista",
        "persist": true
      },
      "veiculoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Veiculo",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:planosLista",
        "persist": true
      },
      "planoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:planoDetalhe",
        "persist": true
      },
      "planoManutencaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:planoDetalhe",
        "persist": true
      },
      "oficinaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:abrirOrdemAcoes",
        "persist": false
      }
    }
  },
  "forms": {
    "salvarPlano": {
      "organism": "planoFormulario",
      "submit": "salvarPlano"
    },
    "abrirOrdemPreventiva": {
      "organism": "abrirOrdemAcoes",
      "submit": "abrirOrdemPreventiva"
    }
  },
  "requests": {
    "qryPlanosLista": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "planos"
      ]
    },
    "qryPlanoDetalhe": {
      "kind": "qry",
      "trigger": "qryPlanoDetalhe",
      "returns": [
        "plano"
      ]
    },
    "qryVeiculosBusca": {
      "kind": "qry",
      "trigger": "qryVeiculosBusca",
      "returns": [
        "veiculos"
      ]
    },
    "qryOficinas": {
      "kind": "qry",
      "trigger": "qryOficinas",
      "returns": [
        "oficinas"
      ]
    },
    "cmdSalvarPlano": {
      "kind": "cmd",
      "trigger": "salvarPlano",
      "returns": [
        "plano"
      ],
      "writes": "PlanoManutencao.create"
    },
    "cmdAbrirOrdemPreventiva": {
      "kind": "cmd",
      "trigger": "abrirOrdemPreventiva",
      "returns": [
        "plano"
      ],
      "writes": "OrdemManutencao.create"
    }
  },
  "states": {
    "planos": {
      "source": "qryPlanosLista.planos",
      "description": "Um plano de preventiva na lista, com o veículo e a situação de vencimento.",
      "organisms": [
        "planosLista"
      ]
    },
    "plano": {
      "source": "qryPlanoDetalhe.plano",
      "description": "O plano selecionado com veículo, vencimento calculado e ordem aberta.",
      "organisms": [
        "abrirOrdemAcoes",
        "planoDetalhe"
      ]
    },
    "veiculos": {
      "source": "qryVeiculosBusca.veiculos",
      "description": "Veículo encontrado na busca do formulário de plano.",
      "organisms": [
        "planoFormulario"
      ]
    },
    "oficinas": {
      "source": "qryOficinas.oficinas",
      "description": "Oficina que pode receber a ordem preventiva.",
      "organisms": [
        "abrirOrdemAcoes"
      ]
    },
    "selectedPlanoManutencao": {
      "source": "entry.params.planoManutencaoId",
      "description": "O plano selecionado com veículo, vencimento calculado e ordem aberta.",
      "organisms": [
        "planoDetalhe",
        "planosLista"
      ]
    }
  },
  "functions": {
    "qryPlanosLista": {
      "description": "Carrega a lista paginada dos planos de preventiva da organização, já com o veículo e a situação de vencimento, filtrável pelos vencidos por km ou por tempo.",
      "calls": "qryPlanosLista",
      "sets": "planos"
    },
    "qryPlanoDetalhe": {
      "description": "Abre o plano escolhido na lista ou vindo do aviso de preventiva vencida, com o veículo, o vencimento e a ordem aberta.",
      "calls": "qryPlanoDetalhe",
      "sets": "plano"
    },
    "qryVeiculosBusca": {
      "description": "Localiza o veículo pela placa ou modelo para definir o plano de preventiva.",
      "calls": "qryVeiculosBusca",
      "sets": "veiculos"
    },
    "qryOficinas": {
      "description": "Lista as oficinas que podem receber a ordem preventiva.",
      "calls": "qryOficinas",
      "sets": "oficinas"
    },
    "cmdSalvarPlano": {
      "description": "Cria o plano de preventiva do veículo. (planos.items: upsert)",
      "calls": "cmdSalvarPlano",
      "updates": [
        "planos"
      ]
    },
    "cmdAbrirOrdemPreventiva": {
      "description": "Abre a ordem de manutenção preventiva para o plano vencido.",
      "calls": "cmdAbrirOrdemPreventiva",
      "sets": "plano",
      "updates": [
        "planos"
      ]
    },
    "verOrdens": {
      "description": "Abrir ordem de manutenção preventiva para o plano vencido, informando oficina, descrição e data de entrada; depois acompanhar a ordem em Ordens de manutenção.",
      "navigate": "ordens_manutencao"
    }
  },
  "journeys": [
    {
      "step": "abrirOrdemPlanoVencido/verAvisoPlano",
      "organisms": [
        "planoDetalhe"
      ],
      "functions": [
        "qryPlanoDetalhe"
      ]
    },
    {
      "step": "abrirOrdemPlanoVencido/abrirOrdemPlano",
      "organisms": [
        "abrirOrdemAcoes"
      ],
      "functions": [
        "qryOficinas",
        "cmdAbrirOrdemPreventiva"
      ]
    },
    {
      "step": "acompanharPreventivasVencidas/listarVencidos",
      "organisms": [
        "planosLista"
      ],
      "functions": [
        "qryPlanosLista"
      ]
    },
    {
      "step": "acompanharPreventivasVencidas/verPlanoVencido",
      "organisms": [
        "planoDetalhe"
      ],
      "functions": [
        "qryPlanoDetalhe"
      ]
    },
    {
      "step": "cadastrarPlanoPreventiva/localizarVeiculoPlano",
      "organisms": [
        "planoFormulario"
      ],
      "functions": [
        "qryVeiculosBusca"
      ]
    },
    {
      "step": "cadastrarPlanoPreventiva/verVeiculoPlano",
      "organisms": [
        "planoFormulario",
        "planosLista"
      ],
      "functions": [
        "qryVeiculosBusca",
        "qryPlanosLista"
      ]
    },
    {
      "step": "cadastrarPlanoPreventiva/criarPlano",
      "organisms": [
        "planoFormulario"
      ],
      "functions": [
        "cmdSalvarPlano"
      ]
    }
  ],
  "rules": {
    "qryPlanosLista": [
      "planoVencimentoCalculado",
      "avisoPreventivaVencidaKm"
    ],
    "qryPlanoDetalhe": [
      "planoVencimentoCalculado",
      "avisoPreventivaVencidaKm",
      "planoUmaOrdemAberta"
    ],
    "qryVeiculosBusca": [],
    "qryOficinas": [
      "oficinaInativaSemNovasOrdens"
    ],
    "cmdSalvarPlano": [
      "planoIntervaloObrigatorio",
      "planoVencimentoCalculado",
      "avisoPreventivaVencidaKm"
    ],
    "cmdAbrirOrdemPreventiva": [
      "ordemPreventivaExigePlano",
      "oficinaInativaSemNovasOrdens",
      "planoUmaOrdemAberta",
      "numeroOrdemUnico",
      "planoVencimentoCalculado"
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
    "Oficina.details.identification.name": [
      "abrirOrdemAcoes"
    ],
    "Oficina.details.identification.status": [
      "abrirOrdemAcoes"
    ],
    "Oficina.id": [
      "abrirOrdemAcoes"
    ],
    "OrdemManutencao.dataEntrada": [
      "abrirOrdemAcoes"
    ],
    "OrdemManutencao.details.descricao": [
      "abrirOrdemAcoes"
    ],
    "OrdemManutencao.details.diasNaOficina": [
      "planoDetalhe"
    ],
    "OrdemManutencao.details.kmEntrada": [
      "abrirOrdemAcoes"
    ],
    "OrdemManutencao.numero": [
      "planoDetalhe"
    ],
    "OrdemManutencao.oficinaId": [
      "abrirOrdemAcoes"
    ],
    "OrdemManutencao.planoId": [
      "abrirOrdemAcoes"
    ],
    "OrdemManutencao.status": [
      "planoDetalhe"
    ],
    "OrdemManutencao.tipo": [
      "abrirOrdemAcoes"
    ],
    "OrdemManutencao.veiculoId": [
      "abrirOrdemAcoes"
    ],
    "PlanoManutencao.descricao": [
      "planoDetalhe",
      "planoFormulario",
      "planosLista"
    ],
    "PlanoManutencao.details.dataPrevista": [
      "planoDetalhe",
      "planosLista"
    ],
    "PlanoManutencao.details.dataReferencia": [
      "planoFormulario"
    ],
    "PlanoManutencao.details.dataUltimaPreventiva": [
      "planoDetalhe"
    ],
    "PlanoManutencao.details.intervaloKm": [
      "planoDetalhe",
      "planoFormulario"
    ],
    "PlanoManutencao.details.intervaloMeses": [
      "planoDetalhe",
      "planoFormulario"
    ],
    "PlanoManutencao.details.kmExcedido": [
      "planoDetalhe",
      "planosLista"
    ],
    "PlanoManutencao.details.kmPrevisto": [
      "planoDetalhe",
      "planosLista"
    ],
    "PlanoManutencao.details.kmReferencia": [
      "planoFormulario"
    ],
    "PlanoManutencao.details.kmUltimaPreventiva": [
      "planoDetalhe"
    ],
    "PlanoManutencao.details.observacoes": [
      "planoDetalhe",
      "planoFormulario"
    ],
    "PlanoManutencao.details.temOrdemAberta": [
      "abrirOrdemAcoes",
      "planoDetalhe",
      "planosLista"
    ],
    "PlanoManutencao.details.vencidoPorKm": [
      "planoDetalhe",
      "planosLista"
    ],
    "PlanoManutencao.details.vencidoPorTempo": [
      "planoDetalhe",
      "planosLista"
    ],
    "PlanoManutencao.id": [
      "abrirOrdemAcoes",
      "planosLista"
    ],
    "PlanoManutencao.veiculoId": [
      "abrirOrdemAcoes",
      "planoFormulario",
      "planosLista"
    ],
    "Veiculo.details.quilometragemAtual": [
      "planoDetalhe",
      "planoFormulario"
    ],
    "Veiculo.id": [
      "planoFormulario"
    ],
    "Veiculo.modelo": [
      "planoFormulario",
      "planosLista"
    ],
    "Veiculo.placa": [
      "planoDetalhe",
      "planoFormulario",
      "planosLista"
    ]
  }
} as const;
