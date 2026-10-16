/// <mls fileReference="_102047_/l2/tarefas/web/shared/membros_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "busca": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:pessoasEquipe",
        "persist": true,
        "required": false
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:pessoasEquipe",
        "persist": true,
        "required": false
      },
      "membroEquipeId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:cadastroPessoa",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "listarMembrosEquipe": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "membros"
      ]
    },
    "obterMembroEquipe": {
      "kind": "qry",
      "trigger": "obterMembroEquipe",
      "returns": [
        "membro"
      ]
    },
    "cadastrarPessoa": {
      "kind": "cmd",
      "trigger": "cadastrarPessoa",
      "returns": [
        "membro"
      ],
      "writes": "MembroEquipe.create"
    },
    "salvarAlteracoesPessoa": {
      "kind": "cmd",
      "trigger": "salvarAlteracoesPessoa",
      "returns": [
        "membro"
      ],
      "writes": "MembroEquipe.update"
    }
  },
  "states": {
    "membros": {
      "source": "listarMembrosEquipe.membros",
      "description": "Pessoa da equipe como aparece na lista e no cadastro: identificação, situação, país, papéis e contatos.",
      "organisms": [
        "pessoasEquipe"
      ]
    },
    "membro": {
      "source": "obterMembroEquipe.membro",
      "description": "Pessoa da equipe como aparece na lista e no cadastro: identificação, situação, país, papéis e contatos.",
      "organisms": [
        "cadastroPessoa"
      ]
    },
    "selectedMembroEquipe": {
      "source": "entry.params.membroEquipeId",
      "description": "Pessoa da equipe como aparece na lista e no cadastro: identificação, situação, país, papéis e contatos.",
      "organisms": [
        "cadastroPessoa",
        "pessoasEquipe"
      ]
    }
  },
  "journeys": [],
  "rules": [],
  "access": {
    "actors": [
      "gestor"
    ],
    "grants": [
      "gestorMembros"
    ]
  }
} as const;
