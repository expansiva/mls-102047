/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/gerarMensalidadesDoMes.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const gerarMensalidadesDoMesJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "gerarMensalidadesDoMes",
  "business": {
    "actorRef": "gerencia",
    "title": "Gerar mensalidades do mês",
    "goal": "Criar as mensalidades mensais dos alunos com matrícula ativa.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMatriculasAtivas",
        "kind": "locate",
        "entity": "Matricula",
        "title": "x",
        "description": "Localiza as matrículas ativas que devem ter mensalidade gerada para a competência do mês."
      },
      {
        "stepId": "gerarMensalidades",
        "kind": "act",
        "entity": "Mensalidade",
        "effect": "create",
        "title": "x",
        "description": "Gera uma mensalidade para cada aluno com matrícula ativa, usando o valor do plano e o respectivo dia de vencimento."
      }
    ],
    "outcome": {
      "statement": "As mensalidades da competência são disponibilizadas para cobrança dos alunos ativos.",
      "evidence": [
        "Há uma mensalidade gerada para cada matrícula ativa elegível na competência.",
        "Cada mensalidade apresenta o valor do plano e sua data de vencimento."
      ]
    }
  },
  "businessHash": "sha256:eaa1a3797486a4fdc044e8bf104718b2d82675eed024a890b3542044b736cfd3"
} as const satisfies Ns5JourneyArtifact;

export type GerarMensalidadesDoMesJourneyType = typeof gerarMensalidadesDoMesJourney;

export default gerarMensalidadesDoMesJourney;
