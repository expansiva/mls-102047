/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/cardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
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
    "carregarCatalogoCardapio": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "catalogo"
      ]
    },
    "consultarPaginaCardapio": {
      "kind": "qry",
      "trigger": "consultarPaginaCardapio",
      "returns": [
        "catalogo"
      ]
    },
    "cadastrarItemCardapio": {
      "kind": "cmd",
      "trigger": "cadastrarItemCardapio",
      "returns": [
        "item"
      ],
      "writes": "ItemCardapio.create"
    },
    "atualizarItemCardapio": {
      "kind": "cmd",
      "trigger": "atualizarItemCardapio",
      "returns": [
        "item"
      ],
      "writes": "ItemCardapio.update"
    }
  },
  "states": {
    "catalogoCardapio": {
      "source": "carregarCatalogoCardapio.catalogo",
      "description": "listaItensCardapio"
    },
    "itemCardapioSelecionado": {
      "source": "selecionarItemCardapio",
      "description": "formularioItemCardapio"
    }
  },
  "functions": {
    "carregarCatalogoCardapio": {
      "description": "carregarCatalogoCardapio",
      "calls": "carregarCatalogoCardapio",
      "sets": "catalogoCardapio",
      "updates": [
        "catalogoCardapio"
      ]
    },
    "consultarPaginaCardapio": {
      "description": "consultarPaginaCardapio",
      "calls": "consultarPaginaCardapio",
      "sets": "catalogoCardapio",
      "updates": [
        "catalogoCardapio"
      ]
    },
    "selecionarItemCardapio": {
      "description": "selecionarItemCardapio",
      "sets": "itemCardapioSelecionado",
      "updates": [
        "itemCardapioSelecionado"
      ]
    },
    "cadastrarItemCardapio": {
      "description": "cadastrarItemCardapio",
      "calls": "cadastrarItemCardapio",
      "sets": "itemCardapioSelecionado",
      "updates": [
        "catalogoCardapio",
        "itemCardapioSelecionado"
      ]
    },
    "atualizarItemCardapio": {
      "description": "atualizarItemCardapio",
      "calls": "atualizarItemCardapio",
      "sets": "itemCardapioSelecionado",
      "updates": [
        "catalogoCardapio",
        "itemCardapioSelecionado"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "carregarCatalogoCardapio": [],
    "consultarPaginaCardapio": [],
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
