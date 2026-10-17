/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/minhas_tarefas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/workPlanningBoard/page21.md",
    "experience": "timelineList"
  },
  "intent": "No celular, ver de relance minhas tarefas e agir na que importa agora: abrir, marcar checklist, iniciar, enviar, revisar ou criar uma nova tarefa. O conteúdo é fluido, em uma coluna estreita de cerca de 390px, e continua usável entre 360px e 430px.",
  "sections": [
    {
      "id": "secTarefas",
      "priority": "primary",
      "purpose": "Mostrar minhas tarefas em uma lista empilhada, com filtros rápidos que se movem na horizontal e prazo e situação visíveis em cada item.",
      "organisms": [
        "listaTarefas"
      ]
    },
    {
      "id": "secTarefaAberta",
      "priority": "main",
      "purpose": "Ao tocar em uma tarefa, mostrar seus dados e a checklist, com as ações de ciclo do meu papel logo abaixo e fáceis de alcançar com o polegar.",
      "organisms": [
        "detalheTarefa",
        "acoesTarefa"
      ]
    },
    {
      "id": "secEdicao",
      "priority": "main",
      "purpose": "Criar ou editar a tarefa com os campos empilhados, um por linha, na largura disponível, incluindo marcar itens da checklist e trocar o responsável.",
      "organisms": [
        "formTarefa"
      ]
    },
    {
      "id": "secHistorico",
      "priority": "secondary",
      "purpose": "Histórico da tarefa em seção recolhida, abaixo do detalhe, para quando eu precisar entender o que já aconteceu.",
      "organisms": [
        "historicoTarefa"
      ]
    }
  ],
  "organisms": {
    "listaTarefas": {
      "kind": "list",
      "text": "Tarefas que criei ou pelas quais sou responsável, cada uma com título, lista, responsável, prioridade, prazo, situação, subtarefas e progresso da checklist. Destaca as que vencem hoje ou estão atrasadas e filtra por criadas por mim, atribuídas a mim, em revisão e devolvidas.",
      "intents": []
    },
    "detalheTarefa": {
      "kind": "detail",
      "text": "A tarefa aberta: descrição, lista, criador, responsável, prazo, prioridade, situação, motivo da devolução em destaque quando houver e checklist com os itens marcados.",
      "intents": []
    },
    "formTarefa": {
      "kind": "form",
      "text": "Criar ou editar a tarefa: escolho a lista, preencho título, descrição, prioridade e prazo, escolho ou troco o responsável pelo nome e ajusto ou marco os itens da checklist. Editar não muda a situação da tarefa.",
      "intents": [
        {
          "id": "criarTarefa",
          "kind": "submit"
        },
        {
          "id": "salvarEdicao",
          "kind": "submit"
        },
        {
          "id": "salvarChecklist",
          "kind": "submit"
        }
      ]
    },
    "acoesTarefa": {
      "kind": "actions",
      "text": "Ações de ciclo conforme meu papel na tarefa: como responsável, iniciar e enviar ou reenviar para revisão; como criador, aceitar a entrega, devolver com motivo ou cancelar. A ação principal fica em destaque e as demais ficam em um menu; marcar a checklist e trocar o responsável ficam no formulário.",
      "intents": [
        {
          "id": "iniciar",
          "kind": "submit"
        },
        {
          "id": "enviarRevisao",
          "kind": "submit"
        },
        {
          "id": "aceitar",
          "kind": "submit"
        },
        {
          "id": "devolver",
          "kind": "submit"
        },
        {
          "id": "cancelar",
          "kind": "submit"
        }
      ]
    },
    "historicoTarefa": {
      "kind": "timeline",
      "text": "Histórico da tarefa: criação, atribuição e aviso ao responsável, início, envio para revisão, aceite ou devolução com motivo, reatribuição e cancelamento.",
      "intents": []
    }
  },
  "molecules": {
    "listaTarefas": [
      {
        "role": "lista de tarefas",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "filtros rápidos",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "progresso da checklist",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "busca por título",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      }
    ],
    "detalheTarefa": [
      {
        "role": "cartão da tarefa",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "item da checklist",
        "preferred": "groupenterboolean--ml-checkbox-preference"
      },
      {
        "role": "motivo da devolução",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "formTarefa": [
      {
        "role": "lista da tarefa",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-select-one-autocomplete"
      },
      {
        "role": "responsável",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "prioridade",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "título e item da checklist",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "descrição",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "prazo",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      }
    ],
    "acoesTarefa": [
      {
        "role": "ação principal",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "ações secundárias",
        "preferred": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "motivo da devolução",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "confirmação da ação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-alert-modal"
      }
    ],
    "historicoTarefa": [
      {
        "role": "linha do tempo",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
