/// <mls fileReference="_102047_/l4/financeiro/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "financeiro",
  "journeys": [
    {
      "journeyId": "registrarRecebimento",
      "actorRef": "caixa",
      "title": "Registrar recebimento de título"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type FinanceiroJourneyIndexType = typeof financeiroJourneyIndex;

export default financeiroJourneyIndex;
