/// <mls fileReference="_102047_/l2/inscricaoEvento/web/desktop/page11/gestao_eventos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "bespoke",
    "experience": "none"
  },
  "intent": "Permitir ao organizador encontrar seus eventos, cadastrar novos, revisar dados e ocupação, publicar para abrir inscrições e acompanhar os inscritos, a lista de espera e as promoções automáticas.",
  "sections": [
    {
      "id": "localizarEventos",
      "priority": "primary",
      "purpose": "Encontrar rapidamente o evento a trabalhar pelo título, data ou situação, vendo de relance vagas ocupadas e restantes.",
      "organisms": [
        "eventosList"
      ]
    },
    {
      "id": "revisarPublicar",
      "priority": "main",
      "purpose": "Conferir os dados e a ocupação do evento selecionado e publicá-lo quando estiver pronto para receber inscrições.",
      "organisms": [
        "eventoDetail",
        "publicarActions"
      ]
    },
    {
      "id": "acompanharInscritos",
      "priority": "main",
      "purpose": "Acompanhar quem se inscreveu, quem ocupa vaga e a ordem da lista de espera, baixar a lista em CSV e ver as promoções automáticas.",
      "organisms": [
        "inscritosList",
        "exportarCsvActions",
        "promocoesTimeline"
      ]
    },
    {
      "id": "cadastrarEvento",
      "priority": "secondary",
      "purpose": "Cadastrar um novo evento como rascunho com título, descrição, data, local e número de vagas.",
      "organisms": [
        "eventoForm"
      ]
    }
  ],
  "organisms": {
    "eventosList": {
      "kind": "list",
      "text": "Localize seus eventos por título, data ou situação, com vagas ocupadas e restantes de cada um; ao escolher um evento, os dados, a ocupação e os inscritos dele aparecem ao lado.",
      "intents": []
    },
    "eventoForm": {
      "kind": "form",
      "text": "Cadastre o evento com título, descrição, data, local e número de vagas; ele é salvo como rascunho para revisão antes da publicação.",
      "intents": [
        {
          "id": "salvarEvento",
          "kind": "submit"
        }
      ]
    },
    "eventoDetail": {
      "kind": "detail",
      "text": "Revise o evento: dados cadastrados, situação, publicado em, vagas ocupadas, vagas restantes, se está lotado e tamanho da lista de espera.",
      "intents": []
    },
    "publicarActions": {
      "kind": "actions",
      "text": "Publique o evento em rascunho para que a página pública passe a receber inscrições.",
      "intents": [
        {
          "id": "publicarEvento",
          "kind": "submit"
        }
      ]
    },
    "inscritosList": {
      "kind": "list",
      "text": "Inscritos do evento por ordem de chegada, com código da inscrição, nome, e-mail, recebida em, situação, se ocupa vaga e posição na lista de espera.",
      "intents": []
    },
    "exportarCsvActions": {
      "kind": "actions",
      "text": "Baixe a lista de inscritos do evento em CSV, com nome, e-mail, situação e ordem de chegada.",
      "intents": []
    },
    "promocoesTimeline": {
      "kind": "timeline",
      "text": "Promoções automáticas: quando uma inscrição com vaga é cancelada, a mais antiga da lista de espera passa a ocupar a vaga; cada promoção aparece aqui com o momento em que aconteceu.",
      "intents": []
    }
  },
  "molecules": {
    "eventosList": [
      {
        "role": "Buscar evento pelo título",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Filtrar pela data do evento",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "Filtrar por situação (rascunho ou publicado)",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Tabela de eventos com vagas ocupadas e restantes",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "Indicador de ocupação por evento",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      }
    ],
    "eventoForm": [
      {
        "role": "Título e nome do local",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "Descrição do evento",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "Data do evento",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-compact-calendar"
      },
      {
        "role": "Número de vagas",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      },
      {
        "role": "Salvar rascunho",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "eventoDetail": [
      {
        "role": "Dados cadastrados do evento",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Vagas ocupadas frente ao número de vagas",
        "preferred": "groupviewmetric--ml-metric-gauge",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Vagas restantes e tamanho da lista de espera",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Barra de ocupação",
        "preferred": "groupshowprogress--ml-linear-progress"
      }
    ],
    "publicarActions": [
      {
        "role": "Publicar evento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação ou bloqueio da publicação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "inscritosList": [
      {
        "role": "Tabela de inscritos por ordem de chegada",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "exportarCsvActions": [
      {
        "role": "Baixar CSV",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ],
    "promocoesTimeline": [
      {
        "role": "Linha do tempo das promoções",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
