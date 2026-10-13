/// <mls fileReference="_102047_/l2/manutencaoFrota/web/shared/oficinas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:oficinasList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:oficinasList",
        "persist": true
      },
      "id": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:oficinaForm",
        "persist": true
      },
      "oficinaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:oficinaForm",
        "persist": true
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:oficinaForm",
        "persist": false
      }
    }
  },
  "forms": {
    "cadastrarOficina": {
      "organism": "oficinaForm",
      "submit": "cadastrarOficina"
    },
    "atualizarOficina": {
      "organism": "oficinaForm",
      "submit": "atualizarOficina"
    }
  },
  "requests": {
    "listarOficinas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "oficinas"
      ]
    },
    "obterOficina": {
      "kind": "qry",
      "trigger": "obterOficina",
      "returns": [
        "oficina"
      ]
    },
    "cadastrarOficina": {
      "kind": "cmd",
      "trigger": "cadastrarOficina",
      "returns": [
        "oficina"
      ],
      "writes": "Oficina.create"
    },
    "atualizarOficina": {
      "kind": "cmd",
      "trigger": "atualizarOficina",
      "returns": [
        "oficina"
      ],
      "writes": "Oficina.update"
    }
  },
  "states": {
    "oficinas": {
      "source": "listarOficinas.oficinas",
      "description": "Linha da lista de oficinas.",
      "organisms": [
        "oficinasList"
      ]
    },
    "oficina": {
      "source": "obterOficina.oficina",
      "description": "Oficina completa com id e versão, aberta no formulário e devolvida pelos comandos.",
      "organisms": [
        "oficinaForm"
      ]
    },
    "selectedOficina": {
      "source": "entry.params.oficinaId",
      "description": "Oficina completa com id e versão, aberta no formulário e devolvida pelos comandos.",
      "organisms": [
        "oficinaForm",
        "oficinasList"
      ]
    }
  },
  "functions": {
    "listarOficinas": {
      "description": "Lista as oficinas da transportadora para o gestor localizar e escolher qual abrir no formulário; é chamada ao abrir a página e novamente ao buscar ou pedir a próxima página.",
      "calls": "listarOficinas",
      "sets": "oficinas"
    },
    "obterOficina": {
      "description": "Carrega a ficha completa da oficina selecionada na lista para edição no formulário.",
      "calls": "obterOficina",
      "sets": "oficina"
    },
    "cadastrarOficina": {
      "description": "Cadastra uma nova oficina da frota (ou vincula uma empresa já existente com o papel de oficina).",
      "calls": "cadastrarOficina",
      "sets": "oficina",
      "updates": [
        "oficinas"
      ]
    },
    "atualizarOficina": {
      "description": "Corrige os dados de uma oficina existente.",
      "calls": "atualizarOficina",
      "sets": "oficina",
      "updates": [
        "oficinas"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "listarOficinas": [],
    "obterOficina": [],
    "cadastrarOficina": [],
    "atualizarOficina": []
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
    "Oficina.details.base.addresses": [
      "oficinaForm"
    ],
    "Oficina.details.base.aliases": [
      "oficinaForm"
    ],
    "Oficina.details.base.contacts": [
      "oficinaForm"
    ],
    "Oficina.details.base.notes": [
      "oficinaForm"
    ],
    "Oficina.details.company.companyKind": [
      "oficinaForm"
    ],
    "Oficina.details.company.legalName": [
      "oficinaForm",
      "oficinasList"
    ],
    "Oficina.details.company.tradeName": [
      "oficinaForm",
      "oficinasList"
    ],
    "Oficina.details.identification.countryCode": [
      "oficinaForm"
    ],
    "Oficina.details.identification.docId": [
      "oficinaForm",
      "oficinasList"
    ],
    "Oficina.details.identification.docType": [
      "oficinaForm",
      "oficinasList"
    ],
    "Oficina.details.identification.name": [
      "oficinaForm",
      "oficinasList"
    ],
    "Oficina.details.identification.status": [
      "oficinaForm",
      "oficinasList"
    ],
    "Oficina.id": [
      "oficinaForm",
      "oficinasList"
    ],
    "Oficina.version": [
      "oficinaForm"
    ]
  }
} as const;
