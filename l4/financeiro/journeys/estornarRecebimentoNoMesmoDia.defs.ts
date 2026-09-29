/// <mls fileReference="_102047_/l4/financeiro/journeys/estornarRecebimentoNoMesmoDia.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const estornarRecebimentoNoMesmoDiaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "estornarRecebimentoNoMesmoDia",
  "business": {
    "actorRef": "caixa",
    "title": "Estornar um recebimento no mesmo dia",
    "goal": "Cancelar um recebimento lançado indevidamente no dia do seu registro.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarRecebimentoDoDia",
        "kind": "locate",
        "entity": "Recebimento",
        "title": "x",
        "description": "Localiza o recebimento registrado no mesmo dia que precisa ser estornado."
      },
      {
        "stepId": "conferirRecebimentoDoDia",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "x",
        "description": "Confere o título, o valor e a data do recebimento antes do estorno."
      },
      {
        "stepId": "estornarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "transition",
        "transitionRef": "estornarRecebimento",
        "title": "x",
        "description": "Estorna o recebimento no mesmo dia, recompondo o saldo do título correspondente."
      }
    ],
    "outcome": {
      "statement": "O recebimento do dia é estornado e o saldo do título é recomposto.",
      "evidence": [
        "Recebimento identificado como estornado.",
        "Saldo pendente do título atualizado."
      ]
    }
  },
  "businessHash": "sha256:a368b563a1e04d20ede48e752d3b8682cffcce9942a3d5be8982953e37494f42"
} as const satisfies Ns5JourneyArtifact;

export type EstornarRecebimentoNoMesmoDiaJourneyType = typeof estornarRecebimentoNoMesmoDiaJourney;

export default estornarRecebimentoNoMesmoDiaJourney;
