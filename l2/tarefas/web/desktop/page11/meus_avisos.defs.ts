/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/meus_avisos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/activityNotificationHub/page21.md",
    "experience": "inboxSplit"
  },
  "intent": "Mostrar ao responsável os seus avisos diários de vencimento, para que ele saiba quais tarefas abertas vencem hoje ou estão atrasadas e acompanhe quando cada aviso foi gerado e entregue.",
  "sections": [
    {
      "id": "avisosRecebidos",
      "priority": "primary",
      "purpose": "Mostrar todos os meus avisos diários por data de referência, com o total de tarefas e de atrasadas, para escolher qual aviso abrir.",
      "organisms": [
        "listaAvisos"
      ]
    },
    {
      "id": "avisoAberto",
      "priority": "main",
      "purpose": "Mostrar o aviso escolhido com as tarefas abertas que vencem hoje ou estão atrasadas, com o prazo e a situação de cada uma.",
      "organisms": [
        "detalheAviso"
      ]
    },
    {
      "id": "envioDosAvisos",
      "priority": "secondary",
      "purpose": "Mostrar quando o processo das 8h gerou e finalizou cada aviso e se o envio teve sucesso ou falhou.",
      "organisms": [
        "historicoAvisos"
      ]
    }
  ],
  "organisms": {
    "listaAvisos": {
      "kind": "list",
      "text": "Meus avisos diários por data de referência, com a quantidade de tarefas e de atrasadas em cada um; o aviso de hoje aparece primeiro.",
      "intents": []
    },
    "detalheAviso": {
      "kind": "detail",
      "text": "O aviso do dia: as tarefas abertas que vencem hoje ou estão atrasadas, com o título, o prazo e a situação do prazo de cada uma.",
      "intents": []
    },
    "historicoAvisos": {
      "kind": "timeline",
      "text": "Quando o sistema gerou e finalizou cada aviso diário às 8h, com a situação do envio e o motivo quando houve falha.",
      "intents": []
    }
  },
  "molecules": {
    "listaAvisos": [
      {
        "role": "Lista dos avisos por data de referência com totais",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Filtro do período das datas de referência",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-date-range-dual-calendar"
      }
    ],
    "detalheAviso": [
      {
        "role": "Tarefas do aviso com o prazo e a situação do prazo",
        "preferred": "groupviewtable--ml-view-table",
        "alternative": "groupviewtable--ml-data-table-minimal"
      },
      {
        "role": "Totais de tarefas e de atrasadas do aviso",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "historicoAvisos": [
      {
        "role": "Linha do tempo da geração e da finalização dos avisos",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
