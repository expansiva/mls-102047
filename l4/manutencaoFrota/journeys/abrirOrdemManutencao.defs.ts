/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/abrirOrdemManutencao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirOrdemManutencaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirOrdemManutencao",
  "business": {
    "actorRef": "gestorFrota",
    "title": "Abrir ordem de manutenção",
    "goal": "Abrir uma ordem de manutenção para um veículo por vencimento preventivo ou defeito identificado.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarVeiculoParaManutencao",
        "kind": "locate",
        "entity": "Veiculo",
        "title": "Localizar veículo",
        "description": "Localiza o veículo que necessita de manutenção."
      },
      {
        "stepId": "inspecionarSituacaoPreventiva",
        "kind": "inspect",
        "entity": "PlanoManutencaoPreventiva",
        "title": "Inspecionar situação preventiva",
        "description": "Consulta a situação do plano preventivo e a quilometragem do veículo quando a manutenção for motivada por vencimento."
      },
      {
        "stepId": "abrirOrdem",
        "kind": "act",
        "entity": "OrdemManutencao",
        "affects": [
          "Veiculo",
          "PlanoManutencaoPreventiva"
        ],
        "title": "Abrir ordem de manutenção",
        "description": "Abre a ordem com oficina, descrição do defeito ou serviço preventivo e data de entrada."
      }
    ],
    "outcome": {
      "statement": "Uma ordem de manutenção é aberta para o veículo.",
      "evidence": [
        "Ordem vinculada ao veículo com oficina, descrição e data de entrada.",
        "Motivo da ordem registrado como vencimento preventivo ou defeito."
      ]
    }
  },
  "businessHash": "sha256:6c6649e0230954d2b5d260034c228af957f65481c8497134927a929141430c59"
} as const satisfies Ns5JourneyArtifact;

export type AbrirOrdemManutencaoJourneyType = typeof abrirOrdemManutencaoJourney;

export default abrirOrdemManutencaoJourney;
