/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/matricularAlunoEmPlano.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const matricularAlunoEmPlanoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "matricularAlunoEmPlano",
  "business": {
    "actorRef": "recepcao",
    "title": "Matricular aluno em um plano",
    "goal": "Registrar a matrícula de um aluno em um plano da academia a partir de uma data.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarAluno",
        "kind": "locate",
        "entity": "Aluno",
        "title": "x",
        "description": "Localiza o aluno cadastrado ou informa os dados necessários para identificá-lo e vinculá-lo à academia."
      },
      {
        "stepId": "consultarPlano",
        "kind": "inspect",
        "entity": "Plano",
        "title": "x",
        "description": "Confere o tipo, o valor e o dia de vencimento do plano escolhido."
      },
      {
        "stepId": "registrarMatricula",
        "kind": "act",
        "entity": "Matricula",
        "effect": "create",
        "title": "x",
        "description": "Registra a matrícula com o aluno, o plano e a data de início; se necessário, o aluno é criado ou vinculado como participante da academia."
      }
    ],
    "outcome": {
      "statement": "O aluno fica matriculado no plano selecionado a partir da data informada.",
      "evidence": [
        "Existe uma matrícula vinculando o aluno ao plano com a data de início registrada.",
        "A matrícula passa a compor a base de alunos ativos para geração de mensalidades."
      ]
    }
  },
  "businessHash": "sha256:98b885f9a578b083a45db38a227c9d879eca62b135b88cbc1cf27c7d4553c55d"
} as const satisfies Ns5JourneyArtifact;

export type MatricularAlunoEmPlanoJourneyType = typeof matricularAlunoEmPlanoJourney;

export default matricularAlunoEmPlanoJourney;
