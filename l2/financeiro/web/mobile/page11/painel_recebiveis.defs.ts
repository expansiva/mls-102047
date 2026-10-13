/// <mls fileReference="_102047_/l2/financeiro/web/mobile/page11/painel_recebiveis.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/analyticalList/page21.md",
    "experience": "kpiFilterTable"
  },
  "intent": "No celular, em conteúdo fluido estreito (referência de 390px, utilizável de 360px a 430px), mostrar primeiro os totais do período por origem e o tamanho dos vencidos, e em seguida a lista de títulos vencidos que o gerente pode abrir um a um.",
  "sections": [
    {
      "id": "posicaoPeriodo",
      "priority": "primary",
      "purpose": "Leitura rápida dos totais a receber, recebidos e em aberto do período, por origem, empilhados em uma coluna.",
      "organisms": [
        "recebiveisPorOrigem"
      ]
    },
    {
      "id": "vencidos",
      "priority": "main",
      "purpose": "Mostrar quanto está vencido e permitir filtrar por período e origem para encontrar o título em atraso.",
      "organisms": [
        "resumoVencidos",
        "listaVencidos"
      ]
    },
    {
      "id": "tituloSelecionado",
      "priority": "secondary",
      "purpose": "Ver o título vencido escolhido em tela própria, com saldo, atraso e recebimentos parciais.",
      "organisms": [
        "detalheTituloVencido"
      ]
    }
  ],
  "organisms": {
    "recebiveisPorOrigem": {
      "kind": "highlights",
      "text": "Totais do período por origem: total a receber, total recebido e saldo em aberto, em indicadores compactos legíveis em tela estreita.",
      "intents": []
    },
    "resumoVencidos": {
      "kind": "summary",
      "text": "Valor total vencido e quantidade de títulos vencidos e não quitados no período escolhido.",
      "intents": []
    },
    "listaVencidos": {
      "kind": "list",
      "text": "Período e origem escolhidos no topo e títulos vencidos em linhas compactas com número, pagador, dias de atraso e saldo em aberto.",
      "intents": []
    },
    "detalheTituloVencido": {
      "kind": "detail",
      "text": "Título vencido aberto: pagador, origem, valor, vencimento, total recebido, saldo em aberto, dias de atraso e recebimentos parciais.",
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
        "role": "indicadores de total a receber, recebido e em aberto do período",
        "preferred": "groupviewmetric--ml-compact-metric-sparkline",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "participação de cada origem no total a receber",
        "preferred": "groupviewchart--ml-pie-chart",
        "alternative": "groupviewchart--ml-bar-chart"
      }
    ],
    "resumoVencidos": [
      {
        "role": "valor total vencido e quantidade de títulos vencidos",
        "preferred": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "listaVencidos": [
      {
        "role": "filtro de período",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-month-year-range"
      },
      {
        "role": "filtro de origem",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-segmented-control"
      },
      {
        "role": "lista de títulos vencidos em tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-lazy-record-detail-table"
      }
    ],
    "detalheTituloVencido": [
      {
        "role": "total recebido, saldo em aberto e dias de atraso",
        "preferred": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "recebimentos do título",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-data-table-minimal"
      }
    ]
  }
} as const;
