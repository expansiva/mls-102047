/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/registrarConclusaoOrdemManutencao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarConclusaoOrdemManutencaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarConclusaoOrdemManutencao",
  "business": {
    "actorRef": "gestor",
    "title": "Registrar conclusão da ordem de manutenção",
    "goal": "Atualizar uma ordem após a execução da manutenção.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdemManutencao",
        "kind": "locate",
        "entity": "MaintenanceOrder",
        "title": "x",
        "description": "Localiza, ou usa a ordem já em contexto, cuja manutenção foi executada."
      },
      {
        "stepId": "inspecionarOrdemManutencao",
        "kind": "inspect",
        "entity": "MaintenanceOrder",
        "title": "x",
        "description": "Confere oficina, descrição, custo e data de entrada registrados na ordem."
      },
      {
        "stepId": "atualizarOrdemConcluida",
        "kind": "act",
        "entity": "MaintenanceOrder",
        "effect": "update",
        "title": "x",
        "description": "Registra ou ajusta o custo e informa a data de saída da manutenção."
      }
    ],
    "outcome": {
      "statement": "A ordem de manutenção fica atualizada com a conclusão do serviço.",
      "evidence": [
        "Custo registrado ou atualizado na ordem.",
        "Data de saída registrada na ordem de manutenção."
      ]
    }
  },
  "businessHash": "sha256:c44e26a0f5ac7ff70fa33a8af35c5fd2a60fc4ddcd67ff3b8eae256f117afe2d"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarConclusaoOrdemManutencaoJourneyType = typeof registrarConclusaoOrdemManutencaoJourney;

export default registrarConclusaoOrdemManutencaoJourney;
