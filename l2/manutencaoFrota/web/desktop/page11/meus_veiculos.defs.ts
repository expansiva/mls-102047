/// <mls fileReference="_102047_/l2/manutencaoFrota/web/desktop/page11/meus_veiculos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/fieldDataCapture/page21.md",
    "experience": "rapidEntryWorkbench"
  },
  "intent": "Mostrar ao motorista os veículos que ele dirige, deixar que ele confira placa, modelo, ano e quilometragem atual do veículo escolhido e registrar ali mesmo o abastecimento, com data, litros, valor e km no painel, para manter a quilometragem do veículo em dia.",
  "sections": [
    {
      "id": "escolherVeiculo",
      "priority": "primary",
      "purpose": "Localizar entre os veículos atribuídos a mim aquele que acabei de abastecer.",
      "organisms": [
        "listaVeiculos"
      ]
    },
    {
      "id": "conferirERegistrar",
      "priority": "main",
      "purpose": "Conferir os dados do veículo escolhido e lançar o abastecimento dele sem sair da página.",
      "organisms": [
        "fichaVeiculo",
        "registrarAbastecimento"
      ]
    },
    {
      "id": "situacaoVeiculos",
      "priority": "secondary",
      "purpose": "Mostrar, para cada veículo, a quilometragem atual e o último abastecimento registrado, como referência antes de informar o km no painel.",
      "organisms": [
        "resumoVeiculos"
      ]
    }
  ],
  "organisms": {
    "resumoVeiculos": {
      "kind": "summary",
      "text": "Para cada veículo que você dirige: quilometragem atual e o último abastecimento que você registrou, com data, km no painel e preço por litro. Assim você sabe de qual km partir ao lançar o próximo.",
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
      "text": "Veículos atribuídos a mim, com placa, modelo e km atual. Escolha um para conferir os dados e registrar o abastecimento.",
      "intents": []
    },
    "fichaVeiculo": {
      "kind": "detail",
      "text": "Antes de abastecer, confira os dados do veículo escolhido: placa, modelo, ano e quilometragem atual.",
      "intents": []
    },
    "registrarAbastecimento": {
      "kind": "actions",
      "text": "Registrar o abastecimento deste veículo: informe data, litros, valor e km no painel. O km informado passa a ser a quilometragem atual do veículo e não pode ser menor que ela.",
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
        "role": "um cartão por veículo com km atual e o último abastecimento",
        "preferred": "groupviewdata--ml-card-grid",
        "alternative": "groupviewtable--ml-data-table-minimal"
      }
    ],
    "listaVeiculos": [
      {
        "role": "lista dos veículos atribuídos com placa, modelo e km atual, em que um deles fica selecionado",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "fichaVeiculo": [
      {
        "role": "cartão com os dados do veículo escolhido, para conferir",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "registrarAbastecimento": [
      {
        "role": "veículo abastecido entre os atribuídos a mim",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "data do abastecimento",
        "preferred": "groupenterdatetime--ml-datetime-picker",
        "alternative": "groupenterdatetime--ml-enter-datetime-masked-input"
      },
      {
        "role": "litros abastecidos",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-floating-number-input"
      },
      {
        "role": "valor pago",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "km no painel",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
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
