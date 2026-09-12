/// <mls fileReference="_102047_/l4/agendaClinica/journeys/confirmarConsultaPorTelefone.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const confirmarConsultaPorTelefoneJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "confirmarConsultaPorTelefone",
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
        "title": "Localizar consulta",
        "description": "Localiza a consulta agendada que será confirmada por telefone."
      },
      {
        "stepId": "consultarDadosDaConsulta",
        "kind": "inspect",
        "entity": "Consulta",
        "title": "Consultar dados da consulta",
        "description": "Verifica os dados da consulta e do paciente para realizar o contato telefônico."
      },
      {
        "stepId": "registrarConfirmacao",
        "kind": "act",
        "entity": "Consulta",
        "title": "Registrar confirmação",
        "description": "Registra que a consulta foi confirmada por telefone."
      }
    ],
    "outcome": {
      "statement": "A confirmação telefônica da consulta fica registrada.",
      "evidence": [
        "Consulta identificada como confirmada por telefone."
      ]
    }
  },
  "businessHash": "sha256:ff9bb0afc8184aa8692ac269c1c4a6b5436aba98cc031ae4727b20e449d5dbad"
} as const satisfies Ns5JourneyArtifact;

export type ConfirmarConsultaPorTelefoneJourneyType = typeof confirmarConsultaPorTelefoneJourney;

export default confirmarConsultaPorTelefoneJourney;
