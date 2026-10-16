/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/createDespesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createDespesa",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.defs.ts"
  ],
  "data": {
    "usecaseId": "createDespesa",
    "entityId": "Despesa",
    "operation": "create",
    "rulesApplied": [],
    "effects": []
  }
} as const;

export default definition;
