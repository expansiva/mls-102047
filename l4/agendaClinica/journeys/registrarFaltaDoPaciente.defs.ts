/// <mls fileReference="_102047_/l4/agendaClinica/journeys/registrarFaltaDoPaciente.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarFaltaDoPacienteJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarFaltaDoPaciente",
  "business": {
    "actorRef": "recepcionista",
    "title": "Registrar falta do paciente",
    "goal": "Registrar que o paciente não compareceu à consulta agendada.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarConsultaParaFalta",
        "kind": "locate",
        "entity": "Consulta",
        "title": "Localizar consulta",
        "description": "Localiza a consulta cujo paciente não compareceu."
      },
      {
        "stepId": "registrarFalta",
        "kind": "act",
        "entity": "Consulta",
        "title": "Registrar falta",
        "description": "Marca a consulta como falta do paciente."
      }
    ],
    "outcome": {
      "statement": "A ausência do paciente fica registrada na consulta.",
      "evidence": [
        "Consulta marcada como falta do paciente."
      ]
    }
  },
  "businessHash": "sha256:9052fd77d35670137950ffb9191c074db00d74a19ca3b0a6d8f3aba9ccb238dc"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarFaltaDoPacienteJourneyType = typeof registrarFaltaDoPacienteJourney;

export default registrarFaltaDoPacienteJourney;
