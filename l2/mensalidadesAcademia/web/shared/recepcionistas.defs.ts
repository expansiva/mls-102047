/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/recepcionistas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:recepcionistasLista",
        "persist": true
      },
      "recepcionistaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:recepcionistaFormulario",
        "persist": true
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:recepcionistaFormulario",
        "persist": false
      }
    }
  },
  "forms": {
    "cadastrarRecepcionista": {
      "organism": "recepcionistaFormulario",
      "submit": "cadastrarRecepcionista"
    },
    "atualizarRecepcionista": {
      "organism": "recepcionistaFormulario",
      "submit": "atualizarRecepcionista"
    }
  },
  "requests": {
    "listarRecepcionistas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "recepcionistas"
      ]
    },
    "cadastrarRecepcionista": {
      "kind": "cmd",
      "trigger": "cadastrarRecepcionista",
      "returns": [
        "recepcionista"
      ],
      "writes": "Recepcionista.create"
    },
    "atualizarRecepcionista": {
      "kind": "cmd",
      "trigger": "atualizarRecepcionista",
      "returns": [
        "recepcionista"
      ],
      "writes": "Recepcionista.update"
    }
  },
  "states": {
    "recepcionistas": {
      "source": "listarRecepcionistas.recepcionistas",
      "description": "Registro da recepcionista no formato usado pela lista e pelo formulário.",
      "organisms": [
        "recepcionistaFormulario",
        "recepcionistasLista"
      ]
    },
    "selectedRecepcionista": {
      "source": "entry.params.recepcionistaId",
      "description": "Registro da recepcionista no formato usado pela lista e pelo formulário.",
      "organisms": [
        "recepcionistaFormulario",
        "recepcionistasLista"
      ]
    }
  },
  "functions": {
    "listarRecepcionistas": {
      "description": "Carrega a equipe da recepção da academia já no formato que a lista e o formulário usam, permitindo filtrar pelo nome.",
      "calls": "listarRecepcionistas",
      "sets": "recepcionistas"
    },
    "cadastrarRecepcionista": {
      "description": "Cadastra uma nova recepcionista na equipe da academia. (recepcionistas: upsert)",
      "calls": "cadastrarRecepcionista",
      "updates": [
        "recepcionistas"
      ]
    },
    "atualizarRecepcionista": {
      "description": "Atualiza os dados de uma recepcionista escolhida na lista. (recepcionistas: upsert)",
      "calls": "atualizarRecepcionista",
      "updates": [
        "recepcionistas"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "listarRecepcionistas": [],
    "cadastrarRecepcionista": [],
    "atualizarRecepcionista": []
  },
  "access": {
    "actors": [
      "gerencia"
    ],
    "grants": [
      "gerenciaRecepcionistas"
    ]
  },
  "fields": {
    "Recepcionista.details.base.aliases": [
      "recepcionistaFormulario"
    ],
    "Recepcionista.details.identification.countryCode": [
      "recepcionistaFormulario",
      "recepcionistasLista"
    ],
    "Recepcionista.details.identification.docId": [
      "recepcionistaFormulario",
      "recepcionistasLista"
    ],
    "Recepcionista.details.identification.docType": [
      "recepcionistaFormulario",
      "recepcionistasLista"
    ],
    "Recepcionista.details.identification.name": [
      "recepcionistaFormulario",
      "recepcionistasLista"
    ],
    "Recepcionista.details.identification.status": [
      "recepcionistaFormulario",
      "recepcionistasLista"
    ],
    "Recepcionista.details.person.privacyConsent": [
      "recepcionistaFormulario"
    ]
  }
} as const;
