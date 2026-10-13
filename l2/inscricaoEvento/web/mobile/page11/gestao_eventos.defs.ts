/// <mls fileReference="_102047_/l2/inscricaoEvento/web/mobile/page11/gestao_eventos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "No celular, o organizador localiza um evento, vê primeiro a ocupação e a situação, publica com um toque, cadastra novos eventos e acompanha os inscritos e as promoções, numa coluna única e fluida pensada para cerca de 390px que continua legível em 360px e 430px.",
  "sections": [
    {
      "id": "localizarEventos",
      "priority": "main",
      "purpose": "Encontrar o evento por título, data ou situação numa lista compacta com vagas ocupadas e restantes.",
      "organisms": [
        "eventosList"
      ]
    },
    {
      "id": "eventoEmFoco",
      "priority": "primary",
      "purpose": "Ver os números de ocupação e os dados do evento escolhido e publicá-lo quando estiver pronto.",
      "organisms": [
        "eventoDetail",
        "publicarActions"
      ]
    },
    {
      "id": "acompanhamentoInscritos",
      "priority": "main",
      "purpose": "Conferir os inscritos em ordem de chegada, quem ocupa vaga e quem aguarda, baixar o CSV e ver as promoções automáticas.",
      "organisms": [
        "inscritosList",
        "exportarCsvActions",
        "promocoesTimeline"
      ]
    },
    {
      "id": "cadastroEvento",
      "priority": "secondary",
      "purpose": "Cadastrar um novo evento como rascunho com campos empilhados em coluna única.",
      "organisms": [
        "eventoForm"
      ]
    }
  ],
  "organisms": {
    "eventosList": {
      "kind": "list",
      "text": "Localize seus eventos por título, data ou situação; cada item mostra data, situação, vagas ocupadas e restantes, e tocar abre o evento.",
      "intents": []
    },
    "eventoForm": {
      "kind": "form",
      "text": "Cadastre o evento com título, descrição, data, local e número de vagas; ele fica salvo como rascunho para revisão.",
      "intents": [
        {
          "id": "criarEvento",
          "kind": "submit"
        }
      ]
    },
    "eventoDetail": {
      "kind": "detail",
      "text": "Revise o evento começando pela ocupação (vagas ocupadas, restantes, lotado e lista de espera), seguida dos dados cadastrados e da data de publicação.",
      "intents": []
    },
    "publicarActions": {
      "kind": "actions",
      "text": "Publique o evento para abrir a página pública a inscrições; disponível para rascunhos com dados completos.",
      "intents": [
        {
          "id": "publicarEvento",
          "kind": "submit"
        }
      ]
    },
    "inscritosList": {
      "kind": "list",
      "text": "Inscritos em ordem de chegada, cada um com código, nome, e-mail, recebida em, se ocupa vaga e posição na lista de espera.",
      "intents": []
    },
    "exportarCsvActions": {
      "kind": "actions",
      "text": "Baixe a lista de inscritos do evento em CSV.",
      "intents": []
    },
    "promocoesTimeline": {
      "kind": "timeline",
      "text": "Promoções automáticas: quem saiu da lista de espera e passou a ocupar uma vaga liberada por cancelamento, e quando.",
      "intents": []
    }
  },
  "molecules": {
    "eventosList": [
      {
        "role": "Busca de eventos pelo título",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Filtro por situação do evento",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "Filtro por período de data do evento",
        "preferred": "groupenterdateinterval--ml-date-interval-presets"
      },
      {
        "role": "Resultados com vagas ocupadas e restantes",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "eventoForm": [
      {
        "role": "Título do evento",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
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
        "role": "Nome e endereço do local",
        "preferred": "groupentertext--ml-address-field",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Número de vagas",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-floating-number-input"
      },
      {
        "role": "Salvar rascunho",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação do cadastro",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "eventoDetail": [
      {
        "role": "Vagas ocupadas frente ao total",
        "preferred": "groupviewmetric--ml-metric-gauge",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Vagas restantes e lista de espera",
        "preferred": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Dados cadastrados do evento",
        "preferred": "groupviewcard--ml-vertical-card"
      }
    ],
    "publicarActions": [
      {
        "role": "Publicar evento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Resultado da publicação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "inscritosList": [
      {
        "role": "Lista de inscritos em ordem de chegada",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
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
