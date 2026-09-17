/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/tratarAlertaPreventivaVencida.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const tratarAlertaPreventivaVencidaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "tratarAlertaPreventivaVencida",
  "business": {
    "actorRef": "gestor",
    "title": "Tratar alerta de manutenção preventiva vencida",
    "goal": "Abrir uma ordem de manutenção quando um veículo ultrapassar a quilometragem prevista para a preventiva.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "inspecionarPlanoEmAtraso",
        "kind": "inspect",
        "entity": "MaintenancePlan",
        "title": "x",
        "description": "Consulta o plano alertado, a quilometragem prevista e a quilometragem atual do veículo."
      },
      {
        "stepId": "inspecionarVeiculoAlertado",
        "kind": "inspect",
        "entity": "Vehicle",
        "title": "x",
        "description": "Confere os dados do veículo associado ao plano em atraso."
      },
      {
        "stepId": "criarOrdemPreventiva",
        "kind": "act",
        "entity": "MaintenanceOrder",
        "effect": "create",
        "title": "x",
        "description": "Abre uma ordem de manutenção preventiva para o veículo, informando oficina, descrição, custo quando disponível e data de entrada."
      }
    ],
    "outcome": {
      "statement": "A manutenção preventiva vencida é encaminhada por uma ordem de manutenção.",
      "evidence": [
        "Alerta de quilometragem vencida consultado pelo gestor.",
        "Ordem de manutenção preventiva vinculada ao veículo e ao plano."
      ]
    }
  },
  "businessHash": "sha256:04ca7e2189b53b9a1cf9b269760823564b03c1367beeb08099883c5e6d4b961c"
} as const satisfies Ns5JourneyArtifact;

export type TratarAlertaPreventivaVencidaJourneyType = typeof tratarAlertaPreventivaVencidaJourney;

export default tratarAlertaPreventivaVencidaJourney;
