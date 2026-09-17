/// <mls fileReference="_102047_/l4/financeiro/journeys/consultarTitulosVencidos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarTitulosVencidosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarTitulosVencidos",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Consultar títulos vencidos",
    "goal": "Identificar os títulos da organização que estão vencidos e ainda possuem saldo em aberto.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarTitulosVencidos",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Localizar títulos vencidos",
        "description": "Consulta os títulos da organização com vencimento expirado e saldo pendente."
      },
      {
        "stepId": "inspecionarTitulosVencidos",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Examinar títulos vencidos",
        "description": "Examina pagador, valor em aberto, vencimento e origem de cada título vencido."
      }
    ],
    "outcome": {
      "statement": "O gerente financeiro identifica os títulos vencidos que exigem acompanhamento.",
      "evidence": [
        "A consulta apresenta títulos com vencimento anterior à data atual e saldo em aberto.",
        "Cada título vencido exibe seu pagador, valor pendente e origem."
      ]
    }
  },
  "businessHash": "sha256:a906293debcb34d8f9cc6533b183d40febf6a7920f836ac7ae184ce46c9eda3e"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarTitulosVencidosJourneyType = typeof consultarTitulosVencidosJourney;

export default consultarTitulosVencidosJourney;
