/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/listas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "listas",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/requests/listas.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "listas",
    "handlers": [
      {
        "route": "tarefas.listas.buscarListas",
        "kind": "query",
        "grantIds": [
          "gestorListas"
        ],
        "serviceFunction": "tarefas.listas.buscarListas",
        "contractPath": "l2/tarefas/web/contracts/listas.defs.ts",
        "contractInterface": "ListasContracts"
      },
      {
        "route": "tarefas.listas.criarLista",
        "kind": "command",
        "grantIds": [
          "gestorListas"
        ],
        "serviceFunction": "tarefas.listas.criarLista",
        "contractPath": "l2/tarefas/web/contracts/listas.defs.ts",
        "contractInterface": "ListasContracts"
      },
      {
        "route": "tarefas.listas.listarListas",
        "kind": "query",
        "grantIds": [
          "gestorListas"
        ],
        "serviceFunction": "tarefas.listas.listarListas",
        "contractPath": "l2/tarefas/web/contracts/listas.defs.ts",
        "contractInterface": "ListasContracts"
      },
      {
        "route": "tarefas.listas.salvarLista",
        "kind": "command",
        "grantIds": [
          "gestorListas"
        ],
        "serviceFunction": "tarefas.listas.salvarLista",
        "contractPath": "l2/tarefas/web/contracts/listas.defs.ts",
        "contractInterface": "ListasContracts"
      }
    ]
  }
} as const;

export default definition;
