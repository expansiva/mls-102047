/// <mls fileReference="_102047_/l2/inscricaoEvento/web/mobile/page11/eventos_abertos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/contentLanding/page11.md",
    "experience": "contentFirstConvert"
  },
  "intent": "No celular, em conteúdo fluido de coluna estreita (referência de 390px, utilizável em 360px e 430px), deixar a pessoa achar um evento publicado, ler o essencial e se inscrever com poucos toques, sabendo na hora se ficou com vaga ou na lista de espera.",
  "sections": [
    {
      "id": "descobrirEventos",
      "priority": "main",
      "purpose": "Busca compacta e lista empilhada de eventos publicados, filtráveis por título, data ou local.",
      "organisms": [
        "listaEventosPublicados"
      ]
    },
    {
      "id": "conhecerEvento",
      "priority": "primary",
      "purpose": "Mostrar o evento escolhido em leitura vertical: disponibilidade de vagas logo no topo, depois descrição, data e local.",
      "organisms": [
        "detalheEvento"
      ]
    },
    {
      "id": "inscrever",
      "priority": "secondary",
      "purpose": "Ação de inscrição sempre ao alcance ao final da leitura, com retorno claro sobre vaga confirmada ou posição na lista de espera.",
      "organisms": [
        "acaoInscrever"
      ]
    }
  ],
  "organisms": {
    "listaEventosPublicados": {
      "kind": "list",
      "text": "Encontre eventos publicados por título, data ou local; cada item mostra data, local e se ainda há vagas.",
      "intents": []
    },
    "detalheEvento": {
      "kind": "detail",
      "text": "Veja o evento: vagas restantes, se está lotado e tamanho da lista de espera, seguidos da descrição, data e local.",
      "intents": []
    },
    "acaoInscrever": {
      "kind": "actions",
      "text": "Inscrever-me com nome e e-mail: garanto uma vaga ou entro na lista de espera se estiver lotado; depois acompanho em Minhas inscrições.",
      "intents": [
        {
          "id": "inscreverEmEvento",
          "kind": "submit"
        },
        {
          "id": "verMinhasInscricoes",
          "kind": "navigate",
          "to": "minhas_inscricoes"
        }
      ]
    }
  },
  "molecules": {
    "listaEventosPublicados": [
      {
        "role": "busca de eventos por título ou local",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "filtro rápido por data",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-compact-calendar"
      },
      {
        "role": "lista de eventos publicados",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "detalheEvento": [
      {
        "role": "apresentação do evento",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-media"
      },
      {
        "role": "vagas restantes",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-gauge"
      },
      {
        "role": "tamanho da lista de espera",
        "preferred": "groupviewmetric--ml-metric-card"
      }
    ],
    "acaoInscrever": [
      {
        "role": "confirmar inscrição",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "resultado da inscrição (vaga ou posição na espera)",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-notify-banner"
      },
      {
        "role": "aviso de evento lotado ou e-mail já inscrito",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
