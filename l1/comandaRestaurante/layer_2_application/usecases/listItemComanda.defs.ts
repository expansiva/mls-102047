/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/listItemComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listItemComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/ItemComanda.defs.ts"
  ],
  "data": {
    "usecaseId": "listItemComanda",
    "entityId": "ItemComanda",
    "operation": "list",
    "ports": [
      "ItemComandaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listItemComanda",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "ItemComanda.id"
          },
          {
            "name": "comandaId",
            "type": "record",
            "fieldRef": "ItemComanda.comandaId"
          },
          {
            "name": "itemCardapioId",
            "type": "record",
            "fieldRef": "ItemComanda.itemCardapioId"
          },
          {
            "name": "status",
            "type": "enum",
            "fieldRef": "ItemComanda.status"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "ItemComanda.details"
          },
          {
            "name": "details.quantidade",
            "type": "integer",
            "fieldRef": "ItemComanda.details.quantidade"
          },
          {
            "name": "details.observacao",
            "type": "text",
            "fieldRef": "ItemComanda.details.observacao"
          },
          {
            "name": "details.precoUnitario",
            "type": "money",
            "fieldRef": "ItemComanda.details.precoUnitario"
          },
          {
            "name": "details.valorTotal",
            "type": "money",
            "fieldRef": "ItemComanda.details.valorTotal"
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
            "type": "ItemComanda"
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
        "port": "ItemComandaRepository"
      }
    ],
    "uses": [
      {
        "path": "details.valorTotal",
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
        "ruleId": "itemComandaOperacaoSomenteComandaAberta",
        "origin": "l4/comandaRestaurante/ontology/ItemComanda.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      }
    ],
    "transaction": {
      "boundary": "none"
    }
  }
} as const;

export default definition;
