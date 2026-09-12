/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/registrarPagamentoDeMensalidade.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarPagamentoDeMensalidadeJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarPagamentoDeMensalidade",
  "business": {
    "actorRef": "recepcao",
    "title": "Registrar pagamento de mensalidade",
    "goal": "Registrar o pagamento recebido de uma mensalidade.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMensalidade",
        "kind": "locate",
        "entity": "Mensalidade",
        "title": "Localizar mensalidade",
        "description": "Localiza a mensalidade do aluno a ser paga."
      },
      {
        "stepId": "inspecionarMensalidade",
        "kind": "inspect",
        "entity": "Mensalidade",
        "title": "Conferir dados da cobrança",
        "description": "Confere aluno, período, valor pendente e vencimento antes de registrar o recebimento."
      },
      {
        "stepId": "registrarPagamento",
        "kind": "act",
        "entity": "Pagamento",
        "affects": [
          "Mensalidade"
        ],
        "title": "Registrar pagamento",
        "description": "Registra a data, o valor e a forma de pagamento recebida e atualiza a situação da mensalidade."
      }
    ],
    "outcome": {
      "statement": "O pagamento fica registrado e a situação da mensalidade é atualizada.",
      "evidence": [
        "Pagamento registrado com data, valor e forma de pagamento.",
        "Mensalidade apresenta o recebimento e seu saldo atualizado."
      ]
    }
  },
  "businessHash": "sha256:5aa9350c612efe2f082f04dd3f4686da2b94ff70ca06bf03009bc0d59f665563"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarPagamentoDeMensalidadeJourneyType = typeof registrarPagamentoDeMensalidadeJourney;

export default registrarPagamentoDeMensalidadeJourney;
