/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/listMesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listMesa",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/Mesa.defs.ts"
  ],
  "data": {
    "usecaseId": "listMesa",
    "entityId": "Mesa",
    "operation": "list",
    "ports": [
      "MesaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listMesa",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Mesa.id"
          },
          {
            "name": "code",
            "type": "string",
            "fieldRef": "Mesa.code"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "Mesa.details"
          },
          {
            "name": "details.disponivel",
            "type": "boolean",
            "fieldRef": "Mesa.details.disponivel"
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
            "type": "Mesa"
          },
          {
            "name": "hasMore",
            "type": "boolean"
          }
        ]
      }
    ],
    "portCalls": [
      "list"
    ],
    "transactional": false,
    "effects": [],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "port",
        "call": "list",
        "port": "MesaRepository"
      }
    ],
    "uses": [
      {
        "path": "details.disponivel",
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
    "rulePlan": [],
    "transaction": {
      "boundary": "none"
    }
  }
} as const;

export default definition;
