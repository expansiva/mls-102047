/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/abrirOrdemPorDefeito.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirOrdemPorDefeitoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirOrdemPorDefeito",
  "business": {
    "actorRef": "gestor",
    "title": "Abrir ordem de manutenção por defeito",
    "goal": "Registrar uma ordem de manutenção para tratar um defeito informado ou identificado em um veículo.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarVeiculoComDefeito",
        "kind": "locate",
        "entity": "Vehicle",
        "title": "x",
        "description": "Localiza, ou usa o veículo já em contexto, que apresenta o defeito."
      },
      {
        "stepId": "inspecionarVeiculoComDefeito",
        "kind": "inspect",
        "entity": "Vehicle",
        "title": "x",
        "description": "Consulta os dados e a quilometragem do veículo antes de abrir a ordem."
      },
      {
        "stepId": "criarOrdemPorDefeito",
        "kind": "act",
        "entity": "MaintenanceOrder",
        "effect": "create",
        "title": "x",
        "description": "Abre a ordem de manutenção com oficina, descrição do defeito, custo quando disponível e data de entrada."
      }
    ],
    "outcome": {
      "statement": "Uma ordem de manutenção é aberta para o defeito do veículo.",
      "evidence": [
        "Ordem vinculada ao veículo com oficina e descrição.",
        "Data de entrada registrada na ordem."
      ]
    }
  },
  "businessHash": "sha256:011d9c9526b8d2f862acf1573d2bec103714a11ae2d80dc4b9f4ef58601c5c01"
} as const satisfies Ns5JourneyArtifact;

export type AbrirOrdemPorDefeitoJourneyType = typeof abrirOrdemPorDefeitoJourney;

export default abrirOrdemPorDefeitoJourney;
