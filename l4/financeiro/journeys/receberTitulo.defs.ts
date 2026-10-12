/// <mls fileReference="_102047_/l4/financeiro/journeys/receberTitulo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const receberTituloJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "receberTitulo",
  "business": {
    "actorRef": "caixa",
    "title": "Receber título no caixa",
    "goal": "Registrar o recebimento total ou parcial de um título a receber em dinheiro, pix ou cartão.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarTitulo",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Buscar título a receber",
        "description": "O caixa localiza o título em aberto pelo pagador, origem ou vencimento."
      },
      {
        "stepId": "conferirTitulo",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Conferir título",
        "description": "O caixa confere pagador, valor, saldo em aberto, vencimento e origem do título."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "Registrar recebimento",
        "description": "O caixa informa a forma de pagamento (dinheiro, pix ou cartão via Stripe) e o valor recebido, podendo ser parcial; o saldo do título é atualizado e ele fica quitado quando o saldo chega a zero."
      }
    ],
    "outcome": {
      "statement": "O recebimento está registrado e o saldo do título reflete a baixa total ou parcial.",
      "evidence": [
        "Recebimento com forma de pagamento, valor e data registrado no título",
        "Saldo em aberto do título reduzido pelo valor recebido",
        "Título quitado quando o saldo chega a zero"
      ]
    }
  },
  "businessHash": "sha256:313bb8904734b2e6ff6e6272677c788309c1f6c9bf6e871f12cd9ce145afbaa7"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ReceberTituloJourneyType = typeof receberTituloJourney;

export default receberTituloJourney;
