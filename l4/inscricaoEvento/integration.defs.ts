/// <mls fileReference="_102047_/l4/inscricaoEvento/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "inscricaoEvento",
  "inbound": [],
  "outbound": [
    {
      "id": "eventoPublicado",
      "kind": "event",
      "to": "any",
      "event": "eventoPublicado",
      "on": "Evento.publicarEvento",
      "description": "Notifica que um evento foi publicado e está disponível para consulta e inscrição.",
      "entityRefs": [
        "Evento"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type InscricaoEventoIntegrationType = typeof inscricaoEventoIntegration;

export default inscricaoEventoIntegration;
