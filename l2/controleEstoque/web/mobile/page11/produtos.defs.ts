/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/inventoryControl/page21.md",
    "experience": "splitViewOperations"
  },
  "intent": "Em tela estreita (cerca de 390px, usável de 360px a 430px), o estoquista vê primeiro o aviso de produtos abaixo do mínimo e o saldo, localiza um produto em lista empilhada, abre seu saldo e cadastra produtos em formulário de uma coluna.",
  "sections": [
    {
      "id": "visaoEstoque",
      "priority": "primary",
      "purpose": "Mostrar no topo o aviso de produtos abaixo do mínimo e o resumo do saldo em blocos que se empilham.",
      "organisms": [
        "produtosAbaixoMinimo",
        "saldoResumo"
      ]
    },
    {
      "id": "consultaProdutos",
      "priority": "main",
      "purpose": "Buscar o produto na lista e, ao tocar, ver abaixo o saldo atual, o mínimo e a situação.",
      "organisms": [
        "listaProdutos",
        "detalheProduto"
      ]
    },
    {
      "id": "cadastroProdutoSecao",
      "priority": "secondary",
      "purpose": "Cadastrar um produto com o saldo mínimo em campos de largura total.",
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
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
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
        "preferred": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "listaProdutos": [
      {
        "role": "busca por nome",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "lista de produtos",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "detalheProduto": [
      {
        "role": "cartão do produto",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "saldo atual contra o mínimo",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-gauge"
      },
      {
        "role": "indicação de abaixo do mínimo",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "cadastroProduto": [
      {
        "role": "nome, SKU, unidade e categoria",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "saldo mínimo",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-floating-number-input"
      }
    ],
    "acoesCadastro": [
      {
        "role": "cadastrar produto",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do cadastro",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
