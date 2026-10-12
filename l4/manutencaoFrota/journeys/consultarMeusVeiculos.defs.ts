/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/consultarMeusVeiculos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const consultarMeusVeiculosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMeusVeiculos",
  "business": {
    "actorRef": "motorista",
    "title": "Consultar meus veículos",
    "goal": "Ver os veículos atribuídos a mim e seus abastecimentos.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "listarMeusVeiculos",
        "kind": "locate",
        "entity": "Veiculo",
        "title": "Listar meus veículos",
        "description": "O motorista vê apenas os veículos atribuídos a ele."
      },
      {
        "stepId": "verVeiculo",
        "kind": "inspect",
        "entity": "Veiculo",
        "title": "Ver detalhes do veículo",
        "description": "O motorista consulta placa, modelo, ano, quilometragem atual e os abastecimentos registrados."
      }
    ],
    "outcome": {
      "statement": "O motorista consulta somente os veículos atribuídos a ele.",
      "evidence": [
        "A lista mostra apenas veículos atribuídos ao motorista",
        "Os abastecimentos do veículo são exibidos no detalhe"
      ]
    }
  },
  "businessHash": "sha256:156ec8a204aff1bce14c809cde3c77fd2c3f9719b51deebd53a42a956ef68baf"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ConsultarMeusVeiculosJourneyType = typeof consultarMeusVeiculosJourney;

export default consultarMeusVeiculosJourney;
