/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/inventoryControl/page21.md",
    "experience": "splitViewOperations"
  },
  "intent": "O estoquista acompanha o saldo atual dos produtos, vê logo quais estão abaixo do mínimo, localiza um produto para conferir saldo e situação, e cadastra novos produtos definindo o saldo mínimo para aviso.",
  "sections": [
    {
      "id": "visaoEstoque",
      "priority": "primary",
      "purpose": "Mostrar o panorama do saldo e destacar os produtos abaixo do mínimo antes de qualquer outra coisa.",
      "organisms": [
        "saldoResumo",
        "produtosAbaixoMinimo"
      ]
    },
    {
      "id": "consultaProdutos",
      "priority": "main",
      "purpose": "Localizar um produto na lista e ver ao lado seu saldo atual, saldo mínimo e se está abaixo do mínimo.",
      "organisms": [
        "listaProdutos",
        "detalheProduto"
      ]
    },
    {
      "id": "cadastroProdutoSecao",
      "priority": "secondary",
      "purpose": "Cadastrar um produto no estoque com o saldo mínimo que dispara o aviso.",
      "organisms": [
        "cadastroProduto",
        "acoesCadastro"
      ]
    }
  ],
  "organisms": {
    "saldoResumo": {
      "kind": "summary",
      "text": "Vejo o saldo atual dos produtos do estoque em um resumo rápido.",
      "intents": []
    },
    "produtosAbaixoMinimo": {
      "kind": "highlights",
      "text": "Vejo quais produtos estão abaixo do mínimo para conferir o aviso.",
      "intents": []
    },
    "listaProdutos": {
      "kind": "list",
      "text": "Localizo os produtos do estoque pelo nome e vejo o saldo de cada um.",
      "intents": []
    },
    "detalheProduto": {
      "kind": "detail",
      "text": "Vejo o produto escolhido, o saldo atual, o saldo mínimo e se está abaixo do mínimo; daqui sigo para registrar uma entrada ou saída.",
      "intents": [
        {
          "id": "registrarMovimentacao",
          "kind": "navigate",
          "to": "movimentacoes"
        }
      ]
    },
    "cadastroProduto": {
      "kind": "form",
      "text": "Informo os dados do produto e defino o saldo mínimo para aviso.",
      "intents": []
    },
    "acoesCadastro": {
      "kind": "actions",
      "text": "Cadastro o produto no estoque e recebo a confirmação.",
      "intents": [
        {
          "id": "cadastrarProduto",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "saldoResumo": [
      {
        "role": "indicador de saldo atual",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "produtosAbaixoMinimo": [
      {
        "role": "aviso de produtos abaixo do mínimo",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "cartão de produto avisado",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "listaProdutos": [
      {
        "role": "busca por nome",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "tabela de produtos",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "detalheProduto": [
      {
        "role": "cartão do produto",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "saldo atual contra o mínimo",
        "preferred": "groupviewmetric--ml-metric-gauge",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "indicação de abaixo do mínimo",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "cadastroProduto": [
      {
        "role": "nome, SKU, unidade e categoria",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "saldo mínimo",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      }
    ],
    "acoesCadastro": [
      {
        "role": "cadastrar produto",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do cadastro",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
