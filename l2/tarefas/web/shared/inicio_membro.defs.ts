/// <mls fileReference="_102047_/l2/tarefas/web/shared/inicio_membro.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "requests": {
    "qryInicioMembro": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "resumo",
        "avisoHoje",
        "pendencias"
      ]
    },
    "cmdIniciarTarefa": {
      "kind": "cmd",
      "trigger": "iniciarTarefa",
      "returns": [
        "resumo",
        "pendencias"
      ],
      "writes": "Tarefa.iniciar"
    },
    "cmdEnviarParaRevisao": {
      "kind": "cmd",
      "trigger": "enviarParaRevisao",
      "returns": [
        "resumo",
        "pendencias"
      ],
      "writes": "Tarefa.enviarParaRevisao"
    },
    "cmdAceitarEntrega": {
      "kind": "cmd",
      "trigger": "aceitarEntrega",
      "returns": [
        "resumo",
        "pendencias"
      ],
      "writes": "Tarefa.aceitar"
    },
    "cmdDevolverComMotivo": {
      "kind": "cmd",
      "trigger": "devolverComMotivo",
      "returns": [
        "resumo",
        "pendencias"
      ],
      "writes": "Tarefa.devolver"
    }
  },
  "states": {
    "resumo": {
      "source": "qryInicioMembro.resumo",
      "description": "Indicadores já calculados das tarefas abertas do membro e a lista dessas tarefas.",
      "organisms": [
        "resumoMinhasTarefas"
      ]
    },
    "avisoHoje": {
      "source": "qryInicioMembro.avisoHoje",
      "description": "Aviso diário de vencimentos de hoje do membro.",
      "organisms": [
        "alertaAvisoDiario"
      ]
    },
    "pendencias": {
      "source": "qryInicioMembro.pendencias",
      "description": "Tarefa que espera uma ação do membro, com a ação esperada, os nomes do responsável e do criador e a versão para os comandos.",
      "organisms": [
        "caixaPendencias"
      ]
    }
  },
  "journeys": [
    {
      "step": "avisoDiarioVencimentos/abrirAviso",
      "organisms": [
        "alertaAvisoDiario"
      ]
    },
    {
      "step": "avisoDiarioVencimentos/verVencendo",
      "organisms": [
        "alertaAvisoDiario"
      ],
      "continuesIn": "meus_avisos"
    },
    {
      "step": "executarTarefa/abrirMinhaTarefa",
      "organisms": [
        "caixaPendencias",
        "resumoMinhasTarefas"
      ]
    },
    {
      "step": "executarTarefa/verTarefa",
      "organisms": [],
      "continuesIn": "minhas_tarefas"
    },
    {
      "step": "executarTarefa/iniciarTarefa",
      "organisms": [
        "caixaPendencias"
      ]
    },
    {
      "step": "executarTarefa/marcarChecklist",
      "organisms": [],
      "continuesIn": "minhas_tarefas"
    },
    {
      "step": "executarTarefa/enviarRevisao",
      "organisms": [
        "caixaPendencias"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/abrirDevolvida",
      "organisms": [
        "caixaPendencias"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/lerMotivo",
      "organisms": [
        "caixaPendencias"
      ]
    },
    {
      "step": "retomarTarefaDevolvida/ajustarCampos",
      "organisms": [],
      "continuesIn": "minhas_tarefas"
    },
    {
      "step": "retomarTarefaDevolvida/reenviarRevisao",
      "organisms": [
        "caixaPendencias"
      ]
    },
    {
      "step": "revisarTarefa/abrirTarefaRevisao",
      "organisms": [
        "caixaPendencias"
      ]
    },
    {
      "step": "revisarTarefa/conferirEntrega",
      "organisms": [
        "caixaPendencias"
      ],
      "continuesIn": "minhas_tarefas"
    },
    {
      "step": "revisarTarefa/aceitarTarefa",
      "organisms": [
        "caixaPendencias"
      ]
    },
    {
      "step": "revisarTarefa/devolverTarefa",
      "organisms": [
        "caixaPendencias"
      ]
    }
  ],
  "rules": [
    "avisoSomenteTarefasAbertasVencendo",
    "avisoUnicoPorResponsavelEDia",
    "devolucaoExigeMotivo",
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
      "membroAvisosProprios",
      "membroConsultaListas",
      "membroEscolheResponsavel"
    ]
  }
} as const;
