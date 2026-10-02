/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/meu_cadastro_recepcao.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:ownReceptionistForm",
        "persist": false
      }
    }
  },
  "forms": {
    "createOwnReceptionist": {
      "organism": "ownReceptionistForm",
      "submit": "createOwnReceptionist"
    },
    "updateOwnReceptionist": {
      "organism": "ownReceptionistForm",
      "submit": "updateOwnReceptionist"
    }
  },
  "requests": {
    "load": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "recepcionista"
      ]
    },
    "createOwnReceptionist": {
      "kind": "cmd",
      "trigger": "createOwnReceptionist",
      "returns": [
        "recepcionista"
      ],
      "writes": "Recepcionista.create"
    },
    "updateOwnReceptionist": {
      "kind": "cmd",
      "trigger": "updateOwnReceptionist",
      "returns": [
        "recepcionista"
      ],
      "writes": "Recepcionista.update"
    }
  },
  "states": {
    "recepcionista": {
      "source": "load.recepcionista",
      "description": "Recepcionista exibida e editada no cadastro."
    },
    "docId": {
      "source": "entry.params.docId",
      "description": "Documento usado para preencher o cadastro."
    }
  },
  "functions": {
    "load": {
      "description": "Carrega o cadastro da recepcionista.",
      "calls": "load",
      "sets": "recepcionista"
    },
    "createOwnReceptionist": {
      "description": "Cria o cadastro da recepcionista.",
      "calls": "createOwnReceptionist",
      "sets": "recepcionista",
      "updates": [
        "recepcionista"
      ]
    },
    "updateOwnReceptionist": {
      "description": "Atualiza o cadastro da recepcionista.",
      "calls": "updateOwnReceptionist",
      "sets": "recepcionista",
      "updates": [
        "recepcionista"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "load": [],
    "createOwnReceptionist": [],
    "updateOwnReceptionist": []
  },
  "access": {
    "actors": [
      "recepcionista"
    ],
    "grants": [
      "consultarProprioCadastroRecepcao"
    ]
  }
} as const;
