/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/getItemCardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getItemCardapio",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/ItemCardapio.defs.ts"
  ],
  "data": {
    "usecaseId": "getItemCardapio",
    "entityId": "ItemCardapio",
    "operation": "get",
    "ports": [
      "ItemCardapioRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "getItemCardapio",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "ItemCardapio.id"
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "ItemCardapio.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "ItemCardapio.version"
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
