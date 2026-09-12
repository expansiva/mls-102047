/// <mls fileReference="_102047_/l4/financeiro/journeys/consultarMeusTitulosErecebimentos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarMeusTitulosErecebimentosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMeusTitulosErecebimentos",
  "business": {
    "actorRef": "pagador",
    "title": "Consultar meus títulos e recebimentos",
    "goal": "Visualizar somente os próprios títulos a receber e recebimentos no portal.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMeusTitulos",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Localizar meus títulos",
        "description": "Localizar os títulos vinculados ao próprio pagador."
      },
      {
        "stepId": "inspecionarMeusTitulosErecebimentos",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Inspecionar meus títulos e recebimentos",
        "description": "Inspecionar valores, vencimentos, situação dos títulos e os recebimentos vinculados."
      }
    ],
    "outcome": {
      "statement": "O pagador visualiza seus títulos e seus recebimentos.",
      "evidence": [
        "Títulos vinculados ao pagador exibidos.",
        "Recebimentos do pagador disponíveis para consulta."
      ]
    }
  },
  "businessHash": "sha256:6f467d376b9c5b24283913da4911285738717f271e37517012c095fc281ec9b0"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarMeusTitulosErecebimentosJourneyType = typeof consultarMeusTitulosErecebimentosJourney;

export default consultarMeusTitulosErecebimentosJourney;
