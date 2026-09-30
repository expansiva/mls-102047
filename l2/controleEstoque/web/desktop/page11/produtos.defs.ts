/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "inventoryControl",
    "experience": "splitViewOperations"
  },
  "intent": "Permitir ao estoquista acompanhar o saldo atual de cada produto, identificar itens abaixo da quantidade mínima, consultar o detalhe do produto e cadastrar um novo item com o mínimo para o controle de estoque.",
  "sections": [
    {
      "id": "visaoSaldos",
      "priority": "primary",
      "purpose": "Mostra o panorama dos saldos e os avisos de reposição para o estoquista enxergar o que está crítico antes de localizar um item.",
      "organisms": [
        "resumoSaldos",
        "alertasSaldoBaixo"
      ]
    },
    {
      "id": "consultaProdutos",
      "priority": "main",
      "purpose": "Permite localizar os produtos cadastrados e conferir nome, saldo atual e quantidade mínima do item escolhido.",
      "organisms": [
        "listaProdutos",
        "detalheProduto"
      ]
    },
    {
      "id": "novoProduto",
      "priority": "secondary",
      "purpose": "Recolhe os dados do produto e confirma o cadastro para iniciar o acompanhamento de saldo e mínimo.",
      "organisms": [
        "formularioProduto",
        "acoesCadastro"
      ]
    }
  ],
  "organisms": {
    "resumoSaldos": {
      "kind": "summary",
      "text": "Mostra o saldo atual de cada produto do estoque para o estoquista acompanhar a disponibilidade sem abrir cada ficha.",
      "intents": []
    },
    "alertasSaldoBaixo": {
      "kind": "highlights",
      "text": "Destaca os produtos com saldo abaixo da quantidade mínima para o estoquista identificar o que precisa de reposição.",
      "intents": []
    },
    "listaProdutos": {
      "kind": "list",
      "text": "Lista os produtos cadastrados no estoque para o estoquista localizar o item que deseja consultar.",
      "intents": []
    },
    "detalheProduto": {
      "kind": "detail",
      "text": "Apresenta o produto escolhido com saldo atual e quantidade mínima para o estoquista confirmar a situação e, se preciso, seguir para registrar uma movimentação.",
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
      "text": "Permite informar o nome do produto, a unidade de medida e a quantidade mínima que passam a orientar o acompanhamento do estoque.",
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
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "alertasSaldoBaixo": [
      {
        "role": "display",
        "preferred": "groupviewdata--ml-card-grid",
        "alternative": "groupviewdata--ml-vertical-record-list"
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
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
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
