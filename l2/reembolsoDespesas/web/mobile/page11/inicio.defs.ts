/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/activityNotificationHub/page21.md",
    "experience": "inboxSplit"
  },
  "intent": "Mostrar em coluna fluida e estreita, em torno de 390px e usável em 360px e 430px, as despesas da equipe que esperam análise, para o gestor ver o que precisa decidir.",
  "sections": [
    {
      "id": "caixaEntrada",
      "priority": "primary",
      "purpose": "Empilhar em leitura contínua e estreita, fluida em torno de 390px e usável em 360px e 430px, a caixa de entrada das despesas pendentes da equipe.",
      "organisms": [
        "caixaEntradaDespesas"
      ]
    }
  ],
  "organisms": {
    "caixaEntradaDespesas": {
      "kind": "inbox",
      "text": "Comunica em leitura estreita as despesas da equipe que ainda esperam análise, para o gestor identificar o que precisa decidir mesmo em tela estreita e seguir para a análise.",
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
