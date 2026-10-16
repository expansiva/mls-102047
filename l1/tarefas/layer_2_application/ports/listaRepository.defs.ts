/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/ports/listaRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "ListaRepository",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_3_domain/entities/lista.defs.ts"
  ],
  "data": {
    "entityId": "Lista",
    "interfaceName": "ListaRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "Lista"
        ],
        "returns": "Lista"
      },
      {
        "name": "list",
        "params": [
          "ListaFilter"
        ],
        "returns": "Lista[]"
      },
      {
        "name": "get",
        "params": [
          "id"
        ],
        "returns": "Lista"
      },
      {
        "name": "update",
        "params": [
          "Lista"
        ],
        "returns": "Lista"
      }
    ]
  }
} as const;

export default definition;
