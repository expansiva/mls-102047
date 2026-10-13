/// <mls fileReference="_102047_/l2/manutencaoFrota/web/mobile/page11/veiculos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/assetManagement/page21.md",
    "experience": "assetRegistry"
  },
  "intent": "No celular, numa coluna estreita e fluida (por volta de 390px, também usável em 360px e 430px), o gestor percorre a frota, abre um veículo para conferir a preventiva e as ordens, e age sobre ele ou cadastra um novo veículo.",
  "sections": [
    {
      "id": "frota",
      "priority": "primary",
      "purpose": "Lista compacta da frota, um veículo por item, com placa, motorista, km atual e aviso de preventiva vencida em destaque.",
      "organisms": [
        "frotaList"
      ]
    },
    {
      "id": "veiculoSelecionado",
      "priority": "main",
      "purpose": "Ficha do veículo escolhido com as seções empilhadas e as ações logo abaixo, ao alcance do polegar.",
      "organisms": [
        "veiculoDetail",
        "acoesVeiculo"
      ]
    },
    {
      "id": "novoVeiculo",
      "priority": "secondary",
      "purpose": "Formulário curto para cadastrar um veículo, com os campos um embaixo do outro.",
      "organisms": [
        "cadastroVeiculoForm"
      ]
    }
  ],
  "organisms": {
    "frotaList": {
      "kind": "list",
      "text": "Veículos da frota com placa, motorista atribuído, km atual, km da próxima preventiva e se a preventiva venceu. Tocar em um veículo abre a ficha.",
      "intents": []
    },
    "veiculoDetail": {
      "kind": "detail",
      "text": "Ficha do veículo: dados e km atual, planos de preventiva com o próximo vencimento e ordens de manutenção com oficina, situação e dias na oficina.",
      "intents": [
        {
          "id": "verPlanos",
          "kind": "navigate",
          "to": "planos_manutencao"
        },
        {
          "id": "verOrdens",
          "kind": "navigate",
          "to": "ordens_manutencao"
        }
      ]
    },
    "cadastroVeiculoForm": {
      "kind": "form",
      "text": "Cadastrar um veículo com placa, modelo, ano e quilometragem atual.",
      "intents": [
        {
          "id": "cadastrarVeiculo",
          "kind": "submit"
        }
      ]
    },
    "acoesVeiculo": {
      "kind": "actions",
      "text": "Atribuir motorista, cadastrar um plano de preventiva por km ou meses e abrir uma ordem corretiva por defeito para o veículo aberto.",
      "intents": [
        {
          "id": "atribuirMotorista",
          "kind": "submit"
        },
        {
          "id": "cadastrarPlano",
          "kind": "submit"
        },
        {
          "id": "abrirOrdemDefeito",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "frotaList": [
      {
        "role": "lista da frota",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "veiculoDetail": [
      {
        "role": "seções da ficha (dados, planos, ordens)",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "resumo do veículo",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "planos e ordens do veículo",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "cadastroVeiculoForm": [
      {
        "role": "placa e modelo",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "ano e quilometragem atual",
        "preferred": "groupenternumber--ml-floating-number-input",
        "alternative": "groupenternumber--ml-number-input"
      },
      {
        "role": "confirmar cadastro",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "acoesVeiculo": [
      {
        "role": "escolher motorista ou oficina",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "descrição do plano ou do defeito",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "intervalo em km ou meses e km de referência",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      },
      {
        "role": "disparar ações do veículo",
        "preferred": "grouptriggeraction--ml-split-button",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      }
    ]
  }
} as const;
