/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/verificarAcessoAluno.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const verificarAcessoAlunoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "verificarAcessoAluno",
  "business": {
    "actorRef": "recepcao",
    "title": "Verificar entrada do aluno",
    "goal": "Conferir se o aluno pode entrar ou está bloqueado por mensalidades vencidas.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "buscarAlunoEntrada",
        "kind": "locate",
        "entity": "Aluno",
        "title": "Buscar aluno na entrada",
        "description": "A recepção localiza o aluno que deseja entrar na academia."
      },
      {
        "stepId": "verSituacaoMatricula",
        "kind": "inspect",
        "entity": "Matricula",
        "title": "Ver situação da matrícula",
        "description": "A recepção vê se a matrícula está ativa ou bloqueada e quais mensalidades estão vencidas."
      }
    ],
    "outcome": {
      "statement": "A recepção sabe se o aluno pode entrar ou precisa regularizar as mensalidades vencidas.",
      "evidence": [
        "Situação ativa ou bloqueada exibida",
        "Lista de mensalidades vencidas do aluno"
      ]
    }
  },
  "businessHash": "sha256:31de0b5188311cc4ee21ff7261465daceabcc8802dc0fb9b879b351892c2ee27"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type VerificarAcessoAlunoJourneyType = typeof verificarAcessoAlunoJourney;

export default verificarAcessoAlunoJourney;
