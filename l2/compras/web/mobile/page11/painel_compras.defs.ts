/// <mls fileReference="_102047_/l2/compras/web/mobile/page11/painel_compras.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "No celular, em coluna fluida estreita (cerca de 390px, usável de 360px a 430px), o gerente vê primeiro as decisões pendentes e os números do mês, aprova ou rejeita pedidos acima do limite e abre os atrasados.",
  "sections": [
    {
      "id": "indicadoresMes",
      "priority": "primary",
      "purpose": "Números do mês empilhados: pedidos em aberto, atrasados e total comprado por fornecedor, legíveis em tela estreita.",
      "organisms": [
        "painelMes"
      ]
    },
    {
      "id": "decisoesEExcecoes",
      "priority": "main",
      "purpose": "Pedidos acima do limite para decidir com um toque e pedidos atrasados para abrir, em cartões que ocupam a largura da tela.",
      "organisms": [
        "aprovacoesPendentes",
        "pedidosAtrasados"
      ]
    },
    {
      "id": "situacaoPedidos",
      "priority": "secondary",
      "purpose": "Resumo compacto de pedidos aguardando aprovação, liberados ao fornecedor e quantidade pendente de chegada.",
      "organisms": [
        "resumoSituacao"
      ]
    }
  ],
  "organisms": {
    "painelMes": {
      "kind": "highlights",
      "text": "Painel do mês: pedidos em aberto, pedidos atrasados e total comprado por fornecedor, em indicadores empilhados.",
      "intents": []
    },
    "resumoSituacao": {
      "kind": "summary",
      "text": "Pedidos aguardando aprovação, liberados ao fornecedor e quantidade pendente de chegada.",
      "intents": []
    },
    "aprovacoesPendentes": {
      "kind": "inbox",
      "text": "Pedidos acima do valor limite esperando minha decisão, cada um com fornecedor, valor total e data de envio; aprovo ou rejeito informando o motivo.",
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
      "text": "Pedidos atrasados com fornecedor, entrega prevista e quantidade pendente; toque para abrir o detalhe.",
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
        "role": "Indicadores de pedidos em aberto e atrasados",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Total comprado por fornecedor",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      }
    ],
    "resumoSituacao": [
      {
        "role": "Contagens da situação dos pedidos",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "aprovacoesPendentes": [
      {
        "role": "Cartões de pedidos aguardando decisão",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Aprovar ou rejeitar",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação da decisão",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "pedidosAtrasados": [
      {
        "role": "Lista de pedidos atrasados",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ]
  }
} as const;
