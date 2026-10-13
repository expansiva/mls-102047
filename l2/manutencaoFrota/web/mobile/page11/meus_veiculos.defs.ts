/// <mls fileReference="_102047_/l2/manutencaoFrota/web/mobile/page11/meus_veiculos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/fieldDataCapture/page21.md",
    "experience": "rapidEntryWorkbench"
  },
  "intent": "No celular, perto da bomba, o motorista escolhe o veículo que dirige, confere placa, modelo e quilometragem e lança o abastecimento num formulário curto, numa coluna fluida em torno de 390px que também funciona em 360px e 430px.",
  "sections": [
    {
      "id": "escolherVeiculo",
      "priority": "primary",
      "purpose": "Escolher, numa lista empilhada e fácil de tocar, o veículo atribuído a mim que acabei de abastecer.",
      "organisms": [
        "listaVeiculos"
      ]
    },
    {
      "id": "conferirERegistrar",
      "priority": "main",
      "purpose": "Conferir rapidamente o veículo escolhido e preencher logo abaixo data, litros, valor e km no painel.",
      "organisms": [
        "fichaVeiculo",
        "registrarAbastecimento"
      ]
    },
    {
      "id": "situacaoVeiculos",
      "priority": "secondary",
      "purpose": "Consultar depois do formulário a quilometragem atual e o último abastecimento de cada veículo.",
      "organisms": [
        "resumoVeiculos"
      ]
    }
  ],
  "organisms": {
    "resumoVeiculos": {
      "kind": "summary",
      "text": "Para cada veículo que você dirige: quilometragem atual e o último abastecimento que você registrou, com data, km no painel e preço por litro.",
      "intents": [
        {
          "id": "verMeusAbastecimentos",
          "kind": "navigate",
          "to": "meus_abastecimentos"
        }
      ]
    },
    "listaVeiculos": {
      "kind": "list",
      "text": "Veículos atribuídos a mim, com placa, modelo e km atual. Toque em um para conferir e abastecer.",
      "intents": []
    },
    "fichaVeiculo": {
      "kind": "detail",
      "text": "Confira o veículo antes de abastecer: placa, modelo, ano e quilometragem atual.",
      "intents": []
    },
    "registrarAbastecimento": {
      "kind": "actions",
      "text": "Registrar o abastecimento deste veículo com data, litros, valor e km no painel. O km informado atualiza a quilometragem atual do veículo e não pode ser menor que ela.",
      "intents": [
        {
          "id": "lancarAbastecimento",
          "kind": "submit"
        },
        {
          "id": "abrirMeusAbastecimentos",
          "kind": "navigate",
          "to": "meus_abastecimentos"
        }
      ]
    }
  },
  "molecules": {
    "resumoVeiculos": [
      {
        "role": "cartões empilhados com km atual e o último abastecimento por veículo",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "listaVeiculos": [
      {
        "role": "lista empilhada dos veículos atribuídos, fácil de tocar",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "fichaVeiculo": [
      {
        "role": "cartão compacto com os dados do veículo escolhido",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "registrarAbastecimento": [
      {
        "role": "veículo abastecido entre os atribuídos a mim",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-card-selector"
      },
      {
        "role": "data do abastecimento",
        "preferred": "groupenterdatetime--ml-datetime-picker",
        "alternative": "groupenterdatetime--ml-enter-datetime-masked-input"
      },
      {
        "role": "litros abastecidos",
        "preferred": "groupenternumber--ml-floating-number-input",
        "alternative": "groupenternumber--ml-number-input"
      },
      {
        "role": "valor pago",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "km no painel",
        "preferred": "groupenternumber--ml-floating-number-input",
        "alternative": "groupenternumber--ml-number-input"
      },
      {
        "role": "enviar o abastecimento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação ou erro do registro",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
