/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/registrarPagamentoDeMensalidade.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarPagamentoDeMensalidadeJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarPagamentoDeMensalidade",
  "business": {
    "actorRef": "recepcao",
    "title": "Registrar pagamento de mensalidade",
    "goal": "Registrar o pagamento recebido de uma mensalidade de aluno.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMensalidade",
        "kind": "locate",
        "entity": "Mensalidade",
        "title": "x",
        "description": "Localiza a mensalidade do aluno por meio do contexto disponível ou de uma busca."
      },
      {
        "stepId": "consultarMensalidade",
        "kind": "inspect",
        "entity": "Mensalidade",
        "title": "x",
        "description": "Confere o aluno, a competência, o valor devido e a situação da mensalidade antes de registrar o recebimento."
      },
      {
        "stepId": "registrarPagamento",
        "kind": "act",
        "entity": "Pagamento",
        "effect": "create",
        "title": "x",
        "description": "Registra a data, o valor e a forma de pagamento recebidos para a mensalidade."
      }
    ],
    "outcome": {
      "statement": "O pagamento fica registrado e a situação financeira da mensalidade é atualizada.",
      "evidence": [
        "Existe um pagamento associado à mensalidade com data, valor e forma registrados.",
        "A mensalidade passa a refletir o valor recebido e sua situação de quitação ou saldo pendente."
      ]
    }
  },
  "businessHash": "sha256:f655e91032bac8fff4403906e1334848d775b9059f77843d3948fbe67b796eef"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarPagamentoDeMensalidadeJourneyType = typeof registrarPagamentoDeMensalidadeJourney;

export default registrarPagamentoDeMensalidadeJourney;
