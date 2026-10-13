/// <mls fileReference="_102047_/l2/compras/web/desktop/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Manter o catálogo de produtos que a organização compra: localizar um produto pelo nome ou código, conferir situação, unidade e categoria e cadastrar ou corrigir o produto sem criar duplicidade, para que pedidos e recebimentos usem dados corretos.",
  "sections": [
    {
      "id": "catalogo",
      "priority": "primary",
      "purpose": "Mostrar os produtos do catálogo com nome, código interno, categoria, unidade de medida e situação, para localizar rapidamente o produto e escolher qual alterar.",
      "organisms": [
        "catalogoProdutos"
      ]
    },
    {
      "id": "cadastroProduto",
      "priority": "main",
      "purpose": "Cadastrar um novo produto ou alterar o produto escolhido: nome, código, tipo, categoria, marca, unidade de medida e se controla estoque.",
      "organisms": [
        "produtoForm"
      ]
    }
  ],
  "organisms": {
    "catalogoProdutos": {
      "kind": "list",
      "text": "Produtos do catálogo comprados pela organização, com nome, código interno, categoria, marca, unidade de medida, situação e data da última alteração; busca pelo nome para evitar cadastro duplicado.",
      "intents": []
    },
    "produtoForm": {
      "kind": "form",
      "text": "Cadastrar ou alterar um produto do catálogo: nome, outros nomes, código interno, tipo, categoria, marca, unidade em que é comprado e recebido, se dá entrada no estoque e observações.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Tabela de produtos do catálogo",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      },
      {
        "role": "Paginação do catálogo",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "produtoForm": [
      {
        "role": "Nome, código, categoria, marca e unidade",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
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
        "alternative": "groupselectone--ml-segmented-control"
      },
      {
        "role": "Controla estoque",
        "preferred": "groupenterboolean--ml-toggle-switch",
        "alternative": "groupenterboolean--ml-checkbox-preference"
      },
      {
        "role": "Salvar produto",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação ou erro ao salvar",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
