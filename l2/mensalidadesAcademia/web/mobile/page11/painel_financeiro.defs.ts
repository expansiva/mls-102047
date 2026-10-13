/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/painel_financeiro.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Em conteúdo fluido e estreito (cerca de 390px, também utilizável em 360px e 430px), mostrar à gerência primeiro os totais do mês e a situação dos alunos, depois o lembrete de gerar mensalidades e as vencidas a cobrar.",
  "sections": [
    {
      "id": "resumoDoMes",
      "priority": "primary",
      "purpose": "Mostrar em sequência vertical os totais a receber e recebido e as contagens de alunos ativos, bloqueados e inadimplentes.",
      "organisms": [
        "indicadoresMes"
      ]
    },
    {
      "id": "avisoMensal",
      "priority": "main",
      "purpose": "Lembrar, logo após o resumo, de gerar as mensalidades do mês para os alunos ativos.",
      "organisms": [
        "lembreteGeracao"
      ]
    },
    {
      "id": "inadimplencia",
      "priority": "main",
      "purpose": "Listar as mensalidades vencidas dos inadimplentes com o saldo devedor, em itens fáceis de ler com o polegar.",
      "organisms": [
        "mensalidadesVencidas"
      ]
    },
    {
      "id": "proximosPassos",
      "priority": "secondary",
      "purpose": "Atalhos ao final para abrir uma mensalidade inadimplente ou ir à geração das mensalidades.",
      "organisms": [
        "atalhos"
      ]
    }
  ],
  "organisms": {
    "indicadoresMes": {
      "kind": "highlights",
      "text": "Total a receber e total recebido no mês, e quantos alunos estão ativos, bloqueados e inadimplentes, em indicadores empilhados e compactos.",
      "intents": []
    },
    "lembreteGeracao": {
      "kind": "alerts",
      "text": "Lembrete mensal para gerar as mensalidades do mês para todos os alunos ativos.",
      "intents": []
    },
    "mensalidadesVencidas": {
      "kind": "list",
      "text": "Mensalidades vencidas dos inadimplentes, cada uma com aluno e saldo devedor, para escolher quem cobrar primeiro.",
      "intents": []
    },
    "atalhos": {
      "kind": "actions",
      "text": "Atalhos para abrir uma mensalidade inadimplente ou ir para a geração das mensalidades do mês.",
      "intents": [
        {
          "id": "abrirMensalidadeInadimplente",
          "kind": "navigate",
          "to": "mensalidades"
        },
        {
          "id": "irParaGeracaoMensalidades",
          "kind": "navigate",
          "to": "mensalidades"
        }
      ]
    }
  },
  "molecules": {
    "indicadoresMes": [
      {
        "role": "Indicador de valores do mês",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Contagem de alunos por situação",
        "preferred": "groupviewmetric--ml-compact-metric-sparkline",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "lembreteGeracao": [
      {
        "role": "Aviso persistente no topo do conteúdo",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "mensalidadesVencidas": [
      {
        "role": "Lista de vencidas em itens empilhados",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "atalhos": [
      {
        "role": "Ações de navegação do painel",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ]
  }
} as const;
