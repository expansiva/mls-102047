/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/activityNotificationHub/page21.md",
    "experience": "inboxSplit"
  },
  "intent": "Mostrar ao gestor as despesas da equipe que estão esperando análise, para ele perceber de imediato o que precisa decidir.",
  "sections": [
    {
      "id": "caixaEntrada",
      "priority": "primary",
      "purpose": "Reunir na área principal a caixa de entrada das despesas da equipe que ainda aguardam decisão.",
      "organisms": [
        "caixaEntradaDespesas"
      ]
    }
  ],
  "organisms": {
    "caixaEntradaDespesas": {
      "kind": "inbox",
      "text": "Comunica as despesas da equipe que ainda esperam a análise do gestor, para ele saber o que precisa decidir agora e seguir para a análise.",
      "intents": [
        {
          "id": "abrirDespesasDaEquipe",
          "kind": "navigate",
          "to": "despesas_da_equipe"
        }
      ]
    }
  },
  "molecules": {
    "caixaEntradaDespesas": [
      {
        "role": "viewData",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      },
      {
        "role": "triggerAction",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ]
  }
} as const;
