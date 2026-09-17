/// <mls fileReference="_102047_/l4/agendaClinica/journeys/confirmarConsulta.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const confirmarConsultaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "confirmarConsulta",
  "business": {
    "actorRef": "recepcionista",
    "title": "Confirmar consulta por telefone",
    "goal": "Registrar a confirmação telefônica de uma consulta agendada.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarConsulta",
        "kind": "locate",
        "entity": "Consulta",
        "title": "x",
        "description": "Localiza a consulta agendada que será confirmada."
      },
      {
        "stepId": "inspecionarConsulta",
        "kind": "inspect",
        "entity": "Consulta",
        "title": "x",
        "description": "Confere os dados da consulta e do contato do paciente."
      },
      {
        "stepId": "confirmarPorTelefone",
        "kind": "act",
        "entity": "Consulta",
        "effect": "transition",
        "transitionRef": "confirmarConsulta",
        "title": "x",
        "description": "Registra que a consulta foi confirmada por telefone."
      }
    ],
    "outcome": {
      "statement": "A consulta fica registrada como confirmada.",
      "evidence": [
        "Situação da consulta indica confirmação.",
        "Registro da consulta identifica a confirmação por telefone."
      ]
    }
  },
  "businessHash": "sha256:f8c610c5108e08e4d4ac982e762e76b5df8d477bc208a77cd7c8836e0ea2c492"
} as const satisfies Ns5JourneyArtifact;

export type ConfirmarConsultaJourneyType = typeof confirmarConsultaJourney;

export default confirmarConsultaJourney;
