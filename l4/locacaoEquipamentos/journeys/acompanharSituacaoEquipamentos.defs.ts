/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/acompanharSituacaoEquipamentos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharSituacaoEquipamentosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharSituacaoEquipamentos",
  "business": {
    "actorRef": "gerente",
    "title": "Acompanhar situação dos equipamentos",
    "goal": "Ver quais equipamentos estão disponíveis, locados ou em manutenção.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarEquipamentosPorSituacao",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "x",
        "description": "Localiza os equipamentos e consulta sua situação atual."
      },
      {
        "stepId": "consultarSituacaoEquipamento",
        "kind": "inspect",
        "entity": "Equipamento",
        "title": "x",
        "description": "Visualiza a identificação, o valor da diária e a situação de disponibilidade, locação ou manutenção de cada equipamento."
      }
    ],
    "outcome": {
      "statement": "O gerente acompanha a situação atual dos equipamentos da locadora.",
      "evidence": [
        "Relação de equipamentos exibida com suas situações de disponível, locado ou em manutenção."
      ]
    }
  },
  "businessHash": "sha256:32acd34a2544f13ee1ecbd4b14688b3db2ae8a2420fd72625235b7f558fc9e12"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharSituacaoEquipamentosJourneyType = typeof acompanharSituacaoEquipamentosJourney;

export default acompanharSituacaoEquipamentosJourney;
