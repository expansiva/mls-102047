/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/pacientes.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:patientList",
        "persist": true
      },
      "nameSearch": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:patientList",
        "persist": true
      },
      "patientId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:patientDetail",
        "persist": true
      },
      "pacienteId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:patientDetail",
        "persist": true
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:patientForm",
        "persist": false
      }
    }
  },
  "forms": {
    "savePatient": {
      "organism": "patientForm",
      "submit": "savePatient"
    }
  },
  "requests": {
    "loadPatients": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "patients"
      ]
    },
    "searchPatients": {
      "kind": "qry",
      "trigger": "searchPatients",
      "returns": [
        "patients"
      ]
    },
    "loadPatientDetail": {
      "kind": "qry",
      "trigger": "loadPatientDetail",
      "returns": [
        "patient"
      ]
    },
    "savePatient": {
      "kind": "cmd",
      "trigger": "savePatient",
      "returns": [
        "patient",
        "patientListItem"
      ],
      "writes": "Paciente.create"
    }
  },
  "states": {
    "patients": {
      "source": "loadPatients.patients",
      "description": "Paciente em formato compacto para a lista de localização.",
      "organisms": [
        "patientList"
      ]
    },
    "patient": {
      "source": "loadPatientDetail.patient",
      "description": "Paciente selecionado, pronto para conferência e continuidade no agendamento.",
      "organisms": [
        "patientDetail"
      ]
    },
    "selectedPaciente": {
      "source": "entry.params.pacienteId",
      "description": "Paciente selecionado, pronto para conferência e continuidade no agendamento.",
      "organisms": [
        "patientDetail",
        "patientList"
      ]
    }
  },
  "functions": {
    "loadPatients": {
      "description": "Inicializa a área de localização de pacientes sem trazer cadastros antes de a recepcionista informar um nome.",
      "calls": "loadPatients",
      "sets": "patients"
    },
    "searchPatients": {
      "description": "Localiza pacientes pelo nome para a recepcionista escolher quem seguirá para o agendamento. (patients.items: append)",
      "calls": "searchPatients",
      "sets": "patients"
    },
    "loadPatientDetail": {
      "description": "Carrega a ficha do paciente que a recepcionista selecionou para confirmar sua identificação antes de ir ao agendamento.",
      "calls": "loadPatientDetail",
      "sets": "patient"
    },
    "savePatient": {
      "description": "Cadastra ou associa o novo paciente informado pela recepcionista e o deixa imediatamente disponível para conferência e agendamento. (patients.items: upsert)",
      "calls": "savePatient",
      "sets": "patient",
      "updates": [
        "patients"
      ]
    },
    "goToAppointment": {
      "description": "Apresenta nome, documento e situação do paciente selecionado para confirmar a identificação antes de agendar.",
      "navigate": "consultas",
      "carries": {
        "pacienteId": "selectedPaciente.id"
      }
    }
  },
  "journeys": [
    {
      "step": "agendarConsulta/localizarPaciente",
      "organisms": [
        "patientList",
        "patientDetail"
      ],
      "functions": [
        "loadPatients",
        "searchPatients",
        "loadPatientDetail"
      ]
    },
    {
      "step": "agendarConsulta/registrarConsulta",
      "organisms": [
        "patientDetail"
      ],
      "functions": [
        "loadPatientDetail"
      ],
      "continuesIn": "consultas"
    },
    {
      "step": "cadastrarPaciente/registrarPaciente",
      "organisms": [
        "patientForm",
        "patientActions",
        "patientList",
        "patientDetail"
      ],
      "functions": [
        "savePatient"
      ]
    }
  ],
  "rules": {
    "loadPatients": [],
    "searchPatients": [],
    "loadPatientDetail": [],
    "savePatient": []
  },
  "access": {
    "actors": [
      "recepcionista"
    ],
    "grants": [
      "recepcionistaGerenciarPacientesEconsultas"
    ]
  }
} as const;
