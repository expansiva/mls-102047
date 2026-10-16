/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/membros_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "membros_equipe",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/requests/membros_equipe.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "membros_equipe",
    "handlers": [
      {
        "route": "tarefas.membros_equipe.cadastrarPessoa",
        "kind": "command",
        "grantIds": [
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.membros_equipe.cadastrarPessoa",
        "contractPath": "l2/tarefas/web/contracts/membros_equipe.defs.ts",
        "contractInterface": "Membros_equipeContracts"
      },
      {
        "route": "tarefas.membros_equipe.listarMembrosEquipe",
        "kind": "query",
        "grantIds": [
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.membros_equipe.listarMembrosEquipe",
        "contractPath": "l2/tarefas/web/contracts/membros_equipe.defs.ts",
        "contractInterface": "Membros_equipeContracts"
      },
      {
        "route": "tarefas.membros_equipe.obterMembroEquipe",
        "kind": "query",
        "grantIds": [
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.membros_equipe.obterMembroEquipe",
        "contractPath": "l2/tarefas/web/contracts/membros_equipe.defs.ts",
        "contractInterface": "Membros_equipeContracts"
      },
      {
        "route": "tarefas.membros_equipe.salvarAlteracoesPessoa",
        "kind": "command",
        "grantIds": [
          "gestorMembros"
        ],
        "serviceFunction": "tarefas.membros_equipe.salvarAlteracoesPessoa",
        "contractPath": "l2/tarefas/web/contracts/membros_equipe.defs.ts",
        "contractInterface": "Membros_equipeContracts"
      }
    ]
  }
} as const;

export default definition;
