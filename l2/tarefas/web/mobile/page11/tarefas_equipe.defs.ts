/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/tarefas_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/workPlanningBoard/page21.md",
    "experience": "timelineList"
  },
  "intent": "No celular, permitir ao gestor percorrer as tarefas da equipe em uma coluna fluida (cerca de 390px, usável entre 360px e 430px), filtrar, abrir uma tarefa e, a partir dela, trocar o responsável ou cancelar.",
  "sections": [
    {
      "id": "quadroEquipe",
      "priority": "primary",
      "purpose": "Lista compacta das tarefas da equipe com filtros recolhíveis, destacando atrasadas e as que vencem hoje.",
      "organisms": [
        "tarefasEquipe"
      ]
    },
    {
      "id": "tarefaSelecionada",
      "priority": "main",
      "purpose": "Ao tocar numa tarefa, mostrar seu detalhe empilhado e logo abaixo as ações do gestor.",
      "organisms": [
        "detalheTarefa",
        "acoesGestor"
      ]
    },
    {
      "id": "historico",
      "priority": "secondary",
      "purpose": "Histórico da tarefa ao final, consultado quando o gestor precisa entender o contexto.",
      "organisms": [
        "historicoTarefa"
      ]
    }
  ],
  "organisms": {
    "tarefasEquipe": {
      "kind": "list",
      "text": "Tarefas da equipe com título, responsável, prazo, situação e prioridade, filtráveis por lista, responsável, prioridade, prazo e situação, com sinal para as que vencem hoje ou estão atrasadas.",
      "intents": []
    },
    "detalheTarefa": {
      "kind": "detail",
      "text": "Detalhe da tarefa tocada: descrição, criador, responsável, prazo, situação, subtarefas e checklist com o progresso.",
      "intents": []
    },
    "acoesGestor": {
      "kind": "actions",
      "text": "Trocar o responsável escolhendo uma pessoa ativa da equipe, que é avisada, ou cancelar a tarefa aberta.",
      "intents": [
        {
          "id": "reatribuirTarefa",
          "kind": "submit"
        },
        {
          "id": "cancelarTarefa",
          "kind": "submit"
        }
      ]
    },
    "historicoTarefa": {
      "kind": "timeline",
      "text": "Histórico da tarefa: criação, início, revisões, devoluções, reatribuições com aviso ao novo responsável e cancelamento.",
      "intents": []
    }
  },
  "molecules": {
    "tarefasEquipe": [
      {
        "role": "Lista das tarefas adaptada a tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "Filtro por lista, responsável, prioridade ou situação",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Filtro por período de prazo",
        "preferred": "groupenterdateinterval--ml-date-interval-presets"
      },
      {
        "role": "Busca pelo título da tarefa",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      }
    ],
    "detalheTarefa": [
      {
        "role": "Resumo da tarefa tocada",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Itens da checklist em ordem",
        "preferred": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "acoesGestor": [
      {
        "role": "Escolha do novo responsável pelo nome",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Ações de reatribuir e cancelar",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "Confirmação antes de cancelar",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "Retorno após reatribuir ou cancelar",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "historicoTarefa": [
      {
        "role": "Eventos da tarefa em ordem de tempo",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
