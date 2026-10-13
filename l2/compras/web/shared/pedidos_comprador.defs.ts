/// <mls fileReference="_102047_/l2/compras/web/shared/pedidos_comprador.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaPedidos",
        "persist": true
      },
      "somenteAtrasados": {
        "type": "boolean",
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
        "effect": "filter:revisaoPedido",
        "persist": true
      },
      "termo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:abrirPedido",
        "persist": true
      },
      "fornecedorId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:abrirPedido",
        "persist": true
      },
      "pedidoCompraId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:revisaoPedido",
        "persist": true
      },
      "produtoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:abrirPedido",
        "persist": false
      },
      "produtoFornecidoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:abrirPedido",
        "persist": false
      }
    }
  },
  "forms": {
    "abrirPedidoCompra": {
      "organism": "abrirPedido",
      "submit": "abrirPedidoCompra"
    },
    "incluirItemPedido": {
      "organism": "abrirPedido",
      "submit": "incluirItemPedido"
    },
    "enviarPedido": {
      "organism": "envioPedido",
      "submit": "enviarPedido"
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
    "qryDetalharPedido": {
      "kind": "qry",
      "trigger": "qryDetalharPedido",
      "returns": [
        "pedido"
      ]
    },
    "qryBuscarFornecedores": {
      "kind": "qry",
      "trigger": "qryBuscarFornecedores",
      "returns": [
        "fornecedores"
      ]
    },
    "qryListarProdutosFornecidos": {
      "kind": "qry",
      "trigger": "qryListarProdutosFornecidos",
      "returns": [
        "produtosFornecidos"
      ]
    },
    "cmdAbrirPedidoCompra": {
      "kind": "cmd",
      "trigger": "abrirPedidoCompra",
      "returns": [
        "pedido"
      ],
      "writes": "PedidoCompra.create"
    },
    "cmdIncluirItemPedido": {
      "kind": "cmd",
      "trigger": "incluirItemPedido",
      "returns": [
        "pedido"
      ],
      "writes": "ItemPedido.create"
    },
    "cmdEnviarPedido": {
      "kind": "cmd",
      "trigger": "enviarPedido",
      "returns": [
        "pedido"
      ],
      "writes": "PedidoCompra.enviar"
    }
  },
  "states": {
    "pedidos": {
      "source": "qryListarPedidos.pedidos",
      "description": "Linha da carteira de pedidos do comprador com situação já calculada.",
      "organisms": [
        "listaPedidos"
      ]
    },
    "fornecedores": {
      "source": "qryBuscarFornecedores.fornecedores",
      "description": "Fornecedor com nome e CNPJ, exibido na lista, no pedido e na escolha do fornecedor.",
      "organisms": [
        "abrirPedido"
      ]
    },
    "produtosFornecidos": {
      "source": "qryListarProdutosFornecidos.produtosFornecidos",
      "description": "Produto fornecido ativo do fornecedor, com preço combinado para sugerir o preço do item.",
      "organisms": [
        "abrirPedido"
      ]
    },
    "cmdAbrirPedidoCompraPedido": {
      "source": "cmdAbrirPedidoCompra.pedido",
      "description": "Pedido completo com itens, totais, situação, decisão e recebimentos; usado na montagem, revisão, envio e histórico.",
      "organisms": [
        "abrirPedido"
      ]
    },
    "qryDetalharPedidoPedido": {
      "source": "qryDetalharPedido.pedido",
      "description": "Pedido completo com itens, totais, situação, decisão e recebimentos; usado na montagem, revisão, envio e histórico.",
      "organisms": [
        "envioPedido",
        "historicoPedido",
        "revisaoPedido"
      ]
    },
    "selectedPedidoCompra": {
      "source": "entry.params.pedidoCompraId",
      "description": "Pedido completo com itens, totais, situação, decisão e recebimentos; usado na montagem, revisão, envio e histórico.",
      "organisms": [
        "listaPedidos",
        "revisaoPedido"
      ]
    }
  },
  "functions": {
    "qryListarPedidos": {
      "description": "Carrega a carteira de pedidos de compra do comprador da sessão, já com a situação de cada um, para a lista principal.",
      "calls": "qryListarPedidos",
      "sets": "pedidos"
    },
    "qryDetalharPedido": {
      "description": "Abre o pedido escolhido na lista com tudo que a revisão, o envio e o histórico mostram, em uma só chamada.",
      "calls": "qryDetalharPedido",
      "sets": "qryDetalharPedidoPedido"
    },
    "qryBuscarFornecedores": {
      "description": "Busca o fornecedor para o qual o comprador vai abrir o pedido.",
      "calls": "qryBuscarFornecedores",
      "sets": "fornecedores"
    },
    "qryListarProdutosFornecidos": {
      "description": "Oferece os produtos que o fornecedor do pedido fornece, com o preço combinado que sugere o preço do item.",
      "calls": "qryListarProdutosFornecidos",
      "sets": "produtosFornecidos"
    },
    "cmdAbrirPedidoCompra": {
      "description": "Abre um novo pedido de compra em rascunho para o fornecedor escolhido.",
      "calls": "cmdAbrirPedidoCompra",
      "updates": [
        "pedidos"
      ]
    },
    "cmdIncluirItemPedido": {
      "description": "Inclui um item no pedido em montagem e devolve o pedido com o valor do item e o total recalculados.",
      "calls": "cmdIncluirItemPedido",
      "sets": "cmdAbrirPedidoCompraPedido",
      "updates": [
        "pedidos"
      ]
    },
    "cmdEnviarPedido": {
      "description": "Envia o pedido em rascunho informando a entrega prevista; o pedido segue ao fornecedor ou aguarda aprovação conforme o valor.",
      "calls": "cmdEnviarPedido",
      "sets": "qryDetalharPedidoPedido",
      "updates": [
        "pedidos"
      ]
    }
  },
  "journeys": [
    {
      "step": "abrirEnviarPedido/selecionarFornecedor",
      "organisms": [
        "abrirPedido"
      ],
      "functions": [
        "qryBuscarFornecedores"
      ]
    },
    {
      "step": "abrirEnviarPedido/abrirPedido",
      "organisms": [
        "abrirPedido"
      ],
      "functions": [
        "cmdAbrirPedidoCompra"
      ]
    },
    {
      "step": "abrirEnviarPedido/incluirItem",
      "organisms": [
        "abrirPedido"
      ],
      "functions": [
        "qryListarProdutosFornecidos",
        "cmdIncluirItemPedido"
      ]
    },
    {
      "step": "abrirEnviarPedido/revisarPedido",
      "organisms": [
        "listaPedidos",
        "revisaoPedido"
      ],
      "functions": [
        "qryListarPedidos",
        "qryDetalharPedido"
      ]
    },
    {
      "step": "abrirEnviarPedido/enviarPedido",
      "organisms": [
        "envioPedido",
        "historicoPedido"
      ],
      "functions": [
        "cmdEnviarPedido"
      ]
    }
  ],
  "rules": {
    "qryListarPedidos": [
      "valorTotalPedidoCalculado",
      "valorLimiteAprovacao"
    ],
    "qryDetalharPedido": [
      "valorTotalPedidoCalculado",
      "valorLimiteAprovacao"
    ],
    "qryBuscarFornecedores": [
      "fornecedorInativoSemNovoPedido"
    ],
    "qryListarProdutosFornecidos": [
      "itemPedidoProdutoDoFornecedor",
      "inactiveProductCannotBeOrdered",
      "precoCombinadoSugerePreco"
    ],
    "cmdAbrirPedidoCompra": [
      "compradorInativoNaoAbrePedido",
      "fornecedorInativoSemNovoPedido",
      "numeroPedidoUnico"
    ],
    "cmdIncluirItemPedido": [
      "itemPedidoSomenteEmRascunho",
      "itemPedidoQuantidadePositiva",
      "itemPedidoProdutoDoFornecedor",
      "inactiveProductCannotBeOrdered",
      "precoSugeridoNoItemPedido",
      "valorTotalPedidoCalculado"
    ],
    "cmdEnviarPedido": [
      "pedidoExigeItens",
      "valorLimiteAprovacao",
      "fornecedorInativoSemNovoPedido",
      "edicaoSomenteRascunho"
    ]
  },
  "access": {
    "actors": [
      "comprador"
    ],
    "grants": [
      "compradorCadastroFornecedores",
      "compradorProdutosFornecidos",
      "compradorPedidos"
    ]
  },
  "fields": {
    "Fornecedor.details.identification.docId": [
      "abrirPedido"
    ],
    "Fornecedor.details.identification.name": [
      "abrirPedido",
      "listaPedidos",
      "revisaoPedido"
    ],
    "ItemPedido.details.observacao": [
      "abrirPedido"
    ],
    "ItemPedido.details.precoUnitario": [
      "abrirPedido",
      "revisaoPedido"
    ],
    "ItemPedido.details.quantidade": [
      "abrirPedido",
      "revisaoPedido"
    ],
    "ItemPedido.details.quantidadePendente": [
      "revisaoPedido"
    ],
    "ItemPedido.details.quantidadeRecebida": [
      "revisaoPedido"
    ],
    "ItemPedido.details.recebidoTotalmente": [
      "revisaoPedido"
    ],
    "ItemPedido.details.valorTotalItem": [
      "abrirPedido",
      "revisaoPedido"
    ],
    "ItemPedido.numeroItem": [
      "abrirPedido",
      "revisaoPedido"
    ],
    "ItemPedido.produtoFornecidoId": [
      "abrirPedido"
    ],
    "ItemPedido.produtoId": [
      "abrirPedido"
    ],
    "PedidoCompra.dataEmissao": [
      "listaPedidos"
    ],
    "PedidoCompra.dataPrevistaEntrega": [
      "envioPedido"
    ],
    "PedidoCompra.details.aguardandoAprovacao": [
      "historicoPedido",
      "listaPedidos"
    ],
    "PedidoCompra.details.atrasado": [
      "listaPedidos"
    ],
    "PedidoCompra.details.dataEnvio": [
      "historicoPedido",
      "listaPedidos"
    ],
    "PedidoCompra.details.decisao.decididoEm": [
      "historicoPedido"
    ],
    "PedidoCompra.details.emAberto": [
      "listaPedidos"
    ],
    "PedidoCompra.details.liberadoAoFornecedor": [
      "historicoPedido",
      "listaPedidos"
    ],
    "PedidoCompra.details.quantidadePendente": [
      "revisaoPedido"
    ],
    "PedidoCompra.details.valorTotal": [
      "abrirPedido",
      "envioPedido",
      "listaPedidos",
      "revisaoPedido"
    ],
    "PedidoCompra.fornecedorId": [
      "abrirPedido",
      "listaPedidos"
    ],
    "PedidoCompra.numero": [
      "abrirPedido",
      "envioPedido",
      "listaPedidos",
      "revisaoPedido"
    ],
    "PedidoCompra.status": [
      "envioPedido",
      "historicoPedido",
      "listaPedidos"
    ],
    "Produto.details.identification.name": [
      "abrirPedido",
      "revisaoPedido"
    ],
    "Produto.details.product.unitOfMeasure": [
      "abrirPedido"
    ],
    "ProdutoFornecido.codigo": [
      "abrirPedido"
    ],
    "ProdutoFornecido.details.precoCombinado": [
      "abrirPedido"
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
