/// <mls fileReference="_102047_/l2/inscricaoEvento/web/shared/painel_organizador.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "requests": {
    "qryPainelOrganizador": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "eventosOcupacao",
        "totalVagasOcupadas",
        "publicacoesRecentes"
      ]
    }
  },
  "states": {
    "eventosOcupacao": {
      "source": "qryPainelOrganizador.eventosOcupacao",
      "description": "Evento publicado com sua ocupação, para os destaques do painel.",
      "organisms": [
        "ocupacaoEventos"
      ]
    },
    "totalVagasOcupadas": {
      "source": "qryPainelOrganizador.totalVagasOcupadas",
      "description": "eventosOcupacao para os destaques de ocupação; totalVagasOcupadas já somado para o resumo; publicacoesRecentes com a data de publicação. Os ids permitem navegar para a gestão do evento.",
      "organisms": [
        "resumoPublicacoes"
      ]
    },
    "publicacoesRecentes": {
      "source": "qryPainelOrganizador.publicacoesRecentes",
      "description": "Evento publicado recentemente, para o resumo do painel.",
      "organisms": [
        "resumoPublicacoes"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharInscritos/verOcupacao",
      "organisms": [
        "ocupacaoEventos",
        "resumoPublicacoes"
      ]
    },
    {
      "step": "acompanharInscritos/localizarEventoOrg",
      "organisms": [
        "ocupacaoEventos"
      ],
      "continuesIn": "gestao_eventos"
    },
    {
      "step": "acompanharInscritos/verInscritos",
      "organisms": [],
      "continuesIn": "gestao_eventos"
    },
    {
      "step": "acompanharInscritos/baixarCsv",
      "organisms": [],
      "continuesIn": "gestao_eventos"
    }
  ],
  "rules": [
    "calculoVagasOcupadas",
    "calculoVagasRestantes",
    "listaEsperaQuandoVagasEsgotadas"
  ],
  "access": {
    "actors": [
      "organizador"
    ],
    "grants": [
      "organizadorEventos"
    ]
  }
} as const;
