/// <mls fileReference="_102047_/l4/agendaClinica/journeys/registrarAtendimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarAtendimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarAtendimento",
  "business": {
    "actorRef": "profissional",
    "title": "Registrar atendimento",
    "goal": "Marcar uma consulta como atendida e registrar uma anotação do atendimento.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarConsulta",
        "kind": "locate",
        "entity": "Consulta",
        "title": "x",
        "description": "Localiza uma consulta da própria agenda."
      },
      {
        "stepId": "inspecionarConsulta",
        "kind": "inspect",
        "entity": "Consulta",
        "title": "x",
        "description": "Confere os dados da consulta antes de registrar o atendimento."
      },
      {
        "stepId": "registrarAtendimentoRealizado",
        "kind": "act",
        "entity": "Consulta",
        "effect": "transition",
        "transitionRef": "registrarAtendimento",
        "title": "x",
        "description": "Marca a consulta como atendida e registra a anotação do profissional."
      }
    ],
    "outcome": {
      "statement": "A consulta fica registrada como atendida com a anotação do profissional.",
      "evidence": [
        "Situação da consulta indica atendimento realizado.",
        "Anotação do atendimento está registrada na consulta."
      ]
    }
  },
  "businessHash": "sha256:d442d56c8d3344d80b1afa087bcfdc78e630f7c65e0061853f3d3974d872b0c4"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarAtendimentoJourneyType = typeof registrarAtendimentoJourney;

export default registrarAtendimentoJourney;
