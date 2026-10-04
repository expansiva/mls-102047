/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/listComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/Comanda.defs.ts"
  ],
  "data": {
    "usecaseId": "listComanda",
    "entityId": "Comanda",
    "operation": "list",
    "ports": [
      "ComandaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listComanda",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Comanda.id"
          },
          {
            "name": "number",
            "type": "integer",
            "fieldRef": "Comanda.number"
          },
          {
            "name": "mesaId",
            "type": "record",
            "fieldRef": "Comanda.mesaId"
          },
          {
            "name": "status",
            "type": "enum",
            "fieldRef": "Comanda.status"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "Comanda.details"
          },
          {
            "name": "details.discountAmount",
            "type": "money",
            "fieldRef": "Comanda.details.discountAmount"
          },
          {
            "name": "details.paymentMethod",
            "type": "enum",
            "fieldRef": "Comanda.details.paymentMethod"
          },
          {
            "name": "details.subtotal",
            "type": "money",
            "fieldRef": "Comanda.details.subtotal"
          },
          {
            "name": "details.totalComanda",
            "type": "money",
            "fieldRef": "Comanda.details.totalComanda"
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
            "type": "Comanda"
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
        "port": "ComandaRepository"
      }
    ],
    "uses": [
      {
        "path": "details.subtotal",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "details.totalComanda",
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
        "ruleId": "descontoNaoExcedeSubtotal",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "fechamentoLiberaMesa",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "pagamentoObrigatorioNoFechamento",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#rules",
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
