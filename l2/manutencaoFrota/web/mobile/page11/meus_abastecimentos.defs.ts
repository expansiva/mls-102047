/// <mls fileReference="_102047_/l2/manutencaoFrota/web/mobile/page11/meus_abastecimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/fieldDataCapture/page21.md",
    "experience": "rapidEntryWorkbench"
  },
  "intent": "No celular, por volta de 390px de largura e ainda usável entre 360px e 430px, o motorista lança o abastecimento logo no posto. Em seguida, rolando a tela, confere o histórico dos seus abastecimentos e o preço por litro.",
  "sections": [
    {
      "id": "lancamento",
      "priority": "primary",
      "purpose": "Formulário curto, em uma coluna fluida, para lançar veículo, data, litros, valor e km no painel. Depois de salvar, o formulário fica limpo para o próximo registro.",
      "organisms": [
        "lancarAbastecimento"
      ]
    },
    {
      "id": "historico",
      "priority": "main",
      "purpose": "Lista compacta dos abastecimentos já registrados, por data. Tocar em um item abre os dados completos logo abaixo.",
      "organisms": [
        "meusAbastecimentosLista",
        "abastecimentoDetalhe"
      ]
    },
    {
      "id": "precoLitro",
      "priority": "secondary",
      "purpose": "Leitura rápida do preço por litro pago em cada abastecimento.",
      "organisms": [
        "precoPorLitroResumo"
      ]
    }
  ],
  "organisms": {
    "precoPorLitroResumo": {
      "kind": "summary",
      "text": "Preço por litro de cada abastecimento registrado, em formato compacto, para o motorista ver de relance quanto pagou por litro.",
      "intents": []
    },
    "lancarAbastecimento": {
      "kind": "form",
      "text": "Lançar abastecimento: escolher o veículo e informar data, litros, valor pago e km no painel, com campos grandes e fáceis de tocar. Ao salvar, a quilometragem do veículo é atualizada.",
      "intents": [
        {
          "id": "registrarAbastecimento",
          "kind": "submit"
        }
      ]
    },
    "meusAbastecimentosLista": {
      "kind": "list",
      "text": "Abastecimentos que já registrei nos meus veículos, por data, mostrando em cada item os litros, o valor e o preço por litro.",
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
        "role": "Preço por litro com tendência curta",
        "preferred": "groupviewmetric--ml-compact-metric-sparkline",
        "alternative": "groupviewchart--ml-line-chart"
      }
    ],
    "lancarAbastecimento": [
      {
        "role": "Veículo abastecido",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-card-selector"
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
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Filtro por período",
        "preferred": "groupenterdateinterval--ml-date-interval-presets"
      }
    ],
    "abastecimentoDetalhe": [
      {
        "role": "Ficha do abastecimento",
        "preferred": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Preço por litro em destaque",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ]
  }
} as const;
