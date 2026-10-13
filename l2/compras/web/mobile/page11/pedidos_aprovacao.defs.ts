/// <mls fileReference="_102047_/l2/compras/web/mobile/page11/pedidos_aprovacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "No celular, o gerente de compras encontra rapidamente os pedidos pendentes de aprovação ou atrasados, abre um pedido, confere o essencial e aprova ou rejeita. O conteúdo é fluido numa coluna estreita de cerca de 390px e continua legível em 360px e 430px.",
  "sections": [
    {
      "id": "pedidos",
      "priority": "primary",
      "purpose": "Lista compacta dos pedidos, um por linha empilhada, com número, fornecedor, valor total e situação. O filtro rápido para pendentes de aprovação ou atrasados fica no topo.",
      "organisms": [
        "listaPedidos"
      ]
    },
    {
      "id": "analiseDecisao",
      "priority": "main",
      "purpose": "Pedido aberto com o essencial para decidir: fornecedor, comprador, valor total e quantidade pendente primeiro, depois os itens, e as ações de aprovar ou rejeitar sempre ao alcance do polegar.",
      "organisms": [
        "detalhePedido",
        "decisaoPedido"
      ]
    },
    {
      "id": "historico",
      "priority": "secondary",
      "purpose": "Histórico do pedido abaixo da análise, para consultar quando necessário: envio, decisão, recebimentos e entradas no estoque.",
      "organisms": [
        "historicoPedido"
      ]
    }
  ],
  "organisms": {
    "listaPedidos": {
      "kind": "list",
      "text": "Todos os pedidos de compra da organização em linhas empilhadas, com número, fornecedor, comprador, valor total, entrega prevista e situação. Os filtros rápidos mostram só os pendentes de aprovação ou só os atrasados. Tocar num pedido abre a análise dele.",
      "intents": []
    },
    "detalhePedido": {
      "kind": "detail",
      "text": "Análise do pedido em coluna única: primeiro o valor total, a quantidade pendente, o fornecedor e o comprador. Depois os itens, cada um com produto, quantidade pedida, preço unitário, valor do item, quantidade recebida, quantidade pendente e se já chegou por inteiro. Por fim a condição de pagamento, a entrega prevista e as observações.",
      "intents": []
    },
    "decisaoPedido": {
      "kind": "actions",
      "text": "Aprovar o pedido que aguarda decisão, liberando-o ao fornecedor, ou rejeitá-lo informando o motivo, o que encerra o processo. As ações ficam indisponíveis quando o pedido não aguarda aprovação.",
      "intents": [
        {
          "id": "aprovarPedido",
          "kind": "submit"
        },
        {
          "id": "rejeitarPedido",
          "kind": "submit"
        }
      ]
    },
    "historicoPedido": {
      "kind": "timeline",
      "text": "Linha do tempo vertical do pedido: envio, decisão do gerente com data e motivo quando rejeitado, recebimentos com número, data, tipo e quantidade recebida, e entradas no estoque com número, data, valor e se já foram publicadas ao estoque.",
      "intents": []
    }
  },
  "molecules": {
    "listaPedidos": [
      {
        "role": "Lista empilhada de pedidos, legível em tela estreita",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Filtro rápido: todos, pendentes de aprovação ou atrasados",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      }
    ],
    "detalhePedido": [
      {
        "role": "Destaque do valor total e da quantidade pendente",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Itens do pedido adaptados à largura estreita",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Andamento do recebimento do pedido",
        "preferred": "groupshowprogress--ml-linear-progress"
      }
    ],
    "decisaoPedido": [
      {
        "role": "Botões de aprovar e de rejeitar o pedido",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação do resultado da decisão",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "historicoPedido": [
      {
        "role": "Eventos do pedido em linha do tempo vertical",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
