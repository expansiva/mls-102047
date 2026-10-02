/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/inventoryControl/page21.md",
    "experience": "splitViewOperations"
  },
  "intent": "Ajudar o estoquista a acompanhar o saldo atual de cada produto, reconhecer os itens abaixo da quantidade mínima, localizar e consultar o cadastro e registrar um novo produto com o mínimo de acompanhamento.",
  "sections": [
    {
      "id": "visaoEstoque",
      "priority": "primary",
      "purpose": "Dar ao estoquista um panorama dos saldos disponíveis e dos produtos que já exigem reposição por estarem abaixo do mínimo.",
      "organisms": [
        "saldosResumo",
        "alertasSaldoBaixo"
      ]
    },
    {
      "id": "consultaItens",
      "priority": "main",
      "purpose": "Permitir localizar um produto cadastrado e conferir nome, saldo atual e quantidade mínima antes de decidir o próximo passo.",
      "organisms": [
        "listaProdutos",
        "detalheProduto"
      ]
    },
    {
      "id": "novoProduto",
      "priority": "secondary",
      "purpose": "Permitir informar os dados do produto e gravar o cadastro com a quantidade mínima de acompanhamento.",
      "organisms": [
        "formularioCadastro",
        "acoesCadastro"
      ]
    }
  ],
  "organisms": {
    "saldosResumo": {
      "kind": "summary",
      "text": "Mostra o saldo atual de cada produto do estoque para o estoquista enxergar rapidamente a disponibilidade.",
      "intents": []
    },
    "alertasSaldoBaixo": {
      "kind": "highlights",
      "text": "Destaca os produtos com saldo abaixo da quantidade mínima para o estoquista priorizar a reposição.",
      "intents": []
    },
    "listaProdutos": {
      "kind": "list",
      "text": "Lista os produtos cadastrados no estoque para o estoquista localizar o item que deseja acompanhar.",
      "intents": []
    },
    "detalheProduto": {
      "kind": "detail",
      "text": "Apresenta o produto escolhido, o saldo atual e a quantidade mínima para o estoquista confirmar a situação e, se precisar repor, seguir para registrar uma movimentação.",
      "intents": [
        {
          "id": "abrirMovimentacoes",
          "kind": "navigate",
          "to": "movimentacoes"
        }
      ]
    },
    "formularioCadastro": {
      "kind": "form",
      "text": "Recebe o produto, a unidade de medida e a quantidade mínima para iniciar o acompanhamento do estoque.",
      "intents": []
    },
    "acoesCadastro": {
      "kind": "actions",
      "text": "Confirma o cadastro do produto no estoque com a quantidade mínima informada.",
      "intents": [
        {
          "id": "cadastrarProduto",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "saldosResumo": [
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
        "role": "display",
        "preferred": "groupviewtable--ml-advanced-data-table",
        "alternative": "groupviewtable--ml-data-table"
      }
    ],
    "detalheProduto": [
      {
        "role": "record",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "metric",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-gauge"
      }
    ],
    "formularioCadastro": [
      {
        "role": "quantity",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      }
    ],
    "acoesCadastro": [
      {
        "role": "action",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
