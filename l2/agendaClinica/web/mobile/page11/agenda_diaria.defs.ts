/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/agenda_diaria.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/calendarScheduling/page21.md",
    "experience": "calendarGrid"
  },
  "intent": "Em faixa estreita e fluida em torno de 390px, ainda utilizável em 360px e 430px, o profissional percorre só as próprias consultas de hoje, abre o horário para ver o paciente e registra o atendimento com anotação.",
  "sections": [
    {
      "id": "dayAgenda",
      "priority": "primary",
      "purpose": "Empilhar de forma fluida as consultas do dia do profissional, para leitura rápida em largura estreita sem grade fixa.",
      "organisms": [
        "dayConsultations"
      ]
    },
    {
      "id": "selectedConsultation",
      "priority": "main",
      "purpose": "Mostrar o paciente e o horário da consulta aberta em um bloco único que cabe na coluna estreita.",
      "organisms": [
        "consultationSummary"
      ]
    },
    {
      "id": "attendanceCommit",
      "priority": "secondary",
      "purpose": "Anotar o atendimento e disparar o registro na mesma coluna fluida, após a leitura da consulta.",
      "organisms": [
        "attendanceForm",
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
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-timeline-view"
      }
    ],
    "consultationSummary": [
      {
        "role": "summary",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
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
