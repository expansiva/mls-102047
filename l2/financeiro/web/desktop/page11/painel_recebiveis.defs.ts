/// <mls fileReference="_102047_/l2/financeiro/web/desktop/page11/painel_recebiveis.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/analyticalList/page21.md",
    "experience": "kpiFilterTable"
  },
  "intent": "Mostrar ao gerente financeiro a posição dos recebíveis no período escolhido, separada por origem (restaurante, academia, assistência técnica), e destacar os títulos vencidos e não quitados, de quem são e há quantos dias estão em atraso.",
  "sections": [
    {
      "id": "posicaoPeriodo",
      "priority": "primary",
      "purpose": "Dar a leitura imediata do período: quanto há a receber, quanto já foi recebido e quanto segue em aberto em cada origem.",
      "organisms": [
        "recebiveisPorOrigem"
      ]
    },
    {
      "id": "vencidos",
      "priority": "main",
      "purpose": "Concentrar a atenção nos títulos vencidos: o tamanho do problema e a lista filtrável para identificar cada título em atraso.",
      "organisms": [
        "resumoVencidos",
        "listaVencidos"
      ]
    },
    {
      "id": "tituloSelecionado",
      "priority": "secondary",
      "purpose": "Abrir o título vencido escolhido para conferir o que já foi recebido, o saldo e os recebimentos parciais.",
      "organisms": [
        "detalheTituloVencido"
      ]
    }
  ],
  "organisms": {
    "recebiveisPorOrigem": {
      "kind": "highlights",
      "text": "Totais do período por origem: total a receber, total recebido e saldo em aberto, para o gerente comparar rapidamente restaurante, academia e assistência técnica.",
      "intents": []
    },
    "resumoVencidos": {
      "kind": "summary",
      "text": "Quantidade e valor total dos títulos vencidos e não quitados no período, com a noção de quanto saldo está em atraso.",
      "intents": []
    },
    "listaVencidos": {
      "kind": "list",
      "text": "Escolha do período e da origem e lista dos títulos vencidos com número, pagador, origem, vencimento, dias de atraso e saldo em aberto, ordenada pelo atraso.",
      "intents": []
    },
    "detalheTituloVencido": {
      "kind": "detail",
      "text": "Título vencido selecionado: pagador, origem, valor, vencimento, total recebido, saldo em aberto, dias de atraso e os recebimentos parciais, incluindo estornos.",
      "intents": [
        {
          "id": "abrirTitulosReceber",
          "kind": "navigate",
          "to": "titulos_receber"
        }
      ]
    }
  },
  "molecules": {
    "recebiveisPorOrigem": [
      {
        "role": "comparação dos totais a receber, recebido e em aberto por origem",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "indicadores de total a receber, recebido e em aberto do período",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "resumoVencidos": [
      {
        "role": "valor total vencido e quantidade de títulos vencidos",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "listaVencidos": [
      {
        "role": "filtro de período",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-date-range-dual-calendar"
      },
      {
        "role": "filtro de origem",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "tabela de títulos vencidos",
        "preferred": "groupviewtable--ml-advanced-data-table",
        "alternative": "groupviewtable--ml-data-table"
      }
    ],
    "detalheTituloVencido": [
      {
        "role": "total recebido, saldo em aberto e dias de atraso",
        "preferred": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "recebimentos do título",
        "preferred": "groupviewtable--ml-view-table",
        "alternative": "groupviewtable--ml-data-table-minimal"
      }
    ]
  }
} as const;
