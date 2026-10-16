/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "workflowProcess",
  "artifactId": "cicloTarefa",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/aceitar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/cancelar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/createTarefa.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/devolver.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/enviarParaRevisao.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/iniciar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/updateItemChecklist.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.defs.ts",
    "_102047_/l4/tarefas/journeys/cancelarTarefaCriador.defs.ts",
    "_102047_/l4/tarefas/journeys/cancelarTarefaGestor.defs.ts",
    "_102047_/l4/tarefas/journeys/criarTarefa.defs.ts",
    "_102047_/l4/tarefas/journeys/executarTarefa.defs.ts",
    "_102047_/l4/tarefas/journeys/reatribuirTarefaCriador.defs.ts",
    "_102047_/l4/tarefas/journeys/reatribuirTarefaGestor.defs.ts",
    "_102047_/l4/tarefas/journeys/retomarTarefaDevolvida.defs.ts",
    "_102047_/l4/tarefas/journeys/revisarTarefa.defs.ts",
    "_102047_/l4/tarefas/ontology/Tarefa.defs.ts",
    "_102047_/l4/tarefas/workflows.defs.ts"
  ],
  "data": {
    "processId": "cicloTarefa",
    "trigger": {
      "kind": "manual",
      "actorRef": "membroEquipe"
    },
    "functions": [
      "abrirOcorrenciaTarefa",
      "avancarEtapaTarefa",
      "reatribuirQuemAge",
      "resolverQuemAgeAgora"
    ],
    "operations": [
      {
        "operation": "ItemChecklist.update",
        "steps": [
          "journey:executarTarefa/marcarChecklist"
        ]
      },
      {
        "operation": "Tarefa.aceitar",
        "steps": [
          "journey:revisarTarefa/aceitarTarefa"
        ]
      },
      {
        "operation": "Tarefa.cancelar",
        "steps": [
          "journey:cancelarTarefaCriador/cancelarCriada",
          "journey:cancelarTarefaGestor/cancelarPeloGestor"
        ]
      },
      {
        "operation": "Tarefa.create",
        "steps": [
          "journey:criarTarefa/preencherTarefa"
        ]
      },
      {
        "operation": "Tarefa.devolver",
        "steps": [
          "journey:revisarTarefa/devolverTarefa"
        ]
      },
      {
        "operation": "Tarefa.enviarParaRevisao",
        "steps": [
          "journey:executarTarefa/enviarRevisao",
          "journey:retomarTarefaDevolvida/reenviarRevisao"
        ]
      },
      {
        "operation": "Tarefa.iniciar",
        "steps": [
          "journey:executarTarefa/iniciarTarefa"
        ]
      },
      {
        "operation": "Tarefa.update",
        "steps": [
          "journey:retomarTarefaDevolvida/ajustarCampos",
          "journey:reatribuirTarefaCriador/trocarResponsavel",
          "journey:reatribuirTarefaGestor/reatribuir"
        ]
      }
    ],
    "occurrence": {
      "entityId": "Tarefa"
    }
  }
} as const;

export default definition;
