/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/painel_mensalidades.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Em tela estreita e fluida (por volta de 390px, usável de 360px a 430px), mostrar primeiro os números do mês, depois o lembrete e a geração das mensalidades e, por fim, as mensalidades vencidas e os inadimplentes, em leitura vertical.",
  "sections": [
    {
      "id": "indicadoresDoMes",
      "priority": "primary",
      "purpose": "Mostrar empilhados o total a receber, o total recebido e as quantidades de alunos ativos, bloqueados e inadimplentes do mês.",
      "organisms": [
        "resumoDoMes"
      ]
    },
    {
      "id": "geracaoDoMes",
      "priority": "main",
      "purpose": "Exibir o lembrete mensal e a ação de gerar as mensalidades, com a conferência das geradas em cartões compactos de valor e vencimento.",
      "organisms": [
        "lembreteGeracao",
        "geracaoMensalidades"
      ]
    },
    {
      "id": "inadimplencia",
      "priority": "secondary",
      "purpose": "Listar as mensalidades vencidas e os alunos inadimplentes com situação e total em aberto, em linhas que se adaptam à largura.",
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
        "role": "Indicadores compactos do mês",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
      }
    ],
    "lembreteGeracao": [
      {
        "role": "Lembrete de gerar as mensalidades do mês",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "geracaoMensalidades": [
      {
        "role": "Ação de gerar as mensalidades da competência",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Conferência das mensalidades geradas em tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "Confirmação do resultado da geração",
        "preferred": "groupnotifyuser--ml-toast-notification"
      },
      {
        "role": "Andamento da geração em curso",
        "preferred": "groupshowprogress--ml-indeterminate-spinner"
      }
    ],
    "mensalidadesVencidas": [
      {
        "role": "Lista de vencidas e inadimplentes em tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "Busca do aluno na lista",
        "preferred": "groupsearchcontent--ml-search-bar"
      }
    ]
  }
} as const;
