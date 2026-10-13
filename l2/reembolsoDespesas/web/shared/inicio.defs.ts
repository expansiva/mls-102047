/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:caixaDespesasPendentes",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "qryInicio": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "totalPendentes",
        "despesasPendentes"
      ]
    }
  },
  "states": {
    "totalPendentes": {
      "source": "qryInicio.totalPendentes",
      "description": "totalPendentes: número de despesas aguardando decisão, para o destaque do volume pendente; despesasPendentes: página de despesas com data, categoria, valor, indicador de reenvio e identificação do colaborador, para o gestor escolher o que analisar antes de seguir para despesas_da_equipe.",
      "organisms": [
        "caixaDespesasPendentes"
      ]
    },
    "despesasPendentes": {
      "source": "qryInicio.despesasPendentes",
      "description": "Despesa da equipe aguardando a decisão do gestor, com o colaborador que a registrou.",
      "organisms": [
        "caixaDespesasPendentes"
      ]
    }
  },
  "journeys": [],
  "rules": [
    "managerTeamExpenseAccess"
  ],
  "access": {
    "actors": [
      "gestorEquipe"
    ],
    "grants": [
      "gestorAnalisaDespesasDaEquipe"
    ]
  }
} as const;
