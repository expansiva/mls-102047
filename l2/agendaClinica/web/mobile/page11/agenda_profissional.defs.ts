/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/agenda_profissional.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/calendarScheduling/page21.md",
    "experience": "calendarGrid"
  },
  "intent": "Em conteúdo estreito e fluido em torno de 390px, também usável em 360px e 430px, o profissional localiza as consultas do dia, confere o paciente e registra o atendimento com anotação.",
  "sections": [
    {
      "id": "agendaDoDia",
      "priority": "primary",
      "purpose": "Começar pela agenda do dia em conteúdo fluido em torno de 390px, ainda usável em 360px e 430px, para localizar a consulta própria pelo horário e pelo paciente.",
      "organisms": [
        "consultasDoDia"
      ]
    },
    {
      "id": "consultaSelecionada",
      "priority": "main",
      "purpose": "Em seguida, mostrar os detalhes da consulta e do paciente em leitura empilhada, adequada à largura estreita.",
      "organisms": [
        "detalheConsulta"
      ]
    },
    {
      "id": "conclusaoDoAtendimento",
      "priority": "secondary",
      "purpose": "Ao final do conteúdo estreito, oferecer a anotação e o contexto de ações para concluir o atendimento sem layout rígido.",
      "organisms": [
        "registroAtendimento",
        "acoesAgenda"
      ]
    }
  ],
  "organisms": {
    "consultasDoDia": {
      "kind": "list",
      "text": "Empilha as consultas do dia do profissional, com horário, situação e paciente, para localizar um atendimento na largura estreita.",
      "intents": []
    },
    "detalheConsulta": {
      "kind": "detail",
      "text": "Mostra os dados da consulta selecionada e a identificação do paciente, para conferência antes de concluir o atendimento.",
      "intents": []
    },
    "registroAtendimento": {
      "kind": "form",
      "text": "Recebe a anotação do atendimento e conclui a consulta selecionada como atendida, no fluxo estreito após a conferência.",
      "intents": [
        {
          "id": "registrarAtendimento",
          "kind": "submit"
        }
      ]
    },
    "acoesAgenda": {
      "kind": "actions",
      "text": "Oferece o contexto de consultar a agenda e registrar o atendimento da consulta própria depois da leitura, sem repetir a gravação do formulário.",
      "intents": []
    }
  },
  "molecules": {
    "consultasDoDia": [
      {
        "role": "viewSchedule",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "locateItem",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      }
    ],
    "detalheConsulta": [
      {
        "role": "showSummary",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-profile-card"
      }
    ],
    "registroAtendimento": [
      {
        "role": "enterNote",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "confirmSubmit",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      },
      {
        "role": "notifyResult",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "acoesAgenda": [
      {
        "role": "runActions",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ]
  }
} as const;
