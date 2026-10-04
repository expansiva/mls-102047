/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/mesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
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
    "carregarMesas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "pagina"
      ]
    },
    "buscarMesas": {
      "kind": "qry",
      "trigger": "buscarMesas",
      "returns": [
        "pagina"
      ]
    },
    "criarMesa": {
      "kind": "cmd",
      "trigger": "createMesa",
      "returns": [
        "mesa"
      ],
      "writes": "Mesa.create"
    },
    "atualizarMesa": {
      "kind": "cmd",
      "trigger": "updateMesa",
      "returns": [
        "mesa"
      ],
      "writes": "Mesa.update"
    }
  },
  "states": {
    "paginaMesas": {
      "source": "carregarMesas.pagina",
      "description": "Página de mesas da casa"
    },
    "mesaSelecionada": {
      "source": "selecionarMesa",
      "description": "Mesa selecionada para manutenção"
    }
  },
  "functions": {
    "carregarMesas": {
      "description": "Carrega a primeira página de mesas",
      "calls": "carregarMesas",
      "sets": "paginaMesas",
      "updates": [
        "paginaMesas"
      ]
    },
    "buscarMesas": {
      "description": "Busca mesas por código ou página",
      "calls": "buscarMesas",
      "sets": "paginaMesas",
      "updates": [
        "paginaMesas"
      ]
    },
    "selecionarMesa": {
      "description": "Seleciona uma mesa para manutenção",
      "sets": "mesaSelecionada",
      "updates": [
        "mesaSelecionada"
      ]
    },
    "createMesa": {
      "description": "Cadastra uma mesa",
      "calls": "criarMesa",
      "sets": "mesaSelecionada",
      "updates": [
        "paginaMesas",
        "mesaSelecionada"
      ]
    },
    "updateMesa": {
      "description": "Atualiza uma mesa",
      "calls": "atualizarMesa",
      "sets": "mesaSelecionada",
      "updates": [
        "paginaMesas",
        "mesaSelecionada"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "carregarMesas": [],
    "buscarMesas": [],
    "criarMesa": [],
    "atualizarMesa": []
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
