/// <mls fileReference="_102047_/l2/manutencaoFrota/web/mobile/page11/abastecimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/reportExplorer/page21.md",
    "experience": "parameterPanel"
  },
  "intent": "No celular, o gestor consulta os abastecimentos da frota em uma coluna estreita e fluida (cerca de 390px, também usável em 360px e 430px), filtra por período, veículo ou motorista e abre um abastecimento para conferir o preço por litro.",
  "sections": [
    {
      "id": "consultaAbastecimentos",
      "priority": "primary",
      "purpose": "Lista compacta dos abastecimentos com data, veículo, motorista e preço por litro, com filtros recolhidos no topo para não ocupar a tela estreita.",
      "organisms": [
        "listaAbastecimentos"
      ]
    },
    {
      "id": "conferenciaAbastecimento",
      "priority": "main",
      "purpose": "Ao tocar em um abastecimento, os dados completos aparecem em seguida na mesma coluna, com o preço por litro em destaque.",
      "organisms": [
        "detalheAbastecimento"
      ]
    }
  ],
  "organisms": {
    "listaAbastecimentos": {
      "kind": "list",
      "text": "Abastecimentos da frota por veículo, motorista e data, com o preço por litro visível em cada item. Toque em um item para ver os detalhes.",
      "intents": []
    },
    "detalheAbastecimento": {
      "kind": "detail",
      "text": "Dados de um abastecimento: litros, valor, km no painel e preço por litro, além do veículo, do motorista e da data.",
      "intents": []
    }
  },
  "molecules": {
    "listaAbastecimentos": [
      {
        "role": "Lista empilhada dos abastecimentos, legível em tela estreita",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Filtro de período com atalhos rápidos",
        "preferred": "groupenterdateinterval--ml-date-interval-presets"
      },
      {
        "role": "Busca por veículo ou motorista",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Paginação da lista",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "detalheAbastecimento": [
      {
        "role": "Preço por litro em destaque no topo do detalhe",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Ficha com veículo, motorista, data, litros, valor e km",
        "preferred": "groupviewcard--ml-vertical-card"
      }
    ]
  }
} as const;
