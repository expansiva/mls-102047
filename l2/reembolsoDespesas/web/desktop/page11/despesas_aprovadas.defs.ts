/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/despesas_aprovadas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Ajudar o financeiro a localizar as despesas aprovadas que ainda aguardam pagamento, conferir os dados de cada reembolso e registrar a data em que o pagamento foi feito.",
  "sections": [
    {
      "id": "paymentQueue",
      "priority": "primary",
      "purpose": "Mostrar a fila de despesas aprovadas para o financeiro encontrar o que ainda precisa ser pago.",
      "organisms": [
        "approvedExpensesList"
      ]
    },
    {
      "id": "expenseReview",
      "priority": "main",
      "purpose": "Exibir os dados da despesa aprovada selecionada para conferência antes do registro do pagamento.",
      "organisms": [
        "approvedExpenseDetail"
      ]
    },
    {
      "id": "paymentCapture",
      "priority": "secondary",
      "purpose": "Capturar a data de pagamento e confirmar o registro do reembolso da despesa conferida.",
      "organisms": [
        "paymentDateForm"
      ]
    }
  ],
  "organisms": {
    "approvedExpensesList": {
      "kind": "list",
      "text": "Mostra as despesas aprovadas que ainda aguardam pagamento, com colaborador, valor, categoria e data, para o financeiro localizar o reembolso a pagar.",
      "intents": []
    },
    "approvedExpenseDetail": {
      "kind": "detail",
      "text": "Apresenta os dados da despesa aprovada selecionada — colaborador, categoria, valor, descrição, situação e data de pagamento, se houver — para o financeiro conferir o reembolso antes de pagar.",
      "intents": []
    },
    "paymentDateForm": {
      "kind": "form",
      "text": "Permite informar a data em que o pagamento foi realizado e confirmar o registro, encerrando a despesa aprovada como paga.",
      "intents": [
        {
          "id": "registerPayment",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "approvedExpensesList": [
      {
        "role": "collection",
        "preferred": "groupviewtable--ml-advanced-data-table",
        "alternative": "groupviewtable--ml-data-table"
      }
    ],
    "approvedExpenseDetail": [
      {
        "role": "summary",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "paymentDateForm": [
      {
        "role": "dateEntry",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "confirmAction",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ]
  }
} as const;
