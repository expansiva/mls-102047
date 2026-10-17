/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_gestor.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "No celular, o gestor confere em poucos segundos quantas tarefas da equipe estão abertas, vencem hoje ou estão atrasadas, e depois percorre as tarefas que podem pedir ação dele. O conteúdo ocupa toda a largura estreita, perto de 390px, e continua usável entre 360px e 430px.",
  "sections": [
    {
      "id": "panoramaEquipe",
      "priority": "primary",
      "purpose": "Mostrar primeiro, em blocos empilhados, os totais de abertas, que vencem hoje e atrasadas, e depois as tarefas abertas por lista e o progresso das checklists.",
      "organisms": [
        "destaquesEquipe"
      ]
    },
    {
      "id": "atencaoGestor",
      "priority": "main",
      "purpose": "Lista vertical das tarefas que podem pedir decisão do gestor, com as atrasadas primeiro, para tocar e abrir em Tarefas da equipe.",
      "organisms": [
        "tarefasParaAcao"
      ]
    }
  ],
  "organisms": {
    "destaquesEquipe": {
      "kind": "highlights",
      "text": "Totais compactos de tarefas abertas, que vencem hoje e atrasadas na equipe, seguidos das tarefas abertas por lista e do progresso das checklists.",
      "intents": []
    },
    "tarefasParaAcao": {
      "kind": "inbox",
      "text": "Tarefas da equipe que podem pedir ação do gestor, mostrando título, responsável, prazo e situação, com destaque para atrasadas e as que vencem hoje. Ao tocar numa tarefa, o gestor vai para Tarefas da equipe para trocar o responsável ou cancelar.",
      "intents": [
        {
          "id": "abrirTarefasEquipe",
          "kind": "navigate",
          "to": "tarefas_equipe"
        }
      ]
    }
  },
  "molecules": {
    "destaquesEquipe": [
      {
        "role": "Totais de tarefas abertas, das que vencem hoje e das atrasadas",
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
    "tarefasParaAcao": [
      {
        "role": "Fila de tarefas que pedem ação",
        "preferred": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Abrir a tarefa em Tarefas da equipe",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ]
  }
} as const;
