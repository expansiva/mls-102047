/// <mls fileReference="_102047_/l2/financeiro/web/desktop/page11/titulos_receber.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Permitir que o caixa e o gerente financeiro localizem um título a receber, confiram valor, vencimento, total recebido, saldo em aberto e dias de atraso, e que o caixa registre o recebimento total ou parcial em dinheiro, pix ou cartão via Stripe sem sair da tela.",
  "sections": [
    {
      "id": "panorama",
      "priority": "secondary",
      "purpose": "Dar uma visão rápida da posição dos títulos: quanto está em aberto, quanto já foi recebido e quantos títulos estão vencidos ou com baixa parcial.",
      "organisms": [
        "resumoTitulos"
      ]
    },
    {
      "id": "localizacao",
      "priority": "primary",
      "purpose": "Encontrar o título pelo número ou pelo nome do pagador e reconhecer de imediato se está quitado, vencido ou com baixa parcial.",
      "organisms": [
        "listaTitulos"
      ]
    },
    {
      "id": "conferenciaRecebimento",
      "priority": "main",
      "purpose": "Conferir o título escolhido e, ao lado, registrar o recebimento com o saldo em aberto à vista para evitar receber além do devido.",
      "organisms": [
        "detalheTitulo",
        "registroRecebimento"
      ]
    }
  ],
  "organisms": {
    "resumoTitulos": {
      "kind": "summary",
      "text": "Indicadores do saldo em aberto, do total recebido e da quantidade de títulos vencidos ou com baixa parcial, para saber onde está a pendência antes de atender.",
      "intents": []
    },
    "listaTitulos": {
      "kind": "list",
      "text": "Títulos a receber com número, pagador, vencimento, valor e saldo em aberto, com a situação de quitado, vencido ou baixa parcial; a busca por número ou pagador leva direto ao título a conferir.",
      "intents": []
    },
    "detalheTitulo": {
      "kind": "detail",
      "text": "Ficha do título selecionado: pagador, origem e documento de origem, valor, vencimento, total recebido, saldo em aberto, dias de atraso e os recebimentos já lançados.",
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
      "text": "O caixa informa o valor recebido e a forma de pagamento (dinheiro, pix ou cartão via Stripe); um valor menor que o saldo gera baixa parcial e o título fica quitado quando o saldo zera.",
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
        "role": "indicador de saldo em aberto, total recebido e vencidos",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "listaTitulos": [
      {
        "role": "busca do título por número ou pagador",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "tabela de títulos com situação e saldo",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "detalheTitulo": [
      {
        "role": "ficha do título selecionado",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "destaque do saldo em aberto e dias de atraso",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
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
