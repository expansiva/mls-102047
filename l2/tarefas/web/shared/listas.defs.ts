/// <mls fileReference="_102047_/l2/tarefas/web/shared/listas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "listaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:formularioLista",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "listarListas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "listas"
      ]
    },
    "obterLista": {
      "kind": "qry",
      "trigger": "obterLista",
      "returns": [
        "lista"
      ]
    },
    "criarLista": {
      "kind": "cmd",
      "trigger": "criarLista",
      "returns": [
        "lista",
        "registro"
      ],
      "writes": "Lista.create"
    },
    "salvarLista": {
      "kind": "cmd",
      "trigger": "salvarLista",
      "returns": [
        "lista",
        "registro"
      ],
      "writes": "Lista.update"
    }
  },
  "states": {
    "listas": {
      "source": "listarListas.listas",
      "description": "Linha do cadastro de listas.",
      "organisms": [
        "listasCadastradas"
      ]
    },
    "lista": {
      "source": "obterLista.lista",
      "description": "Registro da lista carregado no formulário de edição.",
      "organisms": [
        "formularioLista"
      ]
    },
    "selectedLista": {
      "source": "entry.params.listaId",
      "description": "Registro da lista carregado no formulário de edição.",
      "organisms": [
        "formularioLista",
        "listasCadastradas"
      ]
    }
  },
  "journeys": [
    {
      "step": "manterListas/verListas",
      "organisms": [
        "listasCadastradas"
      ]
    },
    {
      "step": "manterListas/criarLista",
      "organisms": [
        "formularioLista"
      ]
    },
    {
      "step": "manterListas/editarLista",
      "organisms": [
        "listasCadastradas",
        "formularioLista"
      ]
    }
  ],
  "rules": [
    "listaMantidaPorGestor",
    "listaNomeUnico"
  ],
  "access": {
    "actors": [
      "gestor"
    ],
    "grants": [
      "gestorTarefasEquipe",
      "gestorListas"
    ]
  }
} as const;
