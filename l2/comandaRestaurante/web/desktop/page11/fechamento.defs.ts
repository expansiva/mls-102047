/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/fechamento.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/posWorkbench/page21.md",
    "experience": "counterSplit"
  },
  "intent": "O caixa localiza a comanda aberta, confere os itens e os totais, registra desconto e pagamento e fecha a comanda para liberar a mesa.",
  "sections": [
    {
      "id": "locateSection",
      "priority": "primary",
      "purpose": "Dar ao caixa um ponto de partida para achar a comanda aberta pelo número ou pela mesa.",
      "organisms": [
        "openComandaList"
      ]
    },
    {
      "id": "reviewSection",
      "priority": "main",
      "purpose": "Exibir os itens válidos e os totais calculados para o caixa conferir a cobrança antes de receber.",
      "organisms": [
        "comandaReview"
      ]
    },
    {
      "id": "settleSection",
      "priority": "secondary",
      "purpose": "Capturar o desconto opcional e a forma de pagamento e concluir o fechamento que libera a mesa.",
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
        "preferred": "groupselectone--ml-listbox-sidebar-select",
        "alternative": "groupselectone--ml-select-one-autocomplete"
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
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "items",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
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
        "alternative": "groupselectone--ml-select"
      }
    ],
    "closeComandaActions": [
      {
        "role": "submit",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "feedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
