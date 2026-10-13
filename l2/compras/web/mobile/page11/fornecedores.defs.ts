/// <mls fileReference="_102047_/l2/compras/web/mobile/page11/fornecedores.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/supplierManagement/page21.md",
    "experience": "directoryCompliance"
  },
  "intent": "No celular, por volta de 390px de largura e ainda usável entre 360px e 430px, a página mostra uma coluna fluida: primeiro a busca do fornecedor, depois o cadastro dele, os produtos fornecidos com o preço combinado e, por fim, as ações de abrir, completar e enviar um pedido de compra.",
  "sections": [
    {
      "id": "localizacao",
      "priority": "primary",
      "purpose": "Buscar o fornecedor pelo nome com uma mão e tocar no resultado para trabalhar com ele.",
      "organisms": [
        "fornecedorList"
      ]
    },
    {
      "id": "cadastroFornecedor",
      "priority": "main",
      "purpose": "Ver e registrar os dados e contatos do fornecedor em campos empilhados na coluna estreita.",
      "organisms": [
        "fornecedorForm"
      ]
    },
    {
      "id": "produtosFornecidos",
      "priority": "main",
      "purpose": "Conferir os produtos e preços combinados em linhas compactas e ajustar ou incluir um preço logo abaixo.",
      "organisms": [
        "produtosFornecidosDetail",
        "produtoFornecidoForm"
      ]
    },
    {
      "id": "proximoPasso",
      "priority": "secondary",
      "purpose": "Abrir o pedido de compra para o fornecedor, incluir itens e enviá-lo com botões bem visíveis ao fim da página.",
      "organisms": [
        "abrirPedidoActions"
      ]
    }
  ],
  "organisms": {
    "fornecedorList": {
      "kind": "list",
      "text": "Fornecedores da organização encontrados pelo nome, cada um com o CNPJ e a situação no cadastro.",
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
      "text": "Produtos fornecidos com código, preço combinado, data da última atualização do preço e quantos pedidos usaram esse preço.",
      "intents": []
    },
    "produtoFornecidoForm": {
      "kind": "form",
      "text": "Incluir um produto fornecido com o preço combinado, ou alterar o preço combinado do produto escolhido.",
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
      "text": "Abrir um pedido de compra para este fornecedor, incluir itens com o preço combinado sugerido e enviar; acima do valor limite ele aguarda aprovação do gerente.",
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
        "alternative": "groupsearchcontent--ml-search-history"
      },
      {
        "role": "resultados de fornecedores",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "fornecedorForm": [
      {
        "role": "nome, CNPJ e razão social",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "contatos do fornecedor",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
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
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
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
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
