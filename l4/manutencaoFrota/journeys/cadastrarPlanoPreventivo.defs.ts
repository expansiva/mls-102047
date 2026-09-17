/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/cadastrarPlanoPreventivo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarPlanoPreventivoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarPlanoPreventivo",
  "business": {
    "actorRef": "gestor",
    "title": "Cadastrar plano de manutenção preventiva",
    "goal": "Definir a periodicidade de manutenção preventiva de um veículo.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarVeiculo",
        "kind": "locate",
        "entity": "Vehicle",
        "title": "x",
        "description": "Localiza, ou usa o veículo já em contexto, para o qual será definido o plano."
      },
      {
        "stepId": "inspecionarVeiculoParaPlano",
        "kind": "inspect",
        "entity": "Vehicle",
        "title": "x",
        "description": "Consulta os dados e a quilometragem atual do veículo para definir a preventiva."
      },
      {
        "stepId": "criarPlanoPreventivo",
        "kind": "act",
        "entity": "MaintenancePlan",
        "effect": "create",
        "title": "x",
        "description": "Cadastra o plano preventivo do veículo com a periodicidade por quilometragem, por meses, ou ambas."
      }
    ],
    "outcome": {
      "statement": "O veículo passa a ter um plano de manutenção preventiva cadastrado.",
      "evidence": [
        "Plano preventivo associado ao veículo.",
        "Periodicidade em quilômetros e/ou meses registrada."
      ]
    }
  },
  "businessHash": "sha256:c164ef0eccb7bde66e87fdde03d4f0010eb20d241566f744c6d63c8b6e19ea8e"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarPlanoPreventivoJourneyType = typeof cadastrarPlanoPreventivoJourney;

export default cadastrarPlanoPreventivoJourney;
