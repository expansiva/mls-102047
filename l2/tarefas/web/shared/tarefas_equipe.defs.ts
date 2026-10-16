/// <mls fileReference="_102047_/l2/tarefas/web/shared/tarefas_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "listaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Lista",
        "persist": true,
        "required": false
      },
      "responsavelId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:quadroTarefasEquipe",
        "persist": true,
        "required": false
      },
      "prioridade": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:quadroTarefasEquipe",
        "persist": true,
        "required": false
      },
      "prazo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:quadroTarefasEquipe",
        "persist": true,
        "required": false
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:quadroTarefasEquipe",
        "persist": true,
        "required": false
      },
      "titulo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:quadroTarefasEquipe",
        "persist": true,
        "required": false
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:quadroTarefasEquipe",
        "persist": true,
        "required": false
      },
      "name": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:quadroTarefasEquipe",
        "persist": true,
        "required": false
      },
      "somenteAtivos": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:quadroTarefasEquipe",
        "persist": true,
        "required": false
      },
      "tarefaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheTarefa",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "qryTarefasEquipe": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "tarefas"
      ]
    },
    "qryListasFiltro": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "listas"
      ]
    },
    "qryBuscarMembros": {
      "kind": "qry",
      "trigger": "qryBuscarMembros",
      "returns": [
        "membros"
      ]
    },
    "qryDetalheTarefa": {
      "kind": "qry",
      "trigger": "qryDetalheTarefa",
      "returns": [
        "tarefa"
      ]
    },
    "cmdReatribuirTarefa": {
      "kind": "cmd",
      "trigger": "reatribuirTarefa",
      "returns": [
        "tarefa",
        "itemQuadro"
      ],
      "writes": "Tarefa.update"
    },
    "cmdCancelarTarefa": {
      "kind": "cmd",
      "trigger": "cancelarTarefa",
      "returns": [
        "tarefa",
        "itemQuadro"
      ],
      "writes": "Tarefa.cancelar"
    }
  },
  "states": {
    "tarefas": {
      "source": "qryTarefasEquipe.tarefas",
      "description": "Linha do quadro de tarefas da equipe.",
      "organisms": [
        "quadroTarefasEquipe"
      ]
    },
    "listas": {
      "source": "qryListasFiltro.listas",
      "description": "Lista com id e nome.",
      "organisms": [
        "quadroTarefasEquipe"
      ]
    },
    "membros": {
      "source": "qryBuscarMembros.membros",
      "description": "Membro da equipe com id e nome, usado como responsável, criador ou opção de escolha.",
      "organisms": [
        "acoesGestorTarefa",
        "quadroTarefasEquipe"
      ]
    },
    "tarefa": {
      "source": "qryDetalheTarefa.tarefa",
      "description": "Tarefa escolhida com lista, responsável, criador, tarefa pai, checklist e marcos do histórico.",
      "organisms": [
        "acoesGestorTarefa",
        "detalheTarefa",
        "historicoTarefa"
      ]
    },
    "selectedTarefa": {
      "source": "entry.params.tarefaId",
      "description": "Tarefa escolhida com lista, responsável, criador, tarefa pai, checklist e marcos do histórico.",
      "organisms": [
        "detalheTarefa",
        "quadroTarefasEquipe"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharTarefasEquipe/filtrarTarefas",
      "organisms": [
        "quadroTarefasEquipe"
      ]
    },
    {
      "step": "acompanharTarefasEquipe/verQuadro",
      "organisms": [
        "quadroTarefasEquipe"
      ]
    },
    {
      "step": "acompanharTarefasEquipe/verDetalhe",
      "organisms": [
        "detalheTarefa",
        "historicoTarefa"
      ]
    },
    {
      "step": "cancelarTarefaGestor/localizarParaCancelar",
      "organisms": [
        "quadroTarefasEquipe",
        "detalheTarefa"
      ]
    },
    {
      "step": "cancelarTarefaGestor/cancelarPeloGestor",
      "organisms": [
        "acoesGestorTarefa"
      ]
    },
    {
      "step": "reatribuirTarefaGestor/localizarTarefaEquipe",
      "organisms": [
        "quadroTarefasEquipe",
        "detalheTarefa"
      ]
    },
    {
      "step": "reatribuirTarefaGestor/escolherResponsavelEquipe",
      "organisms": [
        "acoesGestorTarefa"
      ]
    },
    {
      "step": "reatribuirTarefaGestor/reatribuir",
      "organisms": [
        "acoesGestorTarefa"
      ]
    }
  ],
  "rules": [
    "cancelamentoPorCriadorOuGestor",
    "edicaoNaoMudaSituacao",
    "editarSomenteTarefaVisivel",
    "reatribuicaoPorCriadorOuGestor",
    "responsavelDeveSerMembroAtivo",
    "tarefaEncerradaNaoTransiciona"
  ],
  "access": {
    "actors": [
      "gestor"
    ],
    "grants": [
      "gestorTarefasEquipe",
      "gestorListas",
      "gestorMembros"
    ]
  }
} as const;
