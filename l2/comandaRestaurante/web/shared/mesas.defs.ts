/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/mesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "mesaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:mesaForm",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:mesasList",
        "persist": true
      }
    }
  },
  "forms": {
    "createMesa": {
      "organism": "mesaForm",
      "submit": "createMesa"
    },
    "updateMesa": {
      "organism": "mesaForm",
      "submit": "updateMesa"
    }
  },
  "requests": {
    "load": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "mesas"
      ]
    },
    "loadMesas": {
      "kind": "qry",
      "trigger": "loadMesas",
      "returns": [
        "mesas"
      ]
    },
    "createMesa": {
      "kind": "cmd",
      "trigger": "createMesa",
      "returns": [
        "mesa"
      ],
      "writes": "Mesa.create"
    },
    "updateMesa": {
      "kind": "cmd",
      "trigger": "updateMesa",
      "returns": [
        "mesa"
      ],
      "writes": "Mesa.update"
    }
  },
  "states": {
    "mesas": {
      "source": "load.mesas",
      "description": "Mesas carregadas para consulta e seleção."
    },
    "mesaSelecionada": {
      "source": "entry.params.mesaId",
      "description": "Mesa selecionada para edição no formulário."
    },
    "pagina": {
      "source": "entry.params.page",
      "description": "Página atual da lista de mesas."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega a lista inicial de mesas.",
      "calls": "load",
      "sets": "mesas"
    },
    "filterMesasList": {
      "description": "Recarrega a lista de mesas conforme os filtros e a página atual.",
      "calls": "loadMesas",
      "sets": "mesas"
    },
    "loadMoreMesasList": {
      "description": "Carrega a próxima página da lista de mesas.",
      "calls": "loadMesas",
      "sets": "mesas"
    },
    "createMesa": {
      "description": "Cria uma mesa a partir dos dados do formulário.",
      "calls": "createMesa",
      "sets": "mesaSelecionada",
      "updates": [
        "mesas"
      ]
    },
    "updateMesa": {
      "description": "Atualiza a mesa selecionada com os dados do formulário.",
      "calls": "updateMesa",
      "sets": "mesaSelecionada",
      "updates": [
        "mesas"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "load": [
      "mesaDisponivelParaAbrirComanda"
    ],
    "loadMesas": [
      "mesaDisponivelParaAbrirComanda"
    ],
    "createMesa": [
      "mesaDisponivelParaAbrirComanda"
    ],
    "updateMesa": [
      "mesaDisponivelParaAbrirComanda"
    ]
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
