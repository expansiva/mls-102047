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
        "route": "tarefas.tarefas_equipe.cmdCancelarTarefa",
        "kind": "command",
        "grantIds": [
          "gestorTarefasEquipe",
          "gestorListas",
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.cmdCancelarTarefa",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      },
      {
        "route": "tarefas.tarefas_equipe.cmdReatribuirTarefa",
        "kind": "command",
        "grantIds": [
          "gestorTarefasEquipe",
          "gestorListas",
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.cmdReatribuirTarefa",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      },
      {
        "route": "tarefas.tarefas_equipe.qryBuscarMembros",
        "kind": "query",
        "grantIds": [
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.qryBuscarMembros",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      },
      {
        "route": "tarefas.tarefas_equipe.qryDetalheTarefa",
        "kind": "query",
        "grantIds": [
          "gestorTarefasEquipe",
          "gestorListas",
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.qryDetalheTarefa",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      },
      {
        "route": "tarefas.tarefas_equipe.qryListasFiltro",
        "kind": "query",
        "grantIds": [
          "gestorListas"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.qryListasFiltro",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      },
      {
        "route": "tarefas.tarefas_equipe.qryTarefasEquipe",
        "kind": "query",
        "grantIds": [
          "gestorTarefasEquipe",
          "gestorListas",
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.tarefas_equipe.qryTarefasEquipe",
        "contractPath": "l2/tarefas/web/contracts/tarefas_equipe.defs.ts",
        "contractInterface": "Tarefas_equipeContracts"
      }
    ]
  }
} as const;

export default definition;
