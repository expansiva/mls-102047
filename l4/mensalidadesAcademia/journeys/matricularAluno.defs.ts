/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/matricularAluno.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const matricularAlunoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "matricularAluno",
  "business": {
    "actorRef": "recepcao",
    "title": "Matricular aluno em plano",
    "goal": "Registrar o aluno e matriculá-lo em um plano a partir de uma data.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarAluno",
        "kind": "locate",
        "entity": "Aluno",
        "title": "Buscar aluno",
        "description": "A recepção procura o aluno pelo nome ou documento para verificar se já está cadastrado."
      },
      {
        "stepId": "registrarAluno",
        "kind": "act",
        "entity": "Aluno",
        "effect": "create",
        "title": "Cadastrar aluno",
        "description": "Quando o aluno não existe, a recepção registra seus dados de identificação e contato."
      },
      {
        "stepId": "escolherPlano",
        "kind": "locate",
        "entity": "Plano",
        "title": "Escolher plano",
        "description": "A recepção seleciona o plano desejado pelo aluno entre mensal, trimestral e anual."
      },
      {
        "stepId": "criarMatricula",
        "kind": "act",
        "entity": "Matricula",
        "effect": "create",
        "title": "Confirmar matrícula",
        "description": "A recepção cria a matrícula do aluno no plano escolhido informando a data de início, deixando-a ativa."
      }
    ],
    "outcome": {
      "statement": "O aluno fica com matrícula ativa no plano a partir da data informada.",
      "evidence": [
        "Matrícula ativa vinculada ao aluno e ao plano",
        "Data de início registrada na matrícula"
      ]
    }
  },
  "businessHash": "sha256:23c51a6e556b95d660eb82e557930b81020ac258c05474b5275ae4cbc49b2258"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type MatricularAlunoJourneyType = typeof matricularAlunoJourney;

export default matricularAlunoJourney;
