/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/getComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/Comanda.defs.ts"
  ],
  "data": {
    "usecaseId": "getComanda",
    "entityId": "Comanda",
    "operation": "get",
    "ports": [
      "ComandaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "getComanda",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Comanda.id"
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Comanda.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Comanda.version"
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
        "port": "ComandaRepository"
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
        "ruleId": "descontoNaoExcedeSubtotal",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#rules",
        "consumer": "operation:get",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "fechamentoLiberaMesa",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#rules",
        "consumer": "operation:get",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "pagamentoObrigatorioNoFechamento",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#rules",
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
