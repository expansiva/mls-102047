/// <mls fileReference="_102047_/l4/financeiro/journeys/pagarTituloComCartao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const pagarTituloComCartaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "pagarTituloComCartao",
  "business": {
    "actorRef": "pagador",
    "title": "Pagar título em aberto com cartão",
    "goal": "Quitar total ou parcialmente um dos próprios títulos em aberto usando cartão.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMeuTituloEmAberto",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Localizar título em aberto",
        "description": "Localiza um dos próprios títulos em aberto, pelo contexto recebido ou por consulta no portal."
      },
      {
        "stepId": "inspecionarMeuTituloEmAberto",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Conferir título em aberto",
        "description": "Confere o valor em aberto, o vencimento e a origem do título selecionado."
      },
      {
        "stepId": "registrarPagamentoComCartao",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "Registrar pagamento com cartão",
        "description": "Registra o pagamento por cartão processado pela Stripe, vinculando-o ao título e atualizando seu saldo conforme o valor recebido."
      }
    ],
    "outcome": {
      "statement": "O pagamento com cartão é registrado para o título do pagador.",
      "evidence": [
        "Há um recebimento por cartão vinculado ao título pago.",
        "O título apresenta o saldo atualizado após o pagamento."
      ]
    }
  },
  "businessHash": "sha256:f966cd2374cbcc15dcf34929f5cabbfb742855446d42b5df99f4c4434075ec6c"
} as const satisfies Ns5JourneyArtifact;

export type PagarTituloComCartaoJourneyType = typeof pagarTituloComCartaoJourney;

export default pagarTituloComCartaoJourney;
