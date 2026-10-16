/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/minhas_tarefas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/workPlanningBoard/page21.md",
    "experience": "timelineList"
  },
  "intent": "Reunir num só lugar as tarefas que criei ou pelas quais sou responsável, para eu ver o que precisa de mim, abrir uma tarefa, executá-la, revisá-la ou ajustá-la sem trocar de tela.",
  "sections": [
    {
      "id": "secTarefas",
      "priority": "primary",
      "purpose": "Ver minhas tarefas com lista, responsável, prioridade, prazo, situação e progresso da checklist, filtrando por criadas por mim, atribuídas a mim, em revisão e devolvidas.",
      "organisms": [
        "tarefasLista"
      ]
    },
    {
      "id": "secTarefaAberta",
      "priority": "main",
      "purpose": "Mostrar a tarefa escolhida com sua checklist e motivo de devolução, junto às ações que posso tomar agora.",
      "organisms": [
        "tarefaDetalhe",
        "tarefaAcoes"
      ]
    },
    {
      "id": "secEdicao",
      "priority": "main",
      "purpose": "Criar uma nova tarefa ou editar a aberta: lista, título, descrição, prioridade, prazo, responsável e itens da checklist.",
      "organisms": [
        "tarefaForm"
      ]
    },
    {
      "id": "secHistorico",
      "priority": "secondary",
      "purpose": "Entender o que já aconteceu com a tarefa, do registro ao aceite, devolução, reatribuição ou cancelamento.",
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
        "role": "tabela de tarefas com detalhe ao lado",
        "preferred": "groupviewtable--ml-side-detail-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "filtro criadas por mim, atribuídas a mim, em revisão e devolvidas",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "progresso da checklist na linha",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "busca pelo título",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      }
    ],
    "tarefaDetalhe": [
      {
        "role": "resumo da tarefa aberta",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "item da checklist marcado ou não",
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-toggle-icon"
      },
      {
        "role": "progresso da checklist",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-segmented-progress"
      }
    ],
    "tarefaForm": [
      {
        "role": "escolha da lista",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "escolha ou troca do responsável pelo nome",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "prioridade",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "título e descrição de item da checklist",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "descrição da tarefa",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "prazo",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      }
    ],
    "tarefaAcoes": [
      {
        "role": "ações principais conforme a situação",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "ações secundárias como cancelar",
        "preferred": "grouptriggeraction--ml-kebab-action-trigger",
        "alternative": "grouptriggeraction--ml-icon-button"
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
