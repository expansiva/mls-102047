/// <mls fileReference="_102047_/l2/manutencaoFrota/web/desktop/page11/planos_manutencao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/assetManagement/page21.md",
    "experience": "assetRegistry"
  },
  "intent": "Permitir ao gestor acompanhar os planos de preventiva de cada veículo, identificar rapidamente os vencidos por km ou por tempo, conferir quanto o veículo já passou do previsto e se já há ordem aberta, definir novos planos e abrir a ordem de manutenção da preventiva vencida.",
  "sections": [
    {
      "id": "planosVencimentos",
      "priority": "primary",
      "purpose": "Mostrar todos os planos de preventiva por veículo e destacar os vencidos por km ou por tempo, para o gestor saber onde agir primeiro.",
      "organisms": [
        "planosLista"
      ]
    },
    {
      "id": "planoSelecionado",
      "priority": "main",
      "purpose": "Detalhar o plano escolhido na lista — última preventiva, próxima prevista, km além do previsto e ordem aberta — e permitir abrir a ordem quando a preventiva venceu.",
      "organisms": [
        "planoDetalhe",
        "abrirOrdemAcoes"
      ]
    },
    {
      "id": "novoPlano",
      "priority": "secondary",
      "purpose": "Definir o plano de preventiva de um veículo, com intervalo em km ou em meses.",
      "organisms": [
        "planoFormulario"
      ]
    }
  ],
  "organisms": {
    "planosLista": {
      "kind": "list",
      "text": "Planos de preventiva por veículo, com descrição, placa, km e data previstos da próxima preventiva e indicação de vencido; filtro para ver só os vencidos por km ou por tempo.",
      "intents": []
    },
    "planoDetalhe": {
      "kind": "detail",
      "text": "O plano selecionado: km e data da última preventiva, km e data previstos da próxima, quilometragem atual do veículo, km além do previsto e se já existe ordem aberta para ele.",
      "intents": []
    },
    "planoFormulario": {
      "kind": "form",
      "text": "Definir o plano de preventiva do veículo: escolher o veículo, descrever a preventiva e informar o intervalo a cada N km ou a cada N meses, com km e data de referência.",
      "intents": [
        {
          "id": "salvarPlano",
          "kind": "submit"
        }
      ]
    },
    "abrirOrdemAcoes": {
      "kind": "actions",
      "text": "Abrir ordem de manutenção preventiva para o plano vencido, informando oficina, descrição e data de entrada; depois acompanhar a ordem em Ordens de manutenção.",
      "intents": [
        {
          "id": "abrirOrdemPreventiva",
          "kind": "submit"
        },
        {
          "id": "verOrdens",
          "kind": "navigate",
          "to": "ordens_manutencao"
        }
      ]
    }
  },
  "molecules": {
    "planosLista": [
      {
        "role": "tabela de planos com vencimento",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "filtro de vencidos por km ou por tempo",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "busca por placa ou descrição",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      }
    ],
    "planoDetalhe": [
      {
        "role": "ficha do plano",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "km além do previsto",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "planoFormulario": [
      {
        "role": "escolha do veículo",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "tipo de intervalo (km ou meses)",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "intervalo e km de referência",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      },
      {
        "role": "salvar plano",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "abrirOrdemAcoes": [
      {
        "role": "abrir ordem preventiva",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "confirmação da ordem aberta",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
