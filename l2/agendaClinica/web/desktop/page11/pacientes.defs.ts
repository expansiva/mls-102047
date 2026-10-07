/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/pacientes.defs.ts" enhancement="_blank"/>

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
      "purpose": "Coloca a busca e a lista de pacientes em primeiro plano para a recepcionista encontrar pelo nome quem receberá a consulta.",
      "organisms": [
        "patientList"
      ]
    },
    {
      "id": "reviewPatient",
      "priority": "main",
      "purpose": "Mostra a ficha de identificação do paciente escolhido para confirmar que é a pessoa certa antes de seguir ao agendamento.",
      "organisms": [
        "patientDetail"
      ]
    },
    {
      "id": "registerPatient",
      "priority": "secondary",
      "purpose": "Reúne o formulário de um paciente novo e a ação de cadastrar, para registrá-lo e deixá-lo disponível para consultas.",
      "organisms": [
        "patientForm",
        "patientActions"
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
