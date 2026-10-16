/// <mls fileReference="_102047_/l2/tarefas/web/shared/inicio_gestor.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:tarefasPedemAcao",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "qryPanoramaEquipe": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "totais",
        "listas"
      ]
    },
    "qryTarefasPedemAcao": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "tarefas"
      ]
    }
  },
  "states": {
    "totais": {
      "source": "qryPanoramaEquipe.totais",
      "description": "Indicadores da equipe já calculados no servidor.",
      "organisms": [
        "destaquesEquipe"
      ]
    },
    "listas": {
      "source": "qryPanoramaEquipe.listas",
      "description": "Lista com a quantidade de tarefas abertas.",
      "organisms": [
        "destaquesEquipe"
      ]
    },
    "tarefas": {
      "source": "qryTarefasPedemAcao.tarefas",
      "description": "Tarefa aberta atrasada ou vencendo hoje, com lista e responsável.",
      "organisms": [
        "tarefasPedemAcao"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharTarefasEquipe/filtrarTarefas",
      "organisms": [],
      "continuesIn": "tarefas_equipe"
    },
    {
      "step": "acompanharTarefasEquipe/verQuadro",
      "organisms": [
        "destaquesEquipe"
      ],
      "continuesIn": "tarefas_equipe"
    },
    {
      "step": "acompanharTarefasEquipe/verDetalhe",
      "organisms": [
        "tarefasPedemAcao"
      ],
      "continuesIn": "tarefas_equipe"
    }
  ],
  "rules": [],
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
