/// <mls fileReference="_102047_/l2/compras/web/desktop/page11/pedidos_aprovacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Permitir ao gerente de compras localizar os pedidos da organização, sobretudo os que aguardam sua aprovação ou estão atrasados, analisar o pedido escolhido e decidir aprová-lo ou rejeitá-lo, vendo ao lado tudo o que já aconteceu com ele.",
  "sections": [
    {
      "id": "pedidos",
      "priority": "primary",
      "purpose": "Lista de todos os pedidos de compra com número, fornecedor, comprador, data de abertura, entrega prevista, valor total e situação. Tem filtros rápidos para pendentes de aprovação e atrasados, para que o gerente chegue logo ao que exige sua atenção.",
      "organisms": [
        "listaPedidos"
      ]
    },
    {
      "id": "analiseDecisao",
      "priority": "main",
      "purpose": "Análise do pedido selecionado e decisão sobre ele: fornecedor, comprador, itens com quantidades e preços, valor total, o que já foi recebido e o que falta, e os botões para aprovar ou rejeitar.",
      "organisms": [
        "detalhePedido",
        "decisaoPedido"
      ]
    },
    {
      "id": "historico",
      "priority": "secondary",
      "purpose": "Linha do tempo do pedido para dar contexto à decisão e ao acompanhamento: envio, decisão do gerente, recebimentos e entradas no estoque geradas pelo sistema.",
      "organisms": [
        "historicoPedido"
      ]
    }
  ],
  "organisms": {
    "listaPedidos": {
      "kind": "list",
      "text": "Todos os pedidos de compra da organização, com número, fornecedor, comprador, data de abertura, entrega prevista, valor total, quantidade pendente e situação. Os filtros rápidos mostram só os pendentes de aprovação ou só os atrasados. Ao escolher um pedido, a análise dele abre ao lado.",
      "intents": []
    },
    "detalhePedido": {
      "kind": "detail",
      "text": "Análise do pedido: fornecedor com razão social e CNPJ, comprador, condição de pagamento, entrega prevista e observações. Mostra os itens com produto, quantidade pedida, preço unitário, valor do item, quantidade recebida, quantidade pendente e se o item já chegou por inteiro, além do valor total e da quantidade pendente do pedido.",
      "intents": []
    },
    "decisaoPedido": {
      "kind": "actions",
      "text": "Decisão do gerente sobre um pedido acima do valor limite que aguarda aprovação. Aprovar libera o pedido ao fornecedor. Rejeitar encerra o processo e exige informar o motivo. Quando o pedido não aguarda decisão, as ações ficam indisponíveis.",
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
      "text": "Histórico do pedido em ordem cronológica: data de envio pelo comprador, data da decisão do gerente e o motivo quando rejeitado, recebimentos registrados pelo almoxarife com número, data, tipo (total ou parcial) e quantidade recebida, e as entradas no estoque feitas pelo sistema com número, data, valor e se já foram publicadas ao estoque.",
      "intents": []
    }
  },
  "molecules": {
    "listaPedidos": [
      {
        "role": "Tabela de pedidos com ordenação; ao escolher um pedido, a análise abre ao lado",
        "preferred": "groupviewtable--ml-side-detail-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "Filtro rápido: todos, pendentes de aprovação ou atrasados",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "detalhePedido": [
      {
        "role": "Itens do pedido com quantidades pedida, recebida e pendente e com os valores",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "Destaque do valor total e da quantidade pendente do pedido",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Andamento do recebimento do pedido",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
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
        "role": "Eventos do pedido em ordem cronológica",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
