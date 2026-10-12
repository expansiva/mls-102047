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
        "description": "O caixa localiza o recebimento registrado hoje pelo título ou pagador."
      },
      {
        "stepId": "conferirRecebimento",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "Conferir recebimento",
        "description": "O caixa confere valor, forma de pagamento, data e título do recebimento."
      },
      {
        "stepId": "estornar",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "transition",
        "transitionRef": "estornar",
        "title": "Estornar recebimento",
        "description": "O caixa estorna o recebimento, permitido apenas no mesmo dia; o valor volta ao saldo em aberto do título."
      }
    ],
    "outcome": {
      "statement": "O recebimento está estornado e o título voltou a ter o saldo correspondente em aberto.",
      "evidence": [
        "Recebimento com situação estornado",
        "Saldo em aberto do título acrescido do valor estornado"
      ]
    }
  },
  "businessHash": "sha256:9dce3d6bfdd693a963b880919e9e8f42ca58200020fdb641dc93b88837d1d15a"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type EstornarRecebimentoJourneyType = typeof estornarRecebimentoJourney;

export default estornarRecebimentoJourney;
