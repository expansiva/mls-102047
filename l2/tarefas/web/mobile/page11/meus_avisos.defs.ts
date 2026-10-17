/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/meus_avisos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/activityNotificationHub/page21.md",
    "experience": "inboxSplit"
  },
  "intent": "No celular, abrir rapidamente o aviso diário das 8h, ver as tarefas que vencem hoje ou estão atrasadas e consultar avisos anteriores, em conteúdo fluido de tela estreita (cerca de 390px, usável de 360px a 430px).",
  "sections": [
    {
      "id": "avisosRecebidos",
      "priority": "primary",
      "purpose": "Listar meus avisos por data de referência em itens empilhados, com quantidade de tarefas e de atrasadas, para eu tocar no aviso desejado.",
      "organisms": [
        "listaAvisos"
      ]
    },
    {
      "id": "conteudoAviso",
      "priority": "main",
      "purpose": "Mostrar o aviso escolhido com totais em destaque e as tarefas vencendo ou atrasadas, cada uma com prazo e situação legíveis em tela estreita.",
      "organisms": [
        "avisoDoDia"
      ]
    },
    {
      "id": "registroEnvio",
      "priority": "secondary",
      "purpose": "Mostrar, abaixo do conteúdo, quando cada aviso foi gerado e finalizado pelo sistema.",
      "organisms": [
        "historicoAvisos"
      ]
    }
  ],
  "organisms": {
    "listaAvisos": {
      "kind": "list",
      "text": "Meus avisos diários por data de referência, mais recentes primeiro, com quantidade de tarefas e de atrasadas e a situação do envio; toco em um aviso para abrir o conteúdo.",
      "intents": []
    },
    "avisoDoDia": {
      "kind": "detail",
      "text": "O aviso aberto: totais de tarefas e de atrasadas no topo e as tarefas abertas que vencem no dia ou já estavam atrasadas, com título, prazo e situação de cada uma.",
      "intents": []
    },
    "historicoAvisos": {
      "kind": "timeline",
      "text": "Quando o sistema gerou e finalizou cada aviso diário às 8h, com indicação de sucesso ou falha.",
      "intents": []
    }
  },
  "molecules": {
    "listaAvisos": [
      {
        "role": "lista de avisos por data",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "filtro por período de referência",
        "preferred": "groupenterdateinterval--ml-date-interval-presets"
      }
    ],
    "avisoDoDia": [
      {
        "role": "totais de tarefas e atrasadas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "tarefas do aviso com prazo e situação",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "historicoAvisos": [
      {
        "role": "geração e finalização dos avisos",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ]
  }
} as const;
