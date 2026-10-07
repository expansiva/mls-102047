/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/profissionais.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:professionalList",
        "persist": true
      },
      "search": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:professionalList",
        "persist": true
      },
      "id": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:professionalDetail",
        "persist": true
      },
      "profissionalId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:professionalDetail",
        "persist": true
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:professionalForm",
        "persist": false
      }
    }
  },
  "forms": {
    "createProfessional": {
      "organism": "professionalForm",
      "submit": "createProfessional"
    },
    "updateProfessional": {
      "organism": "professionalForm",
      "submit": "updateProfessional"
    }
  },
  "requests": {
    "loadAvailableProfessionals": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "professionals"
      ]
    },
    "loadMoreAvailableProfessionals": {
      "kind": "qry",
      "trigger": "loadMoreAvailableProfessionals",
      "returns": [
        "professionals"
      ]
    },
    "searchAvailableProfessionals": {
      "kind": "qry",
      "trigger": "searchAvailableProfessionals",
      "returns": [
        "professionals"
      ]
    },
    "loadMoreProfessionalSearch": {
      "kind": "qry",
      "trigger": "loadMoreProfessionalSearch",
      "returns": [
        "professionals"
      ]
    },
    "getProfessional": {
      "kind": "qry",
      "trigger": "getProfessional",
      "returns": [
        "professional"
      ]
    },
    "createProfessional": {
      "kind": "cmd",
      "trigger": "createProfessional",
      "returns": [
        "professional"
      ],
      "writes": "Profissional.create"
    },
    "updateProfessional": {
      "kind": "cmd",
      "trigger": "updateProfessional",
      "returns": [
        "professional"
      ],
      "writes": "Profissional.update"
    }
  },
  "states": {
    "professionals": {
      "source": "loadAvailableProfessionals.professionals",
      "description": "Linha paginada do diretório de profissionais disponíveis.",
      "organisms": [
        "professionalList"
      ]
    },
    "professional": {
      "source": "getProfessional.professional",
      "description": "Cadastro completo do profissional selecionado ou recém-gravado.",
      "organisms": [
        "professionalDetail",
        "professionalForm"
      ]
    },
    "selectedProfissional": {
      "source": "entry.params.profissionalId",
      "description": "Cadastro completo do profissional selecionado ou recém-gravado.",
      "organisms": [
        "professionalDetail",
        "professionalList"
      ]
    }
  },
  "functions": {
    "loadAvailableProfessionals": {
      "description": "Carrega a primeira página do diretório de profissionais disponíveis quando a página é aberta.",
      "calls": "loadAvailableProfessionals",
      "sets": "professionals"
    },
    "loadMoreAvailableProfessionals": {
      "description": "Obtém a próxima página do diretório de profissionais disponíveis quando a recepcionista solicita mais resultados. (professionals.items: append)",
      "calls": "loadMoreAvailableProfessionals",
      "updates": [
        "professionals"
      ]
    },
    "searchAvailableProfessionals": {
      "description": "Localiza, sob demanda, profissionais disponíveis pelo nome para a recepcionista escolher o cadastro certo.",
      "calls": "searchAvailableProfessionals",
      "sets": "professionals"
    },
    "loadMoreProfessionalSearch": {
      "description": "Busca a próxima página da localização por nome sem reiniciar os resultados já exibidos. (professionals.items: append)",
      "calls": "loadMoreProfessionalSearch",
      "updates": [
        "professionals"
      ]
    },
    "getProfessional": {
      "description": "Carrega o cadastro completo do profissional que a recepcionista selecionou para conferência e edição.",
      "calls": "getProfessional",
      "sets": "professional"
    },
    "createProfessional": {
      "description": "Cria ou reutiliza e vincula o cadastro mestre de uma pessoa como profissional da agenda clínica. (professionals.items: upsert)",
      "calls": "createProfessional",
      "sets": "professional",
      "updates": [
        "professionals"
      ]
    },
    "updateProfessional": {
      "description": "Atualiza os dados de identificação permitidos e o tipo de atuação do profissional selecionado. (professionals.items: upsert)",
      "calls": "updateProfessional",
      "sets": "professional",
      "updates": [
        "professionals"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "loadAvailableProfessionals": [],
    "loadMoreAvailableProfessionals": [],
    "searchAvailableProfessionals": [],
    "loadMoreProfessionalSearch": [],
    "getProfessional": [],
    "createProfessional": [],
    "updateProfessional": []
  },
  "access": {
    "actors": [
      "recepcionista"
    ],
    "grants": [
      "recepcionistaConsultarProfissionais"
    ]
  }
} as const;
