/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/cadastrarVeiculo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cadastrarVeiculoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarVeiculo",
  "business": {
    "actorRef": "gestor",
    "title": "Cadastrar veículo",
    "goal": "Cadastrar um veículo da frota e atribuí-lo a um motorista.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "criarVeiculo",
        "kind": "act",
        "entity": "Veiculo",
        "effect": "create",
        "title": "Cadastrar novo veículo",
        "description": "O gestor informa placa, modelo, ano e quilometragem atual do veículo."
      },
      {
        "stepId": "atribuirMotorista",
        "kind": "act",
        "entity": "Veiculo",
        "effect": "update",
        "title": "Atribuir motorista",
        "description": "O gestor atribui o veículo ao motorista que irá dirigi-lo."
      }
    ],
    "outcome": {
      "statement": "O veículo está cadastrado na frota e atribuído a um motorista.",
      "evidence": [
        "O veículo aparece na lista da frota com placa, modelo, ano e quilometragem",
        "O motorista atribuído passa a ver o veículo"
      ]
    }
  },
  "businessHash": "sha256:47322fe58a4c5d9a47c91eda4a34333e5ae365b9deb9e1ece0155c3156a1f040"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CadastrarVeiculoJourneyType = typeof cadastrarVeiculoJourney;

export default cadastrarVeiculoJourney;
