/// <mls fileReference="_102047_/l2/manutencaoFrota/web/shared/motoristas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "search": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:motoristasList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:motoristasList",
        "persist": true
      },
      "motoristaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:motoristaForm",
        "persist": true
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:motoristaForm",
        "persist": false
      }
    }
  },
  "forms": {
    "cadastrarMotorista": {
      "organism": "motoristaForm",
      "submit": "cadastrarMotorista"
    },
    "atualizarMotorista": {
      "organism": "motoristaForm",
      "submit": "atualizarMotorista"
    }
  },
  "requests": {
    "listarMotoristas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "motoristas"
      ]
    },
    "obterMotorista": {
      "kind": "qry",
      "trigger": "obterMotorista",
      "returns": [
        "motorista"
      ]
    },
    "cadastrarMotorista": {
      "kind": "cmd",
      "trigger": "cadastrarMotorista",
      "returns": [
        "motorista"
      ],
      "writes": "Motorista.create"
    },
    "atualizarMotorista": {
      "kind": "cmd",
      "trigger": "atualizarMotorista",
      "returns": [
        "motorista"
      ],
      "writes": "Motorista.update"
    }
  },
  "states": {
    "motoristas": {
      "source": "listarMotoristas.motoristas",
      "description": "Linha da lista de motoristas: nome, CPF, situação e última atualização.",
      "organisms": [
        "motoristasList"
      ]
    },
    "motorista": {
      "source": "obterMotorista.motorista",
      "description": "Motorista completo para o formulário de cadastro/atualização, com versão para concorrência otimista.",
      "organisms": [
        "motoristaForm"
      ]
    },
    "selectedMotorista": {
      "source": "entry.params.motoristaId",
      "description": "Motorista completo para o formulário de cadastro/atualização, com versão para concorrência otimista.",
      "organisms": [
        "motoristaForm",
        "motoristasList"
      ]
    }
  },
  "functions": {
    "listarMotoristas": {
      "description": "Carrega, ao abrir a página, os motoristas da transportadora com nome, CPF e situação do cadastro, para o gestor localizar quem precisa ser atualizado. (motoristas.items: append)",
      "calls": "listarMotoristas",
      "sets": "motoristas"
    },
    "obterMotorista": {
      "description": "Carrega os dados do motorista escolhido na lista para preencher o formulário de atualização.",
      "calls": "obterMotorista",
      "sets": "motorista"
    },
    "cadastrarMotorista": {
      "description": "Cadastra um novo motorista ou, se a pessoa já existe pelo CPF, anexa o papel de motorista ao registro existente.",
      "calls": "cadastrarMotorista",
      "sets": "motorista",
      "updates": [
        "motoristas"
      ]
    },
    "atualizarMotorista": {
      "description": "Corrige os dados do motorista escolhido: nome, CPF, país, data de nascimento e apelidos.",
      "calls": "atualizarMotorista",
      "sets": "motorista",
      "updates": [
        "motoristas"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "listarMotoristas": [],
    "obterMotorista": [],
    "cadastrarMotorista": [],
    "atualizarMotorista": []
  },
  "access": {
    "actors": [
      "gestor"
    ],
    "grants": [
      "gestorCadastrosMestres"
    ]
  },
  "fields": {
    "Motorista.details.base.aliases": [
      "motoristaForm"
    ],
    "Motorista.details.identification.countryCode": [
      "motoristaForm"
    ],
    "Motorista.details.identification.docId": [
      "motoristaForm",
      "motoristasList"
    ],
    "Motorista.details.identification.docType": [
      "motoristaForm"
    ],
    "Motorista.details.identification.name": [
      "motoristaForm",
      "motoristasList"
    ],
    "Motorista.details.identification.status": [
      "motoristaForm",
      "motoristasList"
    ],
    "Motorista.details.identification.updatedAt": [
      "motoristasList"
    ],
    "Motorista.details.person.birthDate": [
      "motoristaForm"
    ],
    "Motorista.id": [
      "motoristaForm",
      "motoristasList"
    ],
    "Motorista.version": [
      "motoristaForm"
    ]
  }
} as const;
