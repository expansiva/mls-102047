/// <mls fileReference="_102047_/l2/inscricaoEvento/web/mobile/page11/gestao_eventos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "bespoke",
    "experience": "none"
  },
  "intent": "No celular, o organizador localiza um evento, confere a ocupação e publica, acompanha inscritos e promoções e cadastra novos eventos, tudo em conteúdo fluido de coluna estreita (cerca de 390px, usável de 360px a 430px).",
  "sections": [
    {
      "id": "localizarEventos",
      "priority": "primary",
      "purpose": "Encontrar o evento pelo título, data ou situação, vendo vagas ocupadas e restantes em itens fáceis de tocar.",
      "organisms": [
        "eventosList"
      ]
    },
    {
      "id": "revisarPublicar",
      "priority": "main",
      "purpose": "Ver primeiro a ocupação e a situação do evento escolhido e publicá-lo com um toque quando estiver pronto.",
      "organisms": [
        "eventoDetail",
        "publicarActions"
      ]
    },
    {
      "id": "acompanharInscritos",
      "priority": "main",
      "purpose": "Ler os inscritos empilhados por ordem de chegada, baixar o CSV e acompanhar as promoções automáticas da lista de espera.",
      "organisms": [
        "inscritosList",
        "exportarCsvActions",
        "promocoesTimeline"
      ]
    },
    {
      "id": "cadastrarEvento",
      "priority": "secondary",
      "purpose": "Cadastrar um novo evento em formulário de uma coluna, salvo como rascunho.",
      "organisms": [
        "eventoForm"
      ]
    }
  ],
  "organisms": {
    "eventosList": {
      "kind": "list",
      "text": "Localize seus eventos por título, data ou situação, com vagas ocupadas e restantes de cada um; tocar num evento abre os dados, a ocupação e os inscritos dele.",
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
      "text": "Revise o evento: vagas ocupadas, vagas restantes, se está lotado e tamanho da lista de espera em destaque, seguidos dos dados cadastrados, da situação e da data de publicação.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Filtrar pela data do evento",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "Filtrar por situação (rascunho ou publicado)",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "Lista de eventos em tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "Indicador de ocupação por evento",
        "preferred": "groupshowprogress--ml-linear-progress"
      }
    ],
    "eventoForm": [
      {
        "role": "Título e nome do local",
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
        "role": "Número de vagas",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-floating-number-input"
      },
      {
        "role": "Salvar rascunho",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "eventoDetail": [
      {
        "role": "Vagas ocupadas frente ao número de vagas",
        "preferred": "groupviewmetric--ml-metric-gauge",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Vagas restantes e tamanho da lista de espera",
        "preferred": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Dados cadastrados do evento",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
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
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "inscritosList": [
      {
        "role": "Inscritos em tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
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
