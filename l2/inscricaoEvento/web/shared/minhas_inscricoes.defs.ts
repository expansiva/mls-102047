/// <mls fileReference="_102047_/l2/inscricaoEvento/web/shared/minhas_inscricoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:resumoInscricoes",
        "persist": true,
        "required": false
      },
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaInscricoes",
        "persist": true,
        "required": false
      },
      "inscricaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheInscricao",
        "persist": true,
        "required": false
      },
      "eventoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Evento",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "carregarMinhasInscricoes": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "resumo",
        "inscricoes",
        "promocoes"
      ]
    },
    "buscarInscricoes": {
      "kind": "qry",
      "trigger": "buscarInscricoes",
      "returns": [
        "inscricoes"
      ]
    },
    "obterInscricao": {
      "kind": "qry",
      "trigger": "obterInscricao",
      "returns": [
        "inscricao"
      ]
    },
    "cancelarInscricao": {
      "kind": "cmd",
      "trigger": "cancelarInscricao",
      "returns": [
        "inscricao",
        "item",
        "resumo"
      ],
      "writes": "Inscricao.cancelar"
    }
  },
  "states": {
    "resumo": {
      "source": "carregarMinhasInscricoes.resumo",
      "description": "Indicadores já calculados das inscrições da pessoa e as posições nas listas de espera.",
      "organisms": [
        "resumoInscricoes"
      ]
    },
    "inscricoes": {
      "source": "carregarMinhasInscricoes.inscricoes",
      "description": "Linha da lista de inscrições da pessoa.",
      "organisms": [
        "listaInscricoes"
      ]
    },
    "inscricao": {
      "source": "obterInscricao.inscricao",
      "description": "Inscrição escolhida com evento, data, local e situação derivada.",
      "organisms": [
        "acoesInscricao",
        "detalheInscricao"
      ]
    },
    "promocoes": {
      "source": "carregarMinhasInscricoes.promocoes",
      "description": "Evento da linha do tempo: inscrição da pessoa promovida da lista de espera.",
      "organisms": [
        "promocoesListaEspera"
      ]
    },
    "selectedInscricao": {
      "source": "entry.params.inscricaoId",
      "description": "Inscrição escolhida com evento, data, local e situação derivada.",
      "organisms": [
        "detalheInscricao",
        "listaInscricoes"
      ]
    }
  },
  "journeys": [
    {
      "step": "cancelarInscricao/localizarInscricao",
      "organisms": [
        "listaInscricoes",
        "resumoInscricoes"
      ]
    },
    {
      "step": "cancelarInscricao/verInscricao",
      "organisms": [
        "detalheInscricao"
      ]
    },
    {
      "step": "cancelarInscricao/cancelar",
      "organisms": [
        "acoesInscricao"
      ]
    }
  ],
  "rules": [
    "calculoPosicaoListaEspera",
    "cancelamentoSomentePropriaInscricao",
    "ordemChegadaListaEspera",
    "promoverPrimeiroListaEsperaAoCancelar"
  ],
  "access": {
    "actors": [
      "publico"
    ],
    "grants": [
      "publicoMinhasInscricoes"
    ]
  }
} as const;
