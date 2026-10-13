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
        "effect": "filter:eventosPublicados",
        "persist": true
      },
      "dataInicio": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosPublicados",
        "persist": true
      },
      "dataFim": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosPublicados",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:eventosPublicados",
        "persist": true
      },
      "eventoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheEvento",
        "persist": true
      },
      "inscricaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Inscricao",
        "persist": true
      }
    }
  },
  "forms": {
    "inscreverMe": {
      "organism": "acaoInscricao",
      "submit": "inscreverMe"
    }
  },
  "requests": {
    "qryEventosPublicados": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "eventos"
      ]
    },
    "qryDetalheEvento": {
      "kind": "qry",
      "trigger": "qryDetalheEvento",
      "returns": [
        "evento"
      ]
    },
    "cmdInscreverMe": {
      "kind": "cmd",
      "trigger": "inscreverMe",
      "returns": [
        "inscricao",
        "evento"
      ],
      "writes": "Inscricao.create"
    }
  },
  "states": {
    "eventos": {
      "source": "qryEventosPublicados.eventos",
      "description": "Linha da lista de eventos publicados.",
      "organisms": [
        "eventosPublicados"
      ]
    },
    "evento": {
      "source": "qryDetalheEvento.evento",
      "description": "Evento publicado aberto na página pública, com descrição, local e disponibilidade.",
      "organisms": [
        "acaoInscricao",
        "detalheEvento"
      ]
    },
    "inscricao": {
      "source": "cmdInscreverMe.inscricao",
      "description": "Inscrição recém-criada mostrada à pessoa.",
      "organisms": [
        "acaoInscricao"
      ]
    },
    "selectedEvento": {
      "source": "entry.params.eventoId",
      "description": "Evento publicado aberto na página pública, com descrição, local e disponibilidade.",
      "organisms": [
        "acaoInscricao",
        "detalheEvento",
        "eventosPublicados"
      ]
    }
  },
  "functions": {
    "qryEventosPublicados": {
      "description": "Carrega e busca a lista paginada de eventos publicados para a pessoa escolher qual abrir. (eventos.items: append)",
      "calls": "qryEventosPublicados",
      "sets": "eventos"
    },
    "qryDetalheEvento": {
      "description": "Abre a página pública do evento escolhido com descrição, local e disponibilidade de vagas.",
      "calls": "qryDetalheEvento",
      "sets": "evento"
    },
    "cmdInscreverMe": {
      "description": "Inscreve a pessoa no evento aberto com nome e e-mail, garantindo vaga ou lugar na lista de espera.",
      "calls": "cmdInscreverMe",
      "sets": "evento"
    },
    "verMinhasInscricoes": {
      "description": "Inscrever-me com nome e e-mail: se houver vaga ela é garantida; se o evento estiver lotado, você entra na lista de espera por ordem de chegada e vê sua posição. Depois você pode acompanhar a inscrição em Minhas inscrições.",
      "navigate": "minhas_inscricoes",
      "carries": {
        "eventoId": "selectedEvento.id"
      }
    }
  },
  "journeys": [
    {
      "step": "inscreverEmEvento/localizarEvento",
      "organisms": [
        "eventosPublicados"
      ],
      "functions": [
        "qryEventosPublicados"
      ]
    },
    {
      "step": "inscreverEmEvento/verEvento",
      "organisms": [
        "detalheEvento"
      ],
      "functions": [
        "qryDetalheEvento"
      ]
    },
    {
      "step": "inscreverEmEvento/criarInscricao",
      "organisms": [
        "acaoInscricao"
      ],
      "functions": [
        "cmdInscreverMe"
      ]
    }
  ],
  "rules": {
    "qryEventosPublicados": [
      "inscricaoSomenteEventoPublicado",
      "calculoVagasOcupadas",
      "listaEsperaQuandoVagasEsgotadas"
    ],
    "qryDetalheEvento": [
      "inscricaoSomenteEventoPublicado",
      "calculoVagasOcupadas",
      "calculoVagasRestantes",
      "listaEsperaQuandoVagasEsgotadas"
    ],
    "cmdInscreverMe": [
      "inscricaoSomenteEventoPublicado",
      "inscricaoUnicaPorEmailEvento",
      "umaInscricaoPorEmailPorEvento",
      "inscricaoExcedenteVaiParaListaEspera",
      "listaEsperaQuandoVagasEsgotadas",
      "ordemChegadaListaEspera",
      "calculoPosicaoListaEspera",
      "calculoVagasOcupadas",
      "calculoVagasRestantes"
    ]
  },
  "access": {
    "actors": [
      "publico"
    ],
    "grants": [
      "publicoMinhasInscricoes",
      "publicoMeuCadastro"
    ]
  },
  "fields": {
    "Evento.details.capacity": [
      "detalheEvento"
    ],
    "Evento.details.description": [
      "detalheEvento"
    ],
    "Evento.details.isFull": [
      "acaoInscricao",
      "detalheEvento",
      "eventosPublicados"
    ],
    "Evento.details.remainingSeats": [
      "detalheEvento"
    ],
    "Evento.details.venue.address": [
      "detalheEvento"
    ],
    "Evento.details.venue.name": [
      "detalheEvento",
      "eventosPublicados"
    ],
    "Evento.details.waitlistSize": [
      "detalheEvento"
    ],
    "Evento.eventDate": [
      "detalheEvento",
      "eventosPublicados"
    ],
    "Evento.title": [
      "detalheEvento",
      "eventosPublicados"
    ],
    "Inscricao.details.ocupaVaga": [
      "acaoInscricao"
    ],
    "Inscricao.details.posicaoListaEspera": [
      "acaoInscricao"
    ],
    "Inscricao.receivedAt": [
      "acaoInscricao"
    ],
    "Inscricao.registrationCode": [
      "acaoInscricao"
    ],
    "Participante.details.identification.countryCode": [
      "acaoInscricao"
    ],
    "Participante.details.identification.name": [
      "acaoInscricao"
    ],
    "Participante.details.person.privacyConsent": [
      "acaoInscricao"
    ]
  }
} as const;
