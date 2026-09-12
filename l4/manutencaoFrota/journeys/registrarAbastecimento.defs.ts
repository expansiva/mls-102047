/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/registrarAbastecimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarAbastecimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarAbastecimento",
  "business": {
    "actorRef": "motorista",
    "title": "Registrar abastecimento de veículo",
    "goal": "Registrar o abastecimento de um veículo que dirige, com a quilometragem indicada no painel.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarVeiculoAtribuido",
        "kind": "locate",
        "entity": "Veiculo",
        "title": "Localizar veículo atribuído",
        "description": "Localiza, entre os veículos atribuídos ao motorista, o veículo abastecido."
      },
      {
        "stepId": "registrarAbastecimentoVeiculo",
        "kind": "act",
        "entity": "Abastecimento",
        "affects": [
          "Veiculo"
        ],
        "title": "Registrar abastecimento",
        "description": "Registra data, litros, valor e quilometragem do painel, atualizando a quilometragem atual do veículo."
      }
    ],
    "outcome": {
      "statement": "O abastecimento do veículo é registrado e sua quilometragem atual fica atualizada.",
      "evidence": [
        "Registro de abastecimento com data, litros, valor e quilometragem do painel.",
        "Quilometragem atual atualizada no veículo atribuído."
      ]
    }
  },
  "businessHash": "sha256:f34949991b8dfecca399af44a3704144d10a05a332acf3d470dd47236f57c87a"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarAbastecimentoJourneyType = typeof registrarAbastecimentoJourney;

export default registrarAbastecimentoJourney;
