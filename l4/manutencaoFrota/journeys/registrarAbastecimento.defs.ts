/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/registrarAbastecimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const registrarAbastecimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarAbastecimento",
  "business": {
    "actorRef": "motorista",
    "title": "Registrar abastecimento",
    "goal": "Registrar o abastecimento do veículo que estou dirigindo, com data, litros, valor e km no painel.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarVeiculo",
        "kind": "locate",
        "entity": "Veiculo",
        "title": "Escolher meu veículo",
        "description": "O motorista localiza, entre os veículos atribuídos a ele, o veículo que está dirigindo."
      },
      {
        "stepId": "conferirVeiculo",
        "kind": "inspect",
        "entity": "Veiculo",
        "title": "Conferir dados do veículo",
        "description": "O motorista confere placa, modelo e quilometragem atual do veículo."
      },
      {
        "stepId": "lancarAbastecimento",
        "kind": "act",
        "entity": "Abastecimento",
        "effect": "create",
        "title": "Lançar abastecimento",
        "description": "O motorista informa data, litros, valor e km no painel; a quilometragem atual do veículo passa a refletir o km informado."
      }
    ],
    "outcome": {
      "statement": "O abastecimento fica registrado para o veículo e a quilometragem atual do veículo é atualizada.",
      "evidence": [
        "O abastecimento aparece no histórico do veículo com data, litros, valor e km no painel",
        "A quilometragem atual do veículo mostra o km informado"
      ]
    }
  },
  "businessHash": "sha256:c98f30305192fe5680e907419c8686d8c8edc1e88fa2394d3977113494605413"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RegistrarAbastecimentoJourneyType = typeof registrarAbastecimentoJourney;

export default registrarAbastecimentoJourney;
