/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getMembroEquipe",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_3_domain/entities/membroEquipe.defs.ts"
  ],
  "data": {
    "usecaseId": "getMembroEquipe",
    "entityId": "MembroEquipe",
    "operation": "get",
    "rulesApplied": [],
    "effects": [],
    "mdm": {
      "namespace": "tarefas",
      "role": "tarefas.MembroEquipe",
      "atomic": true,
      "calls": [
        {
          "id": "get",
          "method": "get",
          "target": "entity",
          "shape": "point",
          "capabilities": [
            "read.byId"
          ],
          "alternative": false,
          "when": [],
          "arguments": [
            {
              "name": "mdmId",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "id"
              },
              "path": "id"
            }
          ],
          "result": [
            "mdmId",
            "version",
            "details"
          ]
        }
      ]
    }
  }
} as const;

export default definition;
