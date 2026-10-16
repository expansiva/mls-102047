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
    "rulesApplied": [
      "managerTeamExpenseAccess",
      "rejectionReasonRequired"
    ],
    "effects": [],
    "transitionRef": "rejeitarDespesa"
  }
} as const;

export default definition;
