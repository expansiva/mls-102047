/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/gerenciarPlanoPreventivo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const gerenciarPlanoPreventivoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "gerenciarPlanoPreventivo",
  "business": {
    "actorRef": "gestorFrota",
    "title": "Cadastrar plano de manutenção preventiva",
    "goal": "Definir ou atualizar a periodicidade de manutenção preventiva de um veículo.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarVeiculo",
        "kind": "locate",
        "entity": "Veiculo",
        "title": "Localizar veículo",
        "description": "Localiza o veículo para o qual será definido o plano preventivo."
      },
      {
        "stepId": "inspecionarPlanoExistente",
        "kind": "inspect",
        "entity": "PlanoManutencaoPreventiva",
        "title": "Inspecionar plano existente",
        "description": "Consulta o plano preventivo vigente do veículo, quando houver."
      },
      {
        "stepId": "registrarPlanoPreventivo",
        "kind": "act",
        "entity": "PlanoManutencaoPreventiva",
        "affects": [
          "Veiculo"
        ],
        "title": "Registrar plano preventivo",
        "description": "Cadastra ou atualiza a manutenção preventiva por intervalo de quilômetros ou de meses."
      }
    ],
    "outcome": {
      "statement": "O veículo passa a ter um plano preventivo com a periodicidade definida.",
      "evidence": [
        "Plano preventivo associado ao veículo.",
        "Intervalo de quilômetros ou de meses registrado no plano."
      ]
    }
  },
  "businessHash": "sha256:b1d65d50f110885daa6d3ea543be3e0a0074cd081ecb95c50998e015484169c3"
} as const satisfies Ns5JourneyArtifact;

export type GerenciarPlanoPreventivoJourneyType = typeof gerenciarPlanoPreventivoJourney;

export default gerenciarPlanoPreventivoJourney;
