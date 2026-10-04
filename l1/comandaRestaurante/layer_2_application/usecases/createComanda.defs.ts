/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/createComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/Comanda.defs.ts",
    "_102047_/l4/comandaRestaurante/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "createComanda",
    "entityId": "Comanda",
    "operation": "create",
    "ports": [
      "ComandaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "createComanda",
        "input": [
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
        "port": "ComandaRepository"
      }
    ],
    "uses": [],
    "rules": [],
    "rulePlan": [
      {
        "ruleId": "itensSomenteEmComandaAberta",
        "origin": "l4/comandaRestaurante/rules.defs.ts#itensSomenteEmComandaAberta",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      },
      {
        "ruleId": "",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#uniqueKeys",
        "consumer": "operation:create",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "mesaDisponivelParaAbrirComanda",
        "origin": "l4/comandaRestaurante/rules.defs.ts#mesaDisponivelParaAbrirComanda",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      },
      {
        "ruleId": "umaComandaAbertaPorMesa",
        "origin": "l4/comandaRestaurante/rules.defs.ts#umaComandaAbertaPorMesa",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      }
    ],
    "transaction": {
      "boundary": "none"
    }
  }
} as const;

export default definition;
