/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/persistence/seeds.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "persistenceSeeds",
  "artifactId": "seeds",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/adapters/persistence/avisoVencimento.defs.ts",
    "_102047_/l1/tarefas/layer_1_external/adapters/persistence/itemChecklist.defs.ts",
    "_102047_/l1/tarefas/layer_1_external/adapters/persistence/lista.defs.ts",
    "_102047_/l1/tarefas/layer_1_external/adapters/persistence/tarefa.defs.ts"
  ],
  "data": {
    "seedId": "seeds",
    "phase": "plan",
    "scenarios": [
      {
        "scenarioId": "model_avisoVencimento",
        "tableId": "avisoVencimento",
        "source": "model:AvisoVencimento",
        "constraints": [
          "ref:responsavelId:MembroEquipe",
          "state:completed",
          "state:failed",
          "state:pending",
          "uniqueKeys:responsavelId+dataReferencia"
        ],
        "refs": [
          {
            "field": "responsavelId",
            "relationshipId": "avisoResponsavel",
            "entityId": "MembroEquipe"
          }
        ],
        "states": [
          "pending",
          "completed",
          "failed"
        ],
        "entityId": "AvisoVencimento",
        "stateField": "status"
      },
      {
        "scenarioId": "editarTarefa",
        "tableId": "itemChecklist",
        "source": "journey:editarTarefa",
        "constraints": [
          "ref:tarefaId:Tarefa"
        ],
        "refs": [
          {
            "field": "tarefaId",
            "relationshipId": "itemChecklistTarefa",
            "entityId": "Tarefa"
          }
        ],
        "states": [],
        "entityId": "ItemChecklist"
      },
      {
        "scenarioId": "executarTarefa",
        "tableId": "itemChecklist",
        "source": "journey:executarTarefa",
        "constraints": [
          "ref:tarefaId:Tarefa"
        ],
        "refs": [
          {
            "field": "tarefaId",
            "relationshipId": "itemChecklistTarefa",
            "entityId": "Tarefa"
          }
        ],
        "states": [],
        "entityId": "ItemChecklist"
      },
      {
        "scenarioId": "criarTarefa",
        "tableId": "lista",
        "source": "journey:criarTarefa",
        "constraints": [
          "uniqueKeys:nome"
        ],
        "refs": [],
        "states": [],
        "entityId": "Lista"
      },
      {
        "scenarioId": "manterListas",
        "tableId": "lista",
        "source": "journey:manterListas",
        "constraints": [
          "uniqueKeys:nome"
        ],
        "refs": [],
        "states": [],
        "entityId": "Lista"
      },
      {
        "scenarioId": "acompanharTarefasEquipe",
        "tableId": "tarefa",
        "source": "journey:acompanharTarefasEquipe",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "avisoDiarioVencimentos",
        "tableId": "tarefa",
        "source": "journey:avisoDiarioVencimentos",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "cancelarTarefaCriador",
        "tableId": "tarefa",
        "source": "journey:cancelarTarefaCriador",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "state:cancelada",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [
          "cancelada"
        ],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "cancelarTarefaGestor",
        "tableId": "tarefa",
        "source": "journey:cancelarTarefaGestor",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "state:cancelada",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [
          "cancelada"
        ],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "criarTarefa",
        "tableId": "tarefa",
        "source": "journey:criarTarefa",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "state:aFazer",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [
          "aFazer"
        ],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "editarTarefa",
        "tableId": "tarefa",
        "source": "journey:editarTarefa",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "executarTarefa",
        "tableId": "tarefa",
        "source": "journey:executarTarefa",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "state:emAndamento",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [
          "emAndamento"
        ],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "reatribuirTarefaCriador",
        "tableId": "tarefa",
        "source": "journey:reatribuirTarefaCriador",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "reatribuirTarefaGestor",
        "tableId": "tarefa",
        "source": "journey:reatribuirTarefaGestor",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "retomarTarefaDevolvida",
        "tableId": "tarefa",
        "source": "journey:retomarTarefaDevolvida",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [],
        "entityId": "Tarefa",
        "stateField": "status"
      },
      {
        "scenarioId": "revisarTarefa",
        "tableId": "tarefa",
        "source": "journey:revisarTarefa",
        "constraints": [
          "ref:criadorId:MembroEquipe",
          "ref:listaId:Lista",
          "ref:responsavelId:MembroEquipe",
          "ref:tarefaPaiId:Tarefa",
          "state:concluida",
          "uniqueKeys:chaveCriacao"
        ],
        "refs": [
          {
            "field": "criadorId",
            "relationshipId": "tarefaCriador",
            "entityId": "MembroEquipe"
          },
          {
            "field": "listaId",
            "relationshipId": "tarefaLista",
            "entityId": "Lista"
          },
          {
            "field": "responsavelId",
            "relationshipId": "tarefaResponsavel",
            "entityId": "MembroEquipe"
          },
          {
            "field": "tarefaPaiId",
            "relationshipId": "tarefaPai",
            "entityId": "Tarefa"
          }
        ],
        "states": [
          "concluida"
        ],
        "entityId": "Tarefa",
        "stateField": "status"
      }
    ],
    "dependencies": [
      {
        "entityId": "AvisoVencimento",
        "kind": "module",
        "seeded": false
      },
      {
        "entityId": "ItemChecklist",
        "kind": "module",
        "seeded": false
      },
      {
        "entityId": "Lista",
        "kind": "module",
        "seeded": false
      },
      {
        "entityId": "MembroEquipe",
        "kind": "mdm",
        "seeded": false
      },
      {
        "entityId": "Tarefa",
        "kind": "module",
        "seeded": false
      }
    ],
    "datasets": [
      {
        "datasetId": "avisoVencimento",
        "tableId": "avisoVencimento",
        "owners": [
          "model_avisoVencimento"
        ]
      },
      {
        "datasetId": "itemChecklist",
        "tableId": "itemChecklist",
        "owners": [
          "editarTarefa",
          "executarTarefa"
        ]
      },
      {
        "datasetId": "lista",
        "tableId": "lista",
        "owners": [
          "criarTarefa",
          "manterListas"
        ]
      },
      {
        "datasetId": "tarefa",
        "tableId": "tarefa",
        "owners": [
          "acompanharTarefasEquipe",
          "avisoDiarioVencimentos",
          "cancelarTarefaCriador",
          "cancelarTarefaGestor",
          "criarTarefa",
          "editarTarefa",
          "executarTarefa",
          "reatribuirTarefaCriador",
          "reatribuirTarefaGestor",
          "retomarTarefaDevolvida",
          "revisarTarefa"
        ]
      }
    ],
    "fixture": {
      "schemaVersion": "2026-09-27-m1-certification-fixture-v1",
      "phase": "plan",
      "targets": [
        "memory",
        "development"
      ],
      "datasets": [
        {
          "supportId": "data:AvisoVencimento",
          "entityId": "AvisoVencimento",
          "tableId": "avisoVencimento",
          "dependsOn": [],
          "sourceRefs": [
            "grant:gestorAvisosProprios",
            "grant:membroAvisosProprios",
            "journey:acompanharTarefasEquipe/filtrarTarefas",
            "journey:acompanharTarefasEquipe/verDetalhe",
            "journey:acompanharTarefasEquipe/verQuadro",
            "journey:avisoDiarioVencimentos/abrirAviso",
            "journey:avisoDiarioVencimentos/verVencendo",
            "journey:cancelarTarefaCriador/cancelarCriada",
            "journey:cancelarTarefaCriador/localizarCriada",
            "journey:cancelarTarefaGestor/cancelarPeloGestor",
            "journey:cancelarTarefaGestor/localizarParaCancelar",
            "journey:criarTarefa/localizarLista",
            "journey:criarTarefa/preencherTarefa",
            "journey:editarTarefa/ajustarChecklist",
            "journey:editarTarefa/alterarCampos",
            "journey:editarTarefa/localizarTarefa",
            "journey:executarTarefa/abrirMinhaTarefa",
            "journey:executarTarefa/enviarRevisao",
            "journey:executarTarefa/iniciarTarefa",
            "journey:executarTarefa/marcarChecklist",
            "journey:executarTarefa/verTarefa",
            "journey:reatribuirTarefaCriador/escolherNovoResponsavel",
            "journey:reatribuirTarefaCriador/localizarParaReatribuir",
            "journey:reatribuirTarefaCriador/trocarResponsavel",
            "journey:reatribuirTarefaGestor/escolherResponsavelEquipe",
            "journey:reatribuirTarefaGestor/localizarTarefaEquipe",
            "journey:reatribuirTarefaGestor/reatribuir",
            "journey:retomarTarefaDevolvida/abrirDevolvida",
            "journey:retomarTarefaDevolvida/ajustarCampos",
            "journey:retomarTarefaDevolvida/lerMotivo",
            "journey:retomarTarefaDevolvida/reenviarRevisao",
            "journey:revisarTarefa/abrirTarefaRevisao",
            "journey:revisarTarefa/aceitarTarefa",
            "journey:revisarTarefa/conferirEntrega",
            "journey:revisarTarefa/devolverTarefa",
            "process:avisoDiario",
            "relationship:AvisoVencimento/avisoResponsavel",
            "relationship:MembroEquipe/avisoResponsavel",
            "relationship:MembroEquipe/tarefaResponsavel"
          ]
        },
        {
          "supportId": "data:ItemChecklist",
          "entityId": "ItemChecklist",
          "tableId": "itemChecklist",
          "dependsOn": [
            "Tarefa"
          ],
          "sourceRefs": [
            "grant:gestorTarefasEquipe",
            "grant:membroTarefasProprias",
            "journey:acompanharTarefasEquipe/filtrarTarefas",
            "journey:acompanharTarefasEquipe/verDetalhe",
            "journey:acompanharTarefasEquipe/verQuadro",
            "journey:avisoDiarioVencimentos/abrirAviso",
            "journey:avisoDiarioVencimentos/verVencendo",
            "journey:cancelarTarefaCriador/cancelarCriada",
            "journey:cancelarTarefaCriador/localizarCriada",
            "journey:cancelarTarefaGestor/cancelarPeloGestor",
            "journey:cancelarTarefaGestor/localizarParaCancelar",
            "journey:criarTarefa/localizarLista",
            "journey:criarTarefa/preencherTarefa",
            "journey:editarTarefa/ajustarChecklist",
            "journey:editarTarefa/alterarCampos",
            "journey:editarTarefa/localizarTarefa",
            "journey:executarTarefa/abrirMinhaTarefa",
            "journey:executarTarefa/enviarRevisao",
            "journey:executarTarefa/iniciarTarefa",
            "journey:executarTarefa/marcarChecklist",
            "journey:executarTarefa/verTarefa",
            "journey:reatribuirTarefaCriador/escolherNovoResponsavel",
            "journey:reatribuirTarefaCriador/localizarParaReatribuir",
            "journey:reatribuirTarefaCriador/trocarResponsavel",
            "journey:reatribuirTarefaGestor/escolherResponsavelEquipe",
            "journey:reatribuirTarefaGestor/localizarTarefaEquipe",
            "journey:reatribuirTarefaGestor/reatribuir",
            "journey:retomarTarefaDevolvida/abrirDevolvida",
            "journey:retomarTarefaDevolvida/ajustarCampos",
            "journey:retomarTarefaDevolvida/lerMotivo",
            "journey:retomarTarefaDevolvida/reenviarRevisao",
            "journey:revisarTarefa/abrirTarefaRevisao",
            "journey:revisarTarefa/aceitarTarefa",
            "journey:revisarTarefa/conferirEntrega",
            "journey:revisarTarefa/devolverTarefa",
            "relationship:ItemChecklist/itemChecklistTarefa",
            "relationship:Tarefa/itemChecklistTarefa"
          ]
        },
        {
          "supportId": "data:Lista",
          "entityId": "Lista",
          "tableId": "lista",
          "dependsOn": [],
          "sourceRefs": [
            "grant:gestorListas",
            "grant:membroConsultaListas",
            "journey:acompanharTarefasEquipe/filtrarTarefas",
            "journey:acompanharTarefasEquipe/verDetalhe",
            "journey:acompanharTarefasEquipe/verQuadro",
            "journey:cancelarTarefaCriador/cancelarCriada",
            "journey:cancelarTarefaCriador/localizarCriada",
            "journey:cancelarTarefaGestor/cancelarPeloGestor",
            "journey:cancelarTarefaGestor/localizarParaCancelar",
            "journey:criarTarefa/localizarLista",
            "journey:criarTarefa/preencherTarefa",
            "journey:editarTarefa/ajustarChecklist",
            "journey:editarTarefa/alterarCampos",
            "journey:editarTarefa/localizarTarefa",
            "journey:executarTarefa/abrirMinhaTarefa",
            "journey:executarTarefa/enviarRevisao",
            "journey:executarTarefa/iniciarTarefa",
            "journey:executarTarefa/marcarChecklist",
            "journey:executarTarefa/verTarefa",
            "journey:manterListas/criarLista",
            "journey:manterListas/editarLista",
            "journey:manterListas/verListas",
            "journey:reatribuirTarefaCriador/escolherNovoResponsavel",
            "journey:reatribuirTarefaCriador/localizarParaReatribuir",
            "journey:reatribuirTarefaCriador/trocarResponsavel",
            "journey:reatribuirTarefaGestor/escolherResponsavelEquipe",
            "journey:reatribuirTarefaGestor/localizarTarefaEquipe",
            "journey:reatribuirTarefaGestor/reatribuir",
            "journey:retomarTarefaDevolvida/abrirDevolvida",
            "journey:retomarTarefaDevolvida/ajustarCampos",
            "journey:retomarTarefaDevolvida/lerMotivo",
            "journey:retomarTarefaDevolvida/reenviarRevisao",
            "journey:revisarTarefa/abrirTarefaRevisao",
            "journey:revisarTarefa/aceitarTarefa",
            "journey:revisarTarefa/conferirEntrega",
            "journey:revisarTarefa/devolverTarefa",
            "relationship:Lista/tarefaLista",
            "relationship:Tarefa/tarefaLista"
          ]
        },
        {
          "supportId": "data:Tarefa",
          "entityId": "Tarefa",
          "tableId": "tarefa",
          "dependsOn": [
            "Lista"
          ],
          "sourceRefs": [
            "grant:gestorTarefasEquipe",
            "grant:membroTarefasProprias",
            "journey:acompanharTarefasEquipe/filtrarTarefas",
            "journey:acompanharTarefasEquipe/verDetalhe",
            "journey:acompanharTarefasEquipe/verQuadro",
            "journey:avisoDiarioVencimentos/abrirAviso",
            "journey:avisoDiarioVencimentos/verVencendo",
            "journey:cancelarTarefaCriador/cancelarCriada",
            "journey:cancelarTarefaCriador/localizarCriada",
            "journey:cancelarTarefaGestor/cancelarPeloGestor",
            "journey:cancelarTarefaGestor/localizarParaCancelar",
            "journey:criarTarefa/localizarLista",
            "journey:criarTarefa/preencherTarefa",
            "journey:editarTarefa/ajustarChecklist",
            "journey:editarTarefa/alterarCampos",
            "journey:editarTarefa/localizarTarefa",
            "journey:executarTarefa/abrirMinhaTarefa",
            "journey:executarTarefa/enviarRevisao",
            "journey:executarTarefa/iniciarTarefa",
            "journey:executarTarefa/marcarChecklist",
            "journey:executarTarefa/verTarefa",
            "journey:manterListas/criarLista",
            "journey:manterListas/editarLista",
            "journey:manterListas/verListas",
            "journey:reatribuirTarefaCriador/escolherNovoResponsavel",
            "journey:reatribuirTarefaCriador/localizarParaReatribuir",
            "journey:reatribuirTarefaCriador/trocarResponsavel",
            "journey:reatribuirTarefaGestor/escolherResponsavelEquipe",
            "journey:reatribuirTarefaGestor/localizarTarefaEquipe",
            "journey:reatribuirTarefaGestor/reatribuir",
            "journey:retomarTarefaDevolvida/abrirDevolvida",
            "journey:retomarTarefaDevolvida/ajustarCampos",
            "journey:retomarTarefaDevolvida/lerMotivo",
            "journey:retomarTarefaDevolvida/reenviarRevisao",
            "journey:revisarTarefa/abrirTarefaRevisao",
            "journey:revisarTarefa/aceitarTarefa",
            "journey:revisarTarefa/conferirEntrega",
            "journey:revisarTarefa/decidirRevisao",
            "journey:revisarTarefa/devolverTarefa",
            "ontology:Tarefa/lifecycleStates/aFazer",
            "ontology:Tarefa/lifecycleStates/emAndamento",
            "ontology:Tarefa/lifecycleStates/emRevisao",
            "relationship:ItemChecklist/itemChecklistTarefa",
            "relationship:Lista/tarefaLista",
            "relationship:MembroEquipe/tarefaCriador",
            "relationship:MembroEquipe/tarefaResponsavel",
            "relationship:Tarefa/itemChecklistTarefa",
            "relationship:Tarefa/tarefaCriador",
            "relationship:Tarefa/tarefaLista",
            "relationship:Tarefa/tarefaResponsavel"
          ]
        }
      ],
      "runtime": [
        {
          "supportId": "identity:gestor",
          "kind": "identity",
          "entityId": "MembroEquipe",
          "actorRefs": [
            "gestor"
          ],
          "gap": "RUNTIME_TEST_IDENTITY_UNREFERENCED: no verified runtime capability provisions an authenticated test identity for gestor bound to MembroEquipe",
          "owner": "runtime"
        },
        {
          "supportId": "identity:membroEquipe",
          "kind": "identity",
          "entityId": "MembroEquipe",
          "actorRefs": [
            "membroEquipe"
          ],
          "gap": "RUNTIME_TEST_IDENTITY_UNREFERENCED: no verified runtime capability provisions an authenticated test identity for membroEquipe bound to MembroEquipe",
          "owner": "runtime"
        }
      ],
      "gaps": []
    }
  }
} as const;

export default definition;
