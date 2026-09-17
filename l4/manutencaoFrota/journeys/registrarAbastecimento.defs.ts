/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/registrarAbastecimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarAbastecimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarAbastecimento",
  "business": {
    "actorRef": "motorista",
    "title": "Registrar abastecimento",
    "goal": "Registrar o abastecimento realizado em um veículo que dirige.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarVeiculoAtribuido",
        "kind": "locate",
        "entity": "Vehicle",
        "title": "x",
        "description": "Localiza, ou usa o veículo já em contexto, entre os veículos atribuídos ao motorista."
      },
      {
        "stepId": "inspecionarQuilometragemVeiculo",
        "kind": "inspect",
        "entity": "Vehicle",
        "title": "x",
        "description": "Confere o veículo e sua quilometragem atual antes do registro."
      },
      {
        "stepId": "criarAbastecimento",
        "kind": "act",
        "entity": "Fueling",
        "effect": "create",
        "title": "x",
        "description": "Registra data, litros, valor e quilometragem do painel do abastecimento para o veículo. O registro atualiza a quilometragem do veículo quando a leitura informada for mais recente."
      }
    ],
    "outcome": {
      "statement": "O abastecimento do veículo é registrado.",
      "evidence": [
        "Registro de abastecimento com data, litros, valor e quilometragem do painel.",
        "Abastecimento associado ao veículo atribuído ao motorista."
      ]
    }
  },
  "businessHash": "sha256:2acdf547e7201e1899688eca2e6692cf68601b88b6f5b5ca5a04c1077be02614"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarAbastecimentoJourneyType = typeof registrarAbastecimentoJourney;

export default registrarAbastecimentoJourney;
