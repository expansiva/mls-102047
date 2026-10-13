/// <mls fileReference="_102047_/l2/manutencaoFrota/web/shared/ordens_manutencao.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:ordensLista",
        "persist": true
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:ordensLista",
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
      "oficinaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:ordensLista",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:ordensLista",
        "persist": true
      },
      "ordemId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:ordemDetalhe",
        "persist": true
      },
      "texto": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:ordemFormulario",
        "persist": true
      },
      "planoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:ordemFormulario",
        "persist": true
      },
      "ordemManutencaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:ordemDetalhe",
        "persist": true
      },
      "planoManutencaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:PlanoManutencao",
        "persist": true
      }
    }
  },
  "forms": {
    "salvarAberturaOrdem": {
      "organism": "ordemFormulario",
      "submit": "salvarAberturaOrdem"
    },
    "registrarConclusaoOrdem": {
      "organism": "ordemFormulario",
      "submit": "registrarConclusaoOrdem"
    }
  },
  "requests": {
    "listarOrdens": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "ordens"
      ]
    },
    "obterOrdem": {
      "kind": "qry",
      "trigger": "obterOrdem",
      "returns": [
        "ordem"
      ]
    },
    "buscarVeiculos": {
      "kind": "qry",
      "trigger": "buscarVeiculos",
      "returns": [
        "veiculos"
      ]
    },
    "buscarOficinas": {
      "kind": "qry",
      "trigger": "buscarOficinas",
      "returns": [
        "oficinas"
      ]
    },
    "carregarVeiculoAbertura": {
      "kind": "qry",
      "trigger": "carregarVeiculoAbertura",
      "returns": [
        "veiculo",
        "planos"
      ]
    },
    "abrirOrdem": {
      "kind": "cmd",
      "trigger": "salvarAberturaOrdem",
      "returns": [
        "ordem"
      ],
      "writes": "OrdemManutencao.create"
    },
    "concluirOrdem": {
      "kind": "cmd",
      "trigger": "registrarConclusaoOrdem",
      "returns": [
        "ordem"
      ],
      "writes": "OrdemManutencao.concluir"
    }
  },
  "states": {
    "ordens": {
      "source": "listarOrdens.ordens",
      "description": "Linha da lista de ordens.",
      "organisms": [
        "ordensLista"
      ]
    },
    "ordem": {
      "source": "obterOrdem.ordem",
      "description": "Ordem completa com veículo, oficina e plano vinculado; usada no detalhe, nas ações e como retorno dos comandos.",
      "organisms": [
        "ordemAcoes",
        "ordemDetalhe",
        "ordemFormulario"
      ]
    },
    "veiculos": {
      "source": "buscarVeiculos.veiculos",
      "description": "Veículo com placa, modelo e quilometragem atual.",
      "organisms": [
        "ordemFormulario"
      ]
    },
    "oficinas": {
      "source": "buscarOficinas.oficinas",
      "description": "Oficina com nome e situação, usada na lista, no detalhe e na escolha da oficina.",
      "organisms": [
        "ordemFormulario"
      ]
    },
    "veiculo": {
      "source": "carregarVeiculoAbertura.veiculo",
      "description": "Veículo com placa, modelo e quilometragem atual.",
      "organisms": [
        "ordemFormulario"
      ]
    },
    "planos": {
      "source": "carregarVeiculoAbertura.planos",
      "description": "Plano preventivo com vencimento calculado e indicação de ordem aberta.",
      "organisms": [
        "ordemFormulario"
      ]
    },
    "selectedOrdemManutencao": {
      "source": "entry.params.ordemManutencaoId",
      "description": "Ordem completa com veículo, oficina e plano vinculado; usada no detalhe, nas ações e como retorno dos comandos.",
      "organisms": [
        "ordemAcoes",
        "ordemDetalhe",
        "ordemFormulario",
        "ordensLista"
      ]
    }
  },
  "functions": {
    "listarOrdens": {
      "description": "Carrega a fila de ordens de manutenção da organização, já filtrada pela situação (abertas por padrão), para o gestor localizar a ordem a acompanhar ou concluir.",
      "calls": "listarOrdens",
      "sets": "ordens"
    },
    "obterOrdem": {
      "description": "Abre a ordem selecionada na lista com tudo que o gestor confere antes de concluir.",
      "calls": "obterOrdem",
      "sets": "ordem"
    },
    "buscarVeiculos": {
      "description": "Localiza o veículo pela placa ou modelo para abrir uma ordem.",
      "calls": "buscarVeiculos",
      "sets": "veiculos"
    },
    "buscarOficinas": {
      "description": "Localiza a oficina onde a ordem será executada.",
      "calls": "buscarOficinas",
      "sets": "oficinas"
    },
    "carregarVeiculoAbertura": {
      "description": "Prepara a abertura da ordem para um veículo: o veículo escolhido e seus planos preventivos com vencimento, inclusive quando o gestor chega pelo aviso de plano vencido.",
      "calls": "carregarVeiculoAbertura",
      "sets": "veiculo",
      "updates": [
        "planos"
      ]
    },
    "abrirOrdem": {
      "description": "Abre uma ordem preventiva (plano vencido) ou corretiva (defeito).",
      "calls": "abrirOrdem",
      "sets": "ordem",
      "updates": [
        "ordens"
      ]
    },
    "concluirOrdem": {
      "description": "Conclui a ordem aberta registrando a saída do veículo e o custo final.",
      "calls": "concluirOrdem",
      "sets": "ordem",
      "updates": [
        "ordens"
      ]
    },
    "verPlanosVencidos": {
      "description": "Abrir ordem corretiva por defeito ou concluir a ordem aberta selecionada, levando ao formulário de registro; atalhos para os planos de preventiva vencidos e para os veículos.",
      "navigate": "planos_manutencao",
      "carries": {
        "ordemManutencaoId": "selectedOrdemManutencao.id"
      }
    },
    "verVeiculos": {
      "description": "Abrir ordem corretiva por defeito ou concluir a ordem aberta selecionada, levando ao formulário de registro; atalhos para os planos de preventiva vencidos e para os veículos.",
      "navigate": "veiculos",
      "carries": {
        "ordemManutencaoId": "selectedOrdemManutencao.id"
      }
    }
  },
  "journeys": [
    {
      "step": "abrirOrdemDefeito/localizarVeiculoDefeito",
      "organisms": [
        "ordemFormulario"
      ],
      "functions": [
        "buscarVeiculos",
        "carregarVeiculoAbertura"
      ]
    },
    {
      "step": "abrirOrdemDefeito/abrirOrdemCorretiva",
      "organisms": [
        "ordemAcoes",
        "ordemFormulario"
      ],
      "functions": [
        "buscarOficinas",
        "abrirOrdem"
      ]
    },
    {
      "step": "abrirOrdemPlanoVencido/verAvisoPlano",
      "organisms": [
        "ordemFormulario"
      ],
      "functions": [
        "carregarVeiculoAbertura"
      ]
    },
    {
      "step": "abrirOrdemPlanoVencido/abrirOrdemPlano",
      "organisms": [
        "ordemFormulario"
      ],
      "functions": [
        "buscarOficinas",
        "abrirOrdem"
      ]
    },
    {
      "step": "concluirOrdem/localizarOrdem",
      "organisms": [
        "ordensLista"
      ],
      "functions": [
        "listarOrdens"
      ]
    },
    {
      "step": "concluirOrdem/verOrdem",
      "organisms": [
        "ordemDetalhe"
      ],
      "functions": [
        "obterOrdem"
      ]
    },
    {
      "step": "concluirOrdem/registrarConclusao",
      "organisms": [
        "ordemAcoes",
        "ordemFormulario"
      ],
      "functions": [
        "concluirOrdem"
      ]
    }
  ],
  "rules": {
    "listarOrdens": [],
    "obterOrdem": [
      "planoVencimentoCalculado"
    ],
    "buscarVeiculos": [],
    "buscarOficinas": [
      "oficinaInativaSemNovasOrdens"
    ],
    "carregarVeiculoAbertura": [
      "planoVencimentoCalculado",
      "avisoPreventivaVencidaKm",
      "planoUmaOrdemAberta"
    ],
    "abrirOrdem": [
      "ordemPreventivaExigePlano",
      "ordemCorretivaSemPlano",
      "oficinaInativaSemNovasOrdens",
      "planoUmaOrdemAberta",
      "numeroOrdemUnico",
      "dataSaidaNaoAnteriorEntrada"
    ],
    "concluirOrdem": [
      "conclusaoExigeSaidaECusto",
      "dataSaidaNaoAnteriorEntrada",
      "conclusaoRecalculaPlano",
      "ordemConcluidaNaoEditavel"
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
      "ordemDetalhe",
      "ordemFormulario",
      "ordensLista"
    ],
    "Oficina.details.identification.status": [
      "ordemFormulario"
    ],
    "OrdemManutencao.dataEntrada": [
      "ordemDetalhe",
      "ordemFormulario",
      "ordensLista"
    ],
    "OrdemManutencao.dataSaida": [
      "ordemDetalhe",
      "ordemFormulario"
    ],
    "OrdemManutencao.details.custo": [
      "ordemDetalhe",
      "ordemFormulario"
    ],
    "OrdemManutencao.details.descricao": [
      "ordemDetalhe",
      "ordemFormulario"
    ],
    "OrdemManutencao.details.diasNaOficina": [
      "ordemDetalhe",
      "ordensLista"
    ],
    "OrdemManutencao.details.kmEntrada": [
      "ordemDetalhe",
      "ordemFormulario"
    ],
    "OrdemManutencao.numero": [
      "ordemAcoes",
      "ordemDetalhe",
      "ordensLista"
    ],
    "OrdemManutencao.oficinaId": [
      "ordemFormulario",
      "ordensLista"
    ],
    "OrdemManutencao.planoId": [
      "ordemFormulario"
    ],
    "OrdemManutencao.status": [
      "ordemAcoes",
      "ordemDetalhe",
      "ordemFormulario",
      "ordensLista"
    ],
    "OrdemManutencao.tipo": [
      "ordemDetalhe",
      "ordemFormulario",
      "ordensLista"
    ],
    "OrdemManutencao.veiculoId": [
      "ordemFormulario",
      "ordensLista"
    ],
    "PlanoManutencao.descricao": [
      "ordemDetalhe",
      "ordemFormulario"
    ],
    "PlanoManutencao.details.dataPrevista": [
      "ordemDetalhe"
    ],
    "PlanoManutencao.details.kmPrevisto": [
      "ordemDetalhe",
      "ordemFormulario"
    ],
    "PlanoManutencao.details.temOrdemAberta": [
      "ordemFormulario"
    ],
    "PlanoManutencao.details.vencidoPorKm": [
      "ordemFormulario"
    ],
    "Veiculo.details.quilometragemAtual": [
      "ordemDetalhe",
      "ordemFormulario"
    ],
    "Veiculo.modelo": [
      "ordemDetalhe"
    ],
    "Veiculo.placa": [
      "ordemDetalhe",
      "ordemFormulario",
      "ordensLista"
    ]
  }
} as const;
