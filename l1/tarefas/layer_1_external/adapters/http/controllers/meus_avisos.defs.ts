/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/meus_avisos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "meus_avisos",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/requests/meus_avisos.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "meus_avisos",
    "handlers": [
      {
        "route": "tarefas.meus_avisos.abrirAviso",
        "kind": "query",
        "grantIds": [
          "membroAvisosProprios",
          "gestorAvisosProprios",
          "membroTarefasProprias",
          "gestorTarefasEquipe"
        ],
        "serviceFunction": "tarefas.meus_avisos.abrirAviso",
        "contractPath": "l2/tarefas/web/contracts/meus_avisos.defs.ts",
        "contractInterface": "Meus_avisosContracts"
      },
      {
        "route": "tarefas.meus_avisos.carregarMeusAvisos",
        "kind": "query",
        "grantIds": [
          "membroAvisosProprios",
          "gestorAvisosProprios",
          "membroTarefasProprias",
          "gestorTarefasEquipe"
        ],
        "serviceFunction": "tarefas.meus_avisos.carregarMeusAvisos",
        "contractPath": "l2/tarefas/web/contracts/meus_avisos.defs.ts",
        "contractInterface": "Meus_avisosContracts"
      }
    ]
  }
} as const;

export default definition;
