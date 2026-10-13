/// <mls fileReference="_102047_/l2/compras/web/desktop/page11/fornecedores.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/supplierManagement/page21.md",
    "experience": "directoryCompliance"
  },
  "intent": "Permitir ao comprador e ao gerente de compras localizar um fornecedor da organização, conferir e manter seu cadastro e contatos, revisar os produtos fornecidos com o preço combinado e, a partir dele, abrir, completar com itens e enviar um pedido de compra.",
  "sections": [
    {
      "id": "localizacao",
      "priority": "primary",
      "purpose": "Encontrar o fornecedor pelo nome antes de cadastrar outro, evitando duplicidade, e escolher com qual trabalhar.",
      "organisms": [
        "fornecedorList"
      ]
    },
    {
      "id": "cadastroFornecedor",
      "priority": "main",
      "purpose": "Ver e registrar os dados do fornecedor escolhido, como nome, CNPJ, razão social e contatos.",
      "organisms": [
        "fornecedorForm"
      ]
    },
    {
      "id": "produtosFornecidos",
      "priority": "main",
      "purpose": "Conferir o que o fornecedor fornece, quanto foi combinado, quando o preço mudou pela última vez e incluir ou ajustar um preço combinado.",
      "organisms": [
        "produtosFornecidosDetail",
        "produtoFornecidoForm"
      ]
    },
    {
      "id": "proximoPasso",
      "priority": "secondary",
      "purpose": "Começar um pedido de compra já com o fornecedor escolhido, incluir os itens com o preço combinado sugerido e enviá-lo.",
      "organisms": [
        "abrirPedidoActions"
      ]
    }
  ],
  "organisms": {
    "fornecedorList": {
      "kind": "list",
      "text": "Fornecedores da organização, buscados pelo nome, com CNPJ e situação no cadastro, para escolher com qual trabalhar.",
      "intents": []
    },
    "fornecedorForm": {
      "kind": "form",
      "text": "Cadastro do fornecedor com nome, CNPJ, razão social, nome fantasia e observações, mais os contatos de telefone, e-mail ou WhatsApp.",
      "intents": [
        {
          "id": "salvarFornecedor",
          "kind": "submit"
        }
      ]
    },
    "produtosFornecidosDetail": {
      "kind": "detail",
      "text": "Produtos fornecidos pelo fornecedor, com código, produto, preço combinado, vigência, data da última atualização do preço e quantos pedidos usaram esse preço.",
      "intents": []
    },
    "produtoFornecidoForm": {
      "kind": "form",
      "text": "Incluir um produto fornecido com o preço combinado e a vigência, ou alterar o preço combinado de um produto já fornecido.",
      "intents": [
        {
          "id": "incluirProdutoFornecido",
          "kind": "submit"
        },
        {
          "id": "alterarPrecoCombinado",
          "kind": "submit"
        }
      ]
    },
    "abrirPedidoActions": {
      "kind": "actions",
      "text": "Abrir um pedido de compra em rascunho para este fornecedor, incluir itens com quantidade e preço sugerido pelo preço combinado e enviar o pedido; acima do valor limite ele segue para aprovação do gerente.",
      "intents": [
        {
          "id": "abrirPedido",
          "kind": "submit"
        },
        {
          "id": "incluirItemPedido",
          "kind": "submit"
        },
        {
          "id": "enviarPedido",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "fornecedorList": [
      {
        "role": "busca por nome do fornecedor",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "resultados de fornecedores",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "fornecedorForm": [
      {
        "role": "nome, CNPJ e razão social",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "contatos do fornecedor",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "salvar fornecedor",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do cadastro",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "produtosFornecidosDetail": [
      {
        "role": "produtos e preços combinados",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "produtoFornecidoForm": [
      {
        "role": "escolha do produto",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "preço combinado",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "salvar produto fornecido",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "retorno da gravação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "abrirPedidoActions": [
      {
        "role": "abrir, incluir item e enviar pedido",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
