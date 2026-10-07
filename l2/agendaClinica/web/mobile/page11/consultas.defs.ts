/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/consultas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/calendarScheduling/page21.md",
    "experience": "calendarGrid"
  },
  "intent": "Em conteúdo estreito e contínuo, a recepcionista percorre a agenda, confere a consulta escolhida, informa o agendamento e dispara marcar, confirmar ou registrar falta sem depender de painéis largos.",
  "sections": [
    {
      "id": "secaoAgenda",
      "priority": "primary",
      "purpose": "Empilha a agenda em faixa estreita cerca de 390px para localizar a consulta com leitura vertical, permanecendo usável em 360px e 430px.",
      "organisms": [
        "listaAgenda"
      ]
    },
    {
      "id": "secaoDetalhe",
      "priority": "main",
      "purpose": "Mostra em seguida o cartão da consulta selecionada para conferir paciente, profissional, data e horário antes de agir.",
      "organisms": [
        "detalheConsulta"
      ]
    },
    {
      "id": "secaoTrabalho",
      "priority": "secondary",
      "purpose": "Mantém o formulário de agendamento e as ações no fluxo estreito, após a conferência, para marcar, confirmar ou registrar falta.",
      "organisms": [
        "formularioConsulta",
        "acoesConsulta"
      ]
    }
  ],
  "organisms": {
    "listaAgenda": {
      "kind": "list",
      "text": "Apresenta as consultas da clínica em lista fluida por data, horário, paciente, profissional e situação para localizar o agendamento no telefone.",
      "intents": []
    },
    "detalheConsulta": {
      "kind": "detail",
      "text": "Exibe paciente, profissional, data, horário e situação da consulta escolhida para a recepcionista conferir os dados na tela estreita antes de confirmar ou registrar falta.",
      "intents": []
    },
    "formularioConsulta": {
      "kind": "form",
      "text": "Concentra a escolha de paciente, profissional e data e horário disponíveis em campos empilhados para marcar a consulta no fluxo móvel.",
      "intents": []
    },
    "acoesConsulta": {
      "kind": "actions",
      "text": "Oferece agendar consulta, confirmar a consulta por telefone e registrar falta em comandos acessíveis ao final do conteúdo estreito.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "verAgenda",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-calendar-view"
      },
      {
        "role": "tabularAgenda",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "detalheConsulta": [
      {
        "role": "cartaoConsulta",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-profile-card"
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
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "informarHorario",
        "preferred": "groupenterdatetime--ml-datetime-picker",
        "alternative": "groupenterdatetime--ml-enter-datetime-masked-input"
      },
      {
        "role": "feedbackOperacao",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "acoesConsulta": [
      {
        "role": "comandosConsulta",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      }
    ]
  }
} as const;
