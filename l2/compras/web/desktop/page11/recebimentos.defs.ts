/// <mls fileReference="_102047_/l2/compras/web/desktop/page11/recebimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Permitir ao almoxarife localizar os pedidos liberados ao fornecedor que aguardam chegada, conferir os itens pendentes e registrar o recebimento total ou parcial, que dá entrada no estoque dos produtos recebidos.",
  "sections": [
    {
      "id": "filaChegada",
      "priority": "primary",
      "purpose": "Mostrar a fila de pedidos liberados aguardando chegada e um resumo dos pedidos em aberto e atrasados, para o almoxarife saber o que deve chegar e o que está atrasado.",
      "organisms": [
        "pedidosAguardandoChegada",
        "situacaoPendencias"
      ]
    },
    {
      "id": "conferenciaRegistro",
      "priority": "main",
      "purpose": "Conferir os itens do pedido escolhido e registrar as quantidades que chegaram em cada item.",
      "organisms": [
        "conferenciaItens",
        "registroRecebimento"
      ]
    },
    {
      "id": "historico",
      "priority": "secondary",
      "purpose": "Mostrar os recebimentos já registrados do pedido e as entradas no estoque que o sistema gerou para cada um.",
      "organisms": [
        "historicoRecebimentos"
      ]
    }
  ],
  "organisms": {
    "pedidosAguardandoChegada": {
      "kind": "inbox",
      "text": "Pedidos liberados ao fornecedor aguardando chegada, total ou dos itens pendentes. O almoxarife busca pelo número do pedido ou pelo fornecedor e escolhe o pedido que chegou.",
      "intents": []
    },
    "situacaoPendencias": {
      "kind": "summary",
      "text": "Pedidos em aberto e atrasados, com a quantidade pendente de cada pedido. Ajuda a priorizar a conferência das entregas.",
      "intents": []
    },
    "conferenciaItens": {
      "kind": "detail",
      "text": "Itens do pedido escolhido para conferência: produto, código, unidade, fornecedor, quantidade pedida, recebida e pendente, e se o item já foi recebido totalmente.",
      "intents": []
    },
    "registroRecebimento": {
      "kind": "form",
      "text": "Registrar a data da chegada e a quantidade recebida de cada item, total ou parcialmente, com observações sobre avarias ou divergências. Ao confirmar, o recebimento dá entrada no estoque.",
      "intents": [
        {
          "id": "registrarRecebimento",
          "kind": "submit"
        }
      ]
    },
    "historicoRecebimentos": {
      "kind": "timeline",
      "text": "Recebimentos registrados, com tipo e quantidade total recebida, e as entradas no estoque que o sistema gerou, com número, data, valor e se já foi publicada. Se o recebimento foi parcial, o pedido volta a aguardar os itens pendentes.",
      "intents": []
    }
  },
  "molecules": {
    "pedidosAguardandoChegada": [
      {
        "role": "Buscar pedido pelo número ou fornecedor",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Fila de pedidos aguardando chegada",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "situacaoPendencias": [
      {
        "role": "Contagem de pedidos em aberto e atrasados",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Quantidade pendente por pedido",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewchart--ml-bar-chart"
      }
    ],
    "conferenciaItens": [
      {
        "role": "Itens com quantidades pedida, recebida e pendente",
        "preferred": "groupviewtable--ml-view-table",
        "alternative": "groupviewtable--ml-data-table"
      },
      {
        "role": "Andamento do recebimento do item",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-segmented-progress"
      }
    ],
    "registroRecebimento": [
      {
        "role": "Quantidade recebida por item",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      },
      {
        "role": "Confirmar o recebimento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação ou erro do registro",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "historicoRecebimentos": [
      {
        "role": "Linha do tempo dos recebimentos",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupexpandcontent--ml-accordion"
      },
      {
        "role": "Entradas no estoque de cada recebimento",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
