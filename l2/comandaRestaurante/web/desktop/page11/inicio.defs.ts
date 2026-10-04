/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Acompanho em uma visão geral quais mesas estão disponíveis e os valores das comandas em aberto para orientar o atendimento ou o fechamento.",
  "sections": [
    {
      "id": "visaoGeral",
      "priority": "primary",
      "purpose": "Reúne os indicadores operacionais que permitem ao caixa ou ao garçom entender rapidamente a disponibilidade das mesas e os valores em aberto.",
      "organisms": [
        "resumoOperacional"
      ]
    }
  ],
  "organisms": {
    "resumoOperacional": {
      "kind": "highlights",
      "text": "Apresenta a disponibilidade das mesas e os valores das comandas em aberto, para apoiar a decisão imediata sobre atendimento e fechamento.",
      "intents": []
    }
  },
  "molecules": {
    "resumoOperacional": [
      {
        "role": "indicadores operacionais",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ]
  }
} as const;
