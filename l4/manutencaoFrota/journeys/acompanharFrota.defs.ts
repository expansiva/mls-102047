/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/acompanharFrota.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharFrotaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharFrota",
  "business": {
    "actorRef": "gestor",
    "title": "Acompanhar preventivas da frota",
    "goal": "Ver quais veículos passaram do km previsto da próxima preventiva.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "listarVencidos",
        "kind": "locate",
        "entity": "PlanoManutencao",
        "title": "Listar preventivas vencidas",
        "description": "O gestor lista os planos cujo veículo passou do km previsto ou do prazo."
      },
      {
        "stepId": "verVeiculoFrota",
        "kind": "inspect",
        "entity": "Veiculo",
        "title": "Ver situação do veículo",
        "description": "O gestor consulta quilometragem, abastecimentos e ordens de manutenção do veículo."
      }
    ],
    "outcome": {
      "statement": "O gestor sabe quais veículos estão com preventiva vencida.",
      "evidence": [
        "A lista mostra os veículos com preventiva vencida e o km excedido"
      ]
    }
  },
  "businessHash": "sha256:5a08f3caf2bcfc976e8425caed46e78d73fda349f73446c30b2ba175cc72aad0"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharFrotaJourneyType = typeof acompanharFrotaJourney;

export default acompanharFrotaJourney;
