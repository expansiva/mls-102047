/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/acompanharPainel.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharPainelJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharPainel",
  "business": {
    "actorRef": "gerencia",
    "title": "Acompanhar painel de mensalidades",
    "goal": "Acompanhar a situação financeira do mês e dos alunos.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "abrirPainel",
        "kind": "inspect",
        "entity": "Mensalidade",
        "title": "Abrir painel do mês",
        "description": "A gerência vê o total a receber no mês, o total recebido e as quantidades de alunos ativos, bloqueados e inadimplentes."
      },
      {
        "stepId": "listarInadimplentes",
        "kind": "locate",
        "entity": "Mensalidade",
        "title": "Listar mensalidades vencidas",
        "description": "A gerência consulta as mensalidades vencidas para identificar os alunos inadimplentes e bloqueados."
      }
    ],
    "outcome": {
      "statement": "A gerência conhece os números do mês e quem está inadimplente.",
      "evidence": [
        "O painel exibe total a receber, total recebido, alunos ativos, bloqueados e inadimplentes.",
        "A lista de mensalidades vencidas mostra aluno, valor e vencimento."
      ]
    }
  },
  "businessHash": "sha256:140c4d0279a85be65af279924dbc2ab3a2bb007f70a0a1c4a84333f77c209183"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharPainelJourneyType = typeof acompanharPainelJourney;

export default acompanharPainelJourney;
