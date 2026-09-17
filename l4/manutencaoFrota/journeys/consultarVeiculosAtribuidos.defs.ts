/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/consultarVeiculosAtribuidos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarVeiculosAtribuidosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarVeiculosAtribuidos",
  "business": {
    "actorRef": "motorista",
    "title": "Consultar veículos atribuídos",
    "goal": "Ver os dados dos veículos que estão atribuídos a si.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarVeiculosAtribuidos",
        "kind": "locate",
        "entity": "Vehicle",
        "title": "x",
        "description": "Localiza os veículos atribuídos ao próprio motorista."
      },
      {
        "stepId": "inspecionarVeiculo",
        "kind": "inspect",
        "entity": "Vehicle",
        "title": "x",
        "description": "Consulta placa, modelo, ano e quilometragem atual de um veículo atribuído."
      }
    ],
    "outcome": {
      "statement": "O motorista consulta os veículos sob sua condução.",
      "evidence": [
        "Lista de veículos atribuídos apresentada ao motorista.",
        "Dados do veículo selecionado disponíveis para consulta."
      ]
    }
  },
  "businessHash": "sha256:1fc63d04b3d79589c5e28e56f2507386b73f38f18ec0156f2d24fcd691465649"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarVeiculosAtribuidosJourneyType = typeof consultarVeiculosAtribuidosJourney;

export default consultarVeiculosAtribuidosJourney;
