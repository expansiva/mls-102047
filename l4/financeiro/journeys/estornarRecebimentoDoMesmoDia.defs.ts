/// <mls fileReference="_102047_/l4/financeiro/journeys/estornarRecebimentoDoMesmoDia.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const estornarRecebimentoDoMesmoDiaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "estornarRecebimentoDoMesmoDia",
  "business": {
    "actorRef": "caixa",
    "title": "Estornar recebimento do mesmo dia",
    "goal": "Cancelar um recebimento registrado no mesmo dia e recompor o saldo do título.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarRecebimentoDoDia",
        "kind": "locate",
        "entity": "Recebimento",
        "title": "Localizar recebimento do dia",
        "description": "Localizar o recebimento registrado no mesmo dia que será estornado."
      },
      {
        "stepId": "conferirRecebimentoEtitulo",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "Conferir recebimento e título",
        "description": "Conferir o recebimento e o título vinculado antes do estorno."
      },
      {
        "stepId": "estornarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "affects": [
          "TituloReceber"
        ],
        "effect": "transition",
        "transitionRef": "estornarRecebimento",
        "title": "Estornar recebimento",
        "description": "Estornar o recebimento registrado no mesmo dia."
      }
    ],
    "outcome": {
      "statement": "O recebimento é estornado e o saldo do título é recomposto.",
      "evidence": [
        "Recebimento identificado como estornado.",
        "Saldo do título atualizado após o estorno."
      ]
    }
  },
  "businessHash": "sha256:d3111914db144f53e208f3165e090d83de215d9433d0bacdb2c1aea6144cf348"
} as const satisfies Ns5JourneyArtifact;

export type EstornarRecebimentoDoMesmoDiaJourneyType = typeof estornarRecebimentoDoMesmoDiaJourney;

export default estornarRecebimentoDoMesmoDiaJourney;
