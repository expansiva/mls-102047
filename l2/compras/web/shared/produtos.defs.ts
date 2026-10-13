/// <mls fileReference="_102047_/l2/compras/web/shared/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:catalogoProdutos",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:catalogoProdutos",
        "persist": true
      },
      "produtoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:produtoForm",
        "persist": true
      }
    }
  },
  "forms": {
    "cadastrarProduto": {
      "organism": "produtoForm",
      "submit": "cadastrarProduto"
    },
    "salvarAlteracaoProduto": {
      "organism": "produtoForm",
      "submit": "salvarAlteracaoProduto"
    }
  },
  "requests": {
    "listarProdutos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "produtos"
      ]
    },
    "obterProduto": {
      "kind": "qry",
      "trigger": "obterProduto",
      "returns": [
        "produto"
      ]
    },
    "cadastrarProduto": {
      "kind": "cmd",
      "trigger": "cadastrarProduto",
      "returns": [
        "produto"
      ],
      "writes": "Produto.create"
    },
    "salvarAlteracaoProduto": {
      "kind": "cmd",
      "trigger": "salvarAlteracaoProduto",
      "returns": [
        "produto"
      ],
      "writes": "Produto.update"
    }
  },
  "states": {
    "produtos": {
      "source": "listarProdutos.produtos",
      "description": "Linha do catálogo de produtos.",
      "organisms": [
        "catalogoProdutos"
      ]
    },
    "produto": {
      "source": "obterProduto.produto",
      "description": "Produto completo para o formulário de cadastro/alteração.",
      "organisms": [
        "produtoForm"
      ]
    },
    "selectedProduto": {
      "source": "entry.params.produtoId",
      "description": "Produto completo para o formulário de cadastro/alteração.",
      "organisms": [
        "catalogoProdutos",
        "produtoForm"
      ]
    }
  },
  "functions": {
    "listarProdutos": {
      "description": "Carrega o catálogo de produtos comprados pela organização, página a página, e permite buscar pelo nome ou código para evitar cadastro duplicado.",
      "calls": "listarProdutos",
      "sets": "produtos"
    },
    "obterProduto": {
      "description": "Carrega o produto escolhido no catálogo para preencher o formulário de alteração.",
      "calls": "obterProduto",
      "sets": "produto"
    },
    "cadastrarProduto": {
      "description": "Cadastra um novo produto no catálogo de compras. (produto: upsert)",
      "calls": "cadastrarProduto",
      "updates": [
        "produto",
        "produtos"
      ]
    },
    "salvarAlteracaoProduto": {
      "description": "Salva a correção dos dados do produto escolhido. (produto: upsert)",
      "calls": "salvarAlteracaoProduto",
      "updates": [
        "produto",
        "produtos"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "listarProdutos": [],
    "obterProduto": [],
    "cadastrarProduto": [],
    "salvarAlteracaoProduto": []
  },
  "access": {
    "actors": [
      "comprador",
      "gerenteCompras"
    ],
    "grants": [
      "compradorCadastroFornecedores",
      "gerenteCadastros"
    ]
  },
  "fields": {
    "Produto.details.base.aliases": [
      "produtoForm"
    ],
    "Produto.details.base.notes": [
      "produtoForm"
    ],
    "Produto.details.identification.name": [
      "catalogoProdutos",
      "produtoForm"
    ],
    "Produto.details.identification.status": [
      "catalogoProdutos",
      "produtoForm"
    ],
    "Produto.details.identification.updatedAt": [
      "catalogoProdutos"
    ],
    "Produto.details.product.brand": [
      "catalogoProdutos",
      "produtoForm"
    ],
    "Produto.details.product.category": [
      "catalogoProdutos",
      "produtoForm"
    ],
    "Produto.details.product.isInventoried": [
      "produtoForm"
    ],
    "Produto.details.product.productType": [
      "produtoForm"
    ],
    "Produto.details.product.sku": [
      "catalogoProdutos",
      "produtoForm"
    ],
    "Produto.details.product.unitOfMeasure": [
      "catalogoProdutos",
      "produtoForm"
    ],
    "Produto.id": [
      "catalogoProdutos",
      "produtoForm"
    ],
    "Produto.version": [
      "produtoForm"
    ]
  }
} as const;
