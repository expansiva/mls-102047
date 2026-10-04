/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/createItemComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createItemComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/ItemComanda.defs.ts"
  ],
  "data": {
    "usecaseId": "createItemComanda",
    "entityId": "ItemComanda",
    "operation": "create",
    "ports": [
      "ItemComandaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "createItemComanda",
        "input": [
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
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "ItemComanda.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "ItemComanda.version"
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
          }
        ]
      }
    ],
    "portCalls": [
      "create"
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
        "call": "create",
        "port": "ItemComandaRepository"
      }
    ],
    "uses": [],
    "rules": [],
    "rulePlan": [],
    "transaction": {
      "boundary": "none"
    }
  }
} as const;

export default definition;
