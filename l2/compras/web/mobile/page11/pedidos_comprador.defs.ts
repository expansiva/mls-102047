/// <mls fileReference="_102047_/l2/compras/web/mobile/page11/pedidos_comprador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "No celular, o comprador acompanha seus pedidos em uma coluna fluida de cerca de 390px (usável de 360px a 430px): primeiro a lista com a situação, depois abrir um pedido com itens, revisar e enviar o pedido escolhido, e por fim ver o que aconteceu com ele.",
  "sections": [
    {
      "id": "carteiraPedidos",
      "priority": "primary",
      "purpose": "Ver os meus pedidos empilhados, com situação e valor bem visíveis, e tocar em um para revisá-lo.",
      "organisms": [
        "listaPedidos"
      ]
    },
    {
      "id": "pedidoSelecionado",
      "priority": "main",
      "purpose": "Conferir o pedido tocado e enviá-lo com um toque, sabendo se vai para aprovação ou direto ao fornecedor.",
      "organisms": [
        "revisaoPedido",
        "envioPedido"
      ]
    },
    {
      "id": "montagemPedido",
      "priority": "main",
      "purpose": "Abrir um pedido e incluir itens um a um, com o total sempre à vista.",
      "organisms": [
        "abrirPedido"
      ]
    },
    {
      "id": "acompanhamento",
      "priority": "secondary",
      "purpose": "Acompanhar envio, decisão do gerente e recebimentos do pedido.",
      "organisms": [
        "historicoPedido"
      ]
    }
  ],
  "organisms": {
    "listaPedidos": {
      "kind": "list",
      "text": "Meus pedidos com número, fornecedor, data de abertura, data de envio, valor total e situação (em aberto, aguardando aprovação, liberado, atrasado), em linhas empilhadas fáceis de tocar.",
      "intents": []
    },
    "abrirPedido": {
      "kind": "form",
      "text": "Abrir pedido escolhendo o fornecedor e incluir os itens com produto, quantidade e preço sugerido pelo preço combinado; o valor de cada item e o total são calculados e ficam visíveis enquanto o pedido é montado.",
      "intents": [
        {
          "id": "abrirPedidoCompra",
          "kind": "submit"
        },
        {
          "id": "incluirItemPedido",
          "kind": "submit"
        }
      ]
    },
    "revisaoPedido": {
      "kind": "detail",
      "text": "Revisar o pedido: itens, valor total do item, quantidade recebida, quantidade pendente e se foi recebido totalmente, com o valor total do pedido no topo.",
      "intents": []
    },
    "envioPedido": {
      "kind": "actions",
      "text": "Enviar o pedido informando a entrega prevista: acima do valor limite ele segue para aprovação do gerente, senão vai direto ao fornecedor.",
      "intents": [
        {
          "id": "enviarPedido",
          "kind": "submit"
        }
      ]
    },
    "historicoPedido": {
      "kind": "timeline",
      "text": "O que aconteceu com o pedido: envio, decisão do gerente e data, recebimentos registrados com tipo e quantidade total recebida.",
      "intents": []
    }
  },
  "molecules": {
    "listaPedidos": [
      {
        "role": "meus pedidos em linhas empilhadas",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "abrirPedido": [
      {
        "role": "escolher o fornecedor do pedido",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "escolher o produto do item",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "quantidade pedida",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      },
      {
        "role": "preço unitário sugerido pelo preço combinado",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "itens já incluídos",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "valor total do pedido",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "abrir pedido e incluir item",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "revisaoPedido": [
      {
        "role": "itens do pedido com recebido e pendente",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "quanto do item já foi recebido",
        "preferred": "groupshowprogress--ml-linear-progress"
      }
    ],
    "envioPedido": [
      {
        "role": "enviar o pedido",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do destino do pedido",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "historicoPedido": [
      {
        "role": "eventos do pedido em ordem de tempo",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
