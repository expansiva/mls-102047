/// <mls fileReference="_102047_/l2/manutencaoFrota/web/mobile/page11/ordens_manutencao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "No celular, encontrar a ordem de manutenção, conferir há quantos dias o veículo está na oficina e concluir ou abrir ordens em um fluxo vertical fluido, com conteúdo estreito em torno de 390px e utilizável entre 360px e 430px.",
  "sections": [
    {
      "id": "filaOrdens",
      "priority": "primary",
      "purpose": "Lista compacta das ordens com busca, para achar a ordem aberta pelo número, placa ou oficina.",
      "organisms": [
        "ordensLista"
      ]
    },
    {
      "id": "ordemSelecionada",
      "priority": "main",
      "purpose": "Ao tocar uma ordem, ver seus dados principais e as ações de concluir ou abrir corretiva logo abaixo.",
      "organisms": [
        "ordemDetalhe",
        "ordemAcoes"
      ]
    },
    {
      "id": "registroOrdem",
      "priority": "secondary",
      "purpose": "Formulário em coluna única para abrir a ordem ou registrar saída e custo final.",
      "organisms": [
        "ordemFormulario"
      ]
    }
  ],
  "organisms": {
    "ordensLista": {
      "kind": "list",
      "text": "Ordens de manutenção por número, veículo, oficina, situação e dias na oficina, em itens empilhados fáceis de tocar.",
      "intents": []
    },
    "ordemDetalhe": {
      "kind": "detail",
      "text": "A ordem selecionada: veículo, oficina, motivo, entrada, dias na oficina e custo, em leitura vertical.",
      "intents": []
    },
    "ordemFormulario": {
      "kind": "form",
      "text": "Abrir ordem preventiva ou corretiva com veículo, oficina, descrição e data de entrada; na conclusão, registrar data de saída e custo final.",
      "intents": [
        {
          "id": "salvarAberturaOrdem",
          "kind": "submit"
        },
        {
          "id": "registrarConclusaoOrdem",
          "kind": "submit"
        }
      ]
    },
    "ordemAcoes": {
      "kind": "actions",
      "text": "Abrir ordem corretiva ou concluir a ordem selecionada, levando ao formulário; atalhos para os planos de preventiva vencidos e para os veículos.",
      "intents": [
        {
          "id": "verPlanosVencidos",
          "kind": "navigate",
          "to": "planos_manutencao"
        },
        {
          "id": "verVeiculos",
          "kind": "navigate",
          "to": "veiculos"
        }
      ]
    }
  },
  "molecules": {
    "ordensLista": [
      {
        "role": "Buscar ordem pelo número, placa ou oficina",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Filtrar por situação da ordem",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "Lista empilhada de ordens",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "ordemDetalhe": [
      {
        "role": "Ficha da ordem selecionada",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Dias na oficina em destaque",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "ordemFormulario": [
      {
        "role": "Escolher o veículo pela placa",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Escolher a oficina",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "Tipo da ordem: preventiva ou corretiva",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "Data de entrada e data de saída",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "Descrição do serviço ou do defeito",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "Custo final da manutenção",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "Confirmar abertura ou conclusão",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação do registro salvo",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "ordemAcoes": [
      {
        "role": "Concluir ordem com alternativa de abrir corretiva",
        "preferred": "grouptriggeraction--ml-split-button",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Resultado da ação",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
