/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/gerarMensalidadesDoMes.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const gerarMensalidadesDoMesJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "gerarMensalidadesDoMes",
  "business": {
    "actorRef": "gerencia",
    "title": "Gerar mensalidades do mês",
    "goal": "Criar uma mensalidade para cada aluno com matrícula ativa no período.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMatriculasAtivas",
        "kind": "locate",
        "entity": "Matricula",
        "title": "Localizar matrículas ativas",
        "description": "Obtém as matrículas ativas que devem participar da geração do mês."
      },
      {
        "stepId": "inspecionarPlanosDasMatriculas",
        "kind": "inspect",
        "entity": "Plano",
        "title": "Conferir valores e vencimentos",
        "description": "Consulta os valores e os dias de vencimento dos planos vinculados às matrículas ativas."
      },
      {
        "stepId": "gerarMensalidades",
        "kind": "act",
        "entity": "Mensalidade",
        "title": "Gerar mensalidades",
        "description": "Gera uma mensalidade do período para cada aluno ativo, com o valor do plano e a data de vencimento correspondente."
      }
    ],
    "outcome": {
      "statement": "As mensalidades do período são geradas para todos os alunos ativos.",
      "evidence": [
        "Existe uma mensalidade do período para cada matrícula ativa.",
        "Cada mensalidade apresenta o valor do plano e sua data de vencimento."
      ]
    }
  },
  "businessHash": "sha256:565e2126162539187aa774eb07c2224f37e01e51dd56bb70c12891434c04b32a"
} as const satisfies Ns5JourneyArtifact;

export type GerarMensalidadesDoMesJourneyType = typeof gerarMensalidadesDoMesJourney;

export default gerarMensalidadesDoMesJourney;
