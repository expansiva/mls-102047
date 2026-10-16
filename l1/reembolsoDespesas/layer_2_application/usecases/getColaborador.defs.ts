/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getColaborador.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getColaborador",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/colaborador.defs.ts"
  ],
  "data": {
    "usecaseId": "getColaborador",
    "entityId": "Colaborador",
    "operation": "get",
    "rulesApplied": [],
    "effects": [],
    "mdm": {
      "namespace": "reembolsoDespesas",
      "role": "reembolsoDespesas.Colaborador",
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
