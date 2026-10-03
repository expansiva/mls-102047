/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/registrarPagamento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "registrarPagamento",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/ontology/Despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "registrarPagamento",
    "entityId": "Despesa",
    "operation": "transition",
    "ports": [
      "DespesaRepository"
    ],
    "rulesApplied": [
      "financeApprovedExpenseAccess",
      "paymentDateRequired"
    ],
    "functions": [
      {
        "functionName": "registrarPagamento",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Despesa.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Despesa.version"
          },
          {
            "name": "details.dataPagamento",
            "type": "date",
            "fieldRef": "Despesa.details.dataPagamento"
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Despesa.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Despesa.version"
          },
          {
            "name": "colaboradorId",
            "type": "record",
            "fieldRef": "Despesa.colaboradorId"
          },
          {
            "name": "status",
            "type": "enum",
            "fieldRef": "Despesa.status"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "Despesa.details"
          },
          {
            "name": "details.dataDespesa",
            "type": "date",
            "fieldRef": "Despesa.details.dataDespesa"
          },
          {
            "name": "details.categoria",
            "type": "string",
            "fieldRef": "Despesa.details.categoria"
          },
          {
            "name": "details.valor",
            "type": "money",
            "fieldRef": "Despesa.details.valor"
          },
          {
            "name": "details.descricao",
            "type": "text",
            "fieldRef": "Despesa.details.descricao"
          },
          {
            "name": "details.motivoRejeicao",
            "type": "text",
            "fieldRef": "Despesa.details.motivoRejeicao"
          },
          {
            "name": "details.reenvioRealizado",
            "type": "boolean",
            "fieldRef": "Despesa.details.reenvioRealizado"
          },
          {
            "name": "details.dataPagamento",
            "type": "date",
            "fieldRef": "Despesa.details.dataPagamento"
          }
        ]
      }
    ],
    "portCalls": [
      "transition"
    ],
    "transactional": true,
    "effects": [],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "transaction",
        "boundary": "local"
      },
      {
        "kind": "rule",
        "ruleId": "financeApprovedExpenseAccess"
      },
      {
        "kind": "rule",
        "ruleId": "paymentDateRequired"
      },
      {
        "kind": "transition",
        "transitionId": "registrarPagamento",
        "payload": [
          "details.dataPagamento"
        ]
      },
      {
        "kind": "port",
        "call": "transition",
        "port": "DespesaRepository"
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
        "path": "details.dataPagamento",
        "role": "write",
        "source": "payload"
      }
    ],
    "rules": [
      {
        "ruleId": "financeApprovedExpenseAccess",
        "path": "l4/reembolsoDespesas/rules.defs.ts",
        "symbol": "financeApprovedExpenseAccess"
      },
      {
        "ruleId": "paymentDateRequired",
        "path": "l4/reembolsoDespesas/rules.defs.ts",
        "symbol": "paymentDateRequired"
      }
    ],
    "rulePlan": [
      {
        "ruleId": "financeApprovedExpenseAccess",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#transitions.registrarPagamento.ruleRefs",
        "consumer": "usecase:registrarPagamento",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "paymentDateRequired",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#transitions.registrarPagamento.ruleRefs",
        "consumer": "usecase:registrarPagamento",
        "enforcement": "local",
        "gap": ""
      }
    ],
    "transaction": {
      "boundary": "local"
    },
    "transitionRef": "registrarPagamento",
    "lifecycle": {
      "transitionId": "registrarPagamento",
      "payload": [
        "details.dataPagamento"
      ],
      "sourcePath": "l4/reembolsoDespesas/ontology/Despesa.defs.ts",
      "symbol": "registrarPagamento"
    }
  }
} as const;

export default definition;
