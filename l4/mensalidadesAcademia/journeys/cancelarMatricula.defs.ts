/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/cancelarMatricula.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cancelarMatriculaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarMatricula",
  "business": {
    "actorRef": "recepcao",
    "title": "Cancelar matrícula do aluno",
    "goal": "Quando o aluno pede o cancelamento, a recepção localiza a matrícula ativa, confere sua situação e registra o cancelamento, encerrando a geração de mensalidades futuras.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMatriculaCancelar",
        "kind": "locate",
        "entity": "Matricula",
        "title": "Buscar matrícula do aluno",
        "description": "A recepção localiza a matrícula ativa do aluno que pediu o cancelamento."
      },
      {
        "stepId": "conferirMatriculaCancelar",
        "kind": "inspect",
        "entity": "Matricula",
        "title": "Conferir situação da matrícula",
        "description": "A recepção confere plano, data de início, situação e mensalidades em aberto ou vencidas da matrícula."
      },
      {
        "stepId": "registrarCancelamento",
        "kind": "act",
        "entity": "Matricula",
        "effect": "transition",
        "transitionRef": "cancelarMatricula",
        "title": "Cancelar matrícula",
        "description": "A recepção registra o cancelamento da matrícula, que deixa de receber mensalidades nas próximas gerações."
      }
    ],
    "outcome": {
      "statement": "A matrícula fica cancelada e não gera mais mensalidades futuras.",
      "evidence": [
        "Matrícula com situação cancelada",
        "Aluno ausente da próxima geração de mensalidades"
      ]
    }
  },
  "businessHash": "sha256:9690ba7bbd1d85fe40bf2e4fb50cf3f0257362a5133827d9899dbf553067bf37"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CancelarMatriculaJourneyType = typeof cancelarMatriculaJourney;

export default cancelarMatriculaJourney;
