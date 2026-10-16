/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_membro.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Mostrar ao membro da equipe, logo ao entrar, a situação das suas tarefas abertas, o aviso diário de vencimentos de hoje e tudo o que espera por uma ação dele, para que comece o dia sabendo o que fazer primeiro.",
  "sections": [
    {
      "id": "panoramaTarefas",
      "priority": "primary",
      "purpose": "Dar a visão imediata de quantas tarefas estão abertas, quantas vencem hoje e quantas estão atrasadas, com o progresso da checklist de cada uma.",
      "organisms": [
        "resumoMinhasTarefas"
      ]
    },
    {
      "id": "pendenciasComigo",
      "priority": "main",
      "purpose": "Concentrar o que depende de mim agora: tarefas para iniciar, entregas para revisar e tarefas devolvidas para ajustar e reenviar, com a ação certa ao alcance.",
      "organisms": [
        "caixaPendencias"
      ]
    },
    {
      "id": "avisoDoDia",
      "priority": "secondary",
      "purpose": "Lembrar do aviso diário das 8h e permitir abrir o aviso de hoje com as tarefas que vencem hoje ou estão atrasadas.",
      "organisms": [
        "alertaAvisoDiario"
      ]
    }
  ],
  "organisms": {
    "resumoMinhasTarefas": {
      "kind": "summary",
      "text": "Minhas tarefas abertas, quantas vencem hoje e quantas estão atrasadas, com o progresso da checklist de cada uma, para eu saber onde está o risco de prazo.",
      "intents": [
        {
          "id": "abrirMinhasTarefas",
          "kind": "navigate",
          "to": "minhas_tarefas"
        }
      ]
    },
    "alertaAvisoDiario": {
      "kind": "alerts",
      "text": "Aviso diário das 8h: mostra a data do aviso, quantas tarefas ele traz e quantas estão atrasadas; abro o aviso de hoje e vejo minhas tarefas que vencem hoje ou estão atrasadas.",
      "intents": [
        {
          "id": "abrirMeusAvisos",
          "kind": "navigate",
          "to": "meus_avisos"
        }
      ]
    },
    "caixaPendencias": {
      "kind": "inbox",
      "text": "O que espera por mim: tarefas atribuídas para iniciar, tarefas em andamento para enviar à revisão, entregas enviadas para eu revisar (aceitar ou devolver com motivo) e tarefas devolvidas, com o motivo da devolução, para eu ajustar e reenviar.",
      "intents": [
        {
          "id": "iniciarTarefa",
          "kind": "submit"
        },
        {
          "id": "enviarParaRevisao",
          "kind": "submit"
        },
        {
          "id": "aceitarEntrega",
          "kind": "submit"
        },
        {
          "id": "devolverComMotivo",
          "kind": "submit"
        },
        {
          "id": "abrirTarefaParaAjustar",
          "kind": "navigate",
          "to": "minhas_tarefas"
        }
      ]
    }
  },
  "molecules": {
    "resumoMinhasTarefas": [
      {
        "role": "Indicadores de abertas, vencendo hoje e atrasadas",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Progresso da checklist de cada tarefa",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "Lista das tarefas abertas com prazo e situação",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "alertaAvisoDiario": [
      {
        "role": "Destaque persistente do aviso de hoje com ação para abri-lo",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "Tarefas trazidas pelo aviso com prazo e situação do prazo",
        "preferred": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "caixaPendencias": [
      {
        "role": "Alternar entre para iniciar, para revisar e devolvidas",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "Itens pendentes com título, prazo, prioridade e quem age",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      },
      {
        "role": "Ações do item: iniciar, enviar, aceitar ou devolver",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
