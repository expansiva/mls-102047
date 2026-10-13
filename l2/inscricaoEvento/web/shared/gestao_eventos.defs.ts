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
        "persist": true
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosList",
        "persist": true
      },
      "dataDe": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosList",
        "persist": true
      },
      "dataAte": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosList",
        "persist": true
      },
      "eventoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:eventoDetail",
        "persist": true
      }
    }
  },
  "forms": {
    "criarEvento": {
      "organism": "eventoForm",
      "submit": "criarEvento"
    }
  },
  "requests": {
    "qryListarEventos": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "eventos"
      ]
    },
    "qryAbrirEvento": {
      "kind": "qry",
      "trigger": "qryAbrirEvento",
      "returns": [
        "evento",
        "promocoes"
      ]
    },
    "qryListarInscritos": {
      "kind": "qry",
      "trigger": "qryListarInscritos",
      "returns": [
        "inscritos"
      ]
    },
    "qryExportarInscritosCsv": {
      "kind": "qry",
      "trigger": "qryExportarInscritosCsv",
      "returns": [
        "linhas",
        "nomeArquivo"
      ]
    },
    "cmdCriarEvento": {
      "kind": "cmd",
      "trigger": "criarEvento",
      "returns": [
        "evento"
      ],
      "writes": "Evento.create"
    },
    "cmdPublicarEvento": {
      "kind": "cmd",
      "trigger": "publicarEvento",
      "returns": [
        "evento"
      ],
      "writes": "Evento.publicar"
    }
  },
  "states": {
    "eventos": {
      "source": "qryListarEventos.eventos",
      "description": "Linha da lista de eventos do organizador, com a ocupação já calculada.",
      "organisms": [
        "eventosList"
      ]
    },
    "evento": {
      "source": "qryAbrirEvento.evento",
      "description": "Evento em foco com dados cadastrados, publicação e indicadores de ocupação já calculados; também é o que os comandos devolvem.",
      "organisms": [
        "eventoDetail",
        "publicarActions"
      ]
    },
    "promocoes": {
      "source": "qryAbrirEvento.promocoes",
      "description": "Inscrição promovida automaticamente da lista de espera para vaga confirmada.",
      "organisms": [
        "promocoesTimeline"
      ]
    },
    "inscritos": {
      "source": "qryListarInscritos.inscritos",
      "description": "Inscrição do evento com nome e e-mail do participante, ocupação de vaga e posição na lista de espera.",
      "organisms": [
        "inscritosList"
      ]
    },
    "linhas": {
      "source": "qryExportarInscritosCsv.linhas",
      "description": "Linha do arquivo CSV de inscritos.",
      "organisms": [
        "exportarCsvActions"
      ]
    },
    "nomeArquivo": {
      "source": "qryExportarInscritosCsv.nomeArquivo",
      "description": "linhas com código, nome, e-mail, situação e recebida em, e nomeArquivo, para exportarCsvActions montar o download.",
      "organisms": [
        "exportarCsvActions"
      ]
    },
    "selectedEvento": {
      "source": "entry.params.eventoId",
      "description": "Evento em foco com dados cadastrados, publicação e indicadores de ocupação já calculados; também é o que os comandos devolvem.",
      "organisms": [
        "eventoDetail",
        "eventoForm",
        "eventosList"
      ]
    }
  },
  "functions": {
    "qryListarEventos": {
      "description": "Lista os eventos da organização do organizador para ele localizar o evento a trabalhar, já com a ocupação de cada um.",
      "calls": "qryListarEventos",
      "sets": "eventos"
    },
    "qryAbrirEvento": {
      "description": "Abre o evento escolhido para revisão, com dados, publicação, ocupação e o histórico de promoções automáticas.",
      "calls": "qryAbrirEvento",
      "sets": "evento",
      "updates": [
        "promocoes"
      ]
    },
    "qryListarInscritos": {
      "description": "Lista os inscritos do evento em foco em ordem de chegada, com quem ocupa vaga e a posição na lista de espera. (inscritos.items: append)",
      "calls": "qryListarInscritos",
      "sets": "inscritos"
    },
    "qryExportarInscritosCsv": {
      "description": "Gera o conteúdo do CSV com todos os inscritos do evento para o organizador baixar.",
      "calls": "qryExportarInscritosCsv",
      "sets": "linhas",
      "updates": [
        "nomeArquivo"
      ]
    },
    "cmdCriarEvento": {
      "description": "Cadastra um novo evento como rascunho e o deixa em foco para revisão.",
      "calls": "cmdCriarEvento",
      "sets": "evento",
      "updates": [
        "eventos"
      ]
    },
    "cmdPublicarEvento": {
      "description": "Publica o evento em foco para abrir sua página pública a inscrições.",
      "calls": "cmdPublicarEvento",
      "sets": "evento",
      "updates": [
        "eventos"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharInscritos/localizarEventoOrg",
      "organisms": [
        "eventosList"
      ],
      "functions": [
        "qryListarEventos"
      ]
    },
    {
      "step": "acompanharInscritos/verOcupacao",
      "organisms": [
        "eventoDetail"
      ],
      "functions": [
        "qryAbrirEvento"
      ]
    },
    {
      "step": "acompanharInscritos/verInscritos",
      "organisms": [
        "inscritosList",
        "promocoesTimeline"
      ],
      "functions": [
        "qryListarInscritos",
        "qryAbrirEvento"
      ]
    },
    {
      "step": "acompanharInscritos/baixarCsv",
      "organisms": [
        "exportarCsvActions"
      ],
      "functions": [
        "qryExportarInscritosCsv"
      ]
    },
    {
      "step": "cadastrarPublicarEvento/criarEvento",
      "organisms": [
        "eventoForm"
      ],
      "functions": [
        "cmdCriarEvento"
      ]
    },
    {
      "step": "cadastrarPublicarEvento/revisarEvento",
      "organisms": [
        "eventoDetail"
      ],
      "functions": [
        "qryAbrirEvento"
      ]
    },
    {
      "step": "cadastrarPublicarEvento/publicarEvento",
      "organisms": [
        "publicarActions"
      ],
      "functions": [
        "cmdPublicarEvento"
      ]
    }
  ],
  "rules": {
    "qryListarEventos": [
      "calculoVagasOcupadas",
      "calculoVagasRestantes"
    ],
    "qryAbrirEvento": [
      "calculoVagasOcupadas",
      "calculoVagasRestantes",
      "listaEsperaQuandoVagasEsgotadas",
      "promoverPrimeiroListaEsperaAoCancelar"
    ],
    "qryListarInscritos": [
      "ordemChegadaListaEspera",
      "calculoPosicaoListaEspera",
      "calculoVagasOcupadas"
    ],
    "qryExportarInscritosCsv": [
      "ordemChegadaListaEspera"
    ],
    "cmdCriarEvento": [
      "calculoVagasOcupadas",
      "calculoVagasRestantes"
    ],
    "cmdPublicarEvento": [
      "publicarExigeDadosCompletos"
    ]
  },
  "access": {
    "actors": [
      "organizador"
    ],
    "grants": [
      "organizadorEventos",
      "organizadorInscritos"
    ]
  },
  "fields": {
    "EmailParticipante.details.contactChannel.value": [
      "exportarCsvActions",
      "inscritosList"
    ],
    "Evento.details.capacity": [
      "eventoDetail",
      "eventoForm"
    ],
    "Evento.details.description": [
      "eventoDetail",
      "eventoForm"
    ],
    "Evento.details.isFull": [
      "eventoDetail"
    ],
    "Evento.details.occupiedSeats": [
      "eventoDetail",
      "eventosList"
    ],
    "Evento.details.publishedAt": [
      "eventoDetail"
    ],
    "Evento.details.remainingSeats": [
      "eventoDetail",
      "eventosList"
    ],
    "Evento.details.venue.address.city": [
      "eventoDetail",
      "eventoForm"
    ],
    "Evento.details.venue.address.countryCode": [
      "eventoForm"
    ],
    "Evento.details.venue.address.line1": [
      "eventoForm"
    ],
    "Evento.details.venue.address.line2": [
      "eventoForm"
    ],
    "Evento.details.venue.address.postalCode": [
      "eventoForm"
    ],
    "Evento.details.venue.address.stateOrProvince": [
      "eventoForm"
    ],
    "Evento.details.venue.name": [
      "eventoDetail",
      "eventoForm"
    ],
    "Evento.details.waitlistSize": [
      "eventoDetail"
    ],
    "Evento.eventDate": [
      "eventoDetail",
      "eventoForm",
      "eventosList"
    ],
    "Evento.status": [
      "eventoDetail",
      "eventosList",
      "publicarActions"
    ],
    "Evento.title": [
      "eventoDetail",
      "eventoForm",
      "eventosList",
      "publicarActions"
    ],
    "Inscricao.details.ocupaVaga": [
      "inscritosList"
    ],
    "Inscricao.details.posicaoListaEspera": [
      "inscritosList"
    ],
    "Inscricao.details.promotedAt": [
      "promocoesTimeline"
    ],
    "Inscricao.receivedAt": [
      "exportarCsvActions",
      "inscritosList",
      "promocoesTimeline"
    ],
    "Inscricao.registrationCode": [
      "exportarCsvActions",
      "inscritosList",
      "promocoesTimeline"
    ],
    "Inscricao.status": [
      "exportarCsvActions",
      "inscritosList"
    ],
    "Participante.details.identification.name": [
      "exportarCsvActions",
      "inscritosList",
      "promocoesTimeline"
    ]
  }
} as const;
