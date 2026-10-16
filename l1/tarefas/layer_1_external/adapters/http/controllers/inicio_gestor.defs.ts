/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/inicio_gestor.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "inicio_gestor",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/requests/inicio_gestor.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "inicio_gestor",
    "handlers": [
      {
        "route": "tarefas.inicio_gestor.qryPanoramaEquipe",
        "kind": "query",
        "grantIds": [
          "gestorListas"
        ],
        "serviceFunction": "tarefas.inicio_gestor.qryPanoramaEquipe",
        "contractPath": "l2/tarefas/web/contracts/inicio_gestor.defs.ts",
        "contractInterface": "Inicio_gestorContracts"
      },
      {
        "route": "tarefas.inicio_gestor.qryTarefasPedemAcao",
        "kind": "query",
        "grantIds": [
          "gestorTarefasEquipe",
          "gestorListas"
        ],
        "serviceFunction": "tarefas.inicio_gestor.qryTarefasPedemAcao",
        "contractPath": "l2/tarefas/web/contracts/inicio_gestor.defs.ts",
        "contractInterface": "Inicio_gestorContracts"
      }
    ]
  }
} as const;

export default definition;
