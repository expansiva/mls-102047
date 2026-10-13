/// <mls fileReference="_102047_/l2/manutencaoFrota/web/desktop/page11/abastecimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/reportExplorer/page21.md",
    "experience": "parameterPanel"
  },
  "intent": "Permitir ao gestor consultar os abastecimentos de toda a frota, filtrando por veículo, motorista e período, para acompanhar o preço por litro pago e conferir os dados de cada abastecimento.",
  "sections": [
    {
      "id": "consultaAbastecimentos",
      "priority": "primary",
      "purpose": "Lista dos abastecimentos da frota com filtros de veículo, motorista e data, mostrando litros, valor e preço por litro para comparar custos de combustível.",
      "organisms": [
        "listaAbastecimentos"
      ]
    },
    {
      "id": "conferenciaAbastecimento",
      "priority": "main",
      "purpose": "Ao lado da lista, os dados completos do abastecimento escolhido, para conferir litros, valor, km no painel e preço por litro.",
      "organisms": [
        "detalheAbastecimento"
      ]
    }
  ],
  "organisms": {
    "listaAbastecimentos": {
      "kind": "list",
      "text": "Abastecimentos da frota por veículo, motorista e data, com litros, valor e preço por litro. O gestor filtra por período, veículo ou motorista e escolhe um abastecimento para ver em detalhe.",
      "intents": []
    },
    "detalheAbastecimento": {
      "kind": "detail",
      "text": "Dados de um abastecimento: veículo, motorista, data, litros, valor, km no painel e o preço por litro em destaque.",
      "intents": []
    }
  },
  "molecules": {
    "listaAbastecimentos": [
      {
        "role": "Tabela dos abastecimentos, que pode ser ordenada por data e por preço por litro",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "Filtro de período por data do abastecimento",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-date-range-dual-calendar"
      },
      {
        "role": "Busca por veículo ou motorista dentro da lista",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Paginação da lista",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "detalheAbastecimento": [
      {
        "role": "Ficha do abastecimento com veículo, motorista, data, litros, valor e km",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Preço por litro em destaque",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ]
  }
} as const;
