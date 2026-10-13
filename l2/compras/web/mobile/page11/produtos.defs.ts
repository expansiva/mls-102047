/// <mls fileReference="_102047_/l2/compras/web/mobile/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, localizar rapidamente um produto do catálogo pelo nome e cadastrar ou corrigir seus dados de compra em uma coluna única e fluida (cerca de 390px, usável de 360px a 430px).",
  "sections": [
    {
      "id": "catalogo",
      "priority": "primary",
      "purpose": "Buscar e percorrer os produtos em lista empilhada com nome, código, unidade e situação; tocar em um produto abre o cadastro para alteração.",
      "organisms": [
        "catalogoProdutos"
      ]
    },
    {
      "id": "cadastroProduto",
      "priority": "main",
      "purpose": "Formulário em uma coluna para cadastrar um novo produto ou alterar o escolhido, com o botão de salvar sempre ao alcance.",
      "organisms": [
        "produtoForm"
      ]
    }
  ],
  "organisms": {
    "catalogoProdutos": {
      "kind": "list",
      "text": "Produtos do catálogo comprados pela organização, em lista compacta com nome, código interno, unidade de medida e situação; busca pelo nome para evitar cadastro duplicado.",
      "intents": []
    },
    "produtoForm": {
      "kind": "form",
      "text": "Cadastrar ou alterar um produto do catálogo: nome, outros nomes, código interno, tipo, categoria, marca, unidade de medida, se controla estoque e observações.",
      "intents": [
        {
          "id": "cadastrarProduto",
          "kind": "submit"
        },
        {
          "id": "salvarAlteracaoProduto",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "catalogoProdutos": [
      {
        "role": "Buscar produto pelo nome",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Lista de produtos em tela estreita",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Paginação do catálogo",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "produtoForm": [
      {
        "role": "Nome, código, categoria, marca e unidade",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Outros nomes do produto",
        "preferred": "groupentertext--ml-tag-input"
      },
      {
        "role": "Observações",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "Tipo de produto",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "Controla estoque",
        "preferred": "groupenterboolean--ml-toggle-switch",
        "alternative": "groupenterboolean--ml-boolean-segmented"
      },
      {
        "role": "Salvar produto",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação ou erro ao salvar",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
