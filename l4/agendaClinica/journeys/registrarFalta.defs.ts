/// <mls fileReference="_102047_/l4/agendaClinica/journeys/registrarFalta.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarFaltaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarFalta",
  "business": {
    "actorRef": "recepcionista",
    "title": "Registrar falta do paciente",
    "goal": "Informar que o paciente não compareceu à consulta.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarConsultaDoDia",
        "kind": "locate",
        "entity": "Consulta",
        "title": "x",
        "description": "Localiza a consulta do paciente que não compareceu."
      },
      {
        "stepId": "registrarNaoComparecimento",
        "kind": "act",
        "entity": "Consulta",
        "effect": "transition",
        "transitionRef": "registrarFalta",
        "title": "x",
        "description": "Marca a consulta como falta do paciente."
      }
    ],
    "outcome": {
      "statement": "O não comparecimento do paciente fica registrado na consulta.",
      "evidence": [
        "Situação da consulta indica falta do paciente."
      ]
    }
  },
  "businessHash": "sha256:906d7648c7182d023bdcfb78806d5be726418da8df0eb3ec71b0ed1acbc55439"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarFaltaJourneyType = typeof registrarFaltaJourney;

export default registrarFaltaJourney;
