/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/painel_mensalidades.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar à gerência, numa só tela, a situação financeira do mês, o lembrete e a ação de gerar e conferir as mensalidades da competência, além das mensalidades vencidas e dos alunos inadimplentes que precisam de atenção.",
  "sections": [
    {
      "id": "indicadoresDoMes",
      "priority": "primary",
      "purpose": "Mostrar logo no topo o total a receber e o total recebido no mês e as quantidades de alunos ativos, bloqueados e inadimplentes da competência.",
      "organisms": [
        "resumoDoMes"
      ]
    },
    {
      "id": "geracaoDoMes",
      "priority": "main",
      "purpose": "Lembrar a gerência de gerar as mensalidades do mês e permitir gerar e conferir uma mensalidade por matrícula ativa, com o valor e o vencimento do plano.",
      "organisms": [
        "lembreteGeracao",
        "geracaoMensalidades"
      ]
    },
    {
      "id": "inadimplencia",
      "priority": "secondary",
      "purpose": "Listar as mensalidades vencidas e os alunos inadimplentes, com situação e total em aberto, para acompanhar quem está em atraso.",
      "organisms": [
        "mensalidadesVencidas"
      ]
    }
  ],
  "organisms": {
    "resumoDoMes": {
      "kind": "summary",
      "text": "Total a receber e total recebido no mês, com a quantidade de alunos ativos, bloqueados e inadimplentes da competência.",
      "intents": []
    },
    "lembreteGeracao": {
      "kind": "alerts",
      "text": "Lembrete mensal: gerar as mensalidades do mês, enquanto a competência ainda não tiver mensalidades geradas.",
      "intents": []
    },
    "geracaoMensalidades": {
      "kind": "inbox",
      "text": "Gerar e conferir as mensalidades do mês, uma por matrícula ativa, com o valor e o vencimento do plano, sem duplicar as já geradas.",
      "intents": [
        {
          "id": "gerarMensalidades",
          "kind": "submit"
        },
        {
          "id": "abrirMensalidades",
          "kind": "navigate",
          "to": "mensalidades"
        }
      ]
    },
    "mensalidadesVencidas": {
      "kind": "list",
      "text": "Mensalidades vencidas e alunos inadimplentes, com situação e total em aberto de cada matrícula.",
      "intents": [
        {
          "id": "abrirMatriculas",
          "kind": "navigate",
          "to": "matriculas"
        }
      ]
    }
  },
  "molecules": {
    "resumoDoMes": [
      {
        "role": "Indicadores de total a receber, total recebido e quantidades de alunos",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "lembreteGeracao": [
      {
        "role": "Lembrete persistente de gerar as mensalidades do mês",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "geracaoMensalidades": [
      {
        "role": "Ação de gerar as mensalidades da competência",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "Conferência das mensalidades geradas com valor e vencimento",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "Confirmação do resultado da geração",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "Andamento da geração em curso",
        "preferred": "groupshowprogress--ml-indeterminate-spinner",
        "alternative": "groupshowprogress--ml-linear-progress"
      }
    ],
    "mensalidadesVencidas": [
      {
        "role": "Lista de mensalidades vencidas e inadimplentes",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-grouping-table"
      },
      {
        "role": "Busca do aluno na lista de inadimplentes",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      }
    ]
  }
} as const;
