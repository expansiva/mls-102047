/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/manterPlanos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const manterPlanosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "manterPlanos",
  "business": {
    "actorRef": "gerencia",
    "title": "Manter planos da academia",
    "goal": "Cadastrar e ajustar os planos mensal, trimestral e anual com valor e dia de vencimento.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarPlanos",
        "kind": "locate",
        "entity": "Plano",
        "title": "Listar planos",
        "description": "A gerência consulta os planos cadastrados."
      },
      {
        "stepId": "cadastrarPlano",
        "kind": "act",
        "entity": "Plano",
        "effect": "create",
        "title": "Cadastrar plano",
        "description": "A gerência cria um plano informando periodicidade (mensal, trimestral ou anual), valor e dia de vencimento."
      },
      {
        "stepId": "ajustarPlano",
        "kind": "act",
        "entity": "Plano",
        "effect": "update",
        "title": "Ajustar valor e vencimento",
        "description": "A gerência altera o valor ou o dia de vencimento de um plano existente."
      }
    ],
    "outcome": {
      "statement": "Os planos estão disponíveis para matrícula com valor e dia de vencimento definidos.",
      "evidence": [
        "Plano aparece na lista com periodicidade, valor e dia de vencimento"
      ]
    }
  },
  "businessHash": "sha256:22d45459fe67e2ad3fc021da6db0d7b76b24d5897f1b942c459b828e11e6047f"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ManterPlanosJourneyType = typeof manterPlanosJourney;

export default manterPlanosJourney;
