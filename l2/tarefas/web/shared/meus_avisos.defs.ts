/// <mls fileReference="_102047_/l2/tarefas/web/shared/meus_avisos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "avisoVencimentoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:avisoDoDia",
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
        "avisoAtual"
      ]
    },
    "buscarAvisos": {
      "kind": "qry",
      "trigger": "buscarAvisos",
      "returns": [
        "avisos"
      ]
    },
    "obterAviso": {
      "kind": "qry",
      "trigger": "obterAviso",
      "returns": [
        "aviso"
      ]
    }
  },
  "states": {
    "avisos": {
      "source": "carregarMeusAvisos.avisos",
      "description": "the list of Aviso diário de vencimentos de um responsável, com seus totais e o registro de geração e finalização do envio.",
      "organisms": [
        "historicoAvisos",
        "listaAvisos"
      ]
    },
    "avisoAtual": {
      "source": "carregarMeusAvisos.avisoAtual",
      "description": "Aviso diário de vencimentos com seus totais e a relação das tarefas incluídas.",
      "organisms": [
        "avisoDoDia"
      ]
    },
    "selectedAvisoVencimento": {
      "source": "entry.params.avisoVencimentoId",
      "description": "the id of the AvisoVencimento selected in listaAvisos",
      "organisms": [
        "avisoDoDia",
        "listaAvisos"
      ]
    }
  },
  "journeys": [
    {
      "step": "avisoDiarioVencimentos/abrirAviso",
      "organisms": [
        "listaAvisos",
        "avisoDoDia"
      ]
    },
    {
      "step": "avisoDiarioVencimentos/verVencendo",
      "organisms": [
        "avisoDoDia"
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
