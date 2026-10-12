/// <mls fileReference="_102047_/l4/financeiro/journeys/consultarMeusTitulos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const consultarMeusTitulosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMeusTitulos",
  "business": {
    "actorRef": "pagador",
    "title": "Consultar meus títulos",
    "goal": "Ver no portal os próprios títulos e recebimentos.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "listarMeusTitulos",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Ver meus títulos",
        "description": "O pagador vê no portal apenas os títulos em que ele é o pagador, em aberto e quitados."
      },
      {
        "stepId": "verRecebimentos",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "Ver meus recebimentos",
        "description": "O pagador abre um título e vê os recebimentos registrados nele."
      }
    ],
    "outcome": {
      "statement": "O pagador conhece a situação dos próprios títulos e pagamentos.",
      "evidence": [
        "Lista apenas com os títulos do pagador",
        "Recebimentos de cada título exibidos com data, valor e forma"
      ]
    }
  },
  "businessHash": "sha256:8c02b8d4aba3a6c0ae462e896ddbc1faa437010d91b152f66f6b9f51ade0e0cb"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ConsultarMeusTitulosJourneyType = typeof consultarMeusTitulosJourney;

export default consultarMeusTitulosJourney;
