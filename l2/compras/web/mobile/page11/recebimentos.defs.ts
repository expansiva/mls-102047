/// <mls fileReference="_102047_/l2/compras/web/mobile/page11/recebimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "No celular, em conteúdo fluido estreito de cerca de 390px (também usável em 360px e 430px), permitir ao almoxarife achar o pedido que chegou, conferir os itens pendentes e registrar o recebimento total ou parcial, que dá entrada no estoque.",
  "sections": [
    {
      "id": "filaChegada",
      "priority": "primary",
      "purpose": "Mostrar primeiro a busca e a fila de pedidos aguardando chegada, com um resumo compacto dos pedidos em aberto e atrasados.",
      "organisms": [
        "pedidosAguardandoChegada",
        "situacaoPendencias"
      ]
    },
    {
      "id": "conferenciaRegistro",
      "priority": "main",
      "purpose": "Mostrar em sequência vertical os itens do pedido escolhido e o registro da quantidade recebida de cada item.",
      "organisms": [
        "conferenciaItens",
        "registroRecebimento"
      ]
    },
    {
      "id": "historico",
      "priority": "secondary",
      "purpose": "Mostrar no final os recebimentos registrados e as entradas no estoque geradas.",
      "organisms": [
        "historicoRecebimentos"
      ]
    }
  ],
  "organisms": {
    "pedidosAguardandoChegada": {
      "kind": "inbox",
      "text": "Pedidos liberados ao fornecedor aguardando chegada, em lista empilhada com número, fornecedor, entrega prevista e quantidade pendente. Toque para conferir o pedido.",
      "intents": []
    },
    "situacaoPendencias": {
      "kind": "summary",
      "text": "Indicadores compactos de pedidos em aberto e atrasados, com a quantidade pendente por pedido.",
      "intents": []
    },
    "conferenciaItens": {
      "kind": "detail",
      "text": "Itens do pedido em cartões empilhados: produto, código, unidade, quantidade pedida, recebida e pendente.",
      "intents": []
    },
    "registroRecebimento": {
      "kind": "form",
      "text": "Informar a data da chegada e a quantidade recebida de cada item, total ou parcial, com observações. A confirmação fica sempre ao alcance do polegar.",
      "intents": [
        {
          "id": "registrarRecebimento",
          "kind": "submit"
        }
      ]
    },
    "historicoRecebimentos": {
      "kind": "timeline",
      "text": "Recebimentos registrados com tipo e quantidade total, e as entradas no estoque geradas, com número, data, valor e se foram publicadas. Se o recebimento foi parcial, o pedido volta a aguardar os itens pendentes.",
      "intents": []
    }
  },
  "molecules": {
    "pedidosAguardandoChegada": [
      {
        "role": "Buscar pedido pelo número ou fornecedor",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Fila de pedidos aguardando chegada",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "situacaoPendencias": [
      {
        "role": "Pedidos em aberto e atrasados",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "conferenciaItens": [
      {
        "role": "Itens com quantidades pedida, recebida e pendente",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Andamento do recebimento do item",
        "preferred": "groupshowprogress--ml-linear-progress"
      }
    ],
    "registroRecebimento": [
      {
        "role": "Quantidade recebida por item",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
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
      }
    ]
  }
} as const;
