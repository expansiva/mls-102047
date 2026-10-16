/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/tarefas_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "No celular, em conteúdo fluido estreito (referência de 390px, usável de 360px a 430px), o gestor percorre as tarefas da equipe filtradas, abre uma tarefa e, logo abaixo do detalhe, troca o responsável ou cancela; o histórico fica por último.",
  "sections": [
    {
      "id": "secaoQuadroEquipe",
      "priority": "primary",
      "purpose": "Lista empilhada das tarefas da equipe com filtros recolhíveis, mostrando primeiro situação, prazo e atraso para o gestor achar rápido onde agir.",
      "organisms": [
        "quadroTarefasEquipe"
      ]
    },
    {
      "id": "secaoTarefaSelecionada",
      "priority": "main",
      "purpose": "Detalhe da tarefa aberta em uma coluna, seguido das ações do gestor ao alcance do polegar.",
      "organisms": [
        "detalheTarefa",
        "acoesGestorTarefa"
      ]
    },
    {
      "id": "secaoHistoricoTarefa",
      "priority": "secondary",
      "purpose": "Histórico da tarefa abaixo do detalhe, para consulta quando o gestor precisar de contexto.",
      "organisms": [
        "historicoTarefa"
      ]
    }
  ],
  "organisms": {
    "quadroTarefasEquipe": {
      "kind": "list",
      "text": "Tarefas da equipe em linhas compactas com título, responsável, prazo, situação, prioridade, aviso de vence hoje ou atrasada e progresso da checklist; filtros por lista, responsável, prioridade, prazo e situação e busca pelo título ficam recolhidos acima da lista. Tocar numa tarefa abre o detalhe.",
      "intents": []
    },
    "detalheTarefa": {
      "kind": "detail",
      "text": "Detalhe da tarefa aberta: título, situação e prazo em destaque, depois responsável, quem criou, lista, descrição, tarefa pai, quantidade de subtarefas e checklist com itens feitos e pendentes.",
      "intents": []
    },
    "acoesGestorTarefa": {
      "kind": "actions",
      "text": "Trocar o responsável escolhendo pelo nome uma pessoa ativa da equipe, que é avisada, ou cancelar a tarefa aberta após confirmação.",
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
      "text": "Histórico da tarefa: criação, início, revisões, devoluções com motivo, reatribuições com aviso ao novo responsável, conclusão e cancelamento.",
      "intents": []
    }
  },
  "molecules": {
    "quadroTarefasEquipe": [
      {
        "role": "lista de tarefas adaptada a tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "filtro por lista ou responsável",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "filtro por prioridade ou situação",
        "preferred": "groupselectone--ml-select-dropdown",
        "alternative": "groupselectone--ml-segmented-control"
      },
      {
        "role": "filtro por período de prazo",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-date-interval-drag"
      },
      {
        "role": "busca pelo título",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      }
    ],
    "detalheTarefa": [
      {
        "role": "cartão com os dados da tarefa",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "itens da checklist somente leitura",
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-toggle-icon"
      }
    ],
    "acoesGestorTarefa": [
      {
        "role": "escolha do novo responsável pelo nome",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "botões de reatribuir e cancelar",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "confirmação antes de cancelar",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "retorno da ação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "historicoTarefa": [
      {
        "role": "linha do tempo dos eventos da tarefa",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
