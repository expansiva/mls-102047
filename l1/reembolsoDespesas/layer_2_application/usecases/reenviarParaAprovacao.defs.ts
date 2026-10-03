/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/reenviarParaAprovacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "reenviarParaAprovacao",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/ontology/Despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "reenviarParaAprovacao",
    "entityId": "Despesa",
    "operation": "transition",
    "ports": [
      "DespesaRepository"
    ],
    "rulesApplied": [
      "expenseOwnerOnly",
      "proofRequiredBeforeSubmission",
      "singleResubmission",
      "validExpenseData"
    ],
    "functions": [
      {
        "functionName": "reenviarParaAprovacao",
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
    "transactional": false,
    "effects": [],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "rule",
        "ruleId": "expenseOwnerOnly"
      },
      {
        "kind": "rule",
        "ruleId": "proofRequiredBeforeSubmission"
      },
      {
        "kind": "rule",
        "ruleId": "singleResubmission"
      },
      {
        "kind": "rule",
        "ruleId": "validExpenseData"
      },
      {
        "kind": "transition",
        "transitionId": "reenviarParaAprovacao",
        "payload": []
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
      }
    ],
    "rules": [
      {
        "ruleId": "expenseOwnerOnly",
        "path": "l4/reembolsoDespesas/rules.defs.ts",
        "symbol": "expenseOwnerOnly"
      },
      {
        "ruleId": "proofRequiredBeforeSubmission",
        "path": "l4/reembolsoDespesas/rules.defs.ts",
        "symbol": "proofRequiredBeforeSubmission"
      },
      {
        "ruleId": "singleResubmission",
        "path": "l4/reembolsoDespesas/rules.defs.ts",
        "symbol": "singleResubmission"
      },
      {
        "ruleId": "validExpenseData",
        "path": "l4/reembolsoDespesas/rules.defs.ts",
        "symbol": "validExpenseData"
      }
    ],
    "rulePlan": [
      {
        "ruleId": "expenseOwnerOnly",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#transitions.reenviarParaAprovacao.ruleRefs",
        "consumer": "usecase:reenviarParaAprovacao",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "proofRequiredBeforeSubmission",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#transitions.reenviarParaAprovacao.ruleRefs",
        "consumer": "usecase:reenviarParaAprovacao",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "singleResubmission",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#transitions.reenviarParaAprovacao.ruleRefs",
        "consumer": "usecase:reenviarParaAprovacao",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "validExpenseData",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#transitions.reenviarParaAprovacao.ruleRefs",
        "consumer": "usecase:reenviarParaAprovacao",
        "enforcement": "local",
        "gap": ""
      }
    ],
    "transaction": {
      "boundary": "none"
    },
    "transitionRef": "reenviarParaAprovacao",
    "lifecycle": {
      "transitionId": "reenviarParaAprovacao",
      "payload": [],
      "sourcePath": "l4/reembolsoDespesas/ontology/Despesa.defs.ts",
      "symbol": "reenviarParaAprovacao"
    }
  }
} as const;

export default definition;
