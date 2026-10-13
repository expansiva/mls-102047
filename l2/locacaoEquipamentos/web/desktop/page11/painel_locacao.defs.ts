/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/desktop/page11/painel_locacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar ao atendente e ao gerente uma visão rápida da locação: primeiro os contratos em atraso, com dias de atraso e multa, para agir na cobrança e na devolução; depois a situação atual dos equipamentos, com os totais de disponíveis, locados e em manutenção e o contrato de cada equipamento locado.",
  "sections": [
    {
      "id": "atrasos",
      "priority": "primary",
      "purpose": "Mostrar logo de início os contratos em atraso, quantos dias cada um está atrasado e o valor da multa, para que nenhum atraso passe sem acompanhamento.",
      "organisms": [
        "contratosEmAtraso"
      ]
    },
    {
      "id": "situacaoEquipamentos",
      "priority": "main",
      "purpose": "Resumir quantos equipamentos estão disponíveis, locados ou em manutenção e mostrar em qual contrato está cada equipamento locado.",
      "organisms": [
        "situacaoEquipamentos"
      ]
    }
  ],
  "organisms": {
    "contratosEmAtraso": {
      "kind": "highlights",
      "text": "Contratos em atraso, com número, cliente, data prevista de devolução, dias de atraso e valor da multa de cada um, além do total de multas em aberto. A partir daqui o usuário abre os contratos para registrar a devolução.",
      "intents": [
        {
          "id": "abrirContratos",
          "kind": "navigate",
          "to": "contratos_locacao"
        }
      ]
    },
    "situacaoEquipamentos": {
      "kind": "summary",
      "text": "Equipamentos por situação atual: totais de disponíveis, locados e em manutenção e, para os locados, o contrato atual em que estão. A partir daqui o usuário abre a página de equipamentos para ver os detalhes ou mudar a situação.",
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
        "role": "Total de contratos em atraso e soma das multas",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Lista dos contratos em atraso com dias e multa",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "situacaoEquipamentos": [
      {
        "role": "Totais de disponíveis, locados e em manutenção",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Distribuição dos equipamentos por situação",
        "preferred": "groupviewchart--ml-pie-chart",
        "alternative": "groupviewchart--ml-bar-chart"
      },
      {
        "role": "Equipamentos agrupados por situação, com o contrato atual dos locados",
        "preferred": "groupviewtable--ml-grouping-table",
        "alternative": "groupviewtable--ml-data-table"
      }
    ]
  }
} as const;
