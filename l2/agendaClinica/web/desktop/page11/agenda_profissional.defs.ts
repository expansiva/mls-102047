/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/agenda_profissional.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/calendarScheduling/page21.md",
    "experience": "calendarGrid"
  },
  "intent": "Mostrar ao profissional as consultas da própria agenda do dia, permitir conferir o paciente da consulta selecionada e registrar o atendimento realizado com anotação.",
  "sections": [
    {
      "id": "agendaDoDia",
      "priority": "primary",
      "purpose": "Priorizar a leitura da agenda do dia para o profissional reconhecer horários, pacientes e situação das próprias consultas.",
      "organisms": [
        "consultasDoDia"
      ]
    },
    {
      "id": "consultaEmFoco",
      "priority": "main",
      "purpose": "Depois da lista, concentrar a consulta selecionada e o registro da anotação para concluir o atendimento com segurança.",
      "organisms": [
        "detalheConsulta",
        "registroAtendimento"
      ]
    },
    {
      "id": "comandosDaAgenda",
      "priority": "secondary",
      "purpose": "Disponibilizar o contexto de ações da agenda diária depois da conferência dos dados da consulta própria.",
      "organisms": [
        "acoesAgenda"
      ]
    }
  ],
  "organisms": {
    "consultasDoDia": {
      "kind": "list",
      "text": "Lista as consultas previstas para hoje na agenda do profissional, com horário, situação e paciente, para localizar o atendimento a consultar ou concluir.",
      "intents": []
    },
    "detalheConsulta": {
      "kind": "detail",
      "text": "Apresenta os dados da consulta selecionada e a identificação do paciente vinculado, para o profissional conferir o atendimento antes de registrá-lo.",
      "intents": []
    },
    "registroAtendimento": {
      "kind": "form",
      "text": "Permite informar a anotação do atendimento e concluir a consulta selecionada como atendida.",
      "intents": [
        {
          "id": "registrarAtendimento",
          "kind": "submit"
        }
      ]
    },
    "acoesAgenda": {
      "kind": "actions",
      "text": "Reúne o contexto de consultar a agenda do dia e registrar o atendimento de uma consulta própria, sem repetir a gravação já feita no formulário.",
      "intents": []
    }
  },
  "molecules": {
    "consultasDoDia": [
      {
        "role": "viewSchedule",
        "preferred": "groupviewdata--ml-calendar-view",
        "alternative": "groupviewdata--ml-timeline-view"
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
        "alternative": "groupviewcard--ml-view-card-horizontal"
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
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "notifyResult",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
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
