/// <mls fileReference="_102047_/l2/financeiro/web/mobile/page11/recebimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "No celular, em conteúdo fluido estreito (referência de 390px, também usável em 360px e 430px), permitir ao caixa e ao gerente financeiro achar um recebimento pelo número ou pela data, conferi-lo, estorná-lo no mesmo dia quando for o caso e registrar o recebimento de um título.",
  "sections": [
    {
      "id": "localizarRecebimentos",
      "priority": "primary",
      "purpose": "Lista empilhada e fácil de rolar para achar o recebimento pelo número ou pela data e ver quais ainda podem ser estornados hoje.",
      "organisms": [
        "recebimentosList"
      ]
    },
    {
      "id": "conferirEEstornar",
      "priority": "main",
      "purpose": "Ao tocar em um recebimento, conferir os dados em sequência vertical e, logo abaixo, estornar quando foi registrado por engano hoje.",
      "organisms": [
        "recebimentoDetail",
        "estornarRecebimentoActions"
      ]
    },
    {
      "id": "registrarRecebimento",
      "priority": "secondary",
      "purpose": "Formulário curto em uma coluna para registrar o recebimento de um título com valor e forma de pagamento.",
      "organisms": [
        "registrarRecebimentoForm"
      ]
    }
  ],
  "organisms": {
    "recebimentosList": {
      "kind": "list",
      "text": "Recebimentos em itens compactos com número, data, título, valor e situação, sinalizando os estornáveis hoje; filtra por número ou data de recebimento.",
      "intents": []
    },
    "recebimentoDetail": {
      "kind": "detail",
      "text": "Conferência do recebimento: título e saldo em aberto, valor, forma de pagamento, recebido em, baixa parcial e, se houver, motivo e momento do estorno.",
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
      "text": "Registro do recebimento: escolher o título, ver o saldo em aberto, informar valor e forma de pagamento (dinheiro, pix ou cartão via Stripe).",
      "intents": [
        {
          "id": "registrarRecebimento",
          "kind": "submit"
        }
      ]
    },
    "estornarRecebimentoActions": {
      "kind": "actions",
      "text": "Estornar o recebimento registrado por engano no mesmo dia (caixa), informando o motivo; o saldo do título é restabelecido.",
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
        "role": "lista de recebimentos",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "busca pelo número do recebimento",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-history"
      },
      {
        "role": "filtro pela data de recebimento",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-compact-calendar"
      },
      {
        "role": "paginação da lista",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "recebimentoDetail": [
      {
        "role": "cartão de conferência do recebimento",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "valor recebido somente leitura",
        "preferred": "groupentermoney--ml-enter-money-br"
      },
      {
        "role": "aviso de recebimento estornado",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "registrarRecebimentoForm": [
      {
        "role": "localizar o título em aberto",
        "preferred": "groupsearchcontent--ml-search-bar"
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
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "estornarRecebimentoActions": [
      {
        "role": "botão de estorno",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do estorno",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "resultado do estorno",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
