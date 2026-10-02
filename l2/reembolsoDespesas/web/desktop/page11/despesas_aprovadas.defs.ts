/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/despesas_aprovadas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "O financeiro localiza as despesas aprovadas que ainda aguardam pagamento, confere os dados de cada reembolso e registra a data em que o pagamento foi efetuado.",
  "sections": [
    {
      "id": "filaPagamento",
      "priority": "primary",
      "purpose": "Mantém visível a fila de despesas aprovadas com colaborador, categoria, valor e situação para o financeiro escolher qual reembolso liquidar.",
      "organisms": [
        "approvedExpensesList"
      ]
    },
    {
      "id": "conferenciaPagamento",
      "priority": "main",
      "purpose": "Reúne os dados da despesa escolhida e o registro da data de pagamento no mesmo contexto, para conferir o reembolso e confirmar a liquidação.",
      "organisms": [
        "approvedExpenseDetail",
        "paymentDateForm"
      ]
    }
  ],
  "organisms": {
    "approvedExpensesList": {
      "kind": "list",
      "text": "Mostra as despesas aprovadas que aguardam pagamento, com colaborador, categoria, valor e situação, para o financeiro localizar o próximo reembolso a liquidar.",
      "intents": []
    },
    "approvedExpenseDetail": {
      "kind": "detail",
      "text": "Apresenta colaborador, data, categoria, valor, descrição e situação da despesa aprovada selecionada, para o financeiro conferir o que será pago.",
      "intents": []
    },
    "paymentDateForm": {
      "kind": "form",
      "text": "Permite informar a data em que a despesa aprovada foi paga e confirmar o registro, para marcar o reembolso como pago.",
      "intents": [
        {
          "id": "registrarPagamento",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "approvedExpensesList": [
      {
        "role": "collection",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
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
        "role": "date",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      }
    ]
  }
} as const;
