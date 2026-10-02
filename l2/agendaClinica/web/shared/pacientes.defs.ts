/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/pacientes.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "pacienteId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:patientDetail",
        "persist": true
      },
      "search": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:patientList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:patientList",
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
    "submitPatientCreate": {
      "organism": "patientForm",
      "submit": "submitPatientCreate"
    }
  },
  "requests": {
    "load": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "pacientes"
      ]
    },
    "loadPacientes": {
      "kind": "qry",
      "trigger": "loadPacientes",
      "returns": [
        "pacientes"
      ]
    },
    "loadPaciente": {
      "kind": "qry",
      "trigger": "loadPaciente",
      "returns": [
        "paciente"
      ]
    },
    "submitPatientCreate": {
      "kind": "cmd",
      "trigger": "submitPatientCreate",
      "returns": [
        "paciente"
      ],
      "writes": "Paciente.create"
    }
  },
  "states": {
    "patientList": {
      "source": "load.pacientes",
      "description": "Loaded patient list."
    },
    "patientSelection": {
      "source": "entry.params.pacienteId",
      "description": "Selected patient resolved from the loaded patient list."
    },
    "patientDetail": {
      "source": "loadPaciente.paciente",
      "description": "Loaded selected patient detail."
    },
    "patientSearch": {
      "source": "entry.params.search",
      "description": "Patient list search filter."
    },
    "patientPage": {
      "source": "entry.params.page",
      "description": "Patient list page filter."
    },
    "patientDocumentPrefill": {
      "source": "entry.params.docId",
      "description": "Patient document identifier prefill."
    },
    "patientFormDraft": {
      "source": "submitPatientCreate.input",
      "description": "Patient creation input."
    },
    "createdPatient": {
      "source": "submitPatientCreate.paciente",
      "description": "Created patient."
    }
  },
  "functions": {
    "load": {
      "description": "Loads the patient list.",
      "calls": "load",
      "sets": "patientList"
    },
    "filterPatientList": {
      "description": "Reloads the patient list from the first page using the search and page filters.",
      "calls": "loadPacientes",
      "sets": "patientList"
    },
    "loadMorePatientList": {
      "description": "Appends the next patient list page.",
      "calls": "loadPacientes",
      "sets": "patientList"
    },
    "submitPatientCreate": {
      "description": "Creates a patient.",
      "calls": "submitPatientCreate",
      "sets": "createdPatient",
      "updates": [
        "patientList",
        "patientDetail"
      ]
    },
    "loadPaciente": {
      "description": "Loads the selected patient detail.",
      "calls": "loadPaciente",
      "sets": "patientDetail"
    },
    "openConsultas": {
      "description": "Navigates to consultation scheduling for the selected patient.",
      "navigate": "consultas_recepcao",
      "carries": {
        "pacienteId": "patientSelection.id"
      }
    }
  },
  "journeys": [
    {
      "step": "cadastrarPaciente/informarDadosPaciente",
      "organisms": [
        "patientForm",
        "patientActions"
      ],
      "functions": [
        "submitPatientCreate"
      ]
    },
    {
      "step": "agendarConsulta/localizarPaciente",
      "organisms": [
        "patientList",
        "patientDetail",
        "patientActions"
      ],
      "functions": [
        "loadPaciente",
        "openConsultas"
      ],
      "continuesIn": "consultas_recepcao"
    },
    {
      "step": "agendarConsulta/localizarProfissional",
      "organisms": [
        "patientActions"
      ],
      "functions": [
        "openConsultas"
      ],
      "continuesIn": "consultas_recepcao"
    },
    {
      "step": "agendarConsulta/registrarAgendamento",
      "organisms": [
        "patientActions"
      ],
      "functions": [
        "openConsultas"
      ],
      "continuesIn": "consultas_recepcao"
    },
    {
      "step": "agendarConsulta/verificarHorarioDisponivel",
      "organisms": [
        "patientActions"
      ],
      "functions": [
        "openConsultas"
      ],
      "continuesIn": "consultas_recepcao"
    },
    {
      "step": "confirmarConsulta/consultarContatoPaciente",
      "organisms": [
        "patientDetail",
        "patientActions"
      ],
      "functions": [
        "openConsultas"
      ],
      "continuesIn": "consultas_recepcao"
    },
    {
      "step": "confirmarConsulta/localizarConsultaParaConfirmacao",
      "organisms": [
        "patientActions"
      ],
      "functions": [
        "openConsultas"
      ],
      "continuesIn": "consultas_recepcao"
    },
    {
      "step": "confirmarConsulta/registrarConfirmacao",
      "organisms": [
        "patientActions"
      ],
      "functions": [
        "openConsultas"
      ],
      "continuesIn": "consultas_recepcao"
    }
  ],
  "rules": {
    "load": [],
    "loadPacientes": [],
    "loadPaciente": [],
    "submitPatientCreate": []
  },
  "access": {
    "actors": [
      "recepcionista"
    ],
    "grants": [
      "cadastrarPacientes",
      "consultarCanaisDosPacientes"
    ]
  }
} as const;
