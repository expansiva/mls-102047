/// <mls fileReference="_102047_/l4/financeiro/journeys/consultarMeusTitulosErecebimentos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarMeusTitulosErecebimentosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMeusTitulosErecebimentos",
  "business": {
    "actorRef": "pagador",
    "title": "Consultar meus títulos e recebimentos",
    "goal": "Visualizar somente os próprios títulos a receber e os próprios recebimentos no portal.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMeusTitulos",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "x",
        "description": "Localiza os títulos vinculados ao próprio pagador."
      },
      {
        "stepId": "consultarMeusTitulos",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "x",
        "description": "Consulta valores, vencimentos, origem, situação e saldo dos próprios títulos."
      },
      {
        "stepId": "localizarMeusRecebimentos",
        "kind": "locate",
        "entity": "Recebimento",
        "title": "x",
        "description": "Localiza os recebimentos vinculados ao próprio pagador."
      },
      {
        "stepId": "consultarMeusRecebimentos",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "x",
        "description": "Consulta os valores, datas e formas dos próprios recebimentos."
      }
    ],
    "outcome": {
      "statement": "O pagador visualiza exclusivamente sua situação financeira e seus recebimentos.",
      "evidence": [
        "Lista de títulos próprios com saldo e vencimento disponível.",
        "Lista de recebimentos próprios disponível."
      ]
    }
  },
  "businessHash": "sha256:6fab04126ac8b2f22065a1083edf037e51142f3e8f5b71e889c0b29670129771"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarMeusTitulosErecebimentosJourneyType = typeof consultarMeusTitulosErecebimentosJourney;

export default consultarMeusTitulosErecebimentosJourney;
