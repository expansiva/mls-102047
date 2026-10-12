/// <mls fileReference="_102047_/l4/financeiro/journeys/estornarRecebimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const estornarRecebimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "estornarRecebimento",
  "business": {
    "actorRef": "caixa",
    "title": "Estornar recebimento do dia",
    "goal": "Desfazer um recebimento registrado no mesmo dia, devolvendo o saldo ao título.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarRecebimento",
        "kind": "locate",
        "entity": "Recebimento",
        "title": "Buscar recebimento do dia",
        "description": "O caixa localiza o recebimento registrado hoje pelo pagador ou pelo título."
      },
      {
        "stepId": "conferirRecebimento",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "Conferir dados do recebimento",
        "description": "O caixa confere valor, forma de pagamento, título vinculado e data do recebimento."
      },
      {
        "stepId": "estornar",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "transition",
        "transitionRef": "estornar",
        "title": "Estornar recebimento",
        "description": "O caixa estorna o recebimento, permitido apenas no mesmo dia, e o saldo em aberto do título volta a ser recomposto."
      }
    ],
    "outcome": {
      "statement": "O recebimento fica estornado e o título volta a ter o saldo correspondente em aberto.",
      "evidence": [
        "Recebimento com situação estornado",
        "Saldo em aberto do título recomposto pelo valor estornado"
      ]
    }
  },
  "businessHash": "sha256:fc094dd1e9170aa123a7272ce932cdc29cce4a35966c8461f34d066e78429991"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type EstornarRecebimentoJourneyType = typeof estornarRecebimentoJourney;

export default estornarRecebimentoJourney;
