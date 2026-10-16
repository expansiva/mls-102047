/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/minhas_tarefas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "minhas_tarefas",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/requests/minhas_tarefas.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "minhas_tarefas",
    "handlers": [
      {
        "route": "tarefas.minhas_tarefas.aceitarEntrega",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.aceitarEntrega",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.cancelarTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.cancelarTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.devolverComMotivo",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.devolverComMotivo",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.enviarParaRevisao",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.enviarParaRevisao",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.iniciarTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.iniciarTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.marcarItemChecklist",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.marcarItemChecklist",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.minhasTarefas",
        "kind": "query",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.minhasTarefas",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.salvarEdicaoTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.salvarEdicaoTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.salvarNovaTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.salvarNovaTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.tarefaAberta",
        "kind": "query",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.tarefaAberta",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      }
    ]
  }
} as const;

export default definition;
