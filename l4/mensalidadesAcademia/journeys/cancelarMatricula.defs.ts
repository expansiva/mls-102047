/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/cancelarMatricula.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cancelarMatriculaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarMatricula",
  "business": {
    "actorRef": "aluno",
    "title": "Cancelar matrícula",
    "goal": "Encerrar a própria matrícula para interromper futuras mensalidades.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMinhaMatricula",
        "kind": "locate",
        "entity": "Matricula",
        "title": "Localizar minha matrícula",
        "description": "Acessa a matrícula vinculada ao próprio aluno."
      },
      {
        "stepId": "inspecionarMinhaMatricula",
        "kind": "inspect",
        "entity": "Matricula",
        "title": "Consultar matrícula",
        "description": "Confere o plano e a situação atual da matrícula antes do cancelamento."
      },
      {
        "stepId": "cancelarMinhaMatricula",
        "kind": "act",
        "entity": "Matricula",
        "title": "Cancelar matrícula",
        "description": "Registra o cancelamento da matrícula e encerra sua elegibilidade para gerações futuras de mensalidades."
      }
    ],
    "outcome": {
      "statement": "A matrícula do aluno é cancelada e não gera novas mensalidades.",
      "evidence": [
        "Matrícula registrada como cancelada.",
        "O aluno deixa de integrar as gerações futuras de mensalidades."
      ]
    }
  },
  "businessHash": "sha256:ee861ddc84914ebef171e41c7482c362f7a009eef8cf3bcb6fe5637324e6ea55"
} as const satisfies Ns5JourneyArtifact;

export type CancelarMatriculaJourneyType = typeof cancelarMatriculaJourney;

export default cancelarMatriculaJourney;
