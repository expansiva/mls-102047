/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/verificarEntradaAluno.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const verificarEntradaAlunoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "verificarEntradaAluno",
  "business": {
    "actorRef": "recepcao",
    "title": "Verificar se o aluno pode entrar",
    "goal": "Saber se o aluno está liberado ou bloqueado por mensalidades vencidas.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "buscarAluno",
        "kind": "locate",
        "entity": "Aluno",
        "title": "Buscar aluno",
        "description": "A recepção busca o aluno pelo nome ou documento na chegada à academia."
      },
      {
        "stepId": "verSituacaoMatricula",
        "kind": "inspect",
        "entity": "Matricula",
        "title": "Ver situação da matrícula",
        "description": "A recepção vê se a matrícula está ativa ou bloqueada e quantas mensalidades estão vencidas."
      }
    ],
    "outcome": {
      "statement": "A recepção sabe se o aluno pode entrar ou precisa regularizar.",
      "evidence": [
        "A tela mostra a situação do aluno (liberado ou bloqueado) e as mensalidades vencidas."
      ]
    }
  },
  "businessHash": "sha256:9fed741b620faa6548d7658af47730ac03f0f7fbf02c575a38b8afec9aa71e8b"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type VerificarEntradaAlunoJourneyType = typeof verificarEntradaAlunoJourney;

export default verificarEntradaAlunoJourney;
