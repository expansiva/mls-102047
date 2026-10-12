/// <mls fileReference="_102047_/l4/financeiro/journeys/receberTitulo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const receberTituloJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "receberTitulo",
  "business": {
    "actorRef": "caixa",
    "title": "Receber título no caixa",
    "goal": "Registrar o recebimento total ou parcial de um título a receber em dinheiro, pix ou cartão via Stripe.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarTitulo",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Buscar título a receber",
        "description": "O caixa localiza o título em aberto pelo pagador, pela origem ou pelo vencimento."
      },
      {
        "stepId": "conferirTitulo",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Conferir saldo do título",
        "description": "O caixa confere pagador, origem, vencimento, valor original e saldo em aberto."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "Registrar recebimento",
        "description": "O caixa registra o valor recebido e a forma de pagamento (dinheiro, pix ou cartão via Stripe); um valor menor que o saldo gera baixa parcial e o saldo do título é atualizado."
      }
    ],
    "outcome": {
      "statement": "O recebimento fica registrado e o título fica quitado ou com baixa parcial.",
      "evidence": [
        "Recebimento aparece no título com valor, forma de pagamento e data",
        "Saldo em aberto do título reduzido pelo valor recebido",
        "Título quitado quando o saldo chega a zero"
      ]
    }
  },
  "businessHash": "sha256:163a36e762263f0176ca8bd4bb676f90e9aeccc19bffdacbaf0213e7f2d9ace0"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ReceberTituloJourneyType = typeof receberTituloJourney;

export default receberTituloJourney;
