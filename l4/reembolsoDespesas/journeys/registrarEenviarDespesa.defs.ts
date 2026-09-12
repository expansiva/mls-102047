/// <mls fileReference="_102047_/l4/reembolsoDespesas/journeys/registrarEenviarDespesa.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarEenviarDespesaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarEenviarDespesa",
  "business": {
    "actorRef": "colaborador",
    "title": "Registrar e enviar despesa para reembolso",
    "goal": "Registrar uma despesa própria com comprovante e enviá-la para aprovação.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "registrarDespesa",
        "kind": "act",
        "entity": "Despesa",
        "title": "Registrar despesa",
        "description": "Registra a data, categoria, valor, descrição e comprovante da despesa."
      },
      {
        "stepId": "enviarParaAprovacao",
        "kind": "act",
        "entity": "Despesa",
        "title": "Enviar para aprovação",
        "description": "Envia a despesa registrada para avaliação do gestor da equipe."
      }
    ],
    "outcome": {
      "statement": "A despesa é registrada e enviada para aprovação.",
      "evidence": [
        "A despesa contém data, categoria, valor, descrição e comprovante.",
        "A despesa fica disponível para avaliação do gestor da equipe."
      ]
    }
  },
  "businessHash": "sha256:2455a6da0ac5d46289240f9885d5a96719c2210dae14d52156835833137bd570"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarEenviarDespesaJourneyType = typeof registrarEenviarDespesaJourney;

export default registrarEenviarDespesaJourney;
