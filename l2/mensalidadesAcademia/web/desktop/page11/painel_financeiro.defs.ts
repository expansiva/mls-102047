/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/painel_financeiro.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar à gerência, logo ao abrir, a situação financeira do mês (quanto há a receber, quanto já foi recebido e quantos alunos estão ativos, bloqueados e inadimplentes), o lembrete de gerar as mensalidades e as mensalidades vencidas que pedem cobrança.",
  "sections": [
    {
      "id": "resumoDoMes",
      "priority": "primary",
      "purpose": "Mostrar de relance os totais financeiros do mês e a situação dos alunos, para a gerência saber se o mês está saudável.",
      "organisms": [
        "indicadoresMes"
      ]
    },
    {
      "id": "avisoMensal",
      "priority": "main",
      "purpose": "Lembrar a gerência de gerar as mensalidades do mês para os alunos ativos, para que nenhuma cobrança deixe de existir.",
      "organisms": [
        "lembreteGeracao"
      ]
    },
    {
      "id": "inadimplencia",
      "priority": "main",
      "purpose": "Listar as mensalidades vencidas dos alunos inadimplentes com o saldo devedor de cada uma, para priorizar a cobrança.",
      "organisms": [
        "mensalidadesVencidas"
      ]
    },
    {
      "id": "proximosPassos",
      "priority": "secondary",
      "purpose": "Oferecer atalhos para abrir uma mensalidade inadimplente ou ir à geração das mensalidades do mês.",
      "organisms": [
        "atalhos"
      ]
    }
  ],
  "organisms": {
    "indicadoresMes": {
      "kind": "highlights",
      "text": "Total a receber e total recebido no mês, e quantos alunos estão ativos, bloqueados e inadimplentes, para a gerência avaliar a saúde financeira do mês.",
      "intents": []
    },
    "lembreteGeracao": {
      "kind": "alerts",
      "text": "Lembrete mensal para gerar as mensalidades do mês para todos os alunos ativos, evitando que a cobrança fique sem ser emitida.",
      "intents": []
    },
    "mensalidadesVencidas": {
      "kind": "list",
      "text": "Mensalidades vencidas dos inadimplentes, com o aluno e o saldo devedor de cada uma, para a gerência decidir quem cobrar primeiro.",
      "intents": []
    },
    "atalhos": {
      "kind": "actions",
      "text": "Atalhos para abrir uma mensalidade inadimplente e acompanhar a cobrança, ou ir para a geração das mensalidades do mês.",
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
        "role": "Indicador principal de valor a receber e recebido",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Contagem de alunos ativos, bloqueados e inadimplentes",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "lembreteGeracao": [
      {
        "role": "Aviso persistente no conteúdo da página",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "mensalidadesVencidas": [
      {
        "role": "Lista de mensalidades vencidas com saldo devedor",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-data-table-minimal"
      }
    ],
    "atalhos": [
      {
        "role": "Ações de navegação do painel",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
