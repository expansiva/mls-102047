/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Mostra ao gestor a fila de despesas da equipe que aguardam análise e decisão, para ele ver o que precisa tratar agora e seguir para analisar.",
  "sections": [
    {
      "id": "filaAnalise",
      "priority": "primary",
      "purpose": "Reúne as despesas pendentes da equipe para o gestor identificar rapidamente o que espera a decisão dele e abrir a análise.",
      "organisms": [
        "despesasPendentesEquipe"
      ]
    }
  ],
  "organisms": {
    "despesasPendentesEquipe": {
      "kind": "inbox",
      "text": "Comunica ao gestor as despesas da equipe que estão esperando ele analisar e decidir, para que ele enxergue a fila de pendências e siga para a análise.",
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
    "despesasPendentesEquipe": [
      {
        "role": "viewTable",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "triggerAction",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ]
  }
} as const;
