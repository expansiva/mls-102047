/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/cancelarItemComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "cancelarItemComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/ItemComanda.defs.ts",
    "_102047_/l4/comandaRestaurante/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "cancelarItemComanda",
    "entityId": "ItemComanda",
    "operation": "transition",
    "ports": [
      "ItemComandaRepository"
    ],
    "rulesApplied": [
      "itemComandaOperacaoSomenteComandaAberta"
    ],
    "functions": [
      {
        "functionName": "cancelarItemComanda",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "ItemComanda.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "ItemComanda.version"
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
      "transition"
    ],
    "transactional": false,
    "effects": [],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "rule",
        "ruleId": "itemComandaOperacaoSomenteComandaAberta"
      },
      {
        "kind": "transition",
        "transitionId": "cancelarItemComanda",
        "payload": []
      },
      {
        "kind": "port",
        "call": "transition",
        "port": "ItemComandaRepository"
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
    "rules": [
      {
        "ruleId": "itemComandaOperacaoSomenteComandaAberta",
        "path": "l4/comandaRestaurante/rules.defs.ts",
        "symbol": "itemComandaOperacaoSomenteComandaAberta"
      }
    ],
    "rulePlan": [
      {
        "ruleId": "itemComandaOperacaoSomenteComandaAberta",
        "origin": "l4/comandaRestaurante/ontology/ItemComanda.defs.ts#transitions.cancelarItemComanda.ruleRefs",
        "consumer": "usecase:cancelarItemComanda",
        "enforcement": "local",
        "gap": ""
      }
    ],
    "transaction": {
      "boundary": "none"
    },
    "transitionRef": "cancelarItemComanda",
    "lifecycle": {
      "transitionId": "cancelarItemComanda",
      "payload": [],
      "sourcePath": "l4/comandaRestaurante/ontology/ItemComanda.defs.ts",
      "symbol": "cancelarItemComanda"
    }
  }
} as const;

export default definition;
