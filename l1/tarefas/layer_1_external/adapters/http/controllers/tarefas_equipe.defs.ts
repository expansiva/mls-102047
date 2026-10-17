/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/tarefas_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "tarefas_equipe",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/requests/tarefas_equipe.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "tarefas_equipe",
    "handlers": [
      {
        "route": "tarefas.tarefas_equipe.cancelarTarefa",
        "kind": "command",
        "grantIds": [
          "gestorTarefasEquipe",
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.cancelarTarefa",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      },
      {
        "route": "tarefas.tarefas_equipe.carregarOpcoesEquipe",
        "kind": "query",
        "grantIds": [
          "gestorListas",
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.carregarOpcoesEquipe",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      },
      {
        "route": "tarefas.tarefas_equipe.listarTarefasEquipe",
        "kind": "query",
        "grantIds": [
          "gestorTarefasEquipe",
          "gestorListas",
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.listarTarefasEquipe",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      },
      {
        "route": "tarefas.tarefas_equipe.obterTarefa",
        "kind": "query",
        "grantIds": [
          "gestorTarefasEquipe",
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.obterTarefa",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      },
      {
        "route": "tarefas.tarefas_equipe.reatribuirTarefa",
        "kind": "command",
        "grantIds": [
          "gestorTarefasEquipe",
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.reatribuirTarefa",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      }
    ]
  }
} as const;

export default definition;
