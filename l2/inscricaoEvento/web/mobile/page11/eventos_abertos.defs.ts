/// <mls fileReference="_102047_/l2/inscricaoEvento/web/mobile/page11/eventos_abertos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/contentLanding/page11.md",
    "experience": "contentFirstConvert"
  },
  "intent": "No celular, deixar a pessoa encontrar um evento publicado, ler as informações principais e se inscrever com poucos toques. O conteúdo ocupa uma coluna fluida de cerca de 390px e continua confortável entre 360px e 430px.",
  "sections": [
    {
      "id": "encontrarEventos",
      "priority": "main",
      "purpose": "Busca curta por título, data ou local, seguida da lista de eventos publicados em uma coluna, para tocar e abrir o evento.",
      "organisms": [
        "eventosPublicados"
      ]
    },
    {
      "id": "conhecerEvento",
      "priority": "primary",
      "purpose": "Mostrar primeiro data, local e vagas restantes e, logo abaixo, a descrição, avisando se o evento está lotado e quantas pessoas aguardam na lista de espera.",
      "organisms": [
        "detalheEvento"
      ]
    },
    {
      "id": "inscrever",
      "priority": "primary",
      "purpose": "Deixar a ação de inscrição ao alcance do polegar, logo depois do evento, com o resultado claro: vaga confirmada ou posição na lista de espera.",
      "organisms": [
        "acaoInscricao"
      ]
    }
  ],
  "organisms": {
    "eventosPublicados": {
      "kind": "list",
      "text": "Eventos publicados que você pode buscar por título, data ou local, cada um com título, data e local, para escolher qual abrir.",
      "intents": []
    },
    "detalheEvento": {
      "kind": "detail",
      "text": "O evento escolhido: descrição, data, local, vagas restantes, se está lotado e tamanho da lista de espera, para você decidir se quer se inscrever.",
      "intents": []
    },
    "acaoInscricao": {
      "kind": "actions",
      "text": "Inscrever-me com nome e e-mail: se houver vaga ela é garantida; se o evento estiver lotado, você entra na lista de espera por ordem de chegada e vê sua posição. Depois você pode acompanhar a inscrição em Minhas inscrições.",
      "intents": [
        {
          "id": "inscreverMe",
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
    "eventosPublicados": [
      {
        "role": "Buscar evento pelo título ou local",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Filtrar pela data do evento",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "Mostrar os eventos encontrados em uma coluna",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "detalheEvento": [
      {
        "role": "Apresentar o evento com descrição, data e local",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-media"
      },
      {
        "role": "Destacar as vagas restantes do evento",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Avisar que o evento está lotado e informar o tamanho da lista de espera",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "acaoInscricao": [
      {
        "role": "Confirmar a inscrição",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Informar o resultado: vaga confirmada ou posição na lista de espera",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
