/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_membro.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Em uma tela estreita, em torno de 390px e utilizável de 360px a 430px, mostrar primeiro ao membro o que depende dele e a situação dos seus prazos, com o aviso diário de hoje à mão, em conteúdo fluido de uma coluna rolável.",
  "sections": [
    {
      "id": "panoramaTarefas",
      "priority": "primary",
      "purpose": "Indicadores compactos de tarefas abertas, vencendo hoje e atrasadas, empilhados no topo para leitura rápida com o polegar.",
      "organisms": [
        "resumoMinhasTarefas"
      ]
    },
    {
      "id": "pendenciasComigo",
      "priority": "main",
      "purpose": "Fila do que espera por mim, em itens empilhados com a ação principal visível e as demais acessíveis no próprio item.",
      "organisms": [
        "caixaPendencias"
      ]
    },
    {
      "id": "avisoDoDia",
      "priority": "secondary",
      "purpose": "Chamada curta para abrir o aviso diário das 8h com as tarefas que vencem hoje ou estão atrasadas.",
      "organisms": [
        "alertaAvisoDiario"
      ]
    }
  ],
  "organisms": {
    "resumoMinhasTarefas": {
      "kind": "summary",
      "text": "Minhas tarefas abertas, quantas vencem hoje e quantas estão atrasadas, com o progresso da checklist de cada uma, em blocos compactos que se ajustam à largura da tela.",
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
      "text": "Aviso diário das 8h: data, total de tarefas e atrasadas; toco para abrir o aviso de hoje e ver as tarefas que vencem hoje ou estão atrasadas.",
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
      "text": "O que espera por mim: tarefas para iniciar, tarefas para enviar à revisão, entregas para eu aceitar ou devolver com motivo e tarefas devolvidas, com o motivo, para ajustar e reenviar.",
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
        "role": "Indicadores compactos de abertas, vencendo hoje e atrasadas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Progresso da checklist por tarefa",
        "preferred": "groupshowprogress--ml-linear-progress"
      },
      {
        "role": "Tarefas abertas empilhadas",
        "preferred": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "alertaAvisoDiario": [
      {
        "role": "Chamada do aviso de hoje com ação para abrir",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "Tarefas do aviso com prazo e situação",
        "preferred": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "caixaPendencias": [
      {
        "role": "Filtrar entre para iniciar, para revisar e devolvidas",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "Itens pendentes empilhados",
        "preferred": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Ação principal do item com alternativas",
        "preferred": "grouptriggeraction--ml-split-button",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      }
    ]
  }
} as const;
