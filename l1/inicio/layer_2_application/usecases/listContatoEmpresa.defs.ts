/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/listContatoEmpresa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listContatoEmpresa",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_3_domain/entities/contatoEmpresa.defs.ts"
  ],
  "data": {
    "usecaseId": "listContatoEmpresa",
    "entityId": "ContatoEmpresa",
    "operation": "list",
    "rulesApplied": [],
    "effects": [],
    "mdm": {
      "namespace": "inicio",
      "role": "inicio.ContatoEmpresa",
      "atomic": false,
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
        },
        {
          "id": "findByContact",
          "method": "findByContact",
          "target": "entity",
          "shape": "point",
          "capabilities": [
            "locate.byContact"
          ],
          "alternative": false,
          "when": [
            {
              "kind": "contract",
              "path": "details.contactChannel.contactType",
              "present": true
            },
            {
              "kind": "contract",
              "path": "details.contactChannel.value",
              "present": true
            }
          ],
          "arguments": [
            {
              "name": "contactType",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "details.contactChannel.contactType"
              },
              "path": "details.contactChannel.contactType"
            },
            {
              "name": "value",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "details.contactChannel.value"
              },
              "path": "details.contactChannel.value"
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
