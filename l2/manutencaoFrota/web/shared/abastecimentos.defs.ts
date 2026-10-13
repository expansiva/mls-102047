/// <mls fileReference="_102047_/l2/manutencaoFrota/web/shared/abastecimentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "veiculoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAbastecimentos",
        "persist": true
      },
      "motoristaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAbastecimentos",
        "persist": true
      },
      "data": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAbastecimentos",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAbastecimentos",
        "persist": true
      },
      "abastecimentoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheAbastecimento",
        "persist": true
      }
    }
  },
  "forms": {},
  "requests": {
    "listarAbastecimentos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "abastecimentos"
      ]
    }
  },
  "states": {
    "abastecimentos": {
      "source": "listarAbastecimentos.abastecimentos",
      "description": "Abastecimento completo, usado na lista e no detalhe ao lado (o detalhe é resolvido a partir do item já carregado).",
      "organisms": [
        "detalheAbastecimento",
        "listaAbastecimentos"
      ]
    },
    "selectedAbastecimento": {
      "source": "entry.params.abastecimentoId",
      "description": "Abastecimento completo, usado na lista e no detalhe ao lado (o detalhe é resolvido a partir do item já carregado).",
      "organisms": [
        "detalheAbastecimento",
        "listaAbastecimentos"
      ]
    }
  },
  "functions": {
    "listarAbastecimentos": {
      "description": "Carrega, já paginada, a lista de abastecimentos de toda a frota para o gestor consultar e comparar o preço por litro; cada item traz os dados completos para o detalhe ao lado sem nova chamada. (abastecimentos.items: append)",
      "calls": "listarAbastecimentos",
      "sets": "abastecimentos"
    }
  },
  "journeys": [],
  "rules": {
    "listarAbastecimentos": [
      "precoPorLitroCalculado"
    ]
  },
  "access": {
    "actors": [
      "gestor"
    ],
    "grants": [
      "gestorFrota"
    ]
  },
  "fields": {
    "Abastecimento.data": [
      "detalheAbastecimento",
      "listaAbastecimentos"
    ],
    "Abastecimento.details.kmPainel": [
      "detalheAbastecimento"
    ],
    "Abastecimento.details.litros": [
      "detalheAbastecimento",
      "listaAbastecimentos"
    ],
    "Abastecimento.details.precoPorLitro": [
      "detalheAbastecimento",
      "listaAbastecimentos"
    ],
    "Abastecimento.details.valor": [
      "detalheAbastecimento",
      "listaAbastecimentos"
    ],
    "Abastecimento.id": [
      "detalheAbastecimento",
      "listaAbastecimentos"
    ],
    "Abastecimento.motoristaId": [
      "detalheAbastecimento",
      "listaAbastecimentos"
    ],
    "Abastecimento.veiculoId": [
      "detalheAbastecimento",
      "listaAbastecimentos"
    ]
  }
} as const;
