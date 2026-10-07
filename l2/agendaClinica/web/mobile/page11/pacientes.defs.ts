/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/pacientes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "A recepcionista localiza o paciente pelo nome, confere a identificação e cadastra quem ainda não está na clínica, para poder marcar consultas.",
  "sections": [
    {
      "id": "locatePatients",
      "priority": "primary",
      "purpose": "Em coluna fluida em torno de 390px, também usável em 360px e 430px, a busca e a lista ficam no topo para localizar o paciente pelo nome sem grade fixa.",
      "organisms": [
        "patientList"
      ]
    },
    {
      "id": "registerPatient",
      "priority": "main",
      "purpose": "No mesmo fluxo estreito, o cadastro e sua conclusão vêm em seguida para registrar um paciente novo com o polegar.",
      "organisms": [
        "patientForm",
        "patientActions"
      ]
    },
    {
      "id": "reviewPatient",
      "priority": "secondary",
      "purpose": "Os dados de identificação do paciente selecionado aparecem abaixo, em conteúdo empilhado na largura fluida da tela.",
      "organisms": [
        "patientDetail"
      ]
    }
  ],
  "organisms": {
    "patientList": {
      "kind": "list",
      "text": "Lista os pacientes encontrados pelo nome para a recepcionista escolher quem receberá a consulta.",
      "intents": []
    },
    "patientDetail": {
      "kind": "detail",
      "text": "Apresenta nome, documento e situação do paciente selecionado para confirmar a identificação antes de agendar.",
      "intents": [
        {
          "id": "goToAppointment",
          "kind": "navigate",
          "to": "consultas"
        }
      ]
    },
    "patientForm": {
      "kind": "form",
      "text": "Reúne os dados de identificação de um paciente novo para cadastrá-lo e permitir o agendamento.",
      "intents": [
        {
          "id": "savePatient",
          "kind": "submit"
        }
      ]
    },
    "patientActions": {
      "kind": "actions",
      "text": "Orienta a recepcionista a concluir o cadastro pelo formulário, sem repetir a gravação do paciente.",
      "intents": []
    }
  },
  "molecules": {
    "patientList": [
      {
        "role": "search",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "results",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "patientDetail": [
      {
        "role": "profile",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "patientForm": [
      {
        "role": "name",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "document",
        "preferred": "groupentertext--ml-cpf-input",
        "alternative": "groupentertext--ml-enter-text"
      }
    ]
  }
} as const;
