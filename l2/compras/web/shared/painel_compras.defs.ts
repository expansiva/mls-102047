/// <mls fileReference="_102047_/l2/compras/web/shared/painel_compras.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "mesReferencia": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:painelMes",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:pedidosAtrasados",
        "persist": true
      }
    }
  },
  "forms": {
    "rejeitarPedido": {
      "organism": "aprovacoesPendentes",
      "submit": "rejeitarPedido"
    }
  },
  "requests": {
    "qryPainelCompras": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "painelMes",
        "resumoSituacao",
        "aprovacoesPendentes"
      ]
    },
    "qryPedidosAtrasados": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "pedidosAtrasados"
      ]
    },
    "cmdAprovarPedido": {
      "kind": "cmd",
      "trigger": "aprovarPedido",
      "returns": [
        "pedido",
        "resumoSituacao",
        "painelMes"
      ],
      "writes": "PedidoCompra.aprovar"
    },
    "cmdRejeitarPedido": {
      "kind": "cmd",
      "trigger": "rejeitarPedido",
      "returns": [
        "pedido",
        "resumoSituacao",
        "painelMes"
      ],
      "writes": "PedidoCompra.rejeitar"
    }
  },
  "states": {
    "painelMes": {
      "source": "qryPainelCompras.painelMes",
      "description": "Indicadores do mês: linha que totaliza a organização (fornecedorId vazio) e o ranking por fornecedor.",
      "organisms": [
        "painelMes"
      ]
    },
    "resumoSituacao": {
      "source": "qryPainelCompras.resumoSituacao",
      "description": "Contagens dos pedidos por ponto do ciclo, já calculadas no servidor.",
      "organisms": [
        "resumoSituacao"
      ]
    },
    "aprovacoesPendentes": {
      "source": "qryPainelCompras.aprovacoesPendentes",
      "description": "Pedido acima do valor limite aguardando decisão do gerente.",
      "organisms": [
        "aprovacoesPendentes"
      ]
    },
    "pedidosAtrasados": {
      "source": "qryPedidosAtrasados.pedidosAtrasados",
      "description": "Pedido em aberto com entrega prevista vencida.",
      "organisms": [
        "pedidosAtrasados"
      ]
    }
  },
  "functions": {
    "qryPainelCompras": {
      "description": "Carrega de uma vez o que o painel do gerente mostra ao abrir: indicadores do mês, resumo da situação dos pedidos e a caixa de pedidos aguardando aprovação.",
      "calls": "qryPainelCompras",
      "sets": "painelMes",
      "updates": [
        "resumoSituacao",
        "aprovacoesPendentes"
      ]
    },
    "qryPedidosAtrasados": {
      "description": "Lista paginada dos pedidos atrasados para o gerente acompanhar e abrir. (pedidosAtrasados.items: append)",
      "calls": "qryPedidosAtrasados",
      "sets": "pedidosAtrasados"
    },
    "cmdAprovarPedido": {
      "description": "Aprova um pedido acima do valor limite, liberando-o ao fornecedor. (aprovacoesPendentes: remove)",
      "calls": "cmdAprovarPedido",
      "sets": "resumoSituacao",
      "updates": [
        "painelMes",
        "aprovacoesPendentes"
      ]
    },
    "cmdRejeitarPedido": {
      "description": "Rejeita um pedido acima do valor limite registrando o motivo. (aprovacoesPendentes: remove)",
      "calls": "cmdRejeitarPedido",
      "sets": "resumoSituacao",
      "updates": [
        "painelMes",
        "aprovacoesPendentes",
        "pedidosAtrasados"
      ]
    },
    "analisarPedido": {
      "description": "Pedidos acima do valor limite esperando minha decisão, com número, fornecedor, comprador, data de envio e valor total; aprovo para liberar ao fornecedor ou rejeito informando o motivo.",
      "navigate": "pedidos_aprovacao"
    },
    "abrirPedidoAtrasado": {
      "description": "Pedidos atrasados com número, fornecedor, entrega prevista, valor total e quantidade pendente, para abrir e ver itens e recebimentos.",
      "navigate": "pedidos_aprovacao"
    }
  },
  "journeys": [
    {
      "step": "acompanharPainel/abrirPainel",
      "organisms": [
        "painelMes",
        "resumoSituacao"
      ],
      "functions": [
        "qryPainelCompras"
      ]
    },
    {
      "step": "acompanharPainel/listarAtrasados",
      "organisms": [
        "pedidosAtrasados"
      ],
      "functions": [
        "qryPedidosAtrasados"
      ]
    },
    {
      "step": "acompanharPainel/detalharPedido",
      "organisms": [
        "pedidosAtrasados"
      ],
      "functions": [],
      "continuesIn": "pedidos_aprovacao"
    },
    {
      "step": "aprovarPedido/localizarPendentes",
      "organisms": [
        "aprovacoesPendentes"
      ],
      "functions": [
        "qryPainelCompras"
      ]
    },
    {
      "step": "aprovarPedido/analisarPedido",
      "organisms": [
        "aprovacoesPendentes"
      ],
      "functions": [],
      "continuesIn": "pedidos_aprovacao"
    },
    {
      "step": "aprovarPedido/aprovar",
      "organisms": [
        "aprovacoesPendentes"
      ],
      "functions": [
        "cmdAprovarPedido"
      ]
    },
    {
      "step": "aprovarPedido/rejeitar",
      "organisms": [
        "aprovacoesPendentes"
      ],
      "functions": [
        "cmdRejeitarPedido"
      ]
    }
  ],
  "rules": {
    "qryPainelCompras": [
      "totalCompradoConsideraPedidosAprovados",
      "pedidoAtrasadoPrevisaoVencida",
      "pedidoEmAbertoAteRecebimentoTotal",
      "valorLimiteAprovacao"
    ],
    "qryPedidosAtrasados": [
      "pedidoAtrasadoPrevisaoVencida",
      "pedidoEmAbertoAteRecebimentoTotal"
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
      "gerenteCadastros",
      "gerentePainel"
    ]
  },
  "fields": {
    "Comprador.details.identification.name": [
      "aprovacoesPendentes"
    ],
    "Fornecedor.details.identification.name": [
      "aprovacoesPendentes",
      "painelMes",
      "pedidosAtrasados"
    ],
    "PainelCompras.details.pedidosAtrasados": [
      "painelMes"
    ],
    "PainelCompras.details.pedidosEmAberto": [
      "painelMes"
    ],
    "PainelCompras.details.quantidadePedidos": [
      "painelMes"
    ],
    "PainelCompras.details.totalComprado": [
      "painelMes"
    ],
    "PainelCompras.details.totalRecebido": [
      "painelMes"
    ],
    "PainelCompras.fornecedorId": [
      "painelMes"
    ],
    "PainelCompras.mesReferencia": [
      "painelMes"
    ],
    "PedidoCompra.compradorId": [
      "aprovacoesPendentes"
    ],
    "PedidoCompra.dataEmissao": [
      "pedidosAtrasados"
    ],
    "PedidoCompra.dataPrevistaEntrega": [
      "pedidosAtrasados"
    ],
    "PedidoCompra.details.aguardandoAprovacao": [
      "aprovacoesPendentes",
      "resumoSituacao"
    ],
    "PedidoCompra.details.atrasado": [
      "pedidosAtrasados"
    ],
    "PedidoCompra.details.dataEnvio": [
      "aprovacoesPendentes"
    ],
    "PedidoCompra.details.decisao.motivoRejeicao": [
      "aprovacoesPendentes"
    ],
    "PedidoCompra.details.emAberto": [
      "resumoSituacao"
    ],
    "PedidoCompra.details.liberadoAoFornecedor": [
      "resumoSituacao"
    ],
    "PedidoCompra.details.quantidadePendente": [
      "pedidosAtrasados",
      "resumoSituacao"
    ],
    "PedidoCompra.details.valorTotal": [
      "aprovacoesPendentes",
      "pedidosAtrasados"
    ],
    "PedidoCompra.fornecedorId": [
      "aprovacoesPendentes",
      "pedidosAtrasados"
    ],
    "PedidoCompra.numero": [
      "aprovacoesPendentes",
      "pedidosAtrasados"
    ],
    "PedidoCompra.status": [
      "aprovacoesPendentes"
    ]
  }
} as const;
