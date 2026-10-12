/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/desktop/page11/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Painel inicial da locadora para atendente e gerente: mostra primeiro os contratos em atraso, que pedem ação imediata, e em seguida quantos equipamentos estão disponíveis, locados e em manutenção, com o contrato vigente e a data prevista de devolução de cada equipamento locado.",
  "sections": [
    {
      "id": "alertasAtraso",
      "priority": "primary",
      "purpose": "Mostrar logo na abertura os contratos vigentes cuja devolução prevista já passou, para que o atendimento procure os clientes atrasados.",
      "organisms": [
        "contratosEmAtraso"
      ]
    },
    {
      "id": "situacaoFrota",
      "priority": "main",
      "purpose": "Dar uma visão da frota por situação atual, com os totais e a lista de equipamentos. Nos locados, a lista mostra o contrato vigente e a data prevista de devolução.",
      "organisms": [
        "equipamentosPorSituacao"
      ]
    }
  ],
  "organisms": {
    "contratosEmAtraso": {
      "kind": "highlights",
      "text": "Contratos em atraso: número do contrato, cliente e data prevista de devolução já vencida. Ficam em destaque os dias de atraso e a multa por atraso de cada contrato.",
      "intents": []
    },
    "equipamentosPorSituacao": {
      "kind": "summary",
      "text": "Equipamentos por situação atual, com os totais de disponíveis, locados e em manutenção. Para cada equipamento locado, aparecem o contrato vigente e a data prevista de devolução.",
      "intents": [
        {
          "id": "abrirEquipamentos",
          "kind": "navigate",
          "to": "equipamentos"
        }
      ]
    }
  },
  "molecules": {
    "contratosEmAtraso": [
      {
        "role": "total de contratos em atraso",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "lista dos contratos em atraso",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "equipamentosPorSituacao": [
      {
        "role": "totais por situação",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "distribuição da frota por situação",
        "preferred": "groupviewchart--ml-pie-chart",
        "alternative": "groupviewchart--ml-bar-chart"
      },
      {
        "role": "equipamentos agrupados por situação",
        "preferred": "groupviewtable--ml-grouping-table",
        "alternative": "groupviewtable--ml-data-table"
      }
    ]
  }
} as const;
