/// <mls fileReference="_102047_/l2/inscricaoEvento/web/desktop/page11/eventos_abertos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/contentLanding/page11.md",
    "experience": "contentFirstConvert"
  },
  "intent": "Ajudar quem visita a encontrar um evento publicado, entender do que se trata e se ainda há vagas, e se inscrever com nome e e-mail, garantindo uma vaga ou um lugar na lista de espera.",
  "sections": [
    {
      "id": "encontrarEventos",
      "priority": "main",
      "purpose": "Localizar rapidamente um evento publicado pelo título, pela data ou pelo local, para abrir a página dele.",
      "organisms": [
        "eventosPublicados"
      ]
    },
    {
      "id": "conhecerEvento",
      "priority": "primary",
      "purpose": "Apresentar o evento escolhido com descrição, data, local e disponibilidade: vagas restantes, se está lotado e quantas pessoas já aguardam na lista de espera.",
      "organisms": [
        "detalheEvento"
      ]
    },
    {
      "id": "inscrever",
      "priority": "primary",
      "purpose": "Concluir a inscrição logo após ler o evento, deixando claro se a pessoa ficará com vaga confirmada ou entrará na lista de espera.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Filtrar pela data do evento",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "Mostrar os eventos encontrados para escolha",
        "preferred": "groupviewdata--ml-card-grid",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "detalheEvento": [
      {
        "role": "Apresentar o evento com descrição, data e local",
        "preferred": "groupviewcard--ml-view-card-media",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Destacar as vagas restantes do evento",
        "preferred": "groupviewmetric--ml-metric-gauge",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Avisar que o evento está lotado e informar o tamanho da lista de espera",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "acaoInscricao": [
      {
        "role": "Confirmar a inscrição",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Informar o resultado: vaga confirmada ou posição na lista de espera",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
