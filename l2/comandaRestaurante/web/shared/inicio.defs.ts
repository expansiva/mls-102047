/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "forms": {},
  "requests": {
    "carregarResumoOperacionalInicio": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "resumo"
      ]
    }
  },
  "states": {
    "resumoOperacional": {
      "source": "carregarResumoOperacionalInicio.resumo",
      "description": "Resumo operacional consolidado da página inicial."
    }
  },
  "functions": {
    "carregarResumoOperacionalInicio": {
      "description": "Carrega o resumo operacional inicial.",
      "calls": "carregarResumoOperacionalInicio",
      "sets": "resumoOperacional"
    }
  },
  "journeys": [],
  "rules": {
    "carregarResumoOperacionalInicio": [
      "subtotalComandaCalculado",
      "valorTotalItemComandaCalculado"
    ]
  },
  "access": {
    "actors": [
      "caixa",
      "garcom"
    ],
    "grants": [
      "garcomAtendimentoComandas",
      "caixaFechamentoEcadastroOperacional"
    ]
  }
} as const;
