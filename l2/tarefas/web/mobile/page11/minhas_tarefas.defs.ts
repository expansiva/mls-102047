/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/minhas_tarefas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/workPlanningBoard/page21.md",
    "experience": "timelineList"
  },
  "intent": "No celular, em largura estreita e fluida em torno de 390px (usável de 360px a 430px), ver minhas tarefas, abrir uma de cada vez e agir nela com poucos toques, criando ou ajustando quando preciso.",
  "sections": [
    {
      "id": "secTarefas",
      "priority": "primary",
      "purpose": "Lista compacta das minhas tarefas, com prazo, situação e progresso da checklist, e filtro rápido por criadas por mim, atribuídas a mim, em revisão e devolvidas.",
      "organisms": [
        "tarefasLista"
      ]
    },
    {
      "id": "secTarefaAberta",
      "priority": "main",
      "purpose": "A tarefa aberta empilhada em coluna única, com a checklist e as ações disponíveis logo abaixo.",
      "organisms": [
        "tarefaDetalhe",
        "tarefaAcoes"
      ]
    },
    {
      "id": "secEdicao",
      "priority": "main",
      "purpose": "Formulário em coluna única para criar ou editar a tarefa, trocar o responsável e ajustar a checklist.",
      "organisms": [
        "tarefaForm"
      ]
    },
    {
      "id": "secHistorico",
      "priority": "secondary",
      "purpose": "Histórico da tarefa para consulta quando eu precisar entender o que aconteceu.",
      "organisms": [
        "tarefaHistorico"
      ]
    }
  ],
  "organisms": {
    "tarefasLista": {
      "kind": "list",
      "text": "Tarefas que criei ou pelas quais sou responsável, com lista, responsável, prioridade, prazo, situação, subtarefas e progresso da checklist, destacando as que vencem hoje ou estão atrasadas; filtro por criadas por mim, atribuídas a mim, em revisão e devolvidas.",
      "intents": []
    },
    "tarefaDetalhe": {
      "kind": "detail",
      "text": "A tarefa aberta: descrição, lista, criador, responsável, prazo, situação, motivo da devolução quando houver e checklist com os itens já marcados, para eu saber exatamente o que falta.",
      "intents": []
    },
    "tarefaForm": {
      "kind": "form",
      "text": "Criar ou editar a tarefa: escolho a lista, preencho título, descrição, prioridade e prazo, escolho ou troco o responsável pelo nome e ajusto os itens da checklist; editar não muda a situação.",
      "intents": [
        {
          "id": "salvarNovaTarefa",
          "kind": "submit"
        },
        {
          "id": "salvarEdicaoTarefa",
          "kind": "submit"
        }
      ]
    },
    "tarefaAcoes": {
      "kind": "actions",
      "text": "O que posso fazer com a tarefa agora: iniciar, marcar item da checklist, enviar ou reenviar para revisão, aceitar a entrega, devolver com motivo e cancelar uma tarefa que criei. Para editar ou trocar o responsável, abro o formulário da tarefa.",
      "intents": [
        {
          "id": "iniciarTarefa",
          "kind": "submit"
        },
        {
          "id": "marcarItemChecklist",
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
          "id": "cancelarTarefa",
          "kind": "submit"
        }
      ]
    },
    "tarefaHistorico": {
      "kind": "timeline",
      "text": "Histórico da tarefa: criação, atribuição e aviso ao responsável, início, envio para revisão, aceite ou devolução com motivo, reatribuição e cancelamento.",
      "intents": []
    }
  },
  "molecules": {
    "tarefasLista": [
      {
        "role": "lista de tarefas em tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "filtro criadas por mim, atribuídas a mim, em revisão e devolvidas",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "progresso da checklist compacto",
        "preferred": "groupshowprogress--ml-circular-progress",
        "alternative": "groupshowprogress--ml-linear-progress"
      },
      {
        "role": "busca pelo título",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      }
    ],
    "tarefaDetalhe": [
      {
        "role": "resumo da tarefa aberta",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "item da checklist marcado ou não",
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-toggle-switch"
      },
      {
        "role": "progresso da checklist",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      }
    ],
    "tarefaForm": [
      {
        "role": "escolha da lista",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "escolha ou troca do responsável pelo nome",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "prioridade",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "título e descrição de item da checklist",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "descrição da tarefa",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "prazo",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-compact-calendar"
      }
    ],
    "tarefaAcoes": [
      {
        "role": "ação principal conforme a situação",
        "preferred": "grouptriggeraction--ml-split-button",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "ações secundárias como cancelar",
        "preferred": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "motivo da devolução",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "confirmação do resultado da ação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "tarefaHistorico": [
      {
        "role": "eventos da tarefa em ordem de tempo",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
