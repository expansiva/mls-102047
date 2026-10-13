/// <mls fileReference="_102047_/l2/manutencaoFrota/web/mobile/page11/planos_manutencao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/assetManagement/page21.md",
    "experience": "assetRegistry"
  },
  "intent": "No celular, em conteúdo fluido estreito (referência de 390px, utilizável de 360px a 430px), o gestor vê primeiro os planos vencidos, abre um plano para conferir o vencimento e abre a ordem da preventiva vencida; o cadastro de novo plano fica ao final.",
  "sections": [
    {
      "id": "planosVencimentos",
      "priority": "primary",
      "purpose": "Lista empilhada dos planos por veículo, com o filtro de vencidos por km ou por tempo no topo para leitura rápida.",
      "organisms": [
        "planosLista"
      ]
    },
    {
      "id": "planoSelecionado",
      "priority": "main",
      "purpose": "Ficha do plano escolhido com o km além do previsto em destaque e a ação de abrir ordem logo abaixo, ao alcance do polegar.",
      "organisms": [
        "planoDetalhe",
        "abrirOrdemAcoes"
      ]
    },
    {
      "id": "novoPlano",
      "priority": "secondary",
      "purpose": "Formulário curto, em uma coluna, para definir o plano de preventiva do veículo.",
      "organisms": [
        "planoFormulario"
      ]
    }
  ],
  "organisms": {
    "planosLista": {
      "kind": "list",
      "text": "Planos de preventiva por veículo em itens empilhados: descrição, placa, próxima preventiva prevista e marca de vencido; filtro dos vencidos por km ou por tempo.",
      "intents": []
    },
    "planoDetalhe": {
      "kind": "detail",
      "text": "O plano selecionado: última preventiva (km e data), próxima prevista (km e data), km além do previsto e se já há ordem aberta.",
      "intents": []
    },
    "planoFormulario": {
      "kind": "form",
      "text": "Definir o plano de preventiva do veículo: veículo, descrição e intervalo a cada N km ou a cada N meses, com km e data de referência.",
      "intents": [
        {
          "id": "salvarPlano",
          "kind": "submit"
        }
      ]
    },
    "abrirOrdemAcoes": {
      "kind": "actions",
      "text": "Abrir ordem de manutenção para a preventiva vencida, informando oficina, descrição e data de entrada; acompanhar depois em Ordens de manutenção.",
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
        "role": "lista empilhada de planos",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "filtro de vencidos por km ou por tempo",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "busca por placa ou descrição",
        "preferred": "groupsearchcontent--ml-search-bar"
      }
    ],
    "planoDetalhe": [
      {
        "role": "ficha do plano",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "km além do previsto",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
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
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      },
      {
        "role": "salvar plano",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "abrirOrdemAcoes": [
      {
        "role": "abrir ordem preventiva",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação da ordem aberta",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
