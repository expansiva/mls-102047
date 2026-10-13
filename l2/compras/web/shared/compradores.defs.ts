/// <mls fileReference="_102047_/l2/compras/web/shared/compradores.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:compradoresList",
        "persist": true
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:compradoresList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:compradoresList",
        "persist": true
      },
      "compradorId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:compradorForm",
        "persist": true
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:compradorForm",
        "persist": false
      }
    }
  },
  "forms": {
    "cadastrarComprador": {
      "organism": "compradorForm",
      "submit": "cadastrarComprador"
    },
    "salvarAlteracaoComprador": {
      "organism": "compradorForm",
      "submit": "salvarAlteracaoComprador"
    }
  },
  "requests": {
    "listarCompradores": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "compradores"
      ]
    },
    "obterComprador": {
      "kind": "qry",
      "trigger": "obterComprador",
      "returns": [
        "comprador"
      ]
    },
    "cadastrarComprador": {
      "kind": "cmd",
      "trigger": "cadastrarComprador",
      "returns": [
        "comprador"
      ],
      "writes": "Comprador.create"
    },
    "salvarAlteracaoComprador": {
      "kind": "cmd",
      "trigger": "salvarAlteracaoComprador",
      "returns": [
        "comprador"
      ],
      "writes": "Comprador.update"
    }
  },
  "states": {
    "compradores": {
      "source": "listarCompradores.compradores",
      "description": "Linha da lista de compradores.",
      "organisms": [
        "compradoresList"
      ]
    },
    "comprador": {
      "source": "obterComprador.comprador",
      "description": "Comprador completo para edição no formulário, com versão para concorrência otimista.",
      "organisms": [
        "compradorForm"
      ]
    },
    "selectedComprador": {
      "source": "entry.params.compradorId",
      "description": "Comprador completo para edição no formulário, com versão para concorrência otimista.",
      "organisms": [
        "compradorForm",
        "compradoresList"
      ]
    }
  },
  "functions": {
    "listarCompradores": {
      "description": "Lista os compradores da organização para o gerente de compras localizar quem está ativo e escolher quem alterar.",
      "calls": "listarCompradores",
      "sets": "compradores"
    },
    "obterComprador": {
      "description": "Carrega os dados do comprador escolhido na lista para alteração no formulário.",
      "calls": "obterComprador",
      "sets": "comprador"
    },
    "cadastrarComprador": {
      "description": "Cadastra um novo comprador na organização. (compradores.items: upsert)",
      "calls": "cadastrarComprador",
      "sets": "comprador",
      "updates": [
        "compradores"
      ]
    },
    "salvarAlteracaoComprador": {
      "description": "Salva as alterações de nome, documento, país e consentimento do comprador escolhido. (compradores.items: upsert)",
      "calls": "salvarAlteracaoComprador",
      "sets": "comprador",
      "updates": [
        "compradores"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "listarCompradores": [],
    "obterComprador": [],
    "cadastrarComprador": [],
    "salvarAlteracaoComprador": []
  },
  "access": {
    "actors": [
      "gerenteCompras"
    ],
    "grants": [
      "gerenteCadastros"
    ]
  },
  "fields": {
    "Comprador.details.identification.countryCode": [
      "compradorForm",
      "compradoresList"
    ],
    "Comprador.details.identification.docId": [
      "compradorForm",
      "compradoresList"
    ],
    "Comprador.details.identification.docType": [
      "compradorForm",
      "compradoresList"
    ],
    "Comprador.details.identification.name": [
      "compradorForm",
      "compradoresList"
    ],
    "Comprador.details.identification.status": [
      "compradorForm",
      "compradoresList"
    ],
    "Comprador.details.person.privacyConsent": [
      "compradorForm"
    ],
    "Comprador.id": [
      "compradorForm",
      "compradoresList"
    ],
    "Comprador.version": [
      "compradorForm"
    ]
  }
} as const;
