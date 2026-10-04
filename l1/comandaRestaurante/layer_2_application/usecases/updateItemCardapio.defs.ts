/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/updateItemCardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "updateItemCardapio",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/ItemCardapio.defs.ts"
  ],
  "data": {
    "usecaseId": "updateItemCardapio",
    "entityId": "ItemCardapio",
    "operation": "update",
    "ports": [
      "ItemCardapioRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "updateItemCardapio",
        "input": [
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
            "name": "id",
            "type": "uuid",
            "fieldRef": "ItemCardapio.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "ItemCardapio.version"
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
      "update"
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
        "call": "update",
        "port": "ItemCardapioRepository"
      }
    ],
    "uses": [
      {
        "path": "id",
        "role": "selector",
        "source": "input"
      },
      {
        "path": "version",
        "role": "concurrency",
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
