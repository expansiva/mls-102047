/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getEmpresa",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_3_domain/entities/empresa.defs.ts"
  ],
  "data": {
    "usecaseId": "getEmpresa",
    "entityId": "Empresa",
    "operation": "get",
    "rulesApplied": [],
    "effects": [],
    "mdm": {
      "namespace": "inicio",
      "role": "inicio.Empresa",
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
