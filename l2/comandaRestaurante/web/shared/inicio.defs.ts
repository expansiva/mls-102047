/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "forms": {},
  "requests": {
    "load": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "atendimento",
        "fechamento",
        "itemComanda"
      ]
    }
  },
  "states": {
    "atendimento": {
      "source": "load.atendimento",
      "description": "Mesas e respectivas condições de disponibilidade."
    },
    "fechamento": {
      "source": "load.fechamento",
      "description": "Comandas e subtotais para acompanhamento operacional."
    },
    "itemComanda": {
      "source": "load.itemComanda",
      "description": "Itens lançados e valores totais das comandas."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega os dados operacionais de mesas, comandas e itens.",
      "calls": "load",
      "sets": "atendimento",
      "updates": [
        "fechamento",
        "itemComanda"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "load": [
      "mesaDisponivelParaAbrirComanda",
      "umaComandaAbertaPorMesa",
      "fechamentoLiberaMesa"
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
