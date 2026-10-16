/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_gestor.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "No celular, em uma coluna fluida de cerca de 390px que também funciona em 360px e 430px, o gestor vê primeiro os números da equipe (abertas, vencendo hoje e atrasadas) e logo abaixo as tarefas que podem pedir que ele troque o responsável ou cancele.",
  "sections": [
    {
      "id": "panoramaEquipe",
      "priority": "primary",
      "purpose": "Mostrar em blocos compactos, empilhados, os totais de abertas, vencendo hoje e atrasadas, seguidos das tarefas abertas por lista e do progresso das checklists.",
      "organisms": [
        "destaquesEquipe"
      ]
    },
    {
      "id": "tarefasParaAgir",
      "priority": "main",
      "purpose": "Listar em cartões de leitura rápida as tarefas atrasadas ou vencendo hoje, com responsável e prazo em destaque, para que o gestor toque e vá agir.",
      "organisms": [
        "tarefasPedemAcao"
      ]
    }
  ],
  "organisms": {
    "destaquesEquipe": {
      "kind": "highlights",
      "text": "Tarefas abertas por lista, quantas vencem hoje e quantas estão atrasadas na equipe, com o progresso das checklists, em leitura curta e vertical. Um toque leva ao quadro da equipe ou às listas.",
      "intents": [
        {
          "id": "abrirTarefasEquipe",
          "kind": "navigate",
          "to": "tarefas_equipe"
        },
        {
          "id": "abrirListas",
          "kind": "navigate",
          "to": "listas"
        }
      ]
    },
    "tarefasPedemAcao": {
      "kind": "inbox",
      "text": "Tarefas da equipe que podem pedir minha ação, com título, responsável, prazo e situação visíveis em cada cartão. Ao tocar em uma, o gestor vai para Tarefas da equipe para trocar o responsável ou cancelar.",
      "intents": [
        {
          "id": "agirNaTarefa",
          "kind": "navigate",
          "to": "tarefas_equipe"
        }
      ]
    }
  },
  "molecules": {
    "destaquesEquipe": [
      {
        "role": "Totais de abertas, vencendo hoje e atrasadas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Tarefas abertas por lista",
        "preferred": "groupviewchart--ml-bar-chart"
      },
      {
        "role": "Progresso das checklists",
        "preferred": "groupshowprogress--ml-linear-progress"
      }
    ],
    "tarefasPedemAcao": [
      {
        "role": "Tarefas que pedem ação",
        "preferred": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Abrir a tarefa para agir",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      },
      {
        "role": "Paginar as tarefas",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ]
  }
} as const;
