/// <mls fileReference="_102047_/l2/compras/web/shared/inicio_comprador.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "forms": {},
  "requests": {
    "qryInicioComprador": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "resumo",
        "rascunhos",
        "comprador"
      ]
    }
  },
  "states": {
    "resumo": {
      "source": "qryInicioComprador.resumo",
      "description": "Indicadores dos pedidos do comprador da sessão, já calculados no servidor.",
      "organisms": [
        "resumoMeusPedidos"
      ]
    },
    "rascunhos": {
      "source": "qryInicioComprador.rascunhos",
      "description": "Linha de um pedido em rascunho do comprador, com fornecedor e valor até agora.",
      "organisms": [
        "rascunhosAEnviar"
      ]
    },
    "comprador": {
      "source": "qryInicioComprador.comprador",
      "description": "Cadastro do comprador da sessão, com indicação de aptidão para abrir pedidos.",
      "organisms": [
        "cadastroComprador"
      ]
    }
  },
  "functions": {
    "qryInicioComprador": {
      "description": "Carrega em uma única chamada tudo o que a página inicial do comprador mostra ao abrir: os indicadores dos seus pedidos, os rascunhos que ainda precisa completar e enviar, e o seu cadastro de comprador.",
      "calls": "qryInicioComprador",
      "sets": "resumo",
      "updates": [
        "rascunhos",
        "comprador"
      ]
    },
    "verMeusPedidos": {
      "description": "Quantos pedidos meus estão em aberto, aguardando aprovação, liberados ao fornecedor e atrasados, com o valor total e a quantidade ainda pendente de chegada; daqui sigo para a lista completa dos meus pedidos.",
      "navigate": "pedidos_comprador"
    },
    "completarPedido": {
      "description": "Pedidos em rascunho que abri, com número, fornecedor, data de abertura e valor até agora; abro cada um para incluir itens, revisar e enviar, ou começo um novo pedido.",
      "navigate": "pedidos_comprador"
    },
    "abrirNovoPedido": {
      "description": "Pedidos em rascunho que abri, com número, fornecedor, data de abertura e valor até agora; abro cada um para incluir itens, revisar e enviar, ou começo um novo pedido.",
      "navigate": "pedidos_comprador"
    }
  },
  "journeys": [
    {
      "step": "abrirEnviarPedido/selecionarFornecedor",
      "organisms": [],
      "functions": [],
      "continuesIn": "pedidos_comprador"
    },
    {
      "step": "abrirEnviarPedido/abrirPedido",
      "organisms": [
        "rascunhosAEnviar",
        "cadastroComprador"
      ],
      "functions": [
        "qryInicioComprador"
      ],
      "continuesIn": "pedidos_comprador"
    },
    {
      "step": "abrirEnviarPedido/incluirItem",
      "organisms": [
        "rascunhosAEnviar"
      ],
      "functions": [
        "qryInicioComprador"
      ],
      "continuesIn": "pedidos_comprador"
    },
    {
      "step": "abrirEnviarPedido/revisarPedido",
      "organisms": [
        "rascunhosAEnviar"
      ],
      "functions": [
        "qryInicioComprador"
      ],
      "continuesIn": "pedidos_comprador"
    },
    {
      "step": "abrirEnviarPedido/enviarPedido",
      "organisms": [
        "resumoMeusPedidos"
      ],
      "functions": [
        "qryInicioComprador"
      ],
      "continuesIn": "pedidos_comprador"
    }
  ],
  "rules": {
    "qryInicioComprador": [
      "valorLimiteAprovacao",
      "valorTotalPedidoCalculado",
      "compradorInativoNaoAbrePedido"
    ]
  },
  "access": {
    "actors": [
      "comprador"
    ],
    "grants": [
      "compradorCadastroFornecedores",
      "compradorPedidos",
      "compradorProprioCadastro"
    ]
  },
  "fields": {
    "Comprador.details.base.contacts": [
      "cadastroComprador"
    ],
    "Comprador.details.identification.docId": [
      "cadastroComprador"
    ],
    "Comprador.details.identification.docType": [
      "cadastroComprador"
    ],
    "Comprador.details.identification.name": [
      "cadastroComprador"
    ],
    "Comprador.details.identification.status": [
      "cadastroComprador"
    ],
    "Fornecedor.details.identification.name": [
      "rascunhosAEnviar"
    ],
    "ItemPedido.pedidoCompraId": [
      "rascunhosAEnviar"
    ],
    "PedidoCompra.dataEmissao": [
      "rascunhosAEnviar"
    ],
    "PedidoCompra.details.aguardandoAprovacao": [
      "resumoMeusPedidos"
    ],
    "PedidoCompra.details.atrasado": [
      "resumoMeusPedidos"
    ],
    "PedidoCompra.details.emAberto": [
      "resumoMeusPedidos"
    ],
    "PedidoCompra.details.liberadoAoFornecedor": [
      "resumoMeusPedidos"
    ],
    "PedidoCompra.details.quantidadePendente": [
      "resumoMeusPedidos"
    ],
    "PedidoCompra.details.valorTotal": [
      "rascunhosAEnviar",
      "resumoMeusPedidos"
    ],
    "PedidoCompra.fornecedorId": [
      "rascunhosAEnviar"
    ],
    "PedidoCompra.numero": [
      "rascunhosAEnviar"
    ],
    "PedidoCompra.status": [
      "rascunhosAEnviar",
      "resumoMeusPedidos"
    ]
  }
} as const;
