/// <mls fileReference="_102047_/l2/manutencaoFrota/web/desktop/page11/ordens_manutencao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Acompanhar as ordens de manutenção da frota, ver há quantos dias cada veículo está na oficina, abrir ordens preventivas ou corretivas e concluir as ordens abertas registrando a saída e o custo final.",
  "sections": [
    {
      "id": "filaOrdens",
      "priority": "primary",
      "purpose": "Localizar rapidamente a ordem pelo número, veículo ou oficina e ver quais ainda estão abertas e há quantos dias.",
      "organisms": [
        "ordensLista"
      ]
    },
    {
      "id": "ordemSelecionada",
      "priority": "main",
      "purpose": "Conferir a ordem escolhida e agir sobre ela: ver veículo, oficina, motivo, entrada, dias na oficina e custo, e concluir ou abrir uma nova ordem.",
      "organisms": [
        "ordemDetalhe",
        "ordemAcoes"
      ]
    },
    {
      "id": "registroOrdem",
      "priority": "secondary",
      "purpose": "Preencher a abertura de uma ordem preventiva ou corretiva, ou registrar a data de saída e o custo final na conclusão.",
      "organisms": [
        "ordemFormulario"
      ]
    }
  ],
  "organisms": {
    "ordensLista": {
      "kind": "list",
      "text": "Ordens de manutenção por número, veículo, oficina, situação e dias na oficina, para encontrar a ordem aberta a acompanhar ou concluir.",
      "intents": []
    },
    "ordemDetalhe": {
      "kind": "detail",
      "text": "A ordem selecionada: veículo, oficina, tipo e motivo, data de entrada, dias na oficina e custo, para conferir antes de concluir.",
      "intents": []
    },
    "ordemFormulario": {
      "kind": "form",
      "text": "Abrir ordem preventiva vinculada ao plano vencido ou corretiva por defeito, informando veículo, oficina, descrição e data de entrada; na conclusão, registrar data de saída e custo final.",
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
      "text": "Abrir ordem corretiva por defeito ou concluir a ordem aberta selecionada, levando ao formulário de registro; atalhos para os planos de preventiva vencidos e para os veículos.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Filtrar por situação da ordem",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Tabela de ordens com ordenação por dias na oficina",
        "preferred": "groupviewtable--ml-advanced-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "ordemDetalhe": [
      {
        "role": "Ficha da ordem selecionada",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Dias na oficina e custo em destaque",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
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
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Tipo da ordem: preventiva ou corretiva",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "Data de entrada e data de saída",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
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
        "role": "Abrir corretiva e concluir ordem",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "Resultado da ação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
