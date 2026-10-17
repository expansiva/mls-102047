/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_membro.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Início compacto do membro em tela estreita e fluida (cerca de 390px, usável de 360px a 430px): primeiro o aviso das 8h e o que espera por mim, depois os números das minhas tarefas abertas, para agir rápido com uma mão.",
  "sections": [
    {
      "id": "secaoAvisoDiario",
      "priority": "primary",
      "purpose": "Mostrar logo no topo se há tarefas vencendo hoje ou atrasadas segundo o aviso das 8h.",
      "organisms": [
        "avisoDoDia"
      ]
    },
    {
      "id": "secaoPendencias",
      "priority": "main",
      "purpose": "Listar em pilha o que depende de mim, com a ação principal de cada item ao alcance do toque.",
      "organisms": [
        "esperaPorMim"
      ]
    },
    {
      "id": "secaoResumo",
      "priority": "secondary",
      "purpose": "Resumir em indicadores curtos as tarefas abertas, as que vencem hoje e as atrasadas, com o progresso da checklist.",
      "organisms": [
        "resumoMinhasTarefas"
      ]
    }
  ],
  "organisms": {
    "resumoMinhasTarefas": {
      "kind": "summary",
      "text": "Minhas tarefas abertas, quantas vencem hoje e quantas estão atrasadas, com o progresso da checklist de cada uma, em leitura rápida.",
      "intents": [
        {
          "id": "abrirMinhasTarefas",
          "kind": "navigate",
          "to": "minhas_tarefas"
        }
      ]
    },
    "avisoDoDia": {
      "kind": "alerts",
      "text": "Aviso diário das 8h: quantas tarefas vencem hoje e quantas estão atrasadas; toco para abrir o aviso e ver cada tarefa com prazo e situação.",
      "intents": [
        {
          "id": "abrirMeusAvisos",
          "kind": "navigate",
          "to": "meus_avisos"
        }
      ]
    },
    "esperaPorMim": {
      "kind": "inbox",
      "text": "O que espera por mim: tarefas para iniciar, para enviar à revisão, entregas para aceitar ou devolver com motivo e tarefas devolvidas para ajustar e reenviar.",
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
        "role": "indicadores de abertas, vencem hoje e atrasadas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "progresso da checklist por tarefa",
        "preferred": "groupshowprogress--ml-linear-progress"
      }
    ],
    "avisoDoDia": [
      {
        "role": "destaque do aviso de hoje",
        "preferred": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "esperaPorMim": [
      {
        "role": "separar iniciar, revisar e ajustar",
        "preferred": "groupnavigatesection--ml-navigate-pills"
      },
      {
        "role": "itens pendentes",
        "preferred": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "ação principal do item",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "ações secundárias do item",
        "preferred": "grouptriggeraction--ml-kebab-action-trigger"
      }
    ]
  }
} as const;
