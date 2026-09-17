/// <mls fileReference="_102047_/l4/financeiro/journeys/estornarRecebimentoNoMesmoDia.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const estornarRecebimentoNoMesmoDiaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "estornarRecebimentoNoMesmoDia",
  "business": {
    "actorRef": "caixa",
    "title": "Estornar recebimento no mesmo dia",
    "goal": "Cancelar um recebimento registrado no dia quando ele precisar ser revertido.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarRecebimento",
        "kind": "locate",
        "entity": "Recebimento",
        "title": "Localizar recebimento",
        "description": "Localiza o recebimento do dia a ser estornado, a partir do contexto ou por consulta entre os recebimentos da organização."
      },
      {
        "stepId": "inspecionarRecebimento",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "Conferir recebimento",
        "description": "Confere o título, o valor, a forma de pagamento e a data do recebimento antes do estorno."
      },
      {
        "stepId": "estornarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "transition",
        "transitionRef": "estornarRecebimento",
        "title": "Estornar recebimento",
        "description": "Estorna o recebimento realizado no mesmo dia, recompondo o saldo correspondente do título."
      }
    ],
    "outcome": {
      "statement": "O recebimento do dia é estornado e o valor correspondente volta a compor o saldo do título.",
      "evidence": [
        "O recebimento está marcado como estornado.",
        "O saldo do título reflete a reversão do recebimento."
      ]
    }
  },
  "businessHash": "sha256:cac403c77422586e64c40abcf7ed92d584e094470eb615bd940d710a348451b6"
} as const satisfies Ns5JourneyArtifact;

export type EstornarRecebimentoNoMesmoDiaJourneyType = typeof estornarRecebimentoNoMesmoDiaJourney;

export default estornarRecebimentoNoMesmoDiaJourney;
