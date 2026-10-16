/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/workflows/aprovarDespesaEnviada.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "workflowProcess",
  "artifactId": "aprovarDespesaEnviada",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l4/reembolsoDespesas/journeys/analisarDecidirDespesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/ontology/Despesa.defs.ts",
    "_102047_/l4/reembolsoDespesas/workflows.defs.ts"
  ],
  "data": {
    "processId": "aprovarDespesaEnviada",
    "trigger": {
      "kind": "event",
      "event": "Despesa.enviarParaAprovacao"
    },
    "functions": [],
    "operations": [],
    "occurrence": {
      "entityId": "Despesa"
    }
  }
} as const;

export default definition;
