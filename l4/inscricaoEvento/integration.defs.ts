/// <mls fileReference="_102047_/l4/inscricaoEvento/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "inscricaoEvento",
  "inbound": [],
  "outbound": [
    {
      "id": "publicarEvento",
      "kind": "event",
      "to": "any",
      "event": "publicarEvento",
      "on": "Evento.publicarEvento",
      "description": "Publica que um evento foi disponibilizado ao público para inscrição.",
      "entityRefs": [
        "Evento"
      ]
    },
    {
      "id": "cancelarInscricao",
      "kind": "event",
      "to": "any",
      "event": "cancelarInscricao",
      "on": "Inscricao.cancelarInscricao",
      "description": "Publica o cancelamento de uma inscrição em evento.",
      "entityRefs": [
        "Inscricao"
      ]
    },
    {
      "id": "promoverDaListaEspera",
      "kind": "event",
      "to": "any",
      "event": "promoverDaListaEspera",
      "on": "Inscricao.promoverDaListaEspera",
      "description": "Publica a promoção de uma inscrição da lista de espera.",
      "entityRefs": [
        "Inscricao"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type InscricaoEventoIntegrationType = typeof inscricaoEventoIntegration;

export default inscricaoEventoIntegration;
