/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/consultas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/calendarScheduling/page21.md",
    "experience": "calendarGrid"
  },
  "intent": "Mostra a agenda da clínica para a recepcionista localizar consultas, conferir paciente, profissional, data e horário, marcar um novo agendamento disponível e registrar confirmação telefônica ou falta.",
  "sections": [
    {
      "id": "secaoAgenda",
      "priority": "primary",
      "purpose": "Apresenta a agenda da clínica em primeiro plano para a recepcionista varrer datas, horários e situações e localizar a consulta certa.",
      "organisms": [
        "listaAgenda"
      ]
    },
    {
      "id": "secaoTrabalho",
      "priority": "main",
      "purpose": "Reúne a conferência da consulta selecionada e o preenchimento de paciente, profissional, data e horário para agendar com segurança.",
      "organisms": [
        "detalheConsulta",
        "formularioConsulta"
      ]
    },
    {
      "id": "secaoAcoes",
      "priority": "secondary",
      "purpose": "Disponibiliza as ações de agendar, confirmar por telefone e registrar falta depois que a recepcionista conferiu o contexto.",
      "organisms": [
        "acoesConsulta"
      ]
    }
  ],
  "organisms": {
    "listaAgenda": {
      "kind": "list",
      "text": "Lista as consultas da clínica por data, horário, paciente, profissional e situação para a recepcionista localizar o agendamento na agenda.",
      "intents": []
    },
    "detalheConsulta": {
      "kind": "detail",
      "text": "Mostra paciente, profissional, data, horário e situação da consulta selecionada para a recepcionista conferir os dados antes de confirmar ou registrar falta.",
      "intents": []
    },
    "formularioConsulta": {
      "kind": "form",
      "text": "Permite informar paciente, profissional e data e horário disponíveis para marcar a consulta, apoiando o registro operacional do agendamento.",
      "intents": []
    },
    "acoesConsulta": {
      "kind": "actions",
      "text": "Dispara agendar consulta, confirmar a consulta por telefone e registrar falta do paciente sobre a consulta conferida na agenda.",
      "intents": [
        {
          "id": "agendarConsulta",
          "kind": "submit"
        },
        {
          "id": "confirmarConsulta",
          "kind": "submit"
        },
        {
          "id": "registrarFalta",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "listaAgenda": [
      {
        "role": "filtrarAgenda",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "verAgenda",
        "preferred": "groupviewdata--ml-calendar-view",
        "alternative": "groupviewdata--ml-timeline-view"
      },
      {
        "role": "tabularAgenda",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-grouping-table"
      }
    ],
    "detalheConsulta": [
      {
        "role": "cartaoConsulta",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "formularioConsulta": [
      {
        "role": "escolherPaciente",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "escolherProfissional",
        "preferred": "groupselectone--ml-select-dropdown",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "informarHorario",
        "preferred": "groupenterdatetime--ml-datetime-picker",
        "alternative": "groupenterdatetime--ml-enter-datetime-masked-input"
      },
      {
        "role": "feedbackOperacao",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "acoesConsulta": [
      {
        "role": "comandosConsulta",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
