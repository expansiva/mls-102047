/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/cardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "id": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaItensCardapio",
        "persist": true
      },
      "itemCardapioId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:formularioItemCardapio",
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
    "carregarItensCardapio": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "pagina"
      ]
    },
    "carregarMaisItensCardapio": {
      "kind": "qry",
      "trigger": "carregarMaisItensCardapio",
      "returns": [
        "pagina"
      ]
    },
    "obterItemCardapio": {
      "kind": "qry",
      "trigger": "obterItemCardapio",
      "returns": [
        "item"
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
    "pagina": {
      "source": "carregarItensCardapio.pagina",
      "description": "Faixa ordenada do catálogo para leitura contínua, com indicação de mais resultados."
    },
    "item": {
      "source": "obterItemCardapio.item",
      "description": "Dados autorizados para preencher e manter o item selecionado no formulário."
    },
    "selectedItemCardapio": {
      "source": "entry.params.itemCardapioId",
      "description": "Dados autorizados para preencher e manter o item selecionado no formulário."
    }
  },
  "functions": {
    "carregarItensCardapio": {
      "description": "Carrega a primeira faixa do catálogo ao abrir a página, para o caixa conferir e selecionar itens para manutenção.",
      "calls": "carregarItensCardapio",
      "sets": "pagina"
    },
    "carregarMaisItensCardapio": {
      "description": "Carrega a próxima faixa do catálogo sem transferir todos os itens cadastrados. (pagina: append)",
      "calls": "carregarMaisItensCardapio",
      "updates": [
        "pagina"
      ]
    },
    "obterItemCardapio": {
      "description": "Obtém o item escolhido no catálogo para preencher o formulário de manutenção.",
      "calls": "obterItemCardapio",
      "sets": "item"
    },
    "cadastrarItemCardapio": {
      "description": "Cadastra um item com nome e preço vigente para uso operacional no cardápio.",
      "calls": "cadastrarItemCardapio",
      "sets": "item",
      "updates": [
        "pagina"
      ]
    },
    "atualizarItemCardapio": {
      "description": "Atualiza o nome e o preço vigente do item selecionado, mantendo o catálogo usado pela operação.",
      "calls": "atualizarItemCardapio",
      "sets": "item",
      "updates": [
        "pagina"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "carregarItensCardapio": [],
    "carregarMaisItensCardapio": [],
    "obterItemCardapio": [],
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
