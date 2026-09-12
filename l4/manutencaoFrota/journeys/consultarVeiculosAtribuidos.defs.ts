/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/consultarVeiculosAtribuidos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarVeiculosAtribuidosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarVeiculosAtribuidos",
  "business": {
    "actorRef": "motorista",
    "title": "Consultar veículos atribuídos",
    "goal": "Ver somente os veículos atribuídos para condução.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMeusVeiculos",
        "kind": "locate",
        "entity": "Veiculo",
        "title": "Localizar veículos atribuídos",
        "description": "Localiza os veículos atribuídos ao motorista."
      },
      {
        "stepId": "inspecionarVeiculoAtribuido",
        "kind": "inspect",
        "entity": "Veiculo",
        "title": "Inspecionar veículo",
        "description": "Consulta placa, modelo, ano e quilometragem atual do veículo atribuído."
      }
    ],
    "outcome": {
      "statement": "O motorista consulta os dados dos veículos que lhe foram atribuídos.",
      "evidence": [
        "Lista limitada aos veículos atribuídos ao motorista.",
        "Dados de placa, modelo, ano e quilometragem atual disponíveis para consulta."
      ]
    }
  },
  "businessHash": "sha256:10b42187c0affb2e47be1fd0258dfdbdb650f357526919612fd56539aae35cf4"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarVeiculosAtribuidosJourneyType = typeof consultarVeiculosAtribuidosJourney;

export default consultarVeiculosAtribuidosJourney;
