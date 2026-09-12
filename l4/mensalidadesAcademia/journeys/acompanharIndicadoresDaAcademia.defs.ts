/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/acompanharIndicadoresDaAcademia.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharIndicadoresDaAcademiaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharIndicadoresDaAcademia",
  "business": {
    "actorRef": "gerencia",
    "title": "Acompanhar indicadores da academia",
    "goal": "Consultar os indicadores financeiros e a situação dos alunos no mês.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarIndicadoresDoMes",
        "kind": "locate",
        "entity": "IndicadoresAcademia",
        "title": "Selecionar indicadores do mês",
        "description": "Localiza os indicadores consolidados do período consultado."
      },
      {
        "stepId": "inspecionarIndicadoresFinanceiros",
        "kind": "inspect",
        "entity": "IndicadoresAcademia",
        "title": "Consultar indicadores financeiros e de alunos",
        "description": "Visualiza o total a receber, o total recebido, as quantidades de alunos ativos, bloqueados e inadimplentes."
      }
    ],
    "outcome": {
      "statement": "A gerência acompanha a posição financeira mensal e a situação da base de alunos.",
      "evidence": [
        "Total a receber e total recebido do mês exibidos.",
        "Quantidades de alunos ativos, bloqueados e inadimplentes exibidas."
      ]
    }
  },
  "businessHash": "sha256:55b4e2af39973452fadb0a0bd2aba5d4e3d594dcafc6b561a840f30ae8e7e5ff"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharIndicadoresDaAcademiaJourneyType = typeof acompanharIndicadoresDaAcademiaJourney;

export default acompanharIndicadoresDaAcademiaJourney;
