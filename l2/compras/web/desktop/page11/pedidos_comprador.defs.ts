/// <mls fileReference="_102047_/l2/compras/web/desktop/page11/pedidos_comprador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Dar ao comprador uma mesa de trabalho com todos os seus pedidos de compra: ver a situação de cada um, abrir um novo pedido para um fornecedor com itens a preço combinado, revisar valores e recebimentos, enviar o pedido e acompanhar o que aconteceu depois.",
  "sections": [
    {
      "id": "carteiraPedidos",
      "priority": "primary",
      "purpose": "Mostrar de relance os meus pedidos e a situação de cada um, para escolher qual abrir, revisar ou enviar.",
      "organisms": [
        "listaPedidos"
      ]
    },
    {
      "id": "montagemPedido",
      "priority": "main",
      "purpose": "Abrir um pedido para o fornecedor escolhido e incluir os itens, vendo o valor de cada item e o total calculados.",
      "organisms": [
        "abrirPedido"
      ]
    },
    {
      "id": "pedidoSelecionado",
      "priority": "main",
      "purpose": "Conferir o pedido escolhido na lista e enviá-lo, sabendo se vai para aprovação do gerente ou direto ao fornecedor.",
      "organisms": [
        "revisaoPedido",
        "envioPedido"
      ]
    },
    {
      "id": "acompanhamento",
      "priority": "secondary",
      "purpose": "Contar a história do pedido depois do envio: decisão do gerente e recebimentos registrados.",
      "organisms": [
        "historicoPedido"
      ]
    }
  ],
  "organisms": {
    "listaPedidos": {
      "kind": "list",
      "text": "Meus pedidos com número, fornecedor, data de abertura, data de envio, valor total e situação (em aberto, aguardando aprovação, liberado, atrasado). Escolher um pedido abre sua revisão ao lado.",
      "intents": []
    },
    "abrirPedido": {
      "kind": "form",
      "text": "Abrir pedido escolhendo o fornecedor e incluir os itens com produto, quantidade e preço sugerido pelo preço combinado; o valor de cada item e o total do pedido são calculados enquanto o comprador monta o pedido.",
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
      "text": "Revisar o pedido: itens com produto, quantidade, preço, valor total do item, quantidade recebida, quantidade pendente e se foi recebido totalmente, além do valor total do pedido.",
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
      "text": "O que aconteceu com o pedido: envio, decisão do gerente e data, recebimentos registrados com número, tipo (total ou parcial) e quantidade total recebida.",
      "intents": []
    }
  },
  "molecules": {
    "listaPedidos": [
      {
        "role": "tabela dos meus pedidos com situação e valor",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "abrirPedido": [
      {
        "role": "escolher o fornecedor do pedido",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select-one-autocomplete"
      },
      {
        "role": "escolher o produto do item",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "quantidade pedida",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      },
      {
        "role": "preço unitário sugerido pelo preço combinado",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "itens já incluídos com valor do item",
        "preferred": "groupviewtable--ml-inline-edit-table",
        "alternative": "groupviewtable--ml-data-table-minimal"
      },
      {
        "role": "valor total do pedido",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "abrir pedido e incluir item",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ],
    "revisaoPedido": [
      {
        "role": "itens do pedido com recebido e pendente",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "quanto do item já foi recebido",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      }
    ],
    "envioPedido": [
      {
        "role": "enviar o pedido",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "aviso de aprovação do gerente ou envio direto",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
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
