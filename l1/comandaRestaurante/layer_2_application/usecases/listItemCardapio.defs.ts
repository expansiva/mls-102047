/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/listItemCardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listItemCardapio",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/ItemCardapio.defs.ts"
  ],
  "data": {
    "usecaseId": "listItemCardapio",
    "entityId": "ItemCardapio",
    "operation": "list",
    "ports": [
      "ItemCardapioRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listItemCardapio",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "ItemCardapio.id"
          },
          {
            "name": "name",
            "type": "string",
            "fieldRef": "ItemCardapio.name"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "ItemCardapio.details"
          },
          {
            "name": "details.precoVigente",
            "type": "money",
            "fieldRef": "ItemCardapio.details.precoVigente"
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
            "type": "ItemCardapio"
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
        "port": "ItemCardapioRepository"
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
