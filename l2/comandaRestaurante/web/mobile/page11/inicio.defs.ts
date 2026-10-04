/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Em conteúdo fluido para uma tela estreita de referência de 390 px, também utilizável entre 360 px e 430 px, acompanho a disponibilidade das mesas e os valores das comandas em aberto para agir rapidamente no atendimento ou no fechamento.",
  "sections": [
    {
      "id": "visaoGeral",
      "priority": "primary",
      "purpose": "Mantém os indicadores operacionais prioritários em leitura direta para que o caixa ou o garçom confira a situação da casa em dispositivos móveis.",
      "organisms": [
        "resumoOperacional"
      ]
    }
  ],
  "organisms": {
    "resumoOperacional": {
      "kind": "highlights",
      "text": "Mostra de forma compacta a disponibilidade das mesas e os valores das comandas em aberto, apoiando a consulta operacional rápida.",
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
