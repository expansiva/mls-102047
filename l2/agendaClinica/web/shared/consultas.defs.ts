/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/consultas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "dataAgenda": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAgenda",
        "persist": true
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAgenda",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaAgenda",
        "persist": true
      },
      "id": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:detalheConsulta",
        "persist": true
      },
      "termo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:formularioConsulta",
        "persist": true
      },
      "pacienteId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Paciente",
        "persist": true
      },
      "consultaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheConsulta",
        "persist": true
      },
      "profissionalId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:formularioConsulta",
        "persist": false
      }
    }
  },
  "forms": {
    "agendarConsulta": {
      "organism": "formularioConsulta",
      "submit": "agendarConsulta"
    }
  },
  "requests": {
    "carregarAgenda": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "cabecalho",
        "quantidadePendentes",
        "agenda"
      ]
    },
    "filtrarAgenda": {
      "kind": "qry",
      "trigger": "filtrarAgenda",
      "returns": [
        "cabecalho",
        "quantidadePendentes",
        "agenda"
      ]
    },
    "carregarMaisAgenda": {
      "kind": "qry",
      "trigger": "carregarMaisAgenda",
      "returns": [
        "agenda"
      ]
    },
    "consultarConsultaSelecionada": {
      "kind": "qry",
      "trigger": "consultarConsultaSelecionada",
      "returns": [
        "consulta"
      ]
    },
    "localizarPacientesParaAgendamento": {
      "kind": "qry",
      "trigger": "localizarPacientesParaAgendamento",
      "returns": [
        "pacientes"
      ]
    },
    "carregarMaisPacientesParaAgendamento": {
      "kind": "qry",
      "trigger": "carregarMaisPacientesParaAgendamento",
      "returns": [
        "pacientes"
      ]
    },
    "localizarProfissionaisParaAgendamento": {
      "kind": "qry",
      "trigger": "localizarProfissionaisParaAgendamento",
      "returns": [
        "profissionais"
      ]
    },
    "carregarMaisProfissionaisParaAgendamento": {
      "kind": "qry",
      "trigger": "carregarMaisProfissionaisParaAgendamento",
      "returns": [
        "profissionais"
      ]
    },
    "agendarConsulta": {
      "kind": "cmd",
      "trigger": "agendarConsulta",
      "returns": [
        "consulta",
        "cabecalho",
        "quantidadePendentes",
        "agenda"
      ],
      "writes": "Consulta.create"
    },
    "confirmarConsulta": {
      "kind": "cmd",
      "trigger": "confirmarConsulta",
      "returns": [
        "consulta",
        "cabecalho",
        "quantidadePendentes",
        "agenda"
      ],
      "writes": "Consulta.confirmarConsulta"
    },
    "registrarFalta": {
      "kind": "cmd",
      "trigger": "registrarFalta",
      "returns": [
        "consulta",
        "cabecalho",
        "quantidadePendentes",
        "agenda"
      ],
      "writes": "Consulta.registrarFalta"
    }
  },
  "states": {
    "cabecalho": {
      "source": "carregarAgenda.cabecalho",
      "description": "Cabeçalho da agenda no dia consultado.",
      "organisms": [
        "listaAgenda"
      ]
    },
    "quantidadePendentes": {
      "source": "carregarAgenda.quantidadePendentes",
      "description": "Devolve o cabeçalho da data, o indicador já calculado e uma página de linhas de agenda prontas para exibição.",
      "organisms": [
        "listaAgenda"
      ]
    },
    "agenda": {
      "source": "carregarAgenda.agenda",
      "description": "Linha pronta para a agenda, com os nomes resolvidos do paciente e do profissional.",
      "organisms": [
        "listaAgenda"
      ]
    },
    "consulta": {
      "source": "consultarConsultaSelecionada.consulta",
      "description": "Consulta selecionada, composta com paciente e profissional, para conferência, ações e preenchimento do formulário.",
      "organisms": [
        "acoesConsulta",
        "detalheConsulta",
        "formularioConsulta"
      ]
    },
    "pacientes": {
      "source": "localizarPacientesParaAgendamento.pacientes",
      "description": "Paciente identificado em uma linha de agenda ou opção de agendamento.",
      "organisms": [
        "formularioConsulta"
      ]
    },
    "profissionais": {
      "source": "localizarProfissionaisParaAgendamento.profissionais",
      "description": "Profissional identificado em uma linha de agenda ou opção de agendamento.",
      "organisms": [
        "formularioConsulta"
      ]
    },
    "selectedConsulta": {
      "source": "entry.params.consultaId",
      "description": "Consulta selecionada, composta com paciente e profissional, para conferência, ações e preenchimento do formulário.",
      "organisms": [
        "detalheConsulta",
        "listaAgenda"
      ]
    }
  },
  "functions": {
    "carregarAgenda": {
      "description": "Carrega a visão inicial da agenda clínica para a recepcionista localizar e conferir consultas.",
      "calls": "carregarAgenda",
      "sets": "cabecalho",
      "updates": [
        "quantidadePendentes",
        "agenda"
      ]
    },
    "filtrarAgenda": {
      "description": "Substitui a agenda exibida quando a recepcionista muda a data ou a situação procurada.",
      "calls": "filtrarAgenda",
      "sets": "cabecalho",
      "updates": [
        "quantidadePendentes",
        "agenda"
      ]
    },
    "carregarMaisAgenda": {
      "description": "Traz a próxima página da mesma agenda já filtrada. (agenda.items: append)",
      "calls": "carregarMaisAgenda",
      "updates": [
        "agenda"
      ]
    },
    "consultarConsultaSelecionada": {
      "description": "Carrega a consulta escolhida com os dados necessários para conferir, agir ou reutilizar no formulário.",
      "calls": "consultarConsultaSelecionada",
      "sets": "consulta"
    },
    "localizarPacientesParaAgendamento": {
      "description": "Localiza pacientes para a recepcionista escolher quem receberá o novo agendamento.",
      "calls": "localizarPacientesParaAgendamento",
      "sets": "pacientes"
    },
    "carregarMaisPacientesParaAgendamento": {
      "description": "Acrescenta resultados à localização de pacientes usada no agendamento. (pacientes.items: append)",
      "calls": "carregarMaisPacientesParaAgendamento",
      "updates": [
        "pacientes"
      ]
    },
    "localizarProfissionaisParaAgendamento": {
      "description": "Localiza profissionais da agenda para a recepcionista definir o responsável pela nova consulta.",
      "calls": "localizarProfissionaisParaAgendamento",
      "sets": "profissionais"
    },
    "carregarMaisProfissionaisParaAgendamento": {
      "description": "Acrescenta resultados à localização de profissionais para o agendamento. (profissionais.items: append)",
      "calls": "carregarMaisProfissionaisParaAgendamento",
      "updates": [
        "profissionais"
      ]
    },
    "agendarConsulta": {
      "description": "Cria o agendamento informado pela recepcionista e devolve a visão que a página precisa redesenhar.",
      "calls": "agendarConsulta",
      "sets": "consulta",
      "updates": [
        "cabecalho",
        "quantidadePendentes",
        "agenda"
      ]
    },
    "confirmarConsulta": {
      "description": "Registra a confirmação telefônica da consulta conferida e atualiza a agenda exibida.",
      "calls": "confirmarConsulta",
      "sets": "consulta",
      "updates": [
        "cabecalho",
        "quantidadePendentes",
        "agenda"
      ]
    },
    "registrarFalta": {
      "description": "Registra a falta do paciente na consulta conferida e devolve a agenda já atualizada.",
      "calls": "registrarFalta",
      "sets": "consulta",
      "updates": [
        "cabecalho",
        "quantidadePendentes",
        "agenda"
      ]
    }
  },
  "journeys": [
    {
      "step": "agendarConsulta/localizarPaciente",
      "organisms": [
        "formularioConsulta"
      ],
      "functions": [
        "localizarPacientesParaAgendamento",
        "carregarMaisPacientesParaAgendamento"
      ]
    },
    {
      "step": "agendarConsulta/registrarConsulta",
      "organisms": [
        "formularioConsulta",
        "acoesConsulta",
        "detalheConsulta",
        "listaAgenda"
      ],
      "functions": [
        "localizarProfissionaisParaAgendamento",
        "carregarMaisProfissionaisParaAgendamento",
        "agendarConsulta"
      ]
    },
    {
      "step": "confirmarConsulta/localizarConsulta",
      "organisms": [
        "listaAgenda",
        "detalheConsulta"
      ],
      "functions": [
        "carregarAgenda",
        "filtrarAgenda",
        "carregarMaisAgenda",
        "consultarConsultaSelecionada"
      ]
    },
    {
      "step": "confirmarConsulta/conferirDadosConsulta",
      "organisms": [
        "detalheConsulta",
        "acoesConsulta"
      ],
      "functions": [
        "consultarConsultaSelecionada"
      ]
    },
    {
      "step": "confirmarConsulta/confirmarAgendamento",
      "organisms": [
        "acoesConsulta",
        "detalheConsulta",
        "listaAgenda"
      ],
      "functions": [
        "confirmarConsulta"
      ]
    },
    {
      "step": "registrarFalta/localizarConsultaAusente",
      "organisms": [
        "listaAgenda",
        "detalheConsulta"
      ],
      "functions": [
        "carregarAgenda",
        "filtrarAgenda",
        "carregarMaisAgenda",
        "consultarConsultaSelecionada"
      ]
    },
    {
      "step": "registrarFalta/marcarFalta",
      "organisms": [
        "acoesConsulta",
        "detalheConsulta",
        "listaAgenda"
      ],
      "functions": [
        "registrarFalta"
      ]
    }
  ],
  "rules": {
    "carregarAgenda": [],
    "filtrarAgenda": [],
    "carregarMaisAgenda": [],
    "consultarConsultaSelecionada": [],
    "localizarPacientesParaAgendamento": [],
    "carregarMaisPacientesParaAgendamento": [],
    "localizarProfissionaisParaAgendamento": [],
    "carregarMaisProfissionaisParaAgendamento": [],
    "agendarConsulta": [
      "consultaSemConflito"
    ],
    "confirmarConsulta": [
      "transicaoConsultaValida"
    ],
    "registrarFalta": [
      "transicaoConsultaValida"
    ]
  },
  "access": {
    "actors": [
      "recepcionista"
    ],
    "grants": [
      "recepcionistaGerenciarPacientesEconsultas",
      "recepcionistaConsultarProfissionais"
    ]
  }
} as const;
