/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listDespesa",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/ontology/Despesa.defs.ts"
  ],
  "data": {
    "usecaseId": "listDespesa",
    "entityId": "Despesa",
    "operation": "list",
    "ports": [
      "DespesaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listDespesa",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Despesa.id"
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
            "type": "Despesa"
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
        "port": "DespesaRepository"
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
        "ruleId": "expenseOwnerOnly",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "financeApprovedExpenseAccess",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "managerTeamExpenseAccess",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "paymentDateRequired",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "proofRequiredBeforeSubmission",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "rejectionReasonRequired",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "singleResubmission",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "validExpenseData",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#rules",
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
