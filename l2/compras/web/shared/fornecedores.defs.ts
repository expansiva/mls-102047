/// <mls fileReference="_102047_/l2/compras/web/shared/fornecedores.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:fornecedorList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:fornecedorList",
        "persist": true
      },
      "fornecedorId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:fornecedorForm",
        "persist": true
      },
      "produtoFornecidoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:produtoFornecidoForm",
        "persist": true
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:fornecedorForm",
        "persist": false
      },
      "produtoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:produtoFornecidoForm",
        "persist": false
      }
    }
  },
  "forms": {
    "salvarFornecedor": {
      "organism": "fornecedorForm",
      "submit": "salvarFornecedor"
    },
    "incluirProdutoFornecido": {
      "organism": "produtoFornecidoForm",
      "submit": "incluirProdutoFornecido"
    },
    "alterarPrecoCombinado": {
      "organism": "produtoFornecidoForm",
      "submit": "alterarPrecoCombinado"
    },
    "abrirPedido": {
      "organism": "abrirPedidoActions",
      "submit": "abrirPedido"
    },
    "incluirItemPedido": {
      "organism": "abrirPedidoActions",
      "submit": "incluirItemPedido"
    },
    "enviarPedido": {
      "organism": "abrirPedidoActions",
      "submit": "enviarPedido"
    }
  },
  "requests": {
    "buscarFornecedores": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "fornecedores"
      ]
    },
    "abrirFornecedor": {
      "kind": "qry",
      "trigger": "abrirFornecedor",
      "returns": [
        "fornecedor",
        "produtosFornecidos",
        "pedidoRascunho"
      ]
    },
    "buscarProdutos": {
      "kind": "qry",
      "trigger": "buscarProdutos",
      "returns": [
        "produtos"
      ]
    },
    "salvarFornecedor": {
      "kind": "cmd",
      "trigger": "salvarFornecedor",
      "returns": [
        "fornecedor"
      ],
      "writes": "Fornecedor.create"
    },
    "incluirProdutoFornecido": {
      "kind": "cmd",
      "trigger": "incluirProdutoFornecido",
      "returns": [
        "produtoFornecido"
      ],
      "writes": "ProdutoFornecido.create"
    },
    "alterarPrecoCombinado": {
      "kind": "cmd",
      "trigger": "alterarPrecoCombinado",
      "returns": [
        "produtoFornecido"
      ],
      "writes": "ProdutoFornecido.update"
    },
    "abrirPedido": {
      "kind": "cmd",
      "trigger": "abrirPedido",
      "returns": [
        "pedido"
      ],
      "writes": "PedidoCompra.create"
    },
    "incluirItemPedido": {
      "kind": "cmd",
      "trigger": "incluirItemPedido",
      "returns": [
        "pedido"
      ],
      "writes": "ItemPedido.create"
    },
    "enviarPedido": {
      "kind": "cmd",
      "trigger": "enviarPedido",
      "returns": [
        "pedido"
      ],
      "writes": "PedidoCompra.enviar"
    }
  },
  "states": {
    "fornecedores": {
      "source": "buscarFornecedores.fornecedores",
      "description": "Linha da busca de fornecedores: nome, CNPJ, razão social e situação.",
      "organisms": [
        "fornecedorList"
      ]
    },
    "fornecedor": {
      "source": "abrirFornecedor.fornecedor",
      "description": "Cadastro completo do fornecedor com seus contatos, como o formulário mostra e edita.",
      "organisms": [
        "abrirPedidoActions",
        "fornecedorForm"
      ]
    },
    "produtosFornecidos": {
      "source": "abrirFornecedor.produtosFornecidos",
      "description": "Produto fornecido pelo fornecedor com o preço combinado, vigência, última atualização e uso em pedidos.",
      "organisms": [
        "abrirPedidoActions",
        "produtoFornecidoForm",
        "produtosFornecidosDetail"
      ]
    },
    "produtos": {
      "source": "buscarProdutos.produtos",
      "description": "Produto do catálogo mestre identificado pelo nome.",
      "organisms": [
        "produtoFornecidoForm"
      ]
    },
    "pedidoRascunho": {
      "source": "abrirFornecedor.pedidoRascunho",
      "description": "Pedido de compra do fornecedor com seus itens e o valor total calculado.",
      "organisms": [
        "abrirPedidoActions"
      ]
    },
    "selectedFornecedor": {
      "source": "entry.params.fornecedorId",
      "description": "Cadastro completo do fornecedor com seus contatos, como o formulário mostra e edita.",
      "organisms": [
        "fornecedorForm",
        "fornecedorList"
      ]
    },
    "selectedProdutoFornecido": {
      "source": "entry.params.produtoFornecidoId",
      "description": "Produto fornecido pelo fornecedor com o preço combinado, vigência, última atualização e uso em pedidos.",
      "organisms": [
        "produtoFornecidoForm",
        "produtosFornecidosDetail"
      ]
    }
  },
  "functions": {
    "buscarFornecedores": {
      "description": "Lista os fornecedores da organização, buscados pelo nome, razão social ou CNPJ, para o usuário conferir se já existe antes de cadastrar e escolher com qual trabalhar.",
      "calls": "buscarFornecedores",
      "sets": "fornecedores"
    },
    "abrirFornecedor": {
      "description": "Carrega de uma vez tudo o que a página mostra para o fornecedor escolhido: cadastro e contatos, produtos fornecidos com preço combinado e o pedido em rascunho em andamento para ele.",
      "calls": "abrirFornecedor",
      "sets": "fornecedor",
      "updates": [
        "produtosFornecidos",
        "pedidoRascunho"
      ]
    },
    "buscarProdutos": {
      "description": "Encontra produtos do catálogo pelo nome para escolher qual associar ao fornecedor como produto fornecido.",
      "calls": "buscarProdutos",
      "sets": "produtos"
    },
    "salvarFornecedor": {
      "description": "Cadastra o fornecedor: cria a empresa pelo CNPJ quando não existe e anexa o papel compras.Fornecedor. (fornecedores.items: upsert)",
      "calls": "salvarFornecedor",
      "sets": "fornecedor",
      "updates": [
        "fornecedores"
      ]
    },
    "incluirProdutoFornecido": {
      "description": "Associa um produto ao fornecedor escolhido com o preço combinado e a vigência. (produtosFornecidos: upsert)",
      "calls": "incluirProdutoFornecido",
      "updates": [
        "produtosFornecidos"
      ]
    },
    "alterarPrecoCombinado": {
      "description": "Altera o preço combinado, a vigência ou a atividade de um produto fornecido escolhido no detalhe. (produtosFornecidos: upsert)",
      "calls": "alterarPrecoCombinado",
      "updates": [
        "produtosFornecidos"
      ]
    },
    "abrirPedido": {
      "description": "Abre um pedido de compra em rascunho para o fornecedor escolhido.",
      "calls": "abrirPedido",
      "sets": "pedidoRascunho"
    },
    "incluirItemPedido": {
      "description": "Inclui um item no pedido em rascunho com quantidade e preço, sugerido pelo preço combinado do fornecedor.",
      "calls": "incluirItemPedido",
      "sets": "pedidoRascunho",
      "updates": [
        "fornecedor",
        "produtosFornecidos"
      ]
    },
    "enviarPedido": {
      "description": "Envia o pedido em rascunho; até o valor limite segue liberado ao fornecedor, acima aguarda aprovação do gerente de compras.",
      "calls": "enviarPedido",
      "sets": "pedidoRascunho"
    }
  },
  "journeys": [
    {
      "step": "abrirEnviarPedido/selecionarFornecedor",
      "organisms": [
        "fornecedorList"
      ],
      "functions": [
        "buscarFornecedores",
        "abrirFornecedor"
      ]
    },
    {
      "step": "abrirEnviarPedido/abrirPedido",
      "organisms": [
        "abrirPedidoActions"
      ],
      "functions": [
        "abrirPedido"
      ]
    },
    {
      "step": "abrirEnviarPedido/incluirItem",
      "organisms": [
        "abrirPedidoActions",
        "produtosFornecidosDetail"
      ],
      "functions": [
        "incluirItemPedido"
      ]
    },
    {
      "step": "abrirEnviarPedido/revisarPedido",
      "organisms": [
        "abrirPedidoActions"
      ],
      "functions": [
        "abrirFornecedor"
      ]
    },
    {
      "step": "abrirEnviarPedido/enviarPedido",
      "organisms": [
        "abrirPedidoActions"
      ],
      "functions": [
        "enviarPedido"
      ]
    },
    {
      "step": "atualizarPrecoCombinado/localizarFornecedor",
      "organisms": [
        "fornecedorList"
      ],
      "functions": [
        "buscarFornecedores",
        "abrirFornecedor"
      ]
    },
    {
      "step": "atualizarPrecoCombinado/abrirProdutoFornecido",
      "organisms": [
        "produtosFornecidosDetail",
        "produtoFornecidoForm"
      ],
      "functions": [
        "abrirFornecedor"
      ]
    },
    {
      "step": "atualizarPrecoCombinado/alterarPreco",
      "organisms": [
        "produtoFornecidoForm"
      ],
      "functions": [
        "alterarPrecoCombinado"
      ]
    },
    {
      "step": "cadastrarFornecedor/localizarFornecedor",
      "organisms": [
        "fornecedorList"
      ],
      "functions": [
        "buscarFornecedores"
      ]
    },
    {
      "step": "cadastrarFornecedor/cadastrarFornecedor",
      "organisms": [
        "fornecedorForm"
      ],
      "functions": [
        "salvarFornecedor"
      ]
    },
    {
      "step": "cadastrarFornecedor/incluirProdutoFornecido",
      "organisms": [
        "produtoFornecidoForm"
      ],
      "functions": [
        "buscarProdutos",
        "incluirProdutoFornecido"
      ]
    },
    {
      "step": "cadastrarFornecedor/conferirProdutosFornecidos",
      "organisms": [
        "produtosFornecidosDetail"
      ],
      "functions": [
        "abrirFornecedor"
      ]
    }
  ],
  "rules": {
    "buscarFornecedores": [],
    "abrirFornecedor": [
      "precoCombinadoSugerePreco",
      "valorTotalPedidoCalculado"
    ],
    "buscarProdutos": [],
    "salvarFornecedor": [
      "fornecedorCnpjObrigatorio"
    ],
    "incluirProdutoFornecido": [
      "produtoFornecidoUnicoPorFornecedor",
      "precoCombinadoPositivo",
      "produtoFornecidoSomenteFornecedorAtivo"
    ],
    "alterarPrecoCombinado": [
      "precoCombinadoPositivo",
      "produtoFornecidoSomenteFornecedorAtivo",
      "produtoFornecidoUnicoPorFornecedor"
    ],
    "abrirPedido": [
      "fornecedorInativoSemNovoPedido",
      "compradorInativoNaoAbrePedido",
      "numeroPedidoUnico"
    ],
    "incluirItemPedido": [
      "itemPedidoSomenteEmRascunho",
      "itemPedidoProdutoDoFornecedor",
      "inactiveProductCannotBeOrdered",
      "itemPedidoQuantidadePositiva",
      "precoCombinadoSugerePreco",
      "precoSugeridoNoItemPedido",
      "valorTotalPedidoCalculado"
    ],
    "enviarPedido": [
      "pedidoExigeItens",
      "valorLimiteAprovacao",
      "fornecedorInativoSemNovoPedido"
    ]
  },
  "access": {
    "actors": [
      "comprador",
      "gerenteCompras"
    ],
    "grants": [
      "compradorCadastroFornecedores",
      "compradorProdutosFornecidos",
      "compradorPedidos",
      "gerenteAprovacaoPedidos",
      "gerenteCadastros"
    ]
  },
  "fields": {
    "ContatoFornecedor.details.contactChannel.contactType": [
      "fornecedorForm"
    ],
    "ContatoFornecedor.details.contactChannel.value": [
      "fornecedorForm"
    ],
    "ContatoFornecedor.details.identification.name": [
      "fornecedorForm"
    ],
    "Fornecedor.details.base.notes": [
      "fornecedorForm"
    ],
    "Fornecedor.details.company.companyKind": [
      "fornecedorForm"
    ],
    "Fornecedor.details.company.legalName": [
      "fornecedorForm",
      "fornecedorList"
    ],
    "Fornecedor.details.company.tradeName": [
      "fornecedorForm"
    ],
    "Fornecedor.details.identification.countryCode": [
      "fornecedorForm"
    ],
    "Fornecedor.details.identification.docId": [
      "fornecedorForm",
      "fornecedorList"
    ],
    "Fornecedor.details.identification.docType": [
      "fornecedorForm"
    ],
    "Fornecedor.details.identification.name": [
      "abrirPedidoActions",
      "fornecedorForm",
      "fornecedorList"
    ],
    "Fornecedor.details.identification.status": [
      "abrirPedidoActions",
      "fornecedorForm",
      "fornecedorList"
    ],
    "ItemPedido.details.precoUnitario": [
      "abrirPedidoActions"
    ],
    "ItemPedido.details.quantidade": [
      "abrirPedidoActions"
    ],
    "ItemPedido.details.valorTotalItem": [
      "abrirPedidoActions"
    ],
    "ItemPedido.numeroItem": [
      "abrirPedidoActions"
    ],
    "ItemPedido.produtoFornecidoId": [
      "abrirPedidoActions"
    ],
    "ItemPedido.produtoId": [
      "abrirPedidoActions"
    ],
    "PedidoCompra.dataPrevistaEntrega": [
      "abrirPedidoActions"
    ],
    "PedidoCompra.details.valorTotal": [
      "abrirPedidoActions"
    ],
    "PedidoCompra.numero": [
      "abrirPedidoActions"
    ],
    "PedidoCompra.status": [
      "abrirPedidoActions"
    ],
    "Produto.details.identification.name": [
      "produtoFornecidoForm",
      "produtosFornecidosDetail"
    ],
    "ProdutoFornecido.ativo": [
      "produtoFornecidoForm",
      "produtosFornecidosDetail"
    ],
    "ProdutoFornecido.codigo": [
      "produtoFornecidoForm",
      "produtosFornecidosDetail"
    ],
    "ProdutoFornecido.details.codigoNoFornecedor": [
      "produtoFornecidoForm"
    ],
    "ProdutoFornecido.details.observacoes": [
      "produtoFornecidoForm"
    ],
    "ProdutoFornecido.details.precoAtualizadoEm": [
      "produtoFornecidoForm",
      "produtosFornecidosDetail"
    ],
    "ProdutoFornecido.details.precoCombinado": [
      "abrirPedidoActions",
      "produtoFornecidoForm",
      "produtosFornecidosDetail"
    ],
    "ProdutoFornecido.details.usadoEmPedidos": [
      "produtosFornecidosDetail"
    ],
    "ProdutoFornecido.details.vigenteDesde": [
      "produtoFornecidoForm",
      "produtosFornecidosDetail"
    ],
    "ProdutoFornecido.produtoId": [
      "produtoFornecidoForm",
      "produtosFornecidosDetail"
    ]
  }
} as const;
