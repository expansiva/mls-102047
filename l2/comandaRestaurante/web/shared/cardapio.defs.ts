/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/cardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "itemCardapioId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:formularioItemCardapio",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaItensCardapio",
        "persist": true
      }
    }
  },
  "forms": {
    "cadastrarItemCardapio": {
      "organism": "formularioItemCardapio",
      "submit": "cadastrarItemCardapio"
    },
    "atualizarItemCardapio": {
      "organism": "formularioItemCardapio",
      "submit": "atualizarItemCardapio"
    }
  },
  "requests": {
    "load": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "cardapio"
      ]
    },
    "loadCardapio": {
      "kind": "qry",
      "trigger": "loadCardapio",
      "returns": [
        "cardapio"
      ]
    },
    "cadastrarItemCardapio": {
      "kind": "cmd",
      "trigger": "cadastrarItemCardapio",
      "returns": [
        "itemCardapio"
      ],
      "writes": "ItemCardapio.create"
    },
    "atualizarItemCardapio": {
      "kind": "cmd",
      "trigger": "atualizarItemCardapio",
      "returns": [
        "itemCardapio"
      ],
      "writes": "ItemCardapio.update"
    }
  },
  "states": {
    "cardapio": {
      "source": "load.cardapio",
      "description": "Itens do cardápio carregados."
    },
    "itemCardapio": {
      "source": "entry.params.itemCardapioId",
      "description": "Item do cardápio selecionado para edição."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega a primeira página de itens do cardápio.",
      "calls": "load",
      "sets": "cardapio"
    },
    "filterListaItensCardapio": {
      "description": "Recarrega a lista de itens do cardápio a partir da primeira página.",
      "calls": "loadCardapio",
      "sets": "cardapio"
    },
    "loadMoreListaItensCardapio": {
      "description": "Adiciona a próxima página de itens à lista do cardápio.",
      "calls": "loadCardapio",
      "sets": "cardapio"
    },
    "cadastrarItemCardapio": {
      "description": "Cadastra um item do cardápio.",
      "calls": "cadastrarItemCardapio",
      "sets": "itemCardapio",
      "updates": [
        "cardapio"
      ]
    },
    "atualizarItemCardapio": {
      "description": "Atualiza o item selecionado do cardápio.",
      "calls": "atualizarItemCardapio",
      "sets": "itemCardapio",
      "updates": [
        "cardapio"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "load": [],
    "loadCardapio": [],
    "cadastrarItemCardapio": [],
    "atualizarItemCardapio": []
  },
  "access": {
    "actors": [
      "caixa"
    ],
    "grants": [
      "caixaFechamentoEcadastroOperacional"
    ]
  }
} as const;
