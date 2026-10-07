/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/agenda_diaria.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:dayConsultations",
        "persist": true
      },
      "consultaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:consultationSummary",
        "persist": true
      }
    }
  },
  "forms": {
    "registerAttendance": {
      "organism": "attendanceForm",
      "submit": "registerAttendance"
    }
  },
  "requests": {
    "carregarAgendaDiaria": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "consultas"
      ]
    },
    "carregarMaisConsultasDoDia": {
      "kind": "qry",
      "trigger": "carregarMaisConsultasDoDia",
      "returns": [
        "consultas"
      ]
    },
    "carregarConsultaSelecionada": {
      "kind": "qry",
      "trigger": "carregarConsultaSelecionada",
      "returns": [
        "consulta"
      ]
    },
    "registrarAtendimento": {
      "kind": "cmd",
      "trigger": "registerAttendance",
      "returns": [
        "consulta"
      ],
      "writes": "Consulta.registrarAtendimento"
    }
  },
  "states": {
    "carregarAgendaDiariaConsultas": {
      "source": "carregarAgendaDiaria.consultas",
      "description": "Linha resumida da agenda diária do profissional.",
      "organisms": [
        "dayConsultations"
      ]
    },
    "carregarMaisConsultasDoDiaConsultas": {
      "source": "carregarMaisConsultasDoDia.consultas",
      "description": "Linha resumida da agenda diária do profissional.",
      "organisms": [
        "dayConsultations"
      ]
    },
    "registrarAtendimentoConsulta": {
      "source": "registrarAtendimento.consulta",
      "description": "Consulta aberta pelo profissional, com paciente, profissional e anotação para conferência e registro.",
      "organisms": [
        "attendanceActions",
        "attendanceForm",
        "consultationSummary",
        "dayConsultations"
      ]
    },
    "carregarConsultaSelecionadaConsulta": {
      "source": "carregarConsultaSelecionada.consulta",
      "description": "Consulta aberta pelo profissional, com paciente, profissional e anotação para conferência e registro.",
      "organisms": [
        "attendanceActions",
        "attendanceForm",
        "consultationSummary"
      ]
    },
    "selectedConsulta": {
      "source": "entry.params.consultaId",
      "description": "Consulta aberta pelo profissional, com paciente, profissional e anotação para conferência e registro.",
      "organisms": [
        "consultationSummary",
        "dayConsultations"
      ]
    }
  },
  "functions": {
    "carregarAgendaDiaria": {
      "description": "Carrega a primeira página da agenda de hoje do profissional autenticado para exibir seus horários, pacientes e situações.",
      "calls": "carregarAgendaDiaria",
      "sets": "carregarAgendaDiariaConsultas"
    },
    "carregarMaisConsultasDoDia": {
      "description": "Busca sob demanda a próxima página de consultas da agenda de hoje do profissional autenticado. (carregarAgendaDiariaConsultas.items: append)",
      "calls": "carregarMaisConsultasDoDia",
      "sets": "carregarMaisConsultasDoDiaConsultas",
      "updates": [
        "carregarAgendaDiariaConsultas"
      ]
    },
    "carregarConsultaSelecionada": {
      "description": "Abre a consulta escolhida na agenda diária para identificar paciente, horário e profissional e permitir o registro do atendimento.",
      "calls": "carregarConsultaSelecionada",
      "sets": "carregarConsultaSelecionadaConsulta"
    },
    "registrarAtendimento": {
      "description": "Registra o atendimento realizado na consulta aberta pelo profissional e devolve o estado atualizado para redesenhar a página. (carregarConsultaSelecionadaConsulta: upsert; carregarAgendaDiariaConsultas.items: upsert)",
      "calls": "registrarAtendimento",
      "updates": [
        "carregarConsultaSelecionadaConsulta",
        "carregarAgendaDiariaConsultas"
      ]
    }
  },
  "journeys": [
    {
      "step": "consultarAgendaDiaria/localizarAgendaDoDia",
      "organisms": [
        "dayConsultations"
      ],
      "functions": [
        "carregarAgendaDiaria",
        "carregarMaisConsultasDoDia"
      ]
    },
    {
      "step": "consultarAgendaDiaria/consultarConsultasDoDia",
      "organisms": [
        "dayConsultations",
        "consultationSummary"
      ],
      "functions": [
        "carregarAgendaDiaria",
        "carregarMaisConsultasDoDia",
        "carregarConsultaSelecionada"
      ]
    },
    {
      "step": "registrarAtendimento/localizarConsultaDoDia",
      "organisms": [
        "dayConsultations",
        "consultationSummary",
        "attendanceForm",
        "attendanceActions"
      ],
      "functions": [
        "carregarAgendaDiaria",
        "carregarMaisConsultasDoDia",
        "carregarConsultaSelecionada"
      ]
    },
    {
      "step": "registrarAtendimento/registrarAtendimentoRealizado",
      "organisms": [
        "consultationSummary",
        "attendanceForm",
        "attendanceActions",
        "dayConsultations"
      ],
      "functions": [
        "registrarAtendimento"
      ]
    }
  ],
  "rules": {
    "carregarAgendaDiaria": [],
    "carregarMaisConsultasDoDia": [],
    "carregarConsultaSelecionada": [],
    "registrarAtendimento": [
      "transicaoConsultaValida",
      "anotacaoObrigatoriaNoAtendimento"
    ]
  },
  "access": {
    "actors": [
      "profissional"
    ],
    "grants": [
      "profissionalConsultarEregistrarPropriaAgenda",
      "profissionalIdentificarPacientesDaPropriaAgenda"
    ]
  }
} as const;
