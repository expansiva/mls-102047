/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/acompanharIndicadoresDaAcademia.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharIndicadoresDaAcademiaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharIndicadoresDaAcademia",
  "business": {
    "actorRef": "gerencia",
    "title": "Acompanhar indicadores da academia",
    "goal": "Consultar a posição financeira e a situação dos alunos da academia.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "consultarPainelGerencial",
        "kind": "inspect",
        "entity": "PainelGerencial",
        "title": "x",
        "description": "Consulta os indicadores do mês: total a receber, total recebido, quantidade de alunos ativos, bloqueados e inadimplentes."
      }
    ],
    "outcome": {
      "statement": "A gerência visualiza os indicadores atualizados para acompanhar a operação financeira e os alunos.",
      "evidence": [
        "O painel apresenta o total a receber no mês e o total recebido.",
        "O painel apresenta as quantidades de alunos ativos, bloqueados e inadimplentes."
      ]
    }
  },
  "businessHash": "sha256:76117feafa73a5d91d9a090a771aadeb19a2c493979e325eae1188cf08229273"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharIndicadoresDaAcademiaJourneyType = typeof acompanharIndicadoresDaAcademiaJourney;

export default acompanharIndicadoresDaAcademiaJourney;
