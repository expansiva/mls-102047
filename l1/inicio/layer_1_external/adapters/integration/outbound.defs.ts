/// <mls fileReference="_102047_/l1/inicio/layer_1_external/adapters/integration/outbound.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "integrationOutbound",
  "artifactId": "outbound",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [],
  "data": {
    "integrationId": "outbound",
    "events": [],
    "inbound": [
      {
        "inboundId": "loginGranted",
        "operations": [
          "updatePessoaOrganizacao"
        ],
        "mechanism": "",
        "consumer": "updatePessoaOrganizacao"
      }
    ]
  }
} as const;

export default definition;
