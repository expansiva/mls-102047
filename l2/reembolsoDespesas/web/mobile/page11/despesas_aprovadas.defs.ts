/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_aprovadas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Em uma coluna estreita e fluida, permitir ao financeiro percorrer as despesas aprovadas a pagar, abrir os dados da selecionada e informar a data de pagamento.",
  "sections": [
    {
      "id": "paymentQueue",
      "priority": "primary",
      "purpose": "Empilhar a fila de despesas aprovadas em conteúdo fluido perto de 390px, ainda utilizável em 360px e 430px, para o financeiro localizar o que falta pagar.",
      "organisms": [
        "approvedExpensesList"
      ]
    },
    {
      "id": "expenseReview",
      "priority": "main",
      "purpose": "Mostrar abaixo da fila, no mesmo fluxo estreito, os dados da despesa selecionada para conferência antes de pagar.",
      "organisms": [
        "approvedExpenseDetail"
      ]
    },
    {
      "id": "paymentCapture",
      "priority": "secondary",
      "purpose": "Seguir no fluxo estreito com a data de pagamento e a confirmação do registro do reembolso.",
      "organisms": [
        "paymentDateForm"
      ]
    }
  ],
  "organisms": {
    "approvedExpensesList": {
      "kind": "list",
      "text": "Lista em sequência as despesas aprovadas que aguardam pagamento, com colaborador, valor, categoria e data, para o financeiro escolher o reembolso a pagar na tela estreita.",
      "intents": []
    },
    "approvedExpenseDetail": {
      "kind": "detail",
      "text": "Mostra os dados da despesa aprovada selecionada — colaborador, categoria, valor, descrição, situação e data de pagamento, se houver — para conferência no fluxo estreito antes de pagar.",
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
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "approvedExpenseDetail": [
      {
        "role": "summary",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "paymentDateForm": [
      {
        "role": "dateEntry",
        "preferred": "groupenterdate--ml-compact-calendar",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "confirmAction",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ]
  }
} as const;
