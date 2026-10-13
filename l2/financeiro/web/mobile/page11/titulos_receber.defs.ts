/// <mls fileReference="_102047_/l2/financeiro/web/mobile/page11/titulos_receber.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "No celular, em largura fluida em torno de 390px (usável de 360px a 430px), o caixa busca o título, confere saldo e atraso e registra o recebimento em poucos toques; o gerente consulta a situação dos títulos.",
  "sections": [
    {
      "id": "localizacao",
      "priority": "primary",
      "purpose": "Começar pela busca por número ou pagador, com a lista de títulos empilhada e a situação visível em cada item.",
      "organisms": [
        "listaTitulos"
      ]
    },
    {
      "id": "conferenciaRecebimento",
      "priority": "main",
      "purpose": "Ao tocar no título, mostrar a ficha com saldo e atraso em destaque e logo abaixo o registro do recebimento.",
      "organisms": [
        "detalheTitulo",
        "registroRecebimento"
      ]
    },
    {
      "id": "panorama",
      "priority": "secondary",
      "purpose": "Indicadores compactos de saldo em aberto, total recebido e títulos vencidos ou com baixa parcial, consultados quando necessário.",
      "organisms": [
        "resumoTitulos"
      ]
    }
  ],
  "organisms": {
    "resumoTitulos": {
      "kind": "summary",
      "text": "Indicadores compactos do saldo em aberto, do total recebido e da quantidade de títulos vencidos ou com baixa parcial.",
      "intents": []
    },
    "listaTitulos": {
      "kind": "list",
      "text": "Busca por número ou pagador e lista empilhada de títulos com pagador, vencimento, saldo em aberto e situação de quitado, vencido ou baixa parcial.",
      "intents": []
    },
    "detalheTitulo": {
      "kind": "detail",
      "text": "Ficha do título tocado: pagador, origem, valor, vencimento, total recebido, saldo em aberto, dias de atraso e recebimentos já lançados.",
      "intents": [
        {
          "id": "verRecebimentos",
          "kind": "navigate",
          "to": "recebimentos"
        }
      ]
    },
    "registroRecebimento": {
      "kind": "actions",
      "text": "O caixa digita o valor recebido, escolhe dinheiro, pix ou cartão via Stripe e confirma; valor menor que o saldo gera baixa parcial.",
      "intents": [
        {
          "id": "registrarRecebimento",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "resumoTitulos": [
      {
        "role": "indicadores compactos",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
      }
    ],
    "listaTitulos": [
      {
        "role": "busca do título por número ou pagador",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "lista empilhada de títulos",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "detalheTitulo": [
      {
        "role": "ficha do título",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "destaque do saldo em aberto",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "registroRecebimento": [
      {
        "role": "valor recebido em reais",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "forma de pagamento",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "confirmar recebimento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "processamento do cartão via Stripe",
        "preferred": "groupshowprogress--ml-indeterminate-spinner"
      },
      {
        "role": "confirmação ou erro do recebimento",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
