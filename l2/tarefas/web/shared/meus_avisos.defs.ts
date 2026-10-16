/// <mls fileReference="_102047_/l2/tarefas/web/shared/meus_avisos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "responsavelId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAvisos",
        "persist": true,
        "required": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAvisos",
        "persist": true,
        "required": false
      },
      "avisoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:detalheAviso",
        "persist": true,
        "required": true
      },
      "avisoVencimentoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheAviso",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "carregarMeusAvisos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "avisos",
        "avisoAberto"
      ]
    },
    "abrirAviso": {
      "kind": "qry",
      "trigger": "abrirAviso",
      "returns": [
        "aviso"
      ]
    }
  },
  "states": {
    "avisos": {
      "source": "carregarMeusAvisos.avisos",
      "description": "Um aviso diário na lista e no histórico de envio.",
      "organisms": [
        "historicoAvisos",
        "listaAvisos"
      ]
    },
    "avisoAberto": {
      "source": "carregarMeusAvisos.avisoAberto",
      "description": "Aviso aberto com suas tarefas que vencem hoje ou estão atrasadas.",
      "organisms": [
        "detalheAviso"
      ]
    },
    "selectedAvisoVencimento": {
      "source": "entry.params.avisoVencimentoId",
      "description": "Aviso aberto com suas tarefas que vencem hoje ou estão atrasadas.",
      "organisms": [
        "detalheAviso",
        "listaAvisos"
      ]
    }
  },
  "journeys": [
    {
      "step": "avisoDiarioVencimentos/abrirAviso",
      "organisms": [
        "listaAvisos",
        "detalheAviso"
      ]
    },
    {
      "step": "avisoDiarioVencimentos/verVencendo",
      "organisms": [
        "detalheAviso"
      ]
    }
  ],
  "rules": [
    "avisoSomenteTarefasAbertasVencendo",
    "avisoUnicoPorResponsavelEDia"
  ],
  "access": {
    "actors": [
      "gestor",
      "membroEquipe"
    ],
    "grants": [
      "membroTarefasProprias",
      "membroAvisosProprios",
      "gestorTarefasEquipe",
      "gestorAvisosProprios"
    ]
  }
} as const;
