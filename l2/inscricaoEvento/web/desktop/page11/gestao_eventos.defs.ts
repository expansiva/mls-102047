/// <mls fileReference="_102047_/l2/inscricaoEvento/web/desktop/page11/gestao_eventos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "Dar ao organizador um único lugar para encontrar seus eventos, cadastrar um novo, revisar os dados e a ocupação, publicá-lo para receber inscrições e acompanhar os inscritos, a lista de espera e as promoções automáticas, baixando a lista em CSV quando precisar.",
  "sections": [
    {
      "id": "localizarEventos",
      "priority": "secondary",
      "purpose": "Encontrar rapidamente o evento a trabalhar, por título, data ou situação, já vendo vagas ocupadas e restantes.",
      "organisms": [
        "eventosList"
      ]
    },
    {
      "id": "eventoEmFoco",
      "priority": "primary",
      "purpose": "Revisar o evento escolhido, com dados cadastrados, data de publicação e ocupação, e publicá-lo quando estiver pronto.",
      "organisms": [
        "eventoDetail",
        "publicarActions"
      ]
    },
    {
      "id": "cadastroEvento",
      "priority": "main",
      "purpose": "Cadastrar um novo evento como rascunho, informando título, descrição, data, local e número de vagas.",
      "organisms": [
        "eventoForm"
      ]
    },
    {
      "id": "acompanhamentoInscritos",
      "priority": "main",
      "purpose": "Acompanhar quem se inscreveu no evento, quem ocupa vaga e a ordem na lista de espera, baixar a lista em CSV e ver as promoções automáticas.",
      "organisms": [
        "inscritosList",
        "exportarCsvActions",
        "promocoesTimeline"
      ]
    }
  ],
  "organisms": {
    "eventosList": {
      "kind": "list",
      "text": "Localize seus eventos por título, data ou situação (rascunho ou publicado), vendo para cada um as vagas ocupadas e as restantes; ao escolher um evento, ele abre para revisão.",
      "intents": []
    },
    "eventoForm": {
      "kind": "form",
      "text": "Cadastre o evento com título, descrição, data, local e número de vagas; ele é salvo como rascunho e pode ser revisado antes da publicação.",
      "intents": [
        {
          "id": "criarEvento",
          "kind": "submit"
        }
      ]
    },
    "eventoDetail": {
      "kind": "detail",
      "text": "Revise o evento: dados cadastrados, situação, publicado em, vagas ocupadas, vagas restantes, se está lotado e o tamanho da lista de espera.",
      "intents": []
    },
    "publicarActions": {
      "kind": "actions",
      "text": "Publique o evento para que ele ganhe uma página pública aberta a inscrições; só vale para eventos em rascunho com os dados completos.",
      "intents": [
        {
          "id": "publicarEvento",
          "kind": "submit"
        }
      ]
    },
    "inscritosList": {
      "kind": "list",
      "text": "Inscritos do evento com código da inscrição, nome, e-mail, recebida em, situação, se ocupa vaga e posição na lista de espera, em ordem de chegada.",
      "intents": []
    },
    "exportarCsvActions": {
      "kind": "actions",
      "text": "Baixe a lista de inscritos do evento em CSV, com nome, e-mail, situação e ordem de chegada.",
      "intents": []
    },
    "promocoesTimeline": {
      "kind": "timeline",
      "text": "Promoções automáticas: quando uma inscrição com vaga é cancelada, a mais antiga da lista de espera passa a ocupar a vaga; aqui aparece quem foi promovido e quando.",
      "intents": []
    }
  },
  "molecules": {
    "eventosList": [
      {
        "role": "Busca de eventos pelo título",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Filtro por situação do evento",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Filtro por período de data do evento",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-date-range-dual-calendar"
      },
      {
        "role": "Resultados com vagas ocupadas e restantes",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "eventoForm": [
      {
        "role": "Título do evento",
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
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "Nome e endereço do local",
        "preferred": "groupentertext--ml-address-field",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Número de vagas",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      },
      {
        "role": "Salvar rascunho",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação do cadastro",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "eventoDetail": [
      {
        "role": "Dados cadastrados do evento",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Vagas ocupadas frente ao total",
        "preferred": "groupviewmetric--ml-metric-gauge",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Vagas restantes e lista de espera",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "publicarActions": [
      {
        "role": "Publicar evento",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "Resultado da publicação",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "inscritosList": [
      {
        "role": "Tabela de inscritos em ordem de chegada",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "exportarCsvActions": [
      {
        "role": "Baixar CSV",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      },
      {
        "role": "Aviso de arquivo gerado",
        "preferred": "groupnotifyuser--ml-toast-notification"
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
