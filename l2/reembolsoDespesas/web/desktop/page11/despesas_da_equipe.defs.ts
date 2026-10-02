/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/despesas_da_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/approvalWorkflow/page21.md",
    "experience": "readAndDecide"
  },
  "intent": "O gestor da equipe localiza as despesas pendentes, confere dados e comprovante e decide aprovar ou rejeitar com o motivo.",
  "sections": [
    {
      "id": "pendingQueue",
      "priority": "main",
      "purpose": "Lista as despesas da equipe que aguardam decisão para o gestor escolher qual analisar.",
      "organisms": [
        "pendingTeamExpenses"
      ]
    },
    {
      "id": "review",
      "priority": "primary",
      "purpose": "Mostra os dados, o colaborador e o comprovante da despesa escolhida para conferência antes da decisão.",
      "organisms": [
        "expenseReview"
      ]
    },
    {
      "id": "decision",
      "priority": "secondary",
      "purpose": "Reúne a aprovação e a rejeição com motivo para concluir a análise da despesa.",
      "organisms": [
        "approvalDecision"
      ]
    }
  ],
  "organisms": {
    "pendingTeamExpenses": {
      "kind": "list",
      "text": "Mostra as despesas da equipe que ainda aguardam decisão, com colaborador, data, categoria, valor e situação, para o gestor localizar o que precisa analisar.",
      "intents": []
    },
    "expenseReview": {
      "kind": "detail",
      "text": "Apresenta os dados da despesa selecionada, o colaborador responsável e o comprovante, para o gestor conferir se o reembolso é devido.",
      "intents": []
    },
    "approvalDecision": {
      "kind": "actions",
      "text": "Permite aprovar a despesa para pagamento ou rejeitá-la registrando o motivo, encerrando a análise da equipe.",
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
        "preferred": "groupviewtable--ml-grouping-table",
        "alternative": "groupviewtable--ml-data-table"
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
