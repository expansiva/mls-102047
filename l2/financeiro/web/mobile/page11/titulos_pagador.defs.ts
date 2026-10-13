/// <mls fileReference="_102047_/l2/financeiro/web/mobile/page11/titulos_pagador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "No celular, mostrar ao pagador ou ao gerente a posição do pagador em leitura vertical e fluida, com cerca de 390px de largura e uso confortável entre 360px e 430px. Primeiro o resumo, depois os títulos e o título escolhido, o histórico de recebimentos e por fim o pagamento com cartão ou a emissão do extrato.",
  "sections": [
    {
      "id": "situacaoPagador",
      "priority": "primary",
      "purpose": "Mostrar no topo, de forma compacta, o total recebido, o saldo em aberto e os vencidos.",
      "organisms": [
        "resumoPagador"
      ]
    },
    {
      "id": "titulosEDetalhe",
      "priority": "main",
      "purpose": "Listar os títulos em itens empilhados com a situação de cada um. Ao tocar, o título abre com valor, vencimento e saldo.",
      "organisms": [
        "titulosDoPagador",
        "detalheTitulo"
      ]
    },
    {
      "id": "historicoRecebimentos",
      "priority": "secondary",
      "purpose": "Mostrar em ordem de data os recebimentos e estornos do pagador.",
      "organisms": [
        "recebimentosDoPagador"
      ]
    },
    {
      "id": "acoesPagador",
      "priority": "secondary",
      "purpose": "Pagar com cartão o título em aberto escolhido ou emitir o extrato, com botões em toda a largura.",
      "organisms": [
        "acoesExtratoPagamento"
      ]
    }
  ],
  "organisms": {
    "resumoPagador": {
      "kind": "summary",
      "text": "Total recebido, saldo em aberto e títulos vencidos do pagador, em indicadores compactos.",
      "intents": []
    },
    "titulosDoPagador": {
      "kind": "list",
      "text": "Títulos do pagador em lista vertical com número, vencimento, saldo e situação: em aberto, quitado, baixa parcial ou vencido.",
      "intents": []
    },
    "detalheTitulo": {
      "kind": "detail",
      "text": "O título tocado com valor, vencimento, documento de origem, total recebido, saldo em aberto e dias de atraso.",
      "intents": []
    },
    "recebimentosDoPagador": {
      "kind": "timeline",
      "text": "Recebimentos do pagador por data, com valor, forma de pagamento e estornos.",
      "intents": []
    },
    "acoesExtratoPagamento": {
      "kind": "actions",
      "text": "O pagador paga com cartão o saldo do título em aberto. O gerente emite o extrato de títulos e recebimentos.",
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
        "role": "Indicadores compactos do pagador",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "titulosDoPagador": [
      {
        "role": "Lista vertical de títulos",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "detalheTitulo": [
      {
        "role": "Ficha do título tocado",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "recebimentosDoPagador": [
      {
        "role": "Linha do tempo de recebimentos e estornos",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "acoesExtratoPagamento": [
      {
        "role": "Período do extrato",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-month-year-range"
      },
      {
        "role": "Pagar com cartão e emitir extrato",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
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
