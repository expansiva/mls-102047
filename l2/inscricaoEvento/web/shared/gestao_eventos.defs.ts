/// <mls fileReference="_102047_/l2/inscricaoEvento/web/shared/gestao_eventos.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosList",
        "persist": true,
        "required": false
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosList",
        "persist": true,
        "required": false
      },
      "eventDate": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosList",
        "persist": true,
        "required": false
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosList",
        "persist": true,
        "required": false
      },
      "eventoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:eventoDetail",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "qryEventos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "eventos"
      ]
    },
    "qryEventoPainel": {
      "kind": "qry",
      "trigger": "qryEventoPainel",
      "returns": [
        "evento",
        "promocoes"
      ]
    },
    "qryInscritosEvento": {
      "kind": "qry",
      "trigger": "qryInscritosEvento",
      "returns": [
        "inscritos"
      ]
    },
    "qryExportarInscritosCsv": {
      "kind": "qry",
      "trigger": "qryExportarInscritosCsv",
      "returns": [
        "nomeArquivo",
        "conteudoCsv"
      ]
    },
    "cmdSalvarEvento": {
      "kind": "cmd",
      "trigger": "salvarEvento",
      "returns": [
        "resumo",
        "evento"
      ],
      "writes": "Evento.create"
    },
    "cmdPublicarEvento": {
      "kind": "cmd",
      "trigger": "publicarEvento",
      "returns": [
        "resumo",
        "evento"
      ],
      "writes": "Evento.publicar"
    }
  },
  "states": {
    "eventos": {
      "source": "qryEventos.eventos",
      "description": "Linha da lista de eventos do organizador.",
      "organisms": [
        "eventosList"
      ]
    },
    "evento": {
      "source": "qryEventoPainel.evento",
      "description": "Evento completo para revisão e publicação.",
      "organisms": [
        "eventoDetail",
        "publicarActions"
      ]
    },
    "inscritos": {
      "source": "qryInscritosEvento.inscritos",
      "description": "Linha da lista de inscritos do evento.",
      "organisms": [
        "inscritosList"
      ]
    },
    "conteudoCsv": {
      "source": "qryExportarInscritosCsv.conteudoCsv",
      "description": "Nome do arquivo e conteúdo CSV, que a página entrega como download.",
      "organisms": [
        "exportarCsvActions"
      ]
    },
    "nomeArquivo": {
      "source": "qryExportarInscritosCsv.nomeArquivo",
      "description": "Nome do arquivo e conteúdo CSV, que a página entrega como download.",
      "organisms": [
        "exportarCsvActions"
      ]
    },
    "promocoes": {
      "source": "qryEventoPainel.promocoes",
      "description": "Item da linha do tempo de promoções automáticas.",
      "organisms": [
        "promocoesTimeline"
      ]
    },
    "selectedEvento": {
      "source": "entry.params.eventoId",
      "description": "Evento completo para revisão e publicação.",
      "organisms": [
        "eventoDetail",
        "eventosList"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharInscritos/localizarEventoOrg",
      "organisms": [
        "eventosList"
      ]
    },
    {
      "step": "acompanharInscritos/verOcupacao",
      "organisms": [
        "eventoDetail"
      ]
    },
    {
      "step": "acompanharInscritos/verInscritos",
      "organisms": [
        "inscritosList",
        "promocoesTimeline"
      ]
    },
    {
      "step": "acompanharInscritos/baixarCsv",
      "organisms": [
        "exportarCsvActions"
      ]
    },
    {
      "step": "cadastrarPublicarEvento/criarEvento",
      "organisms": [
        "eventoForm"
      ]
    },
    {
      "step": "cadastrarPublicarEvento/revisarEvento",
      "organisms": [
        "eventoDetail"
      ]
    },
    {
      "step": "cadastrarPublicarEvento/publicarEvento",
      "organisms": [
        "publicarActions"
      ]
    }
  ],
  "rules": [
    "calculoPosicaoListaEspera",
    "calculoVagasOcupadas",
    "calculoVagasRestantes",
    "listaEsperaQuandoVagasEsgotadas",
    "ordemChegadaListaEspera",
    "promoverPrimeiroListaEsperaAoCancelar",
    "publicarExigeDadosCompletos"
  ],
  "access": {
    "actors": [
      "organizador"
    ],
    "grants": [
      "organizadorEventos",
      "organizadorInscritos"
    ]
  }
} as const;
