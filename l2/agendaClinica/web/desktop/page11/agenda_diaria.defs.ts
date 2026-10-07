/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/agenda_diaria.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/calendarScheduling/page21.md",
    "experience": "calendarGrid"
  },
  "intent": "Mostrar ao profissional somente as consultas da própria agenda previstas para hoje, abrir o horário escolhido para identificar o paciente e registrar o atendimento com anotação.",
  "sections": [
    {
      "id": "dayAgenda",
      "priority": "primary",
      "purpose": "Apresentar em ordem de horário as consultas do profissional no dia, para ele localizar cada compromisso da própria agenda.",
      "organisms": [
        "dayConsultations"
      ]
    },
    {
      "id": "selectedConsultation",
      "priority": "main",
      "purpose": "Revelar o paciente e o horário da consulta escolhida e receber a anotação do atendimento realizado.",
      "organisms": [
        "consultationSummary",
        "attendanceForm"
      ]
    },
    {
      "id": "attendanceCommit",
      "priority": "secondary",
      "purpose": "Confirmar o registro do atendimento da consulta selecionada, passando-a para atendida.",
      "organisms": [
        "attendanceActions"
      ]
    }
  ],
  "organisms": {
    "dayConsultations": {
      "kind": "list",
      "text": "Mostra só as consultas vinculadas ao profissional autenticado previstas para hoje, com horário e situação, para ele acompanhar a própria agenda do dia.",
      "intents": []
    },
    "consultationSummary": {
      "kind": "detail",
      "text": "Apresenta o paciente e o horário da consulta selecionada, para o profissional confirmar quem será atendido naquele compromisso.",
      "intents": []
    },
    "attendanceForm": {
      "kind": "form",
      "text": "Permite escrever a anotação do atendimento realizado na consulta aberta, base para marcá-la como atendida.",
      "intents": []
    },
    "attendanceActions": {
      "kind": "actions",
      "text": "Dispara o registro do atendimento da consulta selecionada, associando a anotação e a situação atendida.",
      "intents": [
        {
          "id": "registerAttendance",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "dayConsultations": [
      {
        "role": "collection",
        "preferred": "groupviewdata--ml-calendar-view",
        "alternative": "groupviewdata--ml-timeline-view"
      }
    ],
    "consultationSummary": [
      {
        "role": "summary",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-profile-card"
      }
    ],
    "attendanceForm": [
      {
        "role": "attendanceNote",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      }
    ],
    "attendanceActions": [
      {
        "role": "primaryAction",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ]
  }
} as const;
