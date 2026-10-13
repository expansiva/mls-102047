/// <mls fileReference="_102047_/l2/financeiro/web/desktop/page11/recebimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Dar ao caixa e ao gerente financeiro uma visão dos recebimentos da organização: localizar um recebimento pelo número ou pela data, conferir título, valor e forma de pagamento, registrar novos recebimentos de títulos e, para o caixa, estornar no mesmo dia um recebimento lançado por engano.",
  "sections": [
    {
      "id": "localizarRecebimentos",
      "priority": "primary",
      "purpose": "Encontrar rapidamente o recebimento pelo número ou pela data de recebimento e ver de imediato quais ainda podem ser estornados hoje.",
      "organisms": [
        "recebimentosList"
      ]
    },
    {
      "id": "conferirEEstornar",
      "priority": "main",
      "purpose": "Conferir o recebimento escolhido antes de qualquer decisão e, se foi registrado por engano hoje, estorná-lo informando o motivo.",
      "organisms": [
        "recebimentoDetail",
        "estornarRecebimentoActions"
      ]
    },
    {
      "id": "registrarRecebimento",
      "priority": "secondary",
      "purpose": "Lançar o recebimento total ou parcial de um título em dinheiro, pix ou cartão via Stripe, vendo o saldo em aberto para não exceder o valor devido.",
      "organisms": [
        "registrarRecebimentoForm"
      ]
    }
  ],
  "organisms": {
    "recebimentosList": {
      "kind": "list",
      "text": "Recebimentos com número, data de recebimento, título, pagador, valor, forma de pagamento e situação, destacando os que ainda podem ser estornados hoje; filtra por número ou data de recebimento.",
      "intents": []
    },
    "recebimentoDetail": {
      "kind": "detail",
      "text": "Conferência do recebimento: título baixado e seu saldo em aberto, valor recebido, forma de pagamento, canal, momento do recebimento, se gerou baixa parcial e, quando estornado, o motivo e o momento do estorno.",
      "intents": [
        {
          "id": "abrirTitulo",
          "kind": "navigate",
          "to": "titulos_receber"
        }
      ]
    },
    "registrarRecebimentoForm": {
      "kind": "form",
      "text": "Registro do recebimento de um título: escolher o título em aberto, conferir pagador e saldo, informar o valor recebido e a forma de pagamento; um valor menor que o saldo gera baixa parcial.",
      "intents": [
        {
          "id": "registrarRecebimento",
          "kind": "submit"
        }
      ]
    },
    "estornarRecebimentoActions": {
      "kind": "actions",
      "text": "Estorno do recebimento registrado por engano, disponível ao caixa apenas no mesmo dia; pede o motivo e restabelece o saldo em aberto do título.",
      "intents": [
        {
          "id": "estornarRecebimento",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "recebimentosList": [
      {
        "role": "tabela de recebimentos",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "busca pelo número do recebimento",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "filtro pela data de recebimento",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "paginação da lista",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "recebimentoDetail": [
      {
        "role": "cartão de conferência do recebimento",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "valor recebido somente leitura",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "aviso de recebimento estornado",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "registrarRecebimentoForm": [
      {
        "role": "localizar o título em aberto",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-faceted-search"
      },
      {
        "role": "valor recebido",
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
        "role": "confirmação do registro",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "estornarRecebimentoActions": [
      {
        "role": "botão de estorno",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "confirmação do estorno",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "resultado do estorno",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
