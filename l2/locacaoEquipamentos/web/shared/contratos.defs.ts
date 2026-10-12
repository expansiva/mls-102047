/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/shared/contratos.defs.ts" enhancement="_blank"/>

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
      },
      "equipamentoId": {
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
    "criarContrato": {
      "organism": "novoContrato",
      "submit": "criarContrato"
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
    "qryContratos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "contratos",
        "totalAtrasados"
      ]
    },
    "qryContrato": {
      "kind": "qry",
      "trigger": "qryContrato",
      "returns": [
        "contrato"
      ]
    },
    "qryClientes": {
      "kind": "qry",
      "trigger": "qryClientes",
      "returns": [
        "clientes"
      ]
    },
    "qryEquipamentos": {
      "kind": "qry",
      "trigger": "qryEquipamentos",
      "returns": [
        "equipamentos"
      ]
    },
    "cmdCriarContrato": {
      "kind": "cmd",
      "trigger": "criarContrato",
      "returns": [
        "contrato"
      ],
      "writes": "ContratoLocacao.create"
    },
    "cmdAdicionarItem": {
      "kind": "cmd",
      "trigger": "adicionarItem",
      "returns": [
        "contrato"
      ],
      "writes": "ItemContrato.create"
    },
    "cmdConfirmarContrato": {
      "kind": "cmd",
      "trigger": "confirmarContrato",
      "returns": [
        "contrato"
      ],
      "writes": "ContratoLocacao.ativarContrato"
    },
    "cmdRegistrarDevolucao": {
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
      "source": "qryContratos.contratos",
      "description": "Linha da lista de contratos, com cliente, situação, período e atraso.",
      "organisms": [
        "listaContratos"
      ]
    },
    "totalAtrasados": {
      "source": "qryContratos.totalAtrasados",
      "description": "contratos paginado ({ items, page, pageSize, hasMore }) com número, cliente, situação, datas, atrasado e dias de atraso; totalAtrasados para o indicador da lista.",
      "organisms": [
        "listaContratos"
      ]
    },
    "contrato": {
      "source": "qryContrato.contrato",
      "description": "Contrato completo com cliente, período, totais, atraso, multa e itens; usado pela conferência e devolvido por todos os comandos.",
      "organisms": [
        "acoesContrato",
        "conferenciaContrato"
      ]
    },
    "clientes": {
      "source": "qryClientes.clientes",
      "description": "Cliente como a página o mostra: id, nome e documento.",
      "organisms": [
        "novoContrato"
      ]
    },
    "equipamentos": {
      "source": "qryEquipamentos.equipamentos",
      "description": "Equipamento encontrado na pesquisa do novo contrato, com situação atual e valor da diária.",
      "organisms": [
        "novoContrato"
      ]
    },
    "selectedContratoLocacao": {
      "source": "entry.params.contratoLocacaoId",
      "description": "Contrato completo com cliente, período, totais, atraso, multa e itens; usado pela conferência e devolvido por todos os comandos.",
      "organisms": [
        "conferenciaContrato",
        "listaContratos",
        "novoContrato"
      ]
    }
  },
  "functions": {
    "qryContratos": {
      "description": "Carrega a lista paginada de contratos para o atendente localizar o contrato pelo número ou pelo cliente, com os atrasados em evidência, e o total de contratos em atraso.",
      "calls": "qryContratos",
      "sets": "contratos",
      "updates": [
        "totalAtrasados"
      ]
    },
    "qryContrato": {
      "description": "Abre o contrato selecionado para conferência e para as ações de confirmar ou registrar a devolução.",
      "calls": "qryContrato",
      "sets": "contrato"
    },
    "qryClientes": {
      "description": "Pesquisa o cliente pelo nome ou documento para iniciar o novo contrato.",
      "calls": "qryClientes",
      "sets": "clientes"
    },
    "qryEquipamentos": {
      "description": "Pesquisa equipamentos pelo código ou descrição para incluí-los no novo contrato, mostrando situação e diária.",
      "calls": "qryEquipamentos",
      "sets": "equipamentos"
    },
    "cmdCriarContrato": {
      "description": "Cria o contrato em elaboração para o cliente com o período informado.",
      "calls": "cmdCriarContrato",
      "sets": "contrato",
      "updates": [
        "contratos",
        "totalAtrasados"
      ]
    },
    "cmdAdicionarItem": {
      "description": "Inclui um equipamento no contrato em elaboração.",
      "calls": "cmdAdicionarItem",
      "sets": "contrato"
    },
    "cmdConfirmarContrato": {
      "description": "Confirma o contrato em elaboração, tornando-o vigente.",
      "calls": "cmdConfirmarContrato",
      "sets": "contrato",
      "updates": [
        "contratos",
        "totalAtrasados"
      ]
    },
    "cmdRegistrarDevolucao": {
      "description": "Registra a devolução de um contrato vigente, encerrando-o e apresentando atraso e multa.",
      "calls": "cmdRegistrarDevolucao",
      "sets": "contrato",
      "updates": [
        "contratos",
        "totalAtrasados"
      ]
    },
    "verEquipamentos": {
      "description": "Novo contrato: escolha o cliente, informe o período de retirada e devolução prevista, pesquise os equipamentos pelo código ou descrição, confira a situação e o valor da diária e adicione os itens ao contrato.",
      "navigate": "equipamentos",
      "carries": {
        "contratoLocacaoId": "selectedContratoLocacao.id"
      }
    }
  },
  "journeys": [
    {
      "step": "criarContratoLocacao/localizarCliente",
      "organisms": [
        "novoContrato"
      ],
      "functions": [
        "qryClientes"
      ]
    },
    {
      "step": "criarContratoLocacao/informarPeriodo",
      "organisms": [
        "novoContrato"
      ],
      "functions": [
        "cmdCriarContrato"
      ]
    },
    {
      "step": "criarContratoLocacao/localizarEquipamentos",
      "organisms": [
        "novoContrato"
      ],
      "functions": [
        "qryEquipamentos"
      ]
    },
    {
      "step": "criarContratoLocacao/adicionarItens",
      "organisms": [
        "novoContrato",
        "conferenciaContrato"
      ],
      "functions": [
        "cmdAdicionarItem"
      ]
    },
    {
      "step": "criarContratoLocacao/confirmarContrato",
      "organisms": [
        "acoesContrato",
        "conferenciaContrato"
      ],
      "functions": [
        "cmdConfirmarContrato"
      ]
    },
    {
      "step": "registrarDevolucao/localizarContrato",
      "organisms": [
        "listaContratos"
      ],
      "functions": [
        "qryContratos"
      ]
    },
    {
      "step": "registrarDevolucao/conferirContrato",
      "organisms": [
        "conferenciaContrato"
      ],
      "functions": [
        "qryContrato"
      ]
    },
    {
      "step": "registrarDevolucao/registrarDataReal",
      "organisms": [
        "acoesContrato"
      ],
      "functions": [
        "cmdRegistrarDevolucao"
      ]
    },
    {
      "step": "registrarDevolucao/conferirMulta",
      "organisms": [
        "conferenciaContrato"
      ],
      "functions": [
        "cmdRegistrarDevolucao",
        "qryContrato"
      ]
    }
  ],
  "rules": {
    "qryContratos": [
      "multaPorAtraso"
    ],
    "qryContrato": [
      "multaPorAtraso",
      "multaAtrasoUmEMeio"
    ],
    "qryClientes": [],
    "qryEquipamentos": [
      "equipamentoIndisponivelNaoLoca"
    ],
    "cmdCriarContrato": [
      "contratoPeriodoValido",
      "numeroContratoSequencial"
    ],
    "cmdAdicionarItem": [
      "itensSomenteAntesDaConfirmacao",
      "equipamentoIndisponivelNaoLoca",
      "equipamentoEmManutencaoNaoLoca",
      "equipamentoSemPeriodoSobreposto",
      "periodoSemSobreposicao",
      "valorDiariaDoEquipamento"
    ],
    "cmdConfirmarContrato": [
      "contratoExigeItens",
      "equipamentoSemSobreposicao",
      "equipamentoSemPeriodoSobreposto",
      "contratoPeriodoValido"
    ],
    "cmdRegistrarDevolucao": [
      "devolucaoNaoAnteriorRetirada",
      "multaPorAtraso",
      "multaAtrasoUmEMeio"
    ]
  },
  "access": {
    "actors": [
      "atendente"
    ],
    "grants": [
      "atendenteContratos",
      "atendenteConsultaEquipamentos"
    ]
  },
  "fields": {
    "Cliente.details.identification.docId": [
      "novoContrato"
    ],
    "Cliente.details.identification.name": [
      "conferenciaContrato",
      "listaContratos",
      "novoContrato"
    ],
    "ContratoLocacao.clienteId": [
      "conferenciaContrato",
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
      "acoesContrato",
      "conferenciaContrato",
      "listaContratos",
      "novoContrato"
    ],
    "ContratoLocacao.details.atrasado": [
      "listaContratos"
    ],
    "ContratoLocacao.details.diasAtraso": [
      "conferenciaContrato",
      "listaContratos"
    ],
    "ContratoLocacao.details.diasContratados": [
      "conferenciaContrato"
    ],
    "ContratoLocacao.details.observacoes": [
      "novoContrato"
    ],
    "ContratoLocacao.details.observacoesDevolucao": [
      "acoesContrato"
    ],
    "ContratoLocacao.details.valorMulta": [
      "conferenciaContrato"
    ],
    "ContratoLocacao.details.valorPrevisto": [
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
      "conferenciaContrato"
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
      "conferenciaContrato"
    ],
    "ItemContrato.equipamentoId": [
      "conferenciaContrato",
      "novoContrato"
    ]
  }
} as const;
