/// <mls fileReference="_102047_/l2/manutencaoFrota/web/desktop/page11/veiculos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/assetManagement/page21.md",
    "experience": "assetRegistry"
  },
  "intent": "Dar ao gestor uma visão de toda a frota, com a situação da preventiva de cada veículo, e permitir cadastrar veículos, atribuir motorista, definir planos de preventiva e abrir ordens por defeito sem sair da página.",
  "sections": [
    {
      "id": "frota",
      "priority": "primary",
      "purpose": "Mostrar a lista da frota para localizar rapidamente um veículo pela placa e ver quais estão com a preventiva vencida.",
      "organisms": [
        "frotaList"
      ]
    },
    {
      "id": "veiculoSelecionado",
      "priority": "main",
      "purpose": "Conferir o veículo escolhido, os planos de preventiva e as ordens de manutenção, e agir sobre ele.",
      "organisms": [
        "veiculoDetail",
        "acoesVeiculo"
      ]
    },
    {
      "id": "novoVeiculo",
      "priority": "secondary",
      "purpose": "Cadastrar um novo veículo na frota.",
      "organisms": [
        "cadastroVeiculoForm"
      ]
    }
  ],
  "organisms": {
    "frotaList": {
      "kind": "list",
      "text": "Veículos da frota com placa, motorista atribuído, km atual, km da próxima preventiva e se a preventiva já venceu. Ao escolher um veículo, a ficha dele é aberta.",
      "intents": []
    },
    "veiculoDetail": {
      "kind": "detail",
      "text": "Ficha do veículo: placa, modelo, ano e km atual, os planos de preventiva com o próximo vencimento previsto e as ordens de manutenção com oficina, situação e dias na oficina.",
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
      "text": "Cadastrar um veículo informando placa, modelo, ano e quilometragem atual.",
      "intents": [
        {
          "id": "cadastrarVeiculo",
          "kind": "submit"
        }
      ]
    },
    "acoesVeiculo": {
      "kind": "actions",
      "text": "Ações sobre o veículo selecionado: atribuir o motorista que vai dirigi-lo, cadastrar um plano de preventiva a cada N km ou N meses e abrir uma ordem corretiva por defeito, informando a oficina, a descrição e a data de entrada.",
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
        "role": "tabela da frota",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "veiculoDetail": [
      {
        "role": "seções da ficha (dados, planos, ordens)",
        "preferred": "groupnavigatesection--ml-tabs",
        "alternative": "groupnavigatesection--ml-navigate-pills"
      },
      {
        "role": "resumo do veículo",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "planos e ordens do veículo",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "cadastroVeiculoForm": [
      {
        "role": "placa e modelo",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "ano e quilometragem atual",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-floating-number-input"
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
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "descrição do plano ou do defeito",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "intervalo em km ou meses e km de referência",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      },
      {
        "role": "disparar ações do veículo",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
