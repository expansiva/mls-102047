/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/rejeitarDespesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "rejeitarDespesa",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/ontology/Despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "rejeitarDespesa",
    "entityId": "Despesa",
    "operation": "transition",
    "ports": [
      "DespesaRepository"
    ],
    "rulesApplied": [
      "managerTeamExpenseAccess",
      "rejectionReasonRequired"
    ],
    "functions": [
      {
        "functionName": "rejeitarDespesa",
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
            "name": "details.motivoRejeicao",
            "type": "text",
            "fieldRef": "Despesa.details.motivoRejeicao"
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
        "ruleId": "managerTeamExpenseAccess"
      },
      {
        "kind": "rule",
        "ruleId": "rejectionReasonRequired"
      },
      {
        "kind": "transition",
        "transitionId": "rejeitarDespesa",
        "payload": [
          "details.motivoRejeicao"
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
        "path": "details.motivoRejeicao",
        "role": "write",
        "source": "payload"
      }
    ],
    "rules": [
      {
        "ruleId": "managerTeamExpenseAccess",
        "path": "l4/reembolsoDespesas/rules.defs.ts",
        "symbol": "managerTeamExpenseAccess"
      },
      {
        "ruleId": "rejectionReasonRequired",
        "path": "l4/reembolsoDespesas/rules.defs.ts",
        "symbol": "rejectionReasonRequired"
      }
    ],
    "rulePlan": [
      {
        "ruleId": "managerTeamExpenseAccess",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#transitions.rejeitarDespesa.ruleRefs",
        "consumer": "usecase:rejeitarDespesa",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "rejectionReasonRequired",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#transitions.rejeitarDespesa.ruleRefs",
        "consumer": "usecase:rejeitarDespesa",
        "enforcement": "local",
        "gap": ""
      }
    ],
    "transaction": {
      "boundary": "none"
    },
    "transitionRef": "rejeitarDespesa",
    "lifecycle": {
      "transitionId": "rejeitarDespesa",
      "payload": [
        "details.motivoRejeicao"
      ],
      "sourcePath": "l4/reembolsoDespesas/ontology/Despesa.defs.ts",
      "symbol": "rejeitarDespesa"
    }
  }
} as const;

export default definition;
