/// <mls fileReference="_102047_/l2/compras/web/shared/recebimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:pedidosAguardandoChegada",
        "persist": true
      },
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:pedidosAguardandoChegada",
        "persist": true
      },
      "pedidoCompraId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:conferenciaItens",
        "persist": true
      },
      "itemPedidoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:registroRecebimento",
        "persist": false
      },
      "produtoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:registroRecebimento",
        "persist": false
      }
    }
  },
  "forms": {
    "registrarRecebimento": {
      "organism": "registroRecebimento",
      "submit": "registrarRecebimento"
    }
  },
  "requests": {
    "qryRecebimentosInicio": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "fila",
        "totalEmAberto",
        "totalAtrasados",
        "pendencias"
      ]
    },
    "qryBuscarPedidosAguardando": {
      "kind": "qry",
      "trigger": "qryBuscarPedidosAguardando",
      "returns": [
        "fila"
      ]
    },
    "qryPedidoConferencia": {
      "kind": "qry",
      "trigger": "qryPedidoConferencia",
      "returns": [
        "pedido"
      ]
    },
    "cmdRegistrarRecebimento": {
      "kind": "cmd",
      "trigger": "registrarRecebimento",
      "returns": [
        "pedido"
      ],
      "writes": "Recebimento.create"
    }
  },
  "states": {
    "fila": {
      "source": "qryRecebimentosInicio.fila",
      "description": "Linha da fila de pedidos liberados aguardando chegada.",
      "organisms": [
        "pedidosAguardandoChegada"
      ]
    },
    "totalEmAberto": {
      "source": "qryRecebimentosInicio.totalEmAberto",
      "description": "fila paginada ({ items, page, pageSize, hasMore }), os totais já calculados e a lista curta de pendências, para a página abrir sem outra chamada.",
      "organisms": [
        "situacaoPendencias"
      ]
    },
    "totalAtrasados": {
      "source": "qryRecebimentosInicio.totalAtrasados",
      "description": "fila paginada ({ items, page, pageSize, hasMore }), os totais já calculados e a lista curta de pendências, para a página abrir sem outra chamada.",
      "organisms": [
        "situacaoPendencias"
      ]
    },
    "pendencias": {
      "source": "qryRecebimentosInicio.pendencias",
      "description": "Pedido em aberto ou atrasado com sua quantidade pendente, para priorizar a conferência.",
      "organisms": [
        "situacaoPendencias"
      ]
    },
    "pedido": {
      "source": "qryPedidoConferencia.pedido",
      "description": "Pedido escolhido com itens para conferência e histórico de recebimentos e entradas.",
      "organisms": [
        "conferenciaItens",
        "historicoRecebimentos",
        "registroRecebimento"
      ]
    },
    "selectedPedidoCompra": {
      "source": "entry.params.pedidoCompraId",
      "description": "Pedido escolhido com itens para conferência e histórico de recebimentos e entradas.",
      "organisms": [
        "conferenciaItens",
        "pedidosAguardandoChegada",
        "registroRecebimento",
        "situacaoPendencias"
      ]
    }
  },
  "functions": {
    "qryRecebimentosInicio": {
      "description": "Carrega na abertura da página a primeira página da fila de pedidos aguardando chegada e o resumo de pedidos em aberto e atrasados.",
      "calls": "qryRecebimentosInicio",
      "sets": "fila",
      "updates": [
        "totalEmAberto",
        "totalAtrasados",
        "pendencias"
      ]
    },
    "qryBuscarPedidosAguardando": {
      "description": "Busca na fila de chegada o pedido pelo número ou pelo fornecedor e pagina a fila.",
      "calls": "qryBuscarPedidosAguardando",
      "sets": "fila"
    },
    "qryPedidoConferencia": {
      "description": "Abre o pedido escolhido com seus itens para conferência e registro e o histórico de recebimentos com as entradas no estoque.",
      "calls": "qryPedidoConferencia",
      "sets": "pedido"
    },
    "cmdRegistrarRecebimento": {
      "description": "Registra a chegada total ou parcial do pedido e dá entrada no estoque dos produtos recebidos.",
      "calls": "cmdRegistrarRecebimento",
      "sets": "pedido",
      "updates": [
        "fila",
        "totalEmAberto",
        "totalAtrasados",
        "pendencias"
      ]
    }
  },
  "journeys": [
    {
      "step": "registrarRecebimento/localizarPedido",
      "organisms": [
        "pedidosAguardandoChegada",
        "situacaoPendencias"
      ],
      "functions": [
        "qryRecebimentosInicio",
        "qryBuscarPedidosAguardando"
      ]
    },
    {
      "step": "registrarRecebimento/conferirItens",
      "organisms": [
        "conferenciaItens"
      ],
      "functions": [
        "qryPedidoConferencia"
      ]
    },
    {
      "step": "registrarRecebimento/registrarRecebimento",
      "organisms": [
        "registroRecebimento"
      ],
      "functions": [
        "cmdRegistrarRecebimento"
      ]
    },
    {
      "step": "registrarRecebimento/verSituacao",
      "organisms": [
        "historicoRecebimentos",
        "conferenciaItens"
      ],
      "functions": [
        "qryPedidoConferencia",
        "cmdRegistrarRecebimento"
      ]
    }
  ],
  "rules": {
    "qryRecebimentosInicio": [
      "recebimentoSomenteLiberado",
      "recebimentoSomentePedidoAprovado"
    ],
    "qryBuscarPedidosAguardando": [
      "recebimentoSomenteLiberado",
      "recebimentoSomentePedidoAprovado"
    ],
    "qryPedidoConferencia": [
      "entradaPublicadaAoEstoque"
    ],
    "cmdRegistrarRecebimento": [
      "recebimentoSomenteLiberado",
      "recebimentoSomentePedidoAprovado",
      "quantidadeRecebidaNaoExcedePendente",
      "quantidadeRecebidaNaoExcedePedido",
      "quantidadeEntradaPositiva",
      "recebimentoGeraEntradaEstoque",
      "entradaGeradaPeloRecebimento",
      "entradaProdutoDoItemPedido",
      "entradaUnicaPorItemRecebimento",
      "recebimentoAtualizaSituacaoPedido",
      "numeroRecebimentoUnico"
    ]
  },
  "access": {
    "actors": [
      "almoxarife"
    ],
    "grants": [
      "almoxarifePedidos",
      "almoxarifeRecebimentos",
      "almoxarifeConsultaCadastros"
    ]
  },
  "fields": {
    "EntradaEstoque.dataEntrada": [
      "historicoRecebimentos"
    ],
    "EntradaEstoque.details.publicada": [
      "historicoRecebimentos"
    ],
    "EntradaEstoque.details.quantidade": [
      "historicoRecebimentos"
    ],
    "EntradaEstoque.details.valorTotal": [
      "historicoRecebimentos"
    ],
    "EntradaEstoque.numero": [
      "historicoRecebimentos"
    ],
    "Fornecedor.details.company.legalName": [
      "pedidosAguardandoChegada"
    ],
    "Fornecedor.details.identification.name": [
      "conferenciaItens",
      "pedidosAguardandoChegada",
      "situacaoPendencias"
    ],
    "ItemPedido.details.quantidade": [
      "conferenciaItens"
    ],
    "ItemPedido.details.quantidadePendente": [
      "conferenciaItens",
      "registroRecebimento"
    ],
    "ItemPedido.details.quantidadeRecebida": [
      "conferenciaItens"
    ],
    "ItemPedido.details.recebidoTotalmente": [
      "conferenciaItens"
    ],
    "ItemPedido.numeroItem": [
      "conferenciaItens",
      "registroRecebimento"
    ],
    "PedidoCompra.dataEmissao": [
      "pedidosAguardandoChegada"
    ],
    "PedidoCompra.dataPrevistaEntrega": [
      "pedidosAguardandoChegada",
      "situacaoPendencias"
    ],
    "PedidoCompra.details.atrasado": [
      "situacaoPendencias"
    ],
    "PedidoCompra.details.dataEnvio": [
      "pedidosAguardandoChegada"
    ],
    "PedidoCompra.details.emAberto": [
      "situacaoPendencias"
    ],
    "PedidoCompra.details.liberadoAoFornecedor": [
      "pedidosAguardandoChegada"
    ],
    "PedidoCompra.details.quantidadePendente": [
      "pedidosAguardandoChegada",
      "situacaoPendencias"
    ],
    "PedidoCompra.fornecedorId": [
      "pedidosAguardandoChegada"
    ],
    "PedidoCompra.numero": [
      "conferenciaItens",
      "pedidosAguardandoChegada",
      "registroRecebimento",
      "situacaoPendencias"
    ],
    "PedidoCompra.status": [
      "conferenciaItens",
      "historicoRecebimentos",
      "pedidosAguardandoChegada"
    ],
    "Produto.details.identification.name": [
      "conferenciaItens",
      "historicoRecebimentos",
      "registroRecebimento"
    ],
    "Produto.details.product.sku": [
      "conferenciaItens"
    ],
    "Produto.details.product.unitOfMeasure": [
      "conferenciaItens",
      "registroRecebimento"
    ],
    "Recebimento.dataRecebimento": [
      "historicoRecebimentos",
      "registroRecebimento"
    ],
    "Recebimento.details.itens.itemPedidoId": [
      "registroRecebimento"
    ],
    "Recebimento.details.itens.observacao": [
      "registroRecebimento"
    ],
    "Recebimento.details.itens.produtoId": [
      "registroRecebimento"
    ],
    "Recebimento.details.itens.quantidadeRecebida": [
      "registroRecebimento"
    ],
    "Recebimento.details.observacoes": [
      "registroRecebimento"
    ],
    "Recebimento.details.quantidadeTotalRecebida": [
      "historicoRecebimentos"
    ],
    "Recebimento.details.tipoRecebimento": [
      "historicoRecebimentos"
    ],
    "Recebimento.numero": [
      "historicoRecebimentos"
    ],
    "Recebimento.pedidoCompraId": [
      "registroRecebimento"
    ],
    "Recebimento.registradoEm": [
      "historicoRecebimentos"
    ]
  }
} as const;
