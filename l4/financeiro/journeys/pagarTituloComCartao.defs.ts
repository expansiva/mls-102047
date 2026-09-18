/// <mls fileReference="_102047_/l4/financeiro/journeys/pagarTituloComCartao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const pagarTituloComCartaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "pagarTituloComCartao",
  "business": {
    "actorRef": "pagador",
    "title": "Pagar título em aberto com cartão",
    "goal": "Quitar ou abater um título próprio em aberto usando cartão.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMeuTituloEmAberto",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "x",
        "description": "Localiza um título em aberto vinculado ao próprio pagador."
      },
      {
        "stepId": "conferirMeuTituloParaPagamento",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "x",
        "description": "Confere o valor, o vencimento e o saldo do título antes do pagamento."
      },
      {
        "stepId": "pagarTituloComCartao",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "x",
        "description": "Registra o pagamento do título por cartão e atualiza seu saldo conforme o valor recebido."
      }
    ],
    "outcome": {
      "statement": "O pagamento com cartão é registrado e o título reflete o novo saldo ou a quitação.",
      "evidence": [
        "Recebimento por cartão registrado para o título.",
        "Saldo do título atualizado após o pagamento."
      ]
    }
  },
  "businessHash": "sha256:19138d25825cde4f2ff9481551e3b46b5567f9d4f11adc0b027c91c1efcf05cd"
} as const satisfies Ns5JourneyArtifact;

export type PagarTituloComCartaoJourneyType = typeof pagarTituloComCartaoJourney;

export default pagarTituloComCartaoJourney;
