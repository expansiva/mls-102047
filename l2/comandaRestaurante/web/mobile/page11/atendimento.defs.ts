/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/atendimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/posWorkbench/page21.md",
    "experience": "counterSplit"
  },
  "intent": "Em conteúdo estreito e fluido em torno de 390px, ainda usável em 360px e 430px, o garçom vê a comanda em atendimento, informa item, quantidade e observação, e confirma abertura, lançamento ou cancelamento em sequência vertical, sem grade fixa.",
  "sections": [
    {
      "id": "conferencia",
      "priority": "primary",
      "purpose": "No topo da faixa estreita, destacar a comanda, os itens e o subtotal para o garçom conferir o atendimento em curso.",
      "organisms": [
        "detalheComanda"
      ]
    },
    {
      "id": "operacao",
      "priority": "main",
      "purpose": "Em seguida, oferecer o formulário de lançamento e as ações de confirmar, em empilhamento fluido legível em 360px a 430px.",
      "organisms": [
        "formularioLancamento",
        "acoesAtendimento"
      ]
    },
    {
      "id": "localizacao",
      "priority": "secondary",
      "purpose": "Abaixo, manter a busca de mesas, comandas e cardápio quando o garçom precisa trocar de contexto nesta faixa estreita.",
      "organisms": [
        "lookupAtendimento"
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
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "detalheComanda": [
      {
        "role": "metrica",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "tabela",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "formularioLancamento": [
      {
        "role": "selecao",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select-one-autocomplete"
      },
      {
        "role": "numero",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      },
      {
        "role": "texto",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-multiline-text"
      }
    ],
    "acoesAtendimento": [
      {
        "role": "acao",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "notificacao",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
