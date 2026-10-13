/// <mls fileReference="_102047_/l2/inscricaoEvento/web/shared/minhas_inscricoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "texto": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaInscricoes",
        "persist": true
      },
      "eventoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Evento",
        "persist": true
      },
      "inscricaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheInscricao",
        "persist": true
      }
    }
  },
  "forms": {},
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
    "buscarMinhasInscricoes": {
      "kind": "qry",
      "trigger": "buscarMinhasInscricoes",
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
        "inscricao"
      ],
      "writes": "Inscricao.cancelar"
    }
  },
  "states": {
    "resumo": {
      "source": "carregarMinhasInscricoes.resumo",
      "description": "Panorama das inscrições da pessoa: contagens e posições na lista de espera.",
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
      "description": "Inscrição aberta com seu evento, usada no detalhe e nas ações de cancelamento.",
      "organisms": [
        "acoesInscricao",
        "detalheInscricao"
      ]
    },
    "promocoes": {
      "source": "carregarMinhasInscricoes.promocoes",
      "description": "Evento do histórico: inscrição promovida da lista de espera.",
      "organisms": [
        "promocoesListaEspera"
      ]
    },
    "selectedInscricao": {
      "source": "entry.params.inscricaoId",
      "description": "Inscrição aberta com seu evento, usada no detalhe e nas ações de cancelamento.",
      "organisms": [
        "detalheInscricao",
        "listaInscricoes"
      ]
    }
  },
  "functions": {
    "carregarMinhasInscricoes": {
      "description": "Carrega de uma vez tudo que a página mostra ao abrir: o panorama das inscrições da pessoa, a lista das suas inscrições e o histórico de promoções da lista de espera.",
      "calls": "carregarMinhasInscricoes",
      "sets": "resumo",
      "updates": [
        "inscricoes",
        "promocoes"
      ]
    },
    "buscarMinhasInscricoes": {
      "description": "Filtra as inscrições da pessoa pelo código da inscrição ou pelo título do evento.",
      "calls": "buscarMinhasInscricoes",
      "sets": "inscricoes"
    },
    "obterInscricao": {
      "description": "Abre a inscrição escolhida na lista para a pessoa conferir os dados antes de decidir cancelar.",
      "calls": "obterInscricao",
      "sets": "inscricao"
    },
    "cancelarInscricao": {
      "description": "Cancela a inscrição aberta pela pessoa, liberando a vaga quando ela a ocupava. (inscricao: upsert)",
      "calls": "cancelarInscricao",
      "updates": [
        "inscricao",
        "resumo",
        "inscricoes",
        "promocoes"
      ]
    },
    "buscarMaisEventos": {
      "description": "Lista suas inscrições com código, evento, data do evento, situação e data de recebimento. Você pode buscar pelo código ou pelo nome do evento e escolher uma para ver os detalhes.",
      "navigate": "eventos_abertos",
      "carries": {
        "inscricaoId": "selectedInscricao.id"
      }
    }
  },
  "journeys": [
    {
      "step": "cancelarInscricao/localizarInscricao",
      "organisms": [
        "resumoInscricoes",
        "listaInscricoes"
      ],
      "functions": [
        "carregarMinhasInscricoes",
        "buscarMinhasInscricoes"
      ]
    },
    {
      "step": "cancelarInscricao/verInscricao",
      "organisms": [
        "detalheInscricao"
      ],
      "functions": [
        "obterInscricao"
      ]
    },
    {
      "step": "cancelarInscricao/cancelar",
      "organisms": [
        "acoesInscricao"
      ],
      "functions": [
        "cancelarInscricao"
      ]
    }
  ],
  "rules": {
    "carregarMinhasInscricoes": [
      "calculoPosicaoListaEspera",
      "ordemChegadaListaEspera"
    ],
    "buscarMinhasInscricoes": [],
    "obterInscricao": [
      "calculoPosicaoListaEspera"
    ],
    "cancelarInscricao": [
      "cancelamentoSomentePropriaInscricao",
      "promoverPrimeiroListaEsperaAoCancelar",
      "ordemChegadaListaEspera"
    ]
  },
  "access": {
    "actors": [
      "publico"
    ],
    "grants": [
      "publicoMinhasInscricoes"
    ]
  },
  "fields": {
    "Evento.details.venue.name": [
      "detalheInscricao"
    ],
    "Evento.eventDate": [
      "detalheInscricao",
      "listaInscricoes"
    ],
    "Evento.title": [
      "detalheInscricao",
      "listaInscricoes",
      "promocoesListaEspera",
      "resumoInscricoes"
    ],
    "Inscricao.details.ocupaVaga": [
      "acoesInscricao",
      "detalheInscricao",
      "resumoInscricoes"
    ],
    "Inscricao.details.posicaoListaEspera": [
      "detalheInscricao",
      "resumoInscricoes"
    ],
    "Inscricao.details.promotedAt": [
      "promocoesListaEspera"
    ],
    "Inscricao.eventoId": [
      "listaInscricoes"
    ],
    "Inscricao.receivedAt": [
      "detalheInscricao",
      "listaInscricoes"
    ],
    "Inscricao.registrationCode": [
      "acoesInscricao",
      "detalheInscricao",
      "listaInscricoes",
      "promocoesListaEspera"
    ],
    "Inscricao.status": [
      "acoesInscricao",
      "detalheInscricao",
      "listaInscricoes",
      "resumoInscricoes"
    ]
  }
} as const;
