/// <mls fileReference="_102047_/l4/reembolsoDespesas/journeys/consultarMinhasDespesas.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarMinhasDespesasJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMinhasDespesas",
  "business": {
    "actorRef": "colaborador",
    "title": "Consultar minhas despesas",
    "goal": "Acompanhar as próprias despesas de reembolso.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMinhasDespesas",
        "kind": "locate",
        "entity": "Despesa",
        "title": "Localizar despesas próprias",
        "description": "Localiza as despesas registradas pelo próprio colaborador."
      },
      {
        "stepId": "consultarDespesa",
        "kind": "inspect",
        "entity": "Despesa",
        "title": "Consultar despesa",
        "description": "Consulta os dados, a situação e eventuais motivos registrados para uma despesa."
      }
    ],
    "outcome": {
      "statement": "O colaborador visualiza a situação e os detalhes das próprias despesas.",
      "evidence": [
        "A despesa consultada apresenta seus dados e sua situação atual.",
        "Motivo de rejeição ou informação de pagamento é exibido quando registrado."
      ]
    }
  },
  "businessHash": "sha256:dbabb83f6c845f1ca8f6254e4a8a44f1762fcb39b5fa2b741ac15127b59b970a"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarMinhasDespesasJourneyType = typeof consultarMinhasDespesasJourney;

export default consultarMinhasDespesasJourney;
