/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/acompanharSituacaoEquipamentos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharSituacaoEquipamentosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharSituacaoEquipamentos",
  "business": {
    "actorRef": "gerente",
    "title": "Acompanhar situação dos equipamentos",
    "goal": "Saber quais equipamentos estão disponíveis, locados ou em manutenção.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "filtrarPorSituacao",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "Filtrar equipamentos por situação",
        "description": "Lista os equipamentos agrupados ou filtrados por situação: disponível, locado ou em manutenção."
      },
      {
        "stepId": "verEquipamento",
        "kind": "inspect",
        "entity": "Equipamento",
        "title": "Ver detalhes do equipamento",
        "description": "Consulta código, descrição, valor da diária, situação e, quando locado, o contrato vigente e a data prevista de devolução."
      }
    ],
    "outcome": {
      "statement": "O gerente conhece a situação atual de cada equipamento da locadora.",
      "evidence": [
        "Totais de equipamentos disponíveis, locados e em manutenção exibidos",
        "Equipamento locado mostra o contrato vigente e a data prevista de devolução"
      ]
    }
  },
  "businessHash": "sha256:c1254552ccda220a560108a0d2d8540e4435981cc4af8ad2267d1c7faf73b5e8"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharSituacaoEquipamentosJourneyType = typeof acompanharSituacaoEquipamentosJourney;

export default acompanharSituacaoEquipamentosJourney;
