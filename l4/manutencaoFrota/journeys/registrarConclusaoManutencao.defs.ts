/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/registrarConclusaoManutencao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarConclusaoManutencaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarConclusaoManutencao",
  "business": {
    "actorRef": "gestorFrota",
    "title": "Registrar conclusão de manutenção",
    "goal": "Registrar o custo e a saída do veículo após a execução da manutenção.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdemAberta",
        "kind": "locate",
        "entity": "OrdemManutencao",
        "title": "Localizar ordem de manutenção",
        "description": "Localiza a ordem de manutenção do veículo que retornou da oficina."
      },
      {
        "stepId": "inspecionarOrdem",
        "kind": "inspect",
        "entity": "OrdemManutencao",
        "title": "Inspecionar ordem",
        "description": "Confere os dados registrados da ordem, incluindo veículo, oficina e descrição do serviço."
      },
      {
        "stepId": "registrarSaidaEcusto",
        "kind": "act",
        "entity": "OrdemManutencao",
        "affects": [
          "Veiculo",
          "PlanoManutencaoPreventiva"
        ],
        "title": "Registrar saída e custo",
        "description": "Registra o custo da manutenção e a data de saída do veículo da oficina."
      }
    ],
    "outcome": {
      "statement": "A ordem de manutenção contém o custo e a data de saída do veículo.",
      "evidence": [
        "Custo registrado na ordem de manutenção.",
        "Data de saída registrada para o veículo."
      ]
    }
  },
  "businessHash": "sha256:da443bd95eb53d7e1a259e04cb75badbca2ca74e46f2236ac3f056d94092695d"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarConclusaoManutencaoJourneyType = typeof registrarConclusaoManutencaoJourney;

export default registrarConclusaoManutencaoJourney;
