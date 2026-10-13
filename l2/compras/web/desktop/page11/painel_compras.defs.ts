/// <mls fileReference="_102047_/l2/compras/web/desktop/page11/painel_compras.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar ao gerente de compras uma visão do mês — pedidos em aberto, atrasados e total comprado por fornecedor — e permitir decidir na hora os pedidos acima do valor limite e abrir os pedidos atrasados.",
  "sections": [
    {
      "id": "indicadoresMes",
      "priority": "primary",
      "purpose": "Mostrar logo no topo os números do mês: pedidos em aberto, pedidos atrasados e o total comprado por fornecedor, para o gerente saber como estão as compras.",
      "organisms": [
        "painelMes"
      ]
    },
    {
      "id": "situacaoPedidos",
      "priority": "main",
      "purpose": "Resumir em que ponto do ciclo estão os pedidos: aguardando aprovação, liberados ao fornecedor e quantidade que ainda falta chegar.",
      "organisms": [
        "resumoSituacao"
      ]
    },
    {
      "id": "decisoesEExcecoes",
      "priority": "main",
      "purpose": "Reunir o que exige atenção do gerente: pedidos acima do limite esperando decisão e pedidos atrasados para acompanhar.",
      "organisms": [
        "aprovacoesPendentes",
        "pedidosAtrasados"
      ]
    }
  ],
  "organisms": {
    "painelMes": {
      "kind": "highlights",
      "text": "Painel do mês: quantos pedidos estão em aberto, quantos estão atrasados e quanto foi comprado de cada fornecedor no mês.",
      "intents": []
    },
    "resumoSituacao": {
      "kind": "summary",
      "text": "Quantos pedidos aguardam aprovação, quantos já foram liberados ao fornecedor e a quantidade ainda pendente de chegada.",
      "intents": []
    },
    "aprovacoesPendentes": {
      "kind": "inbox",
      "text": "Pedidos acima do valor limite esperando minha decisão, com número, fornecedor, comprador, data de envio e valor total; aprovo para liberar ao fornecedor ou rejeito informando o motivo.",
      "intents": [
        {
          "id": "aprovarPedido",
          "kind": "submit"
        },
        {
          "id": "rejeitarPedido",
          "kind": "submit"
        },
        {
          "id": "analisarPedido",
          "kind": "navigate",
          "to": "pedidos_aprovacao"
        }
      ]
    },
    "pedidosAtrasados": {
      "kind": "list",
      "text": "Pedidos atrasados com número, fornecedor, entrega prevista, valor total e quantidade pendente, para abrir e ver itens e recebimentos.",
      "intents": [
        {
          "id": "abrirPedidoAtrasado",
          "kind": "navigate",
          "to": "pedidos_aprovacao"
        }
      ]
    }
  },
  "molecules": {
    "painelMes": [
      {
        "role": "Indicadores de pedidos em aberto e atrasados no mês",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Total comprado no mês por fornecedor",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      }
    ],
    "resumoSituacao": [
      {
        "role": "Contagens de aguardando aprovação, liberados e quantidade pendente",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "aprovacoesPendentes": [
      {
        "role": "Fila de pedidos aguardando decisão",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Aprovar ou rejeitar o pedido",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "Confirmação da decisão registrada",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "pedidosAtrasados": [
      {
        "role": "Lista de pedidos atrasados",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "Navegar pelas páginas da lista",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ]
  }
} as const;
