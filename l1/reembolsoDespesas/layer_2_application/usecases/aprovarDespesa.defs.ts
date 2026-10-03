/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/aprovarDespesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "aprovarDespesa",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/integration.defs.ts",
    "_102047_/l4/reembolsoDespesas/ontology/Despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "aprovarDespesa",
    "entityId": "Despesa",
    "operation": "transition",
    "ports": [
      "DespesaRepository"
    ],
    "rulesApplied": [
      "managerTeamExpenseAccess"
    ],
    "functions": [
      {
        "functionName": "aprovarDespesa",
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
    "effects": [
      {
        "eventId": "aprovarDespesa",
        "path": "l4/reembolsoDespesas/integration.defs.ts",
        "symbol": "aprovarDespesa"
      }
    ],
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
        "kind": "transition",
        "transitionId": "aprovarDespesa",
        "payload": []
      },
      {
        "kind": "port",
        "call": "transition",
        "port": "DespesaRepository"
      },
      {
        "kind": "effect",
        "eventId": "aprovarDespesa"
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
        "ruleId": "managerTeamExpenseAccess",
        "path": "l4/reembolsoDespesas/rules.defs.ts",
        "symbol": "managerTeamExpenseAccess"
      }
    ],
    "rulePlan": [
      {
        "ruleId": "managerTeamExpenseAccess",
        "origin": "l4/reembolsoDespesas/ontology/Despesa.defs.ts#transitions.aprovarDespesa.ruleRefs",
        "consumer": "usecase:aprovarDespesa",
        "enforcement": "local",
        "gap": ""
      }
    ],
    "transaction": {
      "boundary": "none"
    },
    "transitionRef": "aprovarDespesa",
    "lifecycle": {
      "transitionId": "aprovarDespesa",
      "payload": [],
      "sourcePath": "l4/reembolsoDespesas/ontology/Despesa.defs.ts",
      "symbol": "aprovarDespesa"
    }
  }
} as const;

export default definition;
