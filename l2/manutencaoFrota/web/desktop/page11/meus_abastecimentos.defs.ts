/// <mls fileReference="_102047_/l2/manutencaoFrota/web/desktop/page11/meus_abastecimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/fieldDataCapture/page21.md",
    "experience": "rapidEntryWorkbench"
  },
  "intent": "Permitir que o motorista registre o abastecimento de um veículo atribuído a ele e, na mesma tela, consulte os abastecimentos que já lançou, com o preço por litro de cada um.",
  "sections": [
    {
      "id": "lancamento",
      "priority": "primary",
      "purpose": "Lançar o abastecimento com veículo, data, litros, valor e km no painel. O km informado atualiza a quilometragem atual do veículo.",
      "organisms": [
        "lancarAbastecimento"
      ]
    },
    {
      "id": "historico",
      "priority": "main",
      "purpose": "Consultar os abastecimentos já registrados, ordenados por data, e abrir um deles para conferir os dados.",
      "organisms": [
        "meusAbastecimentosLista",
        "abastecimentoDetalhe"
      ]
    },
    {
      "id": "precoLitro",
      "priority": "secondary",
      "purpose": "Acompanhar o preço por litro pago em cada abastecimento registrado.",
      "organisms": [
        "precoPorLitroResumo"
      ]
    }
  ],
  "organisms": {
    "precoPorLitroResumo": {
      "kind": "summary",
      "text": "Preço por litro de cada abastecimento registrado, ao longo das datas, para o motorista perceber variações no que pagou.",
      "intents": []
    },
    "lancarAbastecimento": {
      "kind": "form",
      "text": "Lançar abastecimento: escolher o veículo e informar data, litros, valor pago e km no painel. Ao salvar, o abastecimento fica registrado e a quilometragem do veículo é atualizada.",
      "intents": [
        {
          "id": "registrarAbastecimento",
          "kind": "submit"
        }
      ]
    },
    "meusAbastecimentosLista": {
      "kind": "list",
      "text": "Abastecimentos que já registrei nos meus veículos, por data, com litros, valor, km no painel e preço por litro. Dá para filtrar por período.",
      "intents": []
    },
    "abastecimentoDetalhe": {
      "kind": "detail",
      "text": "Ver os dados do abastecimento escolhido: data, veículo, litros, valor, km no painel e preço por litro.",
      "intents": []
    }
  },
  "molecules": {
    "precoPorLitroResumo": [
      {
        "role": "Evolução do preço por litro por data",
        "preferred": "groupviewchart--ml-line-chart",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
      }
    ],
    "lancarAbastecimento": [
      {
        "role": "Veículo abastecido",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Data do abastecimento",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "Litros abastecidos",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-floating-number-input"
      },
      {
        "role": "Valor pago",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "Km no painel",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-floating-number-input"
      },
      {
        "role": "Registrar abastecimento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação do registro",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "meusAbastecimentosLista": [
      {
        "role": "Lista de abastecimentos por data",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      },
      {
        "role": "Filtro por período",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-date-range-dual-calendar"
      }
    ],
    "abastecimentoDetalhe": [
      {
        "role": "Ficha do abastecimento",
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
