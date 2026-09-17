/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/cancelarPropriaMatricula.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cancelarPropriaMatriculaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarPropriaMatricula",
  "business": {
    "actorRef": "aluno",
    "title": "Cancelar própria matrícula",
    "goal": "Encerrar a matrícula para impedir a geração de mensalidades futuras.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPropriaMatricula",
        "kind": "locate",
        "entity": "Matricula",
        "title": "x",
        "description": "Localiza a matrícula ativa do próprio aluno a partir do contexto da sua conta, com alternativa de busca quando necessário."
      },
      {
        "stepId": "consultarPropriaMatricula",
        "kind": "inspect",
        "entity": "Matricula",
        "title": "x",
        "description": "Confere o plano e a situação da matrícula antes do cancelamento."
      },
      {
        "stepId": "cancelarMatricula",
        "kind": "act",
        "entity": "Matricula",
        "effect": "transition",
        "transitionRef": "cancelarMatricula",
        "title": "x",
        "description": "Cancela a própria matrícula, encerrando sua elegibilidade para a geração de mensalidades futuras."
      }
    ],
    "outcome": {
      "statement": "A matrícula do aluno é cancelada e não gera novas mensalidades.",
      "evidence": [
        "A matrícula registra o cancelamento.",
        "A matrícula deixa de ser considerada ativa nas próximas gerações mensais."
      ]
    }
  },
  "businessHash": "sha256:e554d98e63ba436cbb8957d45052f9b7928d74028c0e475620517e8a35ee83ac"
} as const satisfies Ns5JourneyArtifact;

export type CancelarPropriaMatriculaJourneyType = typeof cancelarPropriaMatriculaJourney;

export default cancelarPropriaMatriculaJourney;
