/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/auth/authorityMap.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "authorityMap",
  "artifactId": "authorityMap",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "mapId": "authorityMap",
    "entries": [
      {
        "grantId": "gestorAvisosProprios",
        "actorRef": "gestor"
      },
      {
        "grantId": "gestorListas",
        "actorRef": "gestor"
      },
      {
        "grantId": "gestorMembros",
        "actorRef": "gestor"
      },
      {
        "grantId": "gestorTarefasEquipe",
        "actorRef": "gestor"
      },
      {
        "grantId": "membroAvisosProprios",
        "actorRef": "membroEquipe"
      },
      {
        "grantId": "membroConsultaListas",
        "actorRef": "membroEquipe"
      },
      {
        "grantId": "membroEscolheResponsavel",
        "actorRef": "membroEquipe"
      },
      {
        "grantId": "membroTarefasProprias",
        "actorRef": "membroEquipe"
      }
    ]
  }
} as const;

export default definition;
