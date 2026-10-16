/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/meus_avisos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/activityNotificationHub/page21.md",
    "experience": "inboxSplit"
  },
  "intent": "No celular, mostrar primeiro o aviso de hoje e as tarefas abertas que vencem hoje ou estão atrasadas, em uma única coluna de conteúdo fluido. A página foi pensada para uns 390px de largura e continua legível entre 360px e 430px.",
  "sections": [
    {
      "id": "avisosRecebidos",
      "priority": "primary",
      "purpose": "Mostrar os meus avisos por data de referência em uma lista empilhada, com o total de tarefas e de atrasadas, para tocar no aviso que quero abrir.",
      "organisms": [
        "listaAvisos"
      ]
    },
    {
      "id": "avisoAberto",
      "priority": "main",
      "purpose": "Mostrar o aviso escolhido com cada tarefa que vence hoje ou está atrasada, em linhas curtas com o prazo e a situação.",
      "organisms": [
        "detalheAviso"
      ]
    },
    {
      "id": "envioDosAvisos",
      "priority": "secondary",
      "purpose": "Mostrar no final, de forma compacta, quando cada aviso foi gerado e finalizado.",
      "organisms": [
        "historicoAvisos"
      ]
    }
  ],
  "organisms": {
    "listaAvisos": {
      "kind": "list",
      "text": "Meus avisos diários por data de referência, com a quantidade de tarefas e de atrasadas; o aviso de hoje aparece no topo.",
      "intents": []
    },
    "detalheAviso": {
      "kind": "detail",
      "text": "O aviso do dia: as tarefas abertas que vencem hoje ou estão atrasadas, com o prazo e a situação de cada uma.",
      "intents": []
    },
    "historicoAvisos": {
      "kind": "timeline",
      "text": "Quando o sistema gerou e finalizou cada aviso diário às 8h e se o envio falhou.",
      "intents": []
    }
  },
  "molecules": {
    "listaAvisos": [
      {
        "role": "Lista empilhada dos avisos por data de referência",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "Filtro rápido de período",
        "preferred": "groupenterdateinterval--ml-date-interval-presets"
      }
    ],
    "detalheAviso": [
      {
        "role": "Tarefas do aviso em tela estreita",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Total de tarefas e de atrasadas no topo do aviso",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "historicoAvisos": [
      {
        "role": "Linha do tempo compacta do envio dos avisos",
        "preferred": "groupviewdata--ml-timeline-view"
      }
    ]
  }
} as const;
