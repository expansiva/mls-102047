/// <mls fileReference="_102047_/l2/tarefas/web/shared/minhas_tarefas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "filtro": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaTarefas",
        "persist": true,
        "required": false
      },
      "tarefaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalheTarefa",
        "persist": true,
        "required": false
      },
      "listaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:formTarefa",
        "persist": false,
        "required": false
      },
      "responsavelId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:formTarefa",
        "persist": false,
        "required": false
      }
    }
  },
  "requests": {
    "carregarMinhasTarefas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "tarefas",
        "listas"
      ]
    },
    "listarMinhasTarefas": {
      "kind": "qry",
      "trigger": "listarMinhasTarefas",
      "returns": [
        "tarefas"
      ]
    },
    "abrirTarefa": {
      "kind": "qry",
      "trigger": "abrirTarefa",
      "returns": [
        "tarefa"
      ]
    },
    "buscarMembros": {
      "kind": "qry",
      "trigger": "buscarMembros",
      "returns": [
        "membros"
      ]
    },
    "criarTarefa": {
      "kind": "cmd",
      "trigger": "criarTarefa",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.create"
    },
    "salvarEdicao": {
      "kind": "cmd",
      "trigger": "salvarEdicao",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.update"
    },
    "salvarChecklist": {
      "kind": "cmd",
      "trigger": "salvarChecklist",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "ItemChecklist.update"
    },
    "iniciarTarefa": {
      "kind": "cmd",
      "trigger": "iniciar",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.iniciar"
    },
    "enviarParaRevisao": {
      "kind": "cmd",
      "trigger": "enviarRevisao",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.enviarParaRevisao"
    },
    "aceitarTarefa": {
      "kind": "cmd",
      "trigger": "aceitar",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.aceitar"
    },
    "devolverTarefa": {
      "kind": "cmd",
      "trigger": "devolver",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.devolver"
    },
    "cancelarTarefa": {
      "kind": "cmd",
      "trigger": "cancelar",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.cancelar"
    }
  },
  "states": {
    "tarefas": {
      "source": "carregarMinhasTarefas.tarefas",
      "description": "the list of Tarefa em forma resumida: título, lista, responsável, criador, prioridade, prazo, situação e indicadores.",
      "organisms": [
        "listaTarefas"
      ]
    },
    "tarefa": {
      "source": "abrirTarefa.tarefa",
      "description": "Tarefa completa com lista, criador, responsável, datas do ciclo, motivo da devolução e itens da checklist em ordem.",
      "organisms": [
        "acoesTarefa",
        "detalheTarefa",
        "formTarefa",
        "historicoTarefa"
      ]
    },
    "listas": {
      "source": "carregarMinhasTarefas.listas",
      "description": "the list of Lista que pode receber tarefas, com nome, tipo e indicação de ativa.",
      "organisms": [
        "formTarefa"
      ]
    },
    "membros": {
      "source": "buscarMembros.membros",
      "description": "the list of Membro da equipe com id e nome.",
      "organisms": [
        "formTarefa"
      ]
    },
    "selectedTarefa": {
      "source": "entry.params.tarefaId",
      "description": "the id of the Tarefa selected in listaTarefas",
      "organisms": [
        "detalheTarefa",
        "listaTarefas"
      ]
    }
  },
  "journeys": [
    {
      "step": "cancelarTarefaCriador/localizarCriada",
      "organisms": [
        "listaTarefas",
        "detalheTarefa"
      ]
    },
    {
      "step": "cancelarTarefaCriador/cancelarCriada",
      "organisms": [
        "acoesTarefa"
      ]
    },
    {
      "step": "criarTarefa/localizarLista",
      "organisms": [
        "formTarefa"
      ]
    },
    {
      "step": "criarTarefa/preencherTarefa",
      "organisms": [
        "formTarefa"
      ]
    },
    {
      "step": "editarTarefa/localizarTarefa",
      "organisms": [
        "listaTarefas",
        "detalheTarefa"
      ]
    },
    {
      "step": "editarTarefa/alterarCampos",
      "organisms": [
        "formTarefa"
      ]
    },
    {
      "step": "editarTarefa/ajustarChecklist",
      "organisms": [
        "formTarefa"
      ]
    },
    {
      "step": "executarTarefa/abrirMinhaTarefa",
      "organisms": [
        "listaTarefas",
        "detalheTarefa"
      ]
    },
    {
      "step": "executarTarefa/verTarefa",
      "organisms": [
        "detalheTarefa",
        "historicoTarefa"
      ]
    },
    {
      "step": "executarTarefa/iniciarTarefa",
      "organisms": [
        "acoesTarefa"
      ]
    },
    {
      "step": "executarTarefa/marcarChecklist",
      "organisms": [
        "formTarefa"
      ]
    },
    {
      "step": "executarTarefa/enviarRevisao",
      "organisms": [
        "acoesTarefa"
      ]
    },
    {
      "step": "reatribuirTarefaCriador/localizarParaReatribuir",
      "organisms": [
        "listaTarefas",
        "detalheTarefa"
      ]
    },
    {
      "step": "reatribuirTarefaCriador/escolherNovoResponsavel",
      "organisms": [
        "formTarefa"
      ]
    },
    {
      "step": "reatribuirTarefaCriador/trocarResponsavel",
      "organisms": [
        "formTarefa"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/abrirDevolvida",
      "organisms": [
        "listaTarefas",
        "detalheTarefa"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/lerMotivo",
      "organisms": [
        "detalheTarefa",
        "historicoTarefa"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/ajustarCampos",
      "organisms": [
        "formTarefa"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/reenviarRevisao",
      "organisms": [
        "acoesTarefa"
      ]
    },
    {
      "step": "revisarTarefa/abrirTarefaRevisao",
      "organisms": [
        "listaTarefas",
        "detalheTarefa"
      ]
    },
    {
      "step": "revisarTarefa/conferirEntrega",
      "organisms": [
        "detalheTarefa",
        "historicoTarefa"
      ]
    },
    {
      "step": "revisarTarefa/aceitarTarefa",
      "organisms": [
        "acoesTarefa"
      ]
    },
    {
      "step": "revisarTarefa/devolverTarefa",
      "organisms": [
        "acoesTarefa"
      ]
    }
  ],
  "rules": [
    "cancelamentoPorCriadorOuGestor",
    "checklistNaoMudaSituacao",
    "criacaoIdempotente",
    "devolucaoExigeMotivo",
    "edicaoNaoMudaSituacao",
    "editarSomenteTarefaVisivel",
    "listaInativaNaoRecebeTarefa",
    "reatribuicaoPorCriadorOuGestor",
    "responsavelDeveSerMembroAtivo",
    "somenteCriadorRevisa",
    "somenteResponsavelExecuta",
    "tarefaEncerradaNaoTransiciona"
  ],
  "access": {
    "actors": [
      "membroEquipe"
    ],
    "grants": [
      "membroTarefasProprias",
      "membroConsultaListas",
      "membroEscolheResponsavel"
    ]
  }
} as const;
