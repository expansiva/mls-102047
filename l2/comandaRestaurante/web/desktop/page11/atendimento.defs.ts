/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/atendimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/posWorkbench/page21.md",
    "experience": "counterSplit"
  },
  "intent": "Permitir ao garçom conduzir o atendimento: localizar mesa disponível, comanda aberta ou item do cardápio, conferir os lançamentos e o subtotal da comanda, informar o pedido e confirmar a abertura, o lançamento ou o cancelamento.",
  "sections": [
    {
      "id": "localizacao",
      "priority": "primary",
      "purpose": "Reunir mesas disponíveis, comandas abertas e itens do cardápio para o garçom achar o contexto do atendimento.",
      "organisms": [
        "lookupAtendimento"
      ]
    },
    {
      "id": "conferencia",
      "priority": "main",
      "purpose": "Mostrar a comanda escolhida, os itens lançados e o subtotal para conferência antes de agir.",
      "organisms": [
        "detalheComanda"
      ]
    },
    {
      "id": "operacao",
      "priority": "secondary",
      "purpose": "Concentrar a entrada do pedido e as confirmações de abrir a comanda, lançar o item e cancelar o item indevido.",
      "organisms": [
        "formularioLancamento",
        "acoesAtendimento"
      ]
    }
  ],
  "organisms": {
    "lookupAtendimento": {
      "kind": "list",
      "text": "Mostra mesas disponíveis, comandas abertas e itens do cardápio para o garçom localizar o contexto do atendimento e escolher mesa, comanda ou item.",
      "intents": []
    },
    "detalheComanda": {
      "kind": "detail",
      "text": "Apresenta a comanda selecionada, os itens lançados com quantidade e situação, e o subtotal, para o garçom conferir o pedido antes de lançar ou cancelar.",
      "intents": []
    },
    "formularioLancamento": {
      "kind": "form",
      "text": "Permite informar o item do cardápio, a quantidade e a observação do pedido para preparar o lançamento na comanda aberta.",
      "intents": []
    },
    "acoesAtendimento": {
      "kind": "actions",
      "text": "Reúne as confirmações para abrir a comanda da mesa disponível, lançar o item informado e cancelar o item lançado por engano, com retorno imediato ao garçom.",
      "intents": [
        {
          "id": "abrirComanda",
          "kind": "submit"
        },
        {
          "id": "lancarItem",
          "kind": "submit"
        },
        {
          "id": "cancelarItem",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "lookupAtendimento": [
      {
        "role": "navegacao",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "busca",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "colecao",
        "preferred": "groupviewdata--ml-card-grid",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "detalheComanda": [
      {
        "role": "metrica",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "tabela",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "formularioLancamento": [
      {
        "role": "selecao",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "numero",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      },
      {
        "role": "texto",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      }
    ],
    "acoesAtendimento": [
      {
        "role": "acao",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "notificacao",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
