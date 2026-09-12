/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/matricularAlunoEmPlano.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const matricularAlunoEmPlanoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "matricularAlunoEmPlano",
  "business": {
    "actorRef": "recepcao",
    "title": "Matricular aluno em um plano",
    "goal": "Registrar a matrícula de um aluno em um plano a partir de uma data.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarAluno",
        "kind": "locate",
        "entity": "Aluno",
        "title": "Localizar ou cadastrar o aluno pelo documento ou contato.",
        "description": "Localiza o aluno existente ou inicia seu cadastro quando ele ainda não participa da academia."
      },
      {
        "stepId": "inspecionarPlano",
        "kind": "inspect",
        "entity": "Plano",
        "title": "Consultar planos disponíveis",
        "description": "Verifica a modalidade, o valor e o dia de vencimento dos planos disponíveis."
      },
      {
        "stepId": "registrarMatricula",
        "kind": "act",
        "entity": "Matricula",
        "affects": [
          "Aluno"
        ],
        "title": "Registrar matrícula",
        "description": "Vincula o aluno ao plano escolhido e informa a data de início da matrícula."
      }
    ],
    "outcome": {
      "statement": "O aluno fica matriculado no plano escolhido a partir da data informada.",
      "evidence": [
        "Matrícula registrada com aluno, plano e data de início.",
        "Aluno identificado como ativo para a geração de mensalidades."
      ]
    }
  },
  "businessHash": "sha256:8f7f1e680b48feaca1115abf6f10429d4555d013ae8d7c336f39a55bc7b8bc76"
} as const satisfies Ns5JourneyArtifact;

export type MatricularAlunoEmPlanoJourneyType = typeof matricularAlunoEmPlanoJourney;

export default matricularAlunoEmPlanoJourney;
