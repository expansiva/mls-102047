/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/matricularAluno.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const matricularAlunoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "matricularAluno",
  "business": {
    "actorRef": "recepcao",
    "title": "Matricular aluno em plano",
    "goal": "Matricular um aluno em um plano a partir de uma data.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarAluno",
        "kind": "locate",
        "entity": "Aluno",
        "title": "Localizar ou cadastrar aluno",
        "description": "A recepção busca o aluno pelo nome ou documento; se não existir, informa seus dados para cadastrá-lo."
      },
      {
        "stepId": "escolherPlano",
        "kind": "locate",
        "entity": "Plano",
        "title": "Escolher plano",
        "description": "A recepção seleciona o plano desejado, vendo periodicidade, valor e dia de vencimento."
      },
      {
        "stepId": "criarMatricula",
        "kind": "act",
        "entity": "Matricula",
        "effect": "create",
        "title": "Confirmar matrícula",
        "description": "A recepção registra a matrícula do aluno no plano escolhido com a data de início, deixando-a ativa."
      }
    ],
    "outcome": {
      "statement": "O aluno está matriculado e ativo no plano a partir da data informada.",
      "evidence": [
        "A matrícula aparece ativa com aluno, plano e data de início.",
        "O aluno passa a contar entre os alunos ativos."
      ]
    }
  },
  "businessHash": "sha256:c1dd45173ce8bee5fc72ca483b6ad67e615a8f6a090bb5603e896b2019abebcf"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type MatricularAlunoJourneyType = typeof matricularAlunoJourney;

export default matricularAlunoJourney;
