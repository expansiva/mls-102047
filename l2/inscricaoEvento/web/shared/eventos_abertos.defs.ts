/// <mls fileReference="_102047_/l2/inscricaoEvento/web/shared/eventos_abertos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "texto": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaEventosPublicados",
        "persist": true,
        "required": false
      },
      "dataInicio": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaEventosPublicados",
        "persist": true,
        "required": false
      },
      "dataFim": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaEventosPublicados",
        "persist": true,
        "required": false
      },
      "local": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaEventosPublicados",
        "persist": true,
        "required": false
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaEventosPublicados",
        "persist": true,
        "required": false
      },
      "eventoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheEvento",
        "persist": true,
        "required": false
      },
      "inscricaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Inscricao",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "listarEventosPublicados": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "eventos"
      ]
    },
    "obterEventoPublico": {
      "kind": "qry",
      "trigger": "obterEventoPublico",
      "returns": [
        "evento"
      ]
    },
    "inscreverEmEvento": {
      "kind": "cmd",
      "trigger": "inscreverEmEvento",
      "returns": [
        "inscricao",
        "evento",
        "eventoResumo"
      ],
      "writes": "Inscricao.create"
    }
  },
  "states": {
    "eventos": {
      "source": "listarEventosPublicados.eventos",
      "description": "Item da lista de eventos publicados.",
      "organisms": [
        "listaEventosPublicados"
      ]
    },
    "evento": {
      "source": "obterEventoPublico.evento",
      "description": "Evento publicado completo para leitura e inscrição.",
      "organisms": [
        "acaoInscrever",
        "detalheEvento"
      ]
    },
    "inscricao": {
      "source": "inscreverEmEvento.inscricao",
      "description": "Resultado da inscrição: código, chegada, vaga ou posição na lista de espera, evento e e-mail.",
      "organisms": [
        "acaoInscrever"
      ]
    },
    "selectedEvento": {
      "source": "entry.params.eventoId",
      "description": "Evento publicado completo para leitura e inscrição.",
      "organisms": [
        "acaoInscrever",
        "detalheEvento",
        "listaEventosPublicados"
      ]
    }
  },
  "journeys": [
    {
      "step": "inscreverEmEvento/localizarEvento",
      "organisms": [
        "listaEventosPublicados"
      ]
    },
    {
      "step": "inscreverEmEvento/verEvento",
      "organisms": [
        "detalheEvento"
      ]
    },
    {
      "step": "inscreverEmEvento/criarInscricao",
      "organisms": [
        "acaoInscrever"
      ]
    }
  ],
  "rules": [
    "calculoPosicaoListaEspera",
    "calculoVagasOcupadas",
    "calculoVagasRestantes",
    "inscricaoExcedenteVaiParaListaEspera",
    "inscricaoSomenteEventoPublicado",
    "inscricaoUnicaPorEmailEvento",
    "listaEsperaQuandoVagasEsgotadas",
    "ordemChegadaListaEspera",
    "umaInscricaoPorEmailPorEvento"
  ],
  "access": {
    "actors": [
      "publico"
    ],
    "grants": [
      "publicoMinhasInscricoes",
      "publicoMeuCadastro"
    ]
  }
} as const;
