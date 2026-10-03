/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listColaborador.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listColaborador",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102034_/l4/ontology/mdm.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/colaborador.defs.ts",
    "_102047_/l4/reembolsoDespesas/ontology/Colaborador.defs.ts"
  ],
  "data": {
    "usecaseId": "listColaborador",
    "entityId": "Colaborador",
    "operation": "list",
    "ports": [],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listColaborador",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Colaborador.id"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "Colaborador.details"
          },
          {
            "name": "details.identification",
            "type": "object",
            "fieldRef": "Colaborador.details.identification"
          },
          {
            "name": "details.identification.subtype",
            "type": "enum",
            "fieldRef": "Colaborador.details.identification.subtype"
          },
          {
            "name": "details.identification.name",
            "type": "string",
            "fieldRef": "Colaborador.details.identification.name"
          },
          {
            "name": "details.identification.status",
            "type": "enum",
            "fieldRef": "Colaborador.details.identification.status"
          },
          {
            "name": "details.identification.docType",
            "type": "enum",
            "fieldRef": "Colaborador.details.identification.docType"
          },
          {
            "name": "details.identification.docId",
            "type": "string",
            "fieldRef": "Colaborador.details.identification.docId"
          },
          {
            "name": "details.identification.countryCode",
            "type": "string",
            "fieldRef": "Colaborador.details.identification.countryCode"
          },
          {
            "name": "details.identification.tags",
            "type": "string",
            "fieldRef": "Colaborador.details.identification.tags"
          },
          {
            "name": "details.base",
            "type": "object",
            "fieldRef": "Colaborador.details.base"
          },
          {
            "name": "details.base.relationshipRefs",
            "type": "object",
            "fieldRef": "Colaborador.details.base.relationshipRefs"
          },
          {
            "name": "details.person",
            "type": "object",
            "fieldRef": "Colaborador.details.person"
          },
          {
            "name": "details.person.privacyConsent",
            "type": "object",
            "fieldRef": "Colaborador.details.person.privacyConsent"
          },
          {
            "name": "details.general",
            "type": "object",
            "fieldRef": "Colaborador.details.general"
          },
          {
            "name": "details.reembolsoDespesas",
            "type": "object",
            "fieldRef": "Colaborador.details.reembolsoDespesas"
          },
          {
            "name": "page",
            "type": "number"
          },
          {
            "name": "pageSize",
            "type": "number"
          }
        ],
        "output": [
          {
            "name": "items",
            "type": "Colaborador"
          },
          {
            "name": "hasMore",
            "type": "boolean"
          }
        ]
      }
    ],
    "portCalls": [],
    "transactional": false,
    "effects": [],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "mdm",
        "namespace": "reembolsoDespesas",
        "call": "get",
        "entity": "Colaborador",
        "capability": "read.byId"
      },
      {
        "kind": "mdm",
        "namespace": "reembolsoDespesas",
        "call": "findByDocument",
        "entity": "Colaborador",
        "capability": "locate.byDocument"
      },
      {
        "kind": "mdm",
        "namespace": "reembolsoDespesas",
        "call": "listByType",
        "entity": "Colaborador",
        "capability": "locate.byName"
      },
      {
        "kind": "mdm",
        "namespace": "reembolsoDespesas",
        "call": "relatedOfMany",
        "entity": "Colaborador",
        "capability": "listLinks"
      }
    ],
    "uses": [
      {
        "path": "details.base.relationshipRefs",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "details.identification.status",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "details.identification.subtype",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "details.identification.tags",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "id",
        "role": "filter",
        "source": "input"
      }
    ],
    "rules": [],
    "rulePlan": [
      {
        "ruleId": "rule-document-shape-validated",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-document-shape-validated",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "DELEGATION_UNPROVEN"
      },
      {
        "ruleId": "rule-foreign-namespace-refused",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-foreign-namespace-refused",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "DELEGATION_UNPROVEN"
      },
      {
        "ruleId": "rule-identity-never-in-namespace",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-identity-never-in-namespace",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "DELEGATION_UNPROVEN"
      },
      {
        "ruleId": "rule-person-privacy-consent-required-br-eu",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-person-privacy-consent-required-br-eu",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "DELEGATION_UNPROVEN"
      }
    ],
    "transaction": {
      "boundary": "none"
    },
    "mdm": {
      "namespace": "reembolsoDespesas",
      "role": "reembolsoDespesas.Colaborador",
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
          "id": "findByDocument",
          "method": "findByDocument",
          "target": "entity",
          "shape": "point",
          "capabilities": [
            "locate.byDocument"
          ],
          "alternative": false,
          "when": [
            {
              "kind": "contract",
              "path": "details.identification.docType",
              "present": true
            },
            {
              "kind": "contract",
              "path": "details.identification.docId",
              "present": true
            }
          ],
          "arguments": [
            {
              "name": "docType",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "details.identification.docType"
              },
              "path": "details.identification.docType"
            },
            {
              "name": "docId",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "details.identification.docId"
              },
              "path": "details.identification.docId"
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
              "value": "reembolsoDespesas.Colaborador"
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
          "id": "listLinks",
          "method": "relatedOfMany",
          "target": "collection",
          "shape": "collection",
          "capabilities": [
            "listLinks"
          ],
          "alternative": false,
          "when": [],
          "arguments": [
            {
              "name": "mdmIds",
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
            "relationshipId",
            "type",
            "direction"
          ]
        }
      ]
    }
  }
} as const;

export default definition;
