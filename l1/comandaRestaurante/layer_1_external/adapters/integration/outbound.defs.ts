/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/integration/outbound.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "integrationOutbound",
  "artifactId": "outbound",
  "moduleName": "comandaRestaurante",
  "status": "blocked",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/usecases/fecharComanda.defs.ts"
  ],
  "data": {
    "integrationId": "outbound",
    "events": [
      {
        "eventId": "comandaFechada",
        "on": "Comanda.fecharComanda",
        "entityId": "Comanda",
        "mechanism": "",
        "consumer": "fecharComanda"
      }
    ]
  }
} as const;

export default definition;
