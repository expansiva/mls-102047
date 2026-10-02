/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_aprovadas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Em uma coluna estreita e contínua, o financeiro percorre as despesas aprovadas que aguardam pagamento, confere os dados da escolhida e informa a data em que o reembolso foi pago.",
  "sections": [
    {
      "id": "filaPagamento",
      "priority": "primary",
      "purpose": "No fluxo estreito em torno de 390px, ainda usável em 360px e 430px, a lista vem primeiro para localizar rapidamente a despesa aprovada a pagar.",
      "organisms": [
        "approvedExpensesList"
      ]
    },
    {
      "id": "conferenciaDespesa",
      "priority": "main",
      "purpose": "O detalhe da despesa selecionada segue em conteúdo fluido e estreito, para conferir colaborador, valor e descrição antes de registrar o pagamento.",
      "organisms": [
        "approvedExpenseDetail"
      ]
    },
    {
      "id": "registroPagamento",
      "priority": "secondary",
      "purpose": "O campo da data de pagamento fecha o fluxo estreito, ao alcance após a conferência, para confirmar a liquidação da despesa aprovada.",
      "organisms": [
        "paymentDateForm"
      ]
    }
  ],
  "organisms": {
    "approvedExpensesList": {
      "kind": "list",
      "text": "Lista em coluna as despesas aprovadas que aguardam pagamento, destacando colaborador, categoria, valor e situação para escolher qual reembolso liquidar.",
      "intents": []
    },
    "approvedExpenseDetail": {
      "kind": "detail",
      "text": "Mostra em bloco contínuo os dados da despesa aprovada selecionada — colaborador, data, categoria, valor, descrição e situação — para conferência antes do pagamento.",
      "intents": []
    },
    "paymentDateForm": {
      "kind": "form",
      "text": "Oferece a data de pagamento da despesa aprovada no final do fluxo estreito, para o financeiro registrar quando o reembolso foi pago.",
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
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
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
        "role": "date",
        "preferred": "groupenterdate--ml-compact-calendar",
        "alternative": "groupenterdate--ml-date-picker"
      }
    ]
  }
} as const;
