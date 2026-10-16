/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/tarefas_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Dar ao gestor a visão de todas as tarefas da equipe, com filtros por lista, responsável, prioridade, prazo e situação, e permitir abrir uma tarefa para ver o andamento, trocar o responsável ou cancelá-la.",
  "sections": [
    {
      "id": "secaoQuadroEquipe",
      "priority": "primary",
      "purpose": "Mostrar todas as tarefas da equipe filtradas, destacando situação, prazo, atrasos e progresso da checklist, para o gestor localizar onde precisa agir.",
      "organisms": [
        "quadroTarefasEquipe"
      ]
    },
    {
      "id": "secaoTarefaSelecionada",
      "priority": "main",
      "purpose": "Exibir a tarefa escolhida no quadro, com quem criou, quem é responsável, prazo, situação, subtarefas e checklist, junto das ações do gestor sobre ela.",
      "organisms": [
        "detalheTarefa",
        "acoesGestorTarefa"
      ]
    },
    {
      "id": "secaoHistoricoTarefa",
      "priority": "secondary",
      "purpose": "Contar o que já aconteceu com a tarefa escolhida para o gestor entender o contexto antes de decidir.",
      "organisms": [
        "historicoTarefa"
      ]
    }
  ],
  "organisms": {
    "quadroTarefasEquipe": {
      "kind": "list",
      "text": "Quadro com todas as tarefas da equipe: título, lista, responsável, prioridade, prazo, situação, indicação de vence hoje ou atrasada e progresso da checklist. O gestor filtra por lista, responsável, prioridade, período de prazo e situação, busca pelo título e escolhe uma tarefa para ver o detalhe.",
      "intents": []
    },
    "detalheTarefa": {
      "kind": "detail",
      "text": "Detalhe da tarefa escolhida: título, descrição, lista, quem criou, responsável atual, prazo, situação, tarefa pai quando houver, quantidade de subtarefas e a checklist com os itens feitos e pendentes.",
      "intents": []
    },
    "acoesGestorTarefa": {
      "kind": "actions",
      "text": "Ações do gestor sobre a tarefa escolhida: trocar o responsável escolhendo pelo nome uma pessoa ativa da equipe, que passa a agir agora e é avisada, ou cancelar a tarefa enquanto ainda estiver aberta, com confirmação antes de cancelar.",
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
      "text": "Histórico da tarefa escolhida em ordem de tempo: criação, início, envios para revisão, devoluções com motivo, reatribuições com aviso ao novo responsável, conclusão e cancelamento.",
      "intents": []
    }
  },
  "molecules": {
    "quadroTarefasEquipe": [
      {
        "role": "tabela de tarefas da equipe com ordenação e agrupamento por situação",
        "preferred": "groupviewtable--ml-advanced-data-table",
        "alternative": "groupviewtable--ml-grouping-table"
      },
      {
        "role": "filtro por lista ou responsável",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "filtro por prioridade ou situação",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "filtro por período de prazo",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-date-range-dual-calendar"
      },
      {
        "role": "busca pelo título da tarefa",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      }
    ],
    "detalheTarefa": [
      {
        "role": "cartão com os dados da tarefa",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "itens da checklist marcados como feitos ou pendentes, somente leitura",
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
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação antes de cancelar",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "retorno da reatribuição ou do cancelamento",
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
