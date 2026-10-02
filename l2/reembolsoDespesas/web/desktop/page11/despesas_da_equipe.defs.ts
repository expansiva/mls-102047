/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/despesas_da_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Permite ao gestor da equipe localizar as despesas que aguardam aprovação, conferir dados e comprovante de cada uma e concluir a decisão de aprovar ou rejeitar.",
  "sections": [
    {
      "id": "filaPendentes",
      "priority": "primary",
      "purpose": "Apresenta a fila de despesas da equipe ainda sem decisão para o gestor localizar o item que precisa analisar.",
      "organisms": [
        "pendingExpensesList"
      ]
    },
    {
      "id": "analiseDespesa",
      "priority": "main",
      "purpose": "Reúne colaborador, dados da despesa e comprovante da solicitação selecionada para o gestor conferir se o reembolso procede.",
      "organisms": [
        "expenseAnalysis"
      ]
    },
    {
      "id": "decisaoDespesa",
      "priority": "secondary",
      "purpose": "Disponibiliza a aprovação ou a rejeição com motivo para o gestor encerrar a análise da despesa da equipe.",
      "organisms": [
        "expenseDecision"
      ]
    }
  ],
  "organisms": {
    "pendingExpensesList": {
      "kind": "list",
      "text": "Lista as despesas da equipe em aguardo de aprovação, com colaborador, data, categoria, valor e situação, para o gestor localizar rapidamente o que precisa decidir.",
      "intents": []
    },
    "expenseAnalysis": {
      "kind": "detail",
      "text": "Mostra os dados da despesa selecionada, quem registrou e o comprovante, para o gestor avaliar se o reembolso está correto antes de decidir.",
      "intents": []
    },
    "expenseDecision": {
      "kind": "actions",
      "text": "Apresenta as ações de aprovar a despesa ou rejeitá-la informando o motivo, para o gestor registrar a decisão da equipe.",
      "intents": []
    }
  },
  "molecules": {
    "pendingExpensesList": [
      {
        "role": "searchContent",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "viewTable",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "expenseAnalysis": [
      {
        "role": "viewCard",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "expenseDecision": [
      {
        "role": "enterText",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "selectOne",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "triggerAction",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
