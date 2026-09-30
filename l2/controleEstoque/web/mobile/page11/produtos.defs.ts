/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "inventoryControl",
    "experience": "splitViewOperations"
  },
  "intent": "Permitir ao estoquista, em conteúdo estreito e fluido, priorizar avisos de saldo baixo, localizar produtos, conferir saldo e mínimo e cadastrar um novo item para o controle de estoque.",
  "sections": [
    {
      "id": "avisosReposicao",
      "priority": "primary",
      "purpose": "Coloca na frente os produtos abaixo do mínimo para o estoquista tratar a reposição na faixa estreita do aparelho.",
      "organisms": [
        "alertasSaldoBaixo"
      ]
    },
    {
      "id": "consultaProdutos",
      "priority": "main",
      "purpose": "Empilha o resumo de saldos, a busca da lista e o detalhe do produto em coluna fluida para conferir disponibilidade e mínimo.",
      "organisms": [
        "resumoSaldos",
        "listaProdutos",
        "detalheProduto"
      ]
    },
    {
      "id": "novoProduto",
      "priority": "secondary",
      "purpose": "Apresenta o formulário e a ação de cadastro em sequência vertical para registrar o produto com sua quantidade mínima.",
      "organisms": [
        "formularioProduto",
        "acoesCadastro"
      ]
    }
  ],
  "organisms": {
    "resumoSaldos": {
      "kind": "summary",
      "text": "Mostra o saldo atual de cada produto em lista compacta para o estoquista varrer a disponibilidade na tela estreita.",
      "intents": []
    },
    "alertasSaldoBaixo": {
      "kind": "highlights",
      "text": "Destaca os produtos com saldo abaixo da quantidade mínima para o estoquista ver primeiro o que precisa de reposição.",
      "intents": []
    },
    "listaProdutos": {
      "kind": "list",
      "text": "Permite buscar e percorrer os produtos cadastrados para o estoquista localizar o item na coluna estreita.",
      "intents": []
    },
    "detalheProduto": {
      "kind": "detail",
      "text": "Mostra o produto escolhido com saldo atual e quantidade mínima para o estoquista confirmar a situação e, se preciso, seguir para registrar uma movimentação.",
      "intents": [
        {
          "id": "abrirMovimentacoes",
          "kind": "navigate",
          "to": "movimentacoes"
        }
      ]
    },
    "formularioProduto": {
      "kind": "form",
      "text": "Permite informar o nome do produto, a unidade de medida e a quantidade mínima em campos empilhados para o acompanhamento do estoque.",
      "intents": []
    },
    "acoesCadastro": {
      "kind": "actions",
      "text": "Confirma o cadastro do produto para que ele fique disponível no controle de saldos e nas movimentações.",
      "intents": [
        {
          "id": "cadastrarProduto",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "resumoSaldos": [
      {
        "role": "display",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "alertasSaldoBaixo": [
      {
        "role": "display",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "listaProdutos": [
      {
        "role": "search",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "display",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "detalheProduto": [
      {
        "role": "display",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "metric",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "formularioProduto": [
      {
        "role": "text",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "number",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      }
    ],
    "acoesCadastro": [
      {
        "role": "action",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ]
  }
} as const;
