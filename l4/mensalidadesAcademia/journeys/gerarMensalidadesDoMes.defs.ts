/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/gerarMensalidadesDoMes.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const gerarMensalidadesDoMesJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "gerarMensalidadesDoMes",
  "business": {
    "actorRef": "gerencia",
    "title": "Gerar mensalidades do mês",
    "goal": "Gerar uma mensalidade por aluno ativo no mês, com o valor do plano e o vencimento.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "conferirMatriculasAtivas",
        "kind": "locate",
        "entity": "Matricula",
        "title": "Conferir matrículas ativas",
        "description": "A gerência consulta as matrículas ativas que receberão mensalidade no mês de referência."
      },
      {
        "stepId": "gerarMensalidades",
        "kind": "act",
        "entity": "Mensalidade",
        "effect": "create",
        "title": "Gerar mensalidades",
        "description": "A gerência informa o mês de referência e gera uma mensalidade por matrícula ativa com o valor do plano e o vencimento no dia do plano, sem duplicar mensalidades já geradas."
      },
      {
        "stepId": "revisarMensalidadesGeradas",
        "kind": "inspect",
        "entity": "Mensalidade",
        "title": "Revisar mensalidades geradas",
        "description": "A gerência confere a lista das mensalidades geradas no mês com aluno, valor e vencimento."
      }
    ],
    "outcome": {
      "statement": "Cada aluno ativo tem exatamente uma mensalidade em aberto para o mês.",
      "evidence": [
        "A lista do mês mostra uma mensalidade por aluno ativo com valor e vencimento.",
        "Matrículas canceladas não recebem mensalidade."
      ]
    }
  },
  "businessHash": "sha256:0f6a60f22924d65bae822b0d9a3b5a518c479f2ae3e540c122a9aa132f437c6a"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type GerarMensalidadesDoMesJourneyType = typeof gerarMensalidadesDoMesJourney;

export default gerarMensalidadesDoMesJourney;
