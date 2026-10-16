/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/integration/outbound.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "integrationOutbound",
  "artifactId": "outbound",
  "moduleName": "reembolsoDespesas",
  "status": "blocked",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/aprovarDespesa.defs.ts"
  ],
  "data": {
    "integrationId": "outbound",
    "events": [
      {
        "eventId": "aprovarDespesa",
        "on": "Despesa.aprovarDespesa",
        "entityId": "Despesa",
        "mechanism": "",
        "consumer": "aprovarDespesa"
      }
    ]
  }
} as const;

export default definition;
