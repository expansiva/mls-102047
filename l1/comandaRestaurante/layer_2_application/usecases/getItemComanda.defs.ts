/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/getItemComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getItemComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/ItemComanda.defs.ts"
  ],
  "data": {
    "usecaseId": "getItemComanda",
    "entityId": "ItemComanda",
    "operation": "get",
    "ports": [
      "ItemComandaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "getItemComanda",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "ItemComanda.id"
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
        "port": "ItemComandaRepository"
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
    "rulePlan": [
      {
        "ruleId": "itemComandaOperacaoSomenteComandaAberta",
        "origin": "l4/comandaRestaurante/ontology/ItemComanda.defs.ts#rules",
        "consumer": "operation:get",
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
