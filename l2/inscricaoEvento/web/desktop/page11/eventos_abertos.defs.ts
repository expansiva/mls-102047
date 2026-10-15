/// <mls fileReference="_102047_/l2/inscricaoEvento/web/desktop/page11/eventos_abertos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/contentLanding/page11.md",
    "experience": "contentFirstConvert"
  },
  "intent": "Ajudar a pessoa a encontrar um evento publicado, entender do que se trata, quando e onde acontece e se ainda há vagas, e se inscrever garantindo uma vaga ou um lugar na lista de espera.",
  "sections": [
    {
      "id": "descobrirEventos",
      "priority": "main",
      "purpose": "Permitir localizar rapidamente os eventos publicados por título, data ou local, para escolher qual conhecer.",
      "organisms": [
        "listaEventosPublicados"
      ]
    },
    {
      "id": "conhecerEvento",
      "priority": "primary",
      "purpose": "Apresentar o evento escolhido com descrição, data, local e a disponibilidade de vagas, deixando claro se está lotado e quantas pessoas aguardam na lista de espera.",
      "organisms": [
        "detalheEvento"
      ]
    },
    {
      "id": "inscrever",
      "priority": "secondary",
      "purpose": "Concluir a inscrição com nome e e-mail e mostrar o resultado: vaga confirmada ou posição na lista de espera.",
      "organisms": [
        "acaoInscrever"
      ]
    }
  ],
  "organisms": {
    "listaEventosPublicados": {
      "kind": "list",
      "text": "Encontre eventos publicados por título, data ou local e escolha um para ver os detalhes.",
      "intents": []
    },
    "detalheEvento": {
      "kind": "detail",
      "text": "Veja o evento: descrição, data, local, vagas restantes, se está lotado e tamanho da lista de espera, para decidir se vale se inscrever.",
      "intents": []
    },
    "acaoInscrever": {
      "kind": "actions",
      "text": "Inscrever-me: informo nome e e-mail e garanto uma vaga, ou entro na lista de espera por ordem de chegada se estiver lotado; depois posso acompanhar em Minhas inscrições.",
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
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "filtro por data do evento",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "coleção de eventos publicados",
        "preferred": "groupviewdata--ml-card-grid",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "detalheEvento": [
      {
        "role": "apresentação do evento",
        "preferred": "groupviewcard--ml-view-card-media",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "vagas restantes frente à capacidade",
        "preferred": "groupviewmetric--ml-metric-gauge",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "tamanho da lista de espera",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "acaoInscrever": [
      {
        "role": "confirmar inscrição",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "resultado da inscrição (vaga ou posição na espera)",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-toast-notification"
      },
      {
        "role": "aviso de evento lotado ou e-mail já inscrito",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
