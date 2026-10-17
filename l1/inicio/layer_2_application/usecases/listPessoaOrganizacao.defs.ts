/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listPessoaOrganizacao",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_3_domain/entities/pessoaOrganizacao.defs.ts"
  ],
  "data": {
    "usecaseId": "listPessoaOrganizacao",
    "entityId": "PessoaOrganizacao",
    "operation": "list",
    "rulesApplied": [],
    "effects": [],
    "mdm": {
      "namespace": "inicio",
      "role": "inicio.PessoaOrganizacao",
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
          "id": "listByName",
          "method": "listByType",
          "target": "collection",
          "shape": "collection",
          "capabilities": [
            "locate.byName"
          ],
          "alternative": false,
          "when": [
            {
              "kind": "contract",
              "path": "details.identification.name",
              "present": true
            }
          ],
          "arguments": [
            {
              "name": "type",
              "role": "parameter",
              "origin": {
                "kind": "literal",
                "evidence": "role"
              },
              "value": "inicio.PessoaOrganizacao"
            },
            {
              "name": "name",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "details.identification.name"
              },
              "path": "details.identification.name"
            }
          ],
          "result": [
            "items",
            "page",
            "pageSize",
            "total"
          ]
        },
        {
          "id": "listByTag",
          "method": "listByType",
          "target": "collection",
          "shape": "collection",
          "capabilities": [
            "locate.byTag"
          ],
          "alternative": false,
          "when": [],
          "arguments": [
            {
              "name": "type",
              "role": "parameter",
              "origin": {
                "kind": "literal",
                "evidence": "role"
              },
              "value": "inicio.PessoaOrganizacao"
            }
          ],
          "result": [
            "items",
            "page",
            "pageSize",
            "total"
          ]
        }
      ]
    }
  }
} as const;

export default definition;
