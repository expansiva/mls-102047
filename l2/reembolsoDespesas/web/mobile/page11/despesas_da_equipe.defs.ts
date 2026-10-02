/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_da_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Em conteúdo fluido e estreito, cerca de 390px e utilizável em 360px e 430px, o gestor percorre as despesas pendentes da equipe, confere a selecionada e decide aprovar ou rejeitar.",
  "sections": [
    {
      "id": "filaPendentes",
      "priority": "primary",
      "purpose": "Empilha em coluna estreita as despesas pendentes da equipe para o gestor escolher qual analisar no telefone.",
      "organisms": [
        "pendingExpensesList"
      ]
    },
    {
      "id": "analiseDespesa",
      "priority": "main",
      "purpose": "Segue a leitura com os dados, o colaborador e o comprovante da despesa escolhida, em fluxo contínuo utilizável em 360px a 430px.",
      "organisms": [
        "expenseAnalysis"
      ]
    },
    {
      "id": "decisaoDespesa",
      "priority": "secondary",
      "purpose": "Mantém ao final da coluna as ações de aprovar ou rejeitar com motivo, sem exigir grade fixa nem sair do fluxo.",
      "organisms": [
        "expenseDecision"
      ]
    }
  ],
  "organisms": {
    "pendingExpensesList": {
      "kind": "list",
      "text": "Mostra em lista vertical as despesas pendentes da equipe, com colaborador, valor e situação, para o gestor tocar e abrir a que vai analisar.",
      "intents": []
    },
    "expenseAnalysis": {
      "kind": "detail",
      "text": "Apresenta em cartão os dados da despesa, o colaborador e o comprovante, para conferência completa em tela estreita antes da decisão.",
      "intents": []
    },
    "expenseDecision": {
      "kind": "actions",
      "text": "Oferece aprovar a despesa ou rejeitá-la informando o motivo, com controles empilhados ao alcance do polegar.",
      "intents": []
    }
  },
  "molecules": {
    "pendingExpensesList": [
      {
        "role": "searchContent",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "viewData",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "expenseAnalysis": [
      {
        "role": "viewCard",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-media"
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
        "preferred": "groupselectone--ml-radio-group",
        "alternative": "groupselectone--ml-segmented-control"
      },
      {
        "role": "triggerAction",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ]
  }
} as const;
