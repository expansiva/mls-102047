/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_da_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/approvalWorkflow/page21.md",
    "experience": "readAndDecide"
  },
  "intent": "Em coluna estreita e fluida em torno de 390px, também usável em 360px e 430px, o gestor percorre as despesas pendentes da equipe, analisa a selecionada e decide aprovar ou rejeitar informando o motivo.",
  "sections": [
    {
      "id": "pendingQueue",
      "priority": "primary",
      "purpose": "Empilha as despesas pendentes da equipe em faixa estreita para o gestor localizar qual analisar.",
      "organisms": [
        "pendingTeamExpenses"
      ]
    },
    {
      "id": "review",
      "priority": "main",
      "purpose": "Mostra em sequência os dados, o colaborador e o comprovante da despesa escolhida, cabendo em cerca de 390px.",
      "organisms": [
        "expenseReview"
      ]
    },
    {
      "id": "decision",
      "priority": "secondary",
      "purpose": "Mantém aprovação, rejeição e motivo ao alcance do polegar após a leitura da despesa.",
      "organisms": [
        "approvalDecision"
      ]
    }
  ],
  "organisms": {
    "pendingTeamExpenses": {
      "kind": "list",
      "text": "Lista as despesas da equipe que aguardam decisão, com colaborador, data, categoria, valor e situação, para o gestor achar o próximo item em tela estreita.",
      "intents": []
    },
    "expenseReview": {
      "kind": "detail",
      "text": "Exibe os dados da despesa selecionada, o colaborador e o comprovante em bloco vertical, para conferir o reembolso antes de decidir.",
      "intents": []
    },
    "approvalDecision": {
      "kind": "actions",
      "text": "Oferece aprovar a despesa ou rejeitá-la com o motivo, para o gestor concluir a análise sem sair do fluxo estreito.",
      "intents": [
        {
          "id": "approveExpense",
          "kind": "submit"
        },
        {
          "id": "rejectExpense",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "pendingTeamExpenses": [
      {
        "role": "queue",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "expenseReview": [
      {
        "role": "summary",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "approvalDecision": [
      {
        "role": "rejectionReason",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "decision",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
