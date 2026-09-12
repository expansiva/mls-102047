/// <mls fileReference="_102047_/l4/financeiro/journeys/pagarMeuTituloComCartao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const pagarMeuTituloComCartaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "pagarMeuTituloComCartao",
  "business": {
    "actorRef": "pagador",
    "title": "Pagar meu título com cartão",
    "goal": "Quitar um título próprio em aberto por cartão no portal.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMeuTituloEmAberto",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Localizar meu título em aberto",
        "description": "Localizar um título em aberto vinculado ao próprio pagador."
      },
      {
        "stepId": "conferirMeuTitulo",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Conferir meu título",
        "description": "Conferir o valor, o vencimento e o saldo do título antes do pagamento."
      },
      {
        "stepId": "solicitarPagamentoComCartao",
        "kind": "act",
        "entity": "Recebimento",
        "affects": [
          "TituloReceber"
        ],
        "effect": "create",
        "title": "Solicitar pagamento com cartão",
        "description": "Solicitar o pagamento por cartão do título em aberto."
      },
      {
        "stepId": "encaminharPagamentoParaStripe",
        "kind": "handoff",
        "entity": "Recebimento",
        "title": "Encaminhar pagamento para processamento",
        "description": "Encaminhar a solicitação de pagamento por cartão para processamento.",
        "handoffTo": "stripe"
      }
    ],
    "outcome": {
      "statement": "O pagamento por cartão é enviado para processamento.",
      "evidence": [
        "Solicitação de pagamento registrada.",
        "Cobrança encaminhada ao processador de cartão."
      ]
    }
  },
  "businessHash": "sha256:81126e679978fe0a5283df16fafc56b7135eaa3551a3c29b2433d88a83468188"
} as const satisfies Ns5JourneyArtifact;

export type PagarMeuTituloComCartaoJourneyType = typeof pagarMeuTituloComCartaoJourney;

export default pagarMeuTituloComCartaoJourney;
