/// <mls fileReference="_102047_/l2/tarefas/web/shared/minhas_tarefas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "criadasPorMim": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:tarefasLista",
        "persist": true,
        "required": false
      },
      "atribuidasAMim": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:tarefasLista",
        "persist": true,
        "required": false
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:tarefasLista",
        "persist": true,
        "required": false
      },
      "somenteDevolvidas": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:tarefasLista",
        "persist": true,
        "required": false
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:tarefasLista",
        "persist": true,
        "required": false
      },
      "tarefaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:tarefaDetalhe",
        "persist": true,
        "required": false
      },
      "termo": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:tarefaForm",
        "persist": true,
        "required": true
      },
      "listaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:tarefaForm",
        "persist": false,
        "required": false
      },
      "responsavelId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:tarefaForm",
        "persist": false,
        "required": false
      }
    }
  },
  "requests": {
    "minhasTarefas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "tarefas"
      ]
    },
    "tarefaAberta": {
      "kind": "qry",
      "trigger": "tarefaAberta",
      "returns": [
        "tarefa"
      ]
    },
    "opcoesFormulario": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "listas"
      ]
    },
    "buscarResponsaveis": {
      "kind": "qry",
      "trigger": "buscarResponsaveis",
      "returns": [
        "membros"
      ]
    },
    "salvarNovaTarefa": {
      "kind": "cmd",
      "trigger": "salvarNovaTarefa",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.create"
    },
    "salvarEdicaoTarefa": {
      "kind": "cmd",
      "trigger": "salvarEdicaoTarefa",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.update"
    },
    "iniciarTarefa": {
      "kind": "cmd",
      "trigger": "iniciarTarefa",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.iniciar"
    },
    "marcarItemChecklist": {
      "kind": "cmd",
      "trigger": "marcarItemChecklist",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "ItemChecklist.update"
    },
    "enviarParaRevisao": {
      "kind": "cmd",
      "trigger": "enviarParaRevisao",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.enviarParaRevisao"
    },
    "aceitarEntrega": {
      "kind": "cmd",
      "trigger": "aceitarEntrega",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.aceitar"
    },
    "devolverComMotivo": {
      "kind": "cmd",
      "trigger": "devolverComMotivo",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.devolver"
    },
    "cancelarTarefa": {
      "kind": "cmd",
      "trigger": "cancelarTarefa",
      "returns": [
        "tarefa",
        "resumo"
      ],
      "writes": "Tarefa.cancelar"
    }
  },
  "states": {
    "tarefas": {
      "source": "minhasTarefas.tarefas",
      "description": "Linha da lista de minhas tarefas, usada também para atualizar a linha após um comando.",
      "organisms": [
        "tarefasLista"
      ]
    },
    "tarefa": {
      "source": "tarefaAberta.tarefa",
      "description": "Tarefa aberta com nomes, checklist e marcos do histórico; serve ao detalhe, às ações, ao histórico e ao formulário de edição.",
      "organisms": [
        "tarefaAcoes",
        "tarefaDetalhe",
        "tarefaForm",
        "tarefaHistorico"
      ]
    },
    "listas": {
      "source": "opcoesFormulario.listas",
      "description": "Lista disponível para receber a tarefa no formulário.",
      "organisms": [
        "tarefaForm"
      ]
    },
    "membros": {
      "source": "buscarResponsaveis.membros",
      "description": "Membro ativo que pode ser escolhido como responsável.",
      "organisms": [
        "tarefaForm"
      ]
    },
    "selectedTarefa": {
      "source": "entry.params.tarefaId",
      "description": "Tarefa aberta com nomes, checklist e marcos do histórico; serve ao detalhe, às ações, ao histórico e ao formulário de edição.",
      "organisms": [
        "tarefaDetalhe",
        "tarefasLista"
      ]
    }
  },
  "journeys": [
    {
      "step": "cancelarTarefaCriador/localizarCriada",
      "organisms": [
        "tarefasLista"
      ]
    },
    {
      "step": "cancelarTarefaCriador/cancelarCriada",
      "organisms": [
        "tarefaAcoes"
      ]
    },
    {
      "step": "criarTarefa/localizarLista",
      "organisms": [
        "tarefaForm"
      ]
    },
    {
      "step": "criarTarefa/preencherTarefa",
      "organisms": [
        "tarefaForm"
      ]
    },
    {
      "step": "editarTarefa/localizarTarefa",
      "organisms": [
        "tarefasLista"
      ]
    },
    {
      "step": "editarTarefa/alterarCampos",
      "organisms": [
        "tarefaForm"
      ]
    },
    {
      "step": "editarTarefa/ajustarChecklist",
      "organisms": [
        "tarefaForm",
        "tarefaAcoes"
      ]
    },
    {
      "step": "executarTarefa/abrirMinhaTarefa",
      "organisms": [
        "tarefasLista"
      ]
    },
    {
      "step": "executarTarefa/verTarefa",
      "organisms": [
        "tarefaDetalhe",
        "tarefaHistorico"
      ]
    },
    {
      "step": "executarTarefa/iniciarTarefa",
      "organisms": [
        "tarefaAcoes"
      ]
    },
    {
      "step": "executarTarefa/marcarChecklist",
      "organisms": [
        "tarefaAcoes",
        "tarefaDetalhe"
      ]
    },
    {
      "step": "executarTarefa/enviarRevisao",
      "organisms": [
        "tarefaAcoes"
      ]
    },
    {
      "step": "reatribuirTarefaCriador/localizarParaReatribuir",
      "organisms": [
        "tarefasLista"
      ]
    },
    {
      "step": "reatribuirTarefaCriador/escolherNovoResponsavel",
      "organisms": [
        "tarefaForm"
      ]
    },
    {
      "step": "reatribuirTarefaCriador/trocarResponsavel",
      "organisms": [
        "tarefaForm"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/abrirDevolvida",
      "organisms": [
        "tarefasLista"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/lerMotivo",
      "organisms": [
        "tarefaDetalhe",
        "tarefaHistorico"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/ajustarCampos",
      "organisms": [
        "tarefaForm"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/reenviarRevisao",
      "organisms": [
        "tarefaAcoes"
      ]
    },
    {
      "step": "revisarTarefa/abrirTarefaRevisao",
      "organisms": [
        "tarefasLista"
      ]
    },
    {
      "step": "revisarTarefa/conferirEntrega",
      "organisms": [
        "tarefaDetalhe",
        "tarefaHistorico"
      ]
    },
    {
      "step": "revisarTarefa/aceitarTarefa",
      "organisms": [
        "tarefaAcoes"
      ]
    },
    {
      "step": "revisarTarefa/devolverTarefa",
      "organisms": [
        "tarefaAcoes"
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
