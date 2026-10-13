/// <mls fileReference="_102047_/l2/financeiro/web/desktop/page11/titulos_pagador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Mostrar ao gerente financeiro ou ao próprio pagador a situação completa dos títulos do pagador: quanto já foi recebido, quanto está em aberto e o que está vencido. Daqui o gerente emite o extrato e o pagador paga com cartão um título em aberto.",
  "sections": [
    {
      "id": "situacaoPagador",
      "priority": "primary",
      "purpose": "Dar logo de início a visão do pagador: total recebido, saldo em aberto e títulos vencidos.",
      "organisms": [
        "resumoPagador"
      ]
    },
    {
      "id": "titulosEDetalhe",
      "priority": "main",
      "purpose": "Listar os títulos do pagador com a situação de cada um e abrir o título escolhido para conferir valor, vencimento, total recebido e saldo.",
      "organisms": [
        "titulosDoPagador",
        "detalheTitulo"
      ]
    },
    {
      "id": "historicoRecebimentos",
      "priority": "secondary",
      "purpose": "Mostrar em ordem de data os recebimentos do pagador, incluindo os estornos, como base do extrato.",
      "organisms": [
        "recebimentosDoPagador"
      ]
    },
    {
      "id": "acoesPagador",
      "priority": "secondary",
      "purpose": "Emitir o extrato de títulos e recebimentos e, no portal, pagar com cartão o título em aberto escolhido.",
      "organisms": [
        "acoesExtratoPagamento"
      ]
    }
  ],
  "organisms": {
    "resumoPagador": {
      "kind": "summary",
      "text": "Total recebido, saldo em aberto e títulos vencidos do pagador, para entender de imediato a posição dele.",
      "intents": []
    },
    "titulosDoPagador": {
      "kind": "list",
      "text": "Títulos do pagador com número, origem, vencimento, valor, saldo e situação: em aberto, quitado, baixa parcial ou vencido. O título escolhido abre no detalhe.",
      "intents": []
    },
    "detalheTitulo": {
      "kind": "detail",
      "text": "O título escolhido com valor, vencimento, documento de origem, total recebido, saldo em aberto e dias de atraso, para conferir antes de pagar ou cobrar.",
      "intents": []
    },
    "recebimentosDoPagador": {
      "kind": "timeline",
      "text": "Recebimentos do pagador em ordem de data, com valor, forma de pagamento, baixa parcial e estornos.",
      "intents": []
    },
    "acoesExtratoPagamento": {
      "kind": "actions",
      "text": "O gerente emite o extrato de títulos e recebimentos do período. O pagador paga com cartão o saldo do título em aberto escolhido e recebe a confirmação.",
      "intents": [
        {
          "id": "pagarComCartao",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "resumoPagador": [
      {
        "role": "Indicadores de total recebido, saldo em aberto e vencidos",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "titulosDoPagador": [
      {
        "role": "Tabela de títulos com situação",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "detalheTitulo": [
      {
        "role": "Ficha do título selecionado",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Destaque do saldo em aberto",
        "preferred": "groupviewmetric--ml-metric-card"
      }
    ],
    "recebimentosDoPagador": [
      {
        "role": "Linha do tempo de recebimentos e estornos",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewtable--ml-data-table-minimal"
      }
    ],
    "acoesExtratoPagamento": [
      {
        "role": "Período do extrato",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-date-range-dual-calendar"
      },
      {
        "role": "Emitir extrato e pagar com cartão",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "Andamento do pagamento",
        "preferred": "groupshowprogress--ml-indeterminate-spinner"
      },
      {
        "role": "Confirmação do pagamento",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
