/// <mls fileReference="_102047_/l4/financeiro/journeys/registrarRecebimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarRecebimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarRecebimento",
  "business": {
    "actorRef": "caixa",
    "title": "Registrar recebimento de título",
    "goal": "Receber um título em aberto, inclusive parcialmente, por dinheiro, Pix ou cartão.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarTitulo",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Localizar título",
        "description": "Localiza o título em aberto a partir do contexto disponível ou por consulta entre os títulos da organização."
      },
      {
        "stepId": "inspecionarTitulo",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Conferir título",
        "description": "Confere o pagador, o valor em aberto, o vencimento e a origem da cobrança."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "Registrar recebimento",
        "description": "Registra o valor recebido, integral ou parcial, e a forma de pagamento: dinheiro, Pix ou cartão processado pela Stripe; o saldo do título é atualizado conforme o recebimento."
      }
    ],
    "outcome": {
      "statement": "O recebimento é registrado e o título permanece em aberto apenas pelo saldo que ainda faltar.",
      "evidence": [
        "Há um recebimento vinculado ao título com valor, data e forma de pagamento.",
        "O título apresenta o saldo atualizado após a baixa, total ou parcial."
      ]
    }
  },
  "businessHash": "sha256:46e50cdcb5d1d2b7c7bea9ec436033da788a611a92e5403675c91cd126bc5c20"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarRecebimentoJourneyType = typeof registrarRecebimentoJourney;

export default registrarRecebimentoJourney;
