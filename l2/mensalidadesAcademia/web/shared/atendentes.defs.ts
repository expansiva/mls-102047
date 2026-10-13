/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/atendentes.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:equipeRecepcao",
        "persist": true
      },
      "recepcaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:cadastroAtendente",
        "persist": true
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:cadastroAtendente",
        "persist": false
      }
    }
  },
  "forms": {
    "cadastrarAtendente": {
      "organism": "cadastroAtendente",
      "submit": "cadastrarAtendente"
    },
    "salvarAtendente": {
      "organism": "cadastroAtendente",
      "submit": "salvarAtendente"
    }
  },
  "requests": {
    "listarEquipeRecepcao": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "atendentes"
      ]
    },
    "obterAtendente": {
      "kind": "qry",
      "trigger": "obterAtendente",
      "returns": [
        "atendente"
      ]
    },
    "cadastrarAtendente": {
      "kind": "cmd",
      "trigger": "cadastrarAtendente",
      "returns": [
        "atendente"
      ],
      "writes": "Recepcao.create"
    },
    "salvarAtendente": {
      "kind": "cmd",
      "trigger": "salvarAtendente",
      "returns": [
        "atendente"
      ],
      "writes": "Recepcao.update"
    }
  },
  "states": {
    "atendentes": {
      "source": "listarEquipeRecepcao.atendentes",
      "description": "Linha da lista da equipe da recepção.",
      "organisms": [
        "equipeRecepcao"
      ]
    },
    "atendente": {
      "source": "obterAtendente.atendente",
      "description": "Cadastro completo do atendente aberto no formulário.",
      "organisms": [
        "cadastroAtendente"
      ]
    },
    "selectedRecepcao": {
      "source": "entry.params.recepcaoId",
      "description": "Cadastro completo do atendente aberto no formulário.",
      "organisms": [
        "cadastroAtendente",
        "equipeRecepcao"
      ]
    }
  },
  "functions": {
    "listarEquipeRecepcao": {
      "description": "Carrega, ao abrir a página, a equipe da recepção da academia para a gerência revisar.",
      "calls": "listarEquipeRecepcao",
      "sets": "atendentes"
    },
    "obterAtendente": {
      "description": "Abre no formulário o cadastro completo do atendente escolhido na lista.",
      "calls": "obterAtendente",
      "sets": "atendente"
    },
    "cadastrarAtendente": {
      "description": "Inclui um novo atendente na equipe da recepção sem duplicar pessoas. (atendentes: upsert)",
      "calls": "cadastrarAtendente",
      "sets": "atendente",
      "updates": [
        "atendentes"
      ]
    },
    "salvarAtendente": {
      "description": "Atualiza o cadastro de um atendente que já está na equipe. (atendentes: upsert)",
      "calls": "salvarAtendente",
      "sets": "atendente",
      "updates": [
        "atendentes"
      ]
    }
  },
  "journeys": [],
  "rules": {
    "listarEquipeRecepcao": [],
    "obterAtendente": [],
    "cadastrarAtendente": [],
    "salvarAtendente": []
  },
  "access": {
    "actors": [
      "gerencia"
    ],
    "grants": [
      "gerenciaAtendentes"
    ]
  },
  "fields": {
    "Recepcao.details.base.aliases": [
      "cadastroAtendente",
      "equipeRecepcao"
    ],
    "Recepcao.details.base.contacts": [
      "cadastroAtendente"
    ],
    "Recepcao.details.identification.countryCode": [
      "cadastroAtendente"
    ],
    "Recepcao.details.identification.docId": [
      "cadastroAtendente",
      "equipeRecepcao"
    ],
    "Recepcao.details.identification.docType": [
      "cadastroAtendente",
      "equipeRecepcao"
    ],
    "Recepcao.details.identification.name": [
      "cadastroAtendente",
      "equipeRecepcao"
    ],
    "Recepcao.details.identification.status": [
      "cadastroAtendente",
      "equipeRecepcao"
    ],
    "Recepcao.details.person.privacyConsent": [
      "cadastroAtendente"
    ]
  }
} as const;
