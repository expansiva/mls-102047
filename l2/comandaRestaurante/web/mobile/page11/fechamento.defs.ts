/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/fechamento.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/posWorkbench/page21.md",
    "experience": "counterSplit"
  },
  "intent": "Em conteúdo estreito e fluido em torno de 390px, também usável em 360px e 430px, o caixa localiza a comanda, confere a cobrança, registra o pagamento e fecha para liberar a mesa.",
  "sections": [
    {
      "id": "locateSection",
      "priority": "secondary",
      "purpose": "Empilhar no fluxo estreito a busca da comanda aberta para o caixa achar o atendimento a fechar em cerca de 390px.",
      "organisms": [
        "openComandaList"
      ]
    },
    {
      "id": "reviewSection",
      "priority": "main",
      "purpose": "Mostrar em coluna fluida os itens e os totais da comanda escolhida para conferência rápida da cobrança.",
      "organisms": [
        "comandaReview"
      ]
    },
    {
      "id": "settleSection",
      "priority": "primary",
      "purpose": "Concentrar desconto, forma de pagamento e o fechamento no trecho mais acessível da coluna estreita, usável em 360px e 430px.",
      "organisms": [
        "paymentForm",
        "closeComandaActions"
      ]
    }
  ],
  "organisms": {
    "openComandaList": {
      "kind": "list",
      "text": "Lista as comandas abertas com número, mesa e situação para o caixa localizar a conta que vai encerrar.",
      "intents": []
    },
    "comandaReview": {
      "kind": "detail",
      "text": "Mostra os itens lançados válidos, o subtotal e o total da comanda escolhida para o caixa conferir a cobrança antes de receber.",
      "intents": []
    },
    "paymentForm": {
      "kind": "form",
      "text": "Recebe o desconto opcional e a forma de pagamento obrigatória para o caixa registrar como a conta será quitada.",
      "intents": []
    },
    "closeComandaActions": {
      "kind": "actions",
      "text": "Dispara o fechamento da comanda paga e comunica que a mesa foi liberada para um novo atendimento.",
      "intents": [
        {
          "id": "fecharComandaPaga",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "openComandaList": [
      {
        "role": "query",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "pick",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "browse",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "comandaReview": [
      {
        "role": "totals",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "items",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "paymentForm": [
      {
        "role": "discount",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "paymentMethod",
        "preferred": "groupselectone--ml-radio-group",
        "alternative": "groupselectone--ml-select-dropdown"
      }
    ],
    "closeComandaActions": [
      {
        "role": "submit",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      },
      {
        "role": "feedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
