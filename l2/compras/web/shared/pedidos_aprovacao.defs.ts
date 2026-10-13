/// <mls fileReference="_102047_/l2/compras/web/shared/pedidos_aprovacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "filtro": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaPedidos",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaPedidos",
        "persist": true
      },
      "pedidoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:detalhePedido",
        "persist": true
      },
      "pedidoCompraId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalhePedido",
        "persist": true
      }
    }
  },
  "forms": {
    "rejeitarPedido": {
      "organism": "decisaoPedido",
      "submit": "rejeitarPedido"
    }
  },
  "requests": {
    "qryListarPedidos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "pedidos"
      ]
    },
    "qryObterPedido": {
      "kind": "qry",
      "trigger": "qryObterPedido",
      "returns": [
        "pedido",
        "historico"
      ]
    },
    "cmdAprovarPedido": {
      "kind": "cmd",
      "trigger": "aprovarPedido",
      "returns": [
        "pedido",
        "resumo"
      ],
      "writes": "PedidoCompra.aprovar"
    },
    "cmdRejeitarPedido": {
      "kind": "cmd",
      "trigger": "rejeitarPedido",
      "returns": [
        "pedido",
        "resumo"
      ],
      "writes": "PedidoCompra.rejeitar"
    }
  },
  "states": {
    "pedidos": {
      "source": "qryListarPedidos.pedidos",
      "description": "Linha da lista de pedidos.",
      "organisms": [
        "listaPedidos"
      ]
    },
    "pedido": {
      "source": "qryObterPedido.pedido",
      "description": "Pedido com fornecedor, comprador, itens e totais, usado na análise, na decisão e no cabeçalho do histórico.",
      "organisms": [
        "decisaoPedido",
        "detalhePedido",
        "historicoPedido"
      ]
    },
    "historico": {
      "source": "qryObterPedido.historico",
      "description": "Recebimentos e entradas no estoque do pedido, em ordem cronológica.",
      "organisms": [
        "historicoPedido"
      ]
    },
    "selectedPedidoCompra": {
      "source": "entry.params.pedidoCompraId",
      "description": "Pedido com fornecedor, comprador, itens e totais, usado na análise, na decisão e no cabeçalho do histórico.",
      "organisms": [
        "detalhePedido",
        "listaPedidos"
      ]
    }
  },
  "functions": {
    "qryListarPedidos": {
      "description": "Carrega a lista paginada dos pedidos de compra da organização, já filtrada pelo filtro rápido escolhido pelo gerente.",
      "calls": "qryListarPedidos",
      "sets": "pedidos"
    },
    "qryObterPedido": {
      "description": "Abre o pedido escolhido na lista com tudo o que a análise, a decisão e o histórico mostram, numa só chamada.",
      "calls": "qryObterPedido",
      "sets": "pedido",
      "updates": [
        "historico"
      ]
    },
    "cmdAprovarPedido": {
      "description": "Aprova o pedido que aguarda decisão do gerente, liberando-o ao fornecedor. (pedidos.items: upsert)",
      "calls": "cmdAprovarPedido",
      "sets": "pedido",
      "updates": [
        "pedidos"
      ]
    },
    "cmdRejeitarPedido": {
      "description": "Rejeita o pedido que aguarda decisão do gerente, encerrando o processo com o motivo informado. (pedidos.items: upsert)",
      "calls": "cmdRejeitarPedido",
      "sets": "pedido",
      "updates": [
        "pedidos"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharPainel/abrirPainel",
      "organisms": [],
      "functions": [],
      "continuesIn": "painel_compras"
    },
    {
      "step": "acompanharPainel/listarAtrasados",
      "organisms": [
        "listaPedidos"
      ],
      "functions": [
        "qryListarPedidos"
      ]
    },
    {
      "step": "acompanharPainel/detalharPedido",
      "organisms": [
        "detalhePedido",
        "historicoPedido"
      ],
      "functions": [
        "qryObterPedido"
      ]
    },
    {
      "step": "aprovarPedido/localizarPendentes",
      "organisms": [
        "listaPedidos"
      ],
      "functions": [
        "qryListarPedidos"
      ]
    },
    {
      "step": "aprovarPedido/analisarPedido",
      "organisms": [
        "detalhePedido",
        "decisaoPedido",
        "historicoPedido"
      ],
      "functions": [
        "qryObterPedido"
      ]
    },
    {
      "step": "aprovarPedido/aprovar",
      "organisms": [
        "decisaoPedido"
      ],
      "functions": [
        "cmdAprovarPedido"
      ]
    },
    {
      "step": "aprovarPedido/rejeitar",
      "organisms": [
        "decisaoPedido"
      ],
      "functions": [
        "cmdRejeitarPedido"
      ]
    }
  ],
  "rules": {
    "qryListarPedidos": [
      "valorLimiteAprovacao",
      "pedidoAtrasadoPrevisaoVencida",
      "pedidoEmAbertoAteRecebimentoTotal"
    ],
    "qryObterPedido": [
      "valorTotalPedidoCalculado",
      "quantidadeRecebidaNaoExcedePedido",
      "entradaPublicadaAoEstoque"
    ],
    "cmdAprovarPedido": [
      "valorLimiteAprovacao"
    ],
    "cmdRejeitarPedido": [
      "valorLimiteAprovacao",
      "rejeicaoExigeMotivo"
    ]
  },
  "access": {
    "actors": [
      "gerenteCompras"
    ],
    "grants": [
      "gerenteAprovacaoPedidos",
      "gerenteCadastros"
    ]
  },
  "fields": {
    "Comprador.details.identification.name": [
      "detalhePedido",
      "listaPedidos"
    ],
    "EntradaEstoque.dataEntrada": [
      "historicoPedido"
    ],
    "EntradaEstoque.details.publicada": [
      "historicoPedido"
    ],
    "EntradaEstoque.details.quantidade": [
      "historicoPedido"
    ],
    "EntradaEstoque.details.valorTotal": [
      "historicoPedido"
    ],
    "EntradaEstoque.numero": [
      "historicoPedido"
    ],
    "Fornecedor.details.company.legalName": [
      "detalhePedido"
    ],
    "Fornecedor.details.identification.docId": [
      "detalhePedido"
    ],
    "Fornecedor.details.identification.name": [
      "detalhePedido",
      "listaPedidos"
    ],
    "ItemPedido.details.precoUnitario": [
      "detalhePedido"
    ],
    "ItemPedido.details.quantidade": [
      "detalhePedido"
    ],
    "ItemPedido.details.quantidadePendente": [
      "detalhePedido"
    ],
    "ItemPedido.details.quantidadeRecebida": [
      "detalhePedido"
    ],
    "ItemPedido.details.recebidoTotalmente": [
      "detalhePedido"
    ],
    "ItemPedido.details.valorTotalItem": [
      "detalhePedido"
    ],
    "ItemPedido.numeroItem": [
      "detalhePedido"
    ],
    "ItemPedido.produtoId": [
      "detalhePedido"
    ],
    "PedidoCompra.compradorId": [
      "listaPedidos"
    ],
    "PedidoCompra.dataEmissao": [
      "detalhePedido",
      "historicoPedido",
      "listaPedidos"
    ],
    "PedidoCompra.dataPrevistaEntrega": [
      "detalhePedido",
      "listaPedidos"
    ],
    "PedidoCompra.details.aguardandoAprovacao": [
      "decisaoPedido",
      "listaPedidos"
    ],
    "PedidoCompra.details.atrasado": [
      "listaPedidos"
    ],
    "PedidoCompra.details.condicaoPagamento": [
      "detalhePedido"
    ],
    "PedidoCompra.details.dataEnvio": [
      "historicoPedido"
    ],
    "PedidoCompra.details.decisao.decididoEm": [
      "historicoPedido"
    ],
    "PedidoCompra.details.decisao.motivoRejeicao": [
      "decisaoPedido",
      "historicoPedido"
    ],
    "PedidoCompra.details.emAberto": [
      "listaPedidos"
    ],
    "PedidoCompra.details.liberadoAoFornecedor": [
      "listaPedidos"
    ],
    "PedidoCompra.details.observacoes": [
      "detalhePedido"
    ],
    "PedidoCompra.details.quantidadePendente": [
      "detalhePedido",
      "listaPedidos"
    ],
    "PedidoCompra.details.valorTotal": [
      "decisaoPedido",
      "detalhePedido",
      "listaPedidos"
    ],
    "PedidoCompra.fornecedorId": [
      "listaPedidos"
    ],
    "PedidoCompra.numero": [
      "decisaoPedido",
      "detalhePedido",
      "listaPedidos"
    ],
    "PedidoCompra.status": [
      "decisaoPedido",
      "detalhePedido",
      "listaPedidos"
    ],
    "Produto.details.identification.name": [
      "detalhePedido"
    ],
    "Produto.details.product.unitOfMeasure": [
      "detalhePedido"
    ],
    "Recebimento.dataRecebimento": [
      "historicoPedido"
    ],
    "Recebimento.details.quantidadeTotalRecebida": [
      "historicoPedido"
    ],
    "Recebimento.details.tipoRecebimento": [
      "historicoPedido"
    ],
    "Recebimento.numero": [
      "historicoPedido"
    ],
    "Recebimento.registradoEm": [
      "historicoPedido"
    ]
  }
} as const;
