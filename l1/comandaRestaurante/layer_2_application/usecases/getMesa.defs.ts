/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/getMesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getMesa",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/Mesa.defs.ts"
  ],
  "data": {
    "usecaseId": "getMesa",
    "entityId": "Mesa",
    "operation": "get",
    "ports": [
      "MesaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "getMesa",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Mesa.id"
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Mesa.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Mesa.version"
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
          }
        ]
      }
    ],
    "portCalls": [
      "get"
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
        "call": "get",
        "port": "MesaRepository"
      }
    ],
    "uses": [
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
