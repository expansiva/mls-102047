/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/shared/contratos_locacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaContratos",
        "persist": true
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaContratos",
        "persist": true
      },
      "somenteAtrasados": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaContratos",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaContratos",
        "persist": true
      },
      "contratoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:conferenciaContrato",
        "persist": true
      },
      "nome": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:novoContrato",
        "persist": true
      },
      "texto": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:novoContrato",
        "persist": true
      },
      "dataRetirada": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:novoContrato",
        "persist": true
      },
      "dataPrevistaDevolucao": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:novoContrato",
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
      },
      "contratoLocacaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:conferenciaContrato",
        "persist": true
      },
      "clienteId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:novoContrato",
        "persist": false
      }
    }
  },
  "forms": {
    "abrirContrato": {
      "organism": "novoContrato",
      "submit": "abrirContrato"
    },
    "adicionarItem": {
      "organism": "novoContrato",
      "submit": "adicionarItem"
    },
    "registrarDevolucao": {
      "organism": "acoesContrato",
      "submit": "registrarDevolucao"
    }
  },
  "requests": {
    "listarContratos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "contratos"
      ]
    },
    "obterContrato": {
      "kind": "qry",
      "trigger": "obterContrato",
      "returns": [
        "contrato"
      ]
    },
    "localizarClientes": {
      "kind": "qry",
      "trigger": "localizarClientes",
      "returns": [
        "clientes"
      ]
    },
    "buscarEquipamentos": {
      "kind": "qry",
      "trigger": "buscarEquipamentos",
      "returns": [
        "equipamentos"
      ]
    },
    "abrirContrato": {
      "kind": "cmd",
      "trigger": "abrirContrato",
      "returns": [
        "contrato"
      ],
      "writes": "ContratoLocacao.create"
    },
    "adicionarItem": {
      "kind": "cmd",
      "trigger": "adicionarItem",
      "returns": [
        "contrato"
      ],
      "writes": "ItemContrato.create"
    },
    "confirmarContrato": {
      "kind": "cmd",
      "trigger": "confirmarContrato",
      "returns": [
        "contrato"
      ],
      "writes": "ContratoLocacao.ativarContrato"
    },
    "registrarDevolucao": {
      "kind": "cmd",
      "trigger": "registrarDevolucao",
      "returns": [
        "contrato"
      ],
      "writes": "ContratoLocacao.registrarDevolucao"
    }
  },
  "states": {
    "contratos": {
      "source": "listarContratos.contratos",
      "description": "Linha da lista de contratos com situação, período, atraso e quantidade de equipamentos.",
      "organisms": [
        "listaContratos"
      ]
    },
    "obterContratoContrato": {
      "source": "obterContrato.contrato",
      "description": "Contrato completo com cliente, período, totais de atraso e multa e seus itens; redesenhado após cada comando.",
      "organisms": [
        "acoesContrato",
        "conferenciaContrato"
      ]
    },
    "clientes": {
      "source": "localizarClientes.clientes",
      "description": "Cliente titular exibido no contrato e na busca de clientes (somente campos visíveis ao gerente e ao atendente).",
      "organisms": [
        "novoContrato"
      ]
    },
    "equipamentos": {
      "source": "buscarEquipamentos.equipamentos",
      "description": "Equipamento oferecido na montagem do contrato, com situação atual e diária de referência.",
      "organisms": [
        "novoContrato"
      ]
    },
    "abrirContratoContrato": {
      "source": "abrirContrato.contrato",
      "description": "Contrato completo com cliente, período, totais de atraso e multa e seus itens; redesenhado após cada comando.",
      "organisms": [
        "novoContrato"
      ]
    },
    "selectedContratoLocacao": {
      "source": "entry.params.contratoLocacaoId",
      "description": "Contrato completo com cliente, período, totais de atraso e multa e seus itens; redesenhado após cada comando.",
      "organisms": [
        "conferenciaContrato",
        "listaContratos"
      ]
    }
  },
  "functions": {
    "listarContratos": {
      "description": "Carrega a lista paginada de contratos de locação ao abrir a página e a cada pesquisa, já com o nome do cliente, a quantidade de equipamentos e o indicador de atraso.",
      "calls": "listarContratos",
      "sets": "contratos"
    },
    "obterContrato": {
      "description": "Carrega o contrato selecionado na lista com cliente, período, itens, dias de atraso e multa, para conferência e ações.",
      "calls": "obterContrato",
      "sets": "obterContratoContrato"
    },
    "localizarClientes": {
      "description": "Localiza clientes pelo nome digitado para escolher o titular do novo contrato.",
      "calls": "localizarClientes",
      "sets": "clientes"
    },
    "buscarEquipamentos": {
      "description": "Busca equipamentos pelo código ou descrição para incluir no contrato em montagem, mostrando situação atual e diária.",
      "calls": "buscarEquipamentos",
      "sets": "equipamentos"
    },
    "abrirContrato": {
      "description": "Cria o contrato em elaboração para o cliente escolhido com o período informado.",
      "calls": "abrirContrato",
      "sets": "obterContratoContrato",
      "updates": [
        "contratos"
      ]
    },
    "adicionarItem": {
      "description": "Inclui um equipamento no contrato em elaboração com a diária praticada.",
      "calls": "adicionarItem",
      "sets": "abrirContratoContrato",
      "updates": [
        "obterContratoContrato",
        "contratos"
      ]
    },
    "confirmarContrato": {
      "description": "Confirma o contrato em elaboração, passando-o a ativo e os equipamentos a locados.",
      "calls": "confirmarContrato",
      "sets": "obterContratoContrato",
      "updates": [
        "contratos"
      ]
    },
    "registrarDevolucao": {
      "description": "Registra a data real de devolução, encerra o contrato e devolve a multa calculada.",
      "calls": "registrarDevolucao",
      "sets": "obterContratoContrato",
      "updates": [
        "contratos"
      ]
    },
    "verEquipamentos": {
      "description": "Abertura de contrato: localizar o cliente, informar data de retirada e data prevista de devolução, buscar equipamentos disponíveis pelo código ou descrição e adicionar cada um com a diária praticada, vendo dias e valor previstos de cada item.",
      "navigate": "equipamentos"
    }
  },
  "journeys": [
    {
      "step": "criarContratoLocacao/localizarCliente",
      "organisms": [
        "novoContrato"
      ],
      "functions": [
        "localizarClientes"
      ]
    },
    {
      "step": "criarContratoLocacao/informarPeriodo",
      "organisms": [
        "novoContrato"
      ],
      "functions": [
        "abrirContrato"
      ]
    },
    {
      "step": "criarContratoLocacao/consultarEquipamentos",
      "organisms": [
        "novoContrato"
      ],
      "functions": [
        "buscarEquipamentos"
      ]
    },
    {
      "step": "criarContratoLocacao/adicionarItens",
      "organisms": [
        "novoContrato"
      ],
      "functions": [
        "adicionarItem"
      ]
    },
    {
      "step": "criarContratoLocacao/confirmarContrato",
      "organisms": [
        "conferenciaContrato",
        "acoesContrato"
      ],
      "functions": [
        "confirmarContrato"
      ]
    },
    {
      "step": "registrarDevolucao/localizarContrato",
      "organisms": [
        "listaContratos"
      ],
      "functions": [
        "listarContratos"
      ]
    },
    {
      "step": "registrarDevolucao/conferirContrato",
      "organisms": [
        "conferenciaContrato"
      ],
      "functions": [
        "obterContrato"
      ]
    },
    {
      "step": "registrarDevolucao/registrarDataReal",
      "organisms": [
        "acoesContrato"
      ],
      "functions": [
        "registrarDevolucao"
      ]
    },
    {
      "step": "registrarDevolucao/conferirMulta",
      "organisms": [
        "conferenciaContrato",
        "acoesContrato"
      ],
      "functions": [
        "registrarDevolucao",
        "obterContrato"
      ]
    }
  ],
  "rules": {
    "listarContratos": [],
    "obterContrato": [
      "multaPorAtraso",
      "multaAtrasoDevolucao"
    ],
    "localizarClientes": [
      "clienteInativoNaoLoca"
    ],
    "buscarEquipamentos": [
      "equipamentoLocadoDecorreDeContratoAtivo",
      "equipamentoDisponivelParaLocar"
    ],
    "abrirContrato": [
      "clienteInativoNaoLoca",
      "contratoPeriodoValido"
    ],
    "adicionarItem": [
      "contratoEditavelSomenteEmElaboracao",
      "itemUnicoPorContrato",
      "equipamentoSemPeriodoSobreposto",
      "equipamentoSemPeriodosSobrepostos",
      "equipamentoDisponivelParaLocar",
      "equipamentoEmManutencaoNaoLocavel",
      "valorDiariaPositivo"
    ],
    "confirmarContrato": [
      "contratoExigeItem",
      "contratoComAoMenosUmItem",
      "equipamentoSemSobreposicao",
      "equipamentoDisponivelParaLocar",
      "equipamentoEmManutencaoNaoLoca"
    ],
    "registrarDevolucao": [
      "contratoPeriodoValido",
      "multaAtrasoDevolucao",
      "multaPorAtraso",
      "devolucaoLiberaEquipamentos"
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
      "conferenciaContrato",
      "listaContratos",
      "novoContrato"
    ],
    "Cliente.details.identification.status": [
      "novoContrato"
    ],
    "ContratoLocacao.clienteId": [
      "listaContratos",
      "novoContrato"
    ],
    "ContratoLocacao.dataPrevistaDevolucao": [
      "acoesContrato",
      "conferenciaContrato",
      "listaContratos",
      "novoContrato"
    ],
    "ContratoLocacao.dataRealDevolucao": [
      "acoesContrato",
      "conferenciaContrato"
    ],
    "ContratoLocacao.dataRetirada": [
      "conferenciaContrato",
      "listaContratos",
      "novoContrato"
    ],
    "ContratoLocacao.details.atrasado": [
      "listaContratos"
    ],
    "ContratoLocacao.details.diasAtraso": [
      "acoesContrato",
      "conferenciaContrato"
    ],
    "ContratoLocacao.details.observacoes": [
      "novoContrato"
    ],
    "ContratoLocacao.details.quantidadeItens": [
      "listaContratos"
    ],
    "ContratoLocacao.details.valorMulta": [
      "acoesContrato",
      "conferenciaContrato"
    ],
    "ContratoLocacao.numero": [
      "conferenciaContrato",
      "listaContratos"
    ],
    "ContratoLocacao.status": [
      "acoesContrato",
      "conferenciaContrato",
      "listaContratos"
    ],
    "Equipamento.codigo": [
      "conferenciaContrato",
      "novoContrato"
    ],
    "Equipamento.descricao": [
      "conferenciaContrato",
      "novoContrato"
    ],
    "Equipamento.details.situacaoAtual": [
      "novoContrato"
    ],
    "Equipamento.details.valorDiaria": [
      "novoContrato"
    ],
    "ItemContrato.details.diasAtraso": [
      "conferenciaContrato"
    ],
    "ItemContrato.details.diasPrevistos": [
      "conferenciaContrato",
      "novoContrato"
    ],
    "ItemContrato.details.multaAtraso": [
      "conferenciaContrato"
    ],
    "ItemContrato.details.observacao": [
      "novoContrato"
    ],
    "ItemContrato.details.valorDiaria": [
      "conferenciaContrato",
      "novoContrato"
    ],
    "ItemContrato.details.valorPrevisto": [
      "conferenciaContrato",
      "novoContrato"
    ],
    "ItemContrato.equipamentoId": [
      "conferenciaContrato",
      "novoContrato"
    ]
  }
} as const;
