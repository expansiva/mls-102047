/// <mls fileReference="_102047_/l2/inscricaoEvento/web/shared/painel_organizador.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "forms": {},
  "requests": {
    "qryPainelOrganizador": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "destaques",
        "totalVagasOcupadas",
        "recentes"
      ]
    }
  },
  "states": {
    "destaques": {
      "source": "qryPainelOrganizador.destaques",
      "description": "Evento publicado com sua situação de ocupação, para os destaques do painel.",
      "organisms": [
        "destaquesOcupacao"
      ]
    },
    "totalVagasOcupadas": {
      "source": "qryPainelOrganizador.totalVagasOcupadas",
      "description": "destaques com título, data, situação e números de ocupação de cada evento que pede atenção; totalVagasOcupadas já somado para o resumo; recentes com título, data, situação, data de publicação e vagas ocupadas. O id de cada evento permite navegar para a gestão de eventos.",
      "organisms": [
        "resumoPublicacoes"
      ]
    },
    "recentes": {
      "source": "qryPainelOrganizador.recentes",
      "description": "Evento publicado recentemente, para o resumo de publicações.",
      "organisms": [
        "resumoPublicacoes"
      ]
    }
  },
  "functions": {
    "qryPainelOrganizador": {
      "description": "Carrega, em uma única chamada ao abrir o painel, a situação de ocupação dos eventos publicados da organização do organizador, o total de vagas ocupadas e os eventos publicados recentemente.",
      "calls": "qryPainelOrganizador",
      "sets": "destaques",
      "updates": [
        "totalVagasOcupadas",
        "recentes"
      ]
    },
    "abrirEventoNaGestao": {
      "description": "Para cada evento publicado, mostra se está lotado, quantas vagas restam e o tamanho da lista de espera. Os lotados e os que têm fila aparecem em destaque para o organizador decidir onde agir.",
      "navigate": "gestao_eventos"
    },
    "verTodosEventos": {
      "description": "Total de vagas ocupadas somando os eventos publicados e a lista dos eventos publicados recentemente, com a data de publicação de cada um.",
      "navigate": "gestao_eventos"
    }
  },
  "journeys": [
    {
      "step": "acompanharInscritos/localizarEventoOrg",
      "organisms": [],
      "functions": [],
      "continuesIn": "gestao_eventos"
    },
    {
      "step": "acompanharInscritos/verOcupacao",
      "organisms": [
        "destaquesOcupacao",
        "resumoPublicacoes"
      ],
      "functions": [
        "qryPainelOrganizador"
      ]
    },
    {
      "step": "acompanharInscritos/verInscritos",
      "organisms": [],
      "functions": [],
      "continuesIn": "gestao_eventos"
    },
    {
      "step": "acompanharInscritos/baixarCsv",
      "organisms": [],
      "functions": [],
      "continuesIn": "gestao_eventos"
    }
  ],
  "rules": {
    "qryPainelOrganizador": [
      "calculoVagasOcupadas",
      "calculoVagasRestantes",
      "listaEsperaQuandoVagasEsgotadas"
    ]
  },
  "access": {
    "actors": [
      "organizador"
    ],
    "grants": [
      "organizadorEventos"
    ]
  },
  "fields": {
    "Evento.details.capacity": [
      "destaquesOcupacao"
    ],
    "Evento.details.isFull": [
      "destaquesOcupacao"
    ],
    "Evento.details.occupiedSeats": [
      "destaquesOcupacao",
      "resumoPublicacoes"
    ],
    "Evento.details.publishedAt": [
      "resumoPublicacoes"
    ],
    "Evento.details.remainingSeats": [
      "destaquesOcupacao"
    ],
    "Evento.details.waitlistSize": [
      "destaquesOcupacao"
    ],
    "Evento.eventDate": [
      "destaquesOcupacao",
      "resumoPublicacoes"
    ],
    "Evento.status": [
      "destaquesOcupacao",
      "resumoPublicacoes"
    ],
    "Evento.title": [
      "destaquesOcupacao",
      "resumoPublicacoes"
    ]
  }
} as const;
