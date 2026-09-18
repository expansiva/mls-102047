/// <mls fileReference="_102047_/l4/financeiro/journeys/receberTitulo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const receberTituloJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "receberTitulo",
  "business": {
    "actorRef": "caixa",
    "title": "Receber um título",
    "goal": "Registrar o recebimento total ou parcial de um título por dinheiro, Pix ou cartão.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarTituloEmAberto",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "x",
        "description": "Localiza o título em aberto que será recebido."
      },
      {
        "stepId": "consultarTituloParaRecebimento",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "x",
        "description": "Confere pagador, valor devido, vencimento e origem antes de registrar o pagamento."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "x",
        "description": "Registra o valor recebido, inclusive quando parcial, e a forma de pagamento: dinheiro, Pix ou cartão; o saldo do título é atualizado."
      }
    ],
    "outcome": {
      "statement": "O recebimento é registrado e o título passa a refletir o saldo pendente ou a quitação.",
      "evidence": [
        "Recebimento registrado com valor, data e forma de pagamento.",
        "Saldo do título atualizado após a baixa total ou parcial."
      ]
    }
  },
  "businessHash": "sha256:32a6ebe5d17c634744ca44cbe6ec34c0ca26dd86302dcaa9d3c6424857b436d6"
} as const satisfies Ns5JourneyArtifact;

export type ReceberTituloJourneyType = typeof receberTituloJourney;

export default receberTituloJourney;
