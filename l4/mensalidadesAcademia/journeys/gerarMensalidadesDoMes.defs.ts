/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/gerarMensalidadesDoMes.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const gerarMensalidadesDoMesJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "gerarMensalidadesDoMes",
  "business": {
    "actorRef": "gerencia",
    "title": "Gerar mensalidades do mês",
    "goal": "Gerar uma mensalidade por aluno ativo com o valor do plano e o vencimento do mês.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "consultarMatriculasAtivas",
        "kind": "locate",
        "entity": "Matricula",
        "title": "Ver matrículas ativas",
        "description": "A gerência consulta as matrículas ativas que receberão mensalidade no mês."
      },
      {
        "stepId": "gerarMensalidades",
        "kind": "act",
        "entity": "Mensalidade",
        "effect": "create",
        "title": "Gerar mensalidades",
        "description": "A gerência informa a competência e gera uma mensalidade por matrícula ativa, com o valor do plano e o vencimento no dia do plano, sem duplicar mensalidades já geradas."
      },
      {
        "stepId": "conferirMensalidades",
        "kind": "inspect",
        "entity": "Mensalidade",
        "title": "Conferir mensalidades geradas",
        "description": "A gerência confere a lista de mensalidades geradas para o mês com valores e vencimentos."
      }
    ],
    "outcome": {
      "statement": "Cada aluno ativo tem uma mensalidade em aberto no mês com valor e vencimento do plano.",
      "evidence": [
        "Uma mensalidade em aberto por matrícula ativa na competência",
        "Valor e data de vencimento iguais aos do plano"
      ]
    }
  },
  "businessHash": "sha256:f0c2644c096cdb4451d4e1b74f2099a166795e1f30c7493765eff2045d727f9f"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type GerarMensalidadesDoMesJourneyType = typeof gerarMensalidadesDoMesJourney;

export default gerarMensalidadesDoMesJourney;
