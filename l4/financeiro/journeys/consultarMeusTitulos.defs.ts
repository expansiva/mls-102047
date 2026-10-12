/// <mls fileReference="_102047_/l4/financeiro/journeys/consultarMeusTitulos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const consultarMeusTitulosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMeusTitulos",
  "business": {
    "actorRef": "pagador",
    "title": "Consultar meus títulos",
    "goal": "Ver os próprios títulos e recebimentos no portal.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "listarMeusTitulos",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Listar meus títulos",
        "description": "O pagador vê no portal apenas os seus títulos, em aberto e quitados."
      },
      {
        "stepId": "verMeuTitulo",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Ver detalhes do título",
        "description": "O pagador consulta origem, valor, vencimento, saldo e recebimentos do título."
      }
    ],
    "outcome": {
      "statement": "O pagador conhece a situação dos próprios títulos e recebimentos.",
      "evidence": [
        "Somente títulos do próprio pagador são exibidos",
        "Recebimentos de cada título visíveis com data e valor"
      ]
    }
  },
  "businessHash": "sha256:48d1f140263ea6f208b2cb04f04dba89d92e58ef8e5f4eb608eafd02a8fc1ff7"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ConsultarMeusTitulosJourneyType = typeof consultarMeusTitulosJourney;

export default consultarMeusTitulosJourney;
