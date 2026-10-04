/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/fecharComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "fecharComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.defs.ts",
    "_102047_/l4/comandaRestaurante/integration.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/Comanda.defs.ts",
    "_102047_/l4/comandaRestaurante/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "fecharComanda",
    "entityId": "Comanda",
    "operation": "transition",
    "ports": [
      "ComandaRepository"
    ],
    "rulesApplied": [
      "descontoNaoExcedeSubtotal",
      "fechamentoLiberaMesa",
      "pagamentoObrigatorioNoFechamento"
    ],
    "functions": [
      {
        "functionName": "fecharComanda",
        "input": [
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
      "transition"
    ],
    "transactional": false,
    "effects": [
      {
        "eventId": "comandaFechada",
        "path": "l4/comandaRestaurante/integration.defs.ts",
        "symbol": "comandaFechada"
      }
    ],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "port",
        "call": "transition",
        "port": "ComandaRepository"
      },
      {
        "kind": "rule",
        "ruleId": "descontoNaoExcedeSubtotal"
      },
      {
        "kind": "rule",
        "ruleId": "fechamentoLiberaMesa"
      },
      {
        "kind": "rule",
        "ruleId": "pagamentoObrigatorioNoFechamento"
      },
      {
        "kind": "transition",
        "transitionId": "fecharComanda",
        "payload": [
          "details.discountAmount",
          "details.paymentMethod"
        ]
      },
      {
        "kind": "effect",
        "eventId": "comandaFechada"
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
      },
      {
        "path": "details.discountAmount",
        "role": "write",
        "source": "payload"
      },
      {
        "path": "details.paymentMethod",
        "role": "write",
        "source": "payload"
      }
    ],
    "rules": [
      {
        "ruleId": "descontoNaoExcedeSubtotal",
        "path": "l4/comandaRestaurante/rules.defs.ts",
        "symbol": "descontoNaoExcedeSubtotal"
      },
      {
        "ruleId": "fechamentoLiberaMesa",
        "path": "l4/comandaRestaurante/rules.defs.ts",
        "symbol": "fechamentoLiberaMesa"
      },
      {
        "ruleId": "pagamentoObrigatorioNoFechamento",
        "path": "l4/comandaRestaurante/rules.defs.ts",
        "symbol": "pagamentoObrigatorioNoFechamento"
      }
    ],
    "rulePlan": [
      {
        "ruleId": "descontoNaoExcedeSubtotal",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#transitions.fecharComanda.ruleRefs",
        "consumer": "usecase:fecharComanda",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "fechamentoLiberaMesa",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#transitions.fecharComanda.ruleRefs",
        "consumer": "usecase:fecharComanda",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "pagamentoObrigatorioNoFechamento",
        "origin": "l4/comandaRestaurante/ontology/Comanda.defs.ts#transitions.fecharComanda.ruleRefs",
        "consumer": "usecase:fecharComanda",
        "enforcement": "local",
        "gap": ""
      }
    ],
    "transaction": {
      "boundary": "none"
    },
    "transitionRef": "fecharComanda",
    "lifecycle": {
      "transitionId": "fecharComanda",
      "payload": [
        "details.discountAmount",
        "details.paymentMethod"
      ],
      "sourcePath": "l4/comandaRestaurante/ontology/Comanda.defs.ts",
      "symbol": "fecharComanda"
    }
  }
} as const;

export default definition;
