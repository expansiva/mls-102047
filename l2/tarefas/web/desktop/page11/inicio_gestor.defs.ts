/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_gestor.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar ao gestor, logo ao entrar, a visão do andamento da equipe: quantas tarefas estão abertas em cada lista, quantas vencem hoje e quantas estão atrasadas, quanto das checklists já foi feito, e quais tarefas podem pedir que ele troque o responsável ou cancele.",
  "sections": [
    {
      "id": "panoramaEquipe",
      "priority": "primary",
      "purpose": "Mostrar de relance a situação da equipe: tarefas abertas por lista, as que vencem hoje, as atrasadas e o progresso das checklists, para o gestor saber onde olhar primeiro.",
      "organisms": [
        "destaquesEquipe"
      ]
    },
    {
      "id": "tarefasParaAgir",
      "priority": "main",
      "purpose": "Reunir as tarefas da equipe que podem pedir a ação do gestor, como atrasadas ou vencendo hoje, com responsável, lista e prazo, para que ele decida se troca o responsável ou cancela.",
      "organisms": [
        "tarefasPedemAcao"
      ]
    }
  ],
  "organisms": {
    "destaquesEquipe": {
      "kind": "highlights",
      "text": "Tarefas abertas por lista, quantas vencem hoje e quantas estão atrasadas na equipe, com o progresso das checklists. Daqui o gestor pode abrir o quadro da equipe ou a lista de listas para aprofundar.",
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
      "text": "Tarefas da equipe que podem pedir minha ação: atrasadas ou vencendo hoje, com título, lista, responsável, prioridade, prazo, situação e progresso da checklist. Ao escolher uma, o gestor vai para Tarefas da equipe para trocar o responsável ou cancelar.",
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
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Tarefas abertas por lista",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "Progresso das checklists",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      }
    ],
    "tarefasPedemAcao": [
      {
        "role": "Tarefas que pedem ação",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      },
      {
        "role": "Abrir a tarefa para agir",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "Paginar as tarefas",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ]
  }
} as const;
