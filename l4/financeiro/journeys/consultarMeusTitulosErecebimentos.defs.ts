/// <mls fileReference="_102047_/l4/financeiro/journeys/consultarMeusTitulosErecebimentos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarMeusTitulosErecebimentosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMeusTitulosErecebimentos",
  "business": {
    "actorRef": "pagador",
    "title": "Consultar meus títulos e recebimentos",
    "goal": "Visualizar no portal somente os próprios títulos e recebimentos.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMeusTitulos",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Localizar meus títulos",
        "description": "Consulta os próprios títulos no portal."
      },
      {
        "stepId": "inspecionarMeusTitulos",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Visualizar meus títulos",
        "description": "Visualiza valores, vencimentos, origens e saldos dos próprios títulos."
      },
      {
        "stepId": "localizarMeusRecebimentos",
        "kind": "locate",
        "entity": "Recebimento",
        "title": "Localizar meus recebimentos",
        "description": "Consulta os próprios recebimentos vinculados aos seus títulos."
      },
      {
        "stepId": "inspecionarMeusRecebimentos",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "Visualizar meus recebimentos",
        "description": "Visualiza os valores, datas e formas de pagamento dos próprios recebimentos."
      }
    ],
    "outcome": {
      "statement": "O pagador consulta sua situação financeira sem acessar dados de outros pagadores.",
      "evidence": [
        "São exibidos apenas títulos vinculados ao pagador da sessão.",
        "São exibidos apenas recebimentos vinculados aos títulos do pagador da sessão."
      ]
    }
  },
  "businessHash": "sha256:77ef98a7e77bf718a756a7f6cfd971446e22daf77e911d9e4f12d39c4cf2ef21"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarMeusTitulosErecebimentosJourneyType = typeof consultarMeusTitulosErecebimentosJourney;

export default consultarMeusTitulosErecebimentosJourney;
